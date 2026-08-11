import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createConversationController } from '../public/js/conversation-controller.js';

const [views, apiSource, controllerSource, styles, sw, visuals] = await Promise.all([
  readFile(new URL('../public/js/views.js', import.meta.url), 'utf8'),
  readFile(new URL('../public/js/api.js', import.meta.url), 'utf8'),
  readFile(new URL('../public/js/conversation-controller.js', import.meta.url), 'utf8'),
  readFile(new URL('../public/styles.css', import.meta.url), 'utf8'),
  readFile(new URL('../public/sw.js', import.meta.url), 'utf8'),
  readFile(new URL('../public/js/visual-assets.js', import.meta.url), 'utf8'),
]);

assert.match(views, /function conversationExperienceView/);
assert.match(views, /if\(route==='\/experiencia'\)return conversationExperienceView\(\)/);
assert.doesNotMatch(views, /function transformationView/);
assert.doesNotMatch(views, /data-form="map"/);
assert.doesNotMatch(views, /data-form="transition"/);
assert.doesNotMatch(views, /Crear Código SØD/);
assert.doesNotMatch(views, /collection\.seeds\.push/);
assert.match(views, /Estoy acá\. Decime qué está ocupando tu mente y lo observamos juntos\./);
assert.match(views, /conversationSurfaceMarkup/);
assert.match(views, /data-history-toggle/);
assert.match(views, /sod-oracle-overlay/);
assert.match(views, /openConversation/);
assert.match(views, /scene\?\.pause/);
assert.match(views, /scene\?\.resume/);
assert.match(views, /sod-oracle-tools/);
assert.match(views, /Escribí lo que está presente\.\.\./);
assert.match(views, /e\.key==='Enter'&&!e\.shiftKey/);
assert.match(views, /data-retry-message/);
assert.match(views, /aria-live="polite"/);
assert.doesNotMatch(views, /collection\.seeds\.push/);
assert.match(views, /data-new-conversation/);
assert.match(apiSource, /dialogue: input =>/);
assert.match(apiSource, /clientMessageId/);
assert.match(apiSource, /conversationId/);
assert.match(apiSource, /authorization: `Bearer \$\{data\.accessToken\}`/);
assert.doesNotMatch(apiSource, /userId/);
assert.doesNotMatch(controllerSource, /memory_items/);
assert.doesNotMatch(controllerSource, /supabase/i);
assert.match(controllerSource, /sessionStorage/);
assert.match(styles, /Hub-native conversation oracle/);
assert.match(styles, /sod-oracle-tools/);
assert.match(styles, /SØD V3.1.2 — Floating portal conversation/);
assert.match(styles, /sod-oracle-stage::after/);
assert.match(styles, /scale\(\.08\)/);
assert.match(styles, /@media\(max-width:620px\)/);
assert.match(styles, /prefers-reduced-motion/);
assert.match(sw, /conversation-controller\.js/);
assert.match(sw, /session-provider\.js/);
assert.match(visuals, /https:\/\/i\.imgur\.com\/NOUXpyv\.png/);

const calls=[];
let seq=0;
const fakeApi={
  async dialogue(payload){
    calls.push(structuredClone(payload));
    seq+=1;
    return {id:`assistant-${seq}`,conversationId:'server-conversation-1',reply:`respuesta ${seq}`,mode:'test'};
  }
};
const fakeSession={async getSession(){return {authenticated:false,accessToken:null,syncEnabled:false}},async getAccessToken(){return null}};
const ids=['client-1','client-2','client-3'];
const controller=createConversationController({api:fakeApi,sessionProvider:fakeSession,uuid:()=>ids.shift()});
await controller.send('primer mensaje');
await controller.send('segundo mensaje');
const state=controller.getState();
assert.equal(state.messages.length,4);
assert.deepEqual(state.messages.map(m=>m.role),['user','assistant','user','assistant']);
assert.equal(calls.length,2);
assert.equal(calls[0].clientMessageId,'client-1');
assert.equal(calls[1].clientMessageId,'client-2');
assert.equal(calls[1].conversationId,'server-conversation-1');
for(const call of calls){
  assert.deepEqual(Object.keys(call).sort(),['accessToken','clientMessageId','conversationId','message'].sort());
  assert.equal('userId' in call,false);
  assert.equal('provider' in call,false);
  assert.equal('model' in call,false);
  assert.equal('memory' in call,false);
}

let fail=true;
const retryCalls=[];
const retryController=createConversationController({
  api:{async dialogue(payload){retryCalls.push(payload);if(fail){fail=false;throw new Error('network down')}return {id:'assistant-ok',reply:'recuperado'}}},
  sessionProvider:fakeSession,
  uuid:(()=>{let n=0;return()=>`retry-${++n}`})(),
});
const failed=await retryController.send('mensaje recuperable');
assert.equal(failed.ok,false);
assert.equal(retryController.getState().messages.at(-1).status,'error');
assert.equal(retryController.getState().error.text,'mensaje recuperable');
const retried=await retryController.retry(failed.clientMessageId);
assert.equal(retried.ok,true);
assert.equal(retryCalls.length,2);
assert.notEqual(retryCalls[0].clientMessageId,retryCalls[1].clientMessageId);
assert.equal(retryController.getState().messages.length,2);

console.log('Conversation UI tests passed: continuous chat, structured dialogue payload, unique client IDs, retry, no automatic Semilla/Código/memory writes');
