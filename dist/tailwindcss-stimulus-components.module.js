var v=Object.defineProperty;var V=(t,e,i)=>e in t?v(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i;var s=(t,e,i)=>(V(t,typeof e!="symbol"?e+"":e,i),i);import{Controller as y}from"@hotwired/stimulus";async function a(t,e){e?n(t):l(t)}async function n(t){let e=t.dataset.transitionEnter||"enter",i=t.dataset.transitionEnterFrom||"enter-from",o=t.dataset.transitionEnterTo||"enter-to";t.classList.add(...e.split(" ")),t.classList.add(...i.split(" ")),t.classList.remove(...o.split(" ")),t.classList.remove("hidden"),await T(),t.classList.remove(...i.split(" ")),t.classList.add(...o.split(" "));try{await x(t)}finally{t.classList.remove(...e.split(" "))}}async function l(t){let e=t.dataset.transitionLeave||"leave",i=t.dataset.transitionLeaveFrom||"leave-from",o=t.dataset.transitionLeaveTo||"leave-to";t.classList.add(...e.split(" ")),t.classList.add(...i.split(" ")),t.classList.remove(...o.split(" ")),await T(),t.classList.remove(...i.split(" ")),t.classList.add(...o.split(" "));try{await x(t)}finally{t.classList.remove(...e.split(" ")),t.classList.add("hidden")}}function T(){return new Promise(t=>{requestAnimationFrame(()=>{requestAnimationFrame(t)})})}function x(t){return Promise.all(t.getAnimations().map(e=>e.finished))}var p=class extends y{connect(){setTimeout(()=>{n(this.element)},this.showDelayValue),this.hasDismissAfterValue&&setTimeout(()=>{this.close()},this.dismissAfterValue)}close(){l(this.element).then(()=>{this.element.remove()})}};s(p,"values",{dismissAfter:Number,showDelay:{type:Number,default:0},removeDelay:{type:Number,default:1100}});import{Controller as C}from"@hotwired/stimulus";var h=class extends C{connect(){this.timeout=null}save(){clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.statusTarget.textContent=this.submittingTextValue,this.formTarget.requestSubmit()},this.submitDurationValue)}success(){this.setStatus(this.successTextValue)}error(){this.setStatus(this.errorTextValue)}setStatus(t){this.statusTarget.textContent=t,this.timeout=setTimeout(()=>{this.statusTarget.textContent=""},this.statusDurationValue)}};s(h,"targets",["form","status"]),s(h,"values",{submitDuration:{type:Number,default:1e3},statusDuration:{type:Number,default:2e3},submittingText:{type:String,default:"Saving..."},successText:{type:String,default:"Saved!"},errorText:{type:String,default:"Unable to save."}});import{Controller as w}from"@hotwired/stimulus";var d=class extends w{update(){this.preview=this.colorTarget.value}set preview(t){this.previewTarget.style[this.styleValue]=t;let e=this._getContrastYIQ(t);this.styleValue==="color"?this.previewTarget.style.backgroundColor=e:this.previewTarget.style.color=e}_getContrastYIQ(t){t=t.replace("#","");let e=128,i=parseInt(t.substr(0,2),16),o=parseInt(t.substr(2,2),16),b=parseInt(t.substr(4,2),16);return(i*299+o*587+b*114)/1e3>=e?"#000":"#fff"}};s(d,"targets",["preview","color"]),s(d,"values",{style:{type:String,default:"backgroundColor"}});import{Controller as I}from"@hotwired/stimulus";var r=class extends I{connect(){this.hasButtonTarget&&(this.buttonTarget.addEventListener("keydown",this._onMenuButtonKeydown),this.buttonTarget.setAttribute("aria-haspopup","true"))}disconnect(){this.hasButtonTarget&&(this.buttonTarget.removeEventListener("keydown",this._onMenuButtonKeydown),this.buttonTarget.removeAttribute("aria-haspopup"))}openValueChanged(){a(this.menuTarget,this.openValue),this.openValue===!0&&this.hasMenuItemTarget&&this.menuItemTargets[0].focus()}show(){this.openValue=!0}hide(t){t.target.nodeType&&this.element.contains(t.target)===!1&&this.openValue&&(this.openValue=!1)}toggle(){this.openValue=!this.openValue}nextItem(){let t=Math.min(this.currentItemIndex+1,this.menuItemTargets.length-1);this.menuItemTargets[t].focus()}previousItem(){let t=Math.max(this.currentItemIndex-1,0);this.menuItemTargets[t].focus()}get currentItemIndex(){return this.menuItemTargets.indexOf(document.activeElement)}};s(r,"targets",["menu","button","menuItem"]),s(r,"values",{open:Boolean,default:!1});import{Controller as L}from"@hotwired/stimulus";var c=class extends L{disconnect(){this.close()}open(){this.openValue=!0}close(){this.openValue=!1}closeBackground(t){t.target===this.backgroundTarget&&this.close()}async openValueChanged(){this.openValue?(this.containerTarget.focus(),this.lockScroll(),n(this.backgroundTarget),n(this.containerTarget)):(l(this.containerTarget),await l(this.backgroundTarget),this.unlockScroll())}lockScroll(){this.restoreScrollValue&&(this.saveScrollPosition(),document.body.style.top=`-${this.scrollPosition}px`);let t=window.innerWidth-document.documentElement.clientWidth;document.body.style.paddingRight=`${t}px`,document.body.classList.add("fixed","inset-x-0","overflow-hidden")}unlockScroll(){document.body.style.paddingRight=null,document.body.classList.remove("fixed","inset-x-0","overflow-hidden"),this.restoreScrollValue&&(this.restoreScrollPosition(),document.body.style.top=null)}saveScrollPosition(){this.scrollPosition=window.pageYOffset||document.body.scrollTop}restoreScrollPosition(){this.scrollPosition!==void 0&&(document.documentElement.scrollTop=this.scrollPosition)}};s(c,"targets",["container","background"]),s(c,"values",{open:{type:Boolean,default:!1},restoreScroll:{type:Boolean,default:!0}});import{Controller as S}from"@hotwired/stimulus";var m=class extends S{openValueChanged(){a(this.contentTarget,this.openValue),this.shouldAutoDismiss&&this.scheduleDismissal()}show(t){this.shouldAutoDismiss&&this.scheduleDismissal(),this.openValue=!0}hide(){this.openValue=!1}toggle(){this.openValue=!this.openValue}get shouldAutoDismiss(){return this.openValue&&this.hasDismissAfterValue}scheduleDismissal(){this.hasDismissAfterValue&&(this.cancelDismissal(),this.timeoutId=setTimeout(()=>{this.hide(),this.timeoutId=void 0},this.dismissAfterValue))}cancelDismissal(){typeof this.timeoutId=="number"&&(clearTimeout(this.timeoutId),this.timeoutId=void 0)}};s(m,"targets",["content"]),s(m,"values",{dismissAfter:Number,open:{type:Boolean,default:!1}});var g=class extends r{openValueChanged(){a(this.overlayTarget,this.openValue),a(this.menuTarget,this.openValue),this.hasCloseTarget&&a(this.closeTarget,this.openValue)}};s(g,"targets",["menu","overlay","close"]);import{Controller as A}from"@hotwired/stimulus";var u=class extends A{connect(){this.anchor&&(this.indexValue=this.tabTargets.findIndex(t=>t.id===this.anchor)),this.showTab()}change(t){t.currentTarget.tagName==="SELECT"?this.indexValue=t.currentTarget.selectedIndex:t.currentTarget.dataset.index?this.indexValue=t.currentTarget.dataset.index:t.currentTarget.dataset.id?this.indexValue=this.tabTargets.findIndex(e=>e.id==t.currentTarget.dataset.id):this.indexValue=this.tabTargets.indexOf(t.currentTarget),window.dispatchEvent(new CustomEvent("tsc:tab-change"))}nextTab(){this.indexValue=Math.min(this.indexValue+1,this.tabsCount-1)}previousTab(){this.indexValue=Math.max(this.indexValue-1,0)}firstTab(){this.indexValue=0}lastTab(){this.indexValue=this.tabsCount-1}indexValueChanged(){this.showTab(),this.updateAnchorValue&&(location.hash=this.tabTargets[this.indexValue].id)}showTab(){this.panelTargets.forEach((t,e)=>{let i=this.tabTargets[e];e===this.indexValue?(t.classList.remove("hidden"),this.hasInactiveTabClass&&i?.classList?.remove(...this.inactiveTabClasses),this.hasActiveTabClass&&i?.classList?.add(...this.activeTabClasses)):(t.classList.add("hidden"),this.hasActiveTabClass&&i?.classList?.remove(...this.activeTabClasses),this.hasInactiveTabClass&&i?.classList?.add(...this.inactiveTabClasses))}),this.hasSelectTarget&&(this.selectTarget.selectedIndex=this.indexValue)}get tabsCount(){return this.tabTargets.length}get anchor(){return document.URL.split("#").length>1?document.URL.split("#")[1]:null}};s(u,"classes",["activeTab","inactiveTab"]),s(u,"targets",["tab","panel","select"]),s(u,"values",{index:0,updateAnchor:Boolean});import{Controller as D}from"@hotwired/stimulus";var f=class extends D{toggle(t){this.openValue=!this.openValue,this.animate()}toggleInput(t){this.openValue=t.target.checked,this.animate()}hide(){this.openValue=!1,this.animate()}show(){this.openValue=!0,this.animate()}animate(){this.toggleableTargets.forEach(t=>{a(t,this.openValue)})}};s(f,"targets",["toggleable"]),s(f,"values",{open:{type:Boolean,default:!1}});export{p as Alert,h as Autosave,d as ColorPreview,r as Dropdown,c as Modal,m as Popover,g as Slideover,u as Tabs,f as Toggle};
