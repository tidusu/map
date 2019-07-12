//Wraps SVG text 自动换行
function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            // words = text.text().split(/\s+/).reverse(),//适用英文
            words = text.text().split('').reverse(), //适用中文
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1.4, // ems
            y = text.attr("y"),
            x = text.attr("x"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(""));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(""));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
} //wrap

// 自动缩放级  线形
map.fitBounds(turf.bbox(linestring), {
    padding: 50,
    maxZoom: 15
});

// 自动缩放级 2
var bounds = new mapboxgl.LngLatBounds();

markers.features.forEach(function(feature) {
    bounds.extend(feature.geometry.coordinates);
});

map.fitBounds(bounds);
