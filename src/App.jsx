import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, StepForward, AlertTriangle } from 'lucide-react';
import { runSimulation } from './utils/simulator';
import Segmentation from './components/Segmentation'; // Ensure this file exists!

export default function App() {
  // Application Mode State (Controls the Tabs)
  const [activeTab, setActiveTab] = useState('virtual-memory');

  // --- Virtual Memory State Variables ---
  const [refString, setRefString] = useState('7, 0, 1, 2, 0, 3, 0, 4');
  const [frameCount, setFrameCount] = useState(3);
  const [algorithm, setAlgorithm] = useState('LRU');
  
  const [simulationSteps, setSimulationSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(-1);
  const [isRunning, setIsRunning] = useState(false);

  // --- Virtual Memory Handlers ---
  const handleStartSimulation = () => {
    const steps = runSimulation(refString, frameCount, algorithm);
    setSimulationSteps(steps);
    setCurrentStepIndex(0);
    setIsRunning(true);
  };

  const handleNextStep = () => {
    if (currentStepIndex < simulationSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleReset = () => {
    setSimulationSteps();
    setCurrentStepIndex(-1);
    setIsRunning(false);
  };

  const loadBeladysAnomaly = () => {
    setRefString('1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5');
    setAlgorithm('FIFO');
    setFrameCount(3);
    handleReset();
  };

  const currentData = currentStepIndex >= 0? simulationSteps.at(currentStepIndex) : null;
  const hitRatio = currentData && (currentData.currentHits + currentData.currentFaults) > 0 
 ? Math.round((currentData.currentHits / (currentData.currentHits + currentData.currentFaults)) * 100) 
   : 0;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header & Navigation Tabs */}
        <header className="flex flex-col md:flex-row justify-between md:items-end border-b border-gray-700 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-blue-400">Dynamic Memory Management Visualizer</h1>
            <p className="text-gray-400">Simulating Paging, Virtual Memory, and Segmentation</p>
          </div>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button 
              onClick={() => setActiveTab('virtual-memory')} 
              className={`px-4 py-2 rounded-t-lg font-semibold transition ${activeTab === 'virtual-memory'? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              Virtual Memory (Paging)
            </button>
            <button 
              onClick={() => setActiveTab('segmentation')} 
              className={`px-4 py-2 rounded-t-lg font-semibold transition ${activeTab === 'segmentation'? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
            >
              Segmentation
            </button>
          </div>
        </header>

        {/* Tab Routing Logic */}
        {activeTab === 'virtual-memory'? (
           <div className="space-y-8">
             
             {/* Virtual Memory Control Panel */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col space-y-6">
              <div className="flex flex-wrap gap-6 items-end">
                <div className="flex flex-col space-y-2 grow">
                  <label className="text-sm text-gray-400">Reference String (comma separated)</label>
                  <input 
                    type="text" 
                    value={refString}
                    onChange={(e) => setRefString(e.target.value)}
                    className="px-4 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isRunning}
                  />
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-gray-400">Frames</label>
                  <input 
                    type="number" 
                    value={frameCount}
                    onChange={(e) => setFrameCount(Number(e.target.value))}
                    className="px-4 py-2 bg-gray-700 rounded w-24 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                    max="10"
                    disabled={isRunning}
                  />
                </div>

                <div className="flex flex-col space-y-2">
                  <label className="text-sm text-gray-400">Algorithm</label>
                  <select 
                    value={algorithm} 
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="px-4 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={isRunning}
                  >
                    <option value="FIFO">FIFO</option>
                    <option value="LRU">LRU</option>
                    <option value="OPT">Optimal (OPT)</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 border-t border-gray-700 pt-4">
                {!isRunning? (
                  <>
                    <button onClick={handleStartSimulation} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold transition cursor-pointer">
                      <Play className="w-4 h-4 mr-2" /> Start Simulation
                    </button>
                    <button onClick={loadBeladysAnomaly} className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded font-semibold transition cursor-pointer text-sm">
                      <AlertTriangle className="w-4 h-4 mr-2" /> Load Belady's Anomaly
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={handleNextStep} disabled={currentStepIndex >= simulationSteps.length - 1} className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 rounded font-semibold transition cursor-pointer">
                      <StepForward className="w-4 h-4 mr-2" /> Step
                    </button>
                    <button onClick={handleReset} className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-500 rounded font-semibold transition cursor-pointer">
                      <RotateCcw className="w-4 h-4 mr-2" /> Reset
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Virtual Memory Visualization Grid */}
            {currentData && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-center space-y-4">
                  <h2 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-2">Real-time Statistics</h2>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Requested Page:</span>
                    <span className="text-2xl font-bold text-white">{currentData.requestedPage}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Page Hits:</span>
                    <span className="text-2xl font-bold text-green-400">{currentData.currentHits}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Page Faults:</span>
                    <span className="text-2xl font-bold text-red-400">{currentData.currentFaults}</span>
                  </div>
                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                    <span className="text-gray-400">Hit Ratio:</span>
                    <span className="text-2xl font-bold text-blue-400">{hitRatio}%</span>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Physical Memory Frames</h2>
                    <div className={`px-4 py-1 rounded-full font-bold text-sm ${currentData.isHit? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
                       {currentData.isHit? 'PAGE HIT' : 'PAGE FAULT'}
                    </div>
                  </div>

                  <div className="flex space-x-4 overflow-x-auto p-4 min-h-40 items-center bg-gray-900 rounded-lg">
                    <AnimatePresence mode="popLayout">
                      {currentData.memoryState.map((page, index) => (
                        <motion.div
                          key={`${page}-${index}`}
                          layout
                          initial={{ opacity: 0, y: -50, scale: 0.8 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 50, scale: 0.8, backgroundColor: '#7f1d1d' }}
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                          className="w-24 h-24 flex flex-col items-center justify-center bg-blue-600 border-2 border-blue-400 rounded-xl shadow-lg"
                        >
                          <span className="text-xs text-blue-200 mb-1">Frame {index}</span>
                          <span className="text-3xl font-bold">{page}</span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {Array.from({ length: Math.max(0, frameCount - currentData.memoryState.length) }).map((_, i) => (
                      <div key={`empty-${i}`} className="w-24 h-24 flex items-center justify-center bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl">
                        <span className="text-gray-500">Empty</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
           </div>
        ) : (
           /* Load the newly created Segmentation Module */
           <Segmentation />
        )}

      </div>
    </div>
  );
}