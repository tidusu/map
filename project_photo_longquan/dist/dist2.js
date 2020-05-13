function page(e){$(document.body).append("<div id='map_box'><div id='map_btn'></div><div id='map'></div></div>"),$(document.body).append("<div id='content'><div id='main'></div></div>"),$("#content").append("<div id='thumbnail' class='picture-grid'></div>"),mapboxgl.accessToken="pk.eyJ1IjoiaWZvb2J0b29rIiwiYSI6ImNqdnczZ3plODF5dDE0YW5uNGhpNWcyanAifQ.qgmnnkw85aN0xuI2HVcgHw";var a=new mapboxgl.Map({container:"map",style:"mapbox://styles/ifoobtook/cjxyb70zm0p2k1cqrloukq4k6?optimize=true",zoom:2,center:[121.44,31.75],attributionControl:!1,logoPosition:"bottom-left"}),n=new mapboxgl.LngLatBounds,t=[];function o(e){a.flyTo({center:e.geometry.coordinates,zoom:18})}a.addControl(new mapboxgl.AttributionControl,"top-right");var r=document.getElementById("main"),m=r.appendChild(document.createElement("span"));m.className="main_title",m.innerHTML=e.title;var d=r.appendChild(document.createElement("span"));d.className="main_info",d.innerHTML=e.imgShowDate;var l,s=document.getElementById("map_btn").appendChild(document.createElement("img"));s.src="expand.png",s.className="map_expand",s.style="CURSOR: pointer",s.onclick=function(){auto_zoom()},e.features.forEach((function(e,i){var o=i+1;n.extend(e.geometry.coordinates);var r=Number(e.properties.rotation),m=e.geometry.coordinates[0],d=e.geometry.coordinates[1];t.push([Number(m),Number(d)]);var l=document.createElement("div");l.className="marker",l.id="marker-"+o;var s=document.createElement("div");s.className="marker_title",s.innerHTML="<span><b>"+e.properties.imgPosition+"</b></span>";var c=document.createElement("div");c.className="marker_index",c.innerHTML="<span><b>"+o+"</b></span>",new mapboxgl.Marker(l,{offset:[0,0],rotation:r,rotationAlignment:"map",pitchAlignment:"map"}).setLngLat(e.geometry.coordinates).addTo(a),new mapboxgl.Marker(c,{offset:[0,0],rotationAlignment:"map",pitchAlignment:"map"}).setLngLat(e.geometry.coordinates).setPopup(new mapboxgl.Popup({offset:25}).setHTML(`<img src="${e.properties.url}?imageView2/2/w/400/h/400/format/jpg/q/75" class="marker_thumbnail"/>`)).addTo(a),c.addEventListener("click",(function(n){var t;t=e,a.flyTo({center:t.geometry.coordinates,zoom:18})}))})),auto_zoom=function(){a.fitBounds(n,{padding:100,maxZoom:20})},auto_zoom(),function(e){for(i=0;i<e.features.length;i++){var a=i+1,n=e.features[i].properties,t=n.url+"?imageView2/1/w/200/h/200/format/jpg/q/75",r=document.getElementById("thumbnail").appendChild(document.createElement("div"));r.className="grid-box",r.id="thumbnail-"+a;var m=r.appendChild(document.createElement("div"));m.className="thumnail_imgbox";var d=m.appendChild(document.createElement("img"));d.src=""!=t?t:n.imgUrl,d.className="thumbnail_img",d.dataPosition=i;var l=r.appendChild(document.createElement("div"));l.className="thumnail_num",l.dataPosition=i,l.innerHTML="<p>"+a+"</p>";var s=r.appendChild(document.createElement("div"));s.className="thumnail_date",s.innerHTML="<p>"+n.time+"</p>",d.addEventListener("click",(function(a){o(e.features[this.dataPosition])})),l.addEventListener("click",(function(a){o(e.features[this.dataPosition])}))}}(e),l=turf.lineString(t),a.on("load",(function(){a.addLayer({id:"route",type:"line",source:{type:"geojson",data:l},layout:{"line-join":"round","line-cap":"round"},paint:{"line-color":"#0192FA","line-opacity":.5,"line-width":2}})})),a.on("zoom",(function(){a.getZoom()<18?($(".marker_index").addClass("display_off"),$(".marker_index").removeClass("display_on"),$(".marker").addClass("scale_small")):($(".marker_index").addClass("display_on"),$(".marker_index").removeClass("display_off"),$(".marker").removeClass("scale_small"))}))}