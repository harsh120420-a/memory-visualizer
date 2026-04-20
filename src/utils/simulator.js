// // src/utils/simulator.js

// export const runSimulation = (refString, frameCount, algorithm) => {
//   // Clean and parse the input string into an array of page requests
//   const pages = refString.split(',').map(p => p.trim()).filter(p => p!== '');
  
//   let memory =[];
//   let steps   =[];      
//   let faults = 0;
//   let hits = 0;

//   pages.forEach((page) => {
//     let isHit = memory.includes(page);
//     let victim = null;

//     if (isHit) {
//       hits++;
//       // For LRU: If a page is hit, remove it from its current position and 
//       // push it to the back of the queue to mark it as the most recently used.
//       if (algorithm === 'LRU') {
//         memory = memory.filter(p => p!== page);
//         memory.push(page);
//       }
//     } else {
//       faults++;
//       // If memory has space, simply add the page
//       if (memory.length < frameCount) {
//         memory.push(page);
//       } else {
//         // If memory is full, evict the victim. 
//         // For FIFO, index 0 is the oldest. 
//         // For LRU, index 0 is the least recently used because of our array shifting above.
//         victim = memory.at(0); 
//         memory.shift(); 
//         memory.push(page);
//       }
//     }

//     // Capture a snapshot of the state at this exact step for the visualizer
//     steps.push({
//       requestedPage: page,
//       memoryState: [...memory],
//       isHit,
//       victim,
//       currentFaults: faults,
//       currentHits: hits
//     });
//   });

//   return steps;
// };


// src/utils/simulator.js

export const runSimulation = (refString, frameCount, algorithm) => {
  const pages = refString.split(',').map(p => p.trim()).filter(p => p!== '');
  let memory =[];
  let steps =[];
  let faults = 0;
  let hits = 0;

  pages.forEach((page, currentIndex) => {
    let isHit = memory.includes(page);
    let victim = null;

    if (isHit) {
      hits++;
      if (algorithm === 'LRU') {
        memory = memory.filter(p => p!== page);
        memory.push(page);
      }
    } else {
      faults++;
      if (memory.length < frameCount) {
        memory.push(page);
      } else {
        if (algorithm === 'OPT') {
          // OPT Algorithm: Find the page that won't be used for the longest time in the future
          let farthest = -1;
          let victimIndex = -1;
          
          for (let i = 0; i < memory.length; i++) {
            let nextUse = pages.indexOf(memory[i], currentIndex + 1);
            if (nextUse === -1) {
              // If the page is never used again, it's the perfect victim
              victimIndex = i;
              break;
            }
            if (nextUse > farthest) {
              farthest = nextUse;
              victimIndex = i;
            }
          }
          victim = memory[victimIndex];
          // Remove the specific victim and push the new page
          memory.splice(victimIndex, 1);
          memory.push(page);
          
        } else {
          // FIFO and LRU logic (Evict index 0)
          victim = memory.at(0); 
          memory.shift(); 
          memory.push(page);
        }
      }
    }

    steps.push({
      requestedPage: page,
      memoryState: [...memory],
      isHit,
      victim,
      currentFaults: faults,
      currentHits: hits
    });
  });

  return steps;
};