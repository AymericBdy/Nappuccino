import{d as x,b as M,m as y,l as w,c as k}from"./vendor.0621d4ad.js";const F=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function t(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=t(o);fetch(o.href,r)}};F();var _="pk.eyJ1IjoidGhpYmF1ZC1taWNoZWwiLCJhIjoiY2sxODFicG83MGUzMjNlbXpydDRzdHBtdiJ9.vIUDkExus2d7R7bhK2AqPg";class S{_map;_indoor;_indoorMap;_container;_levelsButtons;_selectedButton;constructor(){this._levelsButtons=[],this._selectedButton=null,this._indoorMap=null}onAdd(e){if(e.indoor===void 0)throw Error("call addIndoorTo(map) before creating the IndoorControl");this._map=e,this._indoor=this._map.indoor;const t=this._container=document.createElement("div");return t.classList.add("mapboxgl-ctrl"),t.classList.add("mapboxgl-ctrl-group"),t.style.display="none",t.addEventListener("contextmenu",this._onContextMenu),this._indoorMap=this._indoor.getSelectedMap(),this._indoor.getSelectedMap()!==null&&(this._updateNavigationBar(),this._setSelected(this._indoor.getLevel())),e.on("indoor.map.loaded",this._onMapLoaded),e.on("indoor.map.unloaded",this._onMapUnLoaded),e.on("indoor.level.changed",this._onLevelChanged),t}onRemove(){this._container?.removeEventListener("contextmenu",this._onContextMenu),this._container?.remove(),delete this._container,this._map?.off("indoor.map.loaded",this._onMapLoaded),this._map?.off("indoor.map.unloaded",this._onMapUnLoaded),this._map?.off("indoor.level.changed",this._onLevelChanged),delete this._map}_onMapLoaded=({indoorMap:e})=>{this._indoorMap=e,this._updateNavigationBar(),this._setSelected(this._indoor.getLevel())};_onMapUnLoaded=()=>{this._indoorMap=null,this._updateNavigationBar()};_onLevelChanged=({level:e})=>this._setSelected(e);_updateNavigationBar(){if(!this._container)return;if(this._indoorMap===null){this._container.style.display="none";return}for(this._container.style.display="block",this._levelsButtons=[];this._container.firstChild;)this._container.removeChild(this._container.firstChild);const e=this._indoorMap.levelsRange;for(let t=e.max;t>=e.min;t--)this._levelsButtons[t]=this._createLevelButton(this._container,t)}_setSelected(e){this._levelsButtons.length!==0&&(this._selectedButton&&(this._selectedButton.style.fontWeight="normal"),e!==null&&this._levelsButtons[e]&&(this._levelsButtons[e].style.fontWeight="bold",this._selectedButton=this._levelsButtons[e]))}_createLevelButton(e,t){const i=document.createElement("button");return i.innerHTML=t.toString(),i.classList.add("mapboxgl-ctrl-icon"),e.appendChild(i),i.addEventListener("click",()=>{this._map?.fire("indoor.control.clicked",{level:t}),this._indoor.getLevel()!==t&&this._indoor.setLevel(t)}),i}_onContextMenu(e){e.preventDefault()}}function I(l,e){return!(l[0]>e[2]||e[0]>l[2]||l[3]<e[1]||e[3]<l[1])}function C(l,e,t=!1){return["all",l,["any",t?["!",["has","level"]]:!1,["all",["has","level"],["any",["==",["get","level"],e.toString()],["all",["!=",["index-of",";",["get","level"]],-1],[">=",e,["to-number",["slice",["get","level"],0,["index-of",";",["get","level"]]]]],["<=",e,["to-number",["slice",["get","level"],["+",["index-of",";",["get","level"]],1]]]]]]]]]}function f(l){const[e,t,i,o]=l;return[(e+i)/2,(t+o)/2]}const h="indoor";class E{_map;_level;_indoorMaps;_selectedMap;_previousSelectedMap;_previousSelectedLevel;_savedFilters;_mapLoadedPromise;_updateMapPromise;constructor(e){this._map=e,this._level=null,this._indoorMaps=[],this._savedFilters=[],this._selectedMap=null,this._previousSelectedMap=null,this._previousSelectedLevel=null,this._updateMapPromise=Promise.resolve(),this._map.loaded()?this._mapLoadedPromise=Promise.resolve():this._mapLoadedPromise=new Promise(t=>this._map.on("load",t)),this._map.on("moveend",()=>this._updateSelectedMapIfNeeded())}getSelectedMap(){return this._selectedMap}getLevel(){return this._level}setLevel(e,t=!0){if(this._selectedMap===null)throw new Error("Cannot set level, no map has been selected");this._level=e,this._updateFiltering(),t&&this._map.fire("indoor.level.changed",{level:e})}_addLayerForFiltering(e,t){this._map.addLayer(e,t),this._savedFilters.push({layerId:e.id,filter:this._map.getFilter(e.id)||["all"]})}_removeLayerForFiltering(e){this._savedFilters=this._savedFilters.filter(({layerId:t})=>e!==t),this._map.removeLayer(e)}_updateFiltering(){const e=this._level;let t;if(e!==null){const i=this._selectedMap?this._selectedMap.showFeaturesWithEmptyLevel:!1;t=o=>C(o,e,i)}else t=i=>i;this._savedFilters.forEach(({layerId:i,filter:o})=>this._map.setFilter(i,t(o)))}async addMap(e){this._indoorMaps.push(e),await this._updateSelectedMapIfNeeded()}async removeMap(e){this._indoorMaps=this._indoorMaps.filter(t=>t!==e),await this._updateSelectedMapIfNeeded()}async _updateSelectedMapIfNeeded(){await this._mapLoadedPromise,await this._updateMapPromise,this._updateMapPromise=(async()=>{const e=this._closestMap();e!==this._selectedMap&&this._updateSelectedMap(e)})(),await this._updateMapPromise}_updateSelectedMap(e){const t=this._selectedMap;if(t!==null&&(t.layersToHide.forEach(d=>this._map.setLayoutProperty(d,"visibility","visible")),t.layers.forEach(({id:d})=>this._removeLayerForFiltering(d)),this._map.removeSource(h),e||(this._previousSelectedLevel=this._level,this._previousSelectedMap=t),this.setLevel(null,!1),this._map.fire("indoor.map.unloaded",{indoorMap:t})),this._selectedMap=e,!e)return;const{geojson:i,layers:o,levelsRange:r,beforeLayerId:s}=e;this._map.addSource(h,{type:"geojson",data:i}),o.forEach(d=>this._addLayerForFiltering(d,s)),e.layersToHide.forEach(d=>this._map.setLayoutProperty(d,"visibility","none"));const n=this._previousSelectedMap===e?this._previousSelectedLevel:Math.max(Math.min(e.defaultLevel,r.max),r.min);this.setLevel(n,!1),this._map.fire("indoor.map.loaded",{indoorMap:e})}_closestMap(){if(this._map.getZoom()<17)return null;const e=this._map.getBounds(),t=[e.getWest(),e.getSouth(),e.getEast(),e.getNorth()],i=this._indoorMaps.filter(s=>I(s.bounds,t));if(i.length===0)return null;if(i.length===1)return i[0];let o=Number.POSITIVE_INFINITY,r=i[0];for(const s of i){const n=x(f(s.bounds),f(t));n<o&&(r=s,o=n)}return r}}var B=[{filter:["any",["has","building"],["has","building:part"]],id:"buildings-background",type:"fill",source:"indoor",paint:{"fill-color":"#E6E4E0","fill-opacity":{base:1,stops:[[16.5,0],[18,1]]}}},{filter:["filter-==","indoor","level"],id:"level-background",type:"fill",source:"indoor",paint:{"fill-color":"#E6E4E0","fill-opacity":{base:1,stops:[[16.5,0],[18,1]]}}},{id:"indoor-gardens",type:"fill",source:"indoor",filter:["filter-==","leisure","garden"],layout:{visibility:"visible"},paint:{"fill-color":"#cde8a2","fill-opacity":{base:1,stops:[[17,0],[18,1]]}}},{filter:["filter-==","amenity","parking"],id:"indoor-parkings",type:"fill",source:"indoor",paint:{"fill-color":"#D7CCC8","fill-outline-color":"#000000","fill-opacity":{base:1,stops:[[17,0],[18,1]]}}},{filter:["filter-==","amenity","parking"],id:"indoor-parkings-patterns",type:"fill",source:"indoor",paint:{"fill-opacity":{base:1,stops:[[17,0],[18,.1]]},"fill-pattern":"si-main-3","fill-translate-anchor":"viewport"}},{filter:["filter-==","indoor","corridor"],id:"indoor-corridors",type:"fill",source:"indoor",paint:{"fill-color":"#D7CCC8","fill-opacity":{base:1,stops:[[17,0],[18,1]]}}},{filter:["any",["filter-in-small","indoor",["literal",["room","area"]]],["filter-==","railway","platform"]],id:"indoor-rooms",type:"fill",source:"indoor",paint:{"fill-color":"#c3e5eb","fill-opacity":{base:1,stops:[[17,0],[18,1]]}}},{filter:["any",["filter-==","indoor","room"]],id:"indoor-rooms-borders",type:"line",source:"indoor",paint:{"line-color":"#808080","line-width":1.5,"line-opacity":{base:1,stops:[[17,0],[18,1]]}}},{filter:["any",["filter-==","indoor","corridor"]],id:"indoor-corridor-borders",type:"line",source:"indoor",paint:{"line-color":"#808080","line-width":1,"line-opacity":{base:1,stops:[[17,0],[18,1]]}}},{filter:["any",["filter-==","indoor","corridor-door"]],id:"indoor-corridor-door",type:"line",source:"indoor",paint:{"line-color":"#D7CCC8","line-width":3,"line-opacity":{base:1,stops:[[17,0],[18,1]]}}},{filter:["any",["filter-==","indoor","door"]],id:"indoor-rooms-doors",type:"line",source:"indoor",paint:{"line-color":"#c3e5eb","line-width":3,"line-opacity":{base:1,stops:[[17,0],[18,1]]}}},{filter:["filter-==","indoor","area"],id:"indoor-areas",type:"fill",source:"indoor",paint:{"fill-color":"#D7CCC8","fill-opacity":{base:1,stops:[[17,0],[18,1]]}}},{filter:["all",["filter-==","highway","pedestrian"],["has","level"]],id:"indoor-highways-area",type:"fill",source:"indoor",paint:{"fill-color":{base:1,stops:[[16,"hsl(230, 16%, 94%)"],[16.25,"hsl(230, 50%, 98%)"]]},"fill-outline-color":"hsl(230, 26%, 88%)","fill-opacity":1}},{filter:["all",["filter-==","highway","pedestrian"],["has","level"]],id:"indoor-highways-area-pattern",type:"fill",source:"indoor",paint:{"fill-color":"hsl(0, 0%, 100%)","fill-outline-color":"hsl(35, 10%, 83%)","fill-pattern":"pedestrian-polygon","fill-opacity":{base:1,stops:[[17,0],[18,1]]}}},{filter:["all",["filter-==","indoor","area"],["filter-==","balcony","yes"]],id:"indoor-balcony",type:"fill",source:"indoor",paint:{"fill-color":"#BDBDBD","fill-opacity":{base:1,stops:[[17,0],[18,1]]}}},{filter:["any",["filter-==","stairs","yes"],["filter-==","elevator","yes"],["filter-==","highway","elevator"]],id:"indoor-stairs",type:"fill",source:"indoor",paint:{"fill-color":"#7B635A","fill-outline-color":"#000000","fill-opacity":{base:1,stops:[[17,0],[18,1]]}}},{filter:["filter-==","indoor","wall"],id:"indoor-walls",type:"line",source:"indoor",paint:{"line-color":"#000000","line-opacity":{base:1,stops:[[17,0],[18,1]]}}},{filter:["has","barrier"],id:"indoor-barriers",type:"line",source:"indoor",paint:{"line-color":"#000000","line-opacity":{base:1,stops:[[17,0],[18,1]]}}},{filter:["filter-==","indoor","block"],id:"indoor-blocks",type:"fill",source:"indoor",paint:{"fill-color":"#000000","fill-opacity":{base:1,stops:[[17,0],[18,1]]}}},{filter:["filter-==","handrail","yes"],id:"indoor-handrail",type:"line",source:"indoor",paint:{"line-color":"#000000","line-opacity":{base:1,stops:[[17,0],[19,1]]}}},{filter:["filter-==","railway","rail"],id:"indoor-rails",type:"line",source:"indoor",paint:{"line-color":"hsl(230, 10%, 74%)","line-opacity":{base:1,stops:[[17,0],[19,1]]}}},{filter:["filter-==","railway","rail"],id:"indoor-rails-tracks",type:"line",source:"indoor",paint:{"line-color":"hsl(230, 10%, 74%)","line-opacity":{base:1,stops:[[17,0],[19,1]]},"line-width":{base:1.5,stops:[[14,4],[20,8]]},"line-dasharray":[.1,15]}},{filter:["any",["filter-in-small","indoor",["literal",["table","cupboard","chair","kitchen","sofa","tv","shelf","furniture-item"]]],["filter-==","trashcan","yes"],["filter-==","copier","yes"],["filter-==","amenity","vending_machine"]],id:"indoor-furniture",type:"fill",source:"indoor",paint:{"fill-color":"#000","fill-outline-color":"#000","fill-opacity":{base:1,stops:[[18,0],[19,.2]]}}},{id:"indoor-steps",paint:{"line-width":{base:1.5,stops:[[17,1],[18,1.6],[19,6]]},"line-color":"hsl(0, 0%, 100%)","line-dasharray":{base:1,stops:[[17,[1,0]],[17.5,[1.75,1]],[18,[1,.75]],[19,[.3,.3]]]},"line-opacity":{base:1,stops:[[17,0],[17.25,1]]}},type:"line",source:"indoor",filter:["all",["filter-==","highway","steps"],["!",["has","conveying"]]],layout:{"line-join":"round"}},{id:"indoor-conveying",paint:{"line-width":{base:1.5,stops:[[17,1],[18,1.6],[19,6]]},"line-color":"#FF0000","line-dasharray":{base:1,stops:[[17,[1,0]],[17.5,[1.75,1]],[18,[1,.75]],[19,[.3,.3]]]},"line-opacity":{base:1,stops:[[17,0],[17.25,1]]}},type:"line",source:"indoor",filter:["all",["filter-==","highway","steps"],["has","conveying"]],layout:{"line-join":"round"}},{interactive:!0,minzoom:17,layout:{"text-line-height":1.2,"text-size":{base:1,stops:[[17,10],[20,12]]},"text-allow-overlap":!1,"text-ignore-placement":!1,"text-max-angle":38,"text-font":["DIN Offc Pro Medium","Arial Unicode MS Regular"],"symbol-placement":"point","text-padding":2,visibility:"visible","text-rotation-alignment":"viewport","text-anchor":"center","text-field":"{name}","text-letter-spacing":.02,"text-max-width":8},filter:["filter-==","indoor","room"],type:"symbol",source:"indoor",id:"poi-indoor-text-ref",paint:{"text-color":"#65513d","text-halo-color":"#ffffff","text-halo-width":1,"text-opacity":{base:1,stops:[[18,0],[18.5,.5],[19,1]]}}},{interactive:!0,minzoom:17,layout:{"text-line-height":1.2,"icon-size":{base:1,stops:[[17,.5],[20,1]]},"text-size":{base:1,stops:[[17,11],[20,13]]},"text-allow-overlap":!1,"icon-image":"{maki}-15","icon-anchor":"center","text-ignore-placement":!1,"text-max-angle":38,"symbol-spacing":250,"text-font":["DIN Offc Pro Medium","Arial Unicode MS Regular"],"symbol-placement":"point","text-padding":2,visibility:"visible","text-offset":[0,1],"icon-optional":!1,"text-rotation-alignment":"viewport","text-anchor":"top","text-field":"{name}","text-letter-spacing":.02,"text-max-width":8,"icon-allow-overlap":!0},filter:["boolean",!1],type:"symbol",source:"indoor",id:"poi-indoor",paint:{"text-color":"#65513d","text-halo-color":"#ffffff","text-halo-width":1,"text-opacity":{base:1,stops:[[17,0],[17.5,.5],[19,1]]},"icon-opacity":{base:1,stops:[[17,0],[17.5,.5],[19,1]]}}}];let c=B;const v="poi-indoor",u=[{filter:["filter-==","amenity","fast_food"],maki:"fast-food"},{filter:["filter-==","amenity","cafe"],maki:"cafe"},{filter:["filter-in-small","amenity",["literal",["bank","vending_machine"]]],maki:"bank"},{filter:["filter-==","amenity","toilets"],maki:"toilet"},{filter:["any",["filter-==","highway","elevator"],["has","elevator"]],maki:"triangle-stroked"},{filter:["filter-==","natural","tree"],maki:"park"},{filter:["filter-==","shop","travel_agency"],maki:"suitcase"},{filter:["filter-==","shop","convenience"],maki:"grocery"},{filter:["filter-==","shop","bakery"],maki:"bakery"},{filter:["filter-==","shop","chemist"],maki:"pharmacy"},{filter:["filter-==","shop","clothes"],maki:"clothing-store"},{filter:["filter-==","name","porte"],maki:"entrance"}];function N(l){const e={filter:["all",["has","shop"],["!",["filter-in-small","shop",["literal",u.filter(t=>t.filter[1]==="shop").map(t=>t.filter[2])]]]],maki:"shop"};return u.concat(e).map(t=>{const i=Object.assign({},l);return i.id+=`-${t.maki}`,i.filter=t.filter,i.layout=Object.assign({},l.layout),new Set(["si_main","toilet","entrance","restaurant"]).has(t.maki)?i.layout["icon-image"]=`${t.maki}`:i.layout["icon-image"]=`${t.maki}-15`,console.log(i),i})}const m=c.find(l=>l.id===v);m&&(N(m).forEach(l=>c.push(l)),c=c.filter(l=>l.id!==v));var P=c,j={DefaultLayers:P};class D{static extractLevelFromFeature(e){if(!!e.properties&&e.properties.level!==null){const t=e.properties.level;if(typeof t=="string"){const i=t.split(";");if(i.length===1){const o=parseFloat(t);if(!isNaN(o))return o}else if(i.length===2){const o=parseFloat(i[0]),r=parseFloat(i[1]);if(!isNaN(o)&&!isNaN(r))return{min:Math.min(o,r),max:Math.max(o,r)}}}}return null}static extractLevelsRangeAndBounds(e){let t=1/0,i=-1/0;const o=M(e),r=s=>{const n=this.extractLevelFromFeature(s);n!==null&&(typeof n=="number"?(t=Math.min(t,n),i=Math.max(i,n)):typeof n=="object"&&(t=Math.min(t,n.min),i=Math.max(i,n.max)))};if(e.type==="FeatureCollection"&&e.features.forEach(r),t===1/0||i===-1/0)throw new Error("No level found");return{levelsRange:{min:t,max:i},bounds:o}}}class p{bounds;geojson;layers;levelsRange;beforeLayerId;layersToHide;defaultLevel;showFeaturesWithEmptyLevel;constructor(e,t,i,o,r,s,n,d){this.bounds=e,this.geojson=t,this.layers=i,this.levelsRange=o,this.layersToHide=r,this.defaultLevel=s,this.showFeaturesWithEmptyLevel=n,this.beforeLayerId=d}static fromGeojson(e,t={}){const{bounds:i,levelsRange:o}=D.extractLevelsRangeAndBounds(e);return new p(i,e,t.layers?t.layers:j.DefaultLayers,o,t.layersToHide?t.layersToHide:[],t.defaultLevel?t.defaultLevel:0,t.showFeaturesWithEmptyLevel?t.showFeaturesWithEmptyLevel:!1,t.beforeLayerId)}}function T(l){return Object.defineProperty(l,"indoor",{get:function(){return this._indoor||(this._indoor=new E(this)),this._indoor}}),l}const R=document.querySelector("#app"),a=new y.exports.Map({container:R,zoom:18,center:[-1.5491565,47.2488069],style:"mapbox://styles/mickael-fontes/cl0bcxzc8000215me61bis66g",accessToken:_,hash:!0});T(a);const g=await(await fetch("maps/test2.geojson")).json();a.indoor.addMap(p.fromGeojson(g));const b=await(await fetch("maps/test2-second-batiment.geojson")).json();a.indoor.addMap(p.fromGeojson(b));a.addControl(new S);const O=[g,b];a.on("dblclick",function(){console.log("Liste des images"),console.log(a.listImages()),console.log("Layer poi-label"),console.log(a.getLayer("poi-label")),console.log("Tous les layers"),console.log(a.getStyle().layers)});const L=new w({localGeocoderOnly:!0,localGeocoder:l=>{const e=[];for(var t of O)for(let i=0;i<t.features.length;i++){const o=t.features[i];o.properties.name&&o.properties.name.toLowerCase().search(l.toLowerCase())!==-1&&(o.place_name=o.properties.name,o.place_name=o.place_name+" batiment "+String(i),o.center=k(o).geometry.coordinates,o.place_type=["park"],console.log(o),e.push(o))}return e},accessToken:_,zoom:20,placeholder:"Enter search e.g. Room",marker:!1});L.on("result",l=>{l.result.properties&&l.result.properties.level&&a.indoor.setLevel(parseInt(l.result.properties.level))});a.on("click","poi-indoor-entrance",l=>{const e=l.features[0].geometry.coordinates.slice(),t=l.features[0].properties.description;for(;Math.abs(l.lngLat.lng-e[0])>180;)e[0]+=l.lngLat.lng>e[0]?360:-360;new y.exports.Popup().setLngLat(e).setHTML(t).addTo(a)});a.on("mouseenter","poi-indoor-entrance",()=>{a.getCanvas().style.cursor="pointer"});a.on("mouseleave","poi-indoor-entrance",()=>{a.getCanvas().style.cursor=""});a.addControl(L,"top-left");
