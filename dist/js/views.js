import { universes,seeds,sampleCodes,journeyDays,elementDefinitions,levelDefinitions,elementPieces,dailyFallback } from './content.js';
import { libraryBooks,libraryVideos,libraryVideoChannels,libraryVideoSections,libraryCategories,libraryRecommended,getLibraryBook,youtubeEmbedUrl,youtubeThumbnail } from './library-data.js';
import { store } from './store.js';
import { api } from './api.js';
import { navigate } from './router.js';
import { HubScene } from './hub-scene.js';
import { ambient } from './audio.js';
import { escapeHtml,formatDate,toast,openModal,pageHero,confirmAction,bindRouteButtons } from './ui.js';
import { visual, VISUALS } from './visual-assets.js';
import { createConversationController } from './conversation-controller.js';
import { sessionProvider } from './session-provider.js';

const button=(label,attrs='',cls='')=>`<button class="btn ${cls}" ${attrs}>${label}</button>`;
const getPiece=(element,number)=>elementPieces.find(p=>p.element===element&&p.number===Number(number));
const state=()=>store.get();
const universeRoute=u=>u.destination||`/universos/${u.slug}`;

function portalView(){return{
  noShell:true,title:'Portal de entrada',
  html:`<main id="app-main" class="portal-page portal-cinematic" style="--portal-image:url('${visual('062')}')"><div class="portal-shade"></div><section class="portal-intro"><div class="portal-brand"><img src="${visual('002')}" alt=""><span>SØD</span></div><p class="eyebrow">AGENTE DE CLARIDAD MENTAL</p><h1>Entrá.</h1><p>No necesitás entender todo este lugar ahora. Solo traer aquello que hoy necesita ser observado.</p><div class="actions"><button class="btn btn-primary" data-enter>Entrar</button><a class="btn btn-ghost" href="/identidad-local" data-link>Continuar en este dispositivo</a></div><p class="portal-manifesto">SØD no se define por lo que sabe. Se define por cómo piensa.</p><p class="prototype-trust-note">Prototipo oficial de SØD Ecosystem · No solicita contraseñas, tarjetas ni credenciales.</p></section></main>`,
  mount(){document.querySelector('[data-enter]').onclick=()=>{store.update(s=>{s.profile.mode='guest';s.onboarding.completed=false;return s});navigate('/onboarding')}}
}}

function localIdentityView(){const current=state().profile?.name||'Explorador Ø';return{
  title:'Identidad local',
  html:`<main id="app-main" class="section local-identity-page"><div class="container" style="max-width:680px"><div class="card local-identity-card"><div class="card-body"><p class="eyebrow">IDENTIDAD LOCAL · MVP</p><h1>Continuá en este dispositivo.</h1><p class="lead" style="font-size:20px">Esta versión no tiene cuentas ni autenticación online. Podés elegir un nombre visible; el recorrido queda guardado localmente en este navegador.</p><div class="safe-access-notice"><strong>Acceso seguro del prototipo</strong><span>No pedimos email, contraseña, teléfono, tarjeta ni credenciales de ningún servicio.</span></div><form class="form" id="local-identity-form"><div class="field"><label for="local-name">¿Cómo querés que SØD te nombre?</label><input id="local-name" name="name" maxlength="80" value="${escapeHtml(current)}" placeholder="Explorador Ø" autocomplete="off"></div><button class="btn btn-primary" type="submit">Continuar</button><a class="btn btn-ghost" href="/" data-link>Volver</a></form><div class="divider"></div><p class="muted">Podés borrar estos datos desde Configuración. <a style="color:var(--cyan)" href="/privacidad" data-link>Ver privacidad y memoria</a>.</p><p class="prototype-host-note">Prototipo oficial de SØD Ecosystem · Alojamiento técnico de prueba en Vercel.</p></div></div></div></main>`,
  mount(){document.querySelector('#local-identity-form').onsubmit=e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const name=String(fd.get('name')||'Explorador Ø').trim().slice(0,80)||'Explorador Ø';store.update(s=>{s.profile={...s.profile,name,email:'',mode:'local-device'};return s});toast('Identidad local actualizada');navigate(state().onboarding.completed?'/hub':'/onboarding')}}
}}

function onboardingView(){const current=state().onboarding;return{
  noShell:true,title:'Calibración inicial',
  html:`<main id="app-main" class="onboarding onboarding-visual" style="--onboarding-image:url('${visual('063')}')"><div class="onboarding-atmosphere"></div><section class="onboarding-shell"><div class="stepper"><span class="active"></span><span></span><span></span><span></span></div><div class="card onboarding-card"><div class="card-body" id="onboarding-content"></div></div></section></main>`,
  mount(){let step=0;const draft={...current};const root=document.querySelector('#onboarding-content');const shell=document.querySelector('.onboarding');const backgrounds=['063','063','064','064'];const steps=[
    ()=>`<p class="eyebrow">01 · RECONOCIMIENTO</p><h1>¿Qué necesitás hoy?</h1><p class="lead">No estás eligiendo una función. Estás nombrando la necesidad desde la que entrás.</p><div class="option-grid">${[['claridad','Comprender algo que hoy está confuso'],['cultivar','Sostener un cambio en el tiempo'],['direccion','Recordar hacia dónde quiero ir'],['observar','Reconocer en quién me estoy convirtiendo']].map(([v,t])=>`<label class="option ${draft.intention===v?'selected':''}"><input type="radio" name="intention" value="${v}" ${draft.intention===v?'checked':''}><strong>${t}</strong></label>`).join('')}</div>`,
    ()=>`<p class="eyebrow">02 · PRESENCIA</p><h1>¿Querés entrar con sonido?</h1><p class="lead">El silencio también es parte de SØD. Nada comienza sin tu consentimiento.</p><div class="option-grid">${[['true','Activar ambiente','Una capa sonora sutil, sin voz.'],['false','Entrar en silencio','La experiencia permanece completa.']].map(([v,t,d])=>`<label class="option ${String(draft.audio)===v?'selected':''}"><input type="radio" name="audio" value="${v}" ${String(draft.audio)===v?'checked':''}><strong>${t}</strong><small>${d}</small></label>`).join('')}</div>`,
    ()=>`<p class="eyebrow">03 · MOVIMIENTO</p><h1>Calibrá la intensidad</h1><p class="lead">El mundo puede respirar sin quitarte control.</p><div class="option-grid">${[['true','Experiencia viva','Movimiento ambiental, partículas y transiciones.'],['false','Movimiento reducido','Composición estable y mínima animación.']].map(([v,t,d])=>`<label class="option ${String(draft.motion)===v?'selected':''}"><input type="radio" name="motion" value="${v}" ${String(draft.motion)===v?'checked':''}><strong>${t}</strong><small>${d}</small></label>`).join('')}</div>`,
    ()=>`<p class="eyebrow">04 · CALIBRACIÓN</p><h1>El núcleo te reconoce.</h1><p class="lead">Podrás cambiar audio, calidad, movimiento, privacidad y memoria en cualquier momento.</p><div class="option-grid">${[['auto','Automática','El sistema adapta la escena.'],['low','Esencial','Menor densidad visual.'],['high','Alta','Máxima presencia para equipos capaces.']].map(([v,t,d])=>`<label class="option ${draft.quality===v?'selected':''}"><input type="radio" name="quality" value="${v}" ${draft.quality===v?'checked':''}><strong>${t}</strong><small>${d}</small></label>`).join('')}</div>`
  ];
  const render=()=>{shell.style.setProperty('--onboarding-image',`url('${visual(backgrounds[step])}')`);root.innerHTML=`${steps[step]()}<div class="actions"><button class="btn" data-back ${step===0?'disabled':''}>Atrás</button><button class="btn btn-primary" data-next>${step===3?'Entrar al Hub':'Continuar'}</button></div>`;document.querySelectorAll('.stepper span').forEach((el,i)=>el.classList.toggle('active',i<=step));root.querySelectorAll('input').forEach(input=>input.onchange=()=>{if(input.name==='audio'||input.name==='motion')draft[input.name]=input.value==='true';else draft[input.name]=input.value;render()});root.querySelector('[data-back]').onclick=()=>{if(step>0){step--;render()}};root.querySelector('[data-next]').onclick=async()=>{if(step<3){step++;render();return}store.update(s=>{s.onboarding={...draft,completed:true};s.settings={...s.settings,audio:draft.audio,motion:draft.motion,quality:draft.quality};s.journey.startedAt=s.journey.startedAt||new Date().toISOString();return s});if(draft.audio)await ambient.start(state().settings.ambientVolume);navigate('/hub')}};render()}
}}


function dialogueModal(){navigate('/experiencia')}


