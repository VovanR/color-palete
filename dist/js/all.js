!function(){define("models/ColorModel",["jquery","underscore","backbone"],function(e,t,n){var o=n.Model.extend({defaults:{name:null,value:"#fff"}});return o}),define("collections/PaleteCollection",["jquery","underscore","backbone","models/ColorModel"],function(e,t,n,o){var r=n.Collection.extend({model:o});return r}),define("text",["module"],function(e){var t,n,o,r,i,a=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],l=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,s=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,u="undefined"!=typeof location&&location.href,d=u&&location.protocol&&location.protocol.replace(/\:/,""),c=u&&location.hostname,p=u&&(location.port||void 0),f={},v=e.config&&e.config()||{};return t={version:"2.0.12",strip:function(e){if(e){e=e.replace(l,"");var t=e.match(s);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:v.createXhr||function(){var e,t,n;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(t=0;3>t;t+=1){n=a[t];try{e=new ActiveXObject(n)}catch(o){}if(e){a=[n];break}}return e},parseName:function(e){var t,n,o,r=!1,i=e.indexOf("."),a=0===e.indexOf("./")||0===e.indexOf("../");return-1!==i&&(!a||i>1)?(t=e.substring(0,i),n=e.substring(i+1,e.length)):t=e,o=n||t,i=o.indexOf("!"),-1!==i&&(r="strip"===o.substring(i+1),o=o.substring(0,i),n?n=o:t=o),{moduleName:t,ext:n,strip:r}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,o,r){var i,a,l,s=t.xdRegExp.exec(e);return s?(i=s[2],a=s[3],a=a.split(":"),l=a[1],a=a[0],!(i&&i!==n||a&&a.toLowerCase()!==o.toLowerCase()||(l||a)&&l!==r)):!0},finishLoad:function(e,n,o,r){o=n?t.strip(o):o,v.isBuild&&(f[e]=o),r(o)},load:function(e,n,o,r){if(r&&r.isBuild&&!r.inlineText)return void o();v.isBuild=r&&r.isBuild;var i=t.parseName(e),a=i.moduleName+(i.ext?"."+i.ext:""),l=n.toUrl(a),s=v.useXhr||t.useXhr;return 0===l.indexOf("empty:")?void o():void(!u||s(l,d,c,p)?t.get(l,function(n){t.finishLoad(e,i.strip,n,o)},function(e){o.error&&o.error(e)}):n([a],function(e){t.finishLoad(i.moduleName+"."+i.ext,i.strip,e,o)}))},write:function(e,n,o){if(f.hasOwnProperty(n)){var r=t.jsEscape(f[n]);o.asModule(e+"!"+n,"define(function () { return '"+r+"';});\n")}},writeFile:function(e,n,o,r,i){var a=t.parseName(n),l=a.ext?"."+a.ext:"",s=a.moduleName+l,u=o.toUrl(a.moduleName+l)+".js";t.load(s,o,function(){var n=function(e){return r(u,e)};n.asModule=function(e,t){return r.asModule(e,u,t)},t.write(e,s,n,i)},i)}},"node"===v.env||!v.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(n=require.nodeRequire("fs"),t.get=function(e,t,o){try{var r=n.readFileSync(e,"utf8");0===r.indexOf("﻿")&&(r=r.substring(1)),t(r)}catch(i){o&&o(i)}}):"xhr"===v.env||!v.env&&t.createXhr()?t.get=function(e,n,o,r){var i,a=t.createXhr();if(a.open("GET",e,!0),r)for(i in r)r.hasOwnProperty(i)&&a.setRequestHeader(i.toLowerCase(),r[i]);v.onXhr&&v.onXhr(a,e),a.onreadystatechange=function(){var t,r;4===a.readyState&&(t=a.status||0,t>399&&600>t?(r=new Error(e+" HTTP status: "+t),r.xhr=a,o&&o(r)):n(a.responseText),v.onXhrComplete&&v.onXhrComplete(a,e))},a.send(null)}:"rhino"===v.env||!v.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?t.get=function(e,t){var n,o,r="utf-8",i=new java.io.File(e),a=java.lang.System.getProperty("line.separator"),l=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(i),r)),s="";try{for(n=new java.lang.StringBuffer,o=l.readLine(),o&&o.length()&&65279===o.charAt(0)&&(o=o.substring(1)),null!==o&&n.append(o);null!==(o=l.readLine());)n.append(a),n.append(o);s=String(n.toString())}finally{l.close()}t(s)}:("xpconnect"===v.env||!v.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(o=Components.classes,r=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),i="@mozilla.org/windows-registry-key;1"in o,t.get=function(e,t){var n,a,l,s={};i&&(e=e.replace(/\//g,"\\")),l=new FileUtils.File(e);try{n=o["@mozilla.org/network/file-input-stream;1"].createInstance(r.nsIFileInputStream),n.init(l,1,0,!1),a=o["@mozilla.org/intl/converter-input-stream;1"].createInstance(r.nsIConverterInputStream),a.init(n,"utf-8",n.available(),r.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),a.readString(n.available(),s),a.close(),n.close(),t(s.value)}catch(u){throw new Error((l&&l.path||"")+": "+u)}}),t}),define("text!templates/ColorTemplate.tpl",[],function(){return'<span class="b-palete__item" style="background-color: <%= value %>; color: <%= value %>;" tabindex="0"></span>\n'}),define("views/ColorView",["jquery","underscore","backbone","models/ColorModel","text!templates/ColorTemplate.tpl"],function(e,t,n,o,r){var i=n.View.extend({template:t.template(r),initialize:function(e){this.model=e},render:function(){return this.template(this.model.toJSON())}});return i}),define("text!templates/PaleteTemplate.tpl",[],function(){return'<div class="b-palete"></div>\n'}),define("views/PaleteView",["jquery","underscore","backbone","views/ColorView","text!templates/PaleteTemplate.tpl"],function(e,t,n,o,r){var i=n.View.extend({el:"#palete-placeholder",template:t.template(r),initialize:function(e){console.info("PaleteView"),this.model=e.model,this.listenTo(this.model,"add",this._onAdd),this.render()},render:function(){this.$el.html(this.template())},_onAdd:function(e){this.$(".b-palete").append(new o(e).render())}});return i}),define("text!templates/PaleteAddColorTemplate.tpl",[],function(){return'<div class="b-palete-add-color">\n    <input class="b-palete-add-color__value js-palete-add-color__value" autocomplete="off" type="text">\n    <button class="b-palete-add-color__button js-palete-add-color__button" type="button">Add</button>\n</div>\n'}),define("views/PaleteAddColorView",["jquery","underscore","backbone","text!templates/PaleteAddColorTemplate.tpl"],function(e,t,n,o){var r=n.View.extend({el:"#palete-add-color-placeholder",template:t.template(o),initialize:function(e){console.info("PaleteAddColorView"),this.collection=e.collection,this.render()},render:function(){this.$el.html(this.template()),this.$value=this.$(".js-palete-add-color__value")},events:{"click .js-palete-add-color__button":function(){this._addNewColor()},"keyup .js-palete-add-color__value":function(e){13===e.which&&this._addNewColor()}},_addNewColor:function(){this.collection.add({value:this._getValue()}),this.$value.val("")},_getValue:function(){return this.$value.val().trim()}});return r}),define("app",["jquery","underscore","backbone","collections/PaleteCollection","views/PaleteView","views/ColorView","models/ColorModel","views/PaleteAddColorView"],function(e,t,n,o,r,i,a,l){var s=function(){this._init()};return s.prototype={_init:function(){var e=new o,t=(new r({model:e}),new l({collection:e}),[{value:"red"},{value:"green"},{value:"blue"},{value:"lime"},{value:"yellow"},{value:"pink"},{value:"brown"},{value:"orange"},{value:"purple"},{value:"black"},{value:"aqua"}]);e.add(t)}},s}),define("jquery",[],function(){return window.jQuery}),define("underscore",[],function(){return window._}),define("backbone",[],function(){return window.Backbone}),define("marionette",[],function(){return window.Marionette}),require(["app"],function(e){new e}),define("main",function(){}),require(["main"])}();