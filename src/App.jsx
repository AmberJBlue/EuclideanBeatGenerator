import './App.css'
import EuclidCircles from './euclidCircles'
import ControlPanel from './components/Controls'
import AudioEngine from './assets/AudioEngine';
import Instrument from './components/Instrument';
import { RootStoreProvider } from './stores/RootStore'

function loadInstrumentsDefault() {
  return {
    0: new Instrument('C2', 12, 5, true),
    1: new Instrument('C4', 10, 7, false),
    2: new Instrument('C4', 13, 5, false),
    3: new Instrument('E3', 15, 5, true),
    4: new Instrument('C3', 15, 10, true),
    5: new Instrument('G3', 15, 9, true),
    6: new Instrument('A1', 13, 5, true),
    7: new Instrument('Db1', 15, 5, true),
  }
}

const App = () => {
  const instruments = loadInstrumentsDefault()
  const settings = {
      started: false,
      volume: -20,
      tempo: 120,
      playing: false
  }

  return (
    <div className="App container">
        <RootStoreProvider instruments={instruments} settings={settings}>
          <ControlPanel className="controls"/>
          <div className={"display"}>
            <EuclidCircles/>
          </div>
          <AudioEngine/>
        </RootStoreProvider>
    </div>
  )
}

export default App;
