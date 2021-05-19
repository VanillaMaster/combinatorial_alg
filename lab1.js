const alph = ["a","b","c","d","e","f","g","h"];
const fs = require('fs');

function getKnightNeighbors(knight) {
  return [
    {x:(alph.indexOf(knight.x)+1)-1,y:knight.y+2}, // 1
    {x:(alph.indexOf(knight.x)+1)+1,y:knight.y+2}, // 2
    {x:(alph.indexOf(knight.x)+1)+2,y:knight.y+1}, // 3
    {x:(alph.indexOf(knight.x)+1)+2,y:knight.y-1}, // 4
    {x:(alph.indexOf(knight.x)+1)+1,y:knight.y-2}, // 5
    {x:(alph.indexOf(knight.x)+1)-1,y:knight.y-2}, // 6
    {x:(alph.indexOf(knight.x)+1)-2,y:knight.y-1}, // 7
    {x:(alph.indexOf(knight.x)+1)-2,y:knight.y+1}, // 8
  ]
}

function getKnightValidNeighbors(iKnight,iFoot) {
  let neighbors = getKnightNeighbors(iKnight);
  let result = []
  neighbors.forEach((item, i) => {
    if (item.x >= 1 && item.x <= 8 && item.y >= 1 && item.y <= 8) {

      if (((alph.indexOf(item.x)+1) != (alph.indexOf(iFoot.x)+1)+1 && item.y != iFoot.y+1) &&
          ((alph.indexOf(item.x)+1) != (alph.indexOf(iFoot.x)+1)+1 && item.y != iFoot.y-1) &&
          ((alph.indexOf(item.x)+1) != (alph.indexOf(iFoot.x)+1)-1 && item.y != iFoot.y+1) &&
          ((alph.indexOf(item.x)+1) != (alph.indexOf(iFoot.x)+1)-1 && item.y != iFoot.y-1)) {
        item.x = alph[item.x-1];

        if (!field[item.x][item.y]) {
          result.push(item);
        }
      }
    }
  });
  return result;
}


var field = {}
alph.forEach((item, i) => {
  field[item] = [NaN,NaN,NaN,NaN,NaN,NaN,NaN,NaN,NaN];
});

//===========================================

let input = fs.readFileSync("./input.txt","utf-8");
let tmp = input.split("\r\n")

/*
var kn = {x:"a",y:1}
var foot = {x:"c",y:4}
*/

var kn = {x:tmp[0][0],y:parseInt(tmp[0][1])}
var foot = {x:tmp[1][0],y:parseInt(tmp[1][1])}

field[kn.x][kn.y]={};

let qeue = [];
qeue.push(kn)
let isFinded = false;

//===========================================

while (!isFinded) {

  let elem = qeue.shift();

  let childs = getKnightValidNeighbors(elem,foot);

  childs.forEach((item, i) => {
    if (item.x == foot.x && item.y == foot.y) {
      //console.log("f");
      isFinded = true;
    }
    field[item.x][item.y] = {parentX:elem.x,parentY:elem.y}
    qeue.push(item);
  });

}

//===========================================


let path = [];
path.unshift(field[foot.x][foot.y])



while ("parentX" in path[0]) {
  path.unshift(field[path[0].parentX][path[0].parentY]);
}
path = path.splice(1);
path.push({parentX:foot.x,parentY:foot.y})


console.log("path:");

console.log(path);
//===========================================

fs.writeFileSync("./output.txt","");

path.forEach((item, i) => {
  fs.writeFileSync("./output.txt",`${item.parentX}${item.parentY}\n\r`,{flag:"a+"});
});
