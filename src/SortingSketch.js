
export default function sketch(values){
return function sketchP(p){
  var w = 30;
  
  var states = [-1,-1,-1,-1,-1,-1];
  
  p.setup = function() {
    p.createCanvas(800, 400);
    
    quickSort(values, 0, values.length - 1);
  }
  
  async function quickSort(arr, start, end) {
    if (start >= end) {
      return;
    }
    let index = await partition(arr, start, end);
    states[index] = -1;
  
    await Promise.all([
      quickSort(arr, start, index - 1),
      quickSort(arr, index + 1, end)
    ]);
  }
  
  async function partition(arr, start, end) {
    for (let i = start; i < end; i++) {
      states[i] = 1;
    }
  
    let pivotValue = arr[end];
    let pivotIndex = start;
    states[pivotIndex] = 0;
    for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
        await swap(arr, i, pivotIndex);
        states[pivotIndex] = -1;
        pivotIndex++;
        states[pivotIndex] = 0;
      }
    }
    await swap(arr, pivotIndex, end);
  
    for (let i = start; i < end; i++) {
      if (i !== pivotIndex) {
        states[i] = -1;
      }
    }
  
    return pivotIndex;
  }
  
  p.draw = function() {
    p.background(' #f5f2d0');
   
    for (let i = 0; i < values.length; i++) {
      p.noStroke();
      if (states[i] === 0) {
        p.fill('#E0777D');
      } else if (states[i] === 1) {
        p.fill('#4f514e');
      } else {
        p.fill('#32CD32');
      }
      p.rect(i * w + i*2 + 100, p.height -(values[i]*2) - 30, w, values[i]*2);
      p.fill('#39388E');
      p.textSize(22);
      p.text(values, 100, p.height - 5);
    }
  }
  
  async function swap(arr, a, b) {
    await sleep(1000);
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
  }
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }}}