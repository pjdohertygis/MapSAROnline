//>>built
require({cache:{"url:themes/LaunchpadTheme/panels/LaunchpadPanel/Panel.html":'\x3cdiv\x3e\r\n  \x3cdiv class\x3d"title jimu-panel-title jimu-main-background" data-dojo-attach-point\x3d"titleNode"\x3e\r\n    \x3cdiv class\x3d"color-header" data-dojo-attach-point\x3d"colorfulHeader"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"widget-icon"\x3e\r\n      \x3cimg class\x3d"icon" src\x3d"${config.icon}"/\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"title-label" data-dojo-attach-point\x3d"titleLabelNode"\x3e\r\n      ${config.label}\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"close-icon jimu-float-trailing" data-dojo-attach-point\x3d"closeNode"\r\n         data-dojo-attach-event\x3d"onclick:_onCloseBtnClicked"\x3e\x3c/div\x3e\r\n    \x3cdiv class\x3d"expand-icon jimu-float-trailing" data-dojo-attach-point\x3d"expandNode"\r\n         data-dojo-attach-event\x3d"onclick:_onExpandNodeClick"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"jimu-panel-content" data-dojo-attach-point\x3d"containerNode"\x3e\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/_base/lang dojo/on dojo/dom-style dojo/dom-class dojo/dom-construct dojo/dom-geometry dojo/_base/fx dojo/dnd/move dojox/layout/ResizeHandle jimu/utils jimu/BaseWidgetPanel dijit/_TemplatedMixin dojo/text!./Panel.html".split(" "),function(n,e,g,c,l,p,f,m,q,r,h,s,t,u){return n([s,t],{baseClass:"jimu-panel jimu-launchpad-panel",templateString:u,titleHeight:33,normalPosition:null,lastWindowState:null,openAnimation:"fadeIn",closeAnimation:"fadeOut",animationDuration:400,
postCreate:function(){this.inherited(arguments);this._makeOriginalBox();c.set(this.colorfulHeader,"background-color",this.config.backgroundColor||"#FFFFFF")},startup:function(){this.inherited(arguments);this.panelManager.normalizePanel(this)},_makeOriginalBox:function(){this._originalBox={w:this.position.width||350,h:this.position.height||480,l:this.position.left||0,t:this.position.top||0}},makeMoveable:function(a,b,d){this.disableMoveable();var c=f.getMarginBox(jimuConfig.layoutId);c.l=c.l-b+d;c.w+=
2*(b-d);this.moveable=new q.boxConstrainedMoveable(this.domNode,{box:c,handle:a||this.titleNode,within:!0});this.own(g(this.moveable,"MoveStart",e.hitch(this,this.onMoveStart)));this.own(g(this.moveable,"Moving",e.hitch(this,this.onMoving)));this.own(g(this.moveable,"MoveStop",e.hitch(this,this.onMoveStop)))},disableMoveable:function(){this.moveable&&(this.moveable.destroy(),this.moveable=null)},makeResizable:function(){this.disableResizable();this.resizeHandle=(new r({targetId:this,minWidth:this._originalBox.w,
minHeight:this._originalBox.h,activeResize:!1})).placeAt(this.domNode);this.resizeHandle.startup()},disableResizable:function(){this.resizeHandle&&(this.resizeHandle.destroy(),this.resizeHandle=null)},onMoveStart:function(a){if(window.isRTL){var b=f.getMarginBox(jimuConfig.layoutId),d=f.getMarginBox(this.domNode),e=c.get(a.node,"right");c.set(a.node,"left",b.w-d.w-parseInt(e,10)+"px");c.set(a.node,"right","")}},onMoving:function(a){c.set(a.node,"opacity",0.9)},onMoveStop:function(a){c.set(a.node,
"opacity",1);a=f.getMarginBox(a.node);this.position.left=a.l;this.position.top=a.t},_getLayoutBox:function(){var a=jimuConfig.layoutId,a="map"===this.position.relativeTo?jimuConfig.mapId:jimuConfig.layoutId;return f.getMarginBox(a)},_onExpandNodeClick:function(){"minimized"===this.windowState?(this.panelManager.normalizePanel(this),c.set(this.domNode,"overflow","visible"),l.remove(this.expandNode,"minimized"),this.makeResizable()):(this.panelManager.minimizePanel(this),c.set(this.domNode,"overflow",
"hidden"),l.add(this.expandNode,"minimized"),this.disableResizable())},_onCloseBtnClicked:function(a){a.stopPropagation();this.panelManager.closePanel(this,"wipe")},_calculatePanelPosition:function(){"minimized"===this.windowState?this._minimize():this._normalize()},_minimize:function(){m.animateProperty({node:this.domNode,properties:{height:{start:this.normalPosition.h,end:this.titleHeight}},duration:400}).play()},_normalize:function(){var a;this.normalPosition?m.animateProperty({node:this.domNode,
properties:{height:{end:this.normalPosition.h,start:this.titleHeight}},duration:400}).play():(a=e.clone(this.position),"undefined"===typeof a.width&&(a.width=350),"undefined"===typeof a.height&&(a.height=480),a.borderRadiusStyle={borderTopLeftRadius:"2px",borderTopRightRadius:"2px",borderBottomLeftRadius:"2px",borderBottomRightRadius:"2px"},this._setPositionStyle(a))},_setPositionStyle:function(a){var b;this.position.zIndex&&(a.zIndex=this.position.zIndex);this.position.left=a.left;this.position.top=
a.top;this.position.width=a.width;this.position.height=a.height;b=h.getPositionStyle(a);e.mixin(b,a.borderRadiusStyle);c.set(this.domNode,b)},onWindowResize:function(){var a,b={};window.appInfo.isRunInMobile?(a="map"===this.position.relativeTo?this.map.id:window.jimuConfig.layoutId,a=f.getMarginBox(a),b.left=0,b.top=0,b.width=a.w,b.height=a.h,b.zIndex=this.position.zIndex):(b=e.clone(this.position),"minimized"===this.windowState&&(b.height=this.titleHeight));b=h.getPositionStyle(b);b.position="absolute";
"auto"===b.zIndex&&(b.zIndex=0);c.set(this.domNode,b);this._onResponsible()},setPosition:function(a,b){var d,g,k;b||(b="map"===a.relativeTo?this.map.id:window.jimuConfig.layoutId);d=f.getMarginBox(b);k=Math.floor(d.w/(a.width+a.margin));g=Math.floor(a.index/k);a.left=(g+1)*a.margin+a.index%k*(a.width+a.margin);a.top-=a.margin*g;this.position=e.clone(a);window.appInfo.isRunInMobile&&(a.left=0,a.top=0,a.width=d.w,a.height=d.h);d=h.getPositionStyle(a);d.position="absolute";"auto"===d.zIndex&&(d.zIndex=
0);p.place(this.domNode,b);c.set(this.domNode,d);this._onResponsible()},onNormalize:function(){this._calculatePanelPosition()},onMinimize:function(){this.normalPosition=f.position(this.domNode);this._calculatePanelPosition()},resize:function(a){var b;a&&(this.position=b={left:a.l?a.l:this.position.left,top:a.t?a.t:this.position.top,width:a.w?a.w:this.position.width,height:a.h?a.h:this.position.height,zIndex:this.position.zIndex},b=h.getPositionStyle(this.position),window.isRTL&&"right"in b&&(b.left=
b.right,b.right=""),c.set(this.domNode,b),this._onResponsible(),this.inherited(arguments))},_onResponsible:function(){window.appInfo.isRunInMobile?(this.disableMoveable(),this.disableResizable()):("minimized"===this.windowState?this.disableResizable():this.makeResizable(),this.makeMoveable(this.titleLabelNode,this.position.width,0.25*this.position.width))}})});