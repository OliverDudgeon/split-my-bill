var V=Object.defineProperty,q=Object.defineProperties;var J=Object.getOwnPropertyDescriptors;var w=Object.getOwnPropertySymbols;var S=Object.prototype.hasOwnProperty,P=Object.prototype.propertyIsEnumerable;var T=(e,t,r)=>t in e?V(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,u=(e,t)=>{for(var r in t||(t={}))S.call(t,r)&&T(e,r,t[r]);if(w)for(var r of w(t))P.call(t,r)&&T(e,r,t[r]);return e},d=(e,t)=>q(e,J(t));var g=(e,t)=>{var r={};for(var n in e)S.call(e,n)&&t.indexOf(n)<0&&(r[n]=e[n]);if(e!=null&&w)for(var n of w(e))t.indexOf(n)<0&&P.call(e,n)&&(r[n]=e[n]);return r};import{j as v,b as X,p as F,a as Y,F as Z,c as Q,r as m,d as ee,u as te,f as re,e as C,v as ne,R as oe}from"./vendor.266e22f6.js";const se=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const c of o.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function r(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerpolicy&&(o.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?o.credentials="include":s.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(s){if(s.ep)return;s.ep=!0;const o=r(s);fetch(s.href,o)}};se();const i=v.exports.jsx,f=v.exports.jsxs,N=v.exports.Fragment;function ie(){return null}const ce=/^\s*([\d\s#&',.?A-Za-z]+)(-?)([$£])?(\d+\.?\d{0,2})(€)?\s*?/m,ae=e=>[...Array.from({length:e}).keys()],x=e=>e.reduce((t,r)=>t+r,0),B=(e,t,r)=>[...e,...Array.from({length:t}).fill(r)].slice(0,t),I=new Intl.NumberFormat("en-GB",{style:"currency",currency:"GBP",currencyDisplay:"narrowSymbol"}),A=(e,t)=>{const r=Number.parseFloat(e)||0;return e.includes("%")?t*(1-r/100):t-r},O=e=>(Number.parseFloat(e)||0)/100,D=e=>x(e.map(t=>t.price)),le=e=>e.length===0?[]:ae(e[0].length).map(t=>x(e.map(r=>r[t])));function $(e){const t=[];for(const r of e.split(`
`)){const n=r.match(ce),[s,o,c,l,a,p]=n!=null?n:[];o!==void 0&&a!==void 0&&t.push({item:o,price:Number.parseFloat(a)*(c?-1:1)})}return t}function ue(e){return e.receiptItems.map(({price:t,discount:r,shares:n})=>{const s=A(r,t),o=x(n.map(c=>Number.parseInt(c,10)||0));return o===0?Array.from({length:e.numberOfPeople}).fill(s/e.numberOfPeople):n.map(c=>s*(Number.parseInt(c,10)||0)/o)})}const pe=({numberOfPeople:e,receiptItems:t,peoplesInitials:r,serviceCharge:n})=>{const s=t.map(({discount:o,shares:c,item:l,price:a})=>({d:o,s:c,i:l,p:a}));return{n:e,r:s,p:r,sc:n}},de=({n:e,r:t,p:r,sc:n})=>{const s=t.map(({d:l,s:a,i:p,p:h})=>({discount:l,shares:a,item:p,price:h})),o={numberOfPeople:e,receiptItems:s,serviceCharge:n,peoplesInitials:r!=null?r:Array.from({length:e}).fill("")},c=o.receiptItems.map(({item:l,price:a})=>`${l} \xA3${a}`).join(`
`);return d(u({},o),{receipt:`${c}
`})},me=e=>{const t=F.gzip(JSON.stringify(e));return Y(t).replace(/\//g,"-")},fe=e=>{const t=e.replaceAll("-","/"),r=X(t),n=F.ungzip(r),s=new TextDecoder().decode(n);if(!!s)return JSON.parse(s)},E=`Root Ginger Loose \xA31.03
Rice, Broccoli, Sweetcorn & Peas Microwaveable Steam Bags \xA31.50
Pesto & Goat Cheese Tortelloni 300g \xA31.50
`,R=3,he={receipt:E,numberOfPeople:R,serviceCharge:"0",peoplesInitials:Array.from({length:R}).fill(""),receiptItems:$(E).map(e=>d(u({},e),{shares:Array.from({length:R}).fill(""),discount:""}))};function ge({children:e}){let t;try{const r=window.location.search,n=fe(r.slice(1));t=n!==void 0?de(n):void 0}catch(r){console.error(r),t=void 0}return i(Z,{initialValues:t!=null?t:he,onSubmit:()=>{},children:r=>i(Q,{children:e(r)})})}const be=async()=>{const e=window.location.href,r=await(await fetch(`http://tinyurl.com/api-create.php?url=${encodeURIComponent(e)}`)).text();await navigator.clipboard.writeText(r)};function ye(){return i("button",{className:"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded",type:"button",onClick:e=>{e.preventDefault(),be().catch(()=>{})},children:"Share"})}function we(){return f("div",{className:"max-w-screen-sm mx-auto mb-12",children:[i("p",{children:"Click the button to copy a shortened url to share with your splitees"}),i(ye,{})]})}function xe({children:e}){return i("header",{className:"max-w-screen-sm mx-auto mb-12",children:e})}const L=`Root Ginger Loose \xA31.03
Rice, Broccoli, Sweetcorn & Peas Microwaveable Steam Bags \xA31.50
Pesto & Goat Cheese Tortelloni 300g \xA31.50
`,k=3,ve={receipt:L,numberOfPeople:k,serviceCharge:"0",peoplesInitials:Array.from({length:k}).fill(""),receiptItems:$(L).map(e=>d(u({},e),{shares:Array.from({length:k}).fill(""),discount:""}))};function M(e="",t){if(t!==0&&t!==void 0)return`${e}${I.format(t)}`}function Ce(o){var c=o,{price:e,subPrice:t,label:r,subLabel:n}=c,s=g(c,["price","subPrice","label","subLabel"]);const l=M(r,e),a=M(n,t);return f("span",d(u({},s),{children:[l," ",a&&`(${a})`]}))}function j(n){var s=n,{label:e,subLabel:t}=s,r=g(s,["label","subLabel"]);return i(Ce,u({label:e?`${e}: `:void 0,subLabel:t?`${t}: `:void 0},r))}function G({receiptItems:e,serviceCharge:t=""}){const r=O(t),n=D(e);return i(j,{label:"Total",price:n,subLabel:"sc",subPrice:t?n*r:void 0})}function U(s){var o=s,{children:e,className:t,side:r}=o,n=g(o,["children","className","side"]);const c=()=>{switch(r){case"left":return"rounded-l";case"right":return"rounded-r";default:return"rounded"}};return i("button",d(u({},n),{className:`shadow-sm border ${c()} text-2xl px-3 text-gray-700 leading-tight focus:outline-none
    focus:shadow-outline appearance-none ${t!=null?t:""}`,type:"button",children:e}))}function y(r){var n=r,{className:e}=n,t=g(n,["className"]);const s=m.exports.useRef(null);return i(ee,d(u({className:`shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none
                  focus:shadow-outline appearance-none ${e!=null?e:""}`},t),{innerRef:s,onKeyDown:o=>{var a,p,h;const c=(a=s.current)==null?void 0:a.selectionStart,l=(h=(p=s.current)==null?void 0:p.value.length)!=null?h:0;typeof c=="number"&&(o.key==="ArrowLeft"&&c!==0&&o.stopPropagation(),o.key==="ArrowRight"&&c<l&&o.stopPropagation())}}))}const W=(e,t,r)=>{const n=e.receiptItems.map(o=>d(u({},o),{shares:B(o.shares,r,"")})),s=B(e.peoplesInitials,r,"");t(d(u({},e),{numberOfPeople:r,receiptItems:n,peoplesInitials:s}))};function Ne({values:e,setValues:t}){return f("div",{className:"flex",children:[i("label",{htmlFor:"number-of-people",children:"Number of People"}),i(U,{side:"left",onClick:()=>{W(e,t,Math.max(2,e.numberOfPeople-1))},children:"-"}),i(y,{disabled:!0,className:"w-12 text-center rounded-none shadow-sm text-lg",id:"number-of-people",name:"numberOfPeople"}),i(U,{side:"right",onClick:()=>{W(e,t,e.numberOfPeople+1)},children:"+"})]})}function Ie(n){var s=n,{className:e,onValueChange:t}=s,r=g(s,["className","onValueChange"]);const[o,c]=te(r);return i("textarea",d(u({},o),{className:`shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${e}`,onChange:l=>{t(l,o)}}))}function Ae(r){var n=r,{onValueChange:e}=n,t=g(n,["onValueChange"]);return i(Ie,d(u({},t),{className:"w-full self-center",onValueChange:e}))}function $e({onReset:e}){return i("button",{className:"bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded",type:"button",onClick:e,children:"Reset"})}function Re(){return f("label",{children:["Service Charge (%)",i(y,{name:"serviceCharge",type:"number"})]})}const ke=(e,t)=>(r,n)=>{const s=$(r.target.value),{receiptItems:o,numberOfPeople:c}=e,l=s.map((a,p)=>{const h=p<=o.length-1?o[p]:void 0;return h?d(u({},a),{discount:h.discount,shares:h.shares}):d(u({},a),{discount:"",shares:Array.from({length:c}).fill("")})});t(d(u({},e),{receiptItems:l})),n.onChange(r)};function Se({values:e,setValues:t}){return f(N,{children:[i(Ae,{name:"receipt",onValueChange:ke(e,t)}),i("div",{children:i("b",{children:i(G,{receiptItems:e.receiptItems})})}),f("div",{className:"flex justify-between my-3",children:[i(Re,{}),i(G,{receiptItems:e.receiptItems,serviceCharge:e.serviceCharge})]}),f("div",{className:"flex justify-between my-3",children:[i(Ne,{setValues:t,values:e}),i($e,{onReset:()=>t(d(u({},ve),{receipt:"",receiptItems:[]}))})]})]})}const _=e=>`peoplesInitials.${e}`,H=e=>`receiptItems.${e}.discount`,z=(e,t)=>`receiptItems.${e}.shares.${t}`,Pe=(e,t)=>t===0?H(e-1):e===0?_(t-1):z(e-1,t-1),Te=(e,t)=>{m.exports.useEffect(()=>{const r=Math.floor(e/(t+1)),n=e%(t+1),s=Pe(r,n),o=document.getElementsByName(s);if(o.length!==1)throw new Error(`Found ${o.length} inputs with the 'name': ${s} @ focus = ${e}`);o[0].focus()},[e])},K=m.exports.createContext({});function Fe({children:e}){const[t,r]=m.exports.useState(window.innerWidth),[n,s]=m.exports.useState(window.innerHeight),o=m.exports.useMemo(()=>({width:t,height:n}),[t,n]),c=()=>{r(window.innerWidth),s(window.innerHeight)};return m.exports.useEffect(()=>(window.addEventListener("resize",c),()=>{window.removeEventListener("resize",c)}),[]),i(K.Provider,{value:o,children:e})}function Be(){const{width:e,height:t}=m.exports.useContext(K);return{width:e,height:t}}function Oe(e){const{width:t}=Be();return{gridTemplateColumns:(t!=null?t:0)<640?"repeat(3, 1fr)":`minmax(5rem, 1fr) 5rem 5.5rem repeat(${e}, minmax(7rem, 1fr))`}}function De(e,t){const[r,n]=m.exports.useState(1),s=m.exports.useCallback(o=>{const c=o.target;if((c==null?void 0:c.tagName)==="INPUT"&&c.name!=="numberOfPeople")switch(o.key){case"Tab":{o.shiftKey?r!==1&&(o.preventDefault(),n(r-1)):r!==e&&(o.preventDefault(),n(r+1));break}case"ArrowRight":{o.preventDefault(),n(Math.min(r+1,e));break}case"ArrowLeft":{o.preventDefault(),n(Math.max(1,r-1));break}case"ArrowUp":{o.preventDefault(),n(Math.max(1,r-t));break}case"ArrowDown":{o.preventDefault(),n(Math.min(r+t,e));break}}},[t,e,r,n]);return m.exports.useEffect(()=>(document.addEventListener("keydown",s,!1),()=>{document.removeEventListener("keydown",s,!1)}),[s]),[r,n]}const Ee=re(e=>{window.history.pushState("","",e)},500);function Le(e){m.exports.useEffect(()=>{const t=pe(u({},e)),r=me(t);Ee(`?${r}`)})}function Me({peoplesInitials:e,onClick:t}){return i(C,{name:"peoplesInitials",children:()=>e.map((r,n)=>{const s=n+1;return i(y,{className:`font-bold self-center w-full col-start-auto ${n===0?"sm:col-start-4":""}`,name:_(n),placeholder:"Initial",onClick:()=>t(s)},n)})})}function je({receiptItems:e,peoplesInitials:t,numberOfPeople:r,onClick:n,focus:s}){return i(C,{name:"receiptItems",children:()=>e.map(({item:o,price:c,shares:l,discount:a},p)=>{const h=r+p*(r+1)+1;return f(m.exports.Fragment,{children:[i("span",{className:`self-center col-start-1 ${Math.floor((s-1-r)/(r+1))===p?"font-bold":""}`,children:o}),i("span",{className:"self-center",children:I.format(A(a,c))}),i(y,{className:"self-center w-full",name:H(p),placeholder:"discount",onClick:()=>n(h)}),i(C,{name:`receiptItems.${p}`,children:()=>l.map((Ke,b)=>i(y,{className:`self-center w-full ${b===0?"col-start-1":""} sm:col-start-auto`,name:z(p,b),placeholder:t[b],onClick:()=>n(h+b+1)},b))})]},`${o}-${p}`)})})}function Ge({total:e,serviceChargeFraction:t,priceSummary:r,labels:n}){return i(N,{children:r.map((s,o)=>{const c=e*t*s/e;return i(j,{className:o===0?"col-start-1 sm:col-start-4":"",label:n[o],price:s+c,subLabel:"sc",subPrice:c},o)})})}function Ue({values:e}){const{receiptItems:t,numberOfPeople:r,peoplesInitials:n,serviceCharge:s}=e,[o,c]=De(t.length*(r+1)+r,r+1);return Te(o,r),Le(e),f("div",{className:"grid gap-4 my-5",style:Oe(r),children:[i(Me,{peoplesInitials:n,onClick:l=>c(l)}),t.length>0?i(je,{focus:o,numberOfPeople:r,peoplesInitials:n,receiptItems:t,onClick:l=>c(l)}):i("p",{className:"col-span-full",children:"You have no receipt items to display."}),i("b",{children:"Total:"}),i("b",{className:"col-start-2",children:I.format(x(t.map(({price:l,discount:a})=>A(a,l))))}),i(Ge,{labels:n,priceSummary:le(ue(e)),serviceChargeFraction:O(s),total:D(t)})]})}function We(){return i("footer",{className:"max-w-screen-lg mx-auto my-6",children:f("ul",{children:[i("li",{children:"Created By Oliver Dudgeon"}),i("a",{className:"text-blue-700",href:"https://github.com/OliverDudgeon/split-my-bill",rel:"noopener noreferrer",target:"_blank",children:i("li",{children:"Open Sourced on GitHub"})})]})})}function _e(){return i("h1",{className:"text-center text-7xl mt-2 mb-8",children:"Split My Bill"})}function He(){return i(Fe,{children:f("div",{className:"px-2 md:px-4",children:[i(ie,{}),i(ge,{children:e=>f(N,{children:[f(xe,{children:[i(_e,{}),i(Se,u({},e))]}),i(Ue,{values:e.values}),i(we,{})]})}),i(We,{})]})})}function ze(e={}){const{immediate:t=!1,onNeedRefresh:r,onOfflineReady:n,onRegistered:s,onRegisterError:o}=e;let c;const l=async(a=!0)=>{};return"serviceWorker"in navigator&&(c=new ne("/split-my-bill/sw.js",{scope:"/split-my-bill/"}),c.addEventListener("activated",a=>{a.isUpdate?window.location.reload():n==null||n()}),c.register({immediate:t}).then(a=>{s==null||s(a)}).catch(a=>{o==null||o(a)})),l}ze();oe.render(i(m.exports.StrictMode,{children:i(He,{})}),document.querySelector("#root"));
