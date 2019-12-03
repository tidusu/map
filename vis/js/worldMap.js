function worldMap(userData) {
  console.log(userData);
  var width = 980,
    height = width;

  var projection = d3.geo.mercator()
    .scale(153)
    .translate([width / 2, height / 1.5])
    .rotate([0, 0, 0]); //center on USA because 'murica

  var zoom = d3.behavior.zoom()
    .scaleExtent([1, 20])
    .on("zoom", zoomed);

  var svg = d3.select("#vis").append("svg")
    .attr("width", width)
    .attr("height", height)
    .call(zoom);

  //for tooltip 
  var offsetL = document.getElementById('map').offsetLeft + 10;
  var offsetT = document.getElementById('map').offsetTop + 10;

  var path = d3.geo.path()
    .projection(projection);

  var tooltip = d3.select("#map")
    .append("div")
    .attr("class", "tooltip hidden");

  //need this for correct panning
  var g = svg.append("g");
  var g1 = svg.append("g");

  // 设置颜色比例尺
  var colorA = d3.hsl(185, 0.67, 0.59); // 蓝色
  var colorB = d3.hsl(185, 0.67, 0.9); // 白色
  // var colorA = d3.hsl(40, 0.99, 0.65); // 黄
  // var colorB = d3.hsl(40, 0.99, 0.9); // 白色

  // computeColor(i)，i为0~1，输出colorA、colorB之间的数
  var computeColor = d3.interpolate(colorB, colorA);
  var compute = d3.scale.sqrt().range([0, 1]);

  queue()
    .defer(d3.json, "data/combined.json")
    .defer(d3.json, userData)
    .defer(d3.json, "data/9-topo.json")
    .await(ready);

  function ready(error, countries, userCountry, bounds) {
    console.log(countries);
    console.log(userCountry);
    console.log(bounds);

    var userRange = userCountry
      .map(function (d) { return { text: d.country, size: +d.value }; })
      .sort(function (a, b) { return d3.descending(a.size, b.size) });

    compute.domain([
      d3.min(userRange, function (d) { return d.size; }),
      d3.max(userRange, function (d) { return d.size; })
    ])

    //九段线
    var country_line = g.append("g")
      .attr("class", "countryline")
      .selectAll("countryline")
      .data(topojson.feature(bounds, bounds.objects.nine).features)
      .enter().append("path")
      .attr("d", path)

    var country = g.append("g")
      .attr("class", "country")
      .selectAll("country")
      .data(topojson.feature(countries, countries.objects.worldEn).features)
      .enter().append("path")
      .attr("name", function (d) { return d.properties.name; })
      .attr("id", function (d) { return d.id; })
      .on('click', selected)
      .on("mousemove", showTooltip)
      .on("mouseout", function (d, i) {
        tooltip.classed("hidden", true);
      })
      .attr("d", path)
      .filter(function (d, i) {
        for (var j = 0; j < userCountry.length; j++) {
          if (d.properties.name == userCountry[j].country) {
            return d;
          }
        }
      })
      .attr("class", "selected")
      .style("fill", function (d, i) {
        //     c = cities;
        var temp_n = 1;
        for (var j = 0; j < userCountry.length; j++) {
          if (d.properties.name == userCountry[j].country) {
            temp_n = userCountry[j].value;
            break;
          }
        }
        var m = compute(temp_n);
        return computeColor(m);
      });
  }

  //dot
  // d3.json("data/user_city.json",function(data){
  //         console.log(data);
  //         g1.selectAll("path")
  //             .data(data)
  //             .enter()
  //             .append("g")
  //             .attr("class", "dot")
  //             .attr("transform", function(d, i) {
  //                 var coor = projection([d.lng, d.lat]);
  //                 return "translate(" + coor[0] + ", " + coor[1] + ")";
  //             })
  //             .append("circle")
  //             .attr("r", 4);
  //     });     

  //icon    
  d3.json("data/user_city.json", function (data) {
    // console.log(data);
    g1.selectAll("path")
      .data(data)
      .enter()
      .append("image")
      .attr("xlink:href", "flag.svg")
      .attr("height", 15)
      .attr("width", 10)
      .attr("transform", function (d, i) {
        var coor = projection([d.lng, d.lat]);
        return "translate(" + coor[0] + ", " + coor[1] + ")";
      })
      .attr("x", -5)
      .attr("y", -14);
  });

  //显示国名
  function showTooltip(d) {
    // label = d.properties.name;
    // var mouse = d3.mouse(svg.node())
    //     .map(function (d) { return parseInt(d); });
    // tooltip.classed("hidden", false)
    //     .attr("style", "left:" + (mouse[0] + offsetL) + "px;top:" + (mouse[1] + offsetT) + "px")
    //     .html(label);
  }

  function selected() {
    // d3.select('.selected').classed('selected', false);
    if (d3.select(this).classed('selected')) {
      d3.select(this).classed('selected', false);
    }
    else {
      d3.select(this).classed('selected', true);
    }
  }

  function zoomed() {
    g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    g1.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    //adjust the stroke width based on zoom level
    s = d3.event.scale;
    d3.selectAll(".country")
      .style("stroke-width", 1 / s);
  }
}