function hubView(){const s=state();const groups=[
  {id:'understand',label:'Necesito comprender',items:['sod','library','elements33']},
  {id:'cultivate',label:'Necesito cultivar',items:['seeds','habits']},
  {id:'direction',label:'Necesito dirección',items:['dreams','identity']},
  {id:'observe',label:'Necesito observar',items:['observatory']}
];return{
  title:'Hub Central',immersive:true,
  html:`<main id="app-main" class="hub-page hub-v3">
    <canvas id="hub-canvas" class="hub-canvas" tabindex="0" aria-label="Hub panorámico SØD. Arrastrá para explorar, tocá los portales o seleccioná una necesidad humana."></canvas>
    <div class="hub-vignette"></div>
    <div class="hub-title"><span class="eyebrow">PRESENCIA SØD</span><strong>¿Qué necesitás hoy?</strong><small>Elegí una necesidad. El mundo te mostrará una puerta.</small></div>
    <div class="hub-minimal-status"><span class="dot"></span><span>Presencia activa</span></div>
    <button class="hub-oracle-button" data-insight aria-label="Abrir mensaje y huellas"><img src="${VISUALS.hubSodIcon}" alt=""><small>Mensaje</small></button>
    <aside class="hub-insight-drawer" id="hub-insight" aria-label="Mensaje de SØD y huellas del recorrido">
      <button class="icon-button drawer-close" data-insight-close aria-label="Cerrar panel">✕</button>
      <p class="eyebrow">SØD</p><p class="hub-insight-message" id="daily-message">${escapeHtml(dailyFallback.message)}</p>
      <button class="btn btn-primary" data-dialogue>Entrar en conversación</button>
      <div class="hub-drawer-divider"></div>
      <p class="eyebrow">HUELLAS</p>
      <div class="hub-signal-row"><span>${s.collection.seeds.length}</span><small>Semillas descubiertas</small></div>
      <div class="hub-signal-row"><span>${(s.codes||[]).length}</span><small>Códigos conservados</small></div>
      <div class="hub-signal-row"><span>${s.journey.completedDays.length}</span><small>tramos sostenidos</small></div>
      <a class="btn" href="/observatorio" data-link>Contemplar el Observatorio</a>
      <div class="hub-drawer-divider"></div>
      <p class="eyebrow">CLAVE DEL DÍA</p><strong class="mono" id="daily-key">${escapeHtml(dailyFallback.key)}</strong>
    </aside>
    <nav class="hub-need-dock" aria-label="Necesidades humanas">${groups.map((g,i)=>`<button data-need="${g.id}"><span>0${i+1}</span><strong>${g.label}</strong></button>`).join('')}</nav>
    <section class="hub-world-drawer" id="hub-world-drawer" aria-live="polite">
      <div class="hub-world-drawer-head"><div><p class="eyebrow">PUERTAS DISPONIBLES</p><h2 id="hub-drawer-title">Elegí una necesidad</h2></div><button class="icon-button" data-world-close aria-label="Cerrar puertas">✕</button></div>
      <div class="hub-world-grid" id="hub-world-grid"></div>
    </section>
    <div class="hub-controls-v3"><button class="icon-button glass-panel" data-recenter aria-label="Recentrar">⌖</button><button class="icon-button glass-panel" data-audio aria-label="Audio">${s.settings.audio?'◉':'○'}</button><button class="icon-button glass-panel" data-gyro aria-label="Giroscopio">◌</button><button class="icon-button glass-panel" data-fallback aria-label="Modo 2D">▦</button></div>
    <div class="spatial-prompt" id="spatial-prompt"></div>
    <div class="scene-mirror"><h2>Alternativa accesible del Hub</h2><ul>${universes.map(u=>`<li><a href="${universeRoute(u)}" data-link>${u.title}: ${u.humanNeed}</a></li>`).join('')}</ul></div>
    ${conversationSurfaceMarkup({overlay:true})}
  </main>`,
  mount(){
    let scene;const canvas=document.querySelector('#hub-canvas');const prompt=document.querySelector('#spatial-prompt');const drawer=document.querySelector('#hub-world-drawer');const grid=document.querySelector('#hub-world-grid');const title=document.querySelector('#hub-drawer-title');const insight=document.querySelector('#hub-insight');const conversation=document.querySelector('[data-sod-conversation]');
    const openConversation=()=>{conversation.hidden=false;conversation.setAttribute('aria-hidden','false');requestAnimationFrame(()=>conversation.classList.add('open'));document.documentElement.classList.add('sod-conversation-open');scene?.pause();setTimeout(()=>conversation.querySelector('[data-chat-input]')?.focus(),720)};
    const closeConversation=()=>{conversation.classList.remove('open');conversation.setAttribute('aria-hidden','true');document.documentElement.classList.remove('sod-conversation-open');setTimeout(()=>{conversation.hidden=true;scene?.resume();canvas.focus()},560)};
    const chatCleanup=mountConversationSurface(conversation,{onClose:closeConversation});
    const openGroup=id=>{const group=groups.find(g=>g.id===id);if(!group)return;const items=group.items.map(slug=>universes.find(u=>u.slug===slug)).filter(Boolean);title.textContent=group.label;grid.innerHTML=items.map(u=>u.slug==='sod'?`<button type="button" data-open-sod class="hub-world-card" style="--world-color:${u.color};--world-image:url('${u.visual}')"><div class="hub-world-card-shade"></div><span class="hub-world-card-icon">${u.icon}</span><div><p class="eyebrow">${u.type}</p><h3>${u.title}</h3><p>${u.entryQuestion}</p></div></button>`:`<a href="${universeRoute(u)}" data-link class="hub-world-card" style="--world-color:${u.color};--world-image:url('${u.visual}')"><div class="hub-world-card-shade"></div><span class="hub-world-card-icon">${u.icon}</span><div><p class="eyebrow">${u.type}</p><h3>${u.title}</h3><p>${u.entryQuestion}</p></div></a>`).join('');bindRouteButtons(grid);grid.querySelector('[data-open-sod]')?.addEventListener('click',()=>{drawer.classList.remove('open');openConversation()});drawer.classList.add('open')};
    scene=new HubScene(canvas,{settings:s.settings,onSelect:u=>u.slug==='sod'?openConversation():navigate(universeRoute(u)),onOrb:openConversation,onHover:u=>{prompt.textContent=u?`${u.entryQuestion||u.title}`:'';prompt.classList.toggle('show',!!u)},onQuality:()=>{}});
    document.querySelectorAll('[data-need]').forEach(btn=>btn.onclick=()=>openGroup(btn.dataset.need));
    document.querySelector('[data-world-close]').onclick=()=>drawer.classList.remove('open');
    document.querySelector('[data-insight]').onclick=()=>insight.classList.toggle('open');
    document.querySelector('[data-insight-close]').onclick=()=>insight.classList.remove('open');
    document.querySelector('[data-dialogue]').onclick=()=>{insight.classList.remove('open');openConversation()};
    document.querySelector('[data-recenter]').onclick=()=>scene.recenter();
    document.querySelector('[data-fallback]').onclick=()=>navigate('/hub-2d');
    document.querySelector('[data-audio]').onclick=async e=>{const enabled=!state().settings.audio;store.update(x=>{x.settings.audio=enabled;return x});if(enabled)await ambient.start(state().settings.ambientVolume);else ambient.stop();e.currentTarget.textContent=enabled?'◉':'○'};
    document.querySelector('[data-gyro]').onclick=async e=>{try{const ok=await scene.enableGyro();if(ok){store.update(x=>{x.settings.gyro=true;return x});e.currentTarget.textContent='◉';toast('Giroscopio activado')}else toast('El permiso no fue concedido','error')}catch{toast('Giroscopio no disponible','error')}};
    api.getState().then(r=>{if(r.adminContent?.dailyMessage)document.querySelector('#daily-message').textContent=r.adminContent.dailyMessage;if(r.adminContent?.dailyKey)document.querySelector('#daily-key').textContent=r.adminContent.dailyKey}).catch(()=>{});
    const keyHandler=e=>{if(e.key==='Escape'&&!conversation.hidden)closeConversation()};window.addEventListener('keydown',keyHandler);return()=>{window.removeEventListener('keydown',keyHandler);document.documentElement.classList.remove('sod-conversation-open');chatCleanup?.();scene.destroy()};
  }
}}


function fallbackHubView(){return{title:'Hub accesible',html:`<main id="app-main" class="fallback-hub visual-page" style="--visual-bg:url('${VISUALS.hub}')"><div class="visual-page-shade"></div><div class="container visual-page-content">${pageHero('MODO 2D','El mismo universo.<br><span style="color:var(--cyan)">Sin perder claridad.</span>','Todas las experiencias permanecen disponibles sin Canvas, movimiento ni giroscopio.',`<a class="btn btn-primary" href="/hub" data-link>Volver al modo inmersivo</a>`)}<div class="visual-card-grid">${universes.map(u=>`<a class="universe-visual-card" href="${universeRoute(u)}" data-link style="--card-image:url('${u.visual}')"><div class="universe-visual-shade"></div><div><span class="universe-icon">${u.icon}</span><p class="eyebrow">${u.type}</p><h3>${u.title}</h3><p>${u.entryQuestion}</p></div></a>`).join('')}</div></div></main>`}}

function universeView(slug){const u=universes.find(x=>x.slug===slug);if(!u)return notFoundView();const sod=u.slug==='sod';return{title:u.title,html:`<main id="app-main"><section class="universe-hero universe-visual-hero" style="--universe-glow:${u.color}55;--universe-image:url('${u.visual}')"><div class="universe-hero-shade"></div><div class="container"><p class="eyebrow">UNIVERSO · ${escapeHtml(u.title.toUpperCase())}</p><h1 class="page-title"><span style="color:${u.color}">${u.icon}</span> ${u.title}</h1><p class="universe-question">${u.entryQuestion}</p><p class="lead">${sod?'Traé lo que todavía no lográs ordenar. No necesitás formularlo perfectamente.':u.shortDescription}</p><div class="actions">${sod?'<a class="btn btn-primary" href="/experiencia" data-link>Comenzar conversación</a>':'<button class="btn btn-primary" data-start-practice>Entrar en la experiencia</button>'}<a class="btn btn-ghost" href="/hub" data-link>Volver al Hub</a></div></div></section><section class="cognitive-path-section"><div class="container"><div class="cognitive-path-intro"><p class="eyebrow">MÉTODO SØD</p><h2>${u.message}</h2><p>La experiencia busca una transición reconocible. No actividad vacía.</p></div><div class="cognitive-path">${u.practices.map((p,i)=>`<article class="cognitive-step" data-practice="${i}"><span class="cognitive-step-index">0${i+1}</span><div class="cognitive-step-line"></div><p class="eyebrow">${p.duration}</p><h3>${p.title}</h3><p>${p.instruction}</p><button class="btn btn-small">Explorar fase</button></article>`).join('')}</div></div></section></main>`,mount(){if(sod)return;const start=i=>openModal({title:u.practices[i].title,content:`<p class="eyebrow">${u.practices[i].duration}</p><h2>${u.practices[i].instruction}</h2><p class="muted">Esta es una práctica funcional con contenido placeholder. Registrá qué cambió entre el antes y el después.</p><form class="form" id="practice-form"><div class="field"><label for="practice-before">Antes</label><textarea id="practice-before" required placeholder="¿Cómo observabas esto antes?"></textarea></div><div class="field"><label for="practice-after">Después</label><textarea id="practice-after" required placeholder="¿Qué podés distinguir ahora?"></textarea></div><button class="btn btn-primary">Conservar integración</button></form>`,onMount:(root,close)=>{root.querySelector('form').onsubmit=e=>{e.preventDefault();toast('Integración registrada como placeholder funcional');close()}}});document.querySelector('[data-start-practice]')?.addEventListener('click',()=>start(0));document.querySelectorAll('[data-practice]').forEach(b=>b.onclick=()=>start(Number(b.dataset.practice)))}}}


function journeyView(){const s=state();const done=new Set(s.journey.completedDays);return{title:'Journey',html:`<main id="app-main">${pageHero('JOURNEY DE 14 DÍAS','La comprensión necesita<br><span style="color:var(--cyan)">ritmo, no presión.</span>','Un recorrido diario de observación, pregunta, práctica, registro e integración. Perder un día no borra el camino.')}<section class="section" style="padding-top:20px"><div class="container"><div class="card"><div class="card-body"><div style="display:flex;justify-content:space-between;gap:20px;align-items:end"><div><p class="eyebrow">PROGRESO</p><h2 style="font-size:40px;margin-bottom:8px">${done.size} de 14 integraciones</h2></div><span class="mono">${Math.round(done.size/14*100)}%</span></div><div class="progress"><span style="width:${done.size/14*100}%"></span></div></div></div><div class="journey-grid" style="margin-top:20px">${journeyDays.map(d=>`<article class="day-card ${done.has(d.day)?'completed':''} ${d.day===Math.min(done.size+1,14)?'current':''}" tabindex="0" data-day="${d.day}"><div class="day-number">DÍA ${String(d.day).padStart(2,'0')}</div><h3>${d.title}</h3><small class="muted">${d.practice}</small><div class="check">${done.has(d.day)?'✓':'·'}</div></article>`).join('')}</div></div></section></main>`,mount(){const openDay=day=>{const d=journeyDays[day-1];const completed=state().journey.completedDays.includes(day);openModal({title:`Día ${day} · ${d.title}`,content:`<p class="eyebrow">PREGUNTA</p><h2>${d.question}</h2><div class="divider"></div><p class="eyebrow">PRÁCTICA</p><p class="lead" style="font-size:20px">${d.practice}</p><form class="form" id="day-form"><div class="field"><label for="day-reflection">¿Qué observaste?</label><textarea id="day-reflection" placeholder="No busques escribir bien. Buscá registrar con precisión."></textarea></div><button class="btn btn-primary" type="submit">${completed?'Actualizar integración':'Completar día'}</button></form>`,onMount:(root,close)=>{root.querySelector('form').onsubmit=e=>{e.preventDefault();store.update(s=>{if(!s.journey.completedDays.includes(day))s.journey.completedDays.push(day);s.journey.completedDays.sort((a,b)=>a-b);return s});toast(`Día ${day} integrado`);close();navigate('/journey',{replace:true});window.dispatchEvent(new PopStateEvent('popstate'))}}})};document.querySelectorAll('[data-day]').forEach(card=>{card.onclick=()=>openDay(Number(card.dataset.day));card.onkeydown=e=>{if(e.key==='Enter'||e.key===' ')openDay(Number(card.dataset.day))}})}}}

function bitacoraView(){return{title:'Bitácora',html:`<main id="app-main">${pageHero('BITÁCORA','Registrar convierte experiencia<br><span style="color:var(--cyan)">en información disponible.</span>','Creá, editá y eliminá registros. En esta versión quedan guardados localmente en este dispositivo.')}<section class="section" style="padding-top:10px"><div class="container grid grid-2"><div class="card"><div class="card-body"><h2>Nueva reflexión</h2><form class="form" id="reflection-form"><div class="field"><label for="reflection-title">Título</label><input id="reflection-title" name="title" maxlength="120" placeholder="Qué querés recordar"></div><div class="field"><label for="reflection-text">Registro</label><textarea id="reflection-text" name="text" required placeholder="Hecho, interpretación, emoción, decisión..."></textarea></div><button class="btn btn-primary" type="submit">Guardar registro</button></form></div></div><div><div class="toolbar"><input class="search-input" id="reflection-search" placeholder="Buscar en la bitácora"><span class="pill" id="reflection-count">0 registros</span></div><div id="reflection-list"><div class="skeleton" style="height:180px"></div></div></div></div></section></main>`,mount(){let items=[];const list=document.querySelector('#reflection-list');const render=(query='')=>{const filtered=items.filter(x=>(x.title+' '+x.text).toLowerCase().includes(query.toLowerCase()));document.querySelector('#reflection-count').textContent=`${items.length} registros`;list.innerHTML=filtered.length?filtered.map(x=>`<article class="card reflection"><time>${formatDate(x.updatedAt)}</time><h3>${escapeHtml(x.title)}</h3><p class="muted">${escapeHtml(x.text)}</p><div class="reflection-actions"><button class="btn btn-small" data-edit="${x.id}">Editar</button><button class="btn btn-small btn-danger" data-delete="${x.id}">Eliminar</button></div></article>`).join('<div style="height:10px"></div>'):'<div class="empty">Todavía no hay registros. La bitácora empieza cuando una observación se vuelve explícita.</div>';list.querySelectorAll('[data-delete]').forEach(b=>b.onclick=()=>confirmAction('¿Eliminar este registro de forma permanente?',async()=>{await api.deleteReflection(b.dataset.delete);items=items.filter(x=>x.id!==b.dataset.delete);render(document.querySelector('#reflection-search').value);toast('Registro eliminado')}));list.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{const item=items.find(x=>x.id===b.dataset.edit);openModal({title:'Editar reflexión',content:`<form class="form" id="edit-reflection"><div class="field"><label>Título<input name="title" value="${escapeHtml(item.title)}"></label></div><div class="field"><label>Registro<textarea name="text">${escapeHtml(item.text)}</textarea></label></div><button class="btn btn-primary">Guardar cambios</button></form>`,onMount:(root,close)=>{root.querySelector('form').onsubmit=async e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const r=await api.updateReflection(item.id,{title:fd.get('title'),text:fd.get('text')});items=items.map(x=>x.id===item.id?r.item:x);render(document.querySelector('#reflection-search').value);close();toast('Registro actualizado')}}})})};api.getReflections().then(r=>{items=r.items;render()}).catch(err=>{list.innerHTML=`<div class="empty">${escapeHtml(err.message)}. Verificá que el servidor esté activo.</div>`});document.querySelector('#reflection-search').oninput=e=>render(e.target.value);document.querySelector('#reflection-form').onsubmit=async e=>{e.preventDefault();const fd=new FormData(e.currentTarget);try{const r=await api.createReflection({title:fd.get('title'),text:fd.get('text')});items.unshift(r.item);e.currentTarget.reset();render();toast('Reflexión guardada')}catch(err){toast(err.message,'error')}}}}}

