//>>built
define("dojo/_base/declare dojo/_base/html dijit/_WidgetBase jimu/dijit/Message dgrid/OnDemandGrid dgrid/Selection dgrid/extensions/ColumnHider dgrid/extensions/ColumnResizer dojo/Deferred dojo/Evented dojo/store/Memory esri/config esri/lang esri/tasks/RelationParameters esri/layers/GraphicsLayer esri/layers/FeatureLayer esri/tasks/QueryTask esri/tasks/query esri/tasks/ProjectParameters esri/graphic esri/geometry/Point esri/geometry/Multipoint esri/geometry/Polyline esri/geometry/Polygon esri/symbols/SimpleLineSymbol esri/symbols/SimpleFillSymbol esri/Color esri/geometry/normalizeUtils dojo/_base/lang dojo/on dojo/_base/array jimu/dijit/LoadingIndicator ./utils dojo/query".split(" "),
function(v,m,D,E,F,G,H,I,n,J,w,t,r,x,K,y,u,p,L,M,N,z,O,P,A,B,C,Q,f,q,k,R,s){return v([D,J],{baseClass:"jimu-widget-attributetable-feature-table",_defaultFeatureCount:2E3,_defaultBatchCount:25,_batchCount:0,_filterObj:null,map:null,matchingMap:!1,layerInfo:null,configedInfo:null,parentWidget:null,noGridHeight:0,footerHeight:25,layer:null,loading:null,grid:null,footer:null,selectedRowsLabel:null,selectionRows:null,griaphicLayer:null,nls:null,actived:!1,constructor:function(a){a=a||{};this.set("map",
a.map||null);this.set("matchingMap",!!a.matchingMap);this.set("layerInfo",a.layerInfo||null);this.set("layer",a.layer||null);this.set("configedInfo",a.configedInfo||null);this.parentWidget=a.parentWidget||null;this.noGridHeight=a.noGridHeight||0},postCreate:function(){this.selectionRows=[];this.loading=new R;this.loading.placeAt(this.domNode);this.get("map")&&this.own(q(this.map,"extent-change",f.hitch(this,"_onExtentChange")))},startup:function(){this.map&&(this.graphicsLayer=new K,this.map.addLayer(this.graphicsLayer))},
setLayerDefinition:function(a){this._layerDefinition=a},getLayerDefinition:function(){return f.clone(this._layerDefinition)},getFilterObj:function(){return this._filterObj},setFilterObj:function(a){this._filterObj=a},startQuery:function(a){this.loading.show();this._getLayerObject().then(f.hitch(this,function(b){this.domNode&&(this.layer=b,a&&a.spatialReference&&a.spatialReference.isWebMercator()?Q.normalizeCentralMeridian([a],null,f.hitch(this,function(a){this.domNode&&this._doQuery(a[0])}),f.hitch(this,
function(a){this._popupMessage(a.message||a)})):this._doQuery(a))}))},getSelectedRows:function(){return this.selectionRows},zoomTo:function(){this._zoomToSelected()},showSelectedRecords:function(){var a=this.layer.objectIdField;this.grid._clickShowSelectedRecords=!0;var b=this._getSelectedIds();0<b.length&&this.grid&&(this.grid.store instanceof w?this.grid.set("query",f.hitch(this,function(c){return"number"===typeof c&&-1<b.indexOf(c)||-1<b.indexOf(c[a])?!0:!1})):this.grid.set("query",function(){return b}))},
clearSelection:function(){this.grid.clearSelection();this.selectionRows=[];this.grid.set("query",{});this.graphicsLayer.clear();this.setSelectedNumber();this.emit("clear-selection")},exportToCSV:function(){return this._getExportData().then(f.hitch(this,function(a){if(this.domNode)return s.createCSVStr(a.data,a.outFields,a.pk,a.types)}))},toggleColumns:function(){this.grid&&this.grid._toggleColumnHiderMenu()},changeHeight:function(a){this.grid&&0<=a-this.noGridHeight-this.footerHeight&&m.setStyle(this.grid.domNode,
"height",a-this.noGridHeight-this.footerHeight+"px")},showGraphic:function(){this.graphicsLayer&&this.graphicsLayer.show()},hideGraphic:function(){this.graphicsLayer&&this.graphicsLayer.hide()},isSupportQueryToServer:function(){var a=this.layer&&"esri.layers.CSVLayer"===this.layer.declaredClass,b=this.layer&&"esri.layers.StreamLayer"===this.layer.declaredClass;return this.layer&&this.layer.url&&this.configedInfo.layer.url&&!a&&!b},isSupportQueryOnClient:function(){var a=this.layer&&"esri.layers.CSVLayer"===
this.layer.declaredClass,b=this.layer&&"esri.layers.StreamLayer"===this.layer.declaredClass;return!(this.layer&&this.layer.url&&this.configedInfo.layer.url)||a||b},destroy:function(){this.layer=this.parentWidget=this.configedInfo=this.layerInfo=null;this.graphicsLayer&&this.graphicsLayer.clear&&(this.graphicsLayer.clear(),this.map.removeLayer(this.graphicsLayer));this.grid&&this.grid.destroy();this.nls=this.map=null;this.inherited(arguments)},_getLayerObject:function(){return this.layerInfo.getLayerObject().then(f.hitch(this,
function(a){if(this.domNode){var b=new n;"esri.layers.ArcGISImageServiceLayer"===a.declaredClass||"esri.layers.ArcGISImageServiceVectorLayer"===a.declaredClass?(a=new y(a.url),this.own(q(a,"load",f.hitch(this,function(a){b.resolve(a.layer)})))):b.resolve(a);return b}}))},_doQuery:function(a){if(this.layer){var b=this.getSelectedRows(),c=this.layer.objectIdField;this.isSupportQueryToServer()?this._queryToServer(a,c,b):this.isSupportQueryOnClient()&&this._queryOnClient(a,c,b)}},_queryOnClient:function(a,
b,c){var d={};d.features="esri.layers.StreamLayer"===this.layer.declaredClass?this.layer.getLatestObservations():this.layer.graphics;var g=this.layer.fields,e=this.configedInfo.layer.fields;d.fields=e?k.filter(e,f.hitch(this,function(a){r.isDefined(a.show)||(a.show=!0);a.name===b&&"esriFieldTypeOID"===a.type&&(a._pk=!0);for(var c=0,d=g.length;c<d;c++)g[c].name===a.name&&!a.type&&(a.type=g[c].type);return a.show||a._pk})):k.filter(g,f.hitch(this,function(a){r.isDefined(a.show)||(a.show=!0);a.name===
b&&"esriFieldTypeOID"===a.type&&(a._pk=!0);return a.show||a._pk}));d.selectionRows=c;if(a&&t.defaults.geometryService){for(var e=[],h=d.features.length,l=0;l<h;l++)e.push(d.features[l].geometry);h=new x;h.geometries1=e;h.geometries2=[a];h.relation=x.SPATIAL_REL_INTERSECTION;t.defaults.geometryService.relation(h,f.hitch(this,function(a,b){if(this.domNode){for(var d=b.length,e=[],g=0;g<d;g++)e.push(a.features[b[g].geometry1Index]);a.features=e;this.queryExecute(c,a.fields,a.features.length,!1,a)}},
d),f.hitch(this,this._errorGeometryServices))}else this.queryExecute(c,d.fields,d.features.length,!1,d)},_queryToServer:function(a,b,c){this._getFeatureCount(a).then(f.hitch(this,function(d){if(this.domNode){var g=this.layer,e=r.isDefined(g.maxRecordCount)?g.maxRecordCount:1E3;this._batchCount=Math.min(e,this._defaultBatchCount);if(d<e)this._queryFeatureLayer(a,b,c,d,!1);else{var h=this._getOutFieldsFromLayerInfos(b),l={fields:this.layer.fields};this.layer._recordCounts=d;g.advancedQueryCapabilities&&
g.advancedQueryCapabilities.supportsPagination?this.queryExecute(c,h,d,!0,l):this._getFeatureIds(b,a).then(f.hitch(this,function(a){this.domNode&&(this.layer._objectIds=a,this.queryExecute(c,h,d,!0,l))}))}}}))},_getFeatureCount:function(a){var b=new n,c=new p;c.returnGeometry=!1;c.where=this._getLayerFilterExpression();a&&(c.geometry=a);this.layer.queryCount(c).then(f.hitch(this,function(a){this.domNode&&b.resolve(a)}),f.hitch(this,function(a){console.error(a);console.log("Could not get feature count. Defaulting to 2000 features");
b.resolve(this._defaultFeatureCount)}));return b},_queryFeatureLayer:function(a,b,c,d,g){var e=new u(this.configedInfo.layer.url),h=new p;h.where=this._getLayerFilterExpression();b=this._getOutFieldsFromLayerInfos(b);if(0<b.length){var l=k.map(b,function(a){return a.name});h.outFields=l}else h.outFields=["*"];a&&(h.geometry=a,h.spatialRelationship=p.SPATIAL_REL_INTERSECTS);h.outSpatialReference=f.clone(this.map.spatialReference);h.returnGeometry=!1;e.execute(h,f.hitch(this,this.queryExecute,c,b,d,
g),f.hitch(this,this._errorQueryTask))},_getFeatureIds:function(a,b){var c=new n,d=new p;d.returnGeometry=!1;d.returnIdsOnly=!0;d.where=this._getLayerFilterExpression();d.orderByFields=this.layer._orderByFields||[a+" ASC"];b&&(d.geometry=b);this.layer.queryIds(d).then(f.hitch(this,function(a){this.domNode&&c.resolve(a)}),f.hitch(this,function(a){console.error(a);console.log("Could not get feature Ids");c.resolve([])}));return c},queryExecute:function(a,b,c,d,g){var e=[],e=null,h={};if(this.domNode){g.fields=
this._processExecuteFields(this.layer.fields,b);d?e=s.generateCacheStore(this.layer,c,this._batchCount,this._getLayerFilterExpression()):(e=k.map(g.features,f.hitch(this,function(a){return f.clone(a.attributes)})),e=s.generateMemoryStore(e,this.layer.objectIdField));b=this.layer;h=b.advancedQueryCapabilities&&b.advancedQueryCapabilities.supportsPagination;h=s.generateColumnsFromFields(g.fields,b.typeIdField,b.types,b.advancedQueryCapabilities&&b.advancedQueryCapabilities.supportsOrderBy&&h||!d);this.createTable(h,
e,c);if(a&&a.length){for(var l in a)this.grid.select(a[l]);this.selectionRows=a;this.setSelectedNumber()}this.emit("data-loaded")}},createTable:function(a,b,c){if(this.grid)this.grid.set("store",b),this.grid.refresh();else{var d={};d.columns=a;d.store=b;d.keepScrollPosition=!0;d.pagingDelay=1E3;this.grid=new (v([F,G,H,I]))(d,m.create("div"));m.place(this.grid.domNode,this.domNode);this.grid.startup();this.grid._clickShowSelectedRecords=!1;this.own(q(this.grid,".dgrid-row:click",f.hitch(this,this._onRowClick)));
this.own(q(this.grid,".dgrid-row:dblclick",f.hitch(this,function(){this.layerInfo&&this.layerInfo.isShowInMap()&&this._zoomToSelected()})));this.own(q(this.grid,"dgrid-refresh-complete",f.hitch(this,this._onRefreshComplete)))}this.footer?m.empty(this.footer):this.footer=m.create("div",null,this.domNode);a=m.create("div",{"class":"dgrid-status self-footer",innerHTML:c+"\x26nbsp;"+this.nls.features+"\x26nbsp;"},this.footer);this.selectedRowsLabel=m.create("div",{"class":"dgrid-status self-footer",innerHTML:"0\x26nbsp;"+
this.nls.selected+"\x26nbsp;"},a,"after");a=m.getStyle(this.parentWidget.domNode,"height");this.changeHeight(a);this.loading.hide()},_getExportData:function(){if(this.layerInfo&&this.layer){var a=new n,b=null,c=this.layer.objectIdField,d=this.layer.types,g=this.getSelectedRowsData(),b=this._getOutFieldsFromLayerInfos(c),b=this._processExecuteFields(this.layer.fields,b);g&&0<g.length?a.resolve({data:g,outFields:b,pk:c,types:d}):(g=this.grid.store,g instanceof w?(g=g.data,a.resolve({data:g,outFields:b,
pk:c,types:d})):this._getExportDataFromServer(b).then(f.hitch(this,function(e){a.resolve({data:e,outFields:b,pk:c,types:d})})));return a}},_getExportDataFromServer:function(a){var b=new n,c=new u(this.layer.url),d=new p;d.where=this._getLayerFilterExpression();0<a.length?(a=k.map(a,function(a){return a.name}),d.outFields=a):d.outFields=["*"];d.outSpatialReference=f.clone(this.map.spatialReference);d.returnGeometry=!1;c.execute(d,f.hitch(this,function(a){this.domNode&&(a=k.map(a.features,function(a){return a.attributes}),
b.resolve(a))}),f.hitch(this,function(a){console.error(a);b.resolve([])}));return b},getSelectedRowsData:function(){if(!this.grid)return null;var a=this.layer.objectIdField,b=this.grid.store,c=b._entityData||b.data,b=this.getSelectedRows();return k.map(b,f.hitch(this,function(b){for(var g=0,e=c.length;g<e;g++)if(c[g]&&c[g][a]===b)return c[g];return{}}))||[]},setSelectedNumber:function(){if(this.selectedRowsLabel&&this.grid){var a=this.getSelectedRows();this.selectedRowsLabel.innerHTML="\x26nbsp;\x26nbsp;"+
a.length+" "+this.nls.selected+"\x26nbsp;\x26nbsp;"}},selectFeatures:function(a,b){b&&0<b.length?("rowclick"===a||"selectall"===a?this.addGraphics(b,!0):"zoom"===a&&this.getExtent(b).then(f.hitch(this,function(a){a&&("point"===a.type?this.map.centerAndZoom(a,15):this.map.setExtent(a.expand(1.1)))}),f.hitch(this,function(a){console.error(a)})),this.setSelectedNumber()):this._popupMessage(this.nls.dataNotAvailable)},getGraphicsFromLocalFeatureLayer:function(a){for(var b=[],c,d,g=a.length,e=this.layer.graphics.length,
f=this.layer.objectIdField,l=0;l<g;l++)for(var k=0;k<e;k++)if(c=this.layer.graphics[k].attributes[f]+"",d=a[l]+"",c===d){b.push(this.layer.graphics[k]);break}return b},addGraphics:function(a){var b,c,d=a.length;this.graphicsLayer.clear();for(var g=new A(A.STYLE_SOLID,new C([0,255,255]),2),e=0;e<d;e++)c=null,a[e].geometry?(a[e].geometry.spatialReference.equals(this.map.spatialReference)||console.warn("unable to draw graphic result in different wkid from map"),"point"===a[e].geometry.type?(c=new N(a[e].geometry.toJson()),
b=f.clone(this.map.infoWindow.markerSymbol)):"multipoint"===a[e].geometry.type?(c=new z(a[e].geometry.toJson()),b=f.clone(this.map.infoWindow.markerSymbol)):"polyline"===a[e].geometry.type?(c=new O(a[e].geometry.toJson()),b=g):"polygon"===a[e].geometry.type&&(c=new P(a[e].geometry.toJson()),b=new B(B.STYLE_SOLID,g,new C([255,255,255,0.25]))),c=new M(c,b,a[e].attributes,a[e].infoTemplate),this.graphicsLayer.add(c)):console.error("unable to get geometry of the reocord: ",a[e])},getExtent:function(a){var b=
new n,c,d,g=a.length;if(1===g&&a[0].geometry&&"point"===a[0].geometry.type)c=a[0].geometry;else{if(1===g&&!a[0].geometry)return b.reject(Error("AttributeTable.getExtent:: extent was not projected.")),b;for(var e=0;e<g;e++)a[e].geometry?"point"===a[e].geometry.type?(d||(d=new z(a[e].geometry.spatialReference)),d.addPoint(a[e].geometry),e===g-1&&(c=d.getExtent())):c=c?c.union(a[e].geometry.getExtent()):a[e].geometry.getExtent():console.error("unable to get geometry of the reocord: ",a[e])}if(!c||!c.spatialReference)return b.reject(Error("AttributeTable.getExtent:: extent was not projected.")),
b;a=this.map.spatialReference;c.spatialReference.equals(a)?b.resolve(c):(d=new L,d.geometries=[c],d.outSR=a,t.defaults.geometryService.project(d,f.hitch(this,function(a){this.domNode&&(a&&a.length?b.resolve(a[0]):b.reject(Error("AttributeTable.getExtent:: extent was not projected.")))}),f.hitch(this,function(a){a||(a=Error("AttributeTable.getExtent:: extent was not projected."));b.reject(a)})));return b},_onRefreshComplete:function(a){if(a.grid._clickShowSelectedRecords){var b=this.selectionRows;
k.forEach(b,f.hitch(this,function(b){a.grid.select(b)}));a.grid._clickShowSelectedRecords=!1;this.isSupportQueryToServer()?this._queryFeaturesByIds(b,"selectall"):this.isSupportQueryOnClient()&&this.selectFeatures("selectall",this.getGraphicsFromLocalFeatureLayer(b))}},_zoomToSelected:function(){if(this.configedInfo){var a=this._getSelectedIds();0!==a.length&&(this.isSupportQueryToServer()?this._queryFeaturesByIds(a,"zoom"):this.isSupportQueryOnClient()&&this.selectFeatures("zoom",this.getGraphicsFromLocalFeatureLayer(a)))}},
_queryFeaturesByIds:function(a,b){var c=new p;c.objectIds=a;c.returnGeometry=!0;c.outSpatialReference=f.clone(this.map.spatialReference);c.outFields=["*"];var d=this.layer,g="esri.layers.CSVLayer"===d.declaredClass;d.url&&!g?(new u(d.url)).execute(c,f.hitch(this,function(a){this.selectFeatures(b,a.features)}),f.hitch(this,this._errorSelectFeatures)):d.selectFeatures(c,y.SELECTION_NEW,f.hitch(this,this.selectFeatures,b),f.hitch(this,this._errorSelectFeatures))},_onRowClick:function(){var a=this._getSelectedIds();
this.selectionRows=a;a.length?this.isSupportQueryToServer()?this._queryFeaturesByIds(a,"rowclick"):this.isSupportQueryOnClient()&&this.selectFeatures("rowclick",this.getGraphicsFromLocalFeatureLayer(a)):this.graphicsLayer.clear();this.setSelectedNumber();this.emit("row-click",{table:this,selectedIds:a})},_onExtentChange:function(a){this.matchingMap&&this.actived&&this.startQuery(a.extent)},_getLayerFilterExpression:function(){var a=this._filterObj&&this._filterObj.expr||"",b=this.layerInfo.getFilterOfWebmap();
return a?b?a+" AND "+b:a:b?b:"1\x3d1"},_getOutFieldsFromLayerInfos:function(a){var b=this.configedInfo.layer.fields,c=[];b&&k.forEach(b,f.hitch(this,function(b){r.isDefined(b.show)||(b.show=!0);if(b.name===a&&("esriFieldTypeOID"===b.type||!b.type))b._pk=!0;(b.show||b._pk)&&c.push(b)}));return c},_processExecuteFields:function(a,b){if(a&&0<a.length){var c=[];if(!b.length)return a;for(var d=0,g=b.length;d<g;d++)for(var e=0;e<a.length;e++)if(b[d].name===a[e].name&&(b[d].type===a[e].type||!b[d].type))a[e]=
f.mixin(a[e],b[d]),c.push(a[e]);return c}return b},_getSelectedIds:function(){var a=[],b=this.grid.selection,c;for(c in b)b[c]&&(isFinite(c)?a.push(parseInt(c,10)):a.push(c));return a},_errorQueryTask:function(a){this._popupMessage(a.message)},_errorGeometryServices:function(a){this.popupMessage(a.message)},_errorSelectFeatures:function(a){this.popupMessage(a.message)},_popupMessage:function(a){var b=new E({message:a,buttons:[{label:this.nls.ok,onClick:f.hitch(this,function(){b.close()})}]});this.loading.hide()}})});