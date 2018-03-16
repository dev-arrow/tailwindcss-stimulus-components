var C=Object.defineProperty;var V=(t,e,s)=>e in t?C(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var a=(t,e,s)=>(V(t,typeof e!="symbol"?e+"":e,s),s);import{Controller as y}from"@hotwired/stimulus";async function r(t,e,s={}){e?T(t,s):b(t,s)}async function T(t,e={}){let s=t.dataset.transitionEnter||e.enter||"enter",i=t.dataset.transitionEnterFrom||e.enterFrom||"enter-from",o=t.dataset.transitionEnterTo||e.enterTo||"enter-to",g=t.dataset.toggleClass||e.toggleClass||"hidden";t.classList.add(...s.split(" ")),t.classList.add(...i.split(" ")),t.classList.remove(...o.split(" ")),t.classList.remove(...g.split(" ")),await v(),t.classList.remove(...i.split(" ")),t.classList.add(...o.split(" "));try{await x(t)}finally{t.classList.remove(...s.split(" "))}}async function b(t,e={}){let s=t.dataset.transitionLeave||e.leave||"leave",i=t.dataset.transitionLeaveFrom||e.leaveFrom||"leave-from",o=t.dataset.transitionLeaveTo||e.leaveTo||"leave-to",g=t.dataset.toggleClass||e.toggle||"hidden";t.classList.add(...s.split(" ")),t.classList.add(...i.split(" ")),t.classList.remove(...o.split(" ")),await v(),t.classList.remove(...i.split(" ")),t.classList.add(...o.split(" "));try{await x(t)}finally{t.classList.remove(...s.split(" ")),t.classList.add(...g.split(" "))}}function v(){return new Promise(t=>{requestAnimationFrame(()=>{requestAnimationFrame(t)})})}function x(t){return Promise.all(t.getAnimations().map(e=>e.finished))}var p=class extends y{connect(){setTimeout(()=>{T(this.element)},this.showDelayValue),this.hasDismissAfterValue&&setTimeout(()=>{this.close()},this.dismissAfterValue)}close(){b(this.element).then(()=>{this.element.remove()})}};a(p,"values",{dismissAfter:Number,showDelay:{type:Number,default:0}});import{Controller as I}from"@hotwired/stimulus";var h=class extends I{connect(){this.timeout=null}save(){clearTimeout(this.timeout),this.timeout=setTimeout(()=>{this.statusTarget.textContent=this.submittingTextValue,this.formTarget.requestSubmit()},this.submitDurationValue)}success(){this.setStatus(this.successTextValue)}error(){this.setStatus(this.errorTextValue)}setStatus(t){this.statusTarget.textContent=t,this.timeout=setTimeout(()=>{this.statusTarget.textContent=""},this.statusDurationValue)}};a(h,"targets",["form","status"]),a(h,"values",{submitDuration:{type:Number,default:1e3},statusDuration:{type:Number,default:2e3},submittingText:{type:String,default:"Saving..."},successText:{type:String,default:"Saved!"},errorText:{type:String,default:"Unable to save."}});import{Controller as L}from"@hotwired/stimulus";var u=class extends L{update(){this.preview=this.colorTarget.value}set preview(t){this.previewTarget.style[this.styleValue]=t;let e=this._getContrastYIQ(t);this.styleValue==="color"?this.previewTarget.style.backgroundColor=e:this.previewTarget.style.color=e}_getContrastYIQ(t){t=t.replace("#","");let e=128,s=parseInt(t.substr(0,2),16),i=parseInt(t.substr(2,2),16),o=parseInt(t.substr(4,2),16);return(s*299+i*587+o*114)/1e3>=e?"#000":"#fff"}};a(u,"targets",["preview","color"]),a(u,"values",{style:{type:String,default:"backgroundColor"}});import{Controller as w}from"@hotwired/stimulus";var l=class extends w{connect(){document.addEventListener("turbo:before-cache",this.beforeCache.bind(this))}disconnect(){document.removeEventListener("turbo:before-cache",this.beforeCache.bind(this))}openValueChanged(){r(this.menuTarget,this.openValue,this.transitionOptions),this.openValue===!0&&this.hasMenuItemTarget&&this.menuItemTargets[0].focus()}show(){this.openValue=!0}close(){this.openValue=!1}hide(t){this.closeOnClickOutsideValue&&t.target.nodeType&&this.element.contains(t.target)===!1&&this.openValue&&(this.openValue=!1),this.closeOnEscapeValue&&t.key==="Escape"&&this.openValue&&(this.openValue=!1)}toggle(){this.openValue=!this.openValue}nextItem(t){t.preventDefault(),this.menuItemTargets[this.nextIndex].focus()}previousItem(t){t.preventDefault(),this.menuItemTargets[this.previousIndex].focus()}get currentItemIndex(){return this.menuItemTargets.indexOf(document.activeElement)}get nextIndex(){return Math.min(this.currentItemIndex+1,this.menuItemTargets.length-1)}get previousIndex(){return Math.max(this.currentItemIndex-1,0)}get transitionOptions(){return{enter:this.hasEnterClass?this.enterClass:"transition ease-out duration-100",enterFrom:this.hasEnterFromClass?this.enterFromClass:"transform opacity-0 scale-95",enterTo:this.hasEnterToClass?this.enterToClass:"transform opacity-100 scale-100",leave:this.hasLeaveClass?this.leaveClass:"transition ease-in duration-75",leaveFrom:this.hasLeaveFromClass?this.leaveFromClass:"transform opacity-100 scale-100",leaveTo:this.hasLeaveToClass?this.leaveToClass:"transform opacity-0 scale-95",toggleClass:this.hasToggleClass?this.toggleClass:"hidden"}}beforeCache(){this.openValue=!1,this.menuTarget.classList.add("hidden")}};a(l,"targets",["menu","button","menuItem"]),a(l,"values",{open:{type:Boolean,default:!1},closeOnEscape:{type:Boolean,default:!0},closeOnClickOutside:{type:Boolean,default:!0}}),a(l,"classes",["enter","enterFrom","enterTo","leave","leaveFrom","leaveTo","toggle"]);import{Controller as A}from"@hotwired/stimulus";var c=class extends A{connect(){this.openValue&&this.open(),document.addEventListener("turbo:before-cache",this.beforeCache.bind(this))}disconnect(){document.removeEventListener("turbo:before-cache",this.beforeCache.bind(this))}open(){this.dialogTarget.showModal()}close(){this.dialogTarget.setAttribute("closing",""),Promise.all(this.dialogTarget.getAnimations().map(t=>t.finished)).then(()=>{this.dialogTarget.removeAttribute("closing"),this.dialogTarget.close()})}backdropClose(t){t.target.nodeName=="DIALOG"&&this.close()}show(){this.dialogTarget.show()}hide(){this.close()}beforeCache(){this.close()}};a(c,"targets",["dialog"]),a(c,"values",{open:Boolean});import{Controller as D}from"@hotwired/stimulus";var d=class extends D{openValueChanged(){r(this.contentTarget,this.openValue),this.shouldAutoDismiss&&this.scheduleDismissal()}show(t){this.shouldAutoDismiss&&this.scheduleDismissal(),this.openValue=!0}hide(){this.openValue=!1}toggle(){this.openValue=!this.openValue}get shouldAutoDismiss(){return this.openValue&&this.hasDismissAfterValue}scheduleDismissal(){this.hasDismissAfterValue&&(this.cancelDismissal(),this.timeoutId=setTimeout(()=>{this.hide(),this.timeoutId=void 0},this.dismissAfterValue))}cancelDismissal(){typeof this.timeoutId=="number"&&(clearTimeout(this.timeoutId),this.timeoutId=void 0)}};a(d,"targets",["content"]),a(d,"values",{dismissAfter:Number,open:{type:Boolean,default:!1}});import{Controller as E}from"@hotwired/stimulus";var m=class extends E{connect(){this.openValue&&this.open(),document.addEventListener("turbo:before-cache",this.beforeCache.bind(this))}disconnect(){document.removeEventListener("turbo:before-cache",this.beforeCache.bind(this))}open(){this.dialogTarget.showModal()}close(){this.dialogTarget.setAttribute("closing",""),Promise.all(this.dialogTarget.getAnimations().map(t=>t.finished)).then(()=>{this.dialogTarget.removeAttribute("closing"),this.dialogTarget.close()})}backdropClose(t){t.target.nodeName=="DIALOG"&&this.close()}show(){this.open()}hide(){this.close()}beforeCache(){this.close()}};a(m,"targets",["dialog"]),a(m,"values",{open:Boolean});import{Controller as S}from"@hotwired/stimulus";var n=class extends S{initialize(){this.anchor&&(this.indexValue=this.tabTargets.findIndex(t=>t.id===this.anchor))}connect(){this.showTab()}change(t){t.currentTarget.tagName==="SELECT"?this.indexValue=t.currentTarget.selectedIndex:t.currentTarget.dataset.index?this.indexValue=t.currentTarget.dataset.index:t.currentTarget.dataset.id?this.indexValue=this.tabTargets.findIndex(e=>e.id==t.currentTarget.dataset.id):this.indexValue=this.tabTargets.indexOf(t.currentTarget)}nextTab(){this.indexValue=Math.min(this.indexValue+1,this.tabsCount-1)}previousTab(){this.indexValue=Math.max(this.indexValue-1,0)}firstTab(){this.indexValue=0}lastTab(){this.indexValue=this.tabsCount-1}indexValueChanged(){if(this.showTab(),this.dispatch("tab-change",{target:this.tabTargets[this.indexValue],detail:{activeIndex:this.indexValue}}),this.updateAnchorValue){let t=this.tabTargets[this.indexValue].id;if(this.scrollToAnchorValue)location.hash=t;else{let s=window.location.href.split("#")[0]+"#"+t;typeof Turbo<"u"?Turbo.navigator.history.replace(new URL(s)):history.replaceState({},document.title,s)}}}showTab(){this.panelTargets.forEach((t,e)=>{let s=this.tabTargets[e];e===this.indexValue?(t.classList.remove("hidden"),s.ariaSelected="true",s.dataset.active=!0,this.hasInactiveTabClass&&s?.classList?.remove(...this.inactiveTabClasses),this.hasActiveTabClass&&s?.classList?.add(...this.activeTabClasses)):(t.classList.add("hidden"),s.ariaSelected=null,delete s.dataset.active,this.hasActiveTabClass&&s?.classList?.remove(...this.activeTabClasses),this.hasInactiveTabClass&&s?.classList?.add(...this.inactiveTabClasses))}),this.hasSelectTarget&&(this.selectTarget.selectedIndex=this.indexValue),this.scrollActiveTabIntoViewValue&&this.scrollToActiveTab()}scrollToActiveTab(){let t=this.element.querySelector("[aria-selected]");t&&t.scrollIntoView({inline:"center"})}get tabsCount(){return this.tabTargets.length}get anchor(){return document.URL.split("#").length>1?document.URL.split("#")[1]:null}};a(n,"classes",["activeTab","inactiveTab"]),a(n,"targets",["tab","panel","select"]),a(n,"values",{index:0,updateAnchor:Boolean,scrollToAnchor:Boolean,scrollActiveTabIntoView:Boolean});import{Controller as F}from"@hotwired/stimulus";var f=class extends F{toggle(t){this.openValue=!this.openValue,this.animate()}toggleInput(t){this.openValue=t.target.checked,this.animate()}hide(){this.openValue=!1,this.animate()}show(){this.openValue=!0,this.animate()}animate(){this.toggleableTargets.forEach(t=>{r(t,this.openValue)})}};a(f,"targets",["toggleable"]),a(f,"values",{open:{type:Boolean,default:!1}});export{p as Alert,h as Autosave,u as ColorPreview,l as Dropdown,c as Modal,d as Popover,m as Slideover,n as Tabs,f as Toggle};
