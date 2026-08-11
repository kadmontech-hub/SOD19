import { universes } from './content.js';
import { ambient } from './audio.js';
import { VISUALS } from './visual-assets.js';

const clamp=(value,min,max)=>Math.max(min,Math.min(max,value));
const normAngle=angle=>{while(angle>180)angle-=360;while(angle<-180)angle+=360;return angle};

const portalSpecs=[
  {slug:'sod',yaw:-150.5,pitch:13.5,visualKey:'hubTalkIcon'},
  {slug:'library',yaw:-98.8,pitch:13.5,visualKey:'hubLibraryIcon'},
  {slug:'seeds',yaw:91.5,pitch:13.5,visualKey:'hubSeedsIcon'},
  {slug:'observatory',yaw:145.5,pitch:13.5,visualKey:'hubObservatoryIcon'},
];

export class HubScene{
  constructor(canvas,{settings,onSelect,onHover,onOrb,onQuality}={}){
    this.canvas=canvas;
    this.ctx=canvas.getContext('2d',{alpha:false});
    this.settings=settings||{};
    this.onSelect=onSelect;
    this.onHover=onHover;
    this.onOrb=onOrb;
    this.onQuality=onQuality;
    this.yaw=0;this.pitch=0;this.targetYaw=0;this.targetPitch=0;
    this.dragging=false;this.pointer={x:0,y:0};this.hovered=null;
    this.running=true;this.last=performance.now();this.fps=[];
    this.gyroEnabled=false;this.baseOrientation=null;
    this.hotspots=portalSpecs.map(spec=>{
      const universe=universes.find(item=>item.slug===spec.slug);
      return {...universe,...spec};
    }).filter(Boolean);
    this.portalImages=new Map();
    for(const hotspot of this.hotspots){
      const image=new Image();
      image.decoding='async';
      image.referrerPolicy='no-referrer';
      image.src=VISUALS[hotspot.visualKey];
      this.portalImages.set(hotspot.slug,image);
    }
    this.core={slug:'__orb',title:'Hablar con SØD',entryQuestion:'¿Qué está ocupando tu mente en este momento?',yaw:0,pitch:24};
    this.coreImage=new Image();
    this.coreImage.decoding='async';
    this.coreImage.referrerPolicy='no-referrer';
    this.coreImage.src=VISUALS.hubSodIcon;
    this.bg=new Image();
    this.bg.decoding='async';
    this.bg.src=VISUALS.hub;
    this.bind();
    this.resize();
    this.ro=new ResizeObserver(()=>this.resize());
    this.ro.observe(canvas);
    this.frame=requestAnimationFrame(time=>this.render(time));
  }

  getFov(){
    const aspect=Math.max(.5,this.w/Math.max(this.h,1));
    if(aspect>=1.55)return 315;
    if(aspect>=1)return 235;
    return 138;
  }

  getVerticalFov(){return Math.min(174,this.getFov()/Math.max(.72,this.w/Math.max(this.h,1)))}
  getPitchLimit(){return Math.max(4,(180-this.getVerticalFov())/2)}

