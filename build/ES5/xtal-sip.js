(function(){var a=function(a){function b(){return babelHelpers.classCallCheck(this,b),babelHelpers.possibleConstructorReturn(this,(b.__proto__||Object.getPrototypeOf(b)).apply(this,arguments))}return babelHelpers.inherits(b,a),babelHelpers.createClass(b,[{key:'replaceAll',value:function(a,b,c){return a.replace(new RegExp(b,'g'),c)}},{key:'qsa',value:function(a,b){return[].slice.call((b?b:this).querySelectorAll(a))}},{key:'get_h',value:function(){for(var a=this.parentElement;a;){if(a.shadowRoot)return a.shadowRoot;a=a.parentElement}return document.body}},{key:'process_h',value:function(a){if(a){var c=b._lookupMap;for(var d in b._alreadyAdded)delete c[d];for(var e in b._alreadyAdded={},c)if(!b._alreadyAdded[e]){var f=b.getLookup(e);if(f.preemptive){b.loadDependency(e);continue}a.querySelector(e)&&b.loadDependency(e)}}}},{key:'connectedCallback',value:function(){var a=this;b._lookupMap||(b._lookupMap={},this.qsa('link[rel-ish="preload"]',document.head).forEach(function(b){var c=void 0!==b.dataset.async,d=b.getAttribute('href');b.dataset.tags.split(',').forEach(function(c){var e=d,f=0;c.split('-').forEach(function(b){e=a.replaceAll(e,'\\{'+f+'\\}',b),f++});var g=b.dataset.base;if(!g){var h=b.dataset.baseRef;h&&(g=document.getElementById(h).dataset.base)}g||(g=''),e=g+e;var i=document.createElement('link');i.href=e,i.rel='preload',i.as=b.as,i.dataset.tag=c,Object.assign(i.dataset,b.dataset),document.head.appendChild(i)})}),this.qsa('link[rel="preload"][data-tag]',document.head).forEach(function(a){var c=a.dataset.tag,d={path:a.getAttribute('href'),async:void 0!==a.dataset.async,isScript:'script'===a.as,preemptive:void 0!==a.dataset.preemptive,element:a},e=b._lookupMap[c];if(!e)b._lookupMap[c]=[d];else if(b._tieBreaker){var f=[e[0],d],g=b._tieBreaker(c,f);b._lookupMap[c]=[g]}}));var c=this.getAttribute('load');c?c.split(',').forEach(function(a){b.loadDependency(a)}):this.process_h(this.parentElement)}}],[{key:'getLookup',value:function(a){var c=b._lookupMap[a];if(c)if(1<c.length)throw'Duplicate tagname found: '+a;else return c[0]}},{key:'loadDependencies',value:function(a){a.forEach(function(a){return b.loadDependency(a)})}},{key:'loadDependency',value:function(a){b._alreadyAdded[a]=!0;var c=this.getLookup(a);if(c&&!b._alreadyLoaded[c.path]&&!customElements.get(a)){var d;c.isScript?(d=document.createElement('script'),d.src=c.path):(d=document.createElement('link'),d.setAttribute('rel','import'),d.setAttribute('href',c.path)),c.async&&d.setAttribute('async',''),setTimeout(function(){document.head.appendChild(d)},50)}}},{key:'is',get:function(){return'xtal-sip'}}]),b}(HTMLElement);a._alreadyAdded={},a._alreadyLoaded={},a.useJITLoading=!1;var b={};document.head.dispatchEvent(new CustomEvent('xtal-sip-init',{detail:b})),a._tieBreaker=b.tieBreaker,customElements.define('xtal-sip',a),setTimeout(function(){var a=document.createElement('xtal-sip');a.setAttribute('load','dom-bind'),document.body.appendChild(a)},50)})();