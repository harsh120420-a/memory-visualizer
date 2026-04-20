// src/components/Segmentation.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { allocateFirstFit, deallocateSegment } from '../utils/segmentEngine';

export default function Segmentation() {
  const TOTAL_MEMORY = 1000; // 1000 KB Total Simulated Physical Memory
  const [memoryMap, setMemoryMap] = useState([]);
  const [segName, setSegName] = useState('Process A');
  const [segSize, setSegSize] = useState(250);
  const [error, setError] = useState('');

const handleAllocate = () => {
  if (segSize <= 0 || segSize > TOTAL_MEMORY) return;
    const segment = { id: `seg-${Date.now()}`, name: segName, size: Number(segSize) };
    const result = allocateFirstFit(memoryMap, segment);

    if (result.success) {
      setMemoryMap(result.newMap);
      setError('');
    } else {
      setError(`Allocation Failed! Cannot fit ${segSize}KB. This is External Fragmentation: Total free space exists, but no single contiguous block is large enough.`);
    }
  };

  const handleDeallocate = (id) => {
    setMemoryMap(deallocateSegment(memoryMap, id));
    setError('');
  };

  // Calculate External Fragmentation Metrics
  const freeBlocks = memoryMap.filter(b => b.isFree);
  const totalFree = freeBlocks.reduce((acc, b) => acc + b.size, 0);
  const maxFree = freeBlocks.length > 0? Math.max(...freeBlocks.map(b => b.size)) : 0;
  const externalFrag = totalFree - maxFree; // Free space that cannot be used for a max-size request

  return (
    <div className="space-y-8">
      {/* Control Panel */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-wrap gap-6 items-end border border-gray-700">
        <div className="flex flex-col space-y-2 grow">
          <label className="text-sm text-gray-400">Segment Name</label>
          <input type="text" value={segName} onChange={(e) => setSegName(e.target.value)} className="px-4 py-2 bg-gray-700 rounded text-white focus:ring-2 focus:ring-purple-500 outline-none" />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="text-sm text-gray-400">Size (KB)</label>
          <input type="number" value={segSize} onChange={(e) => setSegSize(Number(e.target.value))} className="px-4 py-2 bg-gray-700 rounded w-32 text-white focus:ring-2 focus:ring-purple-500 outline-none" />
        </div>
        <button onClick={handleAllocate} className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded font-semibold transition text-white">
          <Plus className="w-4 h-4 mr-2" /> Allocate Segment
        </button>
      </div>

      {error && (
        <div className="bg-red-900 border border-red-500 text-red-200 px-4 py-3 rounded relative">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Visualizer & Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-3 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-white">Physical Memory View (First-Fit)</h2>
          {/* Main Memory Bar */}
          <div className="w-full h-32 bg-gray-900 flex rounded-lg overflow-hidden border-2 border-gray-600">
            <AnimatePresence>
              {memoryMap.map((block) => (
                <motion.div
                  key={block.id}
                  layout
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  className={`h-full flex flex-col justify-center items-center border-r border-gray-900 relative group ${block.isFree? 'bg-gray-700/50' : 'bg-indigo-600 hover:bg-indigo-500 cursor-pointer'}`}
                  style={{ width: `${(block.size / TOTAL_MEMORY) * 100}%` }}
                >
                  <span className="text-xs font-bold text-white text-center px-1 overflow-hidden truncate w-full">{block.name}</span>
                  <span className="text-xs text-gray-300">{block.size} KB</span>
                  
                  {!block.isFree && (
                    <button onClick={() => handleDeallocate(block.id)} className="absolute inset-0 w-full h-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                      <Trash2 className="w-6 h-6 text-red-400" />
                    </button>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700 flex flex-col space-y-4">
          <h2 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-2 text-white">Metrics</h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Memory:</span>
            <span className="font-bold text-white">{TOTAL_MEMORY} KB</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Free:</span>
            <span className="font-bold text-green-400">{totalFree} KB</span>
          </div>
          <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
            <span className="text-gray-400">Ext. Fragmentation:</span>
            <span className={`font-bold ${externalFrag > 0? 'text-red-400' : 'text-blue-400'}`}>{externalFrag} KB</span>
          </div>
        </div>
      </div>
    </div>
  );
}