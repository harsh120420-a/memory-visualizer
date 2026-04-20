// // // import { useState } from 'react'
// // // import reactLogo from './assets/react.svg'
// // // import viteLogo from './assets/vite.svg'
// // // import heroImg from './assets/hero.png'
// // // import './App.css'

// // // function App() {
// // //   const [count, setCount] = useState(0)

// // //   return (
// // //     <>
// // //       <section id="center">
// // //         <div className="hero">
// // //           <img src={heroImg} className="base" width="170" height="179" alt="" />
// // //           <img src={reactLogo} className="framework" alt="React logo" />
// // //           <img src={viteLogo} className="vite" alt="Vite logo" />
// // //         </div>
// // //         <div>
// // //           <h1>Get started</h1>
// // //           <p>
// // //             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
// // //           </p>
// // //         </div>
// // //         <button
// // //           className="counter"
// // //           onClick={() => setCount((count) => count + 1)}
// // //         >
// // //           Count is {count}
// // //         </button>
// // //       </section>

// // //       <div className="ticks"></div>

// // //       <section id="next-steps">
// // //         <div id="docs">
// // //           <svg className="icon" role="presentation" aria-hidden="true">
// // //             <use href="/icons.svg#documentation-icon"></use>
// // //           </svg>
// // //           <h2>Documentation</h2>
// // //           <p>Your questions, answered</p>
// // //           <ul>
// // //             <li>
// // //               <a href="https://vite.dev/" target="_blank">
// // //                 <img className="logo" src={viteLogo} alt="" />
// // //                 Explore Vite
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://react.dev/" target="_blank">
// // //                 <img className="button-icon" src={reactLogo} alt="" />
// // //                 Learn more
// // //               </a>
// // //             </li>
// // //           </ul>
// // //         </div>
// // //         <div id="social">
// // //           <svg className="icon" role="presentation" aria-hidden="true">
// // //             <use href="/icons.svg#social-icon"></use>
// // //           </svg>
// // //           <h2>Connect with us</h2>
// // //           <p>Join the Vite community</p>
// // //           <ul>
// // //             <li>
// // //               <a href="https://github.com/vitejs/vite" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#github-icon"></use>
// // //                 </svg>
// // //                 GitHub
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://chat.vite.dev/" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#discord-icon"></use>
// // //                 </svg>
// // //                 Discord
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://x.com/vite_js" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#x-icon"></use>
// // //                 </svg>
// // //                 X.com
// // //               </a>
// // //             </li>
// // //             <li>
// // //               <a href="https://bsky.app/profile/vite.dev" target="_blank">
// // //                 <svg
// // //                   className="button-icon"
// // //                   role="presentation"
// // //                   aria-hidden="true"
// // //                 >
// // //                   <use href="/icons.svg#bluesky-icon"></use>
// // //                 </svg>
// // //                 Bluesky
// // //               </a>
// // //             </li>
// // //           </ul>
// // //         </div>
// // //       </section>

// // //       <div className="ticks"></div>
// // //       <section id="spacer"></section>
// // //     </>
// // //   )
// // // }

// // // export default App






// // // import React, { useState } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { Play, RotateCcw, StepForward } from 'lucide-react';

// // // export default function App() {
// // //   const [refString, setRefString] = useState('7, 0, 1, 2, 0, 3, 0, 4');
// // //   const [frameCount, setFrameCount] = useState(3);
// // //   const [algorithm, setAlgorithm] = useState('LRU');
  
// // //   const [simulationSteps, setSimulationSteps] = useState([]);
// // //   const [currentStepIndex, setCurrentStepIndex] = useState(-1);
// // //   const [isRunning, setIsRunning] = useState(false);

// // //   // --- MODULE 2: SIMULATION ENGINE ---
// // //   const generateSimulation = () => {
// // //     const pages = refString.split(',').map(p => p.trim()).filter(p => p!== '');
// // //     let memory = [];
// // //     let steps = [];
// // //     let faults = 0;
// // //     let hits = 0;

// // //     pages.forEach((page) => {
// // //       let isHit = memory.includes(page);
// // //       let victim = null;

