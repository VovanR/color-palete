!function(){define("models/ColorModel",["jquery","underscore","backbone"],function(e,t,n){var o=n.Model.extend({defaults:{name:null,value:"#fff",selected:!1,hovered:!1},initialize:function(e){e.name||this.set("name",e.value)},toggle:function(){this.set("selected",!this.get("selected"))},deselect:function(){this.set("selected",!1)}});return o}),define("collections/PaletteCollection",["jquery","underscore","backbone","models/ColorModel"],function(e,t,n,o){var i=n.Collection.extend({model:o,_singleSelection:!0,_lastSelected:null,initialize:function(){this.listenTo(this,"change:selected",this._deselectOther),e(document).on("keydown",function(e){17===e.which&&this.toggleSingleSelectionMode(!1)}.bind(this)).on("keyup",function(e){17===e.which&&this.toggleSingleSelectionMode(!0)}.bind(this))},_deselectOther:function(e){this._singleSelection&&(this._lastSelected||(this._lastSelected=e),this._lastSelected.cid===e.cid&&(t.invoke(this.without(e),"deselect"),this._lastSelected=null))},toggleSingleSelectionMode:function(e){this._singleSelection=e,n.trigger("single-selection",e)},getSelectionMode:function(){return this._singleSelection}});return i}),define("views/ColorView",["jquery","underscore","backbone","models/ColorModel"],function(e,t,n){var o=n.View.extend({tagName:"span",className:"b-palette__item",initialize:function(e){this.model=e.model,this.listenTo(this.model,"change:selected",this._onToggle),this.listenTo(this.model,"change:hovered",this._onHover)},render:function(){var e=this.$el[0],t=this.model.get("value");return e.style.backgroundColor=t,e.style.color=t,this.$el},events:{click:function(){this.model.toggle()}},_onToggle:function(){this.$el.toggleClass("b-palette__item_state_selected",this.model.get("selected"))},_onHover:function(){this.$el.toggleClass("b-palette__item_state_hovered",this.model.get("hovered"))}});return o}),define("text",["module"],function(e){var t,n,o,i,l,s=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"],r=/^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im,c=/<body[^>]*>\s*([\s\S]+)\s*<\/body>/im,a="undefined"!=typeof location&&location.href,d=a&&location.protocol&&location.protocol.replace(/\:/,""),u=a&&location.hostname,h=a&&(location.port||void 0),f={},p=e.config&&e.config()||{};return t={version:"2.0.12",strip:function(e){if(e){e=e.replace(r,"");var t=e.match(c);t&&(e=t[1])}else e="";return e},jsEscape:function(e){return e.replace(/(['\\])/g,"\\$1").replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r").replace(/[\u2028]/g,"\\u2028").replace(/[\u2029]/g,"\\u2029")},createXhr:p.createXhr||function(){var e,t,n;if("undefined"!=typeof XMLHttpRequest)return new XMLHttpRequest;if("undefined"!=typeof ActiveXObject)for(t=0;3>t;t+=1){n=s[t];try{e=new ActiveXObject(n)}catch(o){}if(e){s=[n];break}}return e},parseName:function(e){var t,n,o,i=!1,l=e.indexOf("."),s=0===e.indexOf("./")||0===e.indexOf("../");return-1!==l&&(!s||l>1)?(t=e.substring(0,l),n=e.substring(l+1,e.length)):t=e,o=n||t,l=o.indexOf("!"),-1!==l&&(i="strip"===o.substring(l+1),o=o.substring(0,l),n?n=o:t=o),{moduleName:t,ext:n,strip:i}},xdRegExp:/^((\w+)\:)?\/\/([^\/\\]+)/,useXhr:function(e,n,o,i){var l,s,r,c=t.xdRegExp.exec(e);return c?(l=c[2],s=c[3],s=s.split(":"),r=s[1],s=s[0],!(l&&l!==n||s&&s.toLowerCase()!==o.toLowerCase()||(r||s)&&r!==i)):!0},finishLoad:function(e,n,o,i){o=n?t.strip(o):o,p.isBuild&&(f[e]=o),i(o)},load:function(e,n,o,i){if(i&&i.isBuild&&!i.inlineText)return void o();p.isBuild=i&&i.isBuild;var l=t.parseName(e),s=l.moduleName+(l.ext?"."+l.ext:""),r=n.toUrl(s),c=p.useXhr||t.useXhr;return 0===r.indexOf("empty:")?void o():void(!a||c(r,d,u,h)?t.get(r,function(n){t.finishLoad(e,l.strip,n,o)},function(e){o.error&&o.error(e)}):n([s],function(e){t.finishLoad(l.moduleName+"."+l.ext,l.strip,e,o)}))},write:function(e,n,o){if(f.hasOwnProperty(n)){var i=t.jsEscape(f[n]);o.asModule(e+"!"+n,"define(function () { return '"+i+"';});\n")}},writeFile:function(e,n,o,i,l){var s=t.parseName(n),r=s.ext?"."+s.ext:"",c=s.moduleName+r,a=o.toUrl(s.moduleName+r)+".js";t.load(c,o,function(){var n=function(e){return i(a,e)};n.asModule=function(e,t){return i.asModule(e,a,t)},t.write(e,c,n,l)},l)}},"node"===p.env||!p.env&&"undefined"!=typeof process&&process.versions&&process.versions.node&&!process.versions["node-webkit"]?(n=require.nodeRequire("fs"),t.get=function(e,t,o){try{var i=n.readFileSync(e,"utf8");0===i.indexOf("﻿")&&(i=i.substring(1)),t(i)}catch(l){o&&o(l)}}):"xhr"===p.env||!p.env&&t.createXhr()?t.get=function(e,n,o,i){var l,s=t.createXhr();if(s.open("GET",e,!0),i)for(l in i)i.hasOwnProperty(l)&&s.setRequestHeader(l.toLowerCase(),i[l]);p.onXhr&&p.onXhr(s,e),s.onreadystatechange=function(){var t,i;4===s.readyState&&(t=s.status||0,t>399&&600>t?(i=new Error(e+" HTTP status: "+t),i.xhr=s,o&&o(i)):n(s.responseText),p.onXhrComplete&&p.onXhrComplete(s,e))},s.send(null)}:"rhino"===p.env||!p.env&&"undefined"!=typeof Packages&&"undefined"!=typeof java?t.get=function(e,t){var n,o,i="utf-8",l=new java.io.File(e),s=java.lang.System.getProperty("line.separator"),r=new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(l),i)),c="";try{for(n=new java.lang.StringBuffer,o=r.readLine(),o&&o.length()&&65279===o.charAt(0)&&(o=o.substring(1)),null!==o&&n.append(o);null!==(o=r.readLine());)n.append(s),n.append(o);c=String(n.toString())}finally{r.close()}t(c)}:("xpconnect"===p.env||!p.env&&"undefined"!=typeof Components&&Components.classes&&Components.interfaces)&&(o=Components.classes,i=Components.interfaces,Components.utils["import"]("resource://gre/modules/FileUtils.jsm"),l="@mozilla.org/windows-registry-key;1"in o,t.get=function(e,t){var n,s,r,c={};l&&(e=e.replace(/\//g,"\\")),r=new FileUtils.File(e);try{n=o["@mozilla.org/network/file-input-stream;1"].createInstance(i.nsIFileInputStream),n.init(r,1,0,!1),s=o["@mozilla.org/intl/converter-input-stream;1"].createInstance(i.nsIConverterInputStream),s.init(n,"utf-8",n.available(),i.nsIConverterInputStream.DEFAULT_REPLACEMENT_CHARACTER),s.readString(n.available(),c),s.close(),n.close(),t(c.value)}catch(a){throw new Error((r&&r.path||"")+": "+a)}}),t}),define("text!templates/PaletteTemplate.tpl",[],function(){return'<div class="b-palette js-palette"></div>\n'}),define("views/PaletteView",["jquery","underscore","backbone","views/ColorView","text!templates/PaletteTemplate.tpl"],function(e,t,n,o,i){var l=n.View.extend({el:"#palette-placeholder",template:t.template(i),initialize:function(e){console.info("PaletteView"),this.collection=e.collection,this.listenTo(this.collection,"add",this._update),this.listenTo(this.collection,"destroy",this._update),this.render(),this.collection.each(this._onAdd),this._startSleepAnimation()},render:function(){this.$el.html(this.template())},_onAdd:function(e){var t=new o({model:e});this.$(".js-palette").append(t.render())},_update:function(){this.$(".js-palette").empty(),this.collection.each(this._onAdd)},_startSleepAnimation:function(){var e=100*t.random(1,10);setTimeout(function(e){e._selectRandomColor(),e._startSleepAnimation()},e,this)},_selectRandomColor:function(){var e=this.collection.sample();e.set("hovered",!0);var n=100*t.random(5,50);setTimeout(function(){e&&e.set("hovered",!1)},n,this)}});return l}),define("views/PaletteCountView",["jquery","underscore","backbone"],function(e,t,n){var o=n.View.extend({el:"#palette-count",initialize:function(e){console.info("PaletteCountView"),this.collection=e.collection,this.listenTo(this.collection,"add",this.render),this.listenTo(this.collection,"remove",this.render),this.render()},render:function(){this.$el.text(this.collection.length)}});return o}),define("text!templates/PaletteAddColorTemplate.tpl",[],function(){return'<div class="b-palette-add-color">\n    <form action="">\n        <div class="row">\n            <div class="col-xs-5">\n                <label class="sr-only" for="palette-add-color__b=value">\n                    Value\n                </label>\n                <input class="b-palette-add-color__value js-palette-add-color__value form-control"\n                       id="palette-add-color__value"\n                       value=""\n                       placeholder="#ff0000"\n                       autocomplete="off"\n                       type="text">\n            </div>\n\n            <div class="col-xs-5">\n                <label class="sr-only" for="palette-add-color__name">\n                    Name\n                </label>\n                <input class="b-palette-add-color__name js-palette-add-color__name form-control"\n                       id="palette-add-color__name"\n                       value=""\n                       placeholder="Red"\n                       autocomplete="off"\n                       type="text">\n            </div>\n\n            <div class="col-xs-2">\n                <button class="b-palette-add-color__button js-palette-add-color__button btn btn-block btn-default" type="submit">\n                    <span aria-hidden="true" class="glyphicon glyphicon-plus"></span>\n                </button>\n            </div>\n        </div>\n    </form>\n</div>\n'}),define("views/PaletteAddColorView",["jquery","underscore","backbone","text!templates/PaletteAddColorTemplate.tpl"],function(e,t,n,o){var i=n.View.extend({el:"#palette-add-color-placeholder",template:t.template(o),initialize:function(e){console.info("PaletteAddColorView"),this.collection=e.collection,this.render()},render:function(){this.$el.html(this.template()),this.$value=this.$(".js-palette-add-color__value"),this.$name=this.$(".js-palette-add-color__name")},events:{"submit form":function(e){e.preventDefault(),this._addNewColor()}},_addNewColor:function(){var e=this._getValue();return e?(this.collection.add({value:this._getValue(),name:this._getName()}),this.$value.val(""),void this.$name.val("")):void console.error("Value is not valid")},_getValue:function(){return this.$value.val().trim()},_getName:function(){return this.$name.val().trim()}});return i}),define("text!templates/PaletteSelectedColorTemplate.tpl",[],function(){return'<div class="b-palette-selected-color__background"\n     style="background-color: <%= value %>; color: <%= value %>">\n    <span class="b-palette-selected-color__remove" tabindex="0">\n        destruct\n        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>\n    </span>\n\n    <div class="b-palette-selected-color__name">\n        <%= name %>\n    </div>\n\n    <div class="b-palette-selected-color__value">\n        <%= value %>\n    </div>\n</div>\n'}),define("views/PaletteSelectedColorView",["jquery","underscore","backbone","text!templates/PaletteSelectedColorTemplate.tpl"],function(e,t,n,o){var i=n.View.extend({tagName:"div",className:"b-palette-selected-color__item",template:t.template(o),initialize:function(e){console.info("PaletteSelectedColorView"),this.model=e.model},render:function(){return this.$el.html(this.template({name:this.model.get("name"),value:this.model.get("value")})),this.$el},events:{"click .b-palette-selected-color__remove":function(){this.model.destroy()}}});return i}),define("views/PaletteSelectedColorsView",["jquery","underscore","backbone","views/PaletteSelectedColorView"],function(e,t,n,o){var i=n.View.extend({el:"#palette-selected-colors-placeholder",initialize:function(e){console.info("PaletteSelectedColorsView"),this.collection=e.collection,this.listenTo(this.collection,"add",this.render),this.listenTo(this.collection,"remove",this.render),this.listenTo(this.collection,"destroy",this.render),this.listenTo(this.collection,"change:selected",this.render),this.render()},render:function(){this.$el.empty();var e=this.collection.where({selected:!0});t.each(e,function(e){var t=new o({model:e});this.$el.append(t.render())},this)}});return i}),define("views/PaletteSelectedCountView",["jquery","underscore","backbone"],function(e,t,n){var o=n.View.extend({el:"#palette-selected-count",initialize:function(e){console.info("PaletteSelectedCountView"),this.collection=e.collection,this.listenTo(this.collection,"change:selected",this.render),this.listenTo(this.collection,"remove",this.render),this.render()},render:function(){this.$el.text(this.collection.where({selected:!0}).length)}});return o}),define("views/PaletteMultiselectView",["jquery","underscore","backbone"],function(e,t,n){var o=n.View.extend({el:".b-palette-multiselect",initialize:function(e){console.info("PaletteCountView"),this.collection=e.collection,this.listenTo(this.collection,"add",this.render),this.listenTo(this.collection,"remove",this.render),this.listenTo(n,"single-selection",this._changeSelectionMode),this.$checkbox=this.$(".b-palette-multiselect__checkbox"),this.render()},render:function(){return 0===this.collection.length?void this.$el.hide():(this.$el.show(),void this._changeSelectionMode(this.collection.getSelectionMode()))},events:{"click .b-palette-multiselect__checkbox":function(){this.collection.toggleSingleSelectionMode(!this.$checkbox.prop("checked"))}},_changeSelectionMode:function(e){this.$checkbox.prop("checked",!e)}});return o}),define("app",["jquery","underscore","backbone","collections/PaletteCollection","views/PaletteView","views/ColorView","views/PaletteCountView","views/PaletteAddColorView","views/PaletteSelectedColorsView","views/PaletteSelectedCountView","views/PaletteMultiselectView"],function(e,t,n,o,i,l,s,r,c,a,d){var u=function(){this._init()};return u.prototype={_init:function(){var e=[0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"],n=[];t.times(90,function(){n.push({value:"#"+t.sample(e,6).join("")})}),n.push({name:"fogdog",value:"#f06d06"});{var l=new o(n);new i({collection:l}),new s({collection:l}),new r({collection:l}),new c({collection:l}),new a({collection:l}),new d({collection:l})}}},u}),define("jquery",[],function(){return window.jQuery}),define("underscore",[],function(){return window._}),define("backbone",[],function(){return window.Backbone}),define("marionette",[],function(){return window.Marionette}),require(["app"],function(e){new e}),define("main",function(){}),require(["main"])}();