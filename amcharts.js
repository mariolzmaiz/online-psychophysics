/**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

function getClosest(time, ranges){
	var closest = ranges.reduce(function(prev, curr) {
        return (Math.abs(curr - time) < Math.abs(prev - time) ? curr : prev);
    });
    return closest
}

//count repetitions of times in each degree
function countData(polarData){
    const ranges = [-180, -150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150, 180];
    //const ranges = [0, 15, 45, 75, 105, 135, 165, 180, ];
    var dict = {};
    //initialize key values to 0
    for(let i = 0; i<ranges.length; i++){
            dict[ranges[i]] = 0;
    }
    
    for(let i = 0; i<polarData.length; i++){
            var key = getClosest(polarData[i], ranges);
            dict[key] = dict[key] + 1;
    }
    return dict;
}

//dataDict: dictionary with key=polar degree, value=number of times in that degree
function formatData(dataDict){
    var dataList = [];
    //we introduce the ranges in the correct order to be showned in the graph
    const ranges = [0, -30, -60, -90, -120, -150, 180, 150, 120, 90, 60, 30];
    
    for(let i=0; i<ranges.length; i++){
        dataList.push({ category: ranges[i], value: dataDict[ranges[i]]});
    }
    return dataList;
}




function graficon(polarData){
    var myobj = document.getElementById("jspsych-content");
   myobj.parentElement.remove();
var z = document.createElement('div'); // is a node
    z.setAttribute("id", "chartdiv");
    document.body.appendChild(z);
    
    
//am5.ready(function() {


// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new("chartdiv");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "none",
  wheelY: "none",
  startAngle: -15,
  endAngle: 345,
  innerRadius: am5.percent(40)
}));


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
const cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX"
}));
cursor.lineY.set("forceHidden", true);


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  exportable: false
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  minGridDistance: 30
});

xRenderer.grid.template.set("forceHidden", true);

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,
  categoryField: "category",
  renderer: xRenderer
}));

var yRenderer = am5radar.AxisRendererRadial.new(root, {});
yRenderer.labels.template.set("centerX", am5.p50);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3,
  min: 0,
  renderer: yRenderer
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5radar.RadarColumnSeries.new(root, {
  name: "Series 1",
  sequencedInterpolation: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "category"
}));

// Rounded corners for columns
series.columns.template.setAll({
  cornerRadius: 5,
  tooltipText: "{categoryX}: {valueY}"
});

// Make each column to be of a different color
series.columns.template.adapters.add("fill", function (fill, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

series.columns.template.adapters.add("stroke", function (stroke, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

/*
var ogData = [0, 0, 90, 180, 180, 180, 260];


// Set data
var data = [{ category: 0, value: 10}, { category: -30, value: 10},{ category: -60, value: 10},{ category: -90, value: 10}, { category: -120, value: 10},{ category: -150, value: 10},{ category: 180, value: 10},  { category: 150, value: 10},{ category: 120, value: 10},{ category: 90, value: 10}, { category: 60, value: 10}, { category: 30, value: 10}];
*/
var dict = countData(polarData);
var data = formatData(dict);

xAxis.data.setAll(data);
series.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);



// }); // end am5.ready()


}


 function createChartDiv(experimentNum){
 	var name = "chartdiv" + experimentNum.toString();
 	var z = document.createElement('div'); 
      	z.setAttribute("id", name);
      	return z;
 }
 
 function genera_tabla() {
  // Obtener la referencia del elemento body
  var body = document.getElementsByTagName("body")[0];

  // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");

  var exp = 0;
  // Crea las celdas
  for (var i = 0; i < 2; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");

    for (var j = 0; j < 2; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("th");
      
      var name = createChartDiv(exp);
      
      var textoCelda = document.createTextNode("celda en la hilera "+i+", columna "+j);
      celda.appendChild(name);
      hilera.appendChild(celda);
      
      exp++;
    }

    // agrega la hilera al final de la tabla (al final del elemento tblbody)
    tblBody.appendChild(hilera);
  }

  // posiciona el <tbody> debajo del elemento <table>
  tabla.appendChild(tblBody);
  // appends <table> into <body>
  body.appendChild(tabla);
  // modifica el atributo "border" de la tabla y lo fija a "2";
  tabla.setAttribute("border", "2");
}


function graficon1(polarData, expIndex){
    
    //var myobj1 = document.getElementById("jspsych-content");
   //myobj1.parentElement.remove();
    
const chartDiv= "chartdiv" + expIndex.toString();

/*
var z = document.createElement('div'); // is a node
    z.setAttribute("id", chartDiv);
    document.body.appendChild(z);
    */
    
//am5.ready(function() {


// Create root element
// https://www.amcharts.com/docs/v5/getting-started/#Root_element
var root = am5.Root.new(chartDiv);


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5radar.RadarChart.new(root, {
  panX: false,
  panY: false,
  wheelX: "none",
  wheelY: "none",
  startAngle: -15,
  endAngle: 345,
  innerRadius: am5.percent(40)
}));


// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
const cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
  behavior: "zoomX"
}));
cursor.lineY.set("forceHidden", true);


// Add scrollbar
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal",
  exportable: false
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xRenderer = am5radar.AxisRendererCircular.new(root, {
  minGridDistance: 30
});

xRenderer.grid.template.set("forceHidden", true);

var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  maxDeviation: 0,
  categoryField: "category",
  renderer: xRenderer
}));

var yRenderer = am5radar.AxisRendererRadial.new(root, {});
yRenderer.labels.template.set("centerX", am5.p50);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  maxDeviation: 0.3,
  min: 0,
  renderer: yRenderer
}));

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(am5radar.RadarColumnSeries.new(root, {
  name: "Series 1",
  sequencedInterpolation: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "value",
  categoryXField: "category"
}));

// Rounded corners for columns
series.columns.template.setAll({
  cornerRadius: 5,
  tooltipText: "{categoryX}: {valueY}"
});

// Make each column to be of a different color
series.columns.template.adapters.add("fill", function (fill, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

series.columns.template.adapters.add("stroke", function (stroke, target) {
  return chart.get("colors").getIndex(series.columns.indexOf(target));
});

/*
var ogData = [0, 0, 90, 180, 180, 180, 260];


// Set data
var data = [{ category: 0, value: 10}, { category: -30, value: 10},{ category: -60, value: 10},{ category: -90, value: 10}, { category: -120, value: 10},{ category: -150, value: 10},{ category: 180, value: 10},  { category: 150, value: 10},{ category: 120, value: 10},{ category: 90, value: 10}, { category: 60, value: 10}, { category: 30, value: 10}];
*/
var dict = countData(polarData);
var data = formatData(dict);

xAxis.data.setAll(data);
series.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000);
chart.appear(1000, 100);



// }); // end am5.ready()


}