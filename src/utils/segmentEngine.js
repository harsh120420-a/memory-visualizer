// Helper to handle the actual splitting of memory blocks
const performAllocation = (memoryMap, index, segment) => {
  let newMap = [...memoryMap];
  let block = newMap[index];
  let remainingSize = Number(block.size) - Number(segment.size);

  // Replace the free block with the allocated segment
  newMap.splice(index, 1, { 
    ...segment, 
    isFree: false 
  });

  // If there is leftover space, create a new free block
  if (remainingSize > 0) {
    newMap.splice(index + 1, 0, { 
      id: `free-${Date.now()}-${Math.random()}`, 
      name: 'Free', 
      size: remainingSize, 
      isFree: true 
    });
  }
  return { success: true, newMap };
};

export const allocateFirstFit = (memoryMap, segment) => {
  for (let i = 0; i < memoryMap.length; i++) {
    if (memoryMap[i].isFree && Number(memoryMap[i].size) >= Number(segment.size)) {
      return performAllocation(memoryMap, i, segment);
    }
  }
  return { success: false, newMap: memoryMap };
};

export const allocateBestFit = (memoryMap, segment) => {
  let bestIndex = -1;
  let minSize = Infinity;

  for (let i = 0; i < memoryMap.length; i++) {
    let block = memoryMap[i];
    if (block.isFree && Number(block.size) >= Number(segment.size) && Number(block.size) < minSize) {
      minSize = Number(block.size);
      bestIndex = i;
    }
  }

  if (bestIndex !== -1) return performAllocation(memoryMap, bestIndex, segment);
  return { success: false, newMap: memoryMap };
};

export const allocateWorstFit = (memoryMap, segment) => {
  let worstIndex = -1;
  let maxSize = -1;

  for (let i = 0; i < memoryMap.length; i++) {
    let block = memoryMap[i];
    if (block.isFree && Number(block.size) >= Number(segment.size) && Number(block.size) > maxSize) {
      maxSize = Number(block.size);
      worstIndex = i;
    }
  }

  if (worstIndex !== -1) return performAllocation(memoryMap, worstIndex, segment);
  return { success: false, newMap: memoryMap };
};

export const deallocateSegment = (memoryMap, segmentId) => {
  let newMap = memoryMap.map(block =>
    block.id === segmentId ? { ...block, isFree: true, name: 'Free', id: `free-${Date.now()}-${Math.random()}` } : block
  );

  // Coalescing: Merge adjacent free blocks
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

export const compactMemory = (memoryMap) => {
  const allocated = memoryMap.filter(b => !b.isFree);
  const totalFree = memoryMap
    .filter(b => b.isFree)
    .reduce((sum, b) => sum + Number(b.size), 0);

  const compactedMap = [...allocated];
  if (totalFree > 0) {
    compactedMap.push({
      id: `free-compact-${Date.now()}`,
      name: 'Free Space (Compacted)',
      size: totalFree,
      isFree: true
    });
  }
  return compactedMap;
};