  bind(){
    this.down=event=>{
      this.dragging=true;
      this.startX=event.clientX;this.startY=event.clientY;
      this.lastX=event.clientX;this.lastY=event.clientY;
      this.canvas.setPointerCapture?.(event.pointerId);
    };
    this.move=event=>{
      const rect=this.canvas.getBoundingClientRect();
      this.pointer={x:event.clientX-rect.left,y:event.clientY-rect.top};
      if(this.dragging){
        const dx=event.clientX-this.lastX,dy=event.clientY-this.lastY;
        const degreesPerPixel=this.getFov()/Math.max(this.w,1);
        this.targetYaw=normAngle(this.targetYaw-dx*degreesPerPixel*1.18);
        this.targetPitch=clamp(this.targetPitch+dy*degreesPerPixel*.58,-this.getPitchLimit(),this.getPitchLimit());
        this.lastX=event.clientX;this.lastY=event.clientY;
        this.canvas.style.cursor='grabbing';
      }else this.updateHover();
    };
    this.up=event=>{
      const moved=Math.hypot(event.clientX-(this.startX??event.clientX),event.clientY-(this.startY??event.clientY));
      this.dragging=false;
      this.canvas.releasePointerCapture?.(event.pointerId);
      if(moved<8)this.activateAt(this.pointer.x,this.pointer.y);
      this.updateHover();
    };
    this.wheel=event=>{
      event.preventDefault();
      const direction=Math.abs(event.deltaX)>Math.abs(event.deltaY)?event.deltaX:event.deltaY;
      this.targetYaw=normAngle(this.targetYaw+direction*.035);
    };
    this.key=event=>{
      if(!this.canvas.matches(':focus'))return;
      const step=event.shiftKey?18:7;
      if(event.key==='ArrowLeft')this.targetYaw=normAngle(this.targetYaw-step);
      if(event.key==='ArrowRight')this.targetYaw=normAngle(this.targetYaw+step);
      if(event.key==='ArrowUp')this.targetPitch=clamp(this.targetPitch-step*.35,-this.getPitchLimit(),this.getPitchLimit());
      if(event.key==='ArrowDown')this.targetPitch=clamp(this.targetPitch+step*.35,-this.getPitchLimit(),this.getPitchLimit());
      if((event.key==='Enter'||event.key===' ')&&this.hovered){event.preventDefault();this.hovered.slug==='__orb'?this.activateCore():this.select(this.hovered)}
    };
    this.orientation=event=>{
      if(!this.gyroEnabled||event.alpha==null)return;
      if(!this.baseOrientation)this.baseOrientation={alpha:event.alpha,beta:event.beta||0};
      this.targetYaw=normAngle((event.alpha-this.baseOrientation.alpha)*-1);
      this.targetPitch=clamp(((event.beta||0)-this.baseOrientation.beta)*.45,-this.getPitchLimit(),this.getPitchLimit());
    };
    this.canvas.addEventListener('pointerdown',this.down);
    this.canvas.addEventListener('pointermove',this.move);
    this.canvas.addEventListener('pointerup',this.up);
    this.canvas.addEventListener('pointercancel',this.up);
    this.canvas.addEventListener('wheel',this.wheel,{passive:false});
    this.canvas.addEventListener('keydown',this.key);
  }

  resize(){
    const rect=this.canvas.getBoundingClientRect();
    const maximum=this.settings.quality==='high'?2:1.5;
    const dpr=clamp(devicePixelRatio||1,1,maximum);
    this.canvas.width=Math.max(1,Math.round(rect.width*dpr));
    this.canvas.height=Math.max(1,Math.round(rect.height*dpr));
    this.ctx.setTransform(dpr,0,0,dpr,0,0);
    this.w=rect.width;this.h=rect.height;this.dpr=dpr;
    this.targetPitch=clamp(this.targetPitch,-this.getPitchLimit(),this.getPitchLimit());
  }

  setSettings(settings){this.settings={...this.settings,...settings};this.resize()}
  async enableGyro(){
    if(typeof DeviceOrientationEvent==='undefined')return false;
    if(typeof DeviceOrientationEvent.requestPermission==='function'){
      const result=await DeviceOrientationEvent.requestPermission();
      if(result!=='granted')return false;
    }
    this.gyroEnabled=true;window.addEventListener('deviceorientation',this.orientation);return true;
  }
  disableGyro(){this.gyroEnabled=false;this.baseOrientation=null;window.removeEventListener('deviceorientation',this.orientation)}
  recenter(){this.targetYaw=0;this.targetPitch=0;this.baseOrientation=null}
  pause(){if(!this.running)return;this.running=false;cancelAnimationFrame(this.frame)}
  resume(){if(this.running)return;this.running=true;this.last=performance.now();this.frame=requestAnimationFrame(time=>this.render(time))}
  focus(slug){const hotspot=this.hotspots.find(item=>item.slug===slug);if(hotspot){this.targetYaw=hotspot.yaw;this.targetPitch=hotspot.pitch}}

  project(yaw,pitch){
    const horizontalFov=this.getFov(),verticalFov=this.getVerticalFov();
    const relativeYaw=normAngle(yaw-this.yaw);
    if(Math.abs(relativeYaw)>horizontalFov/2+8)return null;
    const x=this.w/2+(relativeYaw/horizontalFov)*this.w;
    const y=this.h/2-((pitch-this.pitch)/verticalFov)*this.h;
    const depth=1-Math.min(1,Math.abs(relativeYaw)/(horizontalFov/2));
    return {x,y,depth,rel:relativeYaw};
  }

  findTarget(x,y){
    const corePoint=this.project(this.core.yaw,this.core.pitch);
    if(corePoint&&Math.hypot(x-corePoint.x,y-corePoint.y)<Math.max(96,this.w*.075))return this.core;
    let candidate=null,min=Infinity;
    const radius=clamp(this.w*.055,58,108);
    for(const hotspot of this.hotspots){
      const point=this.project(hotspot.yaw,hotspot.pitch);
      if(!point)continue;
      const distance=Math.hypot(x-point.x,y-point.y);
      if(distance<radius&&distance<min){candidate=hotspot;min=distance}
    }
    return candidate;
  }