const libraryExactAuthors=[
  {name:'Napoleon Hill',search:'Napoleon Hill',image:'/assets/library/authors/author-01.jpg'},
  {name:'Robin Sharma',search:'Robin Sharma',image:'/assets/library/authors/author-02.jpg'},
  {name:'Eckhart Tolle',search:'Eckhart Tolle',image:'/assets/library/authors/author-03.jpg'},
  {name:'Joe Dispenza',search:'Joe Dispenza',image:'/assets/library/authors/author-04.jpg'},
  {name:'Dale Carnegie',search:'Dale Carnegie',image:'/assets/library/authors/author-05.jpg'},
  {name:'Daniel Goleman',search:'Daniel Goleman',image:'/assets/library/authors/author-06.jpg'},
  {name:'Tony Robbins',search:'Tony Robbins',image:'/assets/library/authors/author-07.jpg'},
  {name:'Deepak Chopra',search:'Deepak Chopra',image:'/assets/library/authors/author-08.jpg'},
  {name:'Dr. Miguel Ruiz',search:'Don Miguel Ruiz',image:'/assets/library/authors/author-09.jpg'}
];

const libraryExactTopics=[
  {key:'mentalidad',title:'Mentalidad',copy:'Cambia tu forma\nde pensar',filters:['Mentalidad','Conciencia','Desarrollo personal','Creencias','Cerebro'],image:'/assets/library/topics/topic-01.jpg'},
  {key:'liderazgo',title:'Liderazgo',copy:'Inspira, guía\ny transforma',filters:['Liderazgo','Comunicación','Influencia','Relaciones','Oratoria'],image:'/assets/library/topics/topic-02.jpg'},
  {key:'abundancia',title:'Abundancia',copy:'Crea riqueza\ny libertad',filters:['Riqueza','Dinero','Finanzas','Abundancia','Activos'],image:'/assets/library/topics/topic-03.jpg'},
  {key:'espiritualidad',title:'Espiritualidad',copy:'Conecta con tu\nesencia',filters:['Espiritualidad','Metafísica','Sabiduría','Conciencia','Hermetismo'],image:'/assets/library/topics/topic-04.jpg'},
  {key:'habitos',title:'Hábitos',copy:'Pequeñas acciones,\ngrandes cambios',filters:['Hábitos','Disciplina','Foco','Atención','Rutina'],image:'/assets/library/topics/topic-05.jpg'},
  {key:'proposito',title:'Propósito',copy:'Vive alineado a tu\nverdadero llamado',filters:['Propósito','Sentido','Vida','Legado','Transformación'],image:'/assets/library/topics/topic-06.jpg'}
];

const libraryExactProgress={
  'book-01':67,'book-04':23,'book-05':81,'book-16':45,'book-03':72,'book-10':63,'book-02':38,'book-08':38,'book-15':68,
  'book-06':54,'book-07':46,'book-09':58,'book-11':61,'book-12':52,'book-13':49,'book-14':43,'book-17':57,'book-18':51
};

function libraryView(){
  const videoCategories=[
    {key:'all',label:'Todos',tokens:[]},
    {key:'conciencia',label:'Conciencia',tokens:['conciencia','despertar','no dualidad','metafísica']},
    {key:'filosofia',label:'Filosofía',tokens:['filosofía','estoicismo','psicología profunda','jung']},
    {key:'desarrollo',label:'Psicología & Desarrollo',tokens:['psicología','desarrollo personal','liderazgo','decisiones','motivación']},
    {key:'ciencia',label:'Neurociencia',tokens:['neurociencia','atención','foco']},
    {key:'negocios',label:'Negocios & Ventas',tokens:['negocios','ventas','negociación','marketing']},
    {key:'espiritualidad',label:'Espiritualidad',tokens:['espiritualidad','presencia','no dualidad']},
    {key:'bienestar',label:'Salud & Bienestar',tokens:['neurociencia','psicología','atención','hábitos']},
    {key:'sociedad',label:'Historia & Sociedad',tokens:['filosofía','educación','historia','sociedad']}
  ];
  const primaryVideoIds=['video-01','video-04','video-16','video-17','video-03','video-06','video-19','video-21'];
  const secondaryVideoIds=['video-07','video-12','video-05','video-11','video-13','video-15','video-02','video-20'];
  const featuredChannelNames=['Sadhguru','Huberman Lab','Tony Robbins','Mel Robbins','Alan Watts','Eckhart Tolle','Rupert Spira','Daily Stoic','Academy of Ideas','HealthyGamerGG','Alex Hormozi','Chris Voss'];
  return{
    title:'Biblioteca SØD',
    html:`<main id="app-main" class="library-exact-world" style="--library-bg:url('${VISUALS.library}')"><div class="library-exact-overlay"></div><div class="library-exact-content"><section class="library-exact-toolbar" aria-label="Herramientas de Biblioteca"><label class="library-exact-search"><span>⌕</span><input id="library-search" type="search" placeholder="Buscar título, autor, categoría o idea" autocomplete="off"><kbd>⌘K</kbd></label><div class="library-exact-modebar"><button class="library-exact-mode active" data-library-mode="books"><span>▤</span><strong>Libros</strong></button><button class="library-exact-mode" data-library-mode="videos"><span>▶</span><strong>Videos</strong></button><a class="library-exact-mode" href="/hub" data-link><span>⊙</span><strong>Hub</strong></a></div></section><section id="library-books-view" class="library-exact-books"><section class="library-exact-section library-exact-recommended"><div class="library-exact-section-head"><h2>Más recomendados <span>›</span></h2></div><div class="library-exact-row-wrap"><button class="library-exact-arrow library-exact-arrow-prev" data-scroll-target="library-recommended-row" data-scroll-direction="-1" aria-label="Ver libros anteriores">‹</button><div class="library-exact-book-row" id="library-recommended-row"></div><button class="library-exact-arrow" data-scroll-target="library-recommended-row" data-scroll-direction="1" aria-label="Ver más libros">›</button></div></section><section class="library-exact-section library-exact-authors"><div class="library-exact-section-head"><h2>Autores esenciales <span>›</span></h2></div><div class="library-exact-row-wrap"><button class="library-exact-arrow library-exact-arrow-prev" data-scroll-target="library-author-row" data-scroll-direction="-1" aria-label="Ver autores anteriores">‹</button><div class="library-exact-author-row" id="library-author-row">${libraryExactAuthors.map(libraryExactAuthorCard).join('')}</div><button class="library-exact-arrow" data-scroll-target="library-author-row" data-scroll-direction="1" aria-label="Ver más autores">›</button></div></section><section class="library-exact-section library-exact-topics"><div class="library-exact-section-head"><h2>Explorar por tema <span>›</span></h2></div><div class="library-exact-row-wrap"><button class="library-exact-arrow library-exact-arrow-prev" data-scroll-target="library-topic-row" data-scroll-direction="-1" aria-label="Ver temas anteriores">‹</button><div class="library-exact-topic-row" id="library-topic-row">${libraryExactTopics.map(libraryExactTopicCard).join('')}</div><button class="library-exact-arrow" data-scroll-target="library-topic-row" data-scroll-direction="1" aria-label="Ver más temas">›</button></div></section></section><section id="library-videos-view" class="videoteca-final" hidden></section></div></main>`,
    mount(){
      const world=document.querySelector('.library-exact-world');
      const search=document.querySelector('#library-search');
      const booksView=document.querySelector('#library-books-view');
      const videosView=document.querySelector('#library-videos-view');
      const recommendedRow=document.querySelector('#library-recommended-row');
      const modeButtons=[...document.querySelectorAll('[data-library-mode]')];
      const topicButtons=[...document.querySelectorAll('[data-library-topic]')];
      let mode='books';
      let topicKey='';
      let videoCategory='all';

      const query=()=>String(search.value||'').trim().toLowerCase();
      const matchesBook=book=>{
        const q=query();
        const haystack=[book.title,book.author,book.category,book.shortDescription,book.longDescription,...(book.tags||[])].join(' ').toLowerCase();
        const topic=libraryExactTopics.find(item=>item.key===topicKey);
        const topicMatch=!topic||topic.filters.some(token=>haystack.includes(token.toLowerCase()));
        return topicMatch&&(!q||haystack.includes(q));
      };
      const matchesVideo=video=>{
        const q=query();
        const haystack=[video.title,video.creator,video.description,video.section,video.category].join(' ').toLowerCase();
        const category=videoCategories.find(item=>item.key===videoCategory);
        const categoryMatch=!category||!category.tokens.length||category.tokens.some(token=>haystack.includes(token.toLowerCase()));
        return categoryMatch&&(!q||haystack.includes(q))&&Boolean(youtubeEmbedUrl(video.youtubeUrl));
      };

      const renderBooks=()=>{
        const books=libraryRecommended.filter(matchesBook);
        recommendedRow.innerHTML=books.length?books.map(libraryExactBookCard).join(''):libraryExactInlineEmpty('No encontramos libros para esta búsqueda.');
        bindLibraryBookShelf();
      };

      const renderVideos=()=>{
        const primary=primaryVideoIds.map(id=>libraryVideos.find(video=>video.id===id)).filter(Boolean).filter(matchesVideo);
        const secondary=secondaryVideoIds.map(id=>libraryVideos.find(video=>video.id===id)).filter(Boolean).filter(matchesVideo);
        const q=query();
        const category=videoCategories.find(item=>item.key===videoCategory);
        const channelMatches=channel=>{
          const haystack=[channel.name,channel.area,channel.description].join(' ').toLowerCase();
          const qMatch=!q||haystack.includes(q);
          const cMatch=!category||!category.tokens.length||category.tokens.some(token=>haystack.includes(token.toLowerCase()));
          return qMatch&&cMatch;
        };
        const channels=featuredChannelNames.map(name=>libraryVideoChannels.find(channel=>channel.name===name)).filter(Boolean).filter(channelMatches);
        videosView.innerHTML=`<div class="videoteca-final-shell"><nav class="videoteca-final-filters" aria-label="Categorías de Videoteca">${videoCategories.map(item=>`<button class="videoteca-final-filter ${item.key===videoCategory?'active':''}" data-video-category="${item.key}">${item.label}</button>`).join('')}<button class="videoteca-final-filter videoteca-final-more" data-more-filters>☰ <span>Más filtros</span></button></nav>${videotecaFinalShelf('Videos curados para ti',primary,'videoteca-final-primary','Curaduría breve para entrar por una idea fuerte.','✥')}${videotecaFinalShelf('Profundiza más',secondary,'videoteca-final-secondary','Charlas y análisis para expandir tu comprensión.','◉')}${videotecaFinalChannels(channels,'videoteca-final-channels')}<footer class="videoteca-final-footer"><span>✥</span><p>El conocimiento correcto, en el momento correcto, lo cambia todo.</p></footer></div>`;
        bindVideotecaFinalPlayers(videosView);
        bindLibraryCarouselArrows(videosView);
        videosView.querySelectorAll('[data-video-category]').forEach(button=>button.onclick=()=>{videoCategory=button.dataset.videoCategory;renderVideos()});
        videosView.querySelector('[data-more-filters]')?.addEventListener('click',()=>openModal({title:'Más filtros',content:`<div class="videoteca-more-filter-grid">${['Estoicismo','Metafísica','Liderazgo','Ventas','Entrevistas','Psicología profunda'].map(label=>`<button class="pill" data-extra-video-filter="${label}">${label}</button>`).join('')}</div><p class="muted" style="margin-top:14px">Estos filtros se incorporarán como categorías completas a medida que crezca la curaduría.</p>`}));
        videosView.querySelectorAll('[data-video-show-all]').forEach(button=>button.onclick=()=>{videoCategory='all';search.value='';renderVideos()});
      };

      const render=()=>{
        const isBooks=mode==='books';
        booksView.hidden=!isBooks;
        videosView.hidden=isBooks;
        booksView.style.display=isBooks?'':'none';
        videosView.style.display=isBooks?'none':'block';
        world.classList.toggle('is-video-mode',!isBooks);
        modeButtons.forEach(button=>button.classList.toggle('active',button.dataset.libraryMode===mode));
        topicButtons.forEach(button=>button.classList.toggle('active',button.dataset.libraryTopic===topicKey));
        isBooks?renderBooks():renderVideos();
      };

      modeButtons.forEach(button=>button.onclick=()=>{mode=button.dataset.libraryMode;topicKey='';videoCategory='all';search.value='';render()});
      search.addEventListener('input',()=>mode==='books'?renderBooks():renderVideos());
      search.addEventListener('keydown',event=>{if(event.key==='Escape'){search.value='';mode==='books'?renderBooks():renderVideos()}});
      document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();search.focus()}});
      bindLibraryCarouselArrows(document);
      document.querySelectorAll('[data-library-author]').forEach(button=>button.onclick=()=>{const author=button.dataset.libraryAuthor;const hasBooks=libraryBooks.some(book=>book.author.toLowerCase().includes(author.toLowerCase()));if(!hasBooks){toast(`${button.dataset.displayName||author}: títulos próximamente.`);return}topicKey='';search.value=author;mode='books';render()});
      document.querySelectorAll('[data-library-topic]').forEach(button=>button.onclick=()=>{const next=button.dataset.libraryTopic;topicKey=topicKey===next?'':next;search.value='';mode='books';render()});
      render();
    }
  };
}

