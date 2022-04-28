function squareDistance(num1, num2){
    return Math.pow((num1 - num2), 2);
}

//filas: distancias de cada userbeat con todos los ogs
function matrizSquareDistance(userBeats, ogBeats){
    var matrix = [];
    for (const userBeat of userBeats){
        var row = [];
        for (const ogBeat of ogBeats){
            row.push(squareDistance(userBeat, ogBeat));
        }
        matrix.push(row);
    }
        
    return matrix;
}
    
//return row index of the closest ogBeat
function closestOgBeat(rowDistances){
    var index = 0;
 
    for (let i = 0; i < rowDistances.length; i++){
        if (rowDistances[i] < rowDistances[index]){
            index = i;
        }
    }
        
    return index;
}

function getUserBeatWithIndex(userBeats, indexes, ogIndex, ogBeats){
    var responses = [];
    for (let i = 0; i < indexes.length; i++){
        if (indexes[i] == ogIndex){
            responses.push(i);
        } 
    }
        
    if (responses.length == 0){
        return -1;
    }
        
    else if (responses.length == 1){
        return userBeats[responses[0]];
    }
        
    else{
        return closestUserBeat(responses, userBeats, ogBeats[ogIndex]);
    }
}

//return the beat closest to de ogBeat from its responses
function closestUserBeat(responses,  userBeats, ogBeat){
    var beatsToCompare = [];
    for (const response of responses){
        beatsToCompare.push(userBeats[response]);
    }
    
    var closest = beatsToCompare.reduce(function(prev, curr) {
        return (Math.abs(curr - ogBeat) < Math.abs(prev - ogBeat) ? curr : prev);
    });
    return closest
}
    
function getCleanList(ogBeats, userBeats){
    var matrix = [];
    var minDistToOgBeat = [];
    var cleanList = [];
    var response;
    
    matrix = matrizSquareDistance(userBeats, ogBeats);
    for (const row of matrix){
        minDistToOgBeat.push(closestOgBeat(row));
    }
        
    for (let i = 0; i < ogBeats.length; i++){
        response = getUserBeatWithIndex(userBeats, minDistToOgBeat, i, ogBeats);
        cleanList.push(response);
    }
        
    return cleanList;
} 

//valor negativo: anticipacion
function calcAsynchrony(ogBeats, userBeats){
    var cleanList = getCleanList(ogBeats, userBeats);
    var asynchronies = [];
    
    for (var i = 0; i < ogBeats.length; i++) {
        asynchronies.push(cleanList[i] - ogBeats[i] - 100);
    }
    visualizePolar(asynchronies);
    iri(asynchronies);
}

/*
function toPolar(ogBeats, userBeats){
    var last = 0;
    var cleanList = [];
    for(let i=0; i<ogBeats.length; i++){
        cleanList[i] = ogBeats[i] - userBeats[i] - last;
        last = ogBeats[i];
    }
    return cleanList;
}
*/


function variablerhythm(userTimes){
var e_i = 0;
var ITI_i = 0;
var E_i = 0;
var errorTimes = [];
	for(let i=2; i<userTimes.length; i++){
  	e_i = userTimes[i] - (2*userTimes[i-1] - userTimes[i-2]);
    ITI_i = userTimes[i] - userTimes[i-1];
    E_i = e_i / ITI_i;
    errorTimes.push(E_i);
  }
  return(errorTimes);
}


/*ogBeats: [nBeats, interval, silenceTime]*/
function polarAsynchrony(ogBeats, userBeats){
    var cleanList = [];
    cleanList = getCleanList(ogBeats, userBeats); 
    return toPolar(ogBeats, cleanList);
}

//get the user times that start on the continuation phase
function continuationTimes(ogBeats, userBeats){
    lastOg = ogBeats[ogBeats.length - 1];
    var min = lastOg;
    var dif = 0;
    minIndex = 0;
    contUserBeats = [];
    
    for(let i=0; i<userBeats.length; i++){
        dif = lastOg - userBeats[i];
        
        if (dif<min){
            min = dif;
            minIndex = i;
        }
        
        if(dif < 0){
        	break;
        }
    }
    //minIndex contains the first userIndex from the Continuation part
    for(let i=minIndex; i<userBeats.length; i++){
        contUserBeats.push(userBeats[i]);
    }
    return contUserBeats;
}

function polarAsynchonyCont(ogBeats, userBeats){
    var userTimesCut = continuationTimes(ogBeats, userBeats);
    var errorITI = variablerhythm(userTimesCut);
    return toPolarNormalized(errorITI);
}

function toPolarNormalized(userBeats){
    var polarList = [];
    var polar = 0;
    for(let i=0; i<userBeats.length; i++){
        polar = userBeats[i] * 180
        polarList.push(polar)
    }
    return polarList;
}