  updateHover(){
    const candidate=this.findTarget(this.pointer.x,this.pointer.y);
    if(candidate?.slug!==this.hovered?.slug){
      this.hovered=candidate;
      this.onHover?.(candidate);
    }
    this.canvas.style.cursor=candidate?'pointer':'grab';
  }
  activateCore(){ambient.tone(520,.14);this.onOrb?.()}
  activateAt(x,y){const candidate=this.findTarget(x,y);if(!candidate)return;if(candidate.slug==='__orb')this.activateCore();else this.select(candidate)}
  select(hotspot){ambient.tone(660,.12);this.onSelect?.(hotspot)}

  drawWrappedImage(sourceX,sourceY,sourceWidth,sourceHeight){
    const image=this.bg,context=this.ctx;
    let sx=sourceX;
    while(sx<0)sx+=image.naturalWidth;
    while(sx>=image.naturalWidth)sx-=image.naturalWidth;
    const firstWidth=Math.min(sourceWidth,image.naturalWidth-sx);
    const firstDestination=(firstWidth/sourceWidth)*this.w;
    context.drawImage(image,sx,sourceY,firstWidth,sourceHeight,0,0,firstDestination,this.h);
    const remaining=sourceWidth-firstWidth;
    if(remaining>0)context.drawImage(image,0,sourceY,remaining,sourceHeight,firstDestination,0,this.w-firstDestination,this.h);
  }

  drawBackground(){
    const context=this.ctx;
    context.fillStyle='#01040a';context.fillRect(0,0,this.w,this.h);
    if(this.bg.complete&&this.bg.naturalWidth){
      const horizontalFov=this.getFov(),verticalFov=this.getVerticalFov();
      const sourceWidth=this.bg.naturalWidth*(horizontalFov/360);
      const sourceHeight=this.bg.naturalHeight*(verticalFov/180);
      const centerX=this.bg.naturalWidth/2+(this.yaw/360)*this.bg.naturalWidth;
      const centerY=this.bg.naturalHeight/2+(this.pitch/180)*this.bg.naturalHeight;
      const sourceY=clamp(centerY-sourceHeight/2,0,this.bg.naturalHeight-sourceHeight);
      context.save();
      context.globalAlpha=1;
      this.drawWrappedImage(centerX-sourceWidth/2,sourceY,sourceWidth,sourceHeight);
      context.restore();
      const shade=context.createLinearGradient(0,0,0,this.h);
      shade.addColorStop(0,'rgba(1,4,10,.08)');
      shade.addColorStop(.55,'rgba(1,4,10,0)');
      shade.addColorStop(1,'rgba(1,4,10,.34)');
      context.fillStyle=shade;context.fillRect(0,0,this.w,this.h);
    }else{
      const gradient=context.createRadialGradient(this.w*.5,this.h*.45,0,this.w*.5,this.h*.5,Math.max(this.w,this.h)*.8);
      gradient.addColorStop(0,'#0b2a56');gradient.addColorStop(.42,'#06172c');gradient.addColorStop(1,'#01040a');
      context.fillStyle=gradient;context.fillRect(0,0,this.w,this.h);
    }
  }

