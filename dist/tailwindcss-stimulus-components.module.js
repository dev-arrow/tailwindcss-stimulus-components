var I=Object.defineProperty;var S=(t,e,s)=>e in t?I(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var a=(t,e,s)=>(S(t,typeof e!="symbol"?e+"":e,s),s);import{Controller as L}from"@hotwired/stimulus";var f=new Map;async function o(t,e,s=null){e?await l(t,s):await u(t,s)}async function l(t,e=null){try{t.classList.remove("hidden"),await C("enter",t,e)}finally{y(t,e)}}async function u(t,e=null){try{await C("leave",t,e)}finally{t.classList.add("hidden"),y(t,e)}}async function C(t,e,s){y(e,s);let i=w(t,e,s);f.set(e,t),c(e,i.transition),c(e,i.start),await A(),b(e,i.start),c(e,i.end),await D(e),b(e,i.end),b(e,i.transition),"originalClass"in e.dataset&&e.dataset.originalClass!==""&&c(e,e.dataset.originalClass.split(" ")),f.delete(e)}function w(t,e,s){let i=e.dataset,d=s?`${s}-${t}`:t,r=`transition${t.charAt(0).toUpperCase()+t.slice(1)}`;return{transition:i[r]?i[r].split(" "):[d],start:i[`${r}From`]?i[`${r}From`].split(" "):[`${d}-from`],end:i[`${r}To`]?i[`${r}To`].split(" "):[`${d}-to`]}}function c(t,e){t.classList.add(...e)}function b(t,e){t.classList.remove(...e)}function A(){return new Promise(t=>{requestAnimationFrame(()=>{requestAnimationFrame(t)})})}function D(t){return Promise.all(t.getAnimations().map(e=>e.finished))}async function y(t,e=null){if("originalClass"in t.dataset||(t.dataset.originalClass=[...t.classList].filter(s=>s!=="hidden").join(" ")),f.has(t)){let s=f.get(t),i=w(s,t,e);b(t,i.transition+i.start+i.end),"originalClass"in t.dataset&&t.dataset.originalClass!==""&&c(t,t.dataset.originalClass.split(" ")),f.delete(t)}}var v=class extends L{connect(){setTimeout(()=>{l(this.element)},this.showDelayValue),this.hasDismissAfterValue&&setTimeout(()=>{this.close()},this.dismissAfterValue)}close(){u(this.element).then(()=>{this.element.remove()})}};a(v,"values",{dismissAfter:Number,showDelay:{type:Number,default:0},removeDelay:{type:Number,default:1100}});import{Controller as k}from"@hotwired/stimulus";var p=class extends k{connect(){this.timeout=null}save(){clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.statusTarget.textContent=this.submittingTextValue,this.formTarget.requestSubmit()},this.submitDurationValue)}success(){this.setStatus(this.successTextValue)}error(){this.setStatus(this.errorTextValue)}setStatus(t){this.statusTarget.textContent=t,this.timeout=setTimeout(()=>{this.statusTarget.textContent=""},this.statusDurationValue)}};a(p,"targets",["form","status"]),a(p,"values",{submitDuration:{type:Number,default:1e3},statusDuration:{type:Number,default:2e3},submittingText:{type:String,default:"Saving..."},successText:{type:String,default:"Saved!"},errorText:{type:String,default:"Unable to save."}});import{Controller as P}from"@hotwired/stimulus";var g=class extends P{update(){this.preview=this.colorTarget.value}set preview(t){this.previewTarget.style[this.styleValue]=t;let e=this._getContrastYIQ(t);this.styleValue==="color"?this.previewTarget.style.backgroundColor=e:this.previewTarget.style.color=e}_getContrastYIQ(t){t=t.replace("#","");let e=128,s=parseInt(t.substr(0,2),16),i=parseInt(t.substr(2,2),16),d=parseInt(t.substr(4,2),16);return(s*299+i*587+d*114)/1e3>=e?"#000":"#fff"}};a(g,"targets",["preview","color"]),a(g,"values",{style:{type:String,default:"backgroundColor"}});import{Controller as B}from"@hotwired/stimulus";var n=class extends B{connect(){this.hasButtonTarget&&(this.buttonTarget.addEventListener("keydown",this._onMenuButtonKeydown),this.buttonTarget.setAttribute("aria-haspopup","true"))}disconnect(){this.hasButtonTarget&&(this.buttonTarget.removeEventListener("keydown",this._onMenuButtonKeydown),this.buttonTarget.removeAttribute("aria-haspopup"))}openValueChanged(){o(this.menuTarget,this.openValue),this.openValue===!0&&this.hasMenuItemTarget&&this.menuItemTargets[0].focus()}show(){this.openValue=!0}hide(t){t.target.nodeType&&this.element.contains(t.target)===!1&&this.openValue&&(this.openValue=!1)}toggle(){this.openValue=!this.openValue}nextItem(){let t=Math.min(this.currentItemIndex+1,this.menuItemTargets.length-1);this.menuItemTargets[t].focus()}previousItem(){let t=Math.max(this.currentItemIndex-1,0);this.menuItemTargets[t].focus()}get currentItemIndex(){return this.menuItemTargets.indexOf(document.activeElement)}};a(n,"targets",["menu","button","menuItem"]),a(n,"values",{open:Boolean,default:!1});import{Controller as E}from"@hotwired/stimulus";var m=class extends E{disconnect(){this.close()}open(){this.openValue=!0}close(){this.openValue=!1}closeBackground(t){t.target===this.backgroundTarget&&this.close()}openValueChanged(){this.openValue?(this.containerTarget.focus(),this.lockScroll(),l(this.backgroundTarget),l(this.containerTarget)):(this.unlockScroll(),u(this.containerTarget),u(this.backgroundTarget))}lockScroll(){let t=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=`${t}px`,document.body.classList.add("fixed","inset-x-0","overflow-hidden"),this.restoreScrollValue&&(this.saveScrollPosition(),document.body.style.top=`-${this.scrollPosition}px`)}unlockScroll(){document.body.style.paddingRight=null,document.body.classList.remove("fixed","inset-x-0","overflow-hidden"),this.restoreScrollValue&&(this.restoreScrollPosition(),document.body.style.top=null)}saveScrollPosition(){this.scrollPosition=window.pageYOffset||document.body.scrollTop}restoreScrollPosition(){this.scrollPosition!==void 0&&(document.documentElement.scrollTop=this.scrollPosition)}};a(m,"targets",["container","background"]),a(m,"values",{open:{type:Boolean,default:!1},restoreScroll:{type:Boolean,default:!0}});import{Controller as $}from"@hotwired/stimulus";var T=class extends ${openValueChanged(){o(this.contentTarget,this.openValue),this.shouldAutoDismiss&&this.scheduleDismissal()}show(t){this.shouldAutoDismiss&&this.scheduleDismissal(),this.openValue=!0}hide(){this.openValue=!1}toggle(){this.openValue=!this.openValue}get shouldAutoDismiss(){return this.openValue&&this.hasDismissAfterValue}scheduleDismissal(){this.hasDismissAfterValue&&(this.cancelDismissal(),this.timeoutId=setTimeout(()=>{this.hide(),this.timeoutId=void 0},this.dismissAfterValue))}cancelDismissal(){typeof this.timeoutId=="number"&&(clearTimeout(this.timeoutId),this.timeoutId=void 0)}};a(T,"targets",["content"]),a(T,"values",{dismissAfter:Number,open:{type:Boolean,default:!1}});var V=class extends n{openValueChanged(){o(this.overlayTarget,this.openValue),o(this.menuTarget,this.openValue),this.hasCloseTarget&&o(this.closeTarget,this.openValue)}};a(V,"targets",["menu","overlay","close"]);import{Controller as M}from"@hotwired/stimulus";var h=class extends M{connect(){this.anchor&&(this.indexValue=this.tabTargets.findIndex(t=>t.id===this.anchor)),this.showTab()}change(t){t.currentTarget.tagName==="SELECT"?this.indexValue=t.currentTarget.selectedIndex:t.currentTarget.dataset.index?this.indexValue=t.currentTarget.dataset.index:t.currentTarget.dataset.id?this.indexValue=this.tabTargets.findIndex(e=>e.id==t.currentTarget.dataset.id):this.indexValue=this.tabTargets.indexOf(t.currentTarget),window.dispatchEvent(new CustomEvent("tsc:tab-change"))}nextTab(){this.indexValue=Math.min(this.indexValue+1,this.tabsCount-1)}previousTab(){this.indexValue=Math.max(this.indexValue-1,0)}firstTab(){this.indexValue=0}lastTab(){this.indexValue=this.tabsCount-1}indexValueChanged(){this.showTab(),this.updateAnchorValue&&(location.hash=this.tabTargets[this.indexValue].id)}showTab(){this.panelTargets.forEach((t,e)=>{let s=this.tabTargets[e];console.log(s),e===this.indexValue?(t.classList.remove("hidden"),this.hasInactiveTabClass&&s?.classList?.remove(...this.inactiveTabClasses),this.hasActiveTabClass&&s?.classList?.add(...this.activeTabClasses)):(t.classList.add("hidden"),this.hasActiveTabClass&&s?.classList?.remove(...this.activeTabClasses),this.hasInactiveTabClass&&s?.classList?.add(...this.inactiveTabClasses))}),this.hasSelectTarget&&(this.selectTarget.selectedIndex=this.indexValue)}get tabsCount(){return this.tabTargets.length}get anchor(){return document.URL.split("#").length>1?document.URL.split("#")[1]:null}};a(h,"classes",["activeTab","inactiveTab"]),a(h,"targets",["tab","panel","select"]),a(h,"values",{index:0,updateAnchor:Boolean});import{Controller as W}from"@hotwired/stimulus";var x=class extends W{toggle(t){this.openValue=!this.openValue,this.animate()}hide(){this.openValue=!1,this.animate()}show(){this.openValue=!0,this.animate()}animate(){this.toggleableTargets.forEach(t=>{o(t,this.openValue)})}};a(x,"targets",["toggleable"]),a(x,"values",{open:{type:Boolean,default:!1}});export{v as Alert,p as Autosave,g as ColorPreview,n as Dropdown,m as Modal,T as Popover,V as Slideover,h as Tabs,x as Toggle};
