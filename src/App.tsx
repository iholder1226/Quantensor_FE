import { useState } from 'react'
//import './App.css'
import GridExample from "./components/GridExample";
import CandleChart from "./components/CandleChart";
import StrategyBuilder from "./components/StrategyBuilder";
import StrategyEditor from './components/StrategyEditor';
//import TypeScriptGridExample from "./components/TypeScriptGridExample";
function App() {
  
  
  const testStyle: React.CSSProperties = {
      width:'100vw',
      height:'50vh',
    }
  
  return (
      
    <>
    
    <title>Quantensor - Effective Analysis</title>
     
      
      <div style={testStyle}>
        <CandleChart />
        <StrategyEditor />
        
        
       
        

        
      </div>
        
    </>
  )
}

export default App
