(function(e){var t={};function n(i){if(t[i])return t[i].exports;var o=t[i]={exports:{},id:i,loaded:false};e[i].call(o.exports,o,o.exports,n);o.loaded=true;return o.exports}n.m=e;n.c=t;n.p="/dist/";return n(0)})([function(e,t,n){e.exports=n(3)},,,function(e,t,n){"use strict";n(4);var i=n(6);var o=s(i);var r=n(7);var a=s(r);function s(e){return e&&e.__esModule?e:{"default":e}}$(".search-btn").on("click",function(){var e=$(".s-value").val();if(e.length===0){o["default"].tips("请输入您要搜索的内容");return false}$.cookie("q",e);location.href="/book/search?q="+e})},function(e,t){},,function(e,t,n){var i;"use strict";var o=typeof Symbol==="function"&&typeof Symbol.iterator==="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol==="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!(i=function(){"use strict";var t=window.jsLib||(window.jsLib={});t.base=t.base||{};var n=window;var i=document,r="querySelectorAll",a="getElementsByClassName",s=function y(e){return i[r](e)};var c={type:0,shade:true,shadeClose:true,fixed:true,anim:true};n.ready={extend:function p(e){var t=JSON.parse(JSON.stringify(c));for(var n in e){t[n]=e[n]}return t},timer:{},end:{}};var l=0,d=["layermbox"],u=function v(e){var t=this;t.config=ready.extend(e);t.view()};u.prototype.view=function(){var e=this,t=e.config,n=i.createElement("div");e.id=n.id=d[0]+l;n.setAttribute("class",d[0]+" "+d[0]+(t.type||0));n.setAttribute("index",l);var r=function(){var e=o(t.title)==="object";return t.title?'<h3 style="'+(e?t.title[1]:"")+'">'+(e?t.title[0]:t.title)+'</h3><button class="layermend"></button>':""}();var c=function(){var e=(t.btn||[]).length,n;if(e===0||!t.btn){return""}n='<span type="1">'+t.btn[0]+"</span>";if(e===2){n='<span type="0">'+t.btn[1]+"</span>"+n}return'<div class="layermbtn">'+n+"</div>"}();if(!t.fixed){t.top=t.hasOwnProperty("top")?t.top:100;t.style=t.style||"";t.style+=" top:"+(i.body.scrollTop+t.top)+"px"}if(t.type===2){t.content='<i></i><i class="laymloadtwo"></i><i></i><div>'+(t.content||"")+"</div>"}n.innerHTML=(t.shade?"<div "+(typeof t.shade==="string"?'style="'+t.shade+'"':"")+' class="laymshade"></div>':"")+'<div class="layermmain" '+(!t.fixed?'style="position:static;"':"")+">"+'<div class="section">'+'<div class="layermchild '+(t.className?t.className:"")+" "+(!t.type&&!t.shade?"layermborder ":"")+(t.anim?"layermanim":"")+'" '+(t.style?'style="'+t.style+'"':"")+">"+r+'<div class="layermcont">'+t.content+"</div>"+c+"</div>"+"</div>"+"</div>";if(!t.type||t.type===2){var u=i[a](d[0]+t.type),y=u.length;if(y>=1){f.close(u[0].getAttribute("index"))}}document.body.appendChild(n);var p=e.elem=s("#"+e.id)[0];setTimeout(function(){try{p.className=p.className+" layermshow"}catch(e){return}t.success&&t.success(p)},1);e.index=l++;e.action(t,p)};u.prototype.action=function(e,t){var n=this;if(e.time){ready.timer[n.index]=setTimeout(function(){f.close(n.index)},e.time*1e3)}if(e.title){t[a]("layermend")[0].onclick=function(){e.cancel&&e.cancel();f.close(n.index)}}if(e.btn){var i=t[a]("layermbtn")[0].children,o=i.length;for(var r=0;r<o;r++){i[r].onclick=function(){var t=this.getAttribute("type");if(t==0){e.no&&e.no();f.close(n.index)}else{e.yes?e.yes(n.index):f.close(n.index)}}}}if(e.shade&&e.shadeClose){var s=t[a]("laymshade")[0];s.onclick=function(){f.close(n.index,e.end)};s.ontouchmove=function(){f.close(n.index,e.end)}}e.end&&(ready.end[n.index]=e.end)};var f={v:"1.5",index:l,open:function m(e){var t=new u(e||{});return t.index},alert:function h(e,t){var n=this;n.open({btn:["确定"],content:e,shadeClose:false,yes:function i(e){var i=t||function(){};i(e);n.close(e)}})},tips:function b(e,t){var n=this;n.open({style:"width: auto; border:none; background: rgba(0, 0, 0, .8); font-size: 0.32rem; text-align: center; border-radius: .1rem; color:#fff;",content:e,shade:false,time:t||2})},close:function x(e){var t=s("#"+d[0]+e)[0];if(!t)return;t.innerHTML="";i.body.removeChild(t);clearTimeout(ready.timer[e]);delete ready.timer[e];typeof ready.end[e]==="function"&&ready.end[e]();delete ready.end[e]},closeAll:function g(){var e=i[a](d[0]);for(var t=0,n=e.length;t<n;t++){f.close(e[0].getAttribute("index")|0)}}};e.exports=f;t.base.layer=f}.call(t,n,t,e),i!==undefined&&(e.exports=i))},function(e,t){"use strict";var n=/\+/g;function i(e){return c.raw?e:encodeURIComponent(e)}function o(e){return c.raw?e:decodeURIComponent(e)}function r(e){return i(c.json?JSON.stringify(e):String(e))}function a(e){if(e.indexOf('"')===0){e=e.slice(1,-1).replace(/\\"/g,'"').replace(/\\\\/g,"\\")}try{e=decodeURIComponent(e.replace(n," "));return c.json?JSON.parse(e):e}catch(t){}}function s(e,t){var n=c.raw?e:a(e);return $.isFunction(t)?t(n):n}var c=$.cookie=function(e,t,n){if(arguments.length>1&&!$.isFunction(t)){n=$.extend({},c.defaults,n);if(typeof n.expires==="number"){var a=n.expires,l=n.expires=new Date;l.setMilliseconds(l.getMilliseconds()+a*864e5)}return document.cookie=[i(e),"=",r(t),n.expires?"; expires="+n.expires.toUTCString():"",n.path?"; path="+n.path:"",n.domain?"; domain="+n.domain:"",n.secure?"; secure":""].join("")}var d=e?undefined:{},u=document.cookie?document.cookie.split("; "):[],f=0,y=u.length;for(;f<y;f++){var p=u[f].split("="),v=o(p.shift()),m=p.join("=");if(e===v){d=s(m,t);break}if(!e&&(m=s(m))!==undefined){d[v]=m}}return d};c.defaults={};$.removeCookie=function(e,t){$.cookie(e,"",$.extend({},t,{expires:-1}));return!$.cookie(e)}}]);