// // //       if (isHit) {
// // //         hits++;
// // //         // LRU specific logic: move accessed page to the end of the array
// // //         if (algorithm === 'LRU') {
// // //           memory = memory.filter(p => p!== page);
// // //           memory.push(page);
// // //         }
// // //       } else {
// // //         faults++;
// // //         if (memory.length < frameCount) {
// // //           memory.push(page);
// // //         } else {
// // //           // For both FIFO and LRU as implemented, the 0th index is the eviction target
// // //           victim = memory; 
// // //           memory.shift();
// // //           memory.push(page);
// // //         }
// // //       }

// // //       steps.push({
// // //         requestedPage: page,
// // //         memoryState: [...memory],
// // //         isHit,
// // //         victim,
// // //         currentFaults: faults,
// // //         currentHits: hits
// // //       });
// // //     });

// // //     setSimulationSteps(steps);
// // //     setCurrentStepIndex(0);
// // //     setIsRunning(true);
// // //   };

// // //   const handleNextStep = () => {
// // //     if (currentStepIndex < simulationSteps.length - 1) {
// // //       setCurrentStepIndex(prev => prev + 1);
// // //     }
// // //   };

// // //   const handleReset = () => {
// // //     setSimulationSteps();
// // //     setCurrentStepIndex(-1);
// // //     setIsRunning(false);
// // //   };

// // //   const currentData = currentStepIndex >= 0? simulationSteps : null;
// // //   const hitRatio = currentData? Math.round((currentData.currentHits / (currentData.currentHits + currentData.currentFaults)) * 100) : 0;

// // //   // --- MODULE 1 & 3: GUI & VISUALIZATION ---
// // //   return (
// // //     <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
// // //       <div className="max-w-5xl mx-auto space-y-8">
        
// // //         <header>
// // //           <h1 className="text-3xl font-bold text-blue-400">Dynamic Memory Management Visualizer</h1>
// // //           <p className="text-gray-400">Simulating Page Replacement Algorithms (Virtual Memory)</p>
// // //         </header>

// // //         {/* Control Panel (GUI Module) */}
// // //         <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-wrap gap-6 items-end">
// // //           <div className="flex flex-col space-y-2 flex-grow">
// // //             <label className="text-sm text-gray-400">Reference String (comma separated)</label>
// // //             <input 
// // //               type="text" 
// // //               value={refString}
// // //               onChange={(e) => setRefString(e.target.value)}
// // //               className="px-4 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //               disabled={isRunning}
// // //             />
// // //           </div>
          
// // //           <div className="flex flex-col space-y-2">
// // //             <label className="text-sm text-gray-400">Frames</label>
// // //             <input 
// // //               type="number" 
// // //               value={frameCount}
// // //               onChange={(e) => setFrameCount(Number(e.target.value))}
// // //               className="px-4 py-2 bg-gray-700 rounded w-24 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //               min="1"
// // //               max="10"
// // //               disabled={isRunning}
// // //             />
// // //           </div>

// // //           <div className="flex flex-col space-y-2">
// // //             <label className="text-sm text-gray-400">Algorithm</label>
// // //             <select 
// // //               value={algorithm} 
// // //               onChange={(e) => setAlgorithm(e.target.value)}
// // //               className="px-4 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //               disabled={isRunning}
// // //             >
// // //               <option value="FIFO">FIFO</option>
// // //               <option value="LRU">LRU</option>
// // //             </select>
// // //           </div>

// // //           <div className="flex space-x-3">
// // //             {!isRunning? (
// // //               <button onClick={generateSimulation} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold transition">
// // //                 <Play className="w-4 h-4 mr-2" /> Start Simulation
// // //               </button>
// // //             ) : (
// // //               <>
// // //                 <button onClick={handleNextStep} disabled={currentStepIndex >= simulationSteps.length - 1} className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 rounded font-semibold transition">
// // //                   <StepForward className="w-4 h-4 mr-2" /> Step
// // //                 </button>
// // //                 <button onClick={handleReset} className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-500 rounded font-semibold transition">
// // //                   <RotateCcw className="w-4 h-4 mr-2" /> Reset
// // //                 </button>
// // //               </>
// // //             )}
// // //           </div>
// // //         </div>

