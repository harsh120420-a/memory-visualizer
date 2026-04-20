// src/utils/segmentEngine.js

// Allocates a segment using the First-Fit algorithm
export const allocateFirstFit = (memoryMap, segment) => {
  let newMap = [...memoryMap];
  
  for (let i = 0; i < newMap.length; i++) {
    let block = newMap[i];
    
    // Find the first free block that is large enough
    if (block.isFree && block.size >= segment.size) {
      let allocatedBlock = { 
        id: segment.id, 
        name: segment.name, 
        size: segment.size, 
        isFree: false 
      };
      
      let remainingSize = block.size - segment.size;
      newMap.splice(i, 1, allocatedBlock); // Replace free block with allocated segment

      // If there is leftover space, create a smaller free block (splitting)
      if (remainingSize > 0) {
        newMap.splice(i + 1, 0, { 
          id: `free-${Date.now()}`, 
          name: 'Free', 
          size: remainingSize, 
          isFree: true 
        });
      }
      return { success: true, newMap };
    }
  }
  // Returns false if no contiguous block is large enough (External Fragmentation)
  return { success: false, newMap }; 
};

// Deallocates a segment and merges adjacent free blocks
export const deallocateSegment = (memoryMap, segmentId) => {
  let newMap = memoryMap.map(block =>
    block.id === segmentId? {...block, isFree: true, name: 'Free', id: `free-${Date.now()}` } : block
  );

  // Merge adjacent free blocks (Coalescing) to prevent artificial fragmentation
  let mergedMap = [];
  for (let i = 0; i < newMap.length; i++) {
    if (newMap[i].isFree && mergedMap.length > 0 && mergedMap[mergedMap.length - 1].isFree) {
      mergedMap[mergedMap.length - 1].size += newMap[i].size;
    } else {
      mergedMap.push(newMap[i]);
    }
  }
  return mergedMap;
};