function videotecaFinalShelf(title,videos,id,copy,icon='✥'){
  if(!videos.length)return `<section class="videoteca-final-panel"><header class="videoteca-final-section-head"><div class="videoteca-final-title"><span>${icon}</span><div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(copy)}</p></div></div></header><div class="library-exact-inline-empty"><span>Ø</span><p>No hay videos para este filtro.</p></div></section>`;
  return `<section class="videoteca-final-panel"><header class="videoteca-final-section-head"><div class="videoteca-final-title"><span>${icon}</span><div><h2>${escapeHtml(title)}</h2>${title==='Profundiza más'?`<p>${escapeHtml(copy)}</p>`:''}</div></div><div class="videoteca-final-section-tools"><button class="videoteca-final-view-all" data-video-show-all>Ver todos</button><button class="videoteca-final-arrow videoteca-final-arrow-prev" data-scroll-target="${id}" data-scroll-direction="-1" aria-label="Videos anteriores">‹</button><button class="videoteca-final-arrow" data-scroll-target="${id}" data-scroll-direction="1" aria-label="Más videos">›</button></div></header><div class="videoteca-final-row" id="${id}">${videos.map(videotecaFinalCard).join('')}</div></section>`;
}

function videotecaFinalCard(video){
  const thumb=youtubeThumbnail(video.youtubeUrl,'hqdefault');
  const videoId=videoYoutubeId(video.youtubeUrl);
  const initials=video.creator.split(/[\s·-]+/).filter(Boolean).slice(0,2).map(part=>part[0]).join('').toUpperCase();
  return `<article class="videoteca-final-card" data-video-id="${video.id}"><div class="videoteca-final-player" data-inline-player="${video.id}"><button class="videoteca-final-poster" data-inline-play="${video.id}" aria-label="Reproducir ${escapeHtml(video.title)}">${thumb?`<img data-video-thumb-img data-video-id="${videoId}" data-thumb-stage="0" src="${thumb}" alt="Miniatura de ${escapeHtml(video.title)}" loading="lazy">`:''}<div class="videoteca-final-thumb-fallback" data-video-thumb-fallback ${thumb?'hidden':''}><span>${escapeHtml(initials||'Ø')}</span><small>${escapeHtml(video.creator)}</small></div><span class="videoteca-final-check">✓</span><span class="videoteca-final-duration">${escapeHtml(video.duration)}</span><span class="videoteca-final-youtube">▰ YouTube</span></button></div><div class="videoteca-final-card-copy"><div class="videoteca-final-card-title-row"><h3>${escapeHtml(video.title)}</h3><a href="${escapeHtml(video.channelUrl)}" target="_blank" rel="noopener noreferrer" aria-label="Abrir canal de ${escapeHtml(video.creator)}">⋮</a></div><p class="videoteca-final-creator">${escapeHtml(video.creator)}</p><p class="videoteca-final-description">${escapeHtml(video.description)}</p><span class="videoteca-final-tag">${escapeHtml(video.category)}</span></div></article>`;
}

function videotecaFinalChannels(channels,id){
  if(!channels.length)return '';
  return `<section class="videoteca-final-panel videoteca-final-channels-panel"><header class="videoteca-final-section-head"><div class="videoteca-final-title"><span>☆</span><div><h2>Canales esenciales</h2><p>Fuentes de conocimiento que inspiran y transforman.</p></div></div><div class="videoteca-final-section-tools"><button class="videoteca-final-view-all" data-video-show-all>Ver todos</button><button class="videoteca-final-arrow videoteca-final-arrow-prev" data-scroll-target="${id}" data-scroll-direction="-1" aria-label="Canales anteriores">‹</button><button class="videoteca-final-arrow" data-scroll-target="${id}" data-scroll-direction="1" aria-label="Más canales">›</button></div></header><div class="videoteca-final-channel-row" id="${id}">${channels.map(videotecaFinalChannelCard).join('')}</div></section>`;
}

function videotecaFinalChannelCard(channel){
  const video=libraryVideos.find(item=>item.creator.toLowerCase().includes(channel.name.toLowerCase())||channel.name.toLowerCase().includes(item.creator.split('·')[0].trim().toLowerCase()));
  const avatar=video?youtubeThumbnail(video.youtubeUrl,'mqdefault'):'';
  const initials=channel.name.split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join('').toUpperCase();
  return `<a class="videoteca-final-channel" href="${escapeHtml(channel.url)}" target="_blank" rel="noopener noreferrer"><span class="videoteca-final-channel-avatar">${avatar?`<img src="${avatar}" alt="" loading="lazy">`:`<b>${escapeHtml(initials||'Ø')}</b>`}</span><span class="videoteca-final-channel-copy"><strong>${escapeHtml(channel.name)}</strong><small>${escapeHtml(channel.area)}</small></span><span class="videoteca-final-follow">＋ Seguir</span></a>`;
}

function videoYoutubeId(url=''){
  try{const parsed=new URL(url);if(parsed.hostname.includes('youtu.be'))return parsed.pathname.replace('/','').split('/')[0];if(parsed.hostname.includes('youtube.com'))return parsed.searchParams.get('v')||''}catch{}return '';
}