  drawInteraction(t){
    const context=this.ctx;
    const reduced=this.settings.motion===false||matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pulse=reduced?0:Math.sin(t*.0025)*4;

    const corePoint=this.project(this.core.yaw,this.core.pitch);
    if(corePoint){
      const active=this.hovered?.slug==='__orb';
      const size=clamp(this.w*(active?.245:.22),280,active?420:380)+(reduced?0:Math.sin(t*.0019)*10);
      const radius=size/2;
      context.save();
      context.translate(corePoint.x,corePoint.y);
      const halo=context.createRadialGradient(0,0,radius*.12,0,0,radius*1.6);
      halo.addColorStop(0,active?'rgba(185,245,255,.54)':'rgba(0,217,255,.30)');
      halo.addColorStop(.54,'rgba(0,125,255,.14)');
      halo.addColorStop(1,'rgba(0,0,0,0)');
      context.fillStyle=halo;
      context.beginPath();context.arc(0,0,radius*1.6,0,Math.PI*2);context.fill();
      context.shadowColor=active?'rgba(155,239,255,.95)':'rgba(0,173,255,.55)';
      context.shadowBlur=active?46:30;
      if(this.coreImage?.complete&&this.coreImage.naturalWidth){
        const scale=Math.min(size/this.coreImage.naturalWidth,size/this.coreImage.naturalHeight);
        const width=this.coreImage.naturalWidth*scale,height=this.coreImage.naturalHeight*scale;
        context.drawImage(this.coreImage,-width/2,-height/2,width,height);
      }else{
        context.fillStyle='#dffbff';context.font=`700 ${Math.round(size*.28)}px system-ui`;
        context.textAlign='center';context.textBaseline='middle';context.fillText('Ø',0,0);
      }
      context.shadowBlur=0;
      if(active){
        context.strokeStyle='rgba(220,253,255,.96)';context.lineWidth=2.2;
        context.beginPath();context.arc(0,0,radius*.88,0,Math.PI*2);context.stroke();
      }
      context.restore();
    }

    for(const hotspot of this.hotspots){
      const point=this.project(hotspot.yaw,hotspot.pitch);
      if(!point)continue;
      const active=this.hovered?.slug===hotspot.slug;
      const image=this.portalImages.get(hotspot.slug);
      const index=this.hotspots.findIndex(item=>item.slug===hotspot.slug);
      const phase=(index+1)*0.85;
      const floatOffset=reduced?0:Math.sin(t*(0.00145+index*0.00018)+phase)*(9+index*1.6);
      const scaleBreath=reduced?1:1+Math.sin(t*(0.0013+index*0.00012)+phase)*0.05;
      const glowWave=reduced?0:(Math.sin(t*(0.00175+index*0.00015)+phase)+1)*0.5;
      const buttonSize=clamp(this.w*(active?.13:.118),150,active?230:200)*scaleBreath;
      const radius=buttonSize/2;
      const opacity=clamp(.72+point.depth*.28,.72,1);
      context.save();
      context.globalAlpha=opacity;
      context.translate(point.x,point.y+floatOffset);

      const halo=context.createRadialGradient(0,0,radius*.08,0,0,radius*1.42);
      halo.addColorStop(0,active?'rgba(173,246,255,.50)':`rgba(0,217,255,${0.18+glowWave*0.16})`);
      halo.addColorStop(.56,`rgba(0,125,255,${0.09+glowWave*0.08})`);
      halo.addColorStop(1,'rgba(0,0,0,0)');
      context.fillStyle=halo;
      context.beginPath();context.arc(0,0,radius*1.42,0,Math.PI*2);context.fill();

      context.shadowColor=active?'rgba(74,229,255,.96)':`rgba(0,160,255,${0.36+glowWave*0.18})`;
      context.shadowBlur=active?40:(20+glowWave*12);
      if(image?.complete&&image.naturalWidth){
        const scale=Math.min(buttonSize/image.naturalWidth,buttonSize/image.naturalHeight);
        const width=image.naturalWidth*scale,height=image.naturalHeight*scale;
        context.drawImage(image,-width/2,-height/2,width,height);
      }else{
        context.fillStyle='#dffbff';context.font=`700 ${Math.round(buttonSize*.26)}px system-ui`;
        context.textAlign='center';context.textBaseline='middle';context.fillText(hotspot.icon||'Ø',0,0);
      }
      context.shadowBlur=0;

      const label=hotspot.title;
      context.font=`700 ${clamp(this.w*.009,13,18)}px system-ui`;
      const labelY=radius+20;
      context.fillStyle=active?'#ffffff':'rgba(224,239,247,.96)';
      context.textAlign='center';context.textBaseline='middle';
      context.shadowColor='rgba(0,0,0,.85)';context.shadowBlur=14;
      context.fillText(label,0,labelY);
      context.restore();
    }
  }

  render(time){
    if(!this.running)return;
    const delta=Math.min(40,time-this.last);this.last=time;
    const smooth=this.settings.motion===false?1:.095;
    this.yaw=normAngle(this.yaw+normAngle(this.targetYaw-this.yaw)*smooth);
    this.pitch+=(this.targetPitch-this.pitch)*smooth;
    this.drawBackground();
    this.drawInteraction(time);
    this.updateHover();
    this.fps.push(1000/Math.max(delta,1));
    if(this.fps.length===120){const average=this.fps.reduce((sum,value)=>sum+value,0)/this.fps.length;this.onQuality?.(average);this.fps=[]}
    this.frame=requestAnimationFrame(next=>this.render(next));
  }

  destroy(){
    this.running=false;cancelAnimationFrame(this.frame);this.ro?.disconnect();this.disableGyro();
    this.canvas.removeEventListener('pointerdown',this.down);this.canvas.removeEventListener('pointermove',this.move);
    this.canvas.removeEventListener('pointerup',this.up);this.canvas.removeEventListener('pointercancel',this.up);
    this.canvas.removeEventListener('wheel',this.wheel);this.canvas.removeEventListener('keydown',this.key);
  }
}