// // //         {/* Visualization Grid & Dashboard (Visualization Module) */}
// // //         {currentData && (
// // //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
// // //             {/* Live Statistics */}
// // //             <div className="col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-center space-y-4">
// // //               <h2 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-2">Real-time Statistics</h2>
// // //               <div className="flex justify-between items-center">
// // //                 <span className="text-gray-400">Requested Page:</span>
// // //                 <span className="text-2xl font-bold text-white">{currentData.requestedPage}</span>
// // //               </div>
// // //               <div className="flex justify-between items-center">
// // //                 <span className="text-gray-400">Page Hits:</span>
// // //                 <span className="text-2xl font-bold text-green-400">{currentData.currentHits}</span>
// // //               </div>
// // //               <div className="flex justify-between items-center">
// // //                 <span className="text-gray-400">Page Faults:</span>
// // //                 <span className="text-2xl font-bold text-red-400">{currentData.currentFaults}</span>
// // //               </div>
// // //               <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
// // //                 <span className="text-gray-400">Hit Ratio:</span>
// // //                 <span className="text-2xl font-bold text-blue-400">{hitRatio}%</span>
// // //               </div>
// // //             </div>

// // //             {/* Physical Memory Frames */}
// // //             <div className="col-span-1 md:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
// // //               <div className="flex justify-between items-center mb-6">
// // //                 <h2 className="text-xl font-semibold">Physical Memory Frames</h2>
// // //                 <div className={`px-4 py-1 rounded-full font-bold text-sm ${currentData.isHit? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
// // //                    {currentData.isHit? 'PAGE HIT' : 'PAGE FAULT'}
// // //                 </div>
// // //               </div>

// // //               <div className="flex space-x-4 overflow-x-auto p-4 min-h-[160px] items-center bg-gray-900 rounded-lg">
// // //                 <AnimatePresence mode="popLayout">
// // //                   {currentData.memoryState.map((page, index) => (
// // //                     <motion.div
// // //                       key={`${page}-${index}`}
// // //                       layout
// // //                       initial={{ opacity: 0, y: -50, scale: 0.8 }}
// // //                       animate={{ opacity: 1, y: 0, scale: 1 }}
// // //                       exit={{ opacity: 0, y: 50, scale: 0.8, backgroundColor: '#7f1d1d' }}
// // //                       transition={{ type: "spring", stiffness: 300, damping: 25 }}
// // //                       className="w-24 h-24 flex flex-col items-center justify-center bg-blue-600 border-2 border-blue-400 rounded-xl shadow-lg"
// // //                     >
// // //                       <span className="text-xs text-blue-200 mb-1">Frame {index}</span>
// // //                       <span className="text-3xl font-bold">{page}</span>
// // //                     </motion.div>
// // //                   ))}
// // //                 </AnimatePresence>
                
// // //                 {/* Empty Frame Placeholders */}
// // //                 {Array.from({ length: Math.max(0, frameCount - currentData.memoryState.length) }).map((_, i) => (
// // //                   <div key={`empty-${i}`} className="w-24 h-24 flex items-center justify-center bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl">
// // //                     <span className="text-gray-500">Empty</span>
// // //                   </div>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }




// // import React, { useState } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { Play, RotateCcw, StepForward } from 'lucide-react';
// // import { runSimulation } from './utils/simulator'; // Importing our new backend logic

// // export default function App() {
// //   // Correctly initialized React State Hooks
// //   const [refString, setRefString] = useState('7, 0, 1, 2, 0, 3, 0, 4');
// //   const [frameCount, setFrameCount] = useState(3);
// //   const [algorithm, setAlgorithm] = useState('LRU');
  
// //   const [simulationSteps, setSimulationSteps] = useState([]);
// //   const [currentStepIndex, setCurrentStepIndex] = useState(-1);
// //   const [isRunning, setIsRunning] = useState(false);

// //   // Triggered when "Start Simulation" is clicked
// //   const handleStartSimulation = () => {
// //     // Call the external engine logic
// //     const steps = runSimulation(refString, frameCount, algorithm);
    
// //     // Update the UI state with the results
// //     setSimulationSteps(steps);
// //     setCurrentStepIndex(0);
// //     setIsRunning(true);
// //   };

// //   // Triggered when "Step" is clicked
// //   const handleNextStep = () => {
// //     if (currentStepIndex < simulationSteps.length - 1) {
// //       setCurrentStepIndex(prev => prev + 1);
// //     }
// //   };

// //   // Triggered when "Reset" is clicked
// //   const handleReset = () => {
// //     setSimulationSteps();
// //     setCurrentStepIndex(-1);
// //     setIsRunning(false);
// //   };