function bindVideotecaFinalPlayers(root){
  root.querySelectorAll('[data-video-thumb-img]').forEach(img=>img.addEventListener('error',()=>{
    const id=img.dataset.videoId;const stage=Number(img.dataset.thumbStage||0);
    if(id&&stage===0){img.dataset.thumbStage='1';img.src=`https://img.youtube.com/vi/${id}/mqdefault.jpg`;return}
    if(id&&stage===1){img.dataset.thumbStage='2';img.src=`https://img.youtube.com/vi/${id}/0.jpg`;return}
    img.hidden=true;img.parentElement?.querySelector('[data-video-thumb-fallback]')?.removeAttribute('hidden');
  }));
  root.querySelectorAll('[data-inline-play]').forEach(button=>button.onclick=()=>{
    const id=button.dataset.inlinePlay;const video=libraryVideos.find(item=>item.id===id);const shell=root.querySelector(`[data-inline-player="${id}"]`);if(!video||!shell)return;const embed=youtubeEmbedUrl(video.youtubeUrl);if(!embed){window.open(video.youtubeUrl||video.channelUrl,'_blank','noopener,noreferrer');return}shell.innerHTML=`<iframe src="${embed}?autoplay=1&rel=0&modestbranding=1" title="${escapeHtml(video.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  });
}

function libraryExactBookCard(book){
  const progress=libraryExactProgress[book.id]??Math.max(28,86-(Number(book.priority||50)%12)*4);
  return `<article class="library-exact-book ${book.placeholder?'is-placeholder':''}" data-book-id="${book.id}" tabindex="0" aria-label="${escapeHtml(book.title)}"><div class="library-exact-book-cover">${libraryExactCoverMarkup(book)}</div><div class="library-exact-book-info"><h3>${escapeHtml(book.title)}</h3><p>${escapeHtml(book.author)}</p><div class="library-exact-progress" aria-label="Relevancia SØD ${progress}%"><span>${progress}%</span><i><b style="width:${progress}%"></b></i></div></div></article>`;
}

function libraryExactCoverMarkup(book){
  if(book.cover)return `<img src="${book.cover}" alt="${escapeHtml(book.title)}" loading="lazy" referrerpolicy="no-referrer">`;
  const hue=(Number(book.priority||20)*37)%360;
  return `<div class="library-exact-placeholder-cover" style="--placeholder-hue:${hue}"><span>SØD LIBRARY</span><strong>${escapeHtml(book.title)}</strong><small>${escapeHtml(book.author)}</small><em>PORTADA<br>PRÓXIMAMENTE</em></div>`;
}

function libraryExactAuthorCard(author){
  return `<button class="library-exact-author" data-library-author="${escapeHtml(author.search)}" data-display-name="${escapeHtml(author.name)}"><span class="library-exact-author-image"><img src="${author.image}" alt="" loading="lazy"></span><strong>${escapeHtml(author.name)}</strong></button>`;
}

function libraryExactTopicCard(topic){
  return `<button class="library-exact-topic" data-library-topic="${escapeHtml(topic.key)}"><span class="library-exact-topic-icon"><img src="${topic.image}" alt="" loading="lazy"></span><span><strong>${escapeHtml(topic.title)}</strong><small>${escapeHtml(topic.copy).replace(/\n/g,'<br>')}</small></span></button>`;
}

function libraryExactInlineEmpty(message){
  return `<div class="library-exact-inline-empty"><span>Ø</span><p>${escapeHtml(message)}</p></div>`;
}

function bindLibraryBookShelf(){
  document.querySelectorAll('[data-book-id]').forEach(bookEl=>{
    const open=()=>{const book=getLibraryBook(bookEl.dataset.bookId);if(book)openBookDetails(book)};
    bookEl.onclick=e=>{if(e.target.closest('button,a'))return;open()};
    bookEl.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}};
  });
}

function openBookDetails(book){
  const available=[book.pdfUrl&&'PDF',book.audioUrl&&'Audiolibro',book.summaryUrl&&'Resumen'].filter(Boolean);
  openModal({title:book.title,className:'library-v5-modal',content:`<div class="library-v5-detail"><div class="library-v5-detail-cover">${libraryExactCoverMarkup(book)}</div><div class="library-v5-detail-copy"><p class="eyebrow">${escapeHtml(book.category)} · ${escapeHtml(book.tags.join(' · '))}</p><h2>${escapeHtml(book.title)}</h2><p class="library-v5-detail-author">${escapeHtml(book.author)}</p><p>${escapeHtml(book.longDescription)}</p><div class="library-v5-metadata"><span>${escapeHtml(book.year)}</span><span>${escapeHtml(book.language)}</span><span>${available.length?`${available.length} formatos conectados`:'Enlaces en curaduría'}</span></div><div class="library-v5-detail-actions"><button class="btn btn-primary" data-library-pdf="${book.id}">Leer PDF</button><button class="btn" data-library-summary="${book.id}">Ver resumen</button><button class="btn" data-library-audio="${book.id}">Escuchar</button></div>${book.pdfFileName?`<p class="library-v5-source-note">Archivo PDF identificado: <strong>${escapeHtml(book.pdfFileName)}</strong>. Falta asignar su URL pública o subir el archivo al proyecto.</p>`:''}</div></div>`,onMount:root=>bindBookMediaActions(root,book)});
}

function bindBookMediaActions(root,book){
  root.querySelector('[data-library-pdf]')?.addEventListener('click',()=>openPdfChoice(book));
  root.querySelector('[data-library-summary]')?.addEventListener('click',()=>openYouTubeMedia(book,'summary'));
  root.querySelector('[data-library-audio]')?.addEventListener('click',()=>openYouTubeMedia(book,'audio'));
}

function openPdfChoice(book){
  if(!book.pdfUrl){toast(`El PDF de “${book.title}” todavía no tiene URL asignada.`,'error');return}
  openModal({title:`Leer · ${book.title}`,className:'library-v5-media-modal',content:`<div class="library-v5-choice"><p class="lead" style="font-size:19px">¿Cómo querés abrir este libro?</p><div class="library-v5-choice-grid"><button class="library-v5-choice-card" data-pdf-read><span>▤</span><strong>Leer acá</strong><small>Abrir el PDF dentro del visor de SØD.</small></button><a class="library-v5-choice-card" href="${escapeHtml(book.pdfUrl)}" download target="_blank" rel="noopener noreferrer"><span>⇩</span><strong>Descargar PDF</strong><small>Guardar una copia desde el enlace curado.</small></a></div></div>`,onMount:(root,close)=>{root.querySelector('[data-pdf-read]').onclick=()=>{close();openPdfViewer(book)}}});
}

function openPdfViewer(book){
  openModal({title:book.title,className:'library-v5-reader-modal',content:`<div class="library-v5-reader"><iframe src="${escapeHtml(book.pdfUrl)}" title="PDF · ${escapeHtml(book.title)}" loading="eager"></iframe><div class="library-v5-reader-fallback"><a class="btn" href="${escapeHtml(book.pdfUrl)}" target="_blank" rel="noopener noreferrer">Abrir PDF en una pestaña nueva</a></div></div>`});
}

function openYouTubeMedia(book,type){
  const url=type==='audio'?book.audioUrl:book.summaryUrl;
  const label=type==='audio'?'audiolibro':'resumen';
  if(!url){toast(`El ${label} de “${book.title}” todavía no tiene link de YouTube asignado.`,'error');return}
  const embed=youtubeEmbedUrl(url);
  if(!embed){window.open(url,'_blank','noopener,noreferrer');return}
  openModal({title:`${type==='audio'?'Escuchar':'Resumen'} · ${book.title}`,className:'library-v5-youtube-modal',content:`<div class="library-v5-youtube"><iframe src="${embed}" title="${escapeHtml(label)} · ${escapeHtml(book.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`});
}

function libraryVideoShelf(title,videos){
  if(!videos.length)return '';
  const id=`video-shelf-${title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}`;
  return `<section class="library-video-sod-section"><div class="library-video-sod-head"><div><p class="eyebrow">CURADURÍA SØD</p><h2>${escapeHtml(title)}</h2></div><span class="pill">${videos.length} videos</span></div><div class="library-video-sod-row-wrap"><button class="library-video-sod-arrow library-video-sod-arrow-prev" data-scroll-target="${id}" data-scroll-direction="-1" aria-label="Videos anteriores">‹</button><div class="library-video-sod-row" id="${id}">${videos.map(libraryVideoV5Card).join('')}</div><button class="library-video-sod-arrow" data-scroll-target="${id}" data-scroll-direction="1" aria-label="Más videos">›</button></div></section>`;
}

function libraryVideoV5Card(video){
  const thumb=youtubeThumbnail(video.youtubeUrl,'hqdefault');
  const initials=video.creator.split(/[\s·-]+/).filter(Boolean).slice(0,2).map(part=>part[0]).join('').toUpperCase();
  return `<article class="library-video-sod-card" data-video-id="${video.id}"><button class="library-video-sod-thumb" data-video-open="${video.id}" aria-label="Reproducir ${escapeHtml(video.title)}">${thumb?`<img src="${thumb}" alt="" loading="lazy" referrerpolicy="no-referrer">`:`<div class="library-video-sod-placeholder"><span>${escapeHtml(initials||'Ø')}</span><small>${escapeHtml(video.creator)}</small></div>`}<div class="library-video-sod-shade"></div><span class="library-video-sod-play">▶</span><span class="library-video-sod-duration">${escapeHtml(video.duration)}</span></button><div class="library-video-sod-copy"><p class="eyebrow">${escapeHtml(video.category)} · ${escapeHtml(video.creator)}</p><h3>${escapeHtml(video.title)}</h3><p>${escapeHtml(video.description)}</p><div class="library-video-sod-actions"><button class="btn btn-small" data-video-open="${video.id}">${youtubeEmbedUrl(video.youtubeUrl)?'Reproducir':'Abrir fuente'}</button><a class="library-video-channel-link" href="${escapeHtml(video.channelUrl||video.youtubeUrl)}" target="_blank" rel="noopener noreferrer">Canal ↗</a></div></div></article>`;
}

function libraryChannelShelf(channels){
  if(!channels.length)return '';
  const id='video-channel-shelf';
  return `<section class="library-video-sod-section library-video-channel-section"><div class="library-video-sod-head"><div><p class="eyebrow">FUENTES</p><h2>Canales esenciales</h2><p>Los exponentes y canales que alimentan la curaduría de la Videoteca SØD.</p></div><span class="pill">${channels.length} canales</span></div><div class="library-video-sod-row-wrap"><button class="library-video-sod-arrow library-video-sod-arrow-prev" data-scroll-target="${id}" data-scroll-direction="-1" aria-label="Canales anteriores">‹</button><div class="library-video-channel-row" id="${id}">${channels.map(libraryVideoChannelCard).join('')}</div><button class="library-video-sod-arrow" data-scroll-target="${id}" data-scroll-direction="1" aria-label="Más canales">›</button></div></section>`;
}

function libraryVideoChannelCard(channel){
  const initials=channel.name.split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join('').toUpperCase();
  const hue=(channel.name.split('').reduce((sum,char)=>sum+char.charCodeAt(0),0)*7)%360;
  return `<a class="library-video-channel-card" href="${escapeHtml(channel.url)}" target="_blank" rel="noopener noreferrer" style="--channel-hue:${hue}"><span class="library-video-channel-avatar">${escapeHtml(initials||'Ø')}</span><div><p class="eyebrow">${escapeHtml(channel.area)}</p><h3>${escapeHtml(channel.name)}</h3><p>${escapeHtml(channel.description)}</p><strong>Explorar canal ↗</strong></div></a>`;
}

function bindLibraryVideos(){
  document.querySelectorAll('[data-video-open]').forEach(button=>button.onclick=e=>{e.stopPropagation();const video=libraryVideos.find(item=>item.id===button.dataset.videoOpen);if(!video)return;const embed=youtubeEmbedUrl(video.youtubeUrl);if(embed){openModal({title:video.title,className:'library-v5-youtube-modal',content:`<div class="library-v5-youtube"><iframe src="${embed}" title="${escapeHtml(video.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`});return}window.open(video.youtubeUrl||video.channelUrl,'_blank','noopener,noreferrer')});
}

function bindLibraryVideoChannels(){
  // Native anchors intentionally keep the source channel discoverable and open in a new tab.
}

function bindLibraryCarouselArrows(root=document){
  root.querySelectorAll?.('[data-scroll-target]').forEach(button=>button.onclick=()=>{
    const target=document.getElementById(button.dataset.scrollTarget);
    const direction=Number(button.dataset.scrollDirection||1)||1;
    target?.scrollBy({left:direction*Math.max(360,target.clientWidth*.72),behavior:'smooth'});
  });
}

function libraryEmpty(title,copy){return `<div class="library-v5-empty"><span>Ø</span><h2>${escapeHtml(title)}</h2><p>${escapeHtml(copy)}</p></div>`}

function seedsView(){const all=seeds;return{title:'Semillas',html:`<main id="app-main" class="visual-page" style="--visual-bg:url('${visual('036')}')"><div class="visual-page-shade"></div><div class="visual-page-content">${pageHero('SEMILLAS SØD','Conocimiento vivo<br><span style="color:var(--green)">que ya estaba esperando.</span>','Las Semillas no se crean. Se descubren, se desbloquean, se cultivan y, cuando dejan evidencia, germinan.')}<section class="section" style="padding-top:10px"><div class="container"><div class="toolbar"><input class="search-input" id="seed-search" placeholder="Buscar una comprensión"><span class="pill">${all.length} Semillas canónicas</span></div><div class="seed-grid visual-seed-grid" id="seed-grid">${all.map(seedCard).join('')}</div></div></section></div></main>`,mount(){const grid=document.querySelector('#seed-grid');const render=q=>{grid.innerHTML=all.filter(x=>(x.title+x.interpretation+(x.keywords||[]).join(' ')).toLowerCase().includes(q.toLowerCase())).map(seedCard).join('')||'<div class="empty" style="grid-column:1/-1">No hay coincidencias.</div>';bindSeedCards(grid)};document.querySelector('#seed-search').oninput=e=>render(e.target.value);bindSeedCards(grid)}}}
function seedCard(seed){return `<a class="seed-visual-card" href="/semillas/${seed.id}" data-link style="--seed-image:url('${seed.image}')"><div class="seed-visual-shade"></div><div class="seed-card-content"><span class="eyebrow">${seed.state==='latent'?'LATENTE':'DESCUBIERTA'}</span><div class="seed-symbol">${seed.glyph||'Ø'}</div><blockquote>${escapeHtml(seed.title)}</blockquote><p>${escapeHtml(seed.interpretation)}</p><div class="tag-list">${(seed.keywords||[]).map(k=>`<span class="tag">${escapeHtml(k)}</span>`).join('')}</div></div></a>`}
function bindSeedCards(){/* links are handled by the router */}
function seedDetailView(id){const seed=seeds.find(x=>x.id===id);if(!seed)return notFoundView();const saved=state().collection.seeds.includes(id);return{title:seed.title,html:`<main id="app-main"><section class="seed-detail-hero" style="--seed-image:url('${seed.image}')"><div class="seed-detail-shade"></div><div class="container seed-detail-content"><p class="eyebrow">SEMILLA ${String(seed.number).padStart(2,'0')} · ${seed.state.toUpperCase()}</p><h1 class="page-title">${escapeHtml(seed.title)}</h1><p class="lead">${escapeHtml(seed.interpretation)}</p><div class="actions"><button class="btn btn-primary" data-save-seed>${saved?'Dejar de cultivar':'Descubrir y cultivar'}</button><a class="btn" href="/semillas" data-link>Volver</a></div></div></section><section class="section"><div class="container grid grid-2"><article class="card"><div class="card-body"><p class="eyebrow">COMPRENSIÓN</p><p class="lead" style="font-size:22px">${escapeHtml(seed.interpretation)}</p></div></article><article class="card"><div class="card-body"><p class="eyebrow">PRÁCTICA DE CULTIVO</p><p class="lead" style="font-size:22px">${escapeHtml(seed.application)}</p></div></article></div></section></main>`,mount(){document.querySelector('[data-save-seed]').onclick=e=>{store.update(s=>{const list=s.collection.seeds;const i=list.indexOf(id);i>=0?list.splice(i,1):list.push(id);return s});e.currentTarget.textContent=state().collection.seeds.includes(id)?'Dejar de cultivar':'Descubrir y cultivar';toast('Estado de la Semilla actualizado')}}}}

function elementsView(){return{title:'Elementos 33',html:`<main id="app-main" class="elements-sanctuary" style="--elements-bg:url('${visual('037')}')"><div class="elements-sanctuary-shade"></div><section class="elements-intro container"><p class="eyebrow">NÚCLEO FILOSÓFICO</p><h1>Cinco fuerzas.<br><span>Ciento sesenta y cinco lecturas.</span></h1><p>Elementos 33 no es una grilla de objetos. Es un mapa monumental del desarrollo humano. Esta V3 utiliza placeholders visuales hasta integrar las piezas definitivas.</p><div class="elements-law"><span>12 Velo</span><span>12 Remez</span><span>6 Derash</span><span>2 SØD</span><span>1 SØD²</span></div></section><section class="force-gates container">${elementDefinitions.map((e,i)=>`<a class="force-gate" href="/elementos/${e.key}" data-link style="--element:${e.color};--element-image:url('${e.visual}')"><div class="force-gate-image"></div><div class="force-gate-shade"></div><span class="force-number">0${i+1}</span>${e.placeholder?'<span class="placeholder-badge">PLACEHOLDER VISUAL</span>':''}<div class="force-copy"><span class="force-glyph">${e.glyph}</span><p class="eyebrow">33 PIEZAS</p><h2>${e.name}</h2><p>${e.description}</p><strong>Entrar a la fuerza →</strong></div></a>`).join('')}</section></main>`}}


function elementView(key){const element=elementDefinitions.find(e=>e.key===key);if(!element)return notFoundView();const pieces=elementPieces.filter(p=>p.element===key);const levelSection=(level,items)=>`<section class="element-level level-${level.key}" data-level-section="${level.key}"><header><div><p class="eyebrow">${level.label}</p><h2>${level.meaning}</h2></div><span>${items.length} piezas</span></header><div class="element-piece-field">${items.map(p=>`<a class="element-piece-artifact ${level.key==='sod2'?'origin-piece':''}" href="/elementos/${key}/${p.number}" data-link data-piece-search="${(p.title+p.levelLabel+p.geometricMotif+p.number).toLowerCase()}" style="--element:${element.color};--artifact-image:url('${element.visual}')"><div class="element-piece-image"></div><div class="element-piece-glow"></div><span class="element-piece-number">${String(p.number).padStart(2,'0')}</span><div><p>${p.levelLabel}</p><strong>${p.title}</strong><small>${p.geometricMotif}</small></div></a>`).join('')}</div></section>`;return{title:element.name,html:`<main id="app-main" class="element-world" style="--element:${element.color};--element-image:url('${element.visual}')"><section class="element-world-hero"><div class="element-world-bg"></div><div class="element-world-shade"></div><div class="container element-world-copy"><p class="eyebrow">ELEMENTOS 33 · FUERZA 0${elementDefinitions.indexOf(element)+1}</p><span class="element-world-glyph">${element.glyph}</span><h1>${element.name}</h1><p>${element.description}</p>${element.placeholder?'<span class="placeholder-badge">ARTE DEFINITIVO PENDIENTE · PLACEHOLDER ACTIVO</span>':''}<div class="actions"><a class="btn" href="/elementos" data-link>Volver a las cinco fuerzas</a></div></div></section><section class="element-codex"><div class="container"><div class="element-toolbar"><div><p class="eyebrow">CÓDICE DE ${element.name.toUpperCase()}</p><h2>De lo visible al origen.</h2></div><div class="element-toolbar-controls"><select class="search-input" id="level-filter"><option value="">Todos los niveles</option>${levelDefinitions.map(l=>`<option value="${l.key}">${l.label}</option>`).join('')}</select><input class="search-input" id="piece-search" placeholder="Buscar pieza, nivel o motivo"><span class="pill" id="piece-count">33 piezas</span></div></div><div id="element-levels">${levelDefinitions.map(level=>levelSection(level,pieces.filter(p=>p.level===level.key))).join('')}</div></div></section></main>`,mount(){const filter=()=>{const level=document.querySelector('#level-filter').value;const q=document.querySelector('#piece-search').value.toLowerCase();let count=0;document.querySelectorAll('[data-level-section]').forEach(section=>{let visible=0;section.querySelectorAll('[data-piece-search]').forEach(card=>{const show=(!q||card.dataset.pieceSearch.includes(q))&&(!level||section.dataset.levelSection===level);card.hidden=!show;if(show){visible++;count++}});section.hidden=visible===0});document.querySelector('#piece-count').textContent=`${count} piezas`};document.querySelector('#level-filter').onchange=filter;document.querySelector('#piece-search').oninput=filter}}}


function pieceDetailView(elementKey,number){const piece=getPiece(elementKey,number);if(!piece)return notFoundView();const element=elementDefinitions.find(e=>e.key===elementKey);const saved=state().collection.pieces.includes(piece.id);return{title:piece.title,html:`<main id="app-main" class="piece-experience" style="--element:${element.color};--piece-image:url('${element.visual}')"><section class="piece-experience-hero"><div class="piece-experience-bg"></div><div class="piece-experience-shade"></div><div class="container piece-experience-copy"><p class="eyebrow">${piece.elementName.toUpperCase()} · ${piece.levelLabel.toUpperCase()}</p><span class="piece-hero-number">${String(piece.number).padStart(2,'0')}</span><span class="piece-hero-glyph">${piece.symbol}</span><h1>${piece.title}</h1><p>${piece.phrase}</p>${element.placeholder?'<span class="placeholder-badge">PLACEHOLDER VISUAL</span>':''}<div class="actions"><button class="btn btn-primary" data-piece-practice>Vivir la experiencia</button><button class="btn" data-save-piece>${saved?'Quitar de mi archivo':'Guardar en mi archivo'}</button><a class="btn btn-ghost" href="/elementos/${elementKey}" data-link>Volver a ${piece.elementName}</a></div></div></section><section class="piece-reading"><div class="container"><article><p class="eyebrow">INTERPRETACIÓN</p><h2>Una lectura, no una doctrina.</h2><p>${piece.interpretation}</p></article><article><p class="eyebrow">APLICACIÓN</p><h2>La comprensión necesita evidencia.</h2><p>${piece.practicalApplication}</p></article><aside><p class="eyebrow">RELACIONES</p><div class="tag-list">${piece.keywords.map(k=>`<span class="tag">${k}</span>`).join('')}</div><p class="muted">Motivo: ${piece.geometricMotif}<br>Edición: ${piece.edition}<br>Profundidad: ${piece.rarity}</p></aside></div></section></main>`,mount(){document.querySelector('[data-save-piece]').onclick=e=>{store.update(s=>{const list=s.collection.pieces;const i=list.indexOf(piece.id);i>=0?list.splice(i,1):list.push(piece.id);return s});e.currentTarget.textContent=state().collection.pieces.includes(piece.id)?'Quitar de mi archivo':'Guardar en mi archivo';toast('Archivo personal actualizado')};document.querySelector('[data-piece-practice]').onclick=()=>openModal({title:`Experiencia · ${piece.title}`,content:`<p class="lead" style="font-size:20px">${piece.practicalApplication}</p><p class="muted">Contenido placeholder funcional. Un Código solo puede conservarse si reconocés una transición.</p><form class="form" id="piece-practice"><div class="field"><label>Antes</label><textarea name="before" required></textarea></div><div class="field"><label>Después</label><textarea name="after" required></textarea></div><label class="option"><input type="checkbox" name="transition" required><strong>Reconozco que algo cambió en cómo observo o actúo.</strong></label><button class="btn btn-primary">Conservar como Código</button></form>`,onMount:(root,close)=>{root.querySelector('form').onsubmit=e=>{e.preventDefault();const fd=new FormData(e.currentTarget);const now=new Date();store.update(s=>{s.codes=[...(s.codes||[]),{id:`SOD-${Date.now()}`,title:`Integración de ${piece.title}`,type:'Integración',depth:(s.codes||[]).length?'Común':'Fundacional',createdAt:now.toISOString(),date:now.toLocaleDateString('es-AR'),originUniverse:'elements33',originEvent:'element_practice_transition',summary:String(fd.get('after')),meaning:`Antes: ${String(fd.get('before'))}`,visual:visual('044'),linkedSeedIds:[],linkedElementIds:[piece.id],userConfirmed:true,privacy:'private',status:'active'}];return s});toast('Código SØD conservado');close()}}})}}}


function codeCard(code){return `<article class="code-card" style="--code-image:url('${code.visual||visual('042')}')"><div class="code-card-shade"></div><div class="code-card-content"><span class="eyebrow">${escapeHtml(code.type)} · ${escapeHtml(code.depth||'Común')}</span><h3>${escapeHtml(code.title)}</h3><p>${escapeHtml(code.summary)}</p><small>${escapeHtml(code.date||'')}</small></div></article>`}

function codesView(){const codes=state().codes||[];const active=codes[0]||sampleCodes[0];const archive=codes.length?codes:sampleCodes;return{title:'Códigos SØD',html:`<main id="app-main" class="codes-museum" style="--museum-bg:url('${visual('046')}')"><div class="codes-museum-shade"></div><section class="codes-museum-intro container"><p class="eyebrow">BIBLIOTECA PERSONAL</p><h1>Códigos SØD.<br><span>Evidencia del recorrido.</span></h1><p>Las Semillas transforman. Los Códigos conservan el momento en que algo realmente cambió.</p>${codes.length?'':'<span class="placeholder-badge">MODO DEMOSTRACIÓN · LAS RELIQUIAS VISIBLES SON PLACEHOLDERS</span>'}</section><section class="code-exhibition container"><div class="code-pedestal"><div class="code-pedestal-image" style="--code-image:url('${active.visual||visual('042')}')"></div><div class="code-pedestal-ring"></div></div><article class="code-story"><p class="eyebrow">${escapeHtml(active.type)} · ${escapeHtml(active.depth||'Común')}</p><h2>${escapeHtml(active.title)}</h2><p>${escapeHtml(active.summary)}</p><dl><div><dt>Origen</dt><dd>${escapeHtml(active.originUniverse||'Demostración')}</dd></div><div><dt>Fecha</dt><dd>${escapeHtml(active.date||'Placeholder')}</dd></div><div><dt>Privacidad</dt><dd>${escapeHtml(active.privacy||'Privado')}</dd></div></dl><div class="actions"><a class="btn btn-primary" href="/experiencia" data-link>Iniciar una transformación</a><a class="btn" href="/coleccion" data-link>Abrir museo personal</a></div></article></section><section class="code-archive-strip"><div class="container"><p class="eyebrow">RELIQUIAS DEL ARCHIVO</p><div class="code-relic-rail">${archive.map((c,i)=>`<article class="code-relic-mini ${i===0?'active':''}" style="--code-image:url('${c.visual||visual('042')}')"><div></div><span>${String(i+1).padStart(2,'0')}</span><strong>${escapeHtml(c.title)}</strong></article>`).join('')}</div></div></section></main>`}}


function observatoryView(){const s=state();const seedCount=s.collection.seeds.length;const codeCount=(s.codes||[]).length;const habits=s.journey.completedDays.length;const active=seedCount+codeCount+habits;return{title:'Observatorio',html:`<main id="app-main" class="observatory-page observatory-v3" style="--observatory-image:url('${visual('038')}')"><div class="observatory-shade"></div><div class="observatory-world-signals" aria-hidden="true"><span class="world-tree ${seedCount?'visible':''}" style="--x:24%;--y:68%">✦</span><span class="world-tree ${seedCount>2?'visible':''}" style="--x:72%;--y:61%">✦</span><span class="world-monument ${codeCount?'visible':''}" style="--x:51%;--y:54%">◇</span><span class="world-path ${habits?'visible':''}"></span><span class="world-constellation ${codeCount?'visible':''}"></span></div><div class="container observatory-content"><p class="eyebrow">META-UNIVERSO</p><h1 class="page-title">¿En quién me estoy convirtiendo?</h1><p class="lead">No muestra progreso. Muestra relaciones. El paisaje interpreta lo que normalmente permanecería invisible.</p><div class="observatory-story-grid"><article class="observatory-narrative"><p>${active?'Tu mundo ya conserva huellas reales. Cada brote, reliquia y tramo de sendero está vinculado con una experiencia registrada.':'El paisaje todavía está casi vacío. No porque no haya potencial, sino porque la historia recién comienza.'}</p><div class="actions"><a class="btn btn-primary" href="/experiencia" data-link>${active?'Continuar el recorrido':'Iniciar la primera transformación'}</a><a class="btn" href="/codigos" data-link>Recorrer Códigos</a><a class="btn btn-ghost" href="/hub" data-link>Volver al Hub</a></div></article><div class="observatory-relations"><p class="eyebrow">RELACIONES VISIBLES</p><div><span>${seedCount}</span><p><strong>Brotes</strong><small>Semillas descubiertas o cultivadas.</small></p></div><div><span>${codeCount}</span><p><strong>Monumentos</strong><small>Transiciones que decidiste conservar.</small></p></div><div><span>${habits}</span><p><strong>Senderos</strong><small>Acciones sostenidas en el tiempo.</small></p></div></div></div></div></main>`}}


function collectionView(){const s=state();const collectedSeeds=seeds.filter(x=>s.collection.seeds.includes(x.id));const pieces=s.collection.pieces.map(id=>elementPieces.find(x=>x.id===id)).filter(Boolean);const codes=s.codes||[];return{title:'Biblioteca Personal',html:`<main id="app-main">${pageHero('BIBLIOTECA PERSONAL','Un museo de la evolución.<br><span style="color:var(--cyan)">No una carpeta.</span>','Semillas descubiertas, Códigos del recorrido y principios de Elementos 33 conviven sin confundirse.')}<section class="section" style="padding-top:10px"><div class="container"><h2>Códigos SØD</h2><div class="code-grid">${codes.map(codeCard).join('')}</div><div class="divider"></div><h2>Semillas cultivadas</h2>${collectedSeeds.length?`<div class="seed-grid">${collectedSeeds.map(seedCard).join('')}</div>`:'<div class="empty">Todavía no cultivaste Semillas.</div>'}<div class="divider"></div><h2>Elementos 33</h2>${pieces.length?`<div class="piece-grid">${pieces.map(p=>{const e=elementDefinitions.find(x=>x.key===p.element);return `<a class="piece" href="/elementos/${p.element}/${p.number}" data-link style="--piece-color:${e.color}44"><span class="piece-number">${String(p.number).padStart(2,'0')}</span><span class="piece-level">${p.elementName}</span></a>`}).join('')}</div>`:'<div class="empty">Todavía no guardaste piezas.</div>'}</div></section></main>`}}

function marketplaceView(){return{title:'La Forja',html:`<main id="app-main" class="visual-page" style="--visual-bg:url('${visual('046')}')"><div class="visual-page-shade"></div><div class="visual-page-content">${pageHero('LA FORJA · PRÓXIMAMENTE','Recursos para continuar.<br><span style="color:var(--gold)">Nunca el centro del viaje.</span>','La Forja permanecerá en la periferia del ecosistema y solo ofrecerá herramientas, experiencias y creadores alineados con la constitución de SØD.')}<section class="section" style="padding-top:10px"><div class="container"><article class="card"><div class="card-body"><span class="pill">CAPA FUTURA</span><h2 style="font-size:42px;margin-top:24px">Todavía no abrimos esta puerta.</h2><p class="lead">No inventamos contratos, precios, supply ni propiedad. El crecimiento personal no será interrumpido por promociones dentro del Hub.</p><a class="btn" href="/hub" data-link>Volver al Hub</a></div></article></div></section></div></main>`}}

function profileView(){const s=state();const completion=s.journey.completedDays.length;return{title:'Identidad',html:`<main id="app-main" class="visual-page" style="--visual-bg:url('${visual('055')}')"><div class="visual-page-shade"></div><div class="visual-page-content">${pageHero('IDENTIDAD','¿Quién sos hoy?','Identidad no es Ajustes. Es una representación revisable de tu historia, valores, dirección y forma de ser acompañado.')}<section class="section" style="padding-top:10px"><div class="container"><div class="grid grid-4"><article class="card metric"><span class="eyebrow">RECORRIDO</span><strong>${completion}</strong><span class="muted">integraciones</span></article><article class="card metric"><span class="eyebrow">SEMILLAS</span><strong>${s.collection.seeds.length}</strong><span class="muted">descubiertas</span></article><article class="card metric"><span class="eyebrow">CÓDIGOS</span><strong>${(s.codes||[]).length}</strong><span class="muted">momentos conservados</span></article><article class="card metric"><span class="eyebrow">HISTORIAL LOCAL</span><strong>${Math.floor((s.dialogue||[]).length/2)}</strong><span class="muted">capítulos anteriores</span></article></div><div class="grid grid-2" style="margin-top:18px"><article class="card"><div class="card-body"><h2>${escapeHtml(s.profile.name)}</h2><p class="muted">Esta identidad debe evolucionar con vos y nunca convertirse en una etiqueta fija o un diagnóstico.</p><div class="actions"><a class="btn btn-primary" href="/observatorio" data-link>Contemplar evolución</a><a class="btn" href="/coleccion" data-link>Biblioteca Personal</a></div></div></article><article class="card"><div class="card-body"><h2>Control</h2><p class="muted">La memoria debe poder revisarse, corregirse, exportarse y olvidarse.</p><div class="actions"><a class="btn" href="/configuracion" data-link>Ajustes técnicos</a><a class="btn" href="/privacidad" data-link>Privacidad y memoria</a></div></div></article></div></div></section></div></main>`}}

function configView(){const s=state();return{title:'Configuración',html:`<main id="app-main" class="calibration-world" style="--calibration-bg:url('${visual('061')}')"><div class="calibration-shade"></div><section class="calibration-layout container"><div class="calibration-preview"><p class="eyebrow">CÁMARA DE CALIBRACIÓN</p><h1>La inmersión también debe darte control.</h1><p>Los cambios se reflejan en esta maqueta y permanecen en el dispositivo.</p><div class="calibration-core ${s.settings.motion?'alive':''}"><span>Ø</span><i></i><i></i><i></i></div><div class="calibration-preview-meta"><span>${s.settings.quality.toUpperCase()}</span><span>${s.settings.audio?'AUDIO ACTIVO':'SILENCIO'}</span><span>${s.settings.motion?'MUNDO VIVO':'MOVIMIENTO REDUCIDO'}</span></div></div><div class="calibration-console"><p class="eyebrow">PREFERENCIAS</p><div class="settings-list"><div class="setting-row"><div><strong>Audio ambiental</strong><div class="muted">Generativo, sin voz y siempre opt-in.</div></div><button class="switch ${s.settings.audio?'on':''}" data-toggle="audio" role="switch" aria-checked="${s.settings.audio}"><span></span></button></div><div class="setting-row"><div><strong>Movimiento dinámico</strong><div class="muted">Respiración, partículas y transiciones.</div></div><button class="switch ${s.settings.motion?'on':''}" data-toggle="motion" role="switch" aria-checked="${s.settings.motion}"><span></span></button></div><div class="setting-row"><div><strong>Alto contraste</strong><div class="muted">Refuerza texto, bordes y foco.</div></div><button class="switch ${s.settings.highContrast?'on':''}" data-toggle="highContrast" role="switch" aria-checked="${s.settings.highContrast}"><span></span></button></div><div class="setting-row"><div><strong>Reducir efectos</strong><div class="muted">Desactiva blur y recursos decorativos.</div></div><button class="switch ${s.settings.reduceEffects?'on':''}" data-toggle="reduceEffects" role="switch" aria-checked="${s.settings.reduceEffects}"><span></span></button></div><div class="setting-row"><div><label for="quality"><strong>Calidad gráfica</strong></label><div class="muted">Conservadora por defecto.</div></div><select id="quality" class="search-input"><option value="auto" ${s.settings.quality==='auto'?'selected':''}>Automática</option><option value="low" ${s.settings.quality==='low'?'selected':''}>Esencial</option><option value="high" ${s.settings.quality==='high'?'selected':''}>Alta</option></select></div><div class="setting-row"><div><label for="volume"><strong>Volumen ambiente</strong></label><div class="muted">Independiente y persistente.</div></div><input id="volume" type="range" min="0" max="1" step="0.05" value="${s.settings.ambientVolume}"></div><div class="setting-row danger-setting"><div><strong>Datos locales</strong><div class="muted">Restablece onboarding, progreso, colección y preferencias.</div></div><button class="btn btn-danger" data-reset>Restablecer</button></div></div></div></section></main>`,mount(){const refreshSwitch=(btn,val)=>{btn.classList.toggle('on',val);btn.setAttribute('aria-checked',String(val));document.querySelector('.calibration-core')?.classList.toggle('alive',state().settings.motion)};document.querySelectorAll('[data-toggle]').forEach(btn=>btn.onclick=async()=>{const key=btn.dataset.toggle;const val=!state().settings[key];store.update(s=>{s.settings[key]=val;return s});refreshSwitch(btn,val);if(key==='audio'){if(val)await ambient.start(state().settings.ambientVolume);else ambient.stop()}if(key==='highContrast')document.body.classList.toggle('high-contrast',val);if(key==='reduceEffects')document.body.classList.toggle('reduce-effects',val);toast('Preferencia actualizada')});document.querySelector('#quality').onchange=e=>{store.update(s=>{s.settings.quality=e.target.value;return s});toast('Calidad actualizada')};document.querySelector('#volume').oninput=e=>{const val=Number(e.target.value);store.update(s=>{s.settings.ambientVolume=val;return s});ambient.setVolume(val)};document.querySelector('[data-reset]').onclick=()=>confirmAction('Esto borrará el progreso y las preferencias locales. La bitácora persistida en el servidor no se elimina.',()=>{store.reset();try{sessionStorage.removeItem('sod-guest-conversation-session-v1')}catch{}toast('Datos locales restablecidos');navigate('/')})}}}


function privacyView(){return{title:'Privacidad',html:`<main id="app-main">${pageHero('PRIVACIDAD','La introspección no debe convertirse<br><span style="color:var(--cyan)">en materia prima de vigilancia.</span>','Política funcional del MVP y límites que la arquitectura debe conservar.')}<section class="section" style="padding-top:10px"><div class="container grid grid-2"><article class="card"><div class="card-body"><h2>Qué se guarda</h2><p class="muted">Preferencias, progreso y colección se guardan localmente. La conversación invitada usa una sesión temporal del navegador; todavía no existe sincronización longitudinal entre dispositivos.</p></div></article><article class="card"><div class="card-body"><h2>Qué no se envía</h2><p class="muted">El texto privado de diálogos y bitácora no se envía a analytics. Esta versión no incorpora trackers de terceros.</p></div></article><article class="card"><div class="card-body"><h2>Límites de SØD</h2><p class="muted">El diálogo es reflexión guiada, no terapia, diagnóstico, asesoramiento médico, legal ni autoridad absoluta.</p></div></article><article class="card"><div class="card-body"><h2>Control</h2><p class="muted">Podés borrar el estado local desde Configuración y eliminar registros individuales de la Bitácora.</p><a class="btn btn-small" href="/configuracion" data-link>Abrir configuración</a></div></article></div></section></main>`}}

function adminView(){return{title:'Admin',html:`<main id="app-main">${pageHero('ADMIN · LOCAL FIRST','Contenido operativo<br><span style="color:var(--cyan)">sin tocar componentes.</span>','Panel básico para editar mensaje, clave y anuncio. En producción debe protegerse por roles y sesiones reales.')}<section class="section" style="padding-top:10px"><div class="container grid grid-2"><article class="card"><div class="card-body"><h2>Contenido del Hub</h2><form class="form" id="admin-form"><div class="field"><label for="dailyMessage">Mensaje diario</label><textarea id="dailyMessage" name="dailyMessage"></textarea></div><div class="field"><label for="dailyKey">Clave del día</label><input id="dailyKey" name="dailyKey" maxlength="180"></div><div class="field"><label for="announcement">Anuncio</label><textarea id="announcement" name="announcement"></textarea></div><button class="btn btn-primary">Guardar cambios en este dispositivo</button></form></div></article><article class="card"><div class="card-body"><h2>Estado del contenido</h2><table class="admin-table"><tbody><tr><th>Universos</th><td>${universes.length} activos</td></tr><tr><th>Semillas base</th><td>${seeds.length}</td></tr><tr><th>Elementos 33</th><td>${elementPieces.length}</td></tr><tr><th>Journeys</th><td>1 · 14 días</td></tr><tr><th>Blockchain</th><td>Feature flag apagado</td></tr><tr><th>LLM</th><td>Adaptador scripted</td></tr></tbody></table><div class="divider"></div><p class="muted">Importación JSON/CSV, versionado editorial, media manager y RBAC quedan documentados como siguiente iteración real.</p></div></article></div></section></main>`,mount(){const form=document.querySelector('#admin-form');api.getAdmin().then(r=>{form.dailyMessage.value=r.content.dailyMessage||'';form.dailyKey.value=r.content.dailyKey||'';form.announcement.value=r.content.announcement||''}).catch(err=>toast(err.message,'error'));form.onsubmit=async e=>{e.preventDefault();const fd=new FormData(form);try{await api.saveAdmin(Object.fromEntries(fd));toast('Contenido publicado')}catch(err){toast(err.message,'error')}}}}}

function renderChatText(value=''){
  const escaped=escapeHtml(value).replace(/(https?:\/\/[^\s<]+)/g,'<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');
  const lines=escaped.split(/\r?\n/);
  let html='',listOpen=false;
  for(const raw of lines){
    const line=raw.trim();
    const bullet=line.match(/^[-*]\s+(.+)/);
    if(bullet){if(!listOpen){html+='<ul>';listOpen=true}html+=`<li>${bullet[1]}</li>`;continue}
    if(listOpen){html+='</ul>';listOpen=false}
    if(line)html+=`<p>${line}</p>`;
  }
  if(listOpen)html+='</ul>';
  return html||'<p></p>';
}

function chatTime(value){
  try{return new Date(value||Date.now()).toLocaleTimeString('es-AR',{hour:'2-digit',minute:'2-digit'})}catch{return ''}
}

function chatMessageTemplate(message){
  const isUser=message.role==='user';
  const roleLabel=isUser?'Vos':'SØD';
  return `<article class="sod-oracle-message ${isUser?'user':'assistant'} ${message.status==='error'?'error':''}" data-message-id="${escapeHtml(message.id)}">
    ${isUser?'':`<div class="sod-oracle-avatar" aria-hidden="true"><img src="${VISUALS.hubSodIcon}" alt=""></div>`}
    <div class="sod-oracle-message-bubble">
      <div class="sod-oracle-message-meta"><strong>${roleLabel}</strong>${message.legacy?'<span>historial local</span>':''}<time>${chatTime(message.createdAt)}</time></div>
      <div class="sod-oracle-copy">${renderChatText(message.text)}</div>
      ${message.status==='error'?`<div class="sod-oracle-message-error"><span>No se pudo enviar.</span><button class="btn btn-small" data-retry-message="${escapeHtml(message.id)}">Reintentar</button></div>`:''}
    </div>
  </article>`;
}

const oracleIcon=(type)=>({
  chats:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5.5h14v10H9l-4 3v-13Z"/><path d="M8 9h8M8 12h6"/></svg>',
  history:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 12a8 8 0 1 0 2.3-5.7L4 8.6"/><path d="M4 4v4.6h4.6M12 8v4l2.7 1.7"/></svg>',
  archive:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>',
  close:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>'
}[type]||'');

function conversationSurfaceMarkup({overlay=false}={}){
  return `<section class="sod-oracle ${overlay?'sod-oracle-overlay':''}" data-sod-conversation ${overlay?'hidden aria-hidden="true"':''} style="--sod-oracle-bg:url('${VISUALS.talk}')">
    <div class="sod-oracle-background" aria-hidden="true"></div>
    <div class="sod-oracle-atmosphere" aria-hidden="true"></div>
    <button class="sod-oracle-close" data-conversation-close type="button" aria-label="Cerrar conversación">${oracleIcon('close')}</button>
    <nav class="sod-oracle-tools" aria-label="Conversaciones">
      <button type="button" data-history-toggle title="Chats anteriores" aria-label="Abrir chats anteriores">${oracleIcon('chats')}</button>
      <button type="button" data-history-toggle title="Historial" aria-label="Abrir historial">${oracleIcon('history')}</button>
      <button type="button" data-new-conversation title="Nueva conversación" aria-label="Nueva conversación">${oracleIcon('archive')}</button>
    </nav>
    <aside class="sod-oracle-history" data-oracle-history aria-label="Historial local de conversaciones">
      <div class="sod-oracle-history-head"><div><p class="eyebrow">CONVERSACIONES</p><h2>Chats anteriores</h2></div><button type="button" data-history-close aria-label="Cerrar historial">×</button></div>
      <div class="sod-oracle-history-list" data-history-list></div>
      <p class="sod-oracle-history-note">Vista local del prototipo. Codex conectará este panel con el historial persistente del backend.</p>
    </aside>
    <div class="sod-oracle-stage">
      <header class="sod-oracle-header">
        <h1>Conversación de claridad</h1>
        <div class="sod-oracle-presence" data-presence-label><span></span>Presente</div>
      </header>
      <div class="sod-oracle-scroll" data-chat-scroll>
        <div class="sod-oracle-stream" data-chat-stream role="log" aria-live="polite" aria-relevant="additions text"></div>
      </div>
      <div class="sod-oracle-composer-zone">
        <form class="sod-oracle-composer" data-chat-form>
          <textarea data-chat-input rows="1" maxlength="6000" placeholder="Escribí lo que está presente..." aria-label="Mensaje para SØD"></textarea>
          <button class="sod-oracle-send" type="submit" aria-label="Enviar mensaje"><span>↑</span></button>
        </form>
      </div>
    </div>
  </section>`;
}

function mountConversationSurface(root,{onClose=null}={}){
  if(!root)return()=>{};
  const stream=root.querySelector('[data-chat-stream]');
  const scroll=root.querySelector('[data-chat-scroll]');
  const form=root.querySelector('[data-chat-form]');
  const input=root.querySelector('[data-chat-input]');
  const sendButton=root.querySelector('.sod-oracle-send');
  const presence=root.querySelector('[data-presence-label]');
  const history=root.querySelector('[data-oracle-history]');
  const historyList=root.querySelector('[data-history-list]');
  const HISTORY_KEY='sod-oracle-history-preview-v1';
  let draft='';
  let lastMessageCount=-1;

  const readHistory=()=>{try{return JSON.parse(sessionStorage.getItem(HISTORY_KEY)||'[]').slice(0,8)}catch{return[]}};
  const writeHistory=items=>{try{sessionStorage.setItem(HISTORY_KEY,JSON.stringify(items.slice(0,8)))}catch{}};
  const archiveCurrent=()=>{
    const snapshot=controller.getState();
    if(!snapshot.messages.length)return;
    const first=snapshot.messages.find(item=>item.role==='user')?.text||'Conversación de claridad';
    const item={id:`history-${Date.now()}`,title:first.slice(0,52),createdAt:new Date().toISOString(),messages:snapshot.messages.slice(-12)};
    writeHistory([item,...readHistory()]);
  };
  const renderHistory=()=>{
    const items=readHistory();
    const current=controller.getState();
    historyList.innerHTML=`<button class="sod-oracle-history-item current" type="button"><span class="sod-oracle-history-glyph">Ø</span><div><strong>Conversación actual</strong><small>${current.messages.length} ${current.messages.length===1?'mensaje':'mensajes'}</small></div></button>${items.map(item=>`<button class="sod-oracle-history-item" type="button" data-history-id="${escapeHtml(item.id)}"><span class="sod-oracle-history-glyph">↺</span><div><strong>${escapeHtml(item.title)}</strong><small>${formatDate(item.createdAt)}</small></div></button>`).join('')||'<div class="sod-oracle-history-empty">Los próximos chats que cierres aparecerán acá.</div>'}`;
    historyList.querySelectorAll('[data-history-id]').forEach(button=>button.onclick=()=>{
      const item=items.find(entry=>entry.id===button.dataset.historyId);
      if(!item)return;
      openModal({title:item.title,content:`<div class="sod-oracle-history-preview">${item.messages.map(message=>`<p><strong>${message.role==='user'?'Vos':'SØD'}:</strong> ${escapeHtml(message.text)}</p>`).join('')}</div>`});
    });
  };

  const controller=createConversationController({api,sessionProvider,legacyMessages:store.get().dialogue||[],onChange:render});
  function isNearBottom(){return scroll.scrollHeight-scroll.scrollTop-scroll.clientHeight<120}
  function resizeComposer(){input.style.height='auto';input.style.height=`${Math.min(input.scrollHeight,150)}px`}
  function setPresence(chatState){
    presence.classList.toggle('processing',Boolean(chatState.pending));
    presence.innerHTML=`<span></span>${chatState.pending?'Procesando':'Presente'}`;
  }
  function emptyState(){return `<section class="sod-oracle-empty"><article class="sod-oracle-message assistant welcome"><div class="sod-oracle-avatar"><img src="${VISUALS.hubSodIcon}" alt=""></div><div class="sod-oracle-message-bubble"><div class="sod-oracle-message-meta"><strong>SØD</strong><time>ahora</time></div><div class="sod-oracle-copy"><p>Estoy acá. Decime qué está ocupando tu mente y lo observamos juntos.</p></div></div></article></section>`}
  function thinkingState(){return `<article class="sod-oracle-message assistant thinking"><div class="sod-oracle-avatar"><img src="${VISUALS.hubSodIcon}" alt=""></div><div class="sod-oracle-message-bubble"><div class="sod-oracle-message-meta"><strong>SØD</strong><span>presente</span></div><div class="sod-thinking"><i></i><i></i><i></i></div></div></article>`}
  function render(chatState){
    const keepBottom=isNearBottom()||lastMessageCount<0;
    const messages=chatState.messages||[];
    stream.innerHTML=messages.length?messages.map(chatMessageTemplate).join(''):emptyState();
    if(chatState.pending)stream.insertAdjacentHTML('beforeend',thinkingState());
    if(chatState.error)stream.insertAdjacentHTML('beforeend',`<div class="sod-chat-recoverable" role="status"><strong>La conexión se interrumpió.</strong><span>${escapeHtml(chatState.error.message)}</span><button class="btn btn-small" data-retry-latest>Reintentar</button></div>`);
    sendButton.disabled=chatState.pending;input.disabled=chatState.pending;setPresence(chatState);
    stream.querySelectorAll('[data-retry-message]').forEach(button=>button.onclick=async()=>{const result=await controller.retry(button.dataset.retryMessage);if(!result?.ok){draft=controller.getState().error?.text||draft;input.value=draft;resizeComposer();input.focus()}else{draft='';input.value='';resizeComposer();input.focus()}});
    stream.querySelector('[data-retry-latest]')?.addEventListener('click',async()=>{const id=controller.getState().error?.clientMessageId;if(!id)return;const result=await controller.retry(id);if(!result?.ok){draft=controller.getState().error?.text||draft;input.value=draft;resizeComposer();input.focus()}else{draft='';input.value='';resizeComposer();input.focus()}});
    if(messages.length!==lastMessageCount&&keepBottom)requestAnimationFrame(()=>scroll.scrollTo({top:scroll.scrollHeight,behavior:lastMessageCount<0?'auto':'smooth'}));
    lastMessageCount=messages.length;
    renderHistory();
  }
  async function submit(){
    if(controller.getState().pending)return;
    const message=input.value.trim();if(!message)return;
    draft=message;input.value='';resizeComposer();
    const result=await controller.send(message);
    if(!result?.ok){input.value=draft;resizeComposer();input.focus();return}
    draft='';input.focus();
  }
  const closeHistory=()=>history?.classList.remove('open');
  const toggleHistory=()=>{history?.classList.toggle('open');renderHistory()};
  form.onsubmit=e=>{e.preventDefault();submit()};
  input.addEventListener('input',()=>{draft=input.value;resizeComposer()});
  input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();submit()}});
  root.querySelectorAll('[data-history-toggle]').forEach(button=>button.onclick=toggleHistory);
  root.querySelector('[data-history-close]')?.addEventListener('click',closeHistory);
  root.querySelector('[data-new-conversation]')?.addEventListener('click',()=>{
    const run=()=>{archiveCurrent();controller.newConversation();draft='';input.value='';resizeComposer();closeHistory();input.focus()};
    if(!controller.getState().messages.length){run();return}
    confirmAction('¿Querés iniciar una conversación nueva? La conversación actual quedará en el historial local de esta maqueta.',run);
  });
  root.querySelector('[data-conversation-close]')?.addEventListener('click',()=>onClose?.());
  controller.refreshSession().finally(()=>render(controller.getState()));
  render(controller.getState());resizeComposer();
  return()=>{};
}

