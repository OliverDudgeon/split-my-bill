if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,t)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const l=e=>i(e,r),f={module:{uri:r},exports:o,require:l};s[r]=Promise.all(n.map((e=>f[e]||l(e)))).then((e=>(t(...e),o)))}}define(["./workbox-f51ab5e4"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index.2afc9436.js",revision:null},{url:"assets/index.eb0df46f.css",revision:null},{url:"index.html",revision:"9884f688bfb52a4a7f6d13614bff4b8c"},{url:"manifest.webmanifest",revision:"94be207029b7b4515a365e307b1bc725"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