// //   // Extract current step data for the UI
// //   const currentData = currentStepIndex >= 0? simulationSteps.at(currentStepIndex) : null;
// //   const hitRatio = currentData && (currentData.currentHits + currentData.currentFaults) > 0 
// //    ? Math.round((currentData.currentHits / (currentData.currentHits + currentData.currentFaults)) * 100) 
// //     : 0;

// //   return (
// //     <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
// //       <div className="max-w-5xl mx-auto space-y-8">
        
// //         <header>
// //           <h1 className="text-3xl font-bold text-blue-400">Dynamic Memory Management Visualizer</h1>
// //           <p className="text-gray-400">Simulating Page Replacement Algorithms (Virtual Memory)</p>
// //         </header>

// //         {/* Control Panel */}
// //         <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-wrap gap-6 items-end">
// //           <div className="flex flex-col space-y-2 grow">
// //             <label className="text-sm text-gray-400">Reference String (comma separated)</label>
// //             <input 
// //               type="text" 
// //               value={refString}
// //               onChange={(e) => setRefString(e.target.value)}
// //               className="px-4 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               disabled={isRunning}
// //             />
// //           </div>
          
// //           <div className="flex flex-col space-y-2">
// //             <label className="text-sm text-gray-400">Frames</label>
// //             <input 
// //               type="number" 
// //               value={frameCount}
// //               onChange={(e) => setFrameCount(Number(e.target.value))}
// //               className="px-4 py-2 bg-gray-700 rounded w-24 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               min="1"
// //               max="10"
// //               disabled={isRunning}
// //             />
// //           </div>

// //           <div className="flex flex-col space-y-2">
// //             <label className="text-sm text-gray-400">Algorithm</label>
// //             <select 
// //               value={algorithm} 
// //               onChange={(e) => setAlgorithm(e.target.value)}
// //               className="px-4 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
// //               disabled={isRunning}
// //             >
// //               <option value="FIFO">FIFO</option>
// //               <option value="LRU">LRU</option>
// //             </select>
// //           </div>

// //           <div className="flex space-x-3">
// //             {!isRunning? (
// //               <button onClick={handleStartSimulation} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold transition cursor-pointer">
// //                 <Play className="w-4 h-4 mr-2" /> Start Simulation
// //               </button>
// //             ) : (
// //               <>
// //                 <button onClick={handleNextStep} disabled={currentStepIndex >= simulationSteps.length - 1} className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 rounded font-semibold transition cursor-pointer">
// //                   <StepForward className="w-4 h-4 mr-2" /> Step
// //                 </button>
// //                 <button onClick={handleReset} className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-500 rounded font-semibold transition cursor-pointer">
// //                   <RotateCcw className="w-4 h-4 mr-2" /> Reset
// //                 </button>
// //               </>
// //             )}
// //           </div>
// //         </div>

// //         {/* Visualization Grid & Dashboard */}
// //         {currentData && (
// //           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
// //             {/* Live Statistics */}
// //             <div className="col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-center space-y-4">
// //               <h2 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-2">Real-time Statistics</h2>
// //               <div className="flex justify-between items-center">
// //                 <span className="text-gray-400">Requested Page:</span>
// //                 <span className="text-2xl font-bold text-white">{currentData.requestedPage}</span>
// //               </div>
// //               <div className="flex justify-between items-center">
// //                 <span className="text-gray-400">Page Hits:</span>
// //                 <span className="text-2xl font-bold text-green-400">{currentData.currentHits}</span>
// //               </div>
// //               <div className="flex justify-between items-center">
// //                 <span className="text-gray-400">Page Faults:</span>
// //                 <span className="text-2xl font-bold text-red-400">{currentData.currentFaults}</span>
// //               </div>
// //               <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
// //                 <span className="text-gray-400">Hit Ratio:</span>
// //                 <span className="text-2xl font-bold text-blue-400">{hitRatio}%</span>
// //               </div>
// //             </div>

// //             {/* Physical Memory Frames */}
// //             <div className="col-span-1 md:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
// //               <div className="flex justify-between items-center mb-6">
// //                 <h2 className="text-xl font-semibold">Physical Memory Frames</h2>
// //                 <div className={`px-4 py-1 rounded-full font-bold text-sm ${currentData.isHit? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
// //                    {currentData.isHit? 'PAGE HIT' : 'PAGE FAULT'}
// //                 </div>
// //               </div>

