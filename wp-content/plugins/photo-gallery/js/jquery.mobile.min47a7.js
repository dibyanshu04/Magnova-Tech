/*! jQuery Mobile v1.4.5 | Copyright 2010, 2014 jQuery Foundation, Inc. | jquery.org/license */

!function(e,t,n){"function"==typeof define&&define.amd?define(["jquery"],function(i){return n(i,e,t),i.mobile}):n(e.jQuery,e,t)}(this,document,function(e,t,n,i){!function(e,t,i){"$:nomunge";function o(e){return e=e||location.href,"#"+e.replace(/^[^#]*#?(.*)$/,"$1")}var a,r="hashchange",s=n,l=e.event.special,c=s.documentMode,u="on"+r in t&&(void 0===c||c>7);e.fn[r]=function(e){return e?this.bind(r,e):this.trigger(r)},e.fn[r].delay=50,l[r]=e.extend(l[r],{setup:function(){if(u)return!1;e(a.start)},teardown:function(){if(u)return!1;e(a.stop)}}),a=function(){function n(){var a=o(),s=h(l);a!==l?(d(l=a,s),e(t).trigger(r)):s!==l&&(location.href=location.href.replace(/#.*/,"")+s),i=setTimeout(n,e.fn[r].delay)}var i,a={},l=o(),c=function(e){return e},d=c,h=c;return a.start=function(){i||n()},a.stop=function(){i&&clearTimeout(i),i=void 0},t.attachEvent&&!t.addEventListener&&!u&&function(){var t,i;a.start=function(){t||(i=e.fn[r].src,i=i&&i+o(),t=e('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){i||d(o()),n()}).attr("src",i||"javascript:0").insertAfter("body")[0].contentWindow,s.onpropertychange=function(){try{"title"===event.propertyName&&(t.document.title=s.title)}catch(e){}})},a.stop=c,h=function(){return o(t.location.href)},d=function(n,i){var o=t.document,a=e.fn[r].domain;n!==i&&(o.title=s.title,o.open(),a&&o.write('<script>document.domain="'+a+'"<\/script>'),o.close(),t.location.hash=n)}}(),a}()}(e,this),function(e){e.mobile={}}(e),function(e,t,n){e.extend(e.mobile,{version:"1.4.5",subPageUrlKey:"ui-page",hideUrlBar:!0,keepNative:":jqmData(role='none'), :jqmData(role='nojs')",activePageClass:"ui-page-active",activeBtnClass:"ui-btn-active",focusClass:"ui-focus",ajaxEnabled:!0,hashListeningEnabled:!0,linkBindingEnabled:!0,defaultPageTransition:"fade",maxTransitionWidth:!1,minScrollBack:0,defaultDialogTransition:"pop",pageLoadErrorMessage:"Error Loading Page",pageLoadErrorMessageTheme:"a",phonegapNavigationEnabled:!1,autoInitializePage:!0,pushStateEnabled:!0,ignoreContentEnabled:!1,buttonMarkup:{hoverDelay:200},dynamicBaseEnabled:!0,pageContainer:e(),allowCrossDomainPages:!1,dialogHashKey:"&ui-state=dialog"})}(e),function(e,t,n){var i={},o=e.find,a=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,r=/:jqmData\(([^)]*)\)/g;e.extend(e.mobile,{ns:"",getAttribute:function(t,n){var i;(t=t.jquery?t[0]:t)&&t.getAttribute&&(i=t.getAttribute("data-"+e.mobile.ns+n));try{i="true"===i||"false"!==i&&("null"===i?null:+i+""===i?+i:a.test(i)?JSON.parse(i):i)}catch(e){}return i},nsNormalizeDict:i,nsNormalize:function(t){return i[t]||(i[t]=e.camelCase(e.mobile.ns+t))},closestPageData:function(e){return e.closest(":jqmData(role='page'), :jqmData(role='dialog')").data("mobile-page")}}),e.fn.jqmData=function(t,n){var i;return void 0!==t&&(t&&(t=e.mobile.nsNormalize(t)),i=arguments.length<2||void 0===n?this.data(t):this.data(t,n)),i},e.jqmData=function(t,n,i){var o;return void 0!==n&&(o=e.data(t,n?e.mobile.nsNormalize(n):n,i)),o},e.fn.jqmRemoveData=function(t){return this.removeData(e.mobile.nsNormalize(t))},e.jqmRemoveData=function(t,n){return e.removeData(t,e.mobile.nsNormalize(n))},e.find=function(t,n,i,a){return t.indexOf(":jqmData")>-1&&(t=t.replace(r,"[data-"+(e.mobile.ns||"")+"$1]")),o.call(this,t,n,i,a)},e.extend(e.find,o)}(e),function(e,t){function i(t,n){var i,a,r,s=t.nodeName.toLowerCase();return"area"===s?(i=t.parentNode,a=i.name,!(!t.href||!a||"map"!==i.nodeName.toLowerCase())&&(!!(r=e("img[usemap=#"+a+"]")[0])&&o(r))):(/input|select|textarea|button|object/.test(s)?!t.disabled:"a"===s?t.href||n:n)&&o(t)}function o(t){return e.expr.filters.visible(t)&&!e(t).parents().addBack().filter(function(){return"hidden"===e.css(this,"visibility")}).length}var a=0,r=/^ui-id-\d+$/;e.ui=e.ui||{},e.extend(e.ui,{version:"c0ab71056b936627e8a7821f03c044aec6280a40",keyCode:{BACKSPACE:8,COMMA:188,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,LEFT:37,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SPACE:32,TAB:9,UP:38}}),e.fn.extend({focus:function(t){return function(n,i){return"number"==typeof n?this.each(function(){var t=this;setTimeout(function(){e(t).
focus(),i&&i.call(t)},n)}):t.apply(this,arguments)}}(e.fn.focus),scrollParent:function(){var t;return t=e.ui.ie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?this.parents().filter(function(){return/(relative|absolute|fixed)/.test(e.css(this,"position"))&&/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0):this.parents().filter(function(){return/(auto|scroll)/.test(e.css(this,"overflow")+e.css(this,"overflow-y")+e.css(this,"overflow-x"))}).eq(0),/fixed/.test(this.css("position"))||!t.length?e(this[0].ownerDocument||n):t},uniqueId:function(){return this.each(function(){this.id||(this.id="ui-id-"+ ++a)})},removeUniqueId:function(){return this.each(function(){r.test(this.id)&&e(this).removeAttr("id")})}}),e.extend(e.expr[":"],{data:e.expr.createPseudo?e.expr.createPseudo(function(t){return function(n){return!!e.data(n,t)}}):function(t,n,i){return!!e.data(t,i[3])},focusable:function(t){return i(t,!isNaN(e.attr(t,"tabindex")))},tabbable:function(t){var n=e.attr(t,"tabindex"),o=isNaN(n);return(o||n>=0)&&i(t,!o)}}),e("<a>").outerWidth(1).jquery||e.each(["Width","Height"],function(t,n){function i(t,n,i,a){return e.each(o,function(){n-=parseFloat(e.css(t,"padding"+this))||0,i&&(n-=parseFloat(e.css(t,"border"+this+"Width"))||0),a&&(n-=parseFloat(e.css(t,"margin"+this))||0)}),n}var o="Width"===n?["Left","Right"]:["Top","Bottom"],a=n.toLowerCase(),r={innerWidth:e.fn.innerWidth,innerHeight:e.fn.innerHeight,outerWidth:e.fn.outerWidth,outerHeight:e.fn.outerHeight};e.fn["inner"+n]=function(t){return void 0===t?r["inner"+n].call(this):this.each(function(){e(this).css(a,i(this,t)+"px")})},e.fn["outer"+n]=function(t,o){return"number"!=typeof t?r["outer"+n].call(this,t):this.each(function(){e(this).css(a,i(this,t,!0,o)+"px")})}}),e.fn.addBack||(e.fn.addBack=function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}),e("<a>").data("a-b","a").removeData("a-b").data("a-b")&&(e.fn.removeData=function(t){return function(n){return arguments.length?t.call(this,e.camelCase(n)):t.call(this)}}(e.fn.removeData)),e.ui.ie=!!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()),e.support.selectstart="onselectstart"in n.createElement("div"),e.fn.extend({disableSelection:function(){return this.bind((e.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(e){e.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")},zIndex:function(t){if(void 0!==t)return this.css("zIndex",t);if(this.length)for(var i,o,a=e(this[0]);a.length&&a[0]!==n;){if(("absolute"===(i=a.css("position"))||"relative"===i||"fixed"===i)&&(o=parseInt(a.css("zIndex"),10),!isNaN(o)&&0!==o))return o;a=a.parent()}return 0}}),e.ui.plugin={add:function(t,n,i){var o,a=e.ui[t].prototype;for(o in i)a.plugins[o]=a.plugins[o]||[],a.plugins[o].push([n,i[o]])},call:function(e,t,n,i){var o,a=e.plugins[t];if(a&&(i||e.element[0].parentNode&&11!==e.element[0].parentNode.nodeType))for(o=0;o<a.length;o++)e.options[a[o][0]]&&a[o][1].apply(e.element,n)}}}(e),function(e,t,i){var o=function(t,n){var i=t.parent(),o=[],a=function(){var t=e(this),n=e.mobile.toolbar&&t.data("mobile-toolbar")?t.toolbar("option"):{position:t.attr("data-"+e.mobile.ns+"position"),updatePagePadding:!1!==t.attr("data-"+e.mobile.ns+"update-page-padding")};return!("fixed"===n.position&&!0===n.updatePagePadding)},r=i.children(":jqmData(role='header')").filter(a),s=t.children(":jqmData(role='header')"),l=i.children(":jqmData(role='footer')").filter(a),c=t.children(":jqmData(role='footer')");return 0===s.length&&r.length>0&&(o=o.concat(r.toArray())),0===c.length&&l.length>0&&(o=o.concat(l.toArray())),e.each(o,function(t,i){n-=e(i).outerHeight()}),Math.max(0,n)};e.extend(e.mobile,{window:e(t),document:e(n),keyCode:e.ui.keyCode,behaviors:{},silentScroll:function(n){"number"!==e.type(n)&&(n=e.mobile.defaultHomeScroll),e.event.special.scrollstart.enabled=!1,setTimeout(function(){t.scrollTo(0,n),e.mobile.document.trigger("silentscroll",{x:0,y:n})},20),setTimeout(function(){e.event.s
pecial.scrollstart.enabled=!0},150)},getClosestBaseUrl:function(t){var n=e(t).closest(".ui-page").jqmData("url"),i=e.mobile.path.documentBase.hrefNoHash;return e.mobile.dynamicBaseEnabled&&n&&e.mobile.path.isPath(n)||(n=i),e.mobile.path.makeUrlAbsolute(n,i)},removeActiveLinkClass:function(t){!e.mobile.activeClickedLink||e.mobile.activeClickedLink.closest("."+e.mobile.activePageClass).length&&!t||e.mobile.activeClickedLink.removeClass(e.mobile.activeBtnClass),e.mobile.activeClickedLink=null},getInheritedTheme:function(e,t){for(var n,i,o=e[0],a="",r=/ui-(bar|body|overlay)-([a-z])\b/;o&&!((n=o.className||"")&&(i=r.exec(n))&&(a=i[2]));)o=o.parentNode;return a||t||"a"},enhanceable:function(e){return this.haveParents(e,"enhance")},hijackable:function(e){return this.haveParents(e,"ajax")},haveParents:function(t,n){if(!e.mobile.ignoreContentEnabled)return t;var i,o,a,r,s=t.length,l=e();for(r=0;r<s;r++){for(o=t.eq(r),a=!1,i=t[r];i;){if("false"===(i.getAttribute?i.getAttribute("data-"+e.mobile.ns+n):"")){a=!0;break}i=i.parentNode}a||(l=l.add(o))}return l},getScreenHeight:function(){return t.innerHeight||e.mobile.window.height()},resetActivePageHeight:function(t){var n=e("."+e.mobile.activePageClass),i=n.height(),a=n.outerHeight(!0);t=o(n,"number"==typeof t?t:e.mobile.getScreenHeight()),n.css("min-height",""),n.height()<t&&n.css("min-height",t-(a-i))},loading:function(){var t=this.loading._widget||e(e.mobile.loader.prototype.defaultHtml).loader(),n=t.loader.apply(t,arguments);return this.loading._widget=t,n}}),e.addDependents=function(t,n){var i=e(t),o=i.jqmData("dependents")||e();i.jqmData("dependents",e(o).add(n))},e.fn.extend({removeWithDependents:function(){e.removeWithDependents(this)},enhanceWithin:function(){var t,n={},i=e.mobile.page.prototype.keepNativeSelector(),o=this;e.mobile.nojs&&e.mobile.nojs(this),e.mobile.links&&e.mobile.links(this),e.mobile.degradeInputsWithin&&e.mobile.degradeInputsWithin(this),e.fn.buttonMarkup&&this.find(e.fn.buttonMarkup.initSelector).not(i).jqmEnhanceable().buttonMarkup(),e.fn.fieldcontain&&this.find(":jqmData(role='fieldcontain')").not(i).jqmEnhanceable().fieldcontain(),e.each(e.mobile.widgets,function(t,a){if(a.initSelector){var r=e.mobile.enhanceable(o.find(a.initSelector));r.length>0&&(r=r.not(i)),r.length>0&&(n[a.prototype.widgetName]=r)}});for(t in n)n[t][t]();return this},addDependents:function(t){e.addDependents(this,t)},getEncodedText:function(){return e("<a>").text(this.text()).html()},jqmEnhanceable:function(){return e.mobile.enhanceable(this)},jqmHijackable:function(){return e.mobile.hijackable(this)}}),e.removeWithDependents=function(t){var n=e(t);(n.jqmData("dependents")||e()).remove(),n.remove()},e.addDependents=function(t,n){var i=e(t),o=i.jqmData("dependents")||e();i.jqmData("dependents",e(o).add(n))},e.find.matches=function(t,n){return e.find(t,null,null,n)},e.find.matchesSelector=function(t,n){return e.find(n,null,null,[t]).length>0}}(e,this),function(e,i){t.matchMedia=t.matchMedia||function(e,t){var n,i=e.documentElement,o=i.firstElementChild||i.firstChild,a=e.createElement("body"),r=e.createElement("div");return r.id="mq-test-1",r.style.cssText="position:absolute;top:-100em",a.style.background="none",a.appendChild(r),function(e){return r.innerHTML='&shy;<style media="'+e+'"> #mq-test-1 { width: 42px; }</style>',i.insertBefore(a,o),n=42===r.offsetWidth,i.removeChild(a),{matches:n,media:e}}}(n),e.mobile.media=function(e){return t.matchMedia(e).matches}}(e),function(e,t){var i={touch:"ontouchend"in n};e.mobile.support=e.mobile.support||{},e.extend(e.support,i),e.extend(e.mobile.support,i)}(e),function(e,n){e.extend(e.support,{orientation:"orientation"in t&&"onorientationchange"in t})}(e),function(e,i){function o(e){var t,n=e.charAt(0).toUpperCase()+e.substr(1),o=(e+" "+c.join(n+" ")+n).split(" ");for(t in o)if(l[o[t]]!==i)return!0}function a(){var n=t,i=!(!n.document.createElementNS||!n.document.createElementNS("https://www.w3.org/2000/svg","svg").createSVGRect||n.opera&&-1===navigator.userAgent.indexOf("Chrome")),o=function(t){t&&i||e("html").addClass("ui-nosvg")},a=new n.Im
age;a.onerror=function(){o(!1)},a.onload=function(){o(1===a.width&&1===a.height)},a.src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="}var r,s=e("<body>").prependTo("html"),l=s[0].style,c=["Webkit","Moz","O"],u="palmGetResource"in t,d=t.operamini&&"[object OperaMini]"==={}.toString.call(t.operamini),h=t.blackberry&&!o("-webkit-transform");e.extend(e.mobile,{browser:{}}),e.mobile.browser.oldIE=function(){var e=3,t=n.createElement("div"),i=t.all||[];do{t.innerHTML="\x3c!--[if gt IE "+ ++e+"]><br><![endif]--\x3e"}while(i[0]);return e>4?e:!e}(),e.extend(e.support,{pushState:"pushState"in history&&"replaceState"in history&&!(t.navigator.userAgent.indexOf("Firefox")>=0&&t.top!==t)&&-1===t.navigator.userAgent.search(/CriOS/),mediaquery:e.mobile.media("only all"),cssPseudoElement:!!o("content"),touchOverflow:!!o("overflowScrolling"),cssTransform3d:function(){var o,a,r,l="transform-3d",u=e.mobile.media("(-"+c.join("-"+l+"),(-")+"-"+l+"),("+l+")");if(u)return!!u;o=n.createElement("div"),a={MozTransform:"-moz-transform",transform:"transform"},s.append(o);for(r in a)o.style[r]!==i&&(o.style[r]="translate3d( 100px, 1px, 1px )",u=t.getComputedStyle(o).getPropertyValue(a[r]));return!!u&&"none"!==u}(),boxShadow:!!o("boxShadow")&&!h,fixedPosition:function(){var e=t,n=navigator.userAgent,i=navigator.platform,o=n.match(/AppleWebKit\/([0-9]+)/),a=!!o&&o[1],r=n.match(/Fennec\/([0-9]+)/),s=!!r&&r[1],l=n.match(/Opera Mobi\/([0-9]+)/),c=!!l&&l[1];return!((i.indexOf("iPhone")>-1||i.indexOf("iPad")>-1||i.indexOf("iPod")>-1)&&a&&a<534||e.operamini&&"[object OperaMini]"==={}.toString.call(e.operamini)||l&&c<7458||n.indexOf("Android")>-1&&a&&a<533||s&&s<6||"palmGetResource"in t&&a&&a<534||n.indexOf("MeeGo")>-1&&n.indexOf("NokiaBrowser/8.5.0")>-1)}(),scrollTop:("pageXOffset"in t||"scrollTop"in n.documentElement||"scrollTop"in s[0])&&!u&&!d,dynamicBaseTag:function(){var t,n,i=location.protocol+"//"+location.host+location.pathname+"ui-dir/",o=e("head base"),a=null,r="";return o.length?r=o.attr("href"):o=a=e("<base>",{href:i}).appendTo("head"),t=e("<a href='testurl' />").prependTo(s),n=t[0].href,o[0].href=r||location.pathname,a&&a.remove(),0===n.indexOf(i)}(),cssPointerEvents:function(){var e,i=n.createElement("x"),o=n.documentElement,a=t.getComputedStyle;return"pointerEvents"in i.style&&(i.style.pointerEvents="auto",i.style.pointerEvents="x",o.appendChild(i),e=a&&"auto"===a(i,"").pointerEvents,o.removeChild(i),!!e)}(),boundingRect:function(){return void 0!==n.createElement("div").getBoundingClientRect}(),inlineSVG:a}),s.remove(),r=function(){var e=t.navigator.userAgent;return e.indexOf("Nokia")>-1&&(e.indexOf("Symbian/3")>-1||e.indexOf("Series60/5")>-1)&&e.indexOf("AppleWebKit")>-1&&e.match(/(BrowserNG|NokiaBrowser)\/7\.[0-3]/)}(),e.mobile.gradeA=function(){return(e.support.mediaquery&&e.support.cssPseudoElement||e.mobile.browser.oldIE&&e.mobile.browser.oldIE>=8)&&(e.support.boundingRect||null!==e.fn.jquery.match(/1\.[0-7+]\.[0-9+]?/))},e.mobile.ajaxBlacklist=t.blackberry&&!t.WebKitPoint||d||r,r&&e(function(){e("head link[rel='stylesheet']").attr("rel","alternate stylesheet").attr("rel","stylesheet")}),e.support.boxShadow||e("html").addClass("ui-noboxshadow")}(e),function(e,t){var n,i=e.mobile.window,o=function(){};e.event.special.beforenavigate={setup:function(){i.on("navigate",o)},teardown:function(){i.off("navigate",o)}},e.event.special.navigate=n={bound:!1,pushStateEnabled:!0,originalEventName:void 0,isPushStateEnabled:function(){return e.support.pushState&&!0===e.mobile.pushStateEnabled&&this.isHashChangeEnabled()},isHashChangeEnabled:function(){return!0===e.mobile.hashListeningEnabled},popstate:function(t){var n=new e.Event("navigate"),o=new e.Event("beforenavigate"),a=t.originalEvent.state||{};o.originalEvent=t,i.trigger(o),o.isDefaultPrevented()||(t.historyState&&e.extend(a,t.historyState),n.originalEvent=t,setTimeout(function(){i.trigger(n,{state:a})},0))},hashchange:function(t){var n=new e.Event("navigate"),o=new e.Event("beforenavigate");o.originalEvent=t,i.trigger(o),o.isDefaultPrevented()||(n.originalEvent=t,i.tri
gger(n,{state:t.hashchangeState||{}}))},setup:function(){n.bound||(n.bound=!0,n.isPushStateEnabled()?(n.originalEventName="popstate",i.bind("popstate.navigate",n.popstate)):n.isHashChangeEnabled()&&(n.originalEventName="hashchange",i.bind("hashchange.navigate",n.hashchange)))}}}(e),function(e){e.event.special.throttledresize={setup:function(){e(this).bind("resize",o)},teardown:function(){e(this).unbind("resize",o)}};var t,n,i,o=function(){n=(new Date).getTime(),i=n-a,i>=250?(a=n,e(this).trigger("throttledresize")):(t&&clearTimeout(t),t=setTimeout(o,250-i))},a=0}(e),function(e,t){function i(){var e=o();e!==a&&(a=e,d.trigger(h))}var o,a,r,s,l,c,u,d=e(t),h="orientationchange",f={0:!0,180:!0};e.support.orientation&&(l=t.innerWidth||d.width(),c=t.innerHeight||d.height(),u=50,r=l>c&&l-c>u,s=f[t.orientation],(r&&s||!r&&!s)&&(f={"-90":!0,90:!0})),e.event.special.orientationchange=e.extend({},e.event.special.orientationchange,{setup:function(){if(e.support.orientation&&!e.event.special.orientationchange.disabled)return!1;a=o(),d.bind("throttledresize",i)},teardown:function(){if(e.support.orientation&&!e.event.special.orientationchange.disabled)return!1;d.unbind("throttledresize",i)},add:function(e){var t=e.handler;e.handler=function(e){return e.orientation=o(),t.apply(this,arguments)}}}),e.event.special.orientationchange.orientation=o=function(){var i=!0,o=n.documentElement;return i=e.support.orientation?f[t.orientation]:o&&o.clientWidth/o.clientHeight<1.1,i?"portrait":"landscape"},e.fn[h]=function(e){return e?this.bind(h,e):this.trigger(h)}}(e,this),function(e,t,n,i){function o(e){for(;e&&void 0!==e.originalEvent;)e=e.originalEvent;return e}function a(t,n){var a,r,s,l,c,u,d,h,f,p=t.type;if(t=e.Event(t),t.type=n,a=t.originalEvent,r=e.event.props,p.search(/^(mouse|click)/)>-1&&(r=C),a)for(d=r.length,l;d;)l=r[--d],t[l]=a[l];if(p.search(/mouse(down|up)|click/)>-1&&!t.which&&(t.which=1),-1!==p.search(/^touch/)&&(s=o(a),p=s.touches,c=s.changedTouches,u=p&&p.length?p[0]:c&&c.length?c[0]:i))for(h=0,f=S.length;h<f;h++)l=S[h],t[l]=u[l];return t}function r(t){for(var n,i,o={};t;){n=e.data(t,T);for(i in n)n[i]&&(o[i]=o.hasVirtualBinding=!0);t=t.parentNode}return o}function s(t,n){for(var i;t;){if((i=e.data(t,T))&&(!n||i[n]))return t;t=t.parentNode}return null}function l(){H=!1}function c(){H=!0}function u(){X=0,I.length=0,B=!1,c()}function d(){l()}function h(){f(),N=setTimeout(function(){N=0,u()},e.vmouse.resetTimerDuration)}function f(){N&&(clearTimeout(N),N=0)}function p(t,n,i){var o;return(i&&i[t]||!i&&s(n.target,t))&&(o=a(n,t),e(n.target).trigger(o)),o}function m(t){var n,i=e.data(t.target,P);B||X&&X===i||(n=p("v"+t.type,t))&&(n.isDefaultPrevented()&&t.preventDefault(),n.isPropagationStopped()&&t.stopPropagation(),n.isImmediatePropagationStopped()&&t.stopImmediatePropagation())}function v(t){var n,i,a,s=o(t).touches;s&&1===s.length&&(n=t.target,i=r(n),i.hasVirtualBinding&&(X=z++,e.data(n,P,X),f(),d(),M=!1,a=o(t).touches[0],q=a.pageX,O=a.pageY,p("vmouseover",t,i),p("vmousedown",t,i)))}function g(e){H||(M||p("vmousecancel",e,r(e.target)),M=!0,h())}function b(t){if(!H){var n=o(t).touches[0],i=M,a=e.vmouse.moveDistanceThreshold,s=r(t.target);M=M||Math.abs(n.pageX-q)>a||Math.abs(n.pageY-O)>a,M&&!i&&p("vmousecancel",t,s),p("vmousemove",t,s),h()}}function w(e){if(!H){c();var t,n,i=r(e.target);p("vmouseup",e,i),M||(t=p("vclick",e,i))&&t.isDefaultPrevented()&&(n=o(e).changedTouches[0],I.push({touchID:X,x:n.clientX,y:n.clientY}),B=!0),p("vmouseout",e,i),M=!1,h()}}function E(t){var n,i=e.data(t,T);if(i)for(n in i)if(i[n])return!0;return!1}function y(){}var x,D,T="virtualMouseBindings",P="virtualTouchID",A="vmouseover vmousedown vmousemove vmouseup vclick vmouseout vmousecancel".split(" "),S="clientX clientY pageX pageY screenX screenY".split(" "),k=e.event.mouseHooks?e.event.mouseHooks.props:[],C=e.event.props.concat(k),j={},N=0,q=0,O=0,M=!1,I=[],B=!1,H=!1,L="addEventListener"in n,W=e(n),z=1,X=0;for(e.vmouse={moveDistanceThreshold:10,clickDistanceThreshold:10,resetTimerDuration:1500},D=0;D<A.length;D++)e.event.special[A[D]]=function(t){var n=t.substr(1);return{setup:function(){E(this)||e.data(this,T,{}),e.data(this,T)[t]=!0,j[t]=(j[t]||0)+1,1===j[t]&&W.bind(n,m),e(this).bind(n,y),L&&(j.touchstart=(j.touchstart||0)+1,1===j.touchstart&&W.bind("touchstart",v).bind("touchend",w).bind("touchmove",b).bind("scroll",g))},teardown:function(){--j[t],j[t]||W.unbind(n,m),L&&(--j.touchstart||W.unbind("touchstart",v).unbind("touchmove",b).unbind("touchend",w).unbind("scroll",g));var i=e(this),o=e.data(this,T);o&&(o[t]=!1),i.unbind(n,y),E(this)||i.removeData(T)}}}(A[D]);L&&n.addEventListener("click",function(t){var n,i,o,a,r,s=I.length,l=t.target;if(s)for(n=t.clientX,i=t.clientY,x=e.vmouse.clickDistanceThreshold,o=l;o;){for(a=0;a<s;a++)if(r=I[a],0,o===l&&Math.abs(r.x-n)<x&&Math.abs(r.y-i)<x||e.data(o,P)===r.touchID)return t.preventDefault(),void t.stopPropagation();o=o.parentNode}},!0)}(e,0,n),function(e,t,i){function o(t,n,o,a){var r=o.type;o.type=n,a?e.event.trigger(o,i,t):e.event.dispatch.call(t,o),o.type=r}var a=e(n),r=e.mobile.support.touch,s=r?"touchstart":"mousedown",l=r?"touchend":"mouseup",c=r?"touchmove":"mousemove";e.each("touchstart touchmove touchend tap taphold swipe swipeleft swiperight scrollstart scrollstop".split(" "),function(t,n){e.fn[n]=function(e){return e?this.bind(n,e):this.trigger(n)}}),e.event.special.scrollstart={enabled:!0,setup:function(){function t(e,t){n=t,o(a,n?"scrollstart":"scrollstop",e)}var n,i,a=this,r=e(a);r.bind("touchmove scroll",function(o){e.event.special.scrollstart.enabled&&(n||t(o,!0),clearTimeout(i),i=setTimeout(function(){t(o,!1)},50))})},teardown:function(){e(this).unbind("touchmove scroll")}},e.event.special.tap={tapholdThreshold:750,emitTapOnTaphold:!0,setup:function(){var t=this,n=e(t),i=!1;n.bind("vmousedown",function(r){function s(){clearTimeout(u)}function l(){s(),n.unbind("vclick",c).unbind("vmouseup",s),a.unbind("vmousecancel",l)}function c(e){l(),i||d!==e.target?i&&e.preventDefault():o(t,"tap",e)}if(i=!1,r.which&&1!==r.which)return!1;var u,d=r.target;n.bind("vmouseup",s).bind("vclick",c),a.bind("vmousecancel",l),u=setTimeout(function(){e.event.special.tap.emitTapOnTaphold||(i=!0),o(t,"taphold",e.Event("taphold",{target:d}))},e.event.special.tap.tapholdThreshold)})},teardown:function(){e(this).unbind("vmousedown").unbind("vclick").unbind("vmouseup"),a.unbind("vmousecancel")}},e.event.special.swipe={scrollSupressionThreshold:30,durationThreshold:1e3,horizontalDistanceThreshold:30,verticalDistanceThreshold:30,getLocation:function(e){var n=t.pageXOffset,i=t.pageYOffset,o=e.clientX,a=e.clientY;return 0===e.pageY&&Math.floor(a)>Math.floor(e.pageY)||0===e.pageX&&Math.floor(o)>Math.floor(e.pageX)?(o-=n,a-=i):(a<e.pageY-i||o<e.pageX-n)&&(o=e.pageX-n,a=e.pageY-i),{x:o,y:a}},start:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t,i=e.event.special.swipe.getLocation(n);return{time:(new Date).getTime(),coords:[i.x,i.y],origin:e(t.target)}},stop:function(t){var n=t.originalEvent.touches?t.originalEvent.touches[0]:t,i=e.event.special.swipe.getLocation(n);return{time:(new Date).getTime(),coords:[i.x,i.y]}},handleSwipe:function(t,n,i,a){if(n.time-t.time<e.event.special.swipe.durationThreshold&&Math.abs(t.coords[0]-n.coords[0])>e.event.special.swipe.horizontalDistanceThreshold&&Math.abs(t.coords[1]-n.coords[1])<e.event.special.swipe.verticalDistanceThreshold){var r=t.coords[0]>n.coords[0]?"swipeleft":"swiperight";return o(i,"swipe",e.Event("swipe",{target:a,swipestart:t,swipestop:n}),!0),o(i,r,e.Event(r,{target:a,swipestart:t,swipestop:n}),!0),!0}return!1},eventInProgress:!1,setup:function(){var t,n=this,i=e(n),o={};t=e.data(this,"mobile-events"),t||(t={length:0},e.data(this,"mobile-events",t)),t.length++,t.swipe=o,o.start=function(t){if(!e.event.special.swipe.eventInProgress){e.event.special.swipe.eventInProgress=!0;var i,r=e.event.special.swipe.start(t),s=t.target,u=!1;o.move=function(t){r&&!t.isDefaultPrevented()&&(i=e.event.special.swipe.stop(t),u||(u=e.event.special.swipe.handleSwipe(r,i,n,s))&&(e.event.special.swipe.eventInProgress=!1),Math.abs(r.coords[0]-i.coords[0])>e.event.special.swipe.scrollSupressionThresh
old&&t.preventDefault())},o.stop=function(){u=!0,e.event.special.swipe.eventInProgress=!1,a.off(c,o.move),o.move=null},a.on(c,o.move).one(l,o.stop)}},i.on(s,o.start)},teardown:function(){var t,n;t=e.data(this,"mobile-events"),t&&(n=t.swipe,delete t.swipe,0===--t.length&&e.removeData(this,"mobile-events")),n&&(n.start&&e(this).off(s,n.start),n.move&&a.off(c,n.move),n.stop&&a.off(l,n.stop))}},e.each({scrollstop:"scrollstart",taphold:"tap",swipeleft:"swipe.left",swiperight:"swipe.right"},function(t,n){e.event.special[t]={setup:function(){e(this).bind(n,e.noop)},teardown:function(){e(this).unbind(n)}}})}(e,this)});