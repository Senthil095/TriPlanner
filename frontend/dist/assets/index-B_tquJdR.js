const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/Home-DNHEx3mF.js","assets/ui-vendor-Bx4XiCyc.js","assets/router-BlfezZ6N.js","assets/AnimatedPage-ixc7YUeZ.js","assets/framer-motion-BayCj330.js","assets/firebase-Ba0a9wCe.js","assets/PlanGenerator-hPpDyUAe.js","assets/ItineraryView-Dn7NLt2w.js","assets/leaflet-vendor-BtCtikng.js","assets/ItineraryView-Dgihpmma.css","assets/BudgetView-Bxa0Hmf4.js","assets/GlassCard-B2fg-XMr.js","assets/BudgetCalculator-B5hqNK4G.js","assets/SafetyTips-C0CEfTQx.js","assets/HiddenGems-CZvD1Bel.js","assets/Notes-CkF0_Sd4.js","assets/Chatbot-D7hmnnWR.js","assets/Login-DB_oM-QC.js","assets/Signup-DguQya-A.js","assets/Dashboard-D5K5QmBD.js","assets/Onboarding-CGESE4d3.js"])))=>i.map(i=>d[i]);
import{a as Ql,j as R,S as Wl,M as Xl,H as Co,b as ds,c as xo,d as Vo,e as ko,L as Yl,C as No,f as Jl,g as Zl,h as tu,U as eu,X as nu,i as ru,Q as su,k as iu}from"./ui-vendor-Bx4XiCyc.js";import{a as ou,r as G,u as sr,L as ye,N as au,b as lu,d as Rt,R as uu,B as cu}from"./router-BlfezZ6N.js";import{L as hu,_ as Do,C as Oo,r as Gn,F as Lo,a as Qt,g as Mo,b as Uo,c as Fo,d as jo,e as Nt,S as Bo,i as du,f as fu,h as pu,j as mu,G as gu,s as _u,k as yu,l as Eu,u as $o,m as Tu,o as vu}from"./firebase-Ba0a9wCe.js";import{A as Kn,m as ie}from"./framer-motion-BayCj330.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();var Wr={},$i=ou;Wr.createRoot=$i.createRoot,Wr.hydrateRoot=$i.hydrateRoot;const wu="modulepreload",Au=function(n){return"/"+n},qi={},Ct=function(t,e,s){let i=Promise.resolve();if(e&&e.length>0){document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=(l==null?void 0:l.nonce)||(l==null?void 0:l.getAttribute("nonce"));i=Promise.allSettled(e.map(d=>{if(d=Au(d),d in qi)return;qi[d]=!0;const f=d.endsWith(".css"),v=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${v}`))return;const I=document.createElement("link");if(I.rel=f?"stylesheet":wu,f||(I.as="script"),I.crossOrigin="",I.href=d,c&&I.setAttribute("nonce",c),document.head.appendChild(I),f)return new Promise((P,x)=>{I.addEventListener("load",P),I.addEventListener("error",()=>x(new Error(`Unable to preload CSS for ${d}`)))})}))}function o(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return i.then(l=>{for(const c of l||[])c.status==="rejected"&&o(c.reason);return t().catch(o)})},Xr=(n,t)=>t.some(e=>n instanceof e);let zi,Gi;function Iu(){return zi||(zi=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ru(){return Gi||(Gi=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Yr=new WeakMap,jr=new WeakMap,ir=new WeakMap;function Pu(n){const t=new Promise((e,s)=>{const i=()=>{n.removeEventListener("success",o),n.removeEventListener("error",l)},o=()=>{e(oe(n.result)),i()},l=()=>{s(n.error),i()};n.addEventListener("success",o),n.addEventListener("error",l)});return ir.set(t,n),t}function Su(n){if(Yr.has(n))return;const t=new Promise((e,s)=>{const i=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",l),n.removeEventListener("abort",l)},o=()=>{e(),i()},l=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",o),n.addEventListener("error",l),n.addEventListener("abort",l)});Yr.set(n,t)}let Jr={get(n,t,e){if(n instanceof IDBTransaction){if(t==="done")return Yr.get(n);if(t==="store")return e.objectStoreNames[1]?void 0:e.objectStore(e.objectStoreNames[0])}return oe(n[t])},set(n,t,e){return n[t]=e,!0},has(n,t){return n instanceof IDBTransaction&&(t==="done"||t==="store")?!0:t in n}};function qo(n){Jr=n(Jr)}function bu(n){return Ru().includes(n)?function(...t){return n.apply(Zr(this),t),oe(this.request)}:function(...t){return oe(n.apply(Zr(this),t))}}function Cu(n){return typeof n=="function"?bu(n):(n instanceof IDBTransaction&&Su(n),Xr(n,Iu())?new Proxy(n,Jr):n)}function oe(n){if(n instanceof IDBRequest)return Pu(n);if(jr.has(n))return jr.get(n);const t=Cu(n);return t!==n&&(jr.set(n,t),ir.set(t,n)),t}const Zr=n=>ir.get(n);function xu(n,t,{blocked:e,upgrade:s,blocking:i,terminated:o}={}){const l=indexedDB.open(n,t),c=oe(l);return s&&l.addEventListener("upgradeneeded",d=>{s(oe(l.result),d.oldVersion,d.newVersion,oe(l.transaction),d)}),e&&l.addEventListener("blocked",d=>e(d.oldVersion,d.newVersion,d)),c.then(d=>{o&&d.addEventListener("close",()=>o()),i&&d.addEventListener("versionchange",f=>i(f.oldVersion,f.newVersion,f))}).catch(()=>{}),c}const Vu=["get","getKey","getAll","getAllKeys","count"],ku=["put","add","delete","clear"],Br=new Map;function Ki(n,t){if(!(n instanceof IDBDatabase&&!(t in n)&&typeof t=="string"))return;if(Br.get(t))return Br.get(t);const e=t.replace(/FromIndex$/,""),s=t!==e,i=ku.includes(e);if(!(e in(s?IDBIndex:IDBObjectStore).prototype)||!(i||Vu.includes(e)))return;const o=async function(l,...c){const d=this.transaction(l,i?"readwrite":"readonly");let f=d.store;return s&&(f=f.index(c.shift())),(await Promise.all([f[e](...c),i&&d.done]))[0]};return Br.set(t,o),o}qo(n=>({...n,get:(t,e,s)=>Ki(t,e)||n.get(t,e,s),has:(t,e)=>!!Ki(t,e)||n.has(t,e)}));const Nu=["continue","continuePrimaryKey","advance"],Hi={},ts=new WeakMap,zo=new WeakMap,Du={get(n,t){if(!Nu.includes(t))return n[t];let e=Hi[t];return e||(e=Hi[t]=function(...s){ts.set(this,zo.get(this)[t](...s))}),e}};async function*Ou(...n){let t=this;if(t instanceof IDBCursor||(t=await t.openCursor(...n)),!t)return;t=t;const e=new Proxy(t,Du);for(zo.set(e,t),ir.set(e,Zr(t));t;)yield e,t=await(ts.get(e)||t.continue()),ts.delete(e)}function Qi(n,t){return t===Symbol.asyncIterator&&Xr(n,[IDBIndex,IDBObjectStore,IDBCursor])||t==="iterate"&&Xr(n,[IDBIndex,IDBObjectStore])}qo(n=>({...n,get(t,e,s){return Qi(t,e)?Ou:n.get(t,e,s)},has(t,e){return Qi(t,e)||n.has(t,e)}}));const Lu="TravelPlannerDB",Mu=1,Dt=async()=>xu(Lu,Mu,{upgrade(n){if(!n.objectStoreNames.contains("trips")){const t=n.createObjectStore("trips",{keyPath:"trip_id"});t.createIndex("destination","destination"),t.createIndex("createdAt","created_at")}n.objectStoreNames.contains("notes")||n.createObjectStore("notes",{keyPath:"id"}).createIndex("tripId","trip_id"),n.objectStoreNames.contains("preferences")||n.createObjectStore("preferences",{keyPath:"key"}),n.objectStoreNames.contains("pendingSync")||n.createObjectStore("pendingSync",{keyPath:"id",autoIncrement:!0})}}),Dn={save:async n=>{await(await Dt()).put("trips",n)},get:async n=>(await Dt()).get("trips",n),getAll:async()=>(await Dt()).getAll("trips"),delete:async n=>{await(await Dt()).delete("trips",n)},getByDestination:async n=>(await Dt()).transaction("trips").store.index("destination").getAll(n)},$r={save:async n=>{await(await Dt()).put("notes",n)},get:async n=>(await Dt()).get("notes",n),getByTrip:async n=>(await Dt()).transaction("notes").store.index("tripId").getAll(n),delete:async n=>{await(await Dt()).delete("notes",n)},getAll:async()=>(await Dt()).getAll("notes")},Uu=()=>navigator.onLine,Fu=(n,t)=>(window.addEventListener("online",n),window.addEventListener("offline",t),()=>{window.removeEventListener("online",n),window.removeEventListener("offline",t)});var Wi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Go;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function t(E,p){function g(){}g.prototype=p.prototype,E.D=p.prototype,E.prototype=new g,E.prototype.constructor=E,E.C=function(_,y,w){for(var m=Array(arguments.length-2),jt=2;jt<arguments.length;jt++)m[jt-2]=arguments[jt];return p.prototype[y].apply(_,m)}}function e(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}t(s,e),s.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(E,p,g){g||(g=0);var _=Array(16);if(typeof p=="string")for(var y=0;16>y;++y)_[y]=p.charCodeAt(g++)|p.charCodeAt(g++)<<8|p.charCodeAt(g++)<<16|p.charCodeAt(g++)<<24;else for(y=0;16>y;++y)_[y]=p[g++]|p[g++]<<8|p[g++]<<16|p[g++]<<24;p=E.g[0],g=E.g[1],y=E.g[2];var w=E.g[3],m=p+(w^g&(y^w))+_[0]+3614090360&4294967295;p=g+(m<<7&4294967295|m>>>25),m=w+(y^p&(g^y))+_[1]+3905402710&4294967295,w=p+(m<<12&4294967295|m>>>20),m=y+(g^w&(p^g))+_[2]+606105819&4294967295,y=w+(m<<17&4294967295|m>>>15),m=g+(p^y&(w^p))+_[3]+3250441966&4294967295,g=y+(m<<22&4294967295|m>>>10),m=p+(w^g&(y^w))+_[4]+4118548399&4294967295,p=g+(m<<7&4294967295|m>>>25),m=w+(y^p&(g^y))+_[5]+1200080426&4294967295,w=p+(m<<12&4294967295|m>>>20),m=y+(g^w&(p^g))+_[6]+2821735955&4294967295,y=w+(m<<17&4294967295|m>>>15),m=g+(p^y&(w^p))+_[7]+4249261313&4294967295,g=y+(m<<22&4294967295|m>>>10),m=p+(w^g&(y^w))+_[8]+1770035416&4294967295,p=g+(m<<7&4294967295|m>>>25),m=w+(y^p&(g^y))+_[9]+2336552879&4294967295,w=p+(m<<12&4294967295|m>>>20),m=y+(g^w&(p^g))+_[10]+4294925233&4294967295,y=w+(m<<17&4294967295|m>>>15),m=g+(p^y&(w^p))+_[11]+2304563134&4294967295,g=y+(m<<22&4294967295|m>>>10),m=p+(w^g&(y^w))+_[12]+1804603682&4294967295,p=g+(m<<7&4294967295|m>>>25),m=w+(y^p&(g^y))+_[13]+4254626195&4294967295,w=p+(m<<12&4294967295|m>>>20),m=y+(g^w&(p^g))+_[14]+2792965006&4294967295,y=w+(m<<17&4294967295|m>>>15),m=g+(p^y&(w^p))+_[15]+1236535329&4294967295,g=y+(m<<22&4294967295|m>>>10),m=p+(y^w&(g^y))+_[1]+4129170786&4294967295,p=g+(m<<5&4294967295|m>>>27),m=w+(g^y&(p^g))+_[6]+3225465664&4294967295,w=p+(m<<9&4294967295|m>>>23),m=y+(p^g&(w^p))+_[11]+643717713&4294967295,y=w+(m<<14&4294967295|m>>>18),m=g+(w^p&(y^w))+_[0]+3921069994&4294967295,g=y+(m<<20&4294967295|m>>>12),m=p+(y^w&(g^y))+_[5]+3593408605&4294967295,p=g+(m<<5&4294967295|m>>>27),m=w+(g^y&(p^g))+_[10]+38016083&4294967295,w=p+(m<<9&4294967295|m>>>23),m=y+(p^g&(w^p))+_[15]+3634488961&4294967295,y=w+(m<<14&4294967295|m>>>18),m=g+(w^p&(y^w))+_[4]+3889429448&4294967295,g=y+(m<<20&4294967295|m>>>12),m=p+(y^w&(g^y))+_[9]+568446438&4294967295,p=g+(m<<5&4294967295|m>>>27),m=w+(g^y&(p^g))+_[14]+3275163606&4294967295,w=p+(m<<9&4294967295|m>>>23),m=y+(p^g&(w^p))+_[3]+4107603335&4294967295,y=w+(m<<14&4294967295|m>>>18),m=g+(w^p&(y^w))+_[8]+1163531501&4294967295,g=y+(m<<20&4294967295|m>>>12),m=p+(y^w&(g^y))+_[13]+2850285829&4294967295,p=g+(m<<5&4294967295|m>>>27),m=w+(g^y&(p^g))+_[2]+4243563512&4294967295,w=p+(m<<9&4294967295|m>>>23),m=y+(p^g&(w^p))+_[7]+1735328473&4294967295,y=w+(m<<14&4294967295|m>>>18),m=g+(w^p&(y^w))+_[12]+2368359562&4294967295,g=y+(m<<20&4294967295|m>>>12),m=p+(g^y^w)+_[5]+4294588738&4294967295,p=g+(m<<4&4294967295|m>>>28),m=w+(p^g^y)+_[8]+2272392833&4294967295,w=p+(m<<11&4294967295|m>>>21),m=y+(w^p^g)+_[11]+1839030562&4294967295,y=w+(m<<16&4294967295|m>>>16),m=g+(y^w^p)+_[14]+4259657740&4294967295,g=y+(m<<23&4294967295|m>>>9),m=p+(g^y^w)+_[1]+2763975236&4294967295,p=g+(m<<4&4294967295|m>>>28),m=w+(p^g^y)+_[4]+1272893353&4294967295,w=p+(m<<11&4294967295|m>>>21),m=y+(w^p^g)+_[7]+4139469664&4294967295,y=w+(m<<16&4294967295|m>>>16),m=g+(y^w^p)+_[10]+3200236656&4294967295,g=y+(m<<23&4294967295|m>>>9),m=p+(g^y^w)+_[13]+681279174&4294967295,p=g+(m<<4&4294967295|m>>>28),m=w+(p^g^y)+_[0]+3936430074&4294967295,w=p+(m<<11&4294967295|m>>>21),m=y+(w^p^g)+_[3]+3572445317&4294967295,y=w+(m<<16&4294967295|m>>>16),m=g+(y^w^p)+_[6]+76029189&4294967295,g=y+(m<<23&4294967295|m>>>9),m=p+(g^y^w)+_[9]+3654602809&4294967295,p=g+(m<<4&4294967295|m>>>28),m=w+(p^g^y)+_[12]+3873151461&4294967295,w=p+(m<<11&4294967295|m>>>21),m=y+(w^p^g)+_[15]+530742520&4294967295,y=w+(m<<16&4294967295|m>>>16),m=g+(y^w^p)+_[2]+3299628645&4294967295,g=y+(m<<23&4294967295|m>>>9),m=p+(y^(g|~w))+_[0]+4096336452&4294967295,p=g+(m<<6&4294967295|m>>>26),m=w+(g^(p|~y))+_[7]+1126891415&4294967295,w=p+(m<<10&4294967295|m>>>22),m=y+(p^(w|~g))+_[14]+2878612391&4294967295,y=w+(m<<15&4294967295|m>>>17),m=g+(w^(y|~p))+_[5]+4237533241&4294967295,g=y+(m<<21&4294967295|m>>>11),m=p+(y^(g|~w))+_[12]+1700485571&4294967295,p=g+(m<<6&4294967295|m>>>26),m=w+(g^(p|~y))+_[3]+2399980690&4294967295,w=p+(m<<10&4294967295|m>>>22),m=y+(p^(w|~g))+_[10]+4293915773&4294967295,y=w+(m<<15&4294967295|m>>>17),m=g+(w^(y|~p))+_[1]+2240044497&4294967295,g=y+(m<<21&4294967295|m>>>11),m=p+(y^(g|~w))+_[8]+1873313359&4294967295,p=g+(m<<6&4294967295|m>>>26),m=w+(g^(p|~y))+_[15]+4264355552&4294967295,w=p+(m<<10&4294967295|m>>>22),m=y+(p^(w|~g))+_[6]+2734768916&4294967295,y=w+(m<<15&4294967295|m>>>17),m=g+(w^(y|~p))+_[13]+1309151649&4294967295,g=y+(m<<21&4294967295|m>>>11),m=p+(y^(g|~w))+_[4]+4149444226&4294967295,p=g+(m<<6&4294967295|m>>>26),m=w+(g^(p|~y))+_[11]+3174756917&4294967295,w=p+(m<<10&4294967295|m>>>22),m=y+(p^(w|~g))+_[2]+718787259&4294967295,y=w+(m<<15&4294967295|m>>>17),m=g+(w^(y|~p))+_[9]+3951481745&4294967295,E.g[0]=E.g[0]+p&4294967295,E.g[1]=E.g[1]+(y+(m<<21&4294967295|m>>>11))&4294967295,E.g[2]=E.g[2]+y&4294967295,E.g[3]=E.g[3]+w&4294967295}s.prototype.u=function(E,p){p===void 0&&(p=E.length);for(var g=p-this.blockSize,_=this.B,y=this.h,w=0;w<p;){if(y==0)for(;w<=g;)i(this,E,w),w+=this.blockSize;if(typeof E=="string"){for(;w<p;)if(_[y++]=E.charCodeAt(w++),y==this.blockSize){i(this,_),y=0;break}}else for(;w<p;)if(_[y++]=E[w++],y==this.blockSize){i(this,_),y=0;break}}this.h=y,this.o+=p},s.prototype.v=function(){var E=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);E[0]=128;for(var p=1;p<E.length-8;++p)E[p]=0;var g=8*this.o;for(p=E.length-8;p<E.length;++p)E[p]=g&255,g/=256;for(this.u(E),E=Array(16),p=g=0;4>p;++p)for(var _=0;32>_;_+=8)E[g++]=this.g[p]>>>_&255;return E};function o(E,p){var g=c;return Object.prototype.hasOwnProperty.call(g,E)?g[E]:g[E]=p(E)}function l(E,p){this.h=p;for(var g=[],_=!0,y=E.length-1;0<=y;y--){var w=E[y]|0;_&&w==p||(g[y]=w,_=!1)}this.g=g}var c={};function d(E){return-128<=E&&128>E?o(E,function(p){return new l([p|0],0>p?-1:0)}):new l([E|0],0>E?-1:0)}function f(E){if(isNaN(E)||!isFinite(E))return I;if(0>E)return k(f(-E));for(var p=[],g=1,_=0;E>=g;_++)p[_]=E/g|0,g*=4294967296;return new l(p,0)}function v(E,p){if(E.length==0)throw Error("number format error: empty string");if(p=p||10,2>p||36<p)throw Error("radix out of range: "+p);if(E.charAt(0)=="-")return k(v(E.substring(1),p));if(0<=E.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=f(Math.pow(p,8)),_=I,y=0;y<E.length;y+=8){var w=Math.min(8,E.length-y),m=parseInt(E.substring(y,y+w),p);8>w?(w=f(Math.pow(p,w)),_=_.j(w).add(f(m))):(_=_.j(g),_=_.add(f(m)))}return _}var I=d(0),P=d(1),x=d(16777216);n=l.prototype,n.m=function(){if(N(this))return-k(this).m();for(var E=0,p=1,g=0;g<this.g.length;g++){var _=this.i(g);E+=(0<=_?_:4294967296+_)*p,p*=4294967296}return E},n.toString=function(E){if(E=E||10,2>E||36<E)throw Error("radix out of range: "+E);if(V(this))return"0";if(N(this))return"-"+k(this).toString(E);for(var p=f(Math.pow(E,6)),g=this,_="";;){var y=z(g,p).g;g=U(g,y.j(p));var w=((0<g.g.length?g.g[0]:g.h)>>>0).toString(E);if(g=y,V(g))return w+_;for(;6>w.length;)w="0"+w;_=w+_}},n.i=function(E){return 0>E?0:E<this.g.length?this.g[E]:this.h};function V(E){if(E.h!=0)return!1;for(var p=0;p<E.g.length;p++)if(E.g[p]!=0)return!1;return!0}function N(E){return E.h==-1}n.l=function(E){return E=U(this,E),N(E)?-1:V(E)?0:1};function k(E){for(var p=E.g.length,g=[],_=0;_<p;_++)g[_]=~E.g[_];return new l(g,~E.h).add(P)}n.abs=function(){return N(this)?k(this):this},n.add=function(E){for(var p=Math.max(this.g.length,E.g.length),g=[],_=0,y=0;y<=p;y++){var w=_+(this.i(y)&65535)+(E.i(y)&65535),m=(w>>>16)+(this.i(y)>>>16)+(E.i(y)>>>16);_=m>>>16,w&=65535,m&=65535,g[y]=m<<16|w}return new l(g,g[g.length-1]&-2147483648?-1:0)};function U(E,p){return E.add(k(p))}n.j=function(E){if(V(this)||V(E))return I;if(N(this))return N(E)?k(this).j(k(E)):k(k(this).j(E));if(N(E))return k(this.j(k(E)));if(0>this.l(x)&&0>E.l(x))return f(this.m()*E.m());for(var p=this.g.length+E.g.length,g=[],_=0;_<2*p;_++)g[_]=0;for(_=0;_<this.g.length;_++)for(var y=0;y<E.g.length;y++){var w=this.i(_)>>>16,m=this.i(_)&65535,jt=E.i(y)>>>16,xe=E.i(y)&65535;g[2*_+2*y]+=m*xe,q(g,2*_+2*y),g[2*_+2*y+1]+=w*xe,q(g,2*_+2*y+1),g[2*_+2*y+1]+=m*jt,q(g,2*_+2*y+1),g[2*_+2*y+2]+=w*jt,q(g,2*_+2*y+2)}for(_=0;_<p;_++)g[_]=g[2*_+1]<<16|g[2*_];for(_=p;_<2*p;_++)g[_]=0;return new l(g,0)};function q(E,p){for(;(E[p]&65535)!=E[p];)E[p+1]+=E[p]>>>16,E[p]&=65535,p++}function B(E,p){this.g=E,this.h=p}function z(E,p){if(V(p))throw Error("division by zero");if(V(E))return new B(I,I);if(N(E))return p=z(k(E),p),new B(k(p.g),k(p.h));if(N(p))return p=z(E,k(p)),new B(k(p.g),p.h);if(30<E.g.length){if(N(E)||N(p))throw Error("slowDivide_ only works with positive integers.");for(var g=P,_=p;0>=_.l(E);)g=xt(g),_=xt(_);var y=st(g,1),w=st(_,1);for(_=st(_,2),g=st(g,2);!V(_);){var m=w.add(_);0>=m.l(E)&&(y=y.add(g),w=m),_=st(_,1),g=st(g,1)}return p=U(E,y.j(p)),new B(y,p)}for(y=I;0<=E.l(p);){for(g=Math.max(1,Math.floor(E.m()/p.m())),_=Math.ceil(Math.log(g)/Math.LN2),_=48>=_?1:Math.pow(2,_-48),w=f(g),m=w.j(p);N(m)||0<m.l(E);)g-=_,w=f(g),m=w.j(p);V(w)&&(w=P),y=y.add(w),E=U(E,m)}return new B(y,E)}n.A=function(E){return z(this,E).h},n.and=function(E){for(var p=Math.max(this.g.length,E.g.length),g=[],_=0;_<p;_++)g[_]=this.i(_)&E.i(_);return new l(g,this.h&E.h)},n.or=function(E){for(var p=Math.max(this.g.length,E.g.length),g=[],_=0;_<p;_++)g[_]=this.i(_)|E.i(_);return new l(g,this.h|E.h)},n.xor=function(E){for(var p=Math.max(this.g.length,E.g.length),g=[],_=0;_<p;_++)g[_]=this.i(_)^E.i(_);return new l(g,this.h^E.h)};function xt(E){for(var p=E.g.length+1,g=[],_=0;_<p;_++)g[_]=E.i(_)<<1|E.i(_-1)>>>31;return new l(g,E.h)}function st(E,p){var g=p>>5;p%=32;for(var _=E.g.length-g,y=[],w=0;w<_;w++)y[w]=0<p?E.i(w+g)>>>p|E.i(w+g+1)<<32-p:E.i(w+g);return new l(y,E.h)}s.prototype.digest=s.prototype.v,s.prototype.reset=s.prototype.s,s.prototype.update=s.prototype.u,l.prototype.add=l.prototype.add,l.prototype.multiply=l.prototype.j,l.prototype.modulo=l.prototype.A,l.prototype.compare=l.prototype.l,l.prototype.toNumber=l.prototype.m,l.prototype.toString=l.prototype.toString,l.prototype.getBits=l.prototype.i,l.fromNumber=f,l.fromString=v,Go=l}).apply(typeof Wi<"u"?Wi:typeof self<"u"?self:typeof window<"u"?window:{});var On=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Ko,Ye,Ho,$n,es,Qo,Wo,Xo;(function(){var n,t=typeof Object.defineProperties=="function"?Object.defineProperty:function(r,a,u){return r==Array.prototype||r==Object.prototype||(r[a]=u.value),r};function e(r){r=[typeof globalThis=="object"&&globalThis,r,typeof window=="object"&&window,typeof self=="object"&&self,typeof On=="object"&&On];for(var a=0;a<r.length;++a){var u=r[a];if(u&&u.Math==Math)return u}throw Error("Cannot find global object")}var s=e(this);function i(r,a){if(a)t:{var u=s;r=r.split(".");for(var h=0;h<r.length-1;h++){var T=r[h];if(!(T in u))break t;u=u[T]}r=r[r.length-1],h=u[r],a=a(h),a!=h&&a!=null&&t(u,r,{configurable:!0,writable:!0,value:a})}}function o(r,a){r instanceof String&&(r+="");var u=0,h=!1,T={next:function(){if(!h&&u<r.length){var A=u++;return{value:a(A,r[A]),done:!1}}return h=!0,{done:!0,value:void 0}}};return T[Symbol.iterator]=function(){return T},T}i("Array.prototype.values",function(r){return r||function(){return o(this,function(a,u){return u})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var l=l||{},c=this||self;function d(r){var a=typeof r;return a=a!="object"?a:r?Array.isArray(r)?"array":a:"null",a=="array"||a=="object"&&typeof r.length=="number"}function f(r){var a=typeof r;return a=="object"&&r!=null||a=="function"}function v(r,a,u){return r.call.apply(r.bind,arguments)}function I(r,a,u){if(!r)throw Error();if(2<arguments.length){var h=Array.prototype.slice.call(arguments,2);return function(){var T=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(T,h),r.apply(a,T)}}return function(){return r.apply(a,arguments)}}function P(r,a,u){return P=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?v:I,P.apply(null,arguments)}function x(r,a){var u=Array.prototype.slice.call(arguments,1);return function(){var h=u.slice();return h.push.apply(h,arguments),r.apply(this,h)}}function V(r,a){function u(){}u.prototype=a.prototype,r.aa=a.prototype,r.prototype=new u,r.prototype.constructor=r,r.Qb=function(h,T,A){for(var C=Array(arguments.length-2),K=2;K<arguments.length;K++)C[K-2]=arguments[K];return a.prototype[T].apply(h,C)}}function N(r){const a=r.length;if(0<a){const u=Array(a);for(let h=0;h<a;h++)u[h]=r[h];return u}return[]}function k(r,a){for(let u=1;u<arguments.length;u++){const h=arguments[u];if(d(h)){const T=r.length||0,A=h.length||0;r.length=T+A;for(let C=0;C<A;C++)r[T+C]=h[C]}else r.push(h)}}class U{constructor(a,u){this.i=a,this.j=u,this.h=0,this.g=null}get(){let a;return 0<this.h?(this.h--,a=this.g,this.g=a.next,a.next=null):a=this.i(),a}}function q(r){return/^[\s\xa0]*$/.test(r)}function B(){var r=c.navigator;return r&&(r=r.userAgent)?r:""}function z(r){return z[" "](r),r}z[" "]=function(){};var xt=B().indexOf("Gecko")!=-1&&!(B().toLowerCase().indexOf("webkit")!=-1&&B().indexOf("Edge")==-1)&&!(B().indexOf("Trident")!=-1||B().indexOf("MSIE")!=-1)&&B().indexOf("Edge")==-1;function st(r,a,u){for(const h in r)a.call(u,r[h],h,r)}function E(r,a){for(const u in r)a.call(void 0,r[u],u,r)}function p(r){const a={};for(const u in r)a[u]=r[u];return a}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _(r,a){let u,h;for(let T=1;T<arguments.length;T++){h=arguments[T];for(u in h)r[u]=h[u];for(let A=0;A<g.length;A++)u=g[A],Object.prototype.hasOwnProperty.call(h,u)&&(r[u]=h[u])}}function y(r){var a=1;r=r.split(":");const u=[];for(;0<a&&r.length;)u.push(r.shift()),a--;return r.length&&u.push(r.join(":")),u}function w(r){c.setTimeout(()=>{throw r},0)}function m(){var r=gr;let a=null;return r.g&&(a=r.g,r.g=r.g.next,r.g||(r.h=null),a.next=null),a}class jt{constructor(){this.h=this.g=null}add(a,u){const h=xe.get();h.set(a,u),this.h?this.h.next=h:this.g=h,this.h=h}}var xe=new U(()=>new fl,r=>r.reset());class fl{constructor(){this.next=this.g=this.h=null}set(a,u){this.h=a,this.g=u,this.next=null}reset(){this.next=this.g=this.h=null}}let Ve,ke=!1,gr=new jt,$s=()=>{const r=c.Promise.resolve(void 0);Ve=()=>{r.then(pl)}};var pl=()=>{for(var r;r=m();){try{r.h.call(r.g)}catch(u){w(u)}var a=xe;a.j(r),100>a.h&&(a.h++,r.next=a.g,a.g=r)}ke=!1};function qt(){this.s=this.s,this.C=this.C}qt.prototype.s=!1,qt.prototype.ma=function(){this.s||(this.s=!0,this.N())},qt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function dt(r,a){this.type=r,this.g=this.target=a,this.defaultPrevented=!1}dt.prototype.h=function(){this.defaultPrevented=!0};var ml=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var r=!1,a=Object.defineProperty({},"passive",{get:function(){r=!0}});try{const u=()=>{};c.addEventListener("test",u,a),c.removeEventListener("test",u,a)}catch{}return r}();function Ne(r,a){if(dt.call(this,r?r.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,r){var u=this.type=r.type,h=r.changedTouches&&r.changedTouches.length?r.changedTouches[0]:null;if(this.target=r.target||r.srcElement,this.g=a,a=r.relatedTarget){if(xt){t:{try{z(a.nodeName);var T=!0;break t}catch{}T=!1}T||(a=null)}}else u=="mouseover"?a=r.fromElement:u=="mouseout"&&(a=r.toElement);this.relatedTarget=a,h?(this.clientX=h.clientX!==void 0?h.clientX:h.pageX,this.clientY=h.clientY!==void 0?h.clientY:h.pageY,this.screenX=h.screenX||0,this.screenY=h.screenY||0):(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0),this.button=r.button,this.key=r.key||"",this.ctrlKey=r.ctrlKey,this.altKey=r.altKey,this.shiftKey=r.shiftKey,this.metaKey=r.metaKey,this.pointerId=r.pointerId||0,this.pointerType=typeof r.pointerType=="string"?r.pointerType:gl[r.pointerType]||"",this.state=r.state,this.i=r,r.defaultPrevented&&Ne.aa.h.call(this)}}V(Ne,dt);var gl={2:"touch",3:"pen",4:"mouse"};Ne.prototype.h=function(){Ne.aa.h.call(this);var r=this.i;r.preventDefault?r.preventDefault():r.returnValue=!1};var mn="closure_listenable_"+(1e6*Math.random()|0),_l=0;function yl(r,a,u,h,T){this.listener=r,this.proxy=null,this.src=a,this.type=u,this.capture=!!h,this.ha=T,this.key=++_l,this.da=this.fa=!1}function gn(r){r.da=!0,r.listener=null,r.proxy=null,r.src=null,r.ha=null}function _n(r){this.src=r,this.g={},this.h=0}_n.prototype.add=function(r,a,u,h,T){var A=r.toString();r=this.g[A],r||(r=this.g[A]=[],this.h++);var C=yr(r,a,h,T);return-1<C?(a=r[C],u||(a.fa=!1)):(a=new yl(a,this.src,A,!!h,T),a.fa=u,r.push(a)),a};function _r(r,a){var u=a.type;if(u in r.g){var h=r.g[u],T=Array.prototype.indexOf.call(h,a,void 0),A;(A=0<=T)&&Array.prototype.splice.call(h,T,1),A&&(gn(a),r.g[u].length==0&&(delete r.g[u],r.h--))}}function yr(r,a,u,h){for(var T=0;T<r.length;++T){var A=r[T];if(!A.da&&A.listener==a&&A.capture==!!u&&A.ha==h)return T}return-1}var Er="closure_lm_"+(1e6*Math.random()|0),Tr={};function qs(r,a,u,h,T){if(Array.isArray(a)){for(var A=0;A<a.length;A++)qs(r,a[A],u,h,T);return null}return u=Ks(u),r&&r[mn]?r.K(a,u,f(h)?!!h.capture:!1,T):El(r,a,u,!1,h,T)}function El(r,a,u,h,T,A){if(!a)throw Error("Invalid event type");var C=f(T)?!!T.capture:!!T,K=wr(r);if(K||(r[Er]=K=new _n(r)),u=K.add(a,u,h,C,A),u.proxy)return u;if(h=Tl(),u.proxy=h,h.src=r,h.listener=u,r.addEventListener)ml||(T=C),T===void 0&&(T=!1),r.addEventListener(a.toString(),h,T);else if(r.attachEvent)r.attachEvent(Gs(a.toString()),h);else if(r.addListener&&r.removeListener)r.addListener(h);else throw Error("addEventListener and attachEvent are unavailable.");return u}function Tl(){function r(u){return a.call(r.src,r.listener,u)}const a=vl;return r}function zs(r,a,u,h,T){if(Array.isArray(a))for(var A=0;A<a.length;A++)zs(r,a[A],u,h,T);else h=f(h)?!!h.capture:!!h,u=Ks(u),r&&r[mn]?(r=r.i,a=String(a).toString(),a in r.g&&(A=r.g[a],u=yr(A,u,h,T),-1<u&&(gn(A[u]),Array.prototype.splice.call(A,u,1),A.length==0&&(delete r.g[a],r.h--)))):r&&(r=wr(r))&&(a=r.g[a.toString()],r=-1,a&&(r=yr(a,u,h,T)),(u=-1<r?a[r]:null)&&vr(u))}function vr(r){if(typeof r!="number"&&r&&!r.da){var a=r.src;if(a&&a[mn])_r(a.i,r);else{var u=r.type,h=r.proxy;a.removeEventListener?a.removeEventListener(u,h,r.capture):a.detachEvent?a.detachEvent(Gs(u),h):a.addListener&&a.removeListener&&a.removeListener(h),(u=wr(a))?(_r(u,r),u.h==0&&(u.src=null,a[Er]=null)):gn(r)}}}function Gs(r){return r in Tr?Tr[r]:Tr[r]="on"+r}function vl(r,a){if(r.da)r=!0;else{a=new Ne(a,this);var u=r.listener,h=r.ha||r.src;r.fa&&vr(r),r=u.call(h,a)}return r}function wr(r){return r=r[Er],r instanceof _n?r:null}var Ar="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ks(r){return typeof r=="function"?r:(r[Ar]||(r[Ar]=function(a){return r.handleEvent(a)}),r[Ar])}function ft(){qt.call(this),this.i=new _n(this),this.M=this,this.F=null}V(ft,qt),ft.prototype[mn]=!0,ft.prototype.removeEventListener=function(r,a,u,h){zs(this,r,a,u,h)};function Tt(r,a){var u,h=r.F;if(h)for(u=[];h;h=h.F)u.push(h);if(r=r.M,h=a.type||a,typeof a=="string")a=new dt(a,r);else if(a instanceof dt)a.target=a.target||r;else{var T=a;a=new dt(h,r),_(a,T)}if(T=!0,u)for(var A=u.length-1;0<=A;A--){var C=a.g=u[A];T=yn(C,h,!0,a)&&T}if(C=a.g=r,T=yn(C,h,!0,a)&&T,T=yn(C,h,!1,a)&&T,u)for(A=0;A<u.length;A++)C=a.g=u[A],T=yn(C,h,!1,a)&&T}ft.prototype.N=function(){if(ft.aa.N.call(this),this.i){var r=this.i,a;for(a in r.g){for(var u=r.g[a],h=0;h<u.length;h++)gn(u[h]);delete r.g[a],r.h--}}this.F=null},ft.prototype.K=function(r,a,u,h){return this.i.add(String(r),a,!1,u,h)},ft.prototype.L=function(r,a,u,h){return this.i.add(String(r),a,!0,u,h)};function yn(r,a,u,h){if(a=r.i.g[String(a)],!a)return!0;a=a.concat();for(var T=!0,A=0;A<a.length;++A){var C=a[A];if(C&&!C.da&&C.capture==u){var K=C.listener,lt=C.ha||C.src;C.fa&&_r(r.i,C),T=K.call(lt,h)!==!1&&T}}return T&&!h.defaultPrevented}function Hs(r,a,u){if(typeof r=="function")u&&(r=P(r,u));else if(r&&typeof r.handleEvent=="function")r=P(r.handleEvent,r);else throw Error("Invalid listener argument");return 2147483647<Number(a)?-1:c.setTimeout(r,a||0)}function Qs(r){r.g=Hs(()=>{r.g=null,r.i&&(r.i=!1,Qs(r))},r.l);const a=r.h;r.h=null,r.m.apply(null,a)}class wl extends qt{constructor(a,u){super(),this.m=a,this.l=u,this.h=null,this.i=!1,this.g=null}j(a){this.h=arguments,this.g?this.i=!0:Qs(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function De(r){qt.call(this),this.h=r,this.g={}}V(De,qt);var Ws=[];function Xs(r){st(r.g,function(a,u){this.g.hasOwnProperty(u)&&vr(a)},r),r.g={}}De.prototype.N=function(){De.aa.N.call(this),Xs(this)},De.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Ir=c.JSON.stringify,Al=c.JSON.parse,Il=class{stringify(r){return c.JSON.stringify(r,void 0)}parse(r){return c.JSON.parse(r,void 0)}};function Rr(){}Rr.prototype.h=null;function Ys(r){return r.h||(r.h=r.i())}function Js(){}var Oe={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Pr(){dt.call(this,"d")}V(Pr,dt);function Sr(){dt.call(this,"c")}V(Sr,dt);var te={},Zs=null;function En(){return Zs=Zs||new ft}te.La="serverreachability";function ti(r){dt.call(this,te.La,r)}V(ti,dt);function Le(r){const a=En();Tt(a,new ti(a))}te.STAT_EVENT="statevent";function ei(r,a){dt.call(this,te.STAT_EVENT,r),this.stat=a}V(ei,dt);function vt(r){const a=En();Tt(a,new ei(a,r))}te.Ma="timingevent";function ni(r,a){dt.call(this,te.Ma,r),this.size=a}V(ni,dt);function Me(r,a){if(typeof r!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){r()},a)}function Ue(){this.g=!0}Ue.prototype.xa=function(){this.g=!1};function Rl(r,a,u,h,T,A){r.info(function(){if(r.g)if(A)for(var C="",K=A.split("&"),lt=0;lt<K.length;lt++){var $=K[lt].split("=");if(1<$.length){var pt=$[0];$=$[1];var mt=pt.split("_");C=2<=mt.length&&mt[1]=="type"?C+(pt+"="+$+"&"):C+(pt+"=redacted&")}}else C=null;else C=A;return"XMLHTTP REQ ("+h+") [attempt "+T+"]: "+a+`
`+u+`
`+C})}function Pl(r,a,u,h,T,A,C){r.info(function(){return"XMLHTTP RESP ("+h+") [ attempt "+T+"]: "+a+`
`+u+`
`+A+" "+C})}function pe(r,a,u,h){r.info(function(){return"XMLHTTP TEXT ("+a+"): "+bl(r,u)+(h?" "+h:"")})}function Sl(r,a){r.info(function(){return"TIMEOUT: "+a})}Ue.prototype.info=function(){};function bl(r,a){if(!r.g)return a;if(!a)return null;try{var u=JSON.parse(a);if(u){for(r=0;r<u.length;r++)if(Array.isArray(u[r])){var h=u[r];if(!(2>h.length)){var T=h[1];if(Array.isArray(T)&&!(1>T.length)){var A=T[0];if(A!="noop"&&A!="stop"&&A!="close")for(var C=1;C<T.length;C++)T[C]=""}}}}return Ir(u)}catch{return a}}var Tn={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},ri={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},br;function vn(){}V(vn,Rr),vn.prototype.g=function(){return new XMLHttpRequest},vn.prototype.i=function(){return{}},br=new vn;function zt(r,a,u,h){this.j=r,this.i=a,this.l=u,this.R=h||1,this.U=new De(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new si}function si(){this.i=null,this.g="",this.h=!1}var ii={},Cr={};function xr(r,a,u){r.L=1,r.v=Rn(Bt(a)),r.m=u,r.P=!0,oi(r,null)}function oi(r,a){r.F=Date.now(),wn(r),r.A=Bt(r.v);var u=r.A,h=r.R;Array.isArray(h)||(h=[String(h)]),Ti(u.i,"t",h),r.C=0,u=r.j.J,r.h=new si,r.g=Ui(r.j,u?a:null,!r.m),0<r.O&&(r.M=new wl(P(r.Y,r,r.g),r.O)),a=r.U,u=r.g,h=r.ca;var T="readystatechange";Array.isArray(T)||(T&&(Ws[0]=T.toString()),T=Ws);for(var A=0;A<T.length;A++){var C=qs(u,T[A],h||a.handleEvent,!1,a.h||a);if(!C)break;a.g[C.key]=C}a=r.H?p(r.H):{},r.m?(r.u||(r.u="POST"),a["Content-Type"]="application/x-www-form-urlencoded",r.g.ea(r.A,r.u,r.m,a)):(r.u="GET",r.g.ea(r.A,r.u,null,a)),Le(),Rl(r.i,r.u,r.A,r.l,r.R,r.m)}zt.prototype.ca=function(r){r=r.target;const a=this.M;a&&$t(r)==3?a.j():this.Y(r)},zt.prototype.Y=function(r){try{if(r==this.g)t:{const mt=$t(this.g);var a=this.g.Ba();const _e=this.g.Z();if(!(3>mt)&&(mt!=3||this.g&&(this.h.h||this.g.oa()||Si(this.g)))){this.J||mt!=4||a==7||(a==8||0>=_e?Le(3):Le(2)),Vr(this);var u=this.g.Z();this.X=u;e:if(ai(this)){var h=Si(this.g);r="";var T=h.length,A=$t(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){ee(this),Fe(this);var C="";break e}this.h.i=new c.TextDecoder}for(a=0;a<T;a++)this.h.h=!0,r+=this.h.i.decode(h[a],{stream:!(A&&a==T-1)});h.length=0,this.h.g+=r,this.C=0,C=this.h.g}else C=this.g.oa();if(this.o=u==200,Pl(this.i,this.u,this.A,this.l,this.R,mt,u),this.o){if(this.T&&!this.K){e:{if(this.g){var K,lt=this.g;if((K=lt.g?lt.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!q(K)){var $=K;break e}}$=null}if(u=$)pe(this.i,this.l,u,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,kr(this,u);else{this.o=!1,this.s=3,vt(12),ee(this),Fe(this);break t}}if(this.P){u=!0;let Vt;for(;!this.J&&this.C<C.length;)if(Vt=Cl(this,C),Vt==Cr){mt==4&&(this.s=4,vt(14),u=!1),pe(this.i,this.l,null,"[Incomplete Response]");break}else if(Vt==ii){this.s=4,vt(15),pe(this.i,this.l,C,"[Invalid Chunk]"),u=!1;break}else pe(this.i,this.l,Vt,null),kr(this,Vt);if(ai(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),mt!=4||C.length!=0||this.h.h||(this.s=1,vt(16),u=!1),this.o=this.o&&u,!u)pe(this.i,this.l,C,"[Invalid Chunked Response]"),ee(this),Fe(this);else if(0<C.length&&!this.W){this.W=!0;var pt=this.j;pt.g==this&&pt.ba&&!pt.M&&(pt.j.info("Great, no buffering proxy detected. Bytes received: "+C.length),Ur(pt),pt.M=!0,vt(11))}}else pe(this.i,this.l,C,null),kr(this,C);mt==4&&ee(this),this.o&&!this.J&&(mt==4?Di(this.j,this):(this.o=!1,wn(this)))}else Kl(this.g),u==400&&0<C.indexOf("Unknown SID")?(this.s=3,vt(12)):(this.s=0,vt(13)),ee(this),Fe(this)}}}catch{}finally{}};function ai(r){return r.g?r.u=="GET"&&r.L!=2&&r.j.Ca:!1}function Cl(r,a){var u=r.C,h=a.indexOf(`
`,u);return h==-1?Cr:(u=Number(a.substring(u,h)),isNaN(u)?ii:(h+=1,h+u>a.length?Cr:(a=a.slice(h,h+u),r.C=h+u,a)))}zt.prototype.cancel=function(){this.J=!0,ee(this)};function wn(r){r.S=Date.now()+r.I,li(r,r.I)}function li(r,a){if(r.B!=null)throw Error("WatchDog timer not null");r.B=Me(P(r.ba,r),a)}function Vr(r){r.B&&(c.clearTimeout(r.B),r.B=null)}zt.prototype.ba=function(){this.B=null;const r=Date.now();0<=r-this.S?(Sl(this.i,this.A),this.L!=2&&(Le(),vt(17)),ee(this),this.s=2,Fe(this)):li(this,this.S-r)};function Fe(r){r.j.G==0||r.J||Di(r.j,r)}function ee(r){Vr(r);var a=r.M;a&&typeof a.ma=="function"&&a.ma(),r.M=null,Xs(r.U),r.g&&(a=r.g,r.g=null,a.abort(),a.ma())}function kr(r,a){try{var u=r.j;if(u.G!=0&&(u.g==r||Nr(u.h,r))){if(!r.K&&Nr(u.h,r)&&u.G==3){try{var h=u.Da.g.parse(a)}catch{h=null}if(Array.isArray(h)&&h.length==3){var T=h;if(T[0]==0){t:if(!u.u){if(u.g)if(u.g.F+3e3<r.F)Vn(u),Cn(u);else break t;Mr(u),vt(18)}}else u.za=T[1],0<u.za-u.T&&37500>T[2]&&u.F&&u.v==0&&!u.C&&(u.C=Me(P(u.Za,u),6e3));if(1>=hi(u.h)&&u.ca){try{u.ca()}catch{}u.ca=void 0}}else re(u,11)}else if((r.K||u.g==r)&&Vn(u),!q(a))for(T=u.Da.g.parse(a),a=0;a<T.length;a++){let $=T[a];if(u.T=$[0],$=$[1],u.G==2)if($[0]=="c"){u.K=$[1],u.ia=$[2];const pt=$[3];pt!=null&&(u.la=pt,u.j.info("VER="+u.la));const mt=$[4];mt!=null&&(u.Aa=mt,u.j.info("SVER="+u.Aa));const _e=$[5];_e!=null&&typeof _e=="number"&&0<_e&&(h=1.5*_e,u.L=h,u.j.info("backChannelRequestTimeoutMs_="+h)),h=u;const Vt=r.g;if(Vt){const Nn=Vt.g?Vt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Nn){var A=h.h;A.g||Nn.indexOf("spdy")==-1&&Nn.indexOf("quic")==-1&&Nn.indexOf("h2")==-1||(A.j=A.l,A.g=new Set,A.h&&(Dr(A,A.h),A.h=null))}if(h.D){const Fr=Vt.g?Vt.g.getResponseHeader("X-HTTP-Session-Id"):null;Fr&&(h.ya=Fr,W(h.I,h.D,Fr))}}u.G=3,u.l&&u.l.ua(),u.ba&&(u.R=Date.now()-r.F,u.j.info("Handshake RTT: "+u.R+"ms")),h=u;var C=r;if(h.qa=Mi(h,h.J?h.ia:null,h.W),C.K){di(h.h,C);var K=C,lt=h.L;lt&&(K.I=lt),K.B&&(Vr(K),wn(K)),h.g=C}else ki(h);0<u.i.length&&xn(u)}else $[0]!="stop"&&$[0]!="close"||re(u,7);else u.G==3&&($[0]=="stop"||$[0]=="close"?$[0]=="stop"?re(u,7):Lr(u):$[0]!="noop"&&u.l&&u.l.ta($),u.v=0)}}Le(4)}catch{}}var xl=class{constructor(r,a){this.g=r,this.map=a}};function ui(r){this.l=r||10,c.PerformanceNavigationTiming?(r=c.performance.getEntriesByType("navigation"),r=0<r.length&&(r[0].nextHopProtocol=="hq"||r[0].nextHopProtocol=="h2")):r=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=r?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function ci(r){return r.h?!0:r.g?r.g.size>=r.j:!1}function hi(r){return r.h?1:r.g?r.g.size:0}function Nr(r,a){return r.h?r.h==a:r.g?r.g.has(a):!1}function Dr(r,a){r.g?r.g.add(a):r.h=a}function di(r,a){r.h&&r.h==a?r.h=null:r.g&&r.g.has(a)&&r.g.delete(a)}ui.prototype.cancel=function(){if(this.i=fi(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const r of this.g.values())r.cancel();this.g.clear()}};function fi(r){if(r.h!=null)return r.i.concat(r.h.D);if(r.g!=null&&r.g.size!==0){let a=r.i;for(const u of r.g.values())a=a.concat(u.D);return a}return N(r.i)}function Vl(r){if(r.V&&typeof r.V=="function")return r.V();if(typeof Map<"u"&&r instanceof Map||typeof Set<"u"&&r instanceof Set)return Array.from(r.values());if(typeof r=="string")return r.split("");if(d(r)){for(var a=[],u=r.length,h=0;h<u;h++)a.push(r[h]);return a}a=[],u=0;for(h in r)a[u++]=r[h];return a}function kl(r){if(r.na&&typeof r.na=="function")return r.na();if(!r.V||typeof r.V!="function"){if(typeof Map<"u"&&r instanceof Map)return Array.from(r.keys());if(!(typeof Set<"u"&&r instanceof Set)){if(d(r)||typeof r=="string"){var a=[];r=r.length;for(var u=0;u<r;u++)a.push(u);return a}a=[],u=0;for(const h in r)a[u++]=h;return a}}}function pi(r,a){if(r.forEach&&typeof r.forEach=="function")r.forEach(a,void 0);else if(d(r)||typeof r=="string")Array.prototype.forEach.call(r,a,void 0);else for(var u=kl(r),h=Vl(r),T=h.length,A=0;A<T;A++)a.call(void 0,h[A],u&&u[A],r)}var mi=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Nl(r,a){if(r){r=r.split("&");for(var u=0;u<r.length;u++){var h=r[u].indexOf("="),T=null;if(0<=h){var A=r[u].substring(0,h);T=r[u].substring(h+1)}else A=r[u];a(A,T?decodeURIComponent(T.replace(/\+/g," ")):"")}}}function ne(r){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,r instanceof ne){this.h=r.h,An(this,r.j),this.o=r.o,this.g=r.g,In(this,r.s),this.l=r.l;var a=r.i,u=new $e;u.i=a.i,a.g&&(u.g=new Map(a.g),u.h=a.h),gi(this,u),this.m=r.m}else r&&(a=String(r).match(mi))?(this.h=!1,An(this,a[1]||"",!0),this.o=je(a[2]||""),this.g=je(a[3]||"",!0),In(this,a[4]),this.l=je(a[5]||"",!0),gi(this,a[6]||"",!0),this.m=je(a[7]||"")):(this.h=!1,this.i=new $e(null,this.h))}ne.prototype.toString=function(){var r=[],a=this.j;a&&r.push(Be(a,_i,!0),":");var u=this.g;return(u||a=="file")&&(r.push("//"),(a=this.o)&&r.push(Be(a,_i,!0),"@"),r.push(encodeURIComponent(String(u)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),u=this.s,u!=null&&r.push(":",String(u))),(u=this.l)&&(this.g&&u.charAt(0)!="/"&&r.push("/"),r.push(Be(u,u.charAt(0)=="/"?Ll:Ol,!0))),(u=this.i.toString())&&r.push("?",u),(u=this.m)&&r.push("#",Be(u,Ul)),r.join("")};function Bt(r){return new ne(r)}function An(r,a,u){r.j=u?je(a,!0):a,r.j&&(r.j=r.j.replace(/:$/,""))}function In(r,a){if(a){if(a=Number(a),isNaN(a)||0>a)throw Error("Bad port number "+a);r.s=a}else r.s=null}function gi(r,a,u){a instanceof $e?(r.i=a,Fl(r.i,r.h)):(u||(a=Be(a,Ml)),r.i=new $e(a,r.h))}function W(r,a,u){r.i.set(a,u)}function Rn(r){return W(r,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),r}function je(r,a){return r?a?decodeURI(r.replace(/%25/g,"%2525")):decodeURIComponent(r):""}function Be(r,a,u){return typeof r=="string"?(r=encodeURI(r).replace(a,Dl),u&&(r=r.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),r):null}function Dl(r){return r=r.charCodeAt(0),"%"+(r>>4&15).toString(16)+(r&15).toString(16)}var _i=/[#\/\?@]/g,Ol=/[#\?:]/g,Ll=/[#\?]/g,Ml=/[#\?@]/g,Ul=/#/g;function $e(r,a){this.h=this.g=null,this.i=r||null,this.j=!!a}function Gt(r){r.g||(r.g=new Map,r.h=0,r.i&&Nl(r.i,function(a,u){r.add(decodeURIComponent(a.replace(/\+/g," ")),u)}))}n=$e.prototype,n.add=function(r,a){Gt(this),this.i=null,r=me(this,r);var u=this.g.get(r);return u||this.g.set(r,u=[]),u.push(a),this.h+=1,this};function yi(r,a){Gt(r),a=me(r,a),r.g.has(a)&&(r.i=null,r.h-=r.g.get(a).length,r.g.delete(a))}function Ei(r,a){return Gt(r),a=me(r,a),r.g.has(a)}n.forEach=function(r,a){Gt(this),this.g.forEach(function(u,h){u.forEach(function(T){r.call(a,T,h,this)},this)},this)},n.na=function(){Gt(this);const r=Array.from(this.g.values()),a=Array.from(this.g.keys()),u=[];for(let h=0;h<a.length;h++){const T=r[h];for(let A=0;A<T.length;A++)u.push(a[h])}return u},n.V=function(r){Gt(this);let a=[];if(typeof r=="string")Ei(this,r)&&(a=a.concat(this.g.get(me(this,r))));else{r=Array.from(this.g.values());for(let u=0;u<r.length;u++)a=a.concat(r[u])}return a},n.set=function(r,a){return Gt(this),this.i=null,r=me(this,r),Ei(this,r)&&(this.h-=this.g.get(r).length),this.g.set(r,[a]),this.h+=1,this},n.get=function(r,a){return r?(r=this.V(r),0<r.length?String(r[0]):a):a};function Ti(r,a,u){yi(r,a),0<u.length&&(r.i=null,r.g.set(me(r,a),N(u)),r.h+=u.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const r=[],a=Array.from(this.g.keys());for(var u=0;u<a.length;u++){var h=a[u];const A=encodeURIComponent(String(h)),C=this.V(h);for(h=0;h<C.length;h++){var T=A;C[h]!==""&&(T+="="+encodeURIComponent(String(C[h]))),r.push(T)}}return this.i=r.join("&")};function me(r,a){return a=String(a),r.j&&(a=a.toLowerCase()),a}function Fl(r,a){a&&!r.j&&(Gt(r),r.i=null,r.g.forEach(function(u,h){var T=h.toLowerCase();h!=T&&(yi(this,h),Ti(this,T,u))},r)),r.j=a}function jl(r,a){const u=new Ue;if(c.Image){const h=new Image;h.onload=x(Kt,u,"TestLoadImage: loaded",!0,a,h),h.onerror=x(Kt,u,"TestLoadImage: error",!1,a,h),h.onabort=x(Kt,u,"TestLoadImage: abort",!1,a,h),h.ontimeout=x(Kt,u,"TestLoadImage: timeout",!1,a,h),c.setTimeout(function(){h.ontimeout&&h.ontimeout()},1e4),h.src=r}else a(!1)}function Bl(r,a){const u=new Ue,h=new AbortController,T=setTimeout(()=>{h.abort(),Kt(u,"TestPingServer: timeout",!1,a)},1e4);fetch(r,{signal:h.signal}).then(A=>{clearTimeout(T),A.ok?Kt(u,"TestPingServer: ok",!0,a):Kt(u,"TestPingServer: server error",!1,a)}).catch(()=>{clearTimeout(T),Kt(u,"TestPingServer: error",!1,a)})}function Kt(r,a,u,h,T){try{T&&(T.onload=null,T.onerror=null,T.onabort=null,T.ontimeout=null),h(u)}catch{}}function $l(){this.g=new Il}function ql(r,a,u){const h=u||"";try{pi(r,function(T,A){let C=T;f(T)&&(C=Ir(T)),a.push(h+A+"="+encodeURIComponent(C))})}catch(T){throw a.push(h+"type="+encodeURIComponent("_badmap")),T}}function Pn(r){this.l=r.Ub||null,this.j=r.eb||!1}V(Pn,Rr),Pn.prototype.g=function(){return new Sn(this.l,this.j)},Pn.prototype.i=function(r){return function(){return r}}({});function Sn(r,a){ft.call(this),this.D=r,this.o=a,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}V(Sn,ft),n=Sn.prototype,n.open=function(r,a){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=r,this.A=a,this.readyState=1,ze(this)},n.send=function(r){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const a={headers:this.u,method:this.B,credentials:this.m,cache:void 0};r&&(a.body=r),(this.D||c).fetch(new Request(this.A,a)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,qe(this)),this.readyState=0},n.Sa=function(r){if(this.g&&(this.l=r,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=r.headers,this.readyState=2,ze(this)),this.g&&(this.readyState=3,ze(this),this.g)))if(this.responseType==="arraybuffer")r.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in r){if(this.j=r.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;vi(this)}else r.text().then(this.Ra.bind(this),this.ga.bind(this))};function vi(r){r.j.read().then(r.Pa.bind(r)).catch(r.ga.bind(r))}n.Pa=function(r){if(this.g){if(this.o&&r.value)this.response.push(r.value);else if(!this.o){var a=r.value?r.value:new Uint8Array(0);(a=this.v.decode(a,{stream:!r.done}))&&(this.response=this.responseText+=a)}r.done?qe(this):ze(this),this.readyState==3&&vi(this)}},n.Ra=function(r){this.g&&(this.response=this.responseText=r,qe(this))},n.Qa=function(r){this.g&&(this.response=r,qe(this))},n.ga=function(){this.g&&qe(this)};function qe(r){r.readyState=4,r.l=null,r.j=null,r.v=null,ze(r)}n.setRequestHeader=function(r,a){this.u.append(r,a)},n.getResponseHeader=function(r){return this.h&&this.h.get(r.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const r=[],a=this.h.entries();for(var u=a.next();!u.done;)u=u.value,r.push(u[0]+": "+u[1]),u=a.next();return r.join(`\r
`)};function ze(r){r.onreadystatechange&&r.onreadystatechange.call(r)}Object.defineProperty(Sn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(r){this.m=r?"include":"same-origin"}});function wi(r){let a="";return st(r,function(u,h){a+=h,a+=":",a+=u,a+=`\r
`}),a}function Or(r,a,u){t:{for(h in u){var h=!1;break t}h=!0}h||(u=wi(u),typeof r=="string"?u!=null&&encodeURIComponent(String(u)):W(r,a,u))}function J(r){ft.call(this),this.headers=new Map,this.o=r||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}V(J,ft);var zl=/^https?$/i,Gl=["POST","PUT"];n=J.prototype,n.Ha=function(r){this.J=r},n.ea=function(r,a,u,h){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+r);a=a?a.toUpperCase():"GET",this.D=r,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():br.g(),this.v=this.o?Ys(this.o):Ys(br),this.g.onreadystatechange=P(this.Ea,this);try{this.B=!0,this.g.open(a,String(r),!0),this.B=!1}catch(A){Ai(this,A);return}if(r=u||"",u=new Map(this.headers),h)if(Object.getPrototypeOf(h)===Object.prototype)for(var T in h)u.set(T,h[T]);else if(typeof h.keys=="function"&&typeof h.get=="function")for(const A of h.keys())u.set(A,h.get(A));else throw Error("Unknown input type for opt_headers: "+String(h));h=Array.from(u.keys()).find(A=>A.toLowerCase()=="content-type"),T=c.FormData&&r instanceof c.FormData,!(0<=Array.prototype.indexOf.call(Gl,a,void 0))||h||T||u.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[A,C]of u)this.g.setRequestHeader(A,C);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Pi(this),this.u=!0,this.g.send(r),this.u=!1}catch(A){Ai(this,A)}};function Ai(r,a){r.h=!1,r.g&&(r.j=!0,r.g.abort(),r.j=!1),r.l=a,r.m=5,Ii(r),bn(r)}function Ii(r){r.A||(r.A=!0,Tt(r,"complete"),Tt(r,"error"))}n.abort=function(r){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=r||7,Tt(this,"complete"),Tt(this,"abort"),bn(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),bn(this,!0)),J.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Ri(this):this.bb())},n.bb=function(){Ri(this)};function Ri(r){if(r.h&&typeof l<"u"&&(!r.v[1]||$t(r)!=4||r.Z()!=2)){if(r.u&&$t(r)==4)Hs(r.Ea,0,r);else if(Tt(r,"readystatechange"),$t(r)==4){r.h=!1;try{const C=r.Z();t:switch(C){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var a=!0;break t;default:a=!1}var u;if(!(u=a)){var h;if(h=C===0){var T=String(r.D).match(mi)[1]||null;!T&&c.self&&c.self.location&&(T=c.self.location.protocol.slice(0,-1)),h=!zl.test(T?T.toLowerCase():"")}u=h}if(u)Tt(r,"complete"),Tt(r,"success");else{r.m=6;try{var A=2<$t(r)?r.g.statusText:""}catch{A=""}r.l=A+" ["+r.Z()+"]",Ii(r)}}finally{bn(r)}}}}function bn(r,a){if(r.g){Pi(r);const u=r.g,h=r.v[0]?()=>{}:null;r.g=null,r.v=null,a||Tt(r,"ready");try{u.onreadystatechange=h}catch{}}}function Pi(r){r.I&&(c.clearTimeout(r.I),r.I=null)}n.isActive=function(){return!!this.g};function $t(r){return r.g?r.g.readyState:0}n.Z=function(){try{return 2<$t(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(r){if(this.g){var a=this.g.responseText;return r&&a.indexOf(r)==0&&(a=a.substring(r.length)),Al(a)}};function Si(r){try{if(!r.g)return null;if("response"in r.g)return r.g.response;switch(r.H){case"":case"text":return r.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in r.g)return r.g.mozResponseArrayBuffer}return null}catch{return null}}function Kl(r){const a={};r=(r.g&&2<=$t(r)&&r.g.getAllResponseHeaders()||"").split(`\r
`);for(let h=0;h<r.length;h++){if(q(r[h]))continue;var u=y(r[h]);const T=u[0];if(u=u[1],typeof u!="string")continue;u=u.trim();const A=a[T]||[];a[T]=A,A.push(u)}E(a,function(h){return h.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ge(r,a,u){return u&&u.internalChannelParams&&u.internalChannelParams[r]||a}function bi(r){this.Aa=0,this.i=[],this.j=new Ue,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ge("failFast",!1,r),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ge("baseRetryDelayMs",5e3,r),this.cb=Ge("retryDelaySeedMs",1e4,r),this.Wa=Ge("forwardChannelMaxRetries",2,r),this.wa=Ge("forwardChannelRequestTimeoutMs",2e4,r),this.pa=r&&r.xmlHttpFactory||void 0,this.Xa=r&&r.Tb||void 0,this.Ca=r&&r.useFetchStreams||!1,this.L=void 0,this.J=r&&r.supportsCrossDomainXhr||!1,this.K="",this.h=new ui(r&&r.concurrentRequestLimit),this.Da=new $l,this.P=r&&r.fastHandshake||!1,this.O=r&&r.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=r&&r.Rb||!1,r&&r.xa&&this.j.xa(),r&&r.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&r&&r.detectBufferingProxy||!1,this.ja=void 0,r&&r.longPollingTimeout&&0<r.longPollingTimeout&&(this.ja=r.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=bi.prototype,n.la=8,n.G=1,n.connect=function(r,a,u,h){vt(0),this.W=r,this.H=a||{},u&&h!==void 0&&(this.H.OSID=u,this.H.OAID=h),this.F=this.X,this.I=Mi(this,null,this.W),xn(this)};function Lr(r){if(Ci(r),r.G==3){var a=r.U++,u=Bt(r.I);if(W(u,"SID",r.K),W(u,"RID",a),W(u,"TYPE","terminate"),Ke(r,u),a=new zt(r,r.j,a),a.L=2,a.v=Rn(Bt(u)),u=!1,c.navigator&&c.navigator.sendBeacon)try{u=c.navigator.sendBeacon(a.v.toString(),"")}catch{}!u&&c.Image&&(new Image().src=a.v,u=!0),u||(a.g=Ui(a.j,null),a.g.ea(a.v)),a.F=Date.now(),wn(a)}Li(r)}function Cn(r){r.g&&(Ur(r),r.g.cancel(),r.g=null)}function Ci(r){Cn(r),r.u&&(c.clearTimeout(r.u),r.u=null),Vn(r),r.h.cancel(),r.s&&(typeof r.s=="number"&&c.clearTimeout(r.s),r.s=null)}function xn(r){if(!ci(r.h)&&!r.s){r.s=!0;var a=r.Ga;Ve||$s(),ke||(Ve(),ke=!0),gr.add(a,r),r.B=0}}function Hl(r,a){return hi(r.h)>=r.h.j-(r.s?1:0)?!1:r.s?(r.i=a.D.concat(r.i),!0):r.G==1||r.G==2||r.B>=(r.Va?0:r.Wa)?!1:(r.s=Me(P(r.Ga,r,a),Oi(r,r.B)),r.B++,!0)}n.Ga=function(r){if(this.s)if(this.s=null,this.G==1){if(!r){this.U=Math.floor(1e5*Math.random()),r=this.U++;const T=new zt(this,this.j,r);let A=this.o;if(this.S&&(A?(A=p(A),_(A,this.S)):A=this.S),this.m!==null||this.O||(T.H=A,A=null),this.P)t:{for(var a=0,u=0;u<this.i.length;u++){e:{var h=this.i[u];if("__data__"in h.map&&(h=h.map.__data__,typeof h=="string")){h=h.length;break e}h=void 0}if(h===void 0)break;if(a+=h,4096<a){a=u;break t}if(a===4096||u===this.i.length-1){a=u+1;break t}}a=1e3}else a=1e3;a=Vi(this,T,a),u=Bt(this.I),W(u,"RID",r),W(u,"CVER",22),this.D&&W(u,"X-HTTP-Session-Id",this.D),Ke(this,u),A&&(this.O?a="headers="+encodeURIComponent(String(wi(A)))+"&"+a:this.m&&Or(u,this.m,A)),Dr(this.h,T),this.Ua&&W(u,"TYPE","init"),this.P?(W(u,"$req",a),W(u,"SID","null"),T.T=!0,xr(T,u,null)):xr(T,u,a),this.G=2}}else this.G==3&&(r?xi(this,r):this.i.length==0||ci(this.h)||xi(this))};function xi(r,a){var u;a?u=a.l:u=r.U++;const h=Bt(r.I);W(h,"SID",r.K),W(h,"RID",u),W(h,"AID",r.T),Ke(r,h),r.m&&r.o&&Or(h,r.m,r.o),u=new zt(r,r.j,u,r.B+1),r.m===null&&(u.H=r.o),a&&(r.i=a.D.concat(r.i)),a=Vi(r,u,1e3),u.I=Math.round(.5*r.wa)+Math.round(.5*r.wa*Math.random()),Dr(r.h,u),xr(u,h,a)}function Ke(r,a){r.H&&st(r.H,function(u,h){W(a,h,u)}),r.l&&pi({},function(u,h){W(a,h,u)})}function Vi(r,a,u){u=Math.min(r.i.length,u);var h=r.l?P(r.l.Na,r.l,r):null;t:{var T=r.i;let A=-1;for(;;){const C=["count="+u];A==-1?0<u?(A=T[0].g,C.push("ofs="+A)):A=0:C.push("ofs="+A);let K=!0;for(let lt=0;lt<u;lt++){let $=T[lt].g;const pt=T[lt].map;if($-=A,0>$)A=Math.max(0,T[lt].g-100),K=!1;else try{ql(pt,C,"req"+$+"_")}catch{h&&h(pt)}}if(K){h=C.join("&");break t}}}return r=r.i.splice(0,u),a.D=r,h}function ki(r){if(!r.g&&!r.u){r.Y=1;var a=r.Fa;Ve||$s(),ke||(Ve(),ke=!0),gr.add(a,r),r.v=0}}function Mr(r){return r.g||r.u||3<=r.v?!1:(r.Y++,r.u=Me(P(r.Fa,r),Oi(r,r.v)),r.v++,!0)}n.Fa=function(){if(this.u=null,Ni(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var r=2*this.R;this.j.info("BP detection timer enabled: "+r),this.A=Me(P(this.ab,this),r)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,vt(10),Cn(this),Ni(this))};function Ur(r){r.A!=null&&(c.clearTimeout(r.A),r.A=null)}function Ni(r){r.g=new zt(r,r.j,"rpc",r.Y),r.m===null&&(r.g.H=r.o),r.g.O=0;var a=Bt(r.qa);W(a,"RID","rpc"),W(a,"SID",r.K),W(a,"AID",r.T),W(a,"CI",r.F?"0":"1"),!r.F&&r.ja&&W(a,"TO",r.ja),W(a,"TYPE","xmlhttp"),Ke(r,a),r.m&&r.o&&Or(a,r.m,r.o),r.L&&(r.g.I=r.L);var u=r.g;r=r.ia,u.L=1,u.v=Rn(Bt(a)),u.m=null,u.P=!0,oi(u,r)}n.Za=function(){this.C!=null&&(this.C=null,Cn(this),Mr(this),vt(19))};function Vn(r){r.C!=null&&(c.clearTimeout(r.C),r.C=null)}function Di(r,a){var u=null;if(r.g==a){Vn(r),Ur(r),r.g=null;var h=2}else if(Nr(r.h,a))u=a.D,di(r.h,a),h=1;else return;if(r.G!=0){if(a.o)if(h==1){u=a.m?a.m.length:0,a=Date.now()-a.F;var T=r.B;h=En(),Tt(h,new ni(h,u)),xn(r)}else ki(r);else if(T=a.s,T==3||T==0&&0<a.X||!(h==1&&Hl(r,a)||h==2&&Mr(r)))switch(u&&0<u.length&&(a=r.h,a.i=a.i.concat(u)),T){case 1:re(r,5);break;case 4:re(r,10);break;case 3:re(r,6);break;default:re(r,2)}}}function Oi(r,a){let u=r.Ta+Math.floor(Math.random()*r.cb);return r.isActive()||(u*=2),u*a}function re(r,a){if(r.j.info("Error code "+a),a==2){var u=P(r.fb,r),h=r.Xa;const T=!h;h=new ne(h||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||An(h,"https"),Rn(h),T?jl(h.toString(),u):Bl(h.toString(),u)}else vt(2);r.G=0,r.l&&r.l.sa(a),Li(r),Ci(r)}n.fb=function(r){r?(this.j.info("Successfully pinged google.com"),vt(2)):(this.j.info("Failed to ping google.com"),vt(1))};function Li(r){if(r.G=0,r.ka=[],r.l){const a=fi(r.h);(a.length!=0||r.i.length!=0)&&(k(r.ka,a),k(r.ka,r.i),r.h.i.length=0,N(r.i),r.i.length=0),r.l.ra()}}function Mi(r,a,u){var h=u instanceof ne?Bt(u):new ne(u);if(h.g!="")a&&(h.g=a+"."+h.g),In(h,h.s);else{var T=c.location;h=T.protocol,a=a?a+"."+T.hostname:T.hostname,T=+T.port;var A=new ne(null);h&&An(A,h),a&&(A.g=a),T&&In(A,T),u&&(A.l=u),h=A}return u=r.D,a=r.ya,u&&a&&W(h,u,a),W(h,"VER",r.la),Ke(r,h),h}function Ui(r,a,u){if(a&&!r.J)throw Error("Can't create secondary domain capable XhrIo object.");return a=r.Ca&&!r.pa?new J(new Pn({eb:u})):new J(r.pa),a.Ha(r.J),a}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Fi(){}n=Fi.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function kn(){}kn.prototype.g=function(r,a){return new It(r,a)};function It(r,a){ft.call(this),this.g=new bi(a),this.l=r,this.h=a&&a.messageUrlParams||null,r=a&&a.messageHeaders||null,a&&a.clientProtocolHeaderRequired&&(r?r["X-Client-Protocol"]="webchannel":r={"X-Client-Protocol":"webchannel"}),this.g.o=r,r=a&&a.initMessageHeaders||null,a&&a.messageContentType&&(r?r["X-WebChannel-Content-Type"]=a.messageContentType:r={"X-WebChannel-Content-Type":a.messageContentType}),a&&a.va&&(r?r["X-WebChannel-Client-Profile"]=a.va:r={"X-WebChannel-Client-Profile":a.va}),this.g.S=r,(r=a&&a.Sb)&&!q(r)&&(this.g.m=r),this.v=a&&a.supportsCrossDomainXhr||!1,this.u=a&&a.sendRawJson||!1,(a=a&&a.httpSessionIdParam)&&!q(a)&&(this.g.D=a,r=this.h,r!==null&&a in r&&(r=this.h,a in r&&delete r[a])),this.j=new ge(this)}V(It,ft),It.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},It.prototype.close=function(){Lr(this.g)},It.prototype.o=function(r){var a=this.g;if(typeof r=="string"){var u={};u.__data__=r,r=u}else this.u&&(u={},u.__data__=Ir(r),r=u);a.i.push(new xl(a.Ya++,r)),a.G==3&&xn(a)},It.prototype.N=function(){this.g.l=null,delete this.j,Lr(this.g),delete this.g,It.aa.N.call(this)};function ji(r){Pr.call(this),r.__headers__&&(this.headers=r.__headers__,this.statusCode=r.__status__,delete r.__headers__,delete r.__status__);var a=r.__sm__;if(a){t:{for(const u in a){r=u;break t}r=void 0}(this.i=r)&&(r=this.i,a=a!==null&&r in a?a[r]:void 0),this.data=a}else this.data=r}V(ji,Pr);function Bi(){Sr.call(this),this.status=1}V(Bi,Sr);function ge(r){this.g=r}V(ge,Fi),ge.prototype.ua=function(){Tt(this.g,"a")},ge.prototype.ta=function(r){Tt(this.g,new ji(r))},ge.prototype.sa=function(r){Tt(this.g,new Bi)},ge.prototype.ra=function(){Tt(this.g,"b")},kn.prototype.createWebChannel=kn.prototype.g,It.prototype.send=It.prototype.o,It.prototype.open=It.prototype.m,It.prototype.close=It.prototype.close,Xo=function(){return new kn},Wo=function(){return En()},Qo=te,es={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Tn.NO_ERROR=0,Tn.TIMEOUT=8,Tn.HTTP_ERROR=6,$n=Tn,ri.COMPLETE="complete",Ho=ri,Js.EventType=Oe,Oe.OPEN="a",Oe.CLOSE="b",Oe.ERROR="c",Oe.MESSAGE="d",ft.prototype.listen=ft.prototype.K,Ye=Js,J.prototype.listenOnce=J.prototype.L,J.prototype.getLastError=J.prototype.Ka,J.prototype.getLastErrorCode=J.prototype.Ba,J.prototype.getStatus=J.prototype.Z,J.prototype.getResponseJson=J.prototype.Oa,J.prototype.getResponseText=J.prototype.oa,J.prototype.send=J.prototype.ea,J.prototype.setWithCredentials=J.prototype.Ha,Ko=J}).apply(typeof On<"u"?On:typeof self<"u"?self:typeof window<"u"?window:{});const Xi="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _t{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}_t.UNAUTHENTICATED=new _t(null),_t.GOOGLE_CREDENTIALS=new _t("google-credentials-uid"),_t.FIRST_PARTY=new _t("first-party-uid"),_t.MOCK_USER=new _t("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Pe="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ce=new hu("@firebase/firestore");function He(){return ce.logLevel}function D(n,...t){if(ce.logLevel<=Qt.DEBUG){const e=t.map(fs);ce.debug(`Firestore (${Pe}): ${n}`,...e)}}function he(n,...t){if(ce.logLevel<=Qt.ERROR){const e=t.map(fs);ce.error(`Firestore (${Pe}): ${n}`,...e)}}function Hn(n,...t){if(ce.logLevel<=Qt.WARN){const e=t.map(fs);ce.warn(`Firestore (${Pe}): ${n}`,...e)}}function fs(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M(n="Unexpected state"){const t=`FIRESTORE (${Pe}) INTERNAL ASSERTION FAILED: `+n;throw he(t),new Error(t)}function et(n,t){n||M()}function Q(n,t){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class O extends Lo{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ae{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class ju{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(_t.UNAUTHENTICATED))}shutdown(){}}class Bu{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class $u{constructor(t){this.t=t,this.currentUser=_t.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){et(this.o===void 0);let s=this.i;const i=d=>this.i!==s?(s=this.i,e(d)):Promise.resolve();let o=new ae;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new ae,t.enqueueRetryable(()=>i(this.currentUser))};const l=()=>{const d=o;t.enqueueRetryable(async()=>{await d.promise,await i(this.currentUser)})},c=d=>{D("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=d,this.o&&(this.auth.addAuthTokenListener(this.o),l())};this.t.onInit(d=>c(d)),setTimeout(()=>{if(!this.auth){const d=this.t.getImmediate({optional:!0});d?c(d):(D("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new ae)}},0),l()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(s=>this.i!==t?(D("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(et(typeof s.accessToken=="string"),new Yo(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const t=this.auth&&this.auth.getUid();return et(t===null||typeof t=="string"),new _t(t)}}class qu{constructor(t,e,s){this.l=t,this.h=e,this.P=s,this.type="FirstParty",this.user=_t.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class zu{constructor(t,e,s){this.l=t,this.h=e,this.P=s}getToken(){return Promise.resolve(new qu(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(_t.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Gu{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ku{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,e){et(this.o===void 0);const s=o=>{o.error!=null&&D("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const l=o.token!==this.R;return this.R=o.token,D("FirebaseAppCheckTokenProvider",`Received ${l?"new":"existing"} token.`),l?e(o.token):Promise.resolve()};this.o=o=>{t.enqueueRetryable(()=>s(o))};const i=o=>{D("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>i(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?i(o):D("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(et(typeof e.token=="string"),this.R=e.token,new Gu(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hu(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let s=0;s<n;s++)e[s]=Math.floor(256*Math.random());return e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jo{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let s="";for(;s.length<20;){const i=Hu(40);for(let o=0;o<i.length;++o)s.length<20&&i[o]<e&&(s+=t.charAt(i[o]%t.length))}return s}}function H(n,t){return n<t?-1:n>t?1:0}function ve(n,t,e){return n.length===t.length&&n.every((s,i)=>e(s,t[i]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new O(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new O(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new O(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new O(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return at.fromMillis(Date.now())}static fromDate(t){return at.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),s=Math.floor(1e6*(t-1e3*e));return new at(e,s)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?H(this.nanoseconds,t.nanoseconds):H(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(t){this.timestamp=t}static fromTimestamp(t){return new Y(t)}static min(){return new Y(new at(0,0))}static max(){return new Y(new at(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn{constructor(t,e,s){e===void 0?e=0:e>t.length&&M(),s===void 0?s=t.length-e:s>t.length-e&&M(),this.segments=t,this.offset=e,this.len=s}get length(){return this.len}isEqual(t){return rn.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof rn?t.forEach(s=>{e.push(s)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,s=this.limit();e<s;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const s=Math.min(t.length,e.length);for(let i=0;i<s;i++){const o=t.get(i),l=e.get(i);if(o<l)return-1;if(o>l)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class rt extends rn{construct(t,e,s){return new rt(t,e,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...t){const e=[];for(const s of t){if(s.indexOf("//")>=0)throw new O(b.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);e.push(...s.split("/").filter(i=>i.length>0))}return new rt(e)}static emptyPath(){return new rt([])}}const Qu=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ht extends rn{construct(t,e,s){return new ht(t,e,s)}static isValidIdentifier(t){return Qu.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ht.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ht(["__name__"])}static fromServerFormat(t){const e=[];let s="",i=0;const o=()=>{if(s.length===0)throw new O(b.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(s),s=""};let l=!1;for(;i<t.length;){const c=t[i];if(c==="\\"){if(i+1===t.length)throw new O(b.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const d=t[i+1];if(d!=="\\"&&d!=="."&&d!=="`")throw new O(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);s+=d,i+=2}else c==="`"?(l=!l,i++):c!=="."||l?(s+=c,i++):(o(),i++)}if(o(),l)throw new O(b.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ht(e)}static emptyPath(){return new ht([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(t){this.path=t}static fromPath(t){return new L(rt.fromString(t))}static fromName(t){return new L(rt.fromString(t).popFirst(5))}static empty(){return new L(rt.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&rt.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return rt.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new L(new rt(t.slice()))}}function Wu(n,t){const e=n.toTimestamp().seconds,s=n.toTimestamp().nanoseconds+1,i=Y.fromTimestamp(s===1e9?new at(e+1,0):new at(e,s));return new Xt(i,L.empty(),t)}function Xu(n){return new Xt(n.readTime,n.key,-1)}class Xt{constructor(t,e,s){this.readTime=t,this.documentKey=e,this.largestBatchId=s}static min(){return new Xt(Y.min(),L.empty(),-1)}static max(){return new Xt(Y.max(),L.empty(),-1)}}function Yu(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=L.comparator(n.documentKey,t.documentKey),e!==0?e:H(n.largestBatchId,t.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ju="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Zu{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zo(n){if(n.code!==b.FAILED_PRECONDITION||n.message!==Ju)throw n;D("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&M(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new S((s,i)=>{this.nextCallback=o=>{this.wrapSuccess(t,o).next(s,i)},this.catchCallback=o=>{this.wrapFailure(e,o).next(s,i)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof S?e:S.resolve(e)}catch(e){return S.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):S.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):S.reject(e)}static resolve(t){return new S((e,s)=>{e(t)})}static reject(t){return new S((e,s)=>{s(t)})}static waitFor(t){return new S((e,s)=>{let i=0,o=0,l=!1;t.forEach(c=>{++i,c.next(()=>{++o,l&&o===i&&e()},d=>s(d))}),l=!0,o===i&&e()})}static or(t){let e=S.resolve(!1);for(const s of t)e=e.next(i=>i?S.resolve(i):s());return e}static forEach(t,e){const s=[];return t.forEach((i,o)=>{s.push(e.call(this,i,o))}),this.waitFor(s)}static mapArray(t,e){return new S((s,i)=>{const o=t.length,l=new Array(o);let c=0;for(let d=0;d<o;d++){const f=d;e(t[f]).next(v=>{l[f]=v,++c,c===o&&s(l)},v=>i(v))}})}static doWhile(t,e){return new S((s,i)=>{const o=()=>{t()===!0?e().next(()=>{o()},i):s()};o()})}}function tc(n){const t=n.match(/Android ([\d.]+)/i),e=t?t[1].split(".").slice(0,2).join("."):"-1";return Number(e)}function or(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=s=>this.ie(s),this.se=s=>e.writeSequenceNumber(s))}ie(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.se&&this.se(t),t}}ta.oe=-1;function ps(n){return n==null}function Qn(n){return n===0&&1/n==-1/0}function ec(n){return typeof n=="number"&&Number.isInteger(n)&&!Qn(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yi(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function Se(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function ea(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(t,e){this.comparator=t,this.root=e||ut.EMPTY}insert(t,e){return new At(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,ut.BLACK,null,null))}remove(t){return new At(this.comparator,this.root.remove(t,this.comparator).copy(null,null,ut.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const s=this.comparator(t,e.key);if(s===0)return e.value;s<0?e=e.left:s>0&&(e=e.right)}return null}indexOf(t){let e=0,s=this.root;for(;!s.isEmpty();){const i=this.comparator(t,s.key);if(i===0)return e+s.left.size;i<0?s=s.left:(e+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,s)=>(t(e,s),!1))}toString(){const t=[];return this.inorderTraversal((e,s)=>(t.push(`${e}:${s}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new Ln(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new Ln(this.root,t,this.comparator,!1)}getReverseIterator(){return new Ln(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new Ln(this.root,t,this.comparator,!0)}}class Ln{constructor(t,e,s,i){this.isReverse=i,this.nodeStack=[];let o=1;for(;!t.isEmpty();)if(o=e?s(t.key,e):1,e&&i&&(o*=-1),o<0)t=this.isReverse?t.left:t.right;else{if(o===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class ut{constructor(t,e,s,i,o){this.key=t,this.value=e,this.color=s??ut.RED,this.left=i??ut.EMPTY,this.right=o??ut.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,s,i,o){return new ut(t??this.key,e??this.value,s??this.color,i??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,s){let i=this;const o=s(t,i.key);return i=o<0?i.copy(null,null,null,i.left.insert(t,e,s),null):o===0?i.copy(null,e,null,null,null):i.copy(null,null,null,null,i.right.insert(t,e,s)),i.fixUp()}removeMin(){if(this.left.isEmpty())return ut.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let s,i=this;if(e(t,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(t,e),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),e(t,i.key)===0){if(i.right.isEmpty())return ut.EMPTY;s=i.right.min(),i=i.copy(s.key,s.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(t,e))}return i.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,ut.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,ut.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw M();const t=this.left.check();if(t!==this.right.check())throw M();return t+(this.isRed()?0:1)}}ut.EMPTY=null,ut.RED=!0,ut.BLACK=!1;ut.EMPTY=new class{constructor(){this.size=0}get key(){throw M()}get value(){throw M()}get color(){throw M()}get left(){throw M()}get right(){throw M()}copy(t,e,s,i,o){return this}insert(t,e,s){return new ut(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Et{constructor(t){this.comparator=t,this.data=new At(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,s)=>(t(e),!1))}forEachInRange(t,e){const s=this.data.getIteratorFrom(t[0]);for(;s.hasNext();){const i=s.getNext();if(this.comparator(i.key,t[1])>=0)return;e(i.key)}}forEachWhile(t,e){let s;for(s=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();s.hasNext();)if(!t(s.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new Ji(this.data.getIterator())}getIteratorFrom(t){return new Ji(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(s=>{e=e.add(s)}),e}isEqual(t){if(!(t instanceof Et)||this.size!==t.size)return!1;const e=this.data.getIterator(),s=t.data.getIterator();for(;e.hasNext();){const i=e.getNext().key,o=s.getNext().key;if(this.comparator(i,o)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new Et(this.comparator);return e.data=t,e}}class Ji{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(t){this.fields=t,t.sort(ht.comparator)}static empty(){return new St([])}unionWith(t){let e=new Et(ht.comparator);for(const s of this.fields)e=e.add(s);for(const s of t)e=e.add(s);return new St(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return ve(this.fields,t.fields,(e,s)=>e.isEqual(s))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nc extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(i){try{return atob(i)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new nc("Invalid base64 string: "+o):o}}(t);return new Ut(e)}static fromUint8Array(t){const e=function(i){let o="";for(let l=0;l<i.length;++l)o+=String.fromCharCode(i[l]);return o}(t);return new Ut(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const s=new Uint8Array(e.length);for(let i=0;i<e.length;i++)s[i]=e.charCodeAt(i);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return H(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}Ut.EMPTY_BYTE_STRING=new Ut("");const rc=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function de(n){if(et(!!n),typeof n=="string"){let t=0;const e=rc.exec(n);if(et(!!e),e[1]){let i=e[1];i=(i+"000000000").substr(0,9),t=Number(i)}const s=new Date(n);return{seconds:Math.floor(s.getTime()/1e3),nanos:t}}return{seconds:ct(n.seconds),nanos:ct(n.nanos)}}function ct(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function sn(n){return typeof n=="string"?Ut.fromBase64String(n):Ut.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ms(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="server_timestamp"}function na(n){const t=n.mapValue.fields.__previous_value__;return ms(t)?na(t):t}function Wn(n){const t=de(n.mapValue.fields.__local_write_time__.timestampValue);return new at(t.seconds,t.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sc{constructor(t,e,s,i,o,l,c,d,f){this.databaseId=t,this.appId=e,this.persistenceKey=s,this.host=i,this.ssl=o,this.forceLongPolling=l,this.autoDetectLongPolling=c,this.longPollingOptions=d,this.useFetchStreams=f}}class Xn{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new Xn("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof Xn&&t.projectId===this.projectId&&t.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn={mapValue:{}};function we(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?ms(n)?4:oc(n)?9007199254740991:ic(n)?10:11:M()}function Ft(n,t){if(n===t)return!0;const e=we(n);if(e!==we(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return Wn(n).isEqual(Wn(t));case 3:return function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const l=de(i.timestampValue),c=de(o.timestampValue);return l.seconds===c.seconds&&l.nanos===c.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(i,o){return sn(i.bytesValue).isEqual(sn(o.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(i,o){return ct(i.geoPointValue.latitude)===ct(o.geoPointValue.latitude)&&ct(i.geoPointValue.longitude)===ct(o.geoPointValue.longitude)}(n,t);case 2:return function(i,o){if("integerValue"in i&&"integerValue"in o)return ct(i.integerValue)===ct(o.integerValue);if("doubleValue"in i&&"doubleValue"in o){const l=ct(i.doubleValue),c=ct(o.doubleValue);return l===c?Qn(l)===Qn(c):isNaN(l)&&isNaN(c)}return!1}(n,t);case 9:return ve(n.arrayValue.values||[],t.arrayValue.values||[],Ft);case 10:case 11:return function(i,o){const l=i.mapValue.fields||{},c=o.mapValue.fields||{};if(Yi(l)!==Yi(c))return!1;for(const d in l)if(l.hasOwnProperty(d)&&(c[d]===void 0||!Ft(l[d],c[d])))return!1;return!0}(n,t);default:return M()}}function on(n,t){return(n.values||[]).find(e=>Ft(e,t))!==void 0}function Ae(n,t){if(n===t)return 0;const e=we(n),s=we(t);if(e!==s)return H(e,s);switch(e){case 0:case 9007199254740991:return 0;case 1:return H(n.booleanValue,t.booleanValue);case 2:return function(o,l){const c=ct(o.integerValue||o.doubleValue),d=ct(l.integerValue||l.doubleValue);return c<d?-1:c>d?1:c===d?0:isNaN(c)?isNaN(d)?0:-1:1}(n,t);case 3:return Zi(n.timestampValue,t.timestampValue);case 4:return Zi(Wn(n),Wn(t));case 5:return H(n.stringValue,t.stringValue);case 6:return function(o,l){const c=sn(o),d=sn(l);return c.compareTo(d)}(n.bytesValue,t.bytesValue);case 7:return function(o,l){const c=o.split("/"),d=l.split("/");for(let f=0;f<c.length&&f<d.length;f++){const v=H(c[f],d[f]);if(v!==0)return v}return H(c.length,d.length)}(n.referenceValue,t.referenceValue);case 8:return function(o,l){const c=H(ct(o.latitude),ct(l.latitude));return c!==0?c:H(ct(o.longitude),ct(l.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return to(n.arrayValue,t.arrayValue);case 10:return function(o,l){var c,d,f,v;const I=o.fields||{},P=l.fields||{},x=(c=I.value)===null||c===void 0?void 0:c.arrayValue,V=(d=P.value)===null||d===void 0?void 0:d.arrayValue,N=H(((f=x==null?void 0:x.values)===null||f===void 0?void 0:f.length)||0,((v=V==null?void 0:V.values)===null||v===void 0?void 0:v.length)||0);return N!==0?N:to(x,V)}(n.mapValue,t.mapValue);case 11:return function(o,l){if(o===Mn.mapValue&&l===Mn.mapValue)return 0;if(o===Mn.mapValue)return 1;if(l===Mn.mapValue)return-1;const c=o.fields||{},d=Object.keys(c),f=l.fields||{},v=Object.keys(f);d.sort(),v.sort();for(let I=0;I<d.length&&I<v.length;++I){const P=H(d[I],v[I]);if(P!==0)return P;const x=Ae(c[d[I]],f[v[I]]);if(x!==0)return x}return H(d.length,v.length)}(n.mapValue,t.mapValue);default:throw M()}}function Zi(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return H(n,t);const e=de(n),s=de(t),i=H(e.seconds,s.seconds);return i!==0?i:H(e.nanos,s.nanos)}function to(n,t){const e=n.values||[],s=t.values||[];for(let i=0;i<e.length&&i<s.length;++i){const o=Ae(e[i],s[i]);if(o)return o}return H(e.length,s.length)}function Ie(n){return ns(n)}function ns(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const s=de(e);return`time(${s.seconds},${s.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return sn(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return L.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let s="[",i=!0;for(const o of e.values||[])i?i=!1:s+=",",s+=ns(o);return s+"]"}(n.arrayValue):"mapValue"in n?function(e){const s=Object.keys(e.fields||{}).sort();let i="{",o=!0;for(const l of s)o?o=!1:i+=",",i+=`${l}:${ns(e.fields[l])}`;return i+"}"}(n.mapValue):M()}function rs(n){return!!n&&"integerValue"in n}function gs(n){return!!n&&"arrayValue"in n}function qn(n){return!!n&&"mapValue"in n}function ic(n){var t,e;return((e=(((t=n==null?void 0:n.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="__vector__"}function Je(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return Se(n.mapValue.fields,(e,s)=>t.mapValue.fields[e]=Je(s)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Je(n.arrayValue.values[e]);return t}return Object.assign({},n)}function oc(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(t){this.value=t}static empty(){return new Pt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let s=0;s<t.length-1;++s)if(e=(e.mapValue.fields||{})[t.get(s)],!qn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Je(e)}setAll(t){let e=ht.emptyPath(),s={},i=[];t.forEach((l,c)=>{if(!e.isImmediateParentOf(c)){const d=this.getFieldsMap(e);this.applyChanges(d,s,i),s={},i=[],e=c.popLast()}l?s[c.lastSegment()]=Je(l):i.push(c.lastSegment())});const o=this.getFieldsMap(e);this.applyChanges(o,s,i)}delete(t){const e=this.field(t.popLast());qn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return Ft(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let s=0;s<t.length;++s){let i=e.mapValue.fields[t.get(s)];qn(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},e.mapValue.fields[t.get(s)]=i),e=i}return e.mapValue.fields}applyChanges(t,e,s){Se(e,(i,o)=>t[i]=o);for(const i of s)delete t[i]}clone(){return new Pt(Je(this.value))}}function ra(n){const t=[];return Se(n.fields,(e,s)=>{const i=new ht([e]);if(qn(s)){const o=ra(s.mapValue).fields;if(o.length===0)t.push(i);else for(const l of o)t.push(i.child(l))}else t.push(i)}),new St(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt{constructor(t,e,s,i,o,l,c){this.key=t,this.documentType=e,this.version=s,this.readTime=i,this.createTime=o,this.data=l,this.documentState=c}static newInvalidDocument(t){return new kt(t,0,Y.min(),Y.min(),Y.min(),Pt.empty(),0)}static newFoundDocument(t,e,s,i){return new kt(t,1,e,Y.min(),s,i,0)}static newNoDocument(t,e){return new kt(t,2,e,Y.min(),Y.min(),Pt.empty(),0)}static newUnknownDocument(t,e){return new kt(t,3,e,Y.min(),Y.min(),Pt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(Y.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=Pt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=Pt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=Y.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof kt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new kt(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yn{constructor(t,e){this.position=t,this.inclusive=e}}function eo(n,t,e){let s=0;for(let i=0;i<n.position.length;i++){const o=t[i],l=n.position[i];if(o.field.isKeyField()?s=L.comparator(L.fromName(l.referenceValue),e.key):s=Ae(l,e.data.field(o.field)),o.dir==="desc"&&(s*=-1),s!==0)break}return s}function no(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!Ft(n.position[e],t.position[e]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(t,e="asc"){this.field=t,this.dir=e}}function ac(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sa{}class ot extends sa{constructor(t,e,s){super(),this.field=t,this.op=e,this.value=s}static create(t,e,s){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,s):new uc(t,e,s):e==="array-contains"?new dc(t,s):e==="in"?new fc(t,s):e==="not-in"?new pc(t,s):e==="array-contains-any"?new mc(t,s):new ot(t,e,s)}static createKeyFieldInFilter(t,e,s){return e==="in"?new cc(t,s):new hc(t,s)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&this.matchesComparison(Ae(e,this.value)):e!==null&&we(this.value)===we(e)&&this.matchesComparison(Ae(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return M()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Yt extends sa{constructor(t,e){super(),this.filters=t,this.op=e,this.ae=null}static create(t,e){return new Yt(t,e)}matches(t){return ia(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function ia(n){return n.op==="and"}function oa(n){return lc(n)&&ia(n)}function lc(n){for(const t of n.filters)if(t instanceof Yt)return!1;return!0}function ss(n){if(n instanceof ot)return n.field.canonicalString()+n.op.toString()+Ie(n.value);if(oa(n))return n.filters.map(t=>ss(t)).join(",");{const t=n.filters.map(e=>ss(e)).join(",");return`${n.op}(${t})`}}function aa(n,t){return n instanceof ot?function(s,i){return i instanceof ot&&s.op===i.op&&s.field.isEqual(i.field)&&Ft(s.value,i.value)}(n,t):n instanceof Yt?function(s,i){return i instanceof Yt&&s.op===i.op&&s.filters.length===i.filters.length?s.filters.reduce((o,l,c)=>o&&aa(l,i.filters[c]),!0):!1}(n,t):void M()}function la(n){return n instanceof ot?function(e){return`${e.field.canonicalString()} ${e.op} ${Ie(e.value)}`}(n):n instanceof Yt?function(e){return e.op.toString()+" {"+e.getFilters().map(la).join(" ,")+"}"}(n):"Filter"}class uc extends ot{constructor(t,e,s){super(t,e,s),this.key=L.fromName(s.referenceValue)}matches(t){const e=L.comparator(t.key,this.key);return this.matchesComparison(e)}}class cc extends ot{constructor(t,e){super(t,"in",e),this.keys=ua("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class hc extends ot{constructor(t,e){super(t,"not-in",e),this.keys=ua("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function ua(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(s=>L.fromName(s.referenceValue))}class dc extends ot{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return gs(e)&&on(e.arrayValue,this.value)}}class fc extends ot{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&on(this.value.arrayValue,e)}}class pc extends ot{constructor(t,e){super(t,"not-in",e)}matches(t){if(on(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&!on(this.value.arrayValue,e)}}class mc extends ot{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!gs(e)||!e.arrayValue.values)&&e.arrayValue.values.some(s=>on(this.value.arrayValue,s))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gc{constructor(t,e=null,s=[],i=[],o=null,l=null,c=null){this.path=t,this.collectionGroup=e,this.orderBy=s,this.filters=i,this.limit=o,this.startAt=l,this.endAt=c,this.ue=null}}function ro(n,t=null,e=[],s=[],i=null,o=null,l=null){return new gc(n,t,e,s,i,o,l)}function _s(n){const t=Q(n);if(t.ue===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(s=>ss(s)).join(","),e+="|ob:",e+=t.orderBy.map(s=>function(o){return o.field.canonicalString()+o.dir}(s)).join(","),ps(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(s=>Ie(s)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(s=>Ie(s)).join(",")),t.ue=e}return t.ue}function ys(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!ac(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!aa(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!no(n.startAt,t.startAt)&&no(n.endAt,t.endAt)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar{constructor(t,e=null,s=[],i=[],o=null,l="F",c=null,d=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=s,this.filters=i,this.limit=o,this.limitType=l,this.startAt=c,this.endAt=d,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function _c(n,t,e,s,i,o,l,c){return new ar(n,t,e,s,i,o,l,c)}function yc(n){return new ar(n)}function so(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Ec(n){return n.collectionGroup!==null}function Ze(n){const t=Q(n);if(t.ce===null){t.ce=[];const e=new Set;for(const o of t.explicitOrderBy)t.ce.push(o),e.add(o.field.canonicalString());const s=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(l){let c=new Et(ht.comparator);return l.filters.forEach(d=>{d.getFlattenedFilters().forEach(f=>{f.isInequality()&&(c=c.add(f.field))})}),c})(t).forEach(o=>{e.has(o.canonicalString())||o.isKeyField()||t.ce.push(new Jn(o,s))}),e.has(ht.keyField().canonicalString())||t.ce.push(new Jn(ht.keyField(),s))}return t.ce}function le(n){const t=Q(n);return t.le||(t.le=Tc(t,Ze(n))),t.le}function Tc(n,t){if(n.limitType==="F")return ro(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(i=>{const o=i.dir==="desc"?"asc":"desc";return new Jn(i.field,o)});const e=n.endAt?new Yn(n.endAt.position,n.endAt.inclusive):null,s=n.startAt?new Yn(n.startAt.position,n.startAt.inclusive):null;return ro(n.path,n.collectionGroup,t,n.filters,n.limit,e,s)}}function is(n,t,e){return new ar(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function ca(n,t){return ys(le(n),le(t))&&n.limitType===t.limitType}function ha(n){return`${_s(le(n))}|lt:${n.limitType}`}function Qe(n){return`Query(target=${function(e){let s=e.path.canonicalString();return e.collectionGroup!==null&&(s+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(s+=`, filters: [${e.filters.map(i=>la(i)).join(", ")}]`),ps(e.limit)||(s+=", limit: "+e.limit),e.orderBy.length>0&&(s+=`, orderBy: [${e.orderBy.map(i=>function(l){return`${l.field.canonicalString()} (${l.dir})`}(i)).join(", ")}]`),e.startAt&&(s+=", startAt: ",s+=e.startAt.inclusive?"b:":"a:",s+=e.startAt.position.map(i=>Ie(i)).join(",")),e.endAt&&(s+=", endAt: ",s+=e.endAt.inclusive?"a:":"b:",s+=e.endAt.position.map(i=>Ie(i)).join(",")),`Target(${s})`}(le(n))}; limitType=${n.limitType})`}function Es(n,t){return t.isFoundDocument()&&function(s,i){const o=i.key.path;return s.collectionGroup!==null?i.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(o):L.isDocumentKey(s.path)?s.path.isEqual(o):s.path.isImmediateParentOf(o)}(n,t)&&function(s,i){for(const o of Ze(s))if(!o.field.isKeyField()&&i.data.field(o.field)===null)return!1;return!0}(n,t)&&function(s,i){for(const o of s.filters)if(!o.matches(i))return!1;return!0}(n,t)&&function(s,i){return!(s.startAt&&!function(l,c,d){const f=eo(l,c,d);return l.inclusive?f<=0:f<0}(s.startAt,Ze(s),i)||s.endAt&&!function(l,c,d){const f=eo(l,c,d);return l.inclusive?f>=0:f>0}(s.endAt,Ze(s),i))}(n,t)}function vc(n){return(t,e)=>{let s=!1;for(const i of Ze(n)){const o=wc(i,t,e);if(o!==0)return o;s=s||i.field.isKeyField()}return 0}}function wc(n,t,e){const s=n.field.isKeyField()?L.comparator(t.key,e.key):function(o,l,c){const d=l.data.field(o),f=c.data.field(o);return d!==null&&f!==null?Ae(d,f):M()}(n.field,t,e);switch(n.dir){case"asc":return s;case"desc":return-1*s;default:return M()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class be{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),s=this.inner[e];if(s!==void 0){for(const[i,o]of s)if(this.equalsFn(i,t))return o}}has(t){return this.get(t)!==void 0}set(t,e){const s=this.mapKeyFn(t),i=this.inner[s];if(i===void 0)return this.inner[s]=[[t,e]],void this.innerSize++;for(let o=0;o<i.length;o++)if(this.equalsFn(i[o][0],t))return void(i[o]=[t,e]);i.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),s=this.inner[e];if(s===void 0)return!1;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return s.length===1?delete this.inner[e]:s.splice(i,1),this.innerSize--,!0;return!1}forEach(t){Se(this.inner,(e,s)=>{for(const[i,o]of s)t(i,o)})}isEmpty(){return ea(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ac=new At(L.comparator);function Zn(){return Ac}const da=new At(L.comparator);function Un(...n){let t=da;for(const e of n)t=t.insert(e.key,e);return t}function fa(n){let t=da;return n.forEach((e,s)=>t=t.insert(e,s.overlayedDocument)),t}function se(){return tn()}function pa(){return tn()}function tn(){return new be(n=>n.toString(),(n,t)=>n.isEqual(t))}const Ic=new At(L.comparator),Rc=new Et(L.comparator);function yt(...n){let t=Rc;for(const e of n)t=t.add(e);return t}const Pc=new Et(H);function Sc(){return Pc}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ts(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Qn(t)?"-0":t}}function ma(n){return{integerValue:""+n}}function bc(n,t){return ec(t)?ma(t):Ts(n,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lr{constructor(){this._=void 0}}function Cc(n,t,e){return n instanceof tr?function(i,o){const l={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return o&&ms(o)&&(o=na(o)),o&&(l.fields.__previous_value__=o),{mapValue:l}}(e,t):n instanceof an?_a(n,t):n instanceof ln?ya(n,t):function(i,o){const l=ga(i,o),c=io(l)+io(i.Pe);return rs(l)&&rs(i.Pe)?ma(c):Ts(i.serializer,c)}(n,t)}function xc(n,t,e){return n instanceof an?_a(n,t):n instanceof ln?ya(n,t):e}function ga(n,t){return n instanceof er?function(s){return rs(s)||function(o){return!!o&&"doubleValue"in o}(s)}(t)?t:{integerValue:0}:null}class tr extends lr{}class an extends lr{constructor(t){super(),this.elements=t}}function _a(n,t){const e=Ea(t);for(const s of n.elements)e.some(i=>Ft(i,s))||e.push(s);return{arrayValue:{values:e}}}class ln extends lr{constructor(t){super(),this.elements=t}}function ya(n,t){let e=Ea(t);for(const s of n.elements)e=e.filter(i=>!Ft(i,s));return{arrayValue:{values:e}}}class er extends lr{constructor(t,e){super(),this.serializer=t,this.Pe=e}}function io(n){return ct(n.integerValue||n.doubleValue)}function Ea(n){return gs(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Vc(n,t){return n.field.isEqual(t.field)&&function(s,i){return s instanceof an&&i instanceof an||s instanceof ln&&i instanceof ln?ve(s.elements,i.elements,Ft):s instanceof er&&i instanceof er?Ft(s.Pe,i.Pe):s instanceof tr&&i instanceof tr}(n.transform,t.transform)}class kc{constructor(t,e){this.version=t,this.transformResults=e}}class Lt{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Lt}static exists(t){return new Lt(void 0,t)}static updateTime(t){return new Lt(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function zn(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class ur{}function Ta(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new wa(n.key,Lt.none()):new dn(n.key,n.data,Lt.none());{const e=n.data,s=Pt.empty();let i=new Et(ht.comparator);for(let o of t.fields)if(!i.has(o)){let l=e.field(o);l===null&&o.length>1&&(o=o.popLast(),l=e.field(o)),l===null?s.delete(o):s.set(o,l),i=i.add(o)}return new Zt(n.key,s,new St(i.toArray()),Lt.none())}}function Nc(n,t,e){n instanceof dn?function(i,o,l){const c=i.value.clone(),d=ao(i.fieldTransforms,o,l.transformResults);c.setAll(d),o.convertToFoundDocument(l.version,c).setHasCommittedMutations()}(n,t,e):n instanceof Zt?function(i,o,l){if(!zn(i.precondition,o))return void o.convertToUnknownDocument(l.version);const c=ao(i.fieldTransforms,o,l.transformResults),d=o.data;d.setAll(va(i)),d.setAll(c),o.convertToFoundDocument(l.version,d).setHasCommittedMutations()}(n,t,e):function(i,o,l){o.convertToNoDocument(l.version).setHasCommittedMutations()}(0,t,e)}function en(n,t,e,s){return n instanceof dn?function(o,l,c,d){if(!zn(o.precondition,l))return c;const f=o.value.clone(),v=lo(o.fieldTransforms,d,l);return f.setAll(v),l.convertToFoundDocument(l.version,f).setHasLocalMutations(),null}(n,t,e,s):n instanceof Zt?function(o,l,c,d){if(!zn(o.precondition,l))return c;const f=lo(o.fieldTransforms,d,l),v=l.data;return v.setAll(va(o)),v.setAll(f),l.convertToFoundDocument(l.version,v).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(I=>I.field))}(n,t,e,s):function(o,l,c){return zn(o.precondition,l)?(l.convertToNoDocument(l.version).setHasLocalMutations(),null):c}(n,t,e)}function Dc(n,t){let e=null;for(const s of n.fieldTransforms){const i=t.data.field(s.field),o=ga(s.transform,i||null);o!=null&&(e===null&&(e=Pt.empty()),e.set(s.field,o))}return e||null}function oo(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(s,i){return s===void 0&&i===void 0||!(!s||!i)&&ve(s,i,(o,l)=>Vc(o,l))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class dn extends ur{constructor(t,e,s,i=[]){super(),this.key=t,this.value=e,this.precondition=s,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Zt extends ur{constructor(t,e,s,i,o=[]){super(),this.key=t,this.data=e,this.fieldMask=s,this.precondition=i,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function va(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const s=n.data.field(e);t.set(e,s)}}),t}function ao(n,t,e){const s=new Map;et(n.length===e.length);for(let i=0;i<e.length;i++){const o=n[i],l=o.transform,c=t.data.field(o.field);s.set(o.field,xc(l,c,e[i]))}return s}function lo(n,t,e){const s=new Map;for(const i of n){const o=i.transform,l=e.data.field(i.field);s.set(i.field,Cc(o,l,t))}return s}class wa extends ur{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Oc extends ur{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lc{constructor(t,e,s,i){this.batchId=t,this.localWriteTime=e,this.baseMutations=s,this.mutations=i}applyToRemoteDocument(t,e){const s=e.mutationResults;for(let i=0;i<this.mutations.length;i++){const o=this.mutations[i];o.key.isEqual(t.key)&&Nc(o,t,s[i])}}applyToLocalView(t,e){for(const s of this.baseMutations)s.key.isEqual(t.key)&&(e=en(s,t,e,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(t.key)&&(e=en(s,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const s=pa();return this.mutations.forEach(i=>{const o=t.get(i.key),l=o.overlayedDocument;let c=this.applyToLocalView(l,o.mutatedFields);c=e.has(i.key)?null:c;const d=Ta(l,c);d!==null&&s.set(i.key,d),l.isValidDocument()||l.convertToNoDocument(Y.min())}),s}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),yt())}isEqual(t){return this.batchId===t.batchId&&ve(this.mutations,t.mutations,(e,s)=>oo(e,s))&&ve(this.baseMutations,t.baseMutations,(e,s)=>oo(e,s))}}class vs{constructor(t,e,s,i){this.batch=t,this.commitVersion=e,this.mutationResults=s,this.docVersions=i}static from(t,e,s){et(t.mutations.length===s.length);let i=function(){return Ic}();const o=t.mutations;for(let l=0;l<o.length;l++)i=i.insert(o[l].key,s[l].version);return new vs(t,e,s,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mc{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var nt,F;function Uc(n){switch(n){default:return M();case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0}}function Fc(n){if(n===void 0)return he("GRPC error has no .code"),b.UNKNOWN;switch(n){case nt.OK:return b.OK;case nt.CANCELLED:return b.CANCELLED;case nt.UNKNOWN:return b.UNKNOWN;case nt.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case nt.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case nt.INTERNAL:return b.INTERNAL;case nt.UNAVAILABLE:return b.UNAVAILABLE;case nt.UNAUTHENTICATED:return b.UNAUTHENTICATED;case nt.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case nt.NOT_FOUND:return b.NOT_FOUND;case nt.ALREADY_EXISTS:return b.ALREADY_EXISTS;case nt.PERMISSION_DENIED:return b.PERMISSION_DENIED;case nt.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case nt.ABORTED:return b.ABORTED;case nt.OUT_OF_RANGE:return b.OUT_OF_RANGE;case nt.UNIMPLEMENTED:return b.UNIMPLEMENTED;case nt.DATA_LOSS:return b.DATA_LOSS;default:return M()}}(F=nt||(nt={}))[F.OK=0]="OK",F[F.CANCELLED=1]="CANCELLED",F[F.UNKNOWN=2]="UNKNOWN",F[F.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",F[F.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",F[F.NOT_FOUND=5]="NOT_FOUND",F[F.ALREADY_EXISTS=6]="ALREADY_EXISTS",F[F.PERMISSION_DENIED=7]="PERMISSION_DENIED",F[F.UNAUTHENTICATED=16]="UNAUTHENTICATED",F[F.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",F[F.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",F[F.ABORTED=10]="ABORTED",F[F.OUT_OF_RANGE=11]="OUT_OF_RANGE",F[F.UNIMPLEMENTED=12]="UNIMPLEMENTED",F[F.INTERNAL=13]="INTERNAL",F[F.UNAVAILABLE=14]="UNAVAILABLE",F[F.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */new Go([4294967295,4294967295],0);class jc{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function os(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function Bc(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function $c(n,t){return os(n,t.toTimestamp())}function Te(n){return et(!!n),Y.fromTimestamp(function(e){const s=de(e);return new at(s.seconds,s.nanos)}(n))}function Aa(n,t){return as(n,t).canonicalString()}function as(n,t){const e=function(i){return new rt(["projects",i.projectId,"databases",i.database])}(n).child("documents");return t===void 0?e:e.child(t)}function qc(n){const t=rt.fromString(n);return et(Yc(t)),t}function ls(n,t){return Aa(n.databaseId,t.path)}function zc(n){const t=qc(n);return t.length===4?rt.emptyPath():Kc(t)}function Gc(n){return new rt(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Kc(n){return et(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function uo(n,t,e){return{name:ls(n,t),fields:e.value.mapValue.fields}}function Hc(n,t){let e;if(t instanceof dn)e={update:uo(n,t.key,t.value)};else if(t instanceof wa)e={delete:ls(n,t.key)};else if(t instanceof Zt)e={update:uo(n,t.key,t.data),updateMask:Xc(t.fieldMask)};else{if(!(t instanceof Oc))return M();e={verify:ls(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(s=>function(o,l){const c=l.transform;if(c instanceof tr)return{fieldPath:l.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof an)return{fieldPath:l.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof ln)return{fieldPath:l.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof er)return{fieldPath:l.field.canonicalString(),increment:c.Pe};throw M()}(0,s))),t.precondition.isNone||(e.currentDocument=function(i,o){return o.updateTime!==void 0?{updateTime:$c(i,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:M()}(n,t.precondition)),e}function Qc(n,t){return n&&n.length>0?(et(t!==void 0),n.map(e=>function(i,o){let l=i.updateTime?Te(i.updateTime):Te(o);return l.isEqual(Y.min())&&(l=Te(o)),new kc(l,i.transformResults||[])}(e,t))):[]}function Wc(n){let t=zc(n.parent);const e=n.structuredQuery,s=e.from?e.from.length:0;let i=null;if(s>0){et(s===1);const v=e.from[0];v.allDescendants?i=v.collectionId:t=t.child(v.collectionId)}let o=[];e.where&&(o=function(I){const P=Ia(I);return P instanceof Yt&&oa(P)?P.getFilters():[P]}(e.where));let l=[];e.orderBy&&(l=function(I){return I.map(P=>function(V){return new Jn(Ee(V.field),function(k){switch(k){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(V.direction))}(P))}(e.orderBy));let c=null;e.limit&&(c=function(I){let P;return P=typeof I=="object"?I.value:I,ps(P)?null:P}(e.limit));let d=null;e.startAt&&(d=function(I){const P=!!I.before,x=I.values||[];return new Yn(x,P)}(e.startAt));let f=null;return e.endAt&&(f=function(I){const P=!I.before,x=I.values||[];return new Yn(x,P)}(e.endAt)),_c(t,i,l,o,c,"F",d,f)}function Ia(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const s=Ee(e.unaryFilter.field);return ot.create(s,"==",{doubleValue:NaN});case"IS_NULL":const i=Ee(e.unaryFilter.field);return ot.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Ee(e.unaryFilter.field);return ot.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const l=Ee(e.unaryFilter.field);return ot.create(l,"!=",{nullValue:"NULL_VALUE"});default:return M()}}(n):n.fieldFilter!==void 0?function(e){return ot.create(Ee(e.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return M()}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return Yt.create(e.compositeFilter.filters.map(s=>Ia(s)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return M()}}(e.compositeFilter.op))}(n):M()}function Ee(n){return ht.fromServerFormat(n.fieldPath)}function Xc(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Yc(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(t){this.ct=t}}function Zc(n){const t=Wc({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?is(t,t.limit,"L"):t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class th{constructor(){this.un=new eh}addToCollectionParentIndex(t,e){return this.un.add(e),S.resolve()}getCollectionParents(t,e){return S.resolve(this.un.getEntries(e))}addFieldIndex(t,e){return S.resolve()}deleteFieldIndex(t,e){return S.resolve()}deleteAllFieldIndexes(t){return S.resolve()}createTargetIndexes(t,e){return S.resolve()}getDocumentsMatchingTarget(t,e){return S.resolve(null)}getIndexType(t,e){return S.resolve(0)}getFieldIndexes(t,e){return S.resolve([])}getNextCollectionGroupToUpdate(t){return S.resolve(null)}getMinOffset(t,e){return S.resolve(Xt.min())}getMinOffsetFromCollectionGroup(t,e){return S.resolve(Xt.min())}updateCollectionGroup(t,e,s){return S.resolve()}updateIndexEntries(t,e){return S.resolve()}}class eh{constructor(){this.index={}}add(t){const e=t.lastSegment(),s=t.popLast(),i=this.index[e]||new Et(rt.comparator),o=!i.has(s);return this.index[e]=i.add(s),o}has(t){const e=t.lastSegment(),s=t.popLast(),i=this.index[e];return i&&i.has(s)}getEntries(t){return(this.index[t]||new Et(rt.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Re{constructor(t){this.Ln=t}next(){return this.Ln+=2,this.Ln}static Bn(){return new Re(0)}static kn(){return new Re(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nh{constructor(){this.changes=new be(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,kt.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const s=this.changes.get(e);return s!==void 0?S.resolve(s):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rh{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sh{constructor(t,e,s,i){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=s,this.indexManager=i}getDocument(t,e){let s=null;return this.documentOverlayCache.getOverlay(t,e).next(i=>(s=i,this.remoteDocumentCache.getEntry(t,e))).next(i=>(s!==null&&en(s.mutation,i,St.empty(),at.now()),i))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(s=>this.getLocalViewOfDocuments(t,s,yt()).next(()=>s))}getLocalViewOfDocuments(t,e,s=yt()){const i=se();return this.populateOverlays(t,i,e).next(()=>this.computeViews(t,e,i,s).next(o=>{let l=Un();return o.forEach((c,d)=>{l=l.insert(c,d.overlayedDocument)}),l}))}getOverlayedDocuments(t,e){const s=se();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,yt()))}populateOverlays(t,e,s){const i=[];return s.forEach(o=>{e.has(o)||i.push(o)}),this.documentOverlayCache.getOverlays(t,i).next(o=>{o.forEach((l,c)=>{e.set(l,c)})})}computeViews(t,e,s,i){let o=Zn();const l=tn(),c=function(){return tn()}();return e.forEach((d,f)=>{const v=s.get(f.key);i.has(f.key)&&(v===void 0||v.mutation instanceof Zt)?o=o.insert(f.key,f):v!==void 0?(l.set(f.key,v.mutation.getFieldMask()),en(v.mutation,f,v.mutation.getFieldMask(),at.now())):l.set(f.key,St.empty())}),this.recalculateAndSaveOverlays(t,o).next(d=>(d.forEach((f,v)=>l.set(f,v)),e.forEach((f,v)=>{var I;return c.set(f,new rh(v,(I=l.get(f))!==null&&I!==void 0?I:null))}),c))}recalculateAndSaveOverlays(t,e){const s=tn();let i=new At((l,c)=>l-c),o=yt();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(l=>{for(const c of l)c.keys().forEach(d=>{const f=e.get(d);if(f===null)return;let v=s.get(d)||St.empty();v=c.applyToLocalView(f,v),s.set(d,v);const I=(i.get(c.batchId)||yt()).add(d);i=i.insert(c.batchId,I)})}).next(()=>{const l=[],c=i.getReverseIterator();for(;c.hasNext();){const d=c.getNext(),f=d.key,v=d.value,I=pa();v.forEach(P=>{if(!o.has(P)){const x=Ta(e.get(P),s.get(P));x!==null&&I.set(P,x),o=o.add(P)}}),l.push(this.documentOverlayCache.saveOverlays(t,f,I))}return S.waitFor(l)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(s=>this.recalculateAndSaveOverlays(t,s))}getDocumentsMatchingQuery(t,e,s,i){return function(l){return L.isDocumentKey(l.path)&&l.collectionGroup===null&&l.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):Ec(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,s,i):this.getDocumentsMatchingCollectionQuery(t,e,s,i)}getNextDocuments(t,e,s,i){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,s,i).next(o=>{const l=i-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,s.largestBatchId,i-o.size):S.resolve(se());let c=-1,d=o;return l.next(f=>S.forEach(f,(v,I)=>(c<I.largestBatchId&&(c=I.largestBatchId),o.get(v)?S.resolve():this.remoteDocumentCache.getEntry(t,v).next(P=>{d=d.insert(v,P)}))).next(()=>this.populateOverlays(t,f,o)).next(()=>this.computeViews(t,d,f,yt())).next(v=>({batchId:c,changes:fa(v)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new L(e)).next(s=>{let i=Un();return s.isFoundDocument()&&(i=i.insert(s.key,s)),i})}getDocumentsMatchingCollectionGroupQuery(t,e,s,i){const o=e.collectionGroup;let l=Un();return this.indexManager.getCollectionParents(t,o).next(c=>S.forEach(c,d=>{const f=function(I,P){return new ar(P,null,I.explicitOrderBy.slice(),I.filters.slice(),I.limit,I.limitType,I.startAt,I.endAt)}(e,d.child(o));return this.getDocumentsMatchingCollectionQuery(t,f,s,i).next(v=>{v.forEach((I,P)=>{l=l.insert(I,P)})})}).next(()=>l))}getDocumentsMatchingCollectionQuery(t,e,s,i){let o;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,s.largestBatchId).next(l=>(o=l,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,s,o,i))).next(l=>{o.forEach((d,f)=>{const v=f.getKey();l.get(v)===null&&(l=l.insert(v,kt.newInvalidDocument(v)))});let c=Un();return l.forEach((d,f)=>{const v=o.get(d);v!==void 0&&en(v.mutation,f,St.empty(),at.now()),Es(e,f)&&(c=c.insert(d,f))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ih{constructor(t){this.serializer=t,this.hr=new Map,this.Pr=new Map}getBundleMetadata(t,e){return S.resolve(this.hr.get(e))}saveBundleMetadata(t,e){return this.hr.set(e.id,function(i){return{id:i.id,version:i.version,createTime:Te(i.createTime)}}(e)),S.resolve()}getNamedQuery(t,e){return S.resolve(this.Pr.get(e))}saveNamedQuery(t,e){return this.Pr.set(e.name,function(i){return{name:i.name,query:Zc(i.bundledQuery),readTime:Te(i.readTime)}}(e)),S.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oh{constructor(){this.overlays=new At(L.comparator),this.Ir=new Map}getOverlay(t,e){return S.resolve(this.overlays.get(e))}getOverlays(t,e){const s=se();return S.forEach(e,i=>this.getOverlay(t,i).next(o=>{o!==null&&s.set(i,o)})).next(()=>s)}saveOverlays(t,e,s){return s.forEach((i,o)=>{this.ht(t,e,o)}),S.resolve()}removeOverlaysForBatchId(t,e,s){const i=this.Ir.get(s);return i!==void 0&&(i.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(s)),S.resolve()}getOverlaysForCollection(t,e,s){const i=se(),o=e.length+1,l=new L(e.child("")),c=this.overlays.getIteratorFrom(l);for(;c.hasNext();){const d=c.getNext().value,f=d.getKey();if(!e.isPrefixOf(f.path))break;f.path.length===o&&d.largestBatchId>s&&i.set(d.getKey(),d)}return S.resolve(i)}getOverlaysForCollectionGroup(t,e,s,i){let o=new At((f,v)=>f-v);const l=this.overlays.getIterator();for(;l.hasNext();){const f=l.getNext().value;if(f.getKey().getCollectionGroup()===e&&f.largestBatchId>s){let v=o.get(f.largestBatchId);v===null&&(v=se(),o=o.insert(f.largestBatchId,v)),v.set(f.getKey(),f)}}const c=se(),d=o.getIterator();for(;d.hasNext()&&(d.getNext().value.forEach((f,v)=>c.set(f,v)),!(c.size()>=i)););return S.resolve(c)}ht(t,e,s){const i=this.overlays.get(s.key);if(i!==null){const l=this.Ir.get(i.largestBatchId).delete(s.key);this.Ir.set(i.largestBatchId,l)}this.overlays=this.overlays.insert(s.key,new Mc(e,s));let o=this.Ir.get(e);o===void 0&&(o=yt(),this.Ir.set(e,o)),this.Ir.set(e,o.add(s.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ah{constructor(){this.sessionToken=Ut.EMPTY_BYTE_STRING}getSessionToken(t){return S.resolve(this.sessionToken)}setSessionToken(t,e){return this.sessionToken=e,S.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ws{constructor(){this.Tr=new Et(it.Er),this.dr=new Et(it.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(t,e){const s=new it(t,e);this.Tr=this.Tr.add(s),this.dr=this.dr.add(s)}Rr(t,e){t.forEach(s=>this.addReference(s,e))}removeReference(t,e){this.Vr(new it(t,e))}mr(t,e){t.forEach(s=>this.removeReference(s,e))}gr(t){const e=new L(new rt([])),s=new it(e,t),i=new it(e,t+1),o=[];return this.dr.forEachInRange([s,i],l=>{this.Vr(l),o.push(l.key)}),o}pr(){this.Tr.forEach(t=>this.Vr(t))}Vr(t){this.Tr=this.Tr.delete(t),this.dr=this.dr.delete(t)}yr(t){const e=new L(new rt([])),s=new it(e,t),i=new it(e,t+1);let o=yt();return this.dr.forEachInRange([s,i],l=>{o=o.add(l.key)}),o}containsKey(t){const e=new it(t,0),s=this.Tr.firstAfterOrEqual(e);return s!==null&&t.isEqual(s.key)}}class it{constructor(t,e){this.key=t,this.wr=e}static Er(t,e){return L.comparator(t.key,e.key)||H(t.wr,e.wr)}static Ar(t,e){return H(t.wr,e.wr)||L.comparator(t.key,e.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lh{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.Sr=1,this.br=new Et(it.Er)}checkEmpty(t){return S.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,s,i){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const l=new Lc(o,e,s,i);this.mutationQueue.push(l);for(const c of i)this.br=this.br.add(new it(c.key,o)),this.indexManager.addToCollectionParentIndex(t,c.key.path.popLast());return S.resolve(l)}lookupMutationBatch(t,e){return S.resolve(this.Dr(e))}getNextMutationBatchAfterBatchId(t,e){const s=e+1,i=this.vr(s),o=i<0?0:i;return S.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return S.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(t){return S.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const s=new it(e,0),i=new it(e,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([s,i],l=>{const c=this.Dr(l.wr);o.push(c)}),S.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(t,e){let s=new Et(H);return e.forEach(i=>{const o=new it(i,0),l=new it(i,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,l],c=>{s=s.add(c.wr)})}),S.resolve(this.Cr(s))}getAllMutationBatchesAffectingQuery(t,e){const s=e.path,i=s.length+1;let o=s;L.isDocumentKey(o)||(o=o.child(""));const l=new it(new L(o),0);let c=new Et(H);return this.br.forEachWhile(d=>{const f=d.key.path;return!!s.isPrefixOf(f)&&(f.length===i&&(c=c.add(d.wr)),!0)},l),S.resolve(this.Cr(c))}Cr(t){const e=[];return t.forEach(s=>{const i=this.Dr(s);i!==null&&e.push(i)}),e}removeMutationBatch(t,e){et(this.Fr(e.batchId,"removed")===0),this.mutationQueue.shift();let s=this.br;return S.forEach(e.mutations,i=>{const o=new it(i.key,e.batchId);return s=s.delete(o),this.referenceDelegate.markPotentiallyOrphaned(t,i.key)}).next(()=>{this.br=s})}On(t){}containsKey(t,e){const s=new it(e,0),i=this.br.firstAfterOrEqual(s);return S.resolve(e.isEqual(i&&i.key))}performConsistencyCheck(t){return this.mutationQueue.length,S.resolve()}Fr(t,e){return this.vr(t)}vr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}Dr(t){const e=this.vr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uh{constructor(t){this.Mr=t,this.docs=function(){return new At(L.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const s=e.key,i=this.docs.get(s),o=i?i.size:0,l=this.Mr(e);return this.docs=this.docs.insert(s,{document:e.mutableCopy(),size:l}),this.size+=l-o,this.indexManager.addToCollectionParentIndex(t,s.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const s=this.docs.get(e);return S.resolve(s?s.document.mutableCopy():kt.newInvalidDocument(e))}getEntries(t,e){let s=Zn();return e.forEach(i=>{const o=this.docs.get(i);s=s.insert(i,o?o.document.mutableCopy():kt.newInvalidDocument(i))}),S.resolve(s)}getDocumentsMatchingQuery(t,e,s,i){let o=Zn();const l=e.path,c=new L(l.child("")),d=this.docs.getIteratorFrom(c);for(;d.hasNext();){const{key:f,value:{document:v}}=d.getNext();if(!l.isPrefixOf(f.path))break;f.path.length>l.length+1||Yu(Xu(v),s)<=0||(i.has(v.key)||Es(e,v))&&(o=o.insert(v.key,v.mutableCopy()))}return S.resolve(o)}getAllFromCollectionGroup(t,e,s,i){M()}Or(t,e){return S.forEach(this.docs,s=>e(s))}newChangeBuffer(t){return new ch(this)}getSize(t){return S.resolve(this.size)}}class ch extends nh{constructor(t){super(),this.cr=t}applyChanges(t){const e=[];return this.changes.forEach((s,i)=>{i.isValidDocument()?e.push(this.cr.addEntry(t,i)):this.cr.removeEntry(s)}),S.waitFor(e)}getFromCache(t,e){return this.cr.getEntry(t,e)}getAllFromCache(t,e){return this.cr.getEntries(t,e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hh{constructor(t){this.persistence=t,this.Nr=new be(e=>_s(e),ys),this.lastRemoteSnapshotVersion=Y.min(),this.highestTargetId=0,this.Lr=0,this.Br=new ws,this.targetCount=0,this.kr=Re.Bn()}forEachTarget(t,e){return this.Nr.forEach((s,i)=>e(i)),S.resolve()}getLastRemoteSnapshotVersion(t){return S.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return S.resolve(this.Lr)}allocateTargetId(t){return this.highestTargetId=this.kr.next(),S.resolve(this.highestTargetId)}setTargetsMetadata(t,e,s){return s&&(this.lastRemoteSnapshotVersion=s),e>this.Lr&&(this.Lr=e),S.resolve()}Kn(t){this.Nr.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.kr=new Re(e),this.highestTargetId=e),t.sequenceNumber>this.Lr&&(this.Lr=t.sequenceNumber)}addTargetData(t,e){return this.Kn(e),this.targetCount+=1,S.resolve()}updateTargetData(t,e){return this.Kn(e),S.resolve()}removeTargetData(t,e){return this.Nr.delete(e.target),this.Br.gr(e.targetId),this.targetCount-=1,S.resolve()}removeTargets(t,e,s){let i=0;const o=[];return this.Nr.forEach((l,c)=>{c.sequenceNumber<=e&&s.get(c.targetId)===null&&(this.Nr.delete(l),o.push(this.removeMatchingKeysForTargetId(t,c.targetId)),i++)}),S.waitFor(o).next(()=>i)}getTargetCount(t){return S.resolve(this.targetCount)}getTargetData(t,e){const s=this.Nr.get(e)||null;return S.resolve(s)}addMatchingKeys(t,e,s){return this.Br.Rr(e,s),S.resolve()}removeMatchingKeys(t,e,s){this.Br.mr(e,s);const i=this.persistence.referenceDelegate,o=[];return i&&e.forEach(l=>{o.push(i.markPotentiallyOrphaned(t,l))}),S.waitFor(o)}removeMatchingKeysForTargetId(t,e){return this.Br.gr(e),S.resolve()}getMatchingKeysForTargetId(t,e){const s=this.Br.yr(e);return S.resolve(s)}containsKey(t,e){return S.resolve(this.Br.containsKey(e))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dh{constructor(t,e){this.qr={},this.overlays={},this.Qr=new ta(0),this.Kr=!1,this.Kr=!0,this.$r=new ah,this.referenceDelegate=t(this),this.Ur=new hh(this),this.indexManager=new th,this.remoteDocumentCache=function(i){return new uh(i)}(s=>this.referenceDelegate.Wr(s)),this.serializer=new Jc(e),this.Gr=new ih(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new oh,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let s=this.qr[t.toKey()];return s||(s=new lh(e,this.referenceDelegate),this.qr[t.toKey()]=s),s}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(t,e,s){D("MemoryPersistence","Starting transaction:",t);const i=new fh(this.Qr.next());return this.referenceDelegate.zr(),s(i).next(o=>this.referenceDelegate.jr(i).next(()=>o)).toPromise().then(o=>(i.raiseOnCommittedEvent(),o))}Hr(t,e){return S.or(Object.values(this.qr).map(s=>()=>s.containsKey(t,e)))}}class fh extends Zu{constructor(t){super(),this.currentSequenceNumber=t}}class As{constructor(t){this.persistence=t,this.Jr=new ws,this.Yr=null}static Zr(t){return new As(t)}get Xr(){if(this.Yr)return this.Yr;throw M()}addReference(t,e,s){return this.Jr.addReference(s,e),this.Xr.delete(s.toString()),S.resolve()}removeReference(t,e,s){return this.Jr.removeReference(s,e),this.Xr.add(s.toString()),S.resolve()}markPotentiallyOrphaned(t,e){return this.Xr.add(e.toString()),S.resolve()}removeTarget(t,e){this.Jr.gr(e.targetId).forEach(i=>this.Xr.add(i.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(t,e.targetId).next(i=>{i.forEach(o=>this.Xr.add(o.toString()))}).next(()=>s.removeTargetData(t,e))}zr(){this.Yr=new Set}jr(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return S.forEach(this.Xr,s=>{const i=L.fromPath(s);return this.ei(t,i).next(o=>{o||e.removeEntry(i,Y.min())})}).next(()=>(this.Yr=null,e.apply(t)))}updateLimboDocument(t,e){return this.ei(t,e).next(s=>{s?this.Xr.delete(e.toString()):this.Xr.add(e.toString())})}Wr(t){return 0}ei(t,e){return S.or([()=>S.resolve(this.Jr.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Hr(t,e)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Is{constructor(t,e,s,i){this.targetId=t,this.fromCache=e,this.$i=s,this.Ui=i}static Wi(t,e){let s=yt(),i=yt();for(const o of e.docChanges)switch(o.type){case 0:s=s.add(o.doc.key);break;case 1:i=i.add(o.doc.key)}return new Is(t,e.fromCache,s,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ph{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mh{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return du()?8:tc(fu())>0?6:4}()}initialize(t,e){this.Ji=t,this.indexManager=e,this.Gi=!0}getDocumentsMatchingQuery(t,e,s,i){const o={result:null};return this.Yi(t,e).next(l=>{o.result=l}).next(()=>{if(!o.result)return this.Zi(t,e,i,s).next(l=>{o.result=l})}).next(()=>{if(o.result)return;const l=new ph;return this.Xi(t,e,l).next(c=>{if(o.result=c,this.zi)return this.es(t,e,l,c.size)})}).next(()=>o.result)}es(t,e,s,i){return s.documentReadCount<this.ji?(He()<=Qt.DEBUG&&D("QueryEngine","SDK will not create cache indexes for query:",Qe(e),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),S.resolve()):(He()<=Qt.DEBUG&&D("QueryEngine","Query:",Qe(e),"scans",s.documentReadCount,"local documents and returns",i,"documents as results."),s.documentReadCount>this.Hi*i?(He()<=Qt.DEBUG&&D("QueryEngine","The SDK decides to create cache indexes for query:",Qe(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,le(e))):S.resolve())}Yi(t,e){if(so(e))return S.resolve(null);let s=le(e);return this.indexManager.getIndexType(t,s).next(i=>i===0?null:(e.limit!==null&&i===1&&(e=is(e,null,"F"),s=le(e)),this.indexManager.getDocumentsMatchingTarget(t,s).next(o=>{const l=yt(...o);return this.Ji.getDocuments(t,l).next(c=>this.indexManager.getMinOffset(t,s).next(d=>{const f=this.ts(e,c);return this.ns(e,f,l,d.readTime)?this.Yi(t,is(e,null,"F")):this.rs(t,f,e,d)}))})))}Zi(t,e,s,i){return so(e)||i.isEqual(Y.min())?S.resolve(null):this.Ji.getDocuments(t,s).next(o=>{const l=this.ts(e,o);return this.ns(e,l,s,i)?S.resolve(null):(He()<=Qt.DEBUG&&D("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Qe(e)),this.rs(t,l,e,Wu(i,-1)).next(c=>c))})}ts(t,e){let s=new Et(vc(t));return e.forEach((i,o)=>{Es(t,o)&&(s=s.add(o))}),s}ns(t,e,s,i){if(t.limit===null)return!1;if(s.size!==e.size)return!0;const o=t.limitType==="F"?e.last():e.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(i)>0)}Xi(t,e,s){return He()<=Qt.DEBUG&&D("QueryEngine","Using full collection scan to execute query:",Qe(e)),this.Ji.getDocumentsMatchingQuery(t,e,Xt.min(),s)}rs(t,e,s,i){return this.Ji.getDocumentsMatchingQuery(t,s,i).next(o=>(e.forEach(l=>{o=o.insert(l.key,l)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gh{constructor(t,e,s,i){this.persistence=t,this.ss=e,this.serializer=i,this.os=new At(H),this._s=new be(o=>_s(o),ys),this.us=new Map,this.cs=t.getRemoteDocumentCache(),this.Ur=t.getTargetCache(),this.Gr=t.getBundleCache(),this.ls(s)}ls(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new sh(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.os))}}function _h(n,t,e,s){return new gh(n,t,e,s)}async function Ra(n,t){const e=Q(n);return await e.persistence.runTransaction("Handle user change","readonly",s=>{let i;return e.mutationQueue.getAllMutationBatches(s).next(o=>(i=o,e.ls(t),e.mutationQueue.getAllMutationBatches(s))).next(o=>{const l=[],c=[];let d=yt();for(const f of i){l.push(f.batchId);for(const v of f.mutations)d=d.add(v.key)}for(const f of o){c.push(f.batchId);for(const v of f.mutations)d=d.add(v.key)}return e.localDocuments.getDocuments(s,d).next(f=>({hs:f,removedBatchIds:l,addedBatchIds:c}))})})}function yh(n,t){const e=Q(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const i=t.batch.keys(),o=e.cs.newChangeBuffer({trackRemovals:!0});return function(c,d,f,v){const I=f.batch,P=I.keys();let x=S.resolve();return P.forEach(V=>{x=x.next(()=>v.getEntry(d,V)).next(N=>{const k=f.docVersions.get(V);et(k!==null),N.version.compareTo(k)<0&&(I.applyToRemoteDocument(N,f),N.isValidDocument()&&(N.setReadTime(f.commitVersion),v.addEntry(N)))})}),x.next(()=>c.mutationQueue.removeMutationBatch(d,I))}(e,s,t,o).next(()=>o.apply(s)).next(()=>e.mutationQueue.performConsistencyCheck(s)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(s,i,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(c){let d=yt();for(let f=0;f<c.mutationResults.length;++f)c.mutationResults[f].transformResults.length>0&&(d=d.add(c.batch.mutations[f].key));return d}(t))).next(()=>e.localDocuments.getDocuments(s,i))})}function Eh(n){const t=Q(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.Ur.getLastRemoteSnapshotVersion(e))}function Th(n,t){const e=Q(n);return e.persistence.runTransaction("Get next mutation batch","readonly",s=>(t===void 0&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(s,t)))}class co{constructor(){this.activeTargetIds=Sc()}fs(t){this.activeTargetIds=this.activeTargetIds.add(t)}gs(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Vs(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class vh{constructor(){this.so=new co,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,s){}addLocalQueryTarget(t,e=!0){return e&&this.so.fs(t),this.oo[t]||"not-current"}updateQueryState(t,e,s){this.oo[t]=e}removeLocalQueryTarget(t){this.so.gs(t)}isLocalQueryTarget(t){return this.so.activeTargetIds.has(t)}clearQueryState(t){delete this.oo[t]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(t){return this.so.activeTargetIds.has(t)}start(){return this.so=new co,Promise.resolve()}handleUserChange(t,e,s){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wh{_o(t){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(t){this.ho.push(t)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){D("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.ho)t(0)}lo(){D("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.ho)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fn=null;function qr(){return Fn===null?Fn=function(){return 268435456+Math.round(2147483648*Math.random())}():Fn++,"0x"+Fn.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ah={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ih{constructor(t){this.Io=t.Io,this.To=t.To}Eo(t){this.Ao=t}Ro(t){this.Vo=t}mo(t){this.fo=t}onMessage(t){this.po=t}close(){this.To()}send(t){this.Io(t)}yo(){this.Ao()}wo(){this.Vo()}So(t){this.fo(t)}bo(t){this.po(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gt="WebChannelConnection";class Rh extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const s=e.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=s+"://"+e.host,this.vo=`projects/${i}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${o}`}get Fo(){return!1}Mo(e,s,i,o,l){const c=qr(),d=this.xo(e,s.toUriEncodedString());D("RestConnection",`Sending RPC '${e}' ${c}:`,d,i);const f={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(f,o,l),this.No(e,d,f,i).then(v=>(D("RestConnection",`Received RPC '${e}' ${c}: `,v),v),v=>{throw Hn("RestConnection",`RPC '${e}' ${c} failed with error: `,v,"url: ",d,"request:",i),v})}Lo(e,s,i,o,l,c){return this.Mo(e,s,i,o,l)}Oo(e,s,i){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Pe}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),s&&s.headers.forEach((o,l)=>e[l]=o),i&&i.headers.forEach((o,l)=>e[l]=o)}xo(e,s){const i=Ah[e];return`${this.Do}/v1/${s}:${i}`}terminate(){}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}No(t,e,s,i){const o=qr();return new Promise((l,c)=>{const d=new Ko;d.setWithCredentials(!0),d.listenOnce(Ho.COMPLETE,()=>{try{switch(d.getLastErrorCode()){case $n.NO_ERROR:const v=d.getResponseJson();D(gt,`XHR for RPC '${t}' ${o} received:`,JSON.stringify(v)),l(v);break;case $n.TIMEOUT:D(gt,`RPC '${t}' ${o} timed out`),c(new O(b.DEADLINE_EXCEEDED,"Request time out"));break;case $n.HTTP_ERROR:const I=d.getStatus();if(D(gt,`RPC '${t}' ${o} failed with status:`,I,"response text:",d.getResponseText()),I>0){let P=d.getResponseJson();Array.isArray(P)&&(P=P[0]);const x=P==null?void 0:P.error;if(x&&x.status&&x.message){const V=function(k){const U=k.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(U)>=0?U:b.UNKNOWN}(x.status);c(new O(V,x.message))}else c(new O(b.UNKNOWN,"Server responded with status "+d.getStatus()))}else c(new O(b.UNAVAILABLE,"Connection failed."));break;default:M()}}finally{D(gt,`RPC '${t}' ${o} completed.`)}});const f=JSON.stringify(i);D(gt,`RPC '${t}' ${o} sending request:`,i),d.send(e,"POST",f,s,15)})}Bo(t,e,s){const i=qr(),o=[this.Do,"/","google.firestore.v1.Firestore","/",t,"/channel"],l=Xo(),c=Wo(),d={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},f=this.longPollingOptions.timeoutSeconds;f!==void 0&&(d.longPollingTimeout=Math.round(1e3*f)),this.useFetchStreams&&(d.useFetchStreams=!0),this.Oo(d.initMessageHeaders,e,s),d.encodeInitMessageHeaders=!0;const v=o.join("");D(gt,`Creating RPC '${t}' stream ${i}: ${v}`,d);const I=l.createWebChannel(v,d);let P=!1,x=!1;const V=new Ih({Io:k=>{x?D(gt,`Not sending because RPC '${t}' stream ${i} is closed:`,k):(P||(D(gt,`Opening RPC '${t}' stream ${i} transport.`),I.open(),P=!0),D(gt,`RPC '${t}' stream ${i} sending:`,k),I.send(k))},To:()=>I.close()}),N=(k,U,q)=>{k.listen(U,B=>{try{q(B)}catch(z){setTimeout(()=>{throw z},0)}})};return N(I,Ye.EventType.OPEN,()=>{x||(D(gt,`RPC '${t}' stream ${i} transport opened.`),V.yo())}),N(I,Ye.EventType.CLOSE,()=>{x||(x=!0,D(gt,`RPC '${t}' stream ${i} transport closed`),V.So())}),N(I,Ye.EventType.ERROR,k=>{x||(x=!0,Hn(gt,`RPC '${t}' stream ${i} transport errored:`,k),V.So(new O(b.UNAVAILABLE,"The operation could not be completed")))}),N(I,Ye.EventType.MESSAGE,k=>{var U;if(!x){const q=k.data[0];et(!!q);const B=q,z=B.error||((U=B[0])===null||U===void 0?void 0:U.error);if(z){D(gt,`RPC '${t}' stream ${i} received error:`,z);const xt=z.status;let st=function(g){const _=nt[g];if(_!==void 0)return Fc(_)}(xt),E=z.message;st===void 0&&(st=b.INTERNAL,E="Unknown error status: "+xt+" with message "+z.message),x=!0,V.So(new O(st,E)),I.close()}else D(gt,`RPC '${t}' stream ${i} received:`,q),V.bo(q)}}),N(c,Qo.STAT_EVENT,k=>{k.stat===es.PROXY?D(gt,`RPC '${t}' stream ${i} detected buffering proxy`):k.stat===es.NOPROXY&&D(gt,`RPC '${t}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{V.wo()},0),V}}function zr(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function cr(n){return new jc(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pa{constructor(t,e,s=1e3,i=1.5,o=6e4){this.ui=t,this.timerId=e,this.ko=s,this.qo=i,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(t){this.cancel();const e=Math.floor(this.Ko+this.zo()),s=Math.max(0,Date.now()-this.Uo),i=Math.max(0,e-s);i>0&&D("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Ko} ms, delay with jitter: ${e} ms, last attempt: ${s} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,i,()=>(this.Uo=Date.now(),t())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ph{constructor(t,e,s,i,o,l,c,d){this.ui=t,this.Ho=s,this.Jo=i,this.connection=o,this.authCredentialsProvider=l,this.appCheckCredentialsProvider=c,this.listener=d,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new Pa(t,e)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(t){this.u_(),this.stream.send(t)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(t,e){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,t!==4?this.t_.reset():e&&e.code===b.RESOURCE_EXHAUSTED?(he(e.toString()),he("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):e&&e.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.mo(e)}l_(){}auth(){this.state=1;const t=this.h_(this.Yo),e=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,i])=>{this.Yo===e&&this.P_(s,i)},s=>{t(()=>{const i=new O(b.UNKNOWN,"Fetching auth token failed: "+s.message);return this.I_(i)})})}P_(t,e){const s=this.h_(this.Yo);this.stream=this.T_(t,e),this.stream.Eo(()=>{s(()=>this.listener.Eo())}),this.stream.Ro(()=>{s(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(i=>{s(()=>this.I_(i))}),this.stream.onMessage(i=>{s(()=>++this.e_==1?this.E_(i):this.onNext(i))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(t){return D("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}h_(t){return e=>{this.ui.enqueueAndForget(()=>this.Yo===t?e():(D("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Sh extends Ph{constructor(t,e,s,i,o,l){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,s,i,l),this.serializer=o}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(t,e){return this.connection.Bo("Write",t,e)}E_(t){return et(!!t.streamToken),this.lastStreamToken=t.streamToken,et(!t.writeResults||t.writeResults.length===0),this.listener.f_()}onNext(t){et(!!t.streamToken),this.lastStreamToken=t.streamToken,this.t_.reset();const e=Qc(t.writeResults,t.commitTime),s=Te(t.commitTime);return this.listener.g_(s,e)}p_(){const t={};t.database=Gc(this.serializer),this.a_(t)}m_(t){const e={streamToken:this.lastStreamToken,writes:t.map(s=>Hc(this.serializer,s))};this.a_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bh extends class{}{constructor(t,e,s,i){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=s,this.serializer=i,this.y_=!1}w_(){if(this.y_)throw new O(b.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(t,e,s,i){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Mo(t,as(e,s),i,o,l)).catch(o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new O(b.UNKNOWN,o.toString())})}Lo(t,e,s,i,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([l,c])=>this.connection.Lo(t,as(e,s),i,l,c,o)).catch(l=>{throw l.name==="FirebaseError"?(l.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),l):new O(b.UNKNOWN,l.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class Ch{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(t){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.C_("Offline")))}set(t){this.x_(),this.S_=0,t==="Online"&&(this.D_=!1),this.C_(t)}C_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}F_(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(he(e),this.D_=!1):D("OnlineStateTracker",e)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xh{constructor(t,e,s,i,o){this.localStore=t,this.datastore=e,this.asyncQueue=s,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(l=>{s.enqueueAndForget(async()=>{pn(this)&&(D("RemoteStore","Restarting streams for network reachability change."),await async function(d){const f=Q(d);f.L_.add(4),await fn(f),f.q_.set("Unknown"),f.L_.delete(4),await hr(f)}(this))})}),this.q_=new Ch(s,i)}}async function hr(n){if(pn(n))for(const t of n.B_)await t(!0)}async function fn(n){for(const t of n.B_)await t(!1)}function pn(n){return Q(n).L_.size===0}async function Sa(n,t,e){if(!or(t))throw t;n.L_.add(1),await fn(n),n.q_.set("Offline"),e||(e=()=>Eh(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{D("RemoteStore","Retrying IndexedDB access"),await e(),n.L_.delete(1),await hr(n)})}function ba(n,t){return t().catch(e=>Sa(n,e,t))}async function dr(n){const t=Q(n),e=Jt(t);let s=t.O_.length>0?t.O_[t.O_.length-1].batchId:-1;for(;Vh(t);)try{const i=await Th(t.localStore,s);if(i===null){t.O_.length===0&&e.o_();break}s=i.batchId,kh(t,i)}catch(i){await Sa(t,i)}Ca(t)&&xa(t)}function Vh(n){return pn(n)&&n.O_.length<10}function kh(n,t){n.O_.push(t);const e=Jt(n);e.r_()&&e.V_&&e.m_(t.mutations)}function Ca(n){return pn(n)&&!Jt(n).n_()&&n.O_.length>0}function xa(n){Jt(n).start()}async function Nh(n){Jt(n).p_()}async function Dh(n){const t=Jt(n);for(const e of n.O_)t.m_(e.mutations)}async function Oh(n,t,e){const s=n.O_.shift(),i=vs.from(s,t,e);await ba(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await dr(n)}async function Lh(n,t){t&&Jt(n).V_&&await async function(s,i){if(function(l){return Uc(l)&&l!==b.ABORTED}(i.code)){const o=s.O_.shift();Jt(s).s_(),await ba(s,()=>s.remoteSyncer.rejectFailedWrite(o.batchId,i)),await dr(s)}}(n,t),Ca(n)&&xa(n)}async function fo(n,t){const e=Q(n);e.asyncQueue.verifyOperationInProgress(),D("RemoteStore","RemoteStore received new credentials");const s=pn(e);e.L_.add(3),await fn(e),s&&e.q_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.L_.delete(3),await hr(e)}async function Mh(n,t){const e=Q(n);t?(e.L_.delete(2),await hr(e)):t||(e.L_.add(2),await fn(e),e.q_.set("Unknown"))}function Jt(n){return n.U_||(n.U_=function(e,s,i){const o=Q(e);return o.w_(),new Sh(s,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,i)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:Nh.bind(null,n),mo:Lh.bind(null,n),f_:Dh.bind(null,n),g_:Oh.bind(null,n)}),n.B_.push(async t=>{t?(n.U_.s_(),await dr(n)):(await n.U_.stop(),n.O_.length>0&&(D("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rs{constructor(t,e,s,i,o){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=s,this.op=i,this.removalCallback=o,this.deferred=new ae,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(l=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,s,i,o){const l=Date.now()+s,c=new Rs(t,e,l,i,o);return c.start(s),c}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new O(b.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Va(n,t){if(he("AsyncQueue",`${t}: ${n}`),or(n))return new O(b.UNAVAILABLE,`${t}: ${n}`);throw n}class Uh{constructor(){this.queries=po(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(e,s){const i=Q(e),o=i.queries;i.queries=po(),o.forEach((l,c)=>{for(const d of c.j_)d.onError(s)})})(this,new O(b.ABORTED,"Firestore shutting down"))}}function po(){return new be(n=>ha(n),ca)}function Fh(n){n.Y_.forEach(t=>{t.next()})}var mo,go;(go=mo||(mo={})).ea="default",go.Cache="cache";class jh{constructor(t,e,s,i,o,l){this.localStore=t,this.remoteStore=e,this.eventManager=s,this.sharedClientState=i,this.currentUser=o,this.maxConcurrentLimboResolutions=l,this.Ca={},this.Fa=new be(c=>ha(c),ca),this.Ma=new Map,this.xa=new Set,this.Oa=new At(L.comparator),this.Na=new Map,this.La=new ws,this.Ba={},this.ka=new Map,this.qa=Re.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function Bh(n,t,e){const s=Gh(n);try{const i=await function(l,c){const d=Q(l),f=at.now(),v=c.reduce((x,V)=>x.add(V.key),yt());let I,P;return d.persistence.runTransaction("Locally write mutations","readwrite",x=>{let V=Zn(),N=yt();return d.cs.getEntries(x,v).next(k=>{V=k,V.forEach((U,q)=>{q.isValidDocument()||(N=N.add(U))})}).next(()=>d.localDocuments.getOverlayedDocuments(x,V)).next(k=>{I=k;const U=[];for(const q of c){const B=Dc(q,I.get(q.key).overlayedDocument);B!=null&&U.push(new Zt(q.key,B,ra(B.value.mapValue),Lt.exists(!0)))}return d.mutationQueue.addMutationBatch(x,f,U,c)}).next(k=>{P=k;const U=k.applyToLocalDocumentSet(I,N);return d.documentOverlayCache.saveOverlays(x,k.batchId,U)})}).then(()=>({batchId:P.batchId,changes:fa(I)}))}(s.localStore,t);s.sharedClientState.addPendingMutation(i.batchId),function(l,c,d){let f=l.Ba[l.currentUser.toKey()];f||(f=new At(H)),f=f.insert(c,d),l.Ba[l.currentUser.toKey()]=f}(s,i.batchId,e),await fr(s,i.changes),await dr(s.remoteStore)}catch(i){const o=Va(i,"Failed to persist write");e.reject(o)}}function _o(n,t,e){const s=Q(n);if(s.isPrimaryClient&&e===0||!s.isPrimaryClient&&e===1){const i=[];s.Fa.forEach((o,l)=>{const c=l.view.Z_(t);c.snapshot&&i.push(c.snapshot)}),function(l,c){const d=Q(l);d.onlineState=c;let f=!1;d.queries.forEach((v,I)=>{for(const P of I.j_)P.Z_(c)&&(f=!0)}),f&&Fh(d)}(s.eventManager,t),i.length&&s.Ca.d_(i),s.onlineState=t,s.isPrimaryClient&&s.sharedClientState.setOnlineState(t)}}async function $h(n,t){const e=Q(n),s=t.batch.batchId;try{const i=await yh(e.localStore,t);Na(e,s,null),ka(e,s),e.sharedClientState.updateMutationState(s,"acknowledged"),await fr(e,i)}catch(i){await Zo(i)}}async function qh(n,t,e){const s=Q(n);try{const i=await function(l,c){const d=Q(l);return d.persistence.runTransaction("Reject batch","readwrite-primary",f=>{let v;return d.mutationQueue.lookupMutationBatch(f,c).next(I=>(et(I!==null),v=I.keys(),d.mutationQueue.removeMutationBatch(f,I))).next(()=>d.mutationQueue.performConsistencyCheck(f)).next(()=>d.documentOverlayCache.removeOverlaysForBatchId(f,v,c)).next(()=>d.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(f,v)).next(()=>d.localDocuments.getDocuments(f,v))})}(s.localStore,t);Na(s,t,e),ka(s,t),s.sharedClientState.updateMutationState(t,"rejected",e),await fr(s,i)}catch(i){await Zo(i)}}function ka(n,t){(n.ka.get(t)||[]).forEach(e=>{e.resolve()}),n.ka.delete(t)}function Na(n,t,e){const s=Q(n);let i=s.Ba[s.currentUser.toKey()];if(i){const o=i.get(t);o&&(e?o.reject(e):o.resolve(),i=i.remove(t)),s.Ba[s.currentUser.toKey()]=i}}async function fr(n,t,e){const s=Q(n),i=[],o=[],l=[];s.Fa.isEmpty()||(s.Fa.forEach((c,d)=>{l.push(s.Ka(d,t,e).then(f=>{var v;if((f||e)&&s.isPrimaryClient){const I=f?!f.fromCache:(v=void 0)===null||v===void 0?void 0:v.current;s.sharedClientState.updateQueryState(d.targetId,I?"current":"not-current")}if(f){i.push(f);const I=Is.Wi(d.targetId,f);o.push(I)}}))}),await Promise.all(l),s.Ca.d_(i),await async function(d,f){const v=Q(d);try{await v.persistence.runTransaction("notifyLocalViewChanges","readwrite",I=>S.forEach(f,P=>S.forEach(P.$i,x=>v.persistence.referenceDelegate.addReference(I,P.targetId,x)).next(()=>S.forEach(P.Ui,x=>v.persistence.referenceDelegate.removeReference(I,P.targetId,x)))))}catch(I){if(!or(I))throw I;D("LocalStore","Failed to update sequence numbers: "+I)}for(const I of f){const P=I.targetId;if(!I.fromCache){const x=v.os.get(P),V=x.snapshotVersion,N=x.withLastLimboFreeSnapshotVersion(V);v.os=v.os.insert(P,N)}}}(s.localStore,o))}async function zh(n,t){const e=Q(n);if(!e.currentUser.isEqual(t)){D("SyncEngine","User change. New user:",t.toKey());const s=await Ra(e.localStore,t);e.currentUser=t,function(o,l){o.ka.forEach(c=>{c.forEach(d=>{d.reject(new O(b.CANCELLED,l))})}),o.ka.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,s.removedBatchIds,s.addedBatchIds),await fr(e,s.hs)}}function Gh(n){const t=Q(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=$h.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=qh.bind(null,t),t}class nr{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(t){this.serializer=cr(t.databaseInfo.databaseId),this.sharedClientState=this.Wa(t),this.persistence=this.Ga(t),await this.persistence.start(),this.localStore=this.za(t),this.gcScheduler=this.ja(t,this.localStore),this.indexBackfillerScheduler=this.Ha(t,this.localStore)}ja(t,e){return null}Ha(t,e){return null}za(t){return _h(this.persistence,new mh,t.initialUser,this.serializer)}Ga(t){return new dh(As.Zr,this.serializer)}Wa(t){return new vh}async terminate(){var t,e;(t=this.gcScheduler)===null||t===void 0||t.stop(),(e=this.indexBackfillerScheduler)===null||e===void 0||e.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}nr.provider={build:()=>new nr};class us{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>_o(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=zh.bind(null,this.syncEngine),await Mh(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new Uh}()}createDatastore(t){const e=cr(t.databaseInfo.databaseId),s=function(o){return new Rh(o)}(t.databaseInfo);return function(o,l,c,d){return new bh(o,l,c,d)}(t.authCredentials,t.appCheckCredentials,s,e)}createRemoteStore(t){return function(s,i,o,l,c){return new xh(s,i,o,l,c)}(this.localStore,this.datastore,t.asyncQueue,e=>_o(this.syncEngine,e,0),function(){return ho.D()?new ho:new wh}())}createSyncEngine(t,e){return function(i,o,l,c,d,f,v){const I=new jh(i,o,l,c,d,f);return v&&(I.Qa=!0),I}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}async terminate(){var t,e;await async function(i){const o=Q(i);D("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await fn(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(t=this.datastore)===null||t===void 0||t.terminate(),(e=this.eventManager)===null||e===void 0||e.terminate()}}us.provider={build:()=>new us};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kh{constructor(t,e,s,i,o){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=s,this.databaseInfo=i,this.user=_t.UNAUTHENTICATED,this.clientId=Jo.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(s,async l=>{D("FirestoreClient","Received user=",l.uid),await this.authCredentialListener(l),this.user=l}),this.appCheckCredentials.start(s,l=>(D("FirestoreClient","Received new app check token=",l),this.appCheckCredentialListener(l,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}terminate(){this.asyncQueue.enterRestrictedMode();const t=new ae;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const s=Va(e,"Failed to shutdown persistence");t.reject(s)}}),t.promise}}async function Gr(n,t){n.asyncQueue.verifyOperationInProgress(),D("FirestoreClient","Initializing OfflineComponentProvider");const e=n.configuration;await t.initialize(e);let s=e.initialUser;n.setCredentialChangeListener(async i=>{s.isEqual(i)||(await Ra(t.localStore,i),s=i)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function yo(n,t){n.asyncQueue.verifyOperationInProgress();const e=await Hh(n);D("FirestoreClient","Initializing OnlineComponentProvider"),await t.initialize(e,n.configuration),n.setCredentialChangeListener(s=>fo(t.remoteStore,s)),n.setAppCheckTokenChangeListener((s,i)=>fo(t.remoteStore,i)),n._onlineComponents=t}async function Hh(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){D("FirestoreClient","Using user provided OfflineComponentProvider");try{await Gr(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!function(i){return i.name==="FirebaseError"?i.code===b.FAILED_PRECONDITION||i.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(e))throw e;Hn("Error using user provided cache. Falling back to memory cache: "+e),await Gr(n,new nr)}}else D("FirestoreClient","Using default OfflineComponentProvider"),await Gr(n,new nr);return n._offlineComponents}async function Qh(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(D("FirestoreClient","Using user provided OnlineComponentProvider"),await yo(n,n._uninitializedComponentsProvider._online)):(D("FirestoreClient","Using default OnlineComponentProvider"),await yo(n,new us))),n._onlineComponents}function Wh(n){return Qh(n).then(t=>t.syncEngine)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Da(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eo=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xh(n,t,e){if(!e)throw new O(b.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function Yh(n,t,e,s){if(t===!0&&s===!0)throw new O(b.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function To(n){if(!L.isDocumentKey(n))throw new O(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Ps(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(s){return s.constructor?s.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":M()}function un(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new O(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=Ps(n);throw new O(b.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{constructor(t){var e,s;if(t.host===void 0){if(t.ssl!==void 0)throw new O(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(e=t.ssl)===null||e===void 0||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new O(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}Yh("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Da((s=t.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new O(b.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(s,i){return s.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class Ss{constructor(t,e,s,i){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=s,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new vo({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new O(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(t){if(this._settingsFrozen)throw new O(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new vo(t),t.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new ju;switch(s.type){case"firstParty":return new zu(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new O(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const s=Eo.get(e);s&&(D("ComponentProvider","Removing Datastore"),Eo.delete(e),s.terminate())}(this),Promise.resolve()}}function Jh(n,t,e,s={}){var i;const o=(n=un(n,Ss))._getSettings(),l=`${t}:${e}`;if(o.host!=="firestore.googleapis.com"&&o.host!==l&&Hn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:l,ssl:!1})),s.mockUserToken){let c,d;if(typeof s.mockUserToken=="string")c=s.mockUserToken,d=_t.MOCK_USER;else{c=jo(s.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const f=s.mockUserToken.sub||s.mockUserToken.user_id;if(!f)throw new O(b.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");d=new _t(f)}n._authCredentials=new Bu(new Yo(c,d))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bs{constructor(t,e,s){this.converter=e,this._query=s,this.type="query",this.firestore=t}withConverter(t){return new bs(this.firestore,t,this._query)}}class Mt{constructor(t,e,s){this.converter=e,this._key=s,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new cn(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new Mt(this.firestore,t,this._key)}}class cn extends bs{constructor(t,e,s){super(t,e,yc(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new Mt(this.firestore,null,new L(t))}withConverter(t){return new cn(this.firestore,t,this._path)}}function Oa(n,t,...e){if(n=Nt(n),arguments.length===1&&(t=Jo.newId()),Xh("doc","path",t),n instanceof Ss){const s=rt.fromString(t,...e);return To(s),new Mt(n,null,new L(s))}{if(!(n instanceof Mt||n instanceof cn))throw new O(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(rt.fromString(t,...e));return To(s),new Mt(n.firestore,n instanceof cn?n.converter:null,new L(s))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo{constructor(t=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new Pa(this,"async_queue_retry"),this.Vu=()=>{const s=zr();s&&D("AsyncQueue","Visibility state changed to "+s.visibilityState),this.t_.jo()},this.mu=t;const e=zr();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.fu(),this.gu(t)}enterRestrictedMode(t){if(!this.Iu){this.Iu=!0,this.Au=t||!1;const e=zr();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.Vu)}}enqueue(t){if(this.fu(),this.Iu)return new Promise(()=>{});const e=new ae;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Pu.push(t),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(t){if(!or(t))throw t;D("AsyncQueue","Operation failed with retryable error: "+t)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(t){const e=this.mu.then(()=>(this.du=!0,t().catch(s=>{this.Eu=s,this.du=!1;const i=function(l){let c=l.message||"";return l.stack&&(c=l.stack.includes(l.message)?l.stack:l.message+`
`+l.stack),c}(s);throw he("INTERNAL UNHANDLED ERROR: ",i),s}).then(s=>(this.du=!1,s))));return this.mu=e,e}enqueueAfterDelay(t,e,s){this.fu(),this.Ru.indexOf(t)>-1&&(e=0);const i=Rs.createAndSchedule(this,t,e,s,o=>this.yu(o));return this.Tu.push(i),i}fu(){this.Eu&&M()}verifyOperationInProgress(){}async wu(){let t;do t=this.mu,await t;while(t!==this.mu)}Su(t){for(const e of this.Tu)if(e.timerId===t)return!0;return!1}bu(t){return this.wu().then(()=>{this.Tu.sort((e,s)=>e.targetTimeMs-s.targetTimeMs);for(const e of this.Tu)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.wu()})}Du(t){this.Ru.push(t)}yu(t){const e=this.Tu.indexOf(t);this.Tu.splice(e,1)}}class Cs extends Ss{constructor(t,e,s,i){super(t,e,s,i),this.type="firestore",this._queue=new wo,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const t=this._firestoreClient.terminate();this._queue=new wo(t),this._firestoreClient=void 0,await t}}}function Zh(n,t){const e=typeof n=="object"?n:Mo(),s=typeof n=="string"?n:"(default)",i=Uo(e,"firestore").getImmediate({identifier:s});if(!i._initialized){const o=Fo("firestore");o&&Jh(i,...o)}return i}function td(n){if(n._terminated)throw new O(b.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||ed(n),n._firestoreClient}function ed(n){var t,e,s;const i=n._freezeSettings(),o=function(c,d,f,v){return new sc(c,d,f,v.host,v.ssl,v.experimentalForceLongPolling,v.experimentalAutoDetectLongPolling,Da(v.experimentalLongPollingOptions),v.useFetchStreams)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,i);n._componentsProvider||!((e=i.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((s=i.localCache)===null||s===void 0)&&s._onlineComponentProvider)&&(n._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),n._firestoreClient=new Kh(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(c){const d=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(d),_online:d}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hn{constructor(t){this._byteString=t}static fromBase64String(t){try{return new hn(Ut.fromBase64String(t))}catch(e){throw new O(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new hn(Ut.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new O(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ht(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vs{constructor(t){this._methodName=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class La{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new O(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new O(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return H(this._lat,t._lat)||H(this._long,t._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ma{constructor(t){this._values=(t||[]).map(e=>e)}toArray(){return this._values.map(t=>t)}isEqual(t){return function(s,i){if(s.length!==i.length)return!1;for(let o=0;o<s.length;++o)if(s[o]!==i[o])return!1;return!0}(this._values,t._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nd=/^__.*__$/;class rd{constructor(t,e,s){this.data=t,this.fieldMask=e,this.fieldTransforms=s}toMutation(t,e){return this.fieldMask!==null?new Zt(t,this.data,this.fieldMask,e,this.fieldTransforms):new dn(t,this.data,e,this.fieldTransforms)}}class Ua{constructor(t,e,s){this.data=t,this.fieldMask=e,this.fieldTransforms=s}toMutation(t,e){return new Zt(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function Fa(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw M()}}class ks{constructor(t,e,s,i,o,l){this.settings=t,this.databaseId=e,this.serializer=s,this.ignoreUndefinedProperties=i,o===void 0&&this.vu(),this.fieldTransforms=o||[],this.fieldMask=l||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(t){return new ks(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(t){var e;const s=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.Fu({path:s,xu:!1});return i.Ou(t),i}Nu(t){var e;const s=(e=this.path)===null||e===void 0?void 0:e.child(t),i=this.Fu({path:s,xu:!1});return i.vu(),i}Lu(t){return this.Fu({path:void 0,xu:!0})}Bu(t){return rr(t,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}vu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Ou(this.path.get(t))}Ou(t){if(t.length===0)throw this.Bu("Document fields must not be empty");if(Fa(this.Cu)&&nd.test(t))throw this.Bu('Document fields cannot begin and end with "__"')}}class sd{constructor(t,e,s){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=s||cr(t)}Qu(t,e,s,i=!1){return new ks({Cu:t,methodName:e,qu:s,path:ht.emptyPath(),xu:!1,ku:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ja(n){const t=n._freezeSettings(),e=cr(n._databaseId);return new sd(n._databaseId,!!t.ignoreUndefinedProperties,e)}function id(n,t,e,s,i,o={}){const l=n.Qu(o.merge||o.mergeFields?2:0,t,e,i);Ns("Data must be an object, but it was:",l,s);const c=Ba(s,l);let d,f;if(o.merge)d=new St(l.fieldMask),f=l.fieldTransforms;else if(o.mergeFields){const v=[];for(const I of o.mergeFields){const P=cs(t,I,e);if(!l.contains(P))throw new O(b.INVALID_ARGUMENT,`Field '${P}' is specified in your field mask but missing from your input data.`);za(v,P)||v.push(P)}d=new St(v),f=l.fieldTransforms.filter(I=>d.covers(I.field))}else d=null,f=l.fieldTransforms;return new rd(new Pt(c),d,f)}class pr extends Vs{_toFieldTransform(t){if(t.Cu!==2)throw t.Cu===1?t.Bu(`${this._methodName}() can only appear at the top level of your update data`):t.Bu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof pr}}function od(n,t,e,s){const i=n.Qu(1,t,e);Ns("Data must be an object, but it was:",i,s);const o=[],l=Pt.empty();Se(s,(d,f)=>{const v=qa(t,d,e);f=Nt(f);const I=i.Nu(v);if(f instanceof pr)o.push(v);else{const P=mr(f,I);P!=null&&(o.push(v),l.set(v,P))}});const c=new St(o);return new Ua(l,c,i.fieldTransforms)}function ad(n,t,e,s,i,o){const l=n.Qu(1,t,e),c=[cs(t,s,e)],d=[i];if(o.length%2!=0)throw new O(b.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let P=0;P<o.length;P+=2)c.push(cs(t,o[P])),d.push(o[P+1]);const f=[],v=Pt.empty();for(let P=c.length-1;P>=0;--P)if(!za(f,c[P])){const x=c[P];let V=d[P];V=Nt(V);const N=l.Nu(x);if(V instanceof pr)f.push(x);else{const k=mr(V,N);k!=null&&(f.push(x),v.set(x,k))}}const I=new St(f);return new Ua(v,I,l.fieldTransforms)}function mr(n,t){if($a(n=Nt(n)))return Ns("Unsupported field value:",t,n),Ba(n,t);if(n instanceof Vs)return function(s,i){if(!Fa(i.Cu))throw i.Bu(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.Bu(`${s._methodName}() is not currently supported inside arrays`);const o=s._toFieldTransform(i);o&&i.fieldTransforms.push(o)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.xu&&t.Cu!==4)throw t.Bu("Nested arrays are not supported");return function(s,i){const o=[];let l=0;for(const c of s){let d=mr(c,i.Lu(l));d==null&&(d={nullValue:"NULL_VALUE"}),o.push(d),l++}return{arrayValue:{values:o}}}(n,t)}return function(s,i){if((s=Nt(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return bc(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const o=at.fromDate(s);return{timestampValue:os(i.serializer,o)}}if(s instanceof at){const o=new at(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:os(i.serializer,o)}}if(s instanceof La)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof hn)return{bytesValue:Bc(i.serializer,s._byteString)};if(s instanceof Mt){const o=i.databaseId,l=s.firestore._databaseId;if(!l.isEqual(o))throw i.Bu(`Document reference is for database ${l.projectId}/${l.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:Aa(s.firestore._databaseId||i.databaseId,s._key.path)}}if(s instanceof Ma)return function(l,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:l.toArray().map(d=>{if(typeof d!="number")throw c.Bu("VectorValues must only contain numeric values.");return Ts(c.serializer,d)})}}}}}}(s,i);throw i.Bu(`Unsupported field value: ${Ps(s)}`)}(n,t)}function Ba(n,t){const e={};return ea(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):Se(n,(s,i)=>{const o=mr(i,t.Mu(s));o!=null&&(e[s]=o)}),{mapValue:{fields:e}}}function $a(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof at||n instanceof La||n instanceof hn||n instanceof Mt||n instanceof Vs||n instanceof Ma)}function Ns(n,t,e){if(!$a(e)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(e)){const s=Ps(e);throw s==="an object"?t.Bu(n+" a custom object"):t.Bu(n+" "+s)}}function cs(n,t,e){if((t=Nt(t))instanceof xs)return t._internalPath;if(typeof t=="string")return qa(n,t);throw rr("Field path arguments must be of type string or ",n,!1,void 0,e)}const ld=new RegExp("[~\\*/\\[\\]]");function qa(n,t,e){if(t.search(ld)>=0)throw rr(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new xs(...t.split("."))._internalPath}catch{throw rr(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function rr(n,t,e,s,i){const o=s&&!s.isEmpty(),l=i!==void 0;let c=`Function ${t}() called with invalid data`;e&&(c+=" (via `toFirestore()`)"),c+=". ";let d="";return(o||l)&&(d+=" (found",o&&(d+=` in field ${s}`),l&&(d+=` in document ${i}`),d+=")"),new O(b.INVALID_ARGUMENT,c+n+d)}function za(n,t){return n.some(e=>e.isEqual(t))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ud(n,t,e){let s;return s=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,s}function cd(n,t,e){n=un(n,Mt);const s=un(n.firestore,Cs),i=ud(n.converter,t,e);return Ga(s,[id(ja(s),"setDoc",n._key,i,n.converter!==null,e).toMutation(n._key,Lt.none())])}function hd(n,t,e,...s){n=un(n,Mt);const i=un(n.firestore,Cs),o=ja(i);let l;return l=typeof(t=Nt(t))=="string"||t instanceof xs?ad(o,"updateDoc",n._key,t,e,s):od(o,"updateDoc",n._key,t),Ga(i,[l.toMutation(n._key,Lt.exists(!0))])}function Ga(n,t){return function(s,i){const o=new ae;return s.asyncQueue.enqueueAndForget(async()=>Bh(await Wh(s),i,o)),o.promise}(td(n),t)}(function(t,e=!0){(function(i){Pe=i})(Bo),Do(new Oo("firestore",(s,{instanceIdentifier:i,options:o})=>{const l=s.getProvider("app").getImmediate(),c=new Cs(new $u(s.getProvider("auth-internal")),new Ku(s.getProvider("app-check-internal")),function(f,v){if(!Object.prototype.hasOwnProperty.apply(f.options,["projectId"]))throw new O(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Xn(f.options.projectId,v)}(l,i),l);return o=Object.assign({useFetchStreams:e},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),Gn(Xi,"4.7.3",t),Gn(Xi,"4.7.3","esm2017")})();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ka="firebasestorage.googleapis.com",Ha="storageBucket",dd=2*60*1e3,fd=10*60*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tt extends Lo{constructor(t,e,s=0){super(Kr(t),`Firebase Storage: ${e} (${Kr(t)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,tt.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return Kr(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var Z;(function(n){n.UNKNOWN="unknown",n.OBJECT_NOT_FOUND="object-not-found",n.BUCKET_NOT_FOUND="bucket-not-found",n.PROJECT_NOT_FOUND="project-not-found",n.QUOTA_EXCEEDED="quota-exceeded",n.UNAUTHENTICATED="unauthenticated",n.UNAUTHORIZED="unauthorized",n.UNAUTHORIZED_APP="unauthorized-app",n.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",n.INVALID_CHECKSUM="invalid-checksum",n.CANCELED="canceled",n.INVALID_EVENT_NAME="invalid-event-name",n.INVALID_URL="invalid-url",n.INVALID_DEFAULT_BUCKET="invalid-default-bucket",n.NO_DEFAULT_BUCKET="no-default-bucket",n.CANNOT_SLICE_BLOB="cannot-slice-blob",n.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",n.NO_DOWNLOAD_URL="no-download-url",n.INVALID_ARGUMENT="invalid-argument",n.INVALID_ARGUMENT_COUNT="invalid-argument-count",n.APP_DELETED="app-deleted",n.INVALID_ROOT_OPERATION="invalid-root-operation",n.INVALID_FORMAT="invalid-format",n.INTERNAL_ERROR="internal-error",n.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(Z||(Z={}));function Kr(n){return"storage/"+n}function Ds(){const n="An unknown error occurred, please check the error payload for server response.";return new tt(Z.UNKNOWN,n)}function pd(n){return new tt(Z.OBJECT_NOT_FOUND,"Object '"+n+"' does not exist.")}function md(n){return new tt(Z.QUOTA_EXCEEDED,"Quota for bucket '"+n+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function gd(){const n="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new tt(Z.UNAUTHENTICATED,n)}function _d(){return new tt(Z.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function yd(n){return new tt(Z.UNAUTHORIZED,"User does not have permission to access '"+n+"'.")}function Ed(){return new tt(Z.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Td(){return new tt(Z.CANCELED,"User canceled the upload/download.")}function vd(n){return new tt(Z.INVALID_URL,"Invalid URL '"+n+"'.")}function wd(n){return new tt(Z.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+n+"'.")}function Ad(){return new tt(Z.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+Ha+"' property when initializing the app?")}function Id(){return new tt(Z.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function Rd(){return new tt(Z.NO_DOWNLOAD_URL,"The given file does not have any download URLs.")}function Pd(n){return new tt(Z.UNSUPPORTED_ENVIRONMENT,`${n} is missing. Make sure to install the required polyfills. See https://firebase.google.com/docs/web/environments-js-sdk#polyfills for more information.`)}function hs(n){return new tt(Z.INVALID_ARGUMENT,n)}function Qa(){return new tt(Z.APP_DELETED,"The Firebase app was deleted.")}function Sd(n){return new tt(Z.INVALID_ROOT_OPERATION,"The operation '"+n+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function nn(n,t){return new tt(Z.INVALID_FORMAT,"String does not match format '"+n+"': "+t)}function We(n){throw new tt(Z.INTERNAL_ERROR,"Internal error: "+n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(t,e){this.bucket=t,this.path_=e}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,e){let s;try{s=bt.makeFromUrl(t,e)}catch{return new bt(t,"")}if(s.path==="")return s;throw wd(t)}static makeFromUrl(t,e){let s=null;const i="([A-Za-z0-9.\\-_]+)";function o(z){z.path.charAt(z.path.length-1)==="/"&&(z.path_=z.path_.slice(0,-1))}const l="(/(.*))?$",c=new RegExp("^gs://"+i+l,"i"),d={bucket:1,path:3};function f(z){z.path_=decodeURIComponent(z.path)}const v="v[A-Za-z0-9_]+",I=e.replace(/[.]/g,"\\."),P="(/([^?#]*).*)?$",x=new RegExp(`^https?://${I}/${v}/b/${i}/o${P}`,"i"),V={bucket:1,path:3},N=e===Ka?"(?:storage.googleapis.com|storage.cloud.google.com)":e,k="([^?#]*)",U=new RegExp(`^https?://${N}/${i}/${k}`,"i"),B=[{regex:c,indices:d,postModify:o},{regex:x,indices:V,postModify:f},{regex:U,indices:{bucket:1,path:2},postModify:f}];for(let z=0;z<B.length;z++){const xt=B[z],st=xt.regex.exec(t);if(st){const E=st[xt.indices.bucket];let p=st[xt.indices.path];p||(p=""),s=new bt(E,p),xt.postModify(s);break}}if(s==null)throw vd(t);return s}}class bd{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cd(n,t,e){let s=1,i=null,o=null,l=!1,c=0;function d(){return c===2}let f=!1;function v(...k){f||(f=!0,t.apply(null,k))}function I(k){i=setTimeout(()=>{i=null,n(x,d())},k)}function P(){o&&clearTimeout(o)}function x(k,...U){if(f){P();return}if(k){P(),v.call(null,k,...U);return}if(d()||l){P(),v.call(null,k,...U);return}s<64&&(s*=2);let B;c===1?(c=2,B=0):B=(s+Math.random())*1e3,I(B)}let V=!1;function N(k){V||(V=!0,P(),!f&&(i!==null?(k||(c=2),clearTimeout(i),I(0)):k||(c=1)))}return I(0),o=setTimeout(()=>{l=!0,N(!0)},e),N}function xd(n){n(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vd(n){return n!==void 0}function kd(n){return typeof n=="object"&&!Array.isArray(n)}function Os(n){return typeof n=="string"||n instanceof String}function Ao(n){return Ls()&&n instanceof Blob}function Ls(){return typeof Blob<"u"}function Io(n,t,e,s){if(s<t)throw hs(`Invalid value for '${n}'. Expected ${t} or greater.`);if(s>e)throw hs(`Invalid value for '${n}'. Expected ${e} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ms(n,t,e){let s=t;return e==null&&(s=`https://${t}`),`${e}://${s}/v0${n}`}function Wa(n){const t=encodeURIComponent;let e="?";for(const s in n)if(n.hasOwnProperty(s)){const i=t(s)+"="+t(n[s]);e=e+i+"&"}return e=e.slice(0,-1),e}var ue;(function(n){n[n.NO_ERROR=0]="NO_ERROR",n[n.NETWORK_ERROR=1]="NETWORK_ERROR",n[n.ABORT=2]="ABORT"})(ue||(ue={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nd(n,t){const e=n>=500&&n<600,i=[408,429].indexOf(n)!==-1,o=t.indexOf(n)!==-1;return e||i||o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dd{constructor(t,e,s,i,o,l,c,d,f,v,I,P=!0){this.url_=t,this.method_=e,this.headers_=s,this.body_=i,this.successCodes_=o,this.additionalRetryCodes_=l,this.callback_=c,this.errorCallback_=d,this.timeout_=f,this.progressCallback_=v,this.connectionFactory_=I,this.retry=P,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((x,V)=>{this.resolve_=x,this.reject_=V,this.start_()})}start_(){const t=(s,i)=>{if(i){s(!1,new jn(!1,null,!0));return}const o=this.connectionFactory_();this.pendingConnection_=o;const l=c=>{const d=c.loaded,f=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(d,f)};this.progressCallback_!==null&&o.addUploadProgressListener(l),o.send(this.url_,this.method_,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&o.removeUploadProgressListener(l),this.pendingConnection_=null;const c=o.getErrorCode()===ue.NO_ERROR,d=o.getStatus();if(!c||Nd(d,this.additionalRetryCodes_)&&this.retry){const v=o.getErrorCode()===ue.ABORT;s(!1,new jn(!1,null,v));return}const f=this.successCodes_.indexOf(d)!==-1;s(!0,new jn(f,o))})},e=(s,i)=>{const o=this.resolve_,l=this.reject_,c=i.connection;if(i.wasSuccessCode)try{const d=this.callback_(c,c.getResponse());Vd(d)?o(d):o()}catch(d){l(d)}else if(c!==null){const d=Ds();d.serverResponse=c.getErrorText(),this.errorCallback_?l(this.errorCallback_(c,d)):l(d)}else if(i.canceled){const d=this.appDelete_?Qa():Td();l(d)}else{const d=Ed();l(d)}};this.canceled_?e(!1,new jn(!1,null,!0)):this.backoffId_=Cd(t,e,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&xd(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class jn{constructor(t,e,s){this.wasSuccessCode=t,this.connection=e,this.canceled=!!s}}function Od(n,t){t!==null&&t.length>0&&(n.Authorization="Firebase "+t)}function Ld(n,t){n["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function Md(n,t){t&&(n["X-Firebase-GMPID"]=t)}function Ud(n,t){t!==null&&(n["X-Firebase-AppCheck"]=t)}function Fd(n,t,e,s,i,o,l=!0){const c=Wa(n.urlParams),d=n.url+c,f=Object.assign({},n.headers);return Md(f,t),Od(f,e),Ld(f,o),Ud(f,s),new Dd(d,n.method,f,n.body,n.successCodes,n.additionalRetryCodes,n.handler,n.errorHandler,n.timeout,n.progressCallback,i,l)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jd(){return typeof BlobBuilder<"u"?BlobBuilder:typeof WebKitBlobBuilder<"u"?WebKitBlobBuilder:void 0}function Bd(...n){const t=jd();if(t!==void 0){const e=new t;for(let s=0;s<n.length;s++)e.append(n[s]);return e.getBlob()}else{if(Ls())return new Blob(n);throw new tt(Z.UNSUPPORTED_ENVIRONMENT,"This browser doesn't seem to support creating Blobs")}}function $d(n,t,e){return n.webkitSlice?n.webkitSlice(t,e):n.mozSlice?n.mozSlice(t,e):n.slice?n.slice(t,e):null}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qd(n){if(typeof atob>"u")throw Pd("base-64");return atob(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ot={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};class Hr{constructor(t,e){this.data=t,this.contentType=e||null}}function zd(n,t){switch(n){case Ot.RAW:return new Hr(Xa(t));case Ot.BASE64:case Ot.BASE64URL:return new Hr(Ya(n,t));case Ot.DATA_URL:return new Hr(Kd(t),Hd(t))}throw Ds()}function Xa(n){const t=[];for(let e=0;e<n.length;e++){let s=n.charCodeAt(e);if(s<=127)t.push(s);else if(s<=2047)t.push(192|s>>6,128|s&63);else if((s&64512)===55296)if(!(e<n.length-1&&(n.charCodeAt(e+1)&64512)===56320))t.push(239,191,189);else{const o=s,l=n.charCodeAt(++e);s=65536|(o&1023)<<10|l&1023,t.push(240|s>>18,128|s>>12&63,128|s>>6&63,128|s&63)}else(s&64512)===56320?t.push(239,191,189):t.push(224|s>>12,128|s>>6&63,128|s&63)}return new Uint8Array(t)}function Gd(n){let t;try{t=decodeURIComponent(n)}catch{throw nn(Ot.DATA_URL,"Malformed data URL.")}return Xa(t)}function Ya(n,t){switch(n){case Ot.BASE64:{const i=t.indexOf("-")!==-1,o=t.indexOf("_")!==-1;if(i||o)throw nn(n,"Invalid character '"+(i?"-":"_")+"' found: is it base64url encoded?");break}case Ot.BASE64URL:{const i=t.indexOf("+")!==-1,o=t.indexOf("/")!==-1;if(i||o)throw nn(n,"Invalid character '"+(i?"+":"/")+"' found: is it base64 encoded?");t=t.replace(/-/g,"+").replace(/_/g,"/");break}}let e;try{e=qd(t)}catch(i){throw i.message.includes("polyfill")?i:nn(n,"Invalid character found")}const s=new Uint8Array(e.length);for(let i=0;i<e.length;i++)s[i]=e.charCodeAt(i);return s}class Ja{constructor(t){this.base64=!1,this.contentType=null;const e=t.match(/^data:([^,]+)?,/);if(e===null)throw nn(Ot.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");const s=e[1]||null;s!=null&&(this.base64=Qd(s,";base64"),this.contentType=this.base64?s.substring(0,s.length-7):s),this.rest=t.substring(t.indexOf(",")+1)}}function Kd(n){const t=new Ja(n);return t.base64?Ya(Ot.BASE64,t.rest):Gd(t.rest)}function Hd(n){return new Ja(n).contentType}function Qd(n,t){return n.length>=t.length?n.substring(n.length-t.length)===t:!1}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wt{constructor(t,e){let s=0,i="";Ao(t)?(this.data_=t,s=t.size,i=t.type):t instanceof ArrayBuffer?(e?this.data_=new Uint8Array(t):(this.data_=new Uint8Array(t.byteLength),this.data_.set(new Uint8Array(t))),s=this.data_.length):t instanceof Uint8Array&&(e?this.data_=t:(this.data_=new Uint8Array(t.length),this.data_.set(t)),s=t.length),this.size_=s,this.type_=i}size(){return this.size_}type(){return this.type_}slice(t,e){if(Ao(this.data_)){const s=this.data_,i=$d(s,t,e);return i===null?null:new Wt(i)}else{const s=new Uint8Array(this.data_.buffer,t,e-t);return new Wt(s,!0)}}static getBlob(...t){if(Ls()){const e=t.map(s=>s instanceof Wt?s.data_:s);return new Wt(Bd.apply(null,e))}else{const e=t.map(l=>Os(l)?zd(Ot.RAW,l).data:l.data_);let s=0;e.forEach(l=>{s+=l.byteLength});const i=new Uint8Array(s);let o=0;return e.forEach(l=>{for(let c=0;c<l.length;c++)i[o++]=l[c]}),new Wt(i,!0)}}uploadData(){return this.data_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Za(n){let t;try{t=JSON.parse(n)}catch{return null}return kd(t)?t:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wd(n){if(n.length===0)return null;const t=n.lastIndexOf("/");return t===-1?"":n.slice(0,t)}function Xd(n,t){const e=t.split("/").filter(s=>s.length>0).join("/");return n.length===0?e:n+"/"+e}function tl(n){const t=n.lastIndexOf("/",n.length-2);return t===-1?n:n.slice(t+1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yd(n,t){return t}class wt{constructor(t,e,s,i){this.server=t,this.local=e||t,this.writable=!!s,this.xform=i||Yd}}let Bn=null;function Jd(n){return!Os(n)||n.length<2?n:tl(n)}function el(){if(Bn)return Bn;const n=[];n.push(new wt("bucket")),n.push(new wt("generation")),n.push(new wt("metageneration")),n.push(new wt("name","fullPath",!0));function t(o,l){return Jd(l)}const e=new wt("name");e.xform=t,n.push(e);function s(o,l){return l!==void 0?Number(l):l}const i=new wt("size");return i.xform=s,n.push(i),n.push(new wt("timeCreated")),n.push(new wt("updated")),n.push(new wt("md5Hash",null,!0)),n.push(new wt("cacheControl",null,!0)),n.push(new wt("contentDisposition",null,!0)),n.push(new wt("contentEncoding",null,!0)),n.push(new wt("contentLanguage",null,!0)),n.push(new wt("contentType",null,!0)),n.push(new wt("metadata","customMetadata",!0)),Bn=n,Bn}function Zd(n,t){function e(){const s=n.bucket,i=n.fullPath,o=new bt(s,i);return t._makeStorageReference(o)}Object.defineProperty(n,"ref",{get:e})}function tf(n,t,e){const s={};s.type="file";const i=e.length;for(let o=0;o<i;o++){const l=e[o];s[l.local]=l.xform(s,t[l.server])}return Zd(s,n),s}function nl(n,t,e){const s=Za(t);return s===null?null:tf(n,s,e)}function ef(n,t,e,s){const i=Za(t);if(i===null||!Os(i.downloadTokens))return null;const o=i.downloadTokens;if(o.length===0)return null;const l=encodeURIComponent;return o.split(",").map(f=>{const v=n.bucket,I=n.fullPath,P="/b/"+l(v)+"/o/"+l(I),x=Ms(P,e,s),V=Wa({alt:"media",token:f});return x+V})[0]}function nf(n,t){const e={},s=t.length;for(let i=0;i<s;i++){const o=t[i];o.writable&&(e[o.server]=n[o.local])}return JSON.stringify(e)}class rl{constructor(t,e,s,i){this.url=t,this.method=e,this.handler=s,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sl(n){if(!n)throw Ds()}function rf(n,t){function e(s,i){const o=nl(n,i,t);return sl(o!==null),o}return e}function sf(n,t){function e(s,i){const o=nl(n,i,t);return sl(o!==null),ef(o,i,n.host,n._protocol)}return e}function il(n){function t(e,s){let i;return e.getStatus()===401?e.getErrorText().includes("Firebase App Check token is invalid")?i=_d():i=gd():e.getStatus()===402?i=md(n.bucket):e.getStatus()===403?i=yd(n.path):i=s,i.status=e.getStatus(),i.serverResponse=s.serverResponse,i}return t}function of(n){const t=il(n);function e(s,i){let o=t(s,i);return s.getStatus()===404&&(o=pd(n.path)),o.serverResponse=i.serverResponse,o}return e}function af(n,t,e){const s=t.fullServerUrl(),i=Ms(s,n.host,n._protocol),o="GET",l=n.maxOperationRetryTime,c=new rl(i,o,sf(n,e),l);return c.errorHandler=of(t),c}function lf(n,t){return n&&n.contentType||t&&t.type()||"application/octet-stream"}function uf(n,t,e){const s=Object.assign({},e);return s.fullPath=n.path,s.size=t.size(),s.contentType||(s.contentType=lf(null,t)),s}function cf(n,t,e,s,i){const o=t.bucketOnlyServerUrl(),l={"X-Goog-Upload-Protocol":"multipart"};function c(){let B="";for(let z=0;z<2;z++)B=B+Math.random().toString().slice(2);return B}const d=c();l["Content-Type"]="multipart/related; boundary="+d;const f=uf(t,s,i),v=nf(f,e),I="--"+d+`\r
Content-Type: application/json; charset=utf-8\r
\r
`+v+`\r
--`+d+`\r
Content-Type: `+f.contentType+`\r
\r
`,P=`\r
--`+d+"--",x=Wt.getBlob(I,s,P);if(x===null)throw Id();const V={name:f.fullPath},N=Ms(o,n.host,n._protocol),k="POST",U=n.maxUploadRetryTime,q=new rl(N,k,rf(n,e),U);return q.urlParams=V,q.headers=l,q.body=x.uploadData(),q.errorHandler=il(t),q}class hf{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=ue.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=ue.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=ue.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,e,s,i){if(this.sent_)throw We("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(e,t,!0),i!==void 0)for(const o in i)i.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,i[o].toString());return s!==void 0?this.xhr_.send(s):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw We("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw We("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw We("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw We("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class df extends hf{initXhr(){this.xhr_.responseType="text"}}function ol(){return new df}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(t,e){this._service=t,e instanceof bt?this._location=e:this._location=bt.makeFromUrl(e,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,e){return new fe(t,e)}get root(){const t=new bt(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return tl(this._location.path)}get storage(){return this._service}get parent(){const t=Wd(this._location.path);if(t===null)return null;const e=new bt(this._location.bucket,t);return new fe(this._service,e)}_throwIfRoot(t){if(this._location.path==="")throw Sd(t)}}function ff(n,t,e){n._throwIfRoot("uploadBytes");const s=cf(n.storage,n._location,el(),new Wt(t,!0),e);return n.storage.makeRequestWithTokens(s,ol).then(i=>({metadata:i,ref:n}))}function pf(n){n._throwIfRoot("getDownloadURL");const t=af(n.storage,n._location,el());return n.storage.makeRequestWithTokens(t,ol).then(e=>{if(e===null)throw Rd();return e})}function mf(n,t){const e=Xd(n._location.path,t),s=new bt(n._location.bucket,e);return new fe(n.storage,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gf(n){return/^[A-Za-z]+:\/\//.test(n)}function _f(n,t){return new fe(n,t)}function al(n,t){if(n instanceof Us){const e=n;if(e._bucket==null)throw Ad();const s=new fe(e,e._bucket);return t!=null?al(s,t):s}else return t!==void 0?mf(n,t):n}function yf(n,t){if(t&&gf(t)){if(n instanceof Us)return _f(n,t);throw hs("To use ref(service, url), the first argument must be a Storage instance.")}else return al(n,t)}function Ro(n,t){const e=t==null?void 0:t[Ha];return e==null?null:bt.makeFromBucketSpec(e,n)}function Ef(n,t,e,s={}){n.host=`${t}:${e}`,n._protocol="http";const{mockUserToken:i}=s;i&&(n._overrideAuthToken=typeof i=="string"?i:jo(i,n.app.options.projectId))}class Us{constructor(t,e,s,i,o){this.app=t,this._authProvider=e,this._appCheckProvider=s,this._url=i,this._firebaseVersion=o,this._bucket=null,this._host=Ka,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=dd,this._maxUploadRetryTime=fd,this._requests=new Set,i!=null?this._bucket=bt.makeFromBucketSpec(i,this._host):this._bucket=Ro(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=bt.makeFromBucketSpec(this._url,t):this._bucket=Ro(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){Io("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){Io("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const e=await t.getToken();if(e!==null)return e.accessToken}return null}async _getAppCheckToken(){const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new fe(this,t)}_makeRequest(t,e,s,i,o=!0){if(this._deleted)return new bd(Qa());{const l=Fd(t,this._appId,s,i,e,this._firebaseVersion,o);return this._requests.add(l),l.getPromise().then(()=>this._requests.delete(l),()=>this._requests.delete(l)),l}}async makeRequestWithTokens(t,e){const[s,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,e,s,i).getPromise()}}const Po="@firebase/storage",So="0.13.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ll="storage";function Tf(n,t,e){return n=Nt(n),ff(n,t,e)}function vf(n){return n=Nt(n),pf(n)}function wf(n,t){return n=Nt(n),yf(n,t)}function Af(n=Mo(),t){n=Nt(n);const s=Uo(n,ll).getImmediate({identifier:t}),i=Fo("storage");return i&&If(s,...i),s}function If(n,t,e,s={}){Ef(n,t,e,s)}function Rf(n,{instanceIdentifier:t}){const e=n.getProvider("app").getImmediate(),s=n.getProvider("auth-internal"),i=n.getProvider("app-check-internal");return new Us(e,s,i,t,Bo)}function Pf(){Do(new Oo(ll,Rf,"PUBLIC").setMultipleInstances(!0)),Gn(Po,So,""),Gn(Po,So,"esm2017")}Pf();const Sf={apiKey:"AIzaSyB2Yna1vgl-NQXibWZ62asifmBVFc7bJK0",authDomain:"tripplanner-aa906.firebaseapp.com",projectId:"tripplanner-aa906",storageBucket:"tripplanner-aa906.firebasestorage.app",messagingSenderId:"670791968416",appId:"1:670791968416:web:d4ccb842756b4098e4cbc5"},Fs=pu(Sf),Ce=mu(Fs),ul=Zh(Fs),bf=Af(Fs),js=new gu;js.addScope("profile");js.addScope("email");const hp=async(n,t)=>{try{return{success:!0,user:(await yu(Ce,n,t)).user}}catch(e){return{success:!1,error:Bs(e.code)}}},dp=async(n,t,e)=>{try{const s=await Eu(Ce,n,t);return e&&await $o(s.user,{displayName:e}),{success:!0,user:s.user}}catch(s){return{success:!1,error:Bs(s.code)}}},fp=async()=>{var n;try{const t=await _u(Ce,js);return{success:!0,user:t.user,isNewUser:(n=t._tokenResponse)==null?void 0:n.isNewUser}}catch(t){return{success:!1,error:Bs(t.code)}}},Cf=async()=>{try{return await Tu(Ce),{success:!0}}catch(n){return{success:!1,error:n.message}}},pp=async(n,t)=>{try{const e=Oa(ul,"users",n);return await cd(e,{...t,updatedAt:new Date().toISOString()},{merge:!0}),{success:!0}}catch(e){return{success:!1,error:e.message}}},mp=async(n,t)=>{try{const e=wf(bf,`profiles/${n}/avatar`);await Tf(e,t);const s=await vf(e),i=Oa(ul,"users",n);return await hd(i,{profileImage:s}),await $o(Ce.currentUser,{photoURL:s}),{success:!0,url:s}}catch(e){return{success:!1,error:e.message}}};function Bs(n){return{"auth/email-already-in-use":"An account with this email already exists.","auth/invalid-email":"Please enter a valid email address.","auth/operation-not-allowed":"This sign-in method is not enabled.","auth/weak-password":"Password should be at least 6 characters.","auth/user-disabled":"This account has been disabled.","auth/user-not-found":"No account found with this email.","auth/wrong-password":"Incorrect password. Please try again.","auth/too-many-requests":"Too many attempts. Please try again later.","auth/popup-closed-by-user":"Sign-in was cancelled.","auth/network-request-failed":"Network error. Please check your connection.","auth/invalid-credential":"Invalid credentials. Please try again."}[n]||"An unexpected error occurred. Please try again."}const xf="/api",X=Ql.create({baseURL:xf,headers:{"Content-Type":"application/json"}});X.interceptors.request.use(n=>{const t=localStorage.getItem("authToken");return t&&(n.headers.Authorization=`Bearer ${t}`),n},n=>Promise.reject(n));X.interceptors.response.use(n=>n,n=>{var t;return console.error("API Error:",((t=n.response)==null?void 0:t.data)||n.message),Promise.reject(n)});const gp={generate:async n=>(await X.post("/generate-itinerary",n)).data,replan:async n=>(await X.post("/replan",n)).data,getSafetyInfo:async n=>(await X.get(`/safety-info/${encodeURIComponent(n)}`)).data,getCulturalTips:async n=>(await X.get(`/cultural-tips/${encodeURIComponent(n)}`)).data},_p={save:async n=>(await X.post("/save-plan",n)).data,get:async n=>(await X.get(`/get-plan/${n}`)).data,getUserPlans:async n=>(await X.get(`/user-plans/${n}`)).data,delete:async n=>(await X.delete(`/delete-plan/${n}`)).data},yp={create:async n=>(await X.post("/notes",n)).data,getByTrip:async n=>(await X.get(`/notes/${n}`)).data,delete:async n=>(await X.delete(`/notes/${n}`)).data},Ep={getByCity:async(n,t=20)=>(await X.get(`/hidden-gems/${encodeURIComponent(n)}?limit=${t}`)).data,submit:async n=>(await X.post("/hidden-gems",n)).data,getCategories:async()=>(await X.get("/hidden-gems/categories")).data,getFeatured:async()=>(await X.get("/hidden-gems/featured")).data},Tp={send:async n=>(await X.post("/chat",n)).data,quickAction:async(n,t)=>(await X.post(`/chat/quick-action?action=${n}&trip_id=${t}`)).data,getSuggestions:async()=>(await X.get("/chat/suggestions")).data},vp={get:async n=>(await X.get(`/meta/${n}`)).data},Vf={getProfile:async n=>(await X.get(`/user/profile/${n}`)).data,updateProfile:async(n,t)=>(await X.put(`/user/profile/${n}`,t)).data},wp={triggerSOS:async n=>(await X.post("/emergency/trigger-sos",n)).data},kf={user:null,isAuthenticated:!1,currentTrip:null,savedTrips:[],notes:[],guardianDetails:null,isOnline:!0,isLoading:!1,error:null},j={SET_USER:"SET_USER",LOGOUT:"LOGOUT",SET_CURRENT_TRIP:"SET_CURRENT_TRIP",SET_SAVED_TRIPS:"SET_SAVED_TRIPS",ADD_TRIP:"ADD_TRIP",UPDATE_TRIP:"UPDATE_TRIP",DELETE_TRIP:"DELETE_TRIP",SET_NOTES:"SET_NOTES",ADD_NOTE:"ADD_NOTE",DELETE_NOTE:"DELETE_NOTE",SET_ONLINE_STATUS:"SET_ONLINE_STATUS",SET_LOADING:"SET_LOADING",SET_ERROR:"SET_ERROR",CLEAR_ERROR:"CLEAR_ERROR",SET_GUARDIAN:"SET_GUARDIAN"};function Nf(n,t){var e,s;switch(t.type){case j.SET_USER:return{...n,user:t.payload,isAuthenticated:!!t.payload};case j.LOGOUT:return{...n,user:null,isAuthenticated:!1,currentTrip:null,savedTrips:[],notes:[],guardianDetails:null};case j.SET_CURRENT_TRIP:return{...n,currentTrip:t.payload};case j.SET_SAVED_TRIPS:return{...n,savedTrips:t.payload};case j.ADD_TRIP:return{...n,savedTrips:[...n.savedTrips,t.payload]};case j.UPDATE_TRIP:return{...n,savedTrips:n.savedTrips.map(i=>i.trip_id===t.payload.trip_id?t.payload:i),currentTrip:((e=n.currentTrip)==null?void 0:e.trip_id)===t.payload.trip_id?t.payload:n.currentTrip};case j.DELETE_TRIP:return{...n,savedTrips:n.savedTrips.filter(i=>i.trip_id!==t.payload),currentTrip:((s=n.currentTrip)==null?void 0:s.trip_id)===t.payload?null:n.currentTrip};case j.SET_NOTES:return{...n,notes:t.payload};case j.ADD_NOTE:return{...n,notes:[...n.notes,t.payload]};case j.DELETE_NOTE:return{...n,notes:n.notes.filter(i=>i.id!==t.payload)};case j.SET_ONLINE_STATUS:return{...n,isOnline:t.payload};case j.SET_LOADING:return{...n,isLoading:t.payload};case j.SET_ERROR:return{...n,error:t.payload,isLoading:!1};case j.CLEAR_ERROR:return{...n,error:null};case j.SET_GUARDIAN:return{...n,guardianDetails:t.payload};default:return n}}const cl=G.createContext(null);function Df({children:n}){const[t,e]=G.useReducer(Nf,kf);G.useEffect(()=>{const i=vu(Ce,async o=>{if(o){e({type:j.SET_USER,payload:{uid:o.uid,email:o.email,displayName:o.displayName}});try{const l=await Vf.getProfile(o.uid);e({type:j.SET_GUARDIAN,payload:l})}catch(l){console.error("Failed to fetch guardian details:",l)}}else e({type:j.SET_USER,payload:null})});return()=>i()},[]),G.useEffect(()=>{const i=Fu(()=>e({type:j.SET_ONLINE_STATUS,payload:!0}),()=>e({type:j.SET_ONLINE_STATUS,payload:!1}));return e({type:j.SET_ONLINE_STATUS,payload:Uu()}),i},[]),G.useEffect(()=>{(async()=>{try{const o=await Dn.getAll();e({type:j.SET_SAVED_TRIPS,payload:o})}catch(o){console.error("Error loading offline trips:",o)}})()},[]);const s={setCurrentTrip:i=>{e({type:j.SET_CURRENT_TRIP,payload:i})},saveTrip:async i=>{e({type:j.ADD_TRIP,payload:i}),await Dn.save(i)},updateTrip:async i=>{e({type:j.UPDATE_TRIP,payload:i}),await Dn.save(i)},deleteTrip:async i=>{e({type:j.DELETE_TRIP,payload:i}),await Dn.delete(i)},addNote:async i=>{e({type:j.ADD_NOTE,payload:i}),await $r.save(i)},deleteNote:async i=>{e({type:j.DELETE_NOTE,payload:i}),await $r.delete(i)},loadNotes:async i=>{const o=await $r.getByTrip(i);e({type:j.SET_NOTES,payload:o})},setLoading:i=>{e({type:j.SET_LOADING,payload:i})},setError:i=>{e({type:j.SET_ERROR,payload:i})},clearError:()=>{e({type:j.CLEAR_ERROR})},setGuardianDetails:i=>{e({type:j.SET_GUARDIAN,payload:i})},logout:async()=>{try{await Cf(),e({type:j.LOGOUT})}catch(i){console.error("Logout error:",i)}}};return R.jsx(cl.Provider,{value:{state:t,actions:s,dispatch:e},children:n})}function hl(){const n=G.useContext(cl);if(!n)throw new Error("useTrip must be used within a TripProvider");return n}const dl=G.createContext(null);function Of(){const n=localStorage.getItem("triplanner-theme");return n==="dark"||n==="light"?n:window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}function Lf({children:n}){const[t,e]=G.useState(Of);G.useEffect(()=>{const i=document.documentElement;t==="dark"?i.classList.add("dark"):i.classList.remove("dark");const o=document.querySelector('meta[name="theme-color"]');o&&o.setAttribute("content",t==="dark"?"#0f172a":"#ffffff"),localStorage.setItem("triplanner-theme",t)},[t]),G.useEffect(()=>{const i=window.matchMedia("(prefers-color-scheme: dark)"),o=l=>{localStorage.getItem("triplanner-theme")||e(l.matches?"dark":"light")};return i.addEventListener("change",o),()=>i.removeEventListener("change",o)},[]);const s=()=>{e(i=>i==="light"?"dark":"light")};return R.jsx(dl.Provider,{value:{theme:t,toggleTheme:s,setTheme:e},children:n})}function Mf(){const n=G.useContext(dl);if(!n)throw new Error("useTheme must be used within a ThemeProvider");return n}function Uf({className:n=""}){const{theme:t,toggleTheme:e}=Mf();return R.jsx("button",{onClick:e,className:`relative p-2.5 rounded-xl transition-colors duration-300
        hover:bg-surface-100 dark:hover:bg-surface-800 ${n}`,"aria-label":`Switch to ${t==="light"?"dark":"light"} mode`,title:`Switch to ${t==="light"?"dark":"light"} mode`,children:R.jsx(Kn,{mode:"wait",children:t==="light"?R.jsx(ie.div,{initial:{rotate:-90,scale:0},animate:{rotate:0,scale:1},exit:{rotate:90,scale:0},transition:{duration:.3,ease:"easeOut"},children:R.jsx(Wl,{size:20,className:"text-amber-500"})},"sun"):R.jsx(ie.div,{initial:{rotate:90,scale:0},animate:{rotate:0,scale:1},exit:{rotate:-90,scale:0},transition:{duration:.3,ease:"easeOut"},children:R.jsx(Xl,{size:20,className:"text-indigo-300"})},"moon")})})}const Ff=[{path:"/",label:"Home",icon:Co},{path:"/plan",label:"Plan",icon:ds},{path:"/safety",label:"Safety",icon:xo},{path:"/hidden-gems",label:"Gems",icon:Vo},{path:"/chatbot",label:"Chat",icon:ko}];function jf(){const n=sr();return["/login","/signup","/onboarding"].some(e=>n.pathname.startsWith(e))?null:R.jsx(ie.nav,{className:"fixed bottom-4 left-4 right-4 z-40 md:hidden",initial:{y:100,opacity:0},animate:{y:0,opacity:1},transition:{delay:.3,type:"spring",stiffness:200,damping:25},children:R.jsx("div",{className:"glass rounded-2xl px-2 py-2 flex items-center justify-around",children:Ff.map(e=>{const s=e.icon,i=n.pathname===e.path||e.path!=="/"&&n.pathname.startsWith(e.path);return R.jsxs(ye,{to:e.path,className:"relative flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200",children:[i&&R.jsx(ie.div,{className:"absolute inset-0 bg-primary-500/10 dark:bg-primary-400/15 rounded-xl",layoutId:"bottomNavIndicator",transition:{type:"spring",stiffness:350,damping:30}}),R.jsx(s,{size:20,className:`relative z-10 transition-colors duration-200 ${i?"text-primary-500 dark:text-primary-400":"text-surface-400 dark:text-surface-500"}`}),R.jsx("span",{className:`relative z-10 text-[10px] font-medium transition-colors duration-200 ${i?"text-primary-600 dark:text-primary-400":"text-surface-400 dark:text-surface-500"}`,children:e.label})]},e.path)})})})}function Xe({width:n="100%",height:t="1rem",className:e=""}){return R.jsx("div",{className:`skeleton rounded-lg ${e}`,style:{width:n,height:t}})}function Qr({className:n=""}){return R.jsxs("div",{className:`card p-6 space-y-4 ${n}`,children:[R.jsx(Xe,{width:"60%",height:"1.5rem"}),R.jsx(Xe,{width:"100%"}),R.jsx(Xe,{width:"80%"}),R.jsxs("div",{className:"flex gap-3 pt-2",children:[R.jsx(Xe,{width:"4rem",height:"2rem",className:"rounded-full"}),R.jsx(Xe,{width:"4rem",height:"2rem",className:"rounded-full"})]})]})}function Ht({children:n}){const{state:t}=hl(),e=sr();return t.isLoading?R.jsx("div",{className:"min-h-screen flex items-center justify-center",children:R.jsx(Yl,{size:32,className:"animate-spin text-primary-500"})}):t.isAuthenticated?n:R.jsx(au,{to:"/login",state:{from:e},replace:!0})}const Bf=G.lazy(()=>Ct(()=>import("./Home-DNHEx3mF.js"),__vite__mapDeps([0,1,2,3,4,5]))),$f=G.lazy(()=>Ct(()=>import("./PlanGenerator-hPpDyUAe.js"),__vite__mapDeps([6,1,2,3,4,5]))),qf=G.lazy(()=>Ct(()=>import("./ItineraryView-Dn7NLt2w.js"),__vite__mapDeps([7,1,2,8,4,5,9]))),zf=G.lazy(()=>Ct(()=>import("./BudgetView-Bxa0Hmf4.js"),__vite__mapDeps([10,1,2,3,4,11,5]))),Gf=G.lazy(()=>Ct(()=>import("./BudgetCalculator-B5hqNK4G.js"),__vite__mapDeps([12,1,2,3,4,11,5]))),Kf=G.lazy(()=>Ct(()=>import("./SafetyTips-C0CEfTQx.js"),__vite__mapDeps([13,1,2,3,4,11,5]))),Hf=G.lazy(()=>Ct(()=>import("./HiddenGems-CZvD1Bel.js"),__vite__mapDeps([14,1,2,3,4,11,5]))),Qf=G.lazy(()=>Ct(()=>import("./Notes-CkF0_Sd4.js"),__vite__mapDeps([15,1,2,3,4,11,5]))),Wf=G.lazy(()=>Ct(()=>import("./Chatbot-D7hmnnWR.js"),__vite__mapDeps([16,1,2,3,4,5]))),Xf=G.lazy(()=>Ct(()=>import("./Login-DB_oM-QC.js"),__vite__mapDeps([17,1,2,3,4,5]))),Yf=G.lazy(()=>Ct(()=>import("./Signup-DguQya-A.js"),__vite__mapDeps([18,1,2,3,4,5]))),Jf=G.lazy(()=>Ct(()=>import("./Dashboard-D5K5QmBD.js"),__vite__mapDeps([19,1,2,3,4,11,5]))),Zf=G.lazy(()=>Ct(()=>import("./Onboarding-CGESE4d3.js"),__vite__mapDeps([20,1,2,4,5])));function tp(){return R.jsxs("div",{className:"max-w-4xl mx-auto px-4 py-8 space-y-6",children:[R.jsx(Qr,{}),R.jsx(Qr,{}),R.jsx(Qr,{})]})}const bo=[{path:"/",label:"Home",icon:Co},{path:"/dashboard",label:"Dashboard",icon:No},{path:"/plan",label:"Plan Trip",icon:ds},{path:"/budget-calculator",label:"Budget Calculator",icon:Jl},{path:"/safety",label:"Safety",icon:xo},{path:"/hidden-gems",label:"Hidden Gems",icon:Vo},{path:"/notes",label:"Notes",icon:Zl},{path:"/chatbot",label:"Assistant",icon:ko}];function ep(){var f,v,I,P,x,V;const n=sr(),[t,e]=G.useState(!1),[s,i]=G.useState(!1),o=G.useRef(null),{state:l,actions:c}=hl();return G.useEffect(()=>{function N(k){o.current&&!o.current.contains(k.target)&&i(!1)}return document.addEventListener("mousedown",N),()=>document.removeEventListener("mousedown",N)},[]),["/login","/signup","/onboarding"].some(N=>n.pathname.startsWith(N))?null:R.jsxs("nav",{className:"glass-nav sticky top-0 z-50",children:[R.jsx("div",{className:"max-w-7xl mx-auto px-4",children:R.jsxs("div",{className:"flex items-center justify-between h-16",children:[R.jsxs(ye,{to:"/",className:"flex items-center gap-2.5 group",children:[R.jsx("div",{className:"w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow",children:R.jsx(ds,{size:18,className:"text-white"})}),R.jsx("span",{className:"font-bold text-surface-900 dark:text-surface-100 hidden sm:block text-lg",children:"TriPlanner"})]}),R.jsx("div",{className:"hidden md:flex items-center gap-1",children:bo.map(N=>{const k=N.icon,U=n.pathname===N.path||N.path!=="/"&&n.pathname.startsWith(N.path);return R.jsxs(ye,{to:N.path,className:`relative flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200 text-sm font-medium ${U?"text-primary-600 dark:text-primary-400":"text-surface-500 dark:text-surface-400 hover:text-surface-700 dark:hover:text-surface-200 hover:bg-surface-100 dark:hover:bg-surface-800"}`,children:[U&&R.jsx(ie.div,{className:"absolute inset-0 bg-primary-50 dark:bg-primary-500/10 rounded-xl",layoutId:"navIndicator",transition:{type:"spring",stiffness:350,damping:30}}),R.jsx(k,{size:16,className:"relative z-10"}),R.jsx("span",{className:"relative z-10",children:N.label})]},N.path)})}),R.jsxs("div",{className:"flex items-center gap-2",children:[R.jsx("div",{className:`w-2 h-2 rounded-full ${l.isOnline?"bg-emerald-500":"bg-surface-400"}`,title:l.isOnline?"Online":"Offline"}),R.jsx(Uf,{}),l.isAuthenticated?R.jsxs("div",{className:"relative",ref:o,children:[R.jsxs("button",{onClick:()=>i(!s),className:"flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors",children:[R.jsx("div",{className:"w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white text-sm font-semibold",children:(((f=l.user)==null?void 0:f.displayName)||((v=l.user)==null?void 0:v.email)||"U")[0].toUpperCase()}),R.jsx("span",{className:"hidden sm:block text-sm font-medium text-surface-700 dark:text-surface-200",children:((I=l.user)==null?void 0:I.displayName)||((x=(P=l.user)==null?void 0:P.email)==null?void 0:x.split("@")[0])||"User"})]}),R.jsx(Kn,{children:s&&R.jsxs(ie.div,{initial:{opacity:0,scale:.95,y:-8},animate:{opacity:1,scale:1,y:0},exit:{opacity:0,scale:.95,y:-8},transition:{duration:.15},className:"absolute right-0 mt-2 w-56 glass-card p-2 z-50",children:[R.jsx("div",{className:"px-3 py-2 border-b border-surface-200 dark:border-surface-700 mb-1",children:R.jsx("p",{className:"text-sm font-medium text-surface-900 dark:text-surface-100 truncate",children:(V=l.user)==null?void 0:V.email})}),R.jsxs(ye,{to:"/dashboard",onClick:()=>i(!1),className:"flex items-center gap-2 px-3 py-2 text-sm rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800 text-surface-700 dark:text-surface-300 transition-colors",children:[R.jsx(No,{size:16}),"Dashboard"]}),R.jsxs("button",{onClick:()=>{c.logout(),i(!1)},className:"w-full flex items-center gap-2 px-3 py-2 text-sm rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors",children:[R.jsx(tu,{size:16}),"Sign Out"]})]})})]}):R.jsxs(ye,{to:"/login",className:"flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl text-sm font-medium transition-all duration-300 shadow-md shadow-primary-500/20 hover:shadow-primary-500/40",children:[R.jsx(eu,{size:16}),R.jsx("span",{className:"hidden sm:inline",children:"Sign In"})]}),R.jsx("button",{onClick:()=>e(!t),className:"md:hidden p-2 rounded-xl hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors",children:t?R.jsx(nu,{size:22,className:"text-surface-600 dark:text-surface-300"}):R.jsx(ru,{size:22,className:"text-surface-600 dark:text-surface-300"})})]})]})}),R.jsx(Kn,{children:t&&R.jsx(ie.div,{initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.2},className:"md:hidden border-t border-surface-200/50 dark:border-surface-700/50 overflow-hidden",children:R.jsx("div",{className:"py-2 px-2",children:bo.map(N=>{const k=N.icon,U=n.pathname===N.path;return R.jsxs(ye,{to:N.path,onClick:()=>e(!1),className:`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${U?"bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400":"text-surface-600 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800"}`,children:[R.jsx(k,{size:20}),R.jsx("span",{className:"font-medium",children:N.label})]},N.path)})})})})]})}function np(){const n=sr();return R.jsxs("div",{className:"min-h-screen bg-surface-50 dark:bg-surface-950 transition-colors duration-300",children:[R.jsx(ep,{}),R.jsx(G.Suspense,{fallback:R.jsx(tp,{}),children:R.jsx(Kn,{mode:"wait",children:R.jsxs(lu,{location:n,children:[R.jsx(Rt,{path:"/",element:R.jsx(Bf,{})}),R.jsx(Rt,{path:"/login",element:R.jsx(Xf,{})}),R.jsx(Rt,{path:"/signup",element:R.jsx(Yf,{})}),R.jsx(Rt,{path:"/dashboard",element:R.jsx(Ht,{children:R.jsx(Jf,{})})}),R.jsx(Rt,{path:"/onboarding",element:R.jsx(Ht,{children:R.jsx(Zf,{})})}),R.jsx(Rt,{path:"/plan",element:R.jsx(Ht,{children:R.jsx($f,{})})}),R.jsx(Rt,{path:"/itinerary",element:R.jsx(Ht,{children:R.jsx(qf,{})})}),R.jsx(Rt,{path:"/budget",element:R.jsx(Ht,{children:R.jsx(zf,{})})}),R.jsx(Rt,{path:"/budget-calculator",element:R.jsx(Ht,{children:R.jsx(Gf,{})})}),R.jsx(Rt,{path:"/safety",element:R.jsx(Kf,{})}),R.jsx(Rt,{path:"/hidden-gems",element:R.jsx(Hf,{})}),R.jsx(Rt,{path:"/notes",element:R.jsx(Ht,{children:R.jsx(Qf,{})})}),R.jsx(Rt,{path:"/chatbot",element:R.jsx(Ht,{children:R.jsx(Wf,{})})})]},n.pathname)})}),R.jsx(jf,{}),R.jsx("div",{className:"h-20 md:h-0"})]})}const rp=new su({defaultOptions:{queries:{staleTime:5*60*1e3,gcTime:10*60*1e3,retry:2,refetchOnWindowFocus:!1}}});Wr.createRoot(document.getElementById("root")).render(R.jsx(uu.StrictMode,{children:R.jsx(iu,{client:rp,children:R.jsx(cu,{future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:R.jsx(Lf,{children:R.jsx(Df,{children:R.jsx(np,{})})})})})}));export{Vf as a,mp as b,Tp as c,pp as d,wp as e,Ep as h,gp as i,hp as l,vp as m,yp as n,_p as p,dp as r,fp as s,hl as u};