// //               <div className="flex space-x-4 overflow-x-auto p-4 min-h-40 items-center bg-gray-900 rounded-lg">
// //                 <AnimatePresence mode="popLayout">
// //                   {currentData.memoryState.map((page, index) => (
// //                     <motion.div
// //                       key={`${page}-${index}`}
// //                       layout
// //                       initial={{ opacity: 0, y: -50, scale: 0.8 }}
// //                       animate={{ opacity: 1, y: 0, scale: 1 }}
// //                       exit={{ opacity: 0, y: 50, scale: 0.8, backgroundColor: '#7f1d1d' }}
// //                       transition={{ type: "spring", stiffness: 300, damping: 25 }}
// //                       className="w-24 h-24 flex flex-col items-center justify-center bg-blue-600 border-2 border-blue-400 rounded-xl shadow-lg"
// //                     >
// //                       <span className="text-xs text-blue-200 mb-1">Frame {index}</span>
// //                       <span className="text-3xl font-bold">{page}</span>
// //                     </motion.div>
// //                   ))}
// //                 </AnimatePresence>
                
// //                 {/* Empty Frame Placeholders */}
// //                 {Array.from({ length: Math.max(0, frameCount - currentData.memoryState.length) }).map((_, i) => (
// //                   <div key={`empty-${i}`} className="w-24 h-24 flex items-center justify-center bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl">
// //                     <span className="text-gray-500">Empty</span>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>

// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }



// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Play, RotateCcw, StepForward, AlertTriangle } from 'lucide-react';
// import { runSimulation } from './utils/simulator';

// export default function App() {
//   const [refString, setRefString] = useState('7, 0, 1, 2, 0, 3, 0, 4');
//   const [frameCount, setFrameCount] = useState(3);
//   const [algorithm, setAlgorithm] = useState('LRU');
  
//   const [simulationSteps, setSimulationSteps] = useState([]);
//   const [currentStepIndex, setCurrentStepIndex] = useState(-1);
//   const [isRunning, setIsRunning] = useState(false);

//   const handleStartSimulation = () => {
//     const steps = runSimulation(refString, frameCount, algorithm);
//     setSimulationSteps(steps);
//     setCurrentStepIndex(0);
//     setIsRunning(true);
//   };

//   const handleNextStep = () => {
//     if (currentStepIndex < simulationSteps.length - 1) {
//       setCurrentStepIndex(prev => prev + 1);
//     }
//   };

//   const handleReset = () => {
//     setSimulationSteps();
//     setCurrentStepIndex(-1);
//     setIsRunning(false);
//   };

//   // Automated trigger for Belady's Anomaly
//   const loadBeladysAnomaly = () => {
//     setRefString('1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5');
//     setAlgorithm('FIFO');
//     setFrameCount(3);
//     handleReset();
//   };

//   const currentData = currentStepIndex >= 0? simulationSteps.at(currentStepIndex) : null;
//   const hitRatio = currentData && (currentData.currentHits + currentData.currentFaults) > 0 
//   ? Math.round((currentData.currentHits / (currentData.currentHits + currentData.currentFaults)) * 100) 
//    : 0;

//   return (
//     <div className="min-h-screen bg-gray-900 text-white p-8 font-sans">
//       <div className="max-w-5xl mx-auto space-y-8">
        
//         <header>
//           <h1 className="text-3xl font-bold text-blue-400">Dynamic Memory Management Visualizer</h1>
//           <p className="text-gray-400">Simulating Page Replacement Algorithms (Virtual Memory)</p>
//         </header>

//         {/* Control Panel */}
//         <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col space-y-6">
//           <div className="flex flex-wrap gap-6 items-end">
//             <div className="flex flex-col space-y-2 grow">
//               <label className="text-sm text-gray-400">Reference String (comma separated)</label>
//               <input 
//                 type="text" 
//                 value={refString}
//                 onChange={(e) => setRefString(e.target.value)}
//                 className="px-4 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={isRunning}
//               />
//             </div>
            
//             <div className="flex flex-col space-y-2">
//               <label className="text-sm text-gray-400">Frames</label>
//               <input 
//                 type="number" 
//                 value={frameCount}
//                 onChange={(e) => setFrameCount(Number(e.target.value))}
//                 className="px-4 py-2 bg-gray-700 rounded w-24 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 min="1"
//                 max="10"
//                 disabled={isRunning}
//               />
//             </div>

