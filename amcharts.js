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

function createChartDiv(chartType, experimentNum){
 	var name = chartType + experimentNum.toString();
    
 	var z = document.createElement('div'); 
      	z.setAttribute("id", name);
        
    if(chartType == "chartdiv"){
        var vector = "vector" + experimentNum.toString();
        
        //z.appendChild(document.createTextNode("99 θ "));
        var y = document.createElement('div'); 
      	y.setAttribute("id", vector);
         z.appendChild(y);
    }
    
    return z;
}

//Inserts the divs where the tables containing the graphs will be set
function prepareTables(){
    var polarExp = "The polar charts show the phase difference from the given rhythm to your executed rhythm. Positive degree = phase delay, Negative degree = phase anticipation. 0 being perfect synchronization.";
    var scatterExp = "The scatter charts show the deviation of interval duration over time. The more constant, the better. Y-axis: beat interval (ms). X-Axis: beat number.";
    
    //remove jspsych styles
    var myobj = document.getElementById("jspsych-content");
    myobj.parentElement.remove();
    document.getElementsByTagName('body')[0].style = 'display:block !important';
    
    
    var z = document.createElement('div'); // is a node
    z.setAttribute("id", "PolarExplanation");
    z.appendChild(document.createTextNode(polarExp));
    document.body.appendChild(z); 
    
    polarTable();
    
    var x = document.createElement('div'); // is a node
    x.setAttribute("id", "ScatterExplanation");
    x.appendChild(document.createTextNode(scatterExp));
    document.body.appendChild(x); 
    
    scatterTable();
    
    var y = document.createElement('div'); // is a node
    y.setAttribute("id", "End");
    y.appendChild(document.createTextNode("Thanks for participating! Your data has been saved."));
    document.body.appendChild(y); 
}

function viewVector(vector, i){
    var div = document.getElementById("vector"+i);
    div.appendChild(document.createTextNode(vector));
}
 
 function polarTable() {
     var titles = ["Synchronization Only: 400ms", "Synchronization Only: 800ms", "Synchronization Only: 1200ms", "Synchronization Continuation: 400ms", "Synchronization Continuation: 800ms", "Synchronization Continuation: 1200ms"]
     
  // Obtener la referencia del elemento body
  var body = document.getElementsByTagName("body")[0];

  // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");

  var exp = 0;
  var lab = 0;
  // Crea las celdas
  for (var i = 0; i < 4; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");

    for (var j = 0; j < 3; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
        
        var isLabel = i % 2;
        if(isLabel == 0){
            var name = document.createTextNode(titles[lab]);
            lab++;
        }
        else{
            var name = createChartDiv("chartdiv", exp);
            exp++;
        }
        
        var celda = document.createElement("th");
        celda.appendChild(name);
        hilera.appendChild(celda);
      
        
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

 function polarTableCopia() {
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

    for (var j = 0; j < 3; j++) {
      // Crea un elemento <td> y un nodo de texto, haz que el nodo de
      // texto sea el contenido de <td>, ubica el elemento <td> al final
      // de la hilera de la tabla
      var celda = document.createElement("th");
      
      var name = createChartDiv("chartdiv", exp);
      
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

 function scatterTable() {
     var titles = ["Synchronization Continuation: 400ms", "Synchronization Continuation: 800ms", "Synchronization Continuation: 1200ms", "Free rhythm"];
  // Obtener la referencia del elemento body
  var body = document.getElementsByTagName("body")[0];

  // Crea un elemento <table> y un elemento <tbody>
  var tabla   = document.createElement("table");
  var tblBody = document.createElement("tbody");

  var exp = 0;
  var lab = 0;
  // Crea las celdas
  for (var i = 0; i < 4; i++) {
    // Crea las hileras de la tabla
    var hilera = document.createElement("tr");

    for (var j = 0; j < 2; j++) {
        
        var isLabel = i % 2;
        if(isLabel == 0){
            var name = document.createTextNode(titles[lab]);
            lab++;
        }
        else{
            var name = createChartDiv("scatterdiv", exp);
            exp++;
        }
        
        
         var celda = document.createElement("th");
      
      
        celda.appendChild(name);
      hilera.appendChild(celda);
     // hilera.appendChild(name);
      
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



function polarPlot(polarData, expIndex){
    
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

function scatterPlot(dataPoints, expIndex){
    const chartDiv= "scatterdiv" + expIndex.toString();
    /*
    var x = document.createElement('div'); // is a node
    x.setAttribute("id", "scatterdiv");
    document.body.appendChild(x);
    */
    
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
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: true,
  panY: true,
  wheelY: "zoomXY",
  pinchZoomX:true,
  pinchZoomY:true
}));

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererX.new(root, { minGridDistance: 50 }),
  tooltip: am5.Tooltip.new(root, {})
}));

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  renderer: am5xy.AxisRendererY.new(root, {}),
  tooltip: am5.Tooltip.new(root, {})
}));

/*
yAxis.axisHeader.children.push(am5.Label.new(root, {
  text: "ms",
  fontWeight: "300"
}));
*/

// Create series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series0 = chart.series.push(am5xy.LineSeries.new(root, {
  calculateAggregates: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "ay",
  valueXField: "ax",
  tooltip: am5.Tooltip.new(root, {
    labelText: "x: {valueX} y:{valueY}"
  })
}));


// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
series0.bullets.push(function() {
  var graphics = am5.Triangle.new(root, {
    fill: series0.get("fill"),
    width: 15,
    height: 13
  });
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});


// Create second series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series1 = chart.series.push(am5xy.LineSeries.new(root, {
  calculateAggregates: true,
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "by",
  valueXField: "bx",
  tooltip: am5.Tooltip.new(root, {
    labelText: "x: {valueX} y:{valueY}"
  })
}));

series0.strokes.template.set("strokeOpacity", 0);
series1.strokes.template.set("strokeOpacity", 0);

// Add bullet
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/#Bullets
series1.bullets.push(function() {
  var graphics = am5.Triangle.new(root, {
    fill: series1.get("fill"),
    width: 15,
    height: 13,
    rotation: 180
  });
  return am5.Bullet.new(root, {
    sprite: graphics
  });
});

/*
// trend series
var trendSeries0 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  stroke: series0.get("stroke")
}));

trendSeries0.data.setAll([
  { x: 1, y: 2 },
  { x: 12, y: 11 }
])

var trendSeries1 = chart.series.push(am5xy.LineSeries.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  valueYField: "y",
  valueXField: "x",
  stroke: series1.get("stroke")
}));

trendSeries1.data.setAll([
  { x: 1, y: 1 },
  { x: 12, y: 19 }
])

*/
// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
chart.set("cursor", am5xy.XYCursor.new(root, {
  xAxis: xAxis,
  yAxis: yAxis,
  snapToSeries: [series0, series1]
}));

// Add scrollbars
// https://www.amcharts.com/docs/v5/charts/xy-chart/scrollbars/
chart.set("scrollbarX", am5.Scrollbar.new(root, {
  orientation: "horizontal"
}));

chart.set("scrollbarY", am5.Scrollbar.new(root, {
  orientation: "vertical"
}));

var datamia = timesToPoints([100, 190, 290, 400]);

var data = [{
  "ax": 1,
  "ay": 0.5,
  "bx": 1,
  "by": 2.2
},{
  "ax": 11,
  "ay": 10.4,
  "bx": 11,
  "by": 18.8
}, {
  "ax": 12,
  "ay": 11.7,
  "bx": 12,
  "by": 19
}]

series0.data.setAll(dataPoints);
//series1.data.setAll(data);


// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series0.appear(1000);
series1.appear(1000);

//trendSeries0.appear(1000);
//trendSeries1.appear(1000);

chart.appear(1000, 100);
}
