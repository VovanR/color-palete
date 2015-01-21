!function(){define("models/ColorModel",["jquery","underscore","backbone"],function(e,t,n){var o=n.Model.extend({defaults:{name:null,value:"#fff",selected:!1},toggle:function(){this.set("selected",!this.get("selected"))},deselect:function(){this.set("selected",!1)}});return o}),define("collections/PaletteCollection",["jquery","underscore","backbone","models/ColorModel"],function(e,t,n,o){var l=n.Collection.extend({model:o,_singleSelection:!0,initialize:function(){this._singleSelection&&this.listenTo(this,"change:selected",this._deselectOther)},_deselectOther:function(e){e.get("selected")&&t.invoke(this.without(e),"deselect")}});return l}),define("views/ColorView",["jquery","underscore","backbone","models/ColorModel"],function(e,t,n){var o=n.View.extend({tagName:"span",className:"b-palette__item",initialize:function(e){this.model=e.model,this.listenTo(this.model,"change:selected",this._onToggle)},render:function(){var e=this.$el[0],t=this.model.get("value");return e.style.backgroundColor=t,e.style.color=t,this.$el},events:{click:function(){this.model.toggle()}},_onToggle:function(){this.$el.toggleClass("_state_selected",this.model.get("selected"))}});return o}),define("text",["module"],function(e){var t,n,o,l,i,r=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],a=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,s=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,c="undefined"!=typeof location&&location.href,d=c&&location.protocol&&location.protocol.replace(/\:/,""),u=c&&location.hostname,p=c&&(location.port||void 0),f={},v=e.config&&e.config()||{};return t={version:"2.0.12",strip:function(e){if(e){e=e.replace(a,"");var t=e.match(s);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:v.createXhr||function(){var e,t,n;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(t=0;3>t;t+=1){n=r[t];try{e=new ActiveXObject(n)}catch(o){}if(e){r=[n];break}}return e},parseName:function(e){var t,n,o,l=!1,i=e.indexOf("."),r=0===e.indexOf("./")||0===e.indexOf("../");return-1!==i&&(!r||i>1)?(t=e.substring(0,i),n=e.substring(i+1,e.length)):t=e,o=n||t,i=o.indexOf("!"),-1!==i&&(l="strip"===o.substring(i+1),o=o.substring(0,i),n?n=o:t=o),{moduleName:t,ext:n,strip:l}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,o,l){var i,r,a,s=t.xdRegExp.exec(e);return s?(i=s[2],r=s[3],r=r.split(":"),a=r[1],r=r[0],!(i&&i!==n||r&&r.toLowerCase()!==o.toLowerCase()||(a||r)&&a!==l)):!0},finishLoad:function(e,n,o,l){o=n?t.strip(o):o,v.isBuild&&(f[e]=o),l(o)},load:function(e,n,o,l){if(l&&l.isBuild&&!l.inlineText)return void o();v.isBuild=l&&l.isBuild;var i=t.parseName(e),r=i.moduleName+(i.ext?"."+i.ext:""),a=n.toUrl(r),s=v.useXhr||t.useXhr;return 0===a.indexOf("empty:")?void o():void(!c||s(a,d,u,p)?t.get(a,function(n){t.finishLoad(e,i.strip,n,o)},function(e){o.error&&o.error(e)}):n([r],function(e){t.finishLoad(i.moduleName+"."+i.ext,i.strip,e,o)}))},write:function(e,n,o){if(f.hasOwnProperty(n)){var l=t.jsEscape(f[n]);o.asModule(e+"!"+n,"define(function () { return '"+l+"';});\n")}},writeFile:function(e,n,o,l,i){var r=t.parseName(n),a=r.ext?"."+r.ext:"",s=r.moduleName+a,c=o.toUrl(r.moduleName+a)+".js";t.load(s,o,function(){var n=function(e){return l(c,e)};n.asModule=function(e,t){return l.asModule(e,c,t)},t.write(e,s,n,i)},i)}},"node"===v.env||!v.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(n=require.nodeRequire("fs"),t.get=function(e,t,o){try{var l=n.readFileSync(e,"utf8");0===l.indexOf("﻿")&&(l=l.substring(1)),t(l)}catch(i){o&&o(i)}}):"xhr"===v.env||!v.env&&t.createXhr()?t.get=function(e,n,o,l){var i,r=t.createXhr();if(r.open("GET",e,!0),l)for(i in l)l.hasOwnProperty(i)&&r.setRequestHeader(i.toLowerCase(),l[i]);v.onXhr&&v.onXhr(r,e),r.onreadystatechange=function(){var t,l;4===r.readyState&&(t=r.status||0,t>399&&600>t?(l=new Error(e+" HTTP status: "+t),l.xhr=r,o&&o(l)):n(r.responseText),v.onXhrComplete&&v.onXhrComplete(r,e))},r.send(null)}:"rhino"===v.env||!v.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?t.get=function(e,t){var n,o,l="utf-8",i=new java.io.File(e),r=java.lang.System.getProperty("line.separator"),a=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(i),l)),s="";try{for(n=new java.lang.StringBuffer,o=a.readLine(),o&&o.length()&&65279===o.charAt(0)&&(o=o.substring(1)),null!==o&&n.append(o);null!==(o=a.readLine());)n.append(r),n.append(o);s=String(n.toString())}finally{a.close()}t(s)}:("xpconnect"===v.env||!v.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(o=Components.classes,l=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),i="@mozilla.org/windows-registry-key;1"in o,t.get=function(e,t){var n,r,a,s={};i&&(e=e.replace(/\//g,"\\")),a=new FileUtils.File(e);try{n=o["@mozilla.org/network/file-input-stream;1"].createInstance(l.nsIFileInputStream),n.init(a,1,0,!1),r=o["@mozilla.org/intl/converter-input-stream;1"].createInstance(l.nsIConverterInputStream),r.init(n,"utf-8",n.available(),l.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),r.readString(n.available(),s),r.close(),n.close(),t(s.value)}catch(c){throw new Error((a&&a.path||"")+": "+c)}}),t}),define("text!templates/PaletteTemplate.tpl",[],function(){return'<div class="b-palette js-palette"></div>\n'}),define("views/PaletteView",["jquery","underscore","backbone","views/ColorView","text!templates/PaletteTemplate.tpl"],function(e,t,n,o,l){var i=n.View.extend({el:"#palette-placeholder",template:t.template(l),initialize:function(e){console.info("PaletteView"),this.collection=e.collection,this.listenTo(this.collection,"add",this._onAdd),this.render(),this.collection.each(this._onAdd)},render:function(){this.$el.html(this.template())},_onAdd:function(e){var t=new o({model:e});this.$(".js-palette").append(t.render())}});return i}),define("text!templates/PaletteAddColorTemplate.tpl",[],function(){return'<div class="b-palette-add-color">\n    <input class="b-palette-add-color__value js-palette-add-color__value" autocomplete="off" type="text">\n    <button class="b-palette-add-color__button js-palette-add-color__button" type="button">Add</button>\n</div>\n'}),define("views/PaletteAddColorView",["jquery","underscore","backbone","text!templates/PaletteAddColorTemplate.tpl"],function(e,t,n,o){var l=n.View.extend({el:"#palette-add-color-placeholder",template:t.template(o),initialize:function(e){console.info("PaletteAddColorView"),this.collection=e.collection,this.render()},render:function(){this.$el.html(this.template()),this.$value=this.$(".js-palette-add-color__value")},events:{"click .js-palette-add-color__button":function(){this._addNewColor()},"keyup .js-palette-add-color__value":function(e){13===e.which&&this._addNewColor()}},_addNewColor:function(){this.collection.add({value:this._getValue()}),this.$value.val("")},_getValue:function(){return this.$value.val().trim()}});return l}),define("text!templates/PaletteSelectedColorTemplate.tpl",[],function(){return'<div class="b-palette-selected-color js-palette-selected-color">\n    <div class="b-palette-selected-color__value js-palette-selected-color__value">\n    </div>\n</div>\n'}),define("views/PaletteSelectedColorView",["jquery","underscore","backbone","text!templates/PaletteSelectedColorTemplate.tpl"],function(e,t,n,o){var l=n.View.extend({el:"#palette-selected-color-placeholder",template:t.template(o),initialize:function(e){console.info("PaletteSelectedColorView"),this.collection=e.collection,this.listenTo(this.collection,"change:selected",this._update),this.render()},render:function(){this.$el.html(this.template()),this.$value=this.$(".js-palette-add-color__value")},_update:function(){var e=this.collection.where({selected:!0}),n="";t.each(e,function(e){n+=e.get("name")||e.get("value")}),this.$(".js-palette-selected-color__value").text(n)}});return l}),define("app",["jquery","underscore","backbone","collections/PaletteCollection","views/PaletteView","views/ColorView","views/PaletteAddColorView","views/PaletteSelectedColorView"],function(e,t,n,o,l,i,r,a){var s=function(){this._init()};return s.prototype={_init:function(){{var e=[{value:"red"},{value:"green"},{value:"blue"},{value:"lime"},{value:"yellow"},{value:"pink"},{value:"brown"},{value:"orange"},{value:"purple"},{value:"black"},{value:"aqua"}],t=new o(e);new l({collection:t}),new r({collection:t}),new a({collection:t})}}},s}),define("jquery",[],function(){return window.jQuery}),define("underscore",[],function(){return window._}),define("backbone",[],function(){return window.Backbone}),define("marionette",[],function(){return window.Marionette}),require(["app"],function(e){new e}),define("main",function(){}),require(["main"])}();