//             <div className="flex flex-col space-y-2">
//               <label className="text-sm text-gray-400">Algorithm</label>
//               <select 
//                 value={algorithm} 
//                 onChange={(e) => setAlgorithm(e.target.value)}
//                 className="px-4 py-2 bg-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 disabled={isRunning}
//               >
//                 <option value="FIFO">FIFO</option>
//                 <option value="LRU">LRU</option>
//                 <option value="OPT">Optimal (OPT)</option>
//               </select>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-3 border-t border-gray-700 pt-4">
//             {!isRunning? (
//               <>
//                 <button onClick={handleStartSimulation} className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded font-semibold transition cursor-pointer">
//                   <Play className="w-4 h-4 mr-2" /> Start Simulation
//                 </button>
//                 <button onClick={loadBeladysAnomaly} className="flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded font-semibold transition cursor-pointer text-sm">
//                   <AlertTriangle className="w-4 h-4 mr-2" /> Load Belady's Anomaly
//                 </button>
//               </>
//             ) : (
//               <>
//                 <button onClick={handleNextStep} disabled={currentStepIndex >= simulationSteps.length - 1} className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 rounded font-semibold transition cursor-pointer">
//                   <StepForward className="w-4 h-4 mr-2" /> Step
//                 </button>
//                 <button onClick={handleReset} className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-500 rounded font-semibold transition cursor-pointer">
//                   <RotateCcw className="w-4 h-4 mr-2" /> Reset
//                 </button>
//               </>
//             )}
//           </div>
//         </div>

//         {/* Visualization Grid (Unchanged from previous successful run) */}
//         {currentData && (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             <div className="col-span-1 bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col justify-center space-y-4">
//               <h2 className="text-xl font-semibold mb-2 border-b border-gray-700 pb-2">Real-time Statistics</h2>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-400">Requested Page:</span>
//                 <span className="text-2xl font-bold text-white">{currentData.requestedPage}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-400">Page Hits:</span>
//                 <span className="text-2xl font-bold text-green-400">{currentData.currentHits}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-400">Page Faults:</span>
//                 <span className="text-2xl font-bold text-red-400">{currentData.currentFaults}</span>
//               </div>
//               <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
//                 <span className="text-gray-400">Hit Ratio:</span>
//                 <span className="text-2xl font-bold text-blue-400">{hitRatio}%</span>
//               </div>
//             </div>

//             <div className="col-span-1 md:col-span-2 bg-gray-800 p-6 rounded-lg shadow-lg">
//               <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-xl font-semibold">Physical Memory Frames</h2>
//                 <div className={`px-4 py-1 rounded-full font-bold text-sm ${currentData.isHit? 'bg-green-900 text-green-300' : 'bg-red-900 text-red-300'}`}>
//                    {currentData.isHit? 'PAGE HIT' : 'PAGE FAULT'}
//                 </div>
//               </div>

//               <div className="flex space-x-4 overflow-x-auto p-4 min-h-40 items-center bg-gray-900 rounded-lg">
//                 <AnimatePresence mode="popLayout">
//                   {currentData.memoryState.map((page, index) => (
//                     <motion.div
//                       key={`${page}-${index}`}
//                       layout
//                       initial={{ opacity: 0, y: -50, scale: 0.8 }}
//                       animate={{ opacity: 1, y: 0, scale: 1 }}
//                       exit={{ opacity: 0, y: 50, scale: 0.8, backgroundColor: '#7f1d1d' }}
//                       transition={{ type: "spring", stiffness: 300, damping: 25 }}
//                       className="w-24 h-24 flex flex-col items-center justify-center bg-blue-600 border-2 border-blue-400 rounded-xl shadow-lg"
//                     >
//                       <span className="text-xs text-blue-200 mb-1">Frame {index}</span>
//                       <span className="text-3xl font-bold">{page}</span>
//                     </motion.div>
//                   ))}
//                 </AnimatePresence>
                
//                 {Array.from({ length: Math.max(0, frameCount - currentData.memoryState.length) }).map((_, i) => (
//                   <div key={`empty-${i}`} className="w-24 h-24 flex items-center justify-center bg-gray-800 border-2 border-dashed border-gray-600 rounded-xl">
//                     <span className="text-gray-500">Empty</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



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