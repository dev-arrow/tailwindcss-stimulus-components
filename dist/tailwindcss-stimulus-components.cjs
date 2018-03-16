var y=Object.defineProperty;var W=Object.getOwnPropertyDescriptor;var q=Object.getOwnPropertyNames;var R=Object.prototype.hasOwnProperty;var M=(t,e,a)=>e in t?y(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var F=(t,e)=>{for(var a in e)y(t,a,{get:e[a],enumerable:!0})},U=(t,e,a,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of q(e))!R.call(t,o)&&o!==a&&y(t,o,{get:()=>e[o],enumerable:!(i=W(e,o))||i.enumerable});return t};var N=t=>U(y({},"__esModule",{value:!0}),t);var s=(t,e,a)=>(M(t,typeof e!="symbol"?e+"":e,a),a);var K={};F(K,{Alert:()=>f,Autosave:()=>p,ColorPreview:()=>b,Dropdown:()=>u,Modal:()=>g,Popover:()=>T,Slideover:()=>v,Tabs:()=>h,Toggle:()=>m});module.exports=N(K);var D=require("@hotwired/stimulus");var w=new Map;async function l(t,e,a=null){e?await c(t,a):await d(t,a)}async function c(t,e=null){t.classList.remove("hidden"),await A("enter",t,e)}async function d(t,e=null){try{await A("leave",t,e)}finally{t.classList.add("hidden")}}async function A(t,e,a){let i=S(t,e,a);if(w.has(e)){let r=w.get(e),V=S(r,e,a);console.log("INTERRUPTED by",t,"Removing",V),x(e,V.transition+V.start+V.end)}let o=[],n=new Set(e.classList.values());i.transition.forEach(r=>n.has(r)&&o.push(r)),i.start.forEach(r=>n.has(r)&&o.push(r)),i.end.forEach(r=>n.has(r)&&o.push(r)),w.set(e,t),x(e,o),C(e,i.transition),C(e,i.start),await _(),x(e,i.start),C(e,i.end),await Y(e),x(e,i.end),x(e,i.transition),C(e,o),w.delete(e)}function S(t,e,a){let i=e.dataset,o=a?`${a}-${t}`:t,n=`transition${t.charAt(0).toUpperCase()+t.slice(1)}`;return{transition:i[n]?i[n].split(" "):[o],start:i[`${n}From`]?i[`${n}From`].split(" "):[`${o}-from`],end:i[`${n}To`]?i[`${n}To`].split(" "):[`${o}-to`]}}function C(t,e){t.classList.add(...e)}function x(t,e){t.classList.remove(...e)}function _(){return new Promise(t=>{requestAnimationFrame(()=>{requestAnimationFrame(t)})})}function Y(t){return Promise.all(t.getAnimations().map(e=>e.finished))}var f=class extends D.Controller{connect(){setTimeout(()=>{c(this.element)},this.showDelayValue),this.hasDismissAfterValue&&setTimeout(()=>{this.close()},this.dismissAfterValue)}close(){d(this.element).then(()=>{this.element.remove()})}};s(f,"values",{dismissAfter:Number,removeDelay:{type:Number,default:1100}}),s(f,"classes",["show","hide"]);var L=require("@hotwired/stimulus");var p=class extends L.Controller{connect(){this.timeout=null}save(){clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.statusTarget.textContent=this.submittingTextValue,this.formTarget.requestSubmit()},this.submitDurationValue)}success(){this.setStatus(this.successTextValue)}error(){this.setStatus(this.errorTextValue)}setStatus(t){this.statusTarget.textContent=t,this.timeout=setTimeout(()=>{this.statusTarget.textContent=""},this.statusDurationValue)}};s(p,"targets",["form","status"]),s(p,"values",{submitDuration:{type:Number,default:1e3},statusDuration:{type:Number,default:2e3},submittingText:{type:String,default:"Saving..."},successText:{type:String,default:"Saved!"},errorText:{type:String,default:"Unable to save."}});var I=require("@hotwired/stimulus");var u=class extends I.Controller{connect(){this.hasButtonTarget&&(this.buttonTarget.addEventListener("keydown",this._onMenuButtonKeydown),this.buttonTarget.setAttribute("aria-haspopup","true"))}disconnect(){this.hasButtonTarget&&(this.buttonTarget.removeEventListener("keydown",this._onMenuButtonKeydown),this.buttonTarget.removeAttribute("aria-haspopup"))}openValueChanged(){l(this.menuTarget,this.openValue)}show(){this.openValue=!0}hide(t){this.element.contains(t.target)===!1&&this.openValue&&(this.openValue=!1)}toggle(){this.openValue=!this.openValue}};s(u,"targets",["menu","button"]),s(u,"values",{open:Boolean,default:!1});var E=require("@hotwired/stimulus");var g=class extends E.Controller{disconnect(){this.close()}open(){this.openValue=!0}close(){this.openValue=!1}closeBackground(t){t.target===this.containerTarget&&this.close()}openValueChanged(){this.openValue?(this.containerTarget.focus(),this.lockScroll(),c(this.backgroundTarget),c(this.containerTarget)):(this.unlockScroll(),d(this.containerTarget),d(this.backgroundTarget))}lockScroll(){let t=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=`${t}px`,document.body.classList.add("fixed","inset-x-0","overflow-hidden"),this.restoreScrollValue&&(this.saveScrollPosition(),document.body.style.top=`-${this.scrollPosition}px`)}unlockScroll(){document.body.style.paddingRight=null,document.body.classList.remove("fixed","inset-x-0","overflow-hidden"),this.restoreScrollValue&&(this.restoreScrollPosition(),document.body.style.top=null)}saveScrollPosition(){this.scrollPosition=window.pageYOffset||document.body.scrollTop}restoreScrollPosition(){this.scrollPosition!==void 0&&(document.documentElement.scrollTop=this.scrollPosition)}};s(g,"targets",["container","background"]),s(g,"values",{open:{type:Boolean,default:!1},restoreScroll:{type:Boolean,default:!0}});var P=require("@hotwired/stimulus");var h=class extends P.Controller{connect(){this.anchor&&(this.indexValue=this.tabTargets.findIndex(t=>t.id===this.anchor)),this.showTab()}change(t){t.currentTarget.dataset.index?this.indexValue=t.currentTarget.dataset.index:t.currentTarget.dataset.id?this.indexValue=this.tabTargets.findIndex(e=>e.id==t.currentTarget.dataset.id):this.indexValue=this.tabTargets.indexOf(t.currentTarget),window.dispatchEvent(new CustomEvent("tsc:tab-change"))}nextTab(){this.indexValue=Math.min(this.indexValue+1,this.tabsCount)}previousTab(){this.indexValue=Math.max(this.indexValue-1,0)}firstTab(){this.indexValue=0}lastTab(){this.indexValue=this.tabsCount-1}indexValueChanged(){this.showTab(),this.updateAnchorValue&&(location.hash=this.tabTargets[this.indexValue].id)}showTab(){this.tabTargets.forEach((t,e)=>{let a=this.panelTargets[e];e===this.indexValue?(a.classList.remove("hidden"),this.hasInactiveTabClass&&t.classList.remove(...this.inactiveTabClasses),this.hasActiveTabClass&&t.classList.add(...this.activeTabClasses)):(a.classList.add("hidden"),this.hasActiveTabClass&&t.classList.remove(...this.activeTabClasses),this.hasInactiveTabClass&&t.classList.add(...this.inactiveTabClasses))})}get tabsCount(){return this.tabTargets.length}get anchor(){return document.URL.split("#").length>1?document.URL.split("#")[1]:null}};s(h,"classes",["activeTab","inactiveTab"]),s(h,"targets",["tab","panel"]),s(h,"values",{index:0,updateAnchor:Boolean});var k=require("@hotwired/stimulus");var m=class extends k.Controller{toggle(t){this.openValue=!this.openValue}hide(){this.openValue=!1}show(){this.openValue=!0}openValueChanged(){this.toggleableTargets.forEach(t=>{l(t,this.openValue)})}};s(m,"targets",["toggleable"]),s(m,"values",{open:{type:Boolean,default:!1}});var B=require("@hotwired/stimulus");var T=class extends B.Controller{openValueChanged(){l(this.contentTarget,this.openValue),this.shouldAutoDismiss&&this.scheduleDismissal()}show(t){this.shouldAutoDismiss&&this.scheduleDismissal(),this.openValue=!0}hide(){this.openValue=!1}toggle(){this.openValue=!this.openValue}get shouldAutoDismiss(){return this.openValue&&this.hasDismissAfterValue}scheduleDismissal(){this.hasDismissAfterValue&&(this.cancelDismissal(),this.timeoutId=setTimeout(()=>{this.hide(),this.timeoutId=void 0},this.dismissAfterValue))}cancelDismissal(){typeof this.timeoutId=="number"&&(clearTimeout(this.timeoutId),this.timeoutId=void 0)}};s(T,"targets",["content"]),s(T,"values",{dismissAfter:Number,open:{type:Boolean,default:!1}});var v=class extends u{openValueChanged(){l(this.overlayTarget,this.openValue),l(this.menuTarget,this.openValue)}};s(v,"targets",["menu","overlay"]);var $=require("@hotwired/stimulus");var b=class extends $.Controller{update(){this.preview=this.colorTarget.value}set preview(t){this.previewTarget.style[this.styleValue]=t;let e=this._getContrastYIQ(t);this.styleValue==="color"?this.previewTarget.style.backgroundColor=e:this.previewTarget.style.color=e}_getContrastYIQ(t){t=t.replace("#","");let e=128,a=parseInt(t.substr(0,2),16),i=parseInt(t.substr(2,2),16),o=parseInt(t.substr(4,2),16);return(a*299+i*587+o*114)/1e3>=e?"#000":"#fff"}};s(b,"targets",["preview","color"]),s(b,"values",{style:{type:String,default:"backgroundColor"}});