function toPolar(ogBeats, userBeats){
    var last = 0; 
    var prev = 0;
    var cleanList = [];
    var polarList = [];
    for(let i=0; i<ogBeats.length; i++){
        //if the user did not miss that beat
        if(userBeats[i] != -1){
            cleanList[i] = ogBeats[i] - userBeats[i];
            last = ogBeats[i] - prev;
            prev = ogBeats[i];
            polarList.push((cleanList[i] / last) * 360);
        }
        
    }
    return polarList;
}
//var ola = toPolar([100, 200, 300, 600, 800, 1000], [110, 240, 310, 610, 810, 1100]);
//console.log(ola);


function iri(data){
    //data = [-379, 190, 188, 160, 106, 146, 59, 85, 32, 54, 25];
    var vectorA = [];
    var vectorB = [];
    vectorA = data.slice(0, data.length - 1);
    vectorB = data.slice(1, data.length);
    
    result = [];

    for(var i = 0;i<vectorB.length;i++){
        result.push(vectorB[i] - vectorA[i]);
    }
    
    var y = document.createElement('p'); // is a node
    y.innerHTML = "inter-response intervals: " + result.toString();
    document.body.appendChild(y);
}

function visualizePolar(data){
    var myobj = document.getElementById("jspsych-content");
    myobj.parentElement.remove();
    //const wrapEl = document.getElementsByClassName("jspsych-content-wrapper");
    //wrapEl.parentNode.removeChild(wrapEl);
    
    var z = document.createElement('p'); // is a node
    z.innerHTML = 'Your asynchrony';
    document.body.appendChild(z);

    
    //let data = [-0.10, 0.10, -20, 20];
    //let data = d3.range(10).map(d3.randomBates(2));

let margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let innerRadius = 100, // 圆环内半径
    outerRadius = 120, // 圆环外半径
    boundary = d3.min([width, height]) / 2 * 0.8  // 边界
            
let svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

let g_arc = svg.append("g")
    .attr("transform", `translate(${width/2}, ${height/2})`);

let tau = 2 * Math.PI;
let arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(0);
let arcs = g_arc.append("path")
    .datum({endAngle: tau})
    .style("fill", "#ddd")
    .attr("d", arc);

let x = d3.scaleLinear()
    .domain([0, 360])
    .range([0, 2*Math.PI*outerRadius]);
let tickNumber = 12 // 把圆环均匀分成tickNumber段

let bins = d3.histogram()
    .domain(x.domain())
    .thresholds(x.ticks(tickNumber))
    (data);

// console.log(bins)

let y = d3.scaleLinear()
    .domain([0, d3.max(bins, function(d) { return d.length; })])
    .range([0, boundary - outerRadius]);

let perAngle = 2 * Math.PI / bins.length

let g_bar = svg.append('g')
let bar = g_bar.selectAll(".bar")
    .data(bins)
    .enter()
    .append("g")
    .attr("class", "bar")
    .attr("transform", (d, i) => { 
      return `translate(${width/2}, ${height/2})`
    });

bar.append("rect")
    .attr('transform', (d, i) => {
      let angle = (i*perAngle)*180/Math.PI
      return `rotate(${angle + 90})translate(${-x(d.x1-d.x0)/20}, ${-(outerRadius+y(d.length))})`
    })
    .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
    .attr("height", (d, i) => {
      return y(d.length)
    });

bar.append("text")
    .attr("dy", "-.5em")
    .attr('transform', (d, i) => {
      let angle = (i*perAngle)*180/Math.PI
      // if (angle > 90 && angle < 270) {
      //   return `rotate(${angle})translate(0, ${ -(y(d.length) + outerRadius)})rotate(180)`
      // }
      return `rotate(${angle + 90})translate(0, ${ -(y(d.length) + outerRadius)})`
    })
    .attr("text-anchor", "middle")
    .text(d => d.length);

let axis = svg.append('g')

let ticks = axis.selectAll('.tick')
  .data(x.ticks(tickNumber))
  .enter()
  .append('g')
  .attr('class', 'tick')
  .attr('transform', (d, i) => {
      return `translate(${width/2}, ${height/2})`
    })

let ticktext = ticks.append('text')
    .attr("dy", "-0.5em")
    .attr('transform', (d, i) => {
      let angle = (i*perAngle)*180/Math.PI
      // if (angle > 90 && angle < 270) {
      //   return `rotate(${angle})translate(0, ${-innerRadius})rotate(180)`
      // }
      return `rotate(${angle + 90})translate(0, ${-innerRadius})`
    })
    .attr("text-anchor", "middle")
    .text(d => d)

}



