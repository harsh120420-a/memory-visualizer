import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Zap } from 'lucide-react';
import { 
  allocateFirstFit, 
  allocateBestFit, 
  allocateWorstFit, 
  deallocateSegment, 
  compactMemory 
} from '../utils/segmentEngine';

export default function Segmentation() {
  const TOTAL_MEMORY = 1000;
  const [memoryMap, setMemoryMap] = useState([
    { id: 'initial-free', name: 'Free', size: 1000, isFree: true }
  ]);
  const [segName, setSegName] = useState('Process A');
  const [segSize, setSegSize] = useState(250);
  const [algo, setAlgo] = useState('first-fit');
  const [error, setError] = useState('');

  const handleAllocate = () => {
    if (segSize <= 0 || segSize > TOTAL_MEMORY) return;
    
    const segment = { id: `seg-${Date.now()}`, name: segName, size: Number(segSize) };
    let result;

    if (algo === 'first-fit') result = allocateFirstFit(memoryMap, segment);
    else if (algo === 'best-fit') result = allocateBestFit(memoryMap, segment);
    else if (algo === 'worst-fit') result = allocateWorstFit(memoryMap, segment);

    if (result.success) {
      setMemoryMap(result.newMap);
      setError('');
    } else {
      setError(`Allocation Failed! Total free space exists, but no single block is large enough (${segSize}KB).`);
    }
  };

  const handleDeallocate = (id) => {
    setMemoryMap(deallocateSegment(memoryMap, id));
    setError('');
  };

  const handleCompaction = () => {
    setMemoryMap(compactMemory(memoryMap));
    setError('');
  };

  const freeBlocks = memoryMap.filter(b => b.isFree);
  const totalFree = freeBlocks.reduce((acc, b) => acc + b.size, 0);
  const maxFree = freeBlocks.length > 0 ? Math.max(...freeBlocks.map(b => b.size)) : 0;
  const externalFrag = totalFree - maxFree;

  return (
    <div className="space-y-8">
      {/* Control Panel */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-wrap gap-6 items-end border border-gray-700">
        <div className="flex flex-col space-y-2 grow">
          <label className="text-sm text-gray-400">Segment Name</label>
          <input type="text" value={segName} onChange={(e) => setSegName(e.target.value)} className="px-4 py-2 bg-gray-700 rounded text-white outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-gray-400">Size (KB)</label>
          <input type="number" value={segSize} onChange={(e) => setSegSize(Number(e.target.value))} className="px-4 py-2 bg-gray-700 rounded w-32 text-white outline-none focus:ring-2 focus:ring-purple-500" />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-gray-400">Strategy</label>
          <select value={algo} onChange={(e) => setAlgo(e.target.value)} className="px-4 py-2 bg-gray-700 rounded text-white outline-none focus:ring-2 focus:ring-purple-500">
            <option value="first-fit">First Fit</option>
            <option value="best-fit">Best Fit</option>
            <option value="worst-fit">Worst Fit</option>
          </select>
        </div>
        <button onClick={handleAllocate} className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded font-semibold transition text-white">
          <Plus className="w-4 h-4 mr-2" /> Allocate
        </button>
        <button onClick={handleCompaction} className="flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded font-semibold transition text-white border border-indigo-400">
          <Zap className="w-4 h-4 mr-2" /> Compact
        </button>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded">
          <strong>Fragmentation Error: </strong> {error}
        </div>
      )}

      {/* Visualizer */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-3 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-white uppercase tracking-wider">
            Memory Map: <span className="text-purple-400">{algo.replace('-', ' ')}</span>
          </h2>
          <div className="w-full h-32 bg-gray-900 flex rounded-lg overflow-hidden border-2 border-gray-600">
            <AnimatePresence>
              {memoryMap.map((block) => (
                <motion.div
                  key={block.id}
                  layout
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: `${(block.size / TOTAL_MEMORY) * 100}%` }}
                  exit={{ opacity: 0, width: 0 }}
                  className={`h-full flex flex-col justify-center items-center border-r border-gray-900 relative group transition-colors ${block.isFree ? 'bg-gray-700/30' : 'bg-indigo-600 hover:bg-indigo-500'}`}
                >
                  <span className="text-xs font-bold text-white truncate px-1 w-full text-center">{block.name}</span>
                  <span className="text-[10px] text-gray-300">{block.size}KB</span>
                  {!block.isFree && (
                    <button onClick={() => handleDeallocate(block.id)} className="absolute inset-0 bg-red-600/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Trash2 className="w-5 h-5 text-white" />
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Metrics Sidebar */}
        <div className="col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 space-y-4">
          <h2 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-2 text-white">Analysis</h2>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Total Free:</span>
            <span className="text-green-400 font-mono">{totalFree} KB</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Max Block:</span>
            <span className="text-blue-400 font-mono">{maxFree} KB</span>
          </div>
          <div className="flex justify-between text-sm border-t border-gray-700 pt-4">
            <span className="text-gray-400">Ext. Frag:</span>
            <span className={`font-mono ${externalFrag > 0 ? 'text-red-400' : 'text-gray-400'}`}>{externalFrag} KB</span>
          </div>
          <p className="text-[10px] text-gray-500 italic mt-4">
            *Internal fragmentation is 0KB in variable partitioning.
          </p>
        </div>
      </div>
    </div>
  );
}