function conversationExperienceView(){return{
  title:'Hablar con SØD',noShell:true,
  html:`<main id="app-main" class="sod-oracle-route">${conversationSurfaceMarkup()}</main>`,
  mount(){const root=document.querySelector('[data-sod-conversation]');const cleanup=mountConversationSurface(root,{onClose:()=>navigate('/hub')});setTimeout(()=>root.querySelector('[data-chat-input]')?.focus(),80);return cleanup}
}}

function notFoundView(){return{title:'Puerta no encontrada',html:`<main id="app-main" class="section"><div class="container"><div class="empty"><div style="font-size:80px;color:var(--cyan)">Ø</div><h1>Esta puerta todavía no existe.</h1><p>La ruta solicitada no corresponde a un universo activo.</p><a class="btn btn-primary" href="/hub" data-link>Volver al Hub</a></div></div></main>`}}

export function getView(route){
  if(route==='/')return portalView();
  if(route==='/identidad-local'||route==='/entrar'||route==='/registro')return localIdentityView();
  if(route==='/onboarding')return onboardingView();
  if(route==='/hub')return hubView();
  if(route==='/hub-2d')return fallbackHubView();
  if(route==='/experiencia')return conversationExperienceView();
  const universe=route.match(/^\/universos\/([^/]+)$/);if(universe)return universeView(decodeURIComponent(universe[1]));
  if(route==='/journey'||route.startsWith('/journey/'))return journeyView();
  if(route==='/bitacora')return bitacoraView();
  if(route==='/biblioteca')return libraryView();
  if(route==='/semillas')return seedsView();
  const seed=route.match(/^\/semillas\/([^/]+)$/);if(seed)return seedDetailView(decodeURIComponent(seed[1]));
  if(route==='/elementos')return elementsView();
  const piece=route.match(/^\/elementos\/([^/]+)\/(\d+)$/);if(piece)return pieceDetailView(piece[1],piece[2]);
  const element=route.match(/^\/elementos\/([^/]+)$/);if(element)return elementView(element[1]);
  if(route==='/codigos')return codesView();
  if(route==='/observatorio')return observatoryView();
  if(route==='/coleccion')return collectionView();
  if(route==='/marketplace')return marketplaceView();
  if(route==='/perfil')return profileView();
  if(route==='/configuracion')return configView();
  if(route==='/privacidad')return privacyView();
  if(route==='/admin')return adminView();
  return notFoundView();
}
