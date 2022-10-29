import { useState } from 'react';
import './App.css'
import EuclidCircles from './euclidCircles'
import ControlPanel from './components/Controls'

function App() {
    return (
      <div className="App">
        <ControlPanel className="controls" numCards={8}/>
        <div className={"canvas-container"}>
          <EuclidCircles
            notes={[15,15,15,15,15,15,15,15]}
            onsets={[15,15,15,15,15,15,15,15]}
            size={50}
            instruments={8}
          />
        </div>
        
        {/* <Slider
              className={'slider'}
              // orientation="vertical"
              defaultValue={8}
              step={1}
              min={3}
              max={16}  
              value={value}
              aria-label="Number of Notes"
              valueLabelDisplay="auto"
              style={{ width: 300 }}
              onChange={changeValue}
          /> */}
      </div>
    )
}

export default App;