function visualize(data){
    var myobj = document.getElementById("jspsych-content");
    myobj.parentElement.remove();
    //const wrapEl = document.getElementsByClassName("jspsych-content-wrapper");
    //wrapEl.parentNode.removeChild(wrapEl);
    
    var z = document.createElement('p'); // is a node
    z.innerHTML = 'Your asynchrony';
    document.body.appendChild(z);

    
    //let data = [-0.10, 0.10, -20, 20];
    //let data = d3.range(10).map(d3.randomBates(2));

let margin = {top: 10, right: 10, bottom: 10, left: 10},
    width = 500 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

let innerRadius = 100, // 圆环内半径
    outerRadius = 120, // 圆环外半径
    boundary = d3.min([width, height]) / 2 * 0.8  // 边界
            
let svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

let g_arc = svg.append("g")
    .attr("transform", `translate(${width/2}, ${height/2})`);

let tau = 2 * Math.PI;
let arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius)
    .startAngle(0);
let arcs = g_arc.append("path")
    .datum({endAngle: tau})
    .style("fill", "#ddd")
    .attr("d", arc);

let x = d3.scaleLinear()
.domain([-100, 200])
    .range([0, 2*Math.PI*outerRadius]);
let tickNumber = 15 // 把圆环均匀分成tickNumber段

let bins = d3.histogram()
    .domain(x.domain())
    .thresholds(x.ticks(tickNumber))
    (data);

// console.log(bins)

let y = d3.scaleLinear()
    .domain([0, d3.max(bins, function(d) { return d.length; })])
    .range([0, boundary - outerRadius]);

let perAngle = 2 * Math.PI / bins.length

let g_bar = svg.append('g')
let bar = g_bar.selectAll(".bar")
    .data(bins)
    .enter()
    .append("g")
    .attr("class", "bar")
    .attr("transform", (d, i) => { 
      return `translate(${width/2}, ${height/2})`
    });

bar.append("rect")
    .attr('transform', (d, i) => {
      let angle = (i*perAngle)*180/Math.PI
      return `rotate(${angle})translate(${-x(d.x1-d.x0)/20}, ${-(outerRadius+y(d.length))})`
    })
    .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
    .attr("height", (d, i) => {
      return y(d.length)
    });

bar.append("text")
    .attr("dy", "-.5em")
    .attr('transform', (d, i) => {
      let angle = (i*perAngle)*180/Math.PI
      // if (angle > 90 && angle < 270) {
      //   return `rotate(${angle})translate(0, ${ -(y(d.length) + outerRadius)})rotate(180)`
      // }
      return `rotate(${angle})translate(0, ${ -(y(d.length) + outerRadius)})`
    })
    .attr("text-anchor", "middle")
    .text(d => d.length);

let axis = svg.append('g')

let ticks = axis.selectAll('.tick')
  .data(x.ticks(tickNumber))
  .enter()
  .append('g')
  .attr('class', 'tick')
  .attr('transform', (d, i) => {
      return `translate(${width/2}, ${height/2})`
    })

let ticktext = ticks.append('text')
    .attr("dy", "-0.5em")
    .attr('transform', (d, i) => {
      let angle = (i*perAngle)*180/Math.PI
      // if (angle > 90 && angle < 270) {
      //   return `rotate(${angle})translate(0, ${-innerRadius})rotate(180)`
      // }
      return `rotate(${angle})translate(0, ${-innerRadius})`
    })
    .attr("text-anchor", "middle")
    .text(d => d)

}

/*
 * Transforms the userTimes into the points for the scatter plot
 * continuationTimes: usertTimes from the silence period until the end
 * interval: initial "perfect" interval
 * data: [{ax: beatNum, ay: interval}, {}, ..]
 */ 
function timesToPoints(continuationTimes, interval){
    var data = [];
    var presentInterval = 0;
    data.push(interval);
    
	for (let i=1; i< continuationTimes.length; i++){
        presentInterval = continuationTimes[i] - continuationTimes[i-1];
		data.push({"ax": i, "ay": presentInterval,});
	}
    return data;
}

/*
 * Functions to calculate the Vector
 */
function sum(a) {
    var s = 0;
    for (var i = 0; i < a.length; i++) s += a[i];
    return s;
} 
 
function degToRad(a) {
    if(a < 0){
        a += 360;
    }
    return Math.PI / 180 * a;
}
 
function meanAngleDeg(angles) {
    return 180 / Math.PI * Math.atan2(
        sum(angles.map(degToRad).map(Math.sin)) / angles.length,
        sum(angles.map(degToRad).map(Math.cos)) / angles.length
    );
}

function magnitude(a){
    return math.exp(math.multiply(math.i, a));
}

function meanResVect(angles){
    return Math.abs(sum(angles.map(magnitude)) / angles.length);
}
