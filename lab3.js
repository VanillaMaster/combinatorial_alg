//в коде используется сложение и поиск минимального пути , хотя в постановке сказано о умножении и максимальном, при необходимости фикси сам
const fs = require('fs');
let f = fs.readFileSync("./input.txt","utf-8");

//=====================
const endOfLine = '\r\n'
//=====================

var edges = [];
var nodes = [];

var destenation;

let data = f.split(endOfLine);
let n = parseInt(data[0]) || 0;

for (var i = 0; i < n; i++) {
  let iData = data[i+1].split(" ");
  for (let j = 0; j < (iData.length-1); j+=2) {
    edges.push({start:i+1,end:parseInt(iData[j]),length:parseInt(iData[j+1])})
  }
  nodes.push(NaN);
}
nodes[data[n+1]-1] = 0;
destenation = data[n+2]

console.log(edges);
console.log(nodes);

let check = true;
let iteration = 0;

while (check) {
  check = false;
  iteration++;

  for (let i = 0; i < edges.length; i++) {
    if (!isNaN(nodes[edges[i].start-1])) {
      if (isNaN(nodes[edges[i].end-1])) {
        nodes[edges[i].end-1] = nodes[edges[i].start-1] + edges[i].length
        check = true;
      } else {
        if (nodes[edges[i].end-1] > (nodes[edges[i].start-1] + edges[i].length)) {
          nodes[edges[i].end-1] = nodes[edges[i].start-1] + edges[i].length
          check = true;
        }
      }

    }
  }
}

console.log(`\nIterations was complited: ${iteration -1}\n`);
console.log(nodes);

console.log(`distance to "${destenation}": ${nodes[destenation-1]}`);
