// import * as Tone from 'tone'
import { observer } from "mobx-react";
import { useRootStore, RootStoreProvider } from '../stores/RootStore'
import * as Tone from "https://cdn.skypack.dev/tone"

import {
  MenuItem,
  Slider, 
  InputLabel,
  Button, 
  Select,
} from '@material-ui/core'

const AudioEngine = () => {
  const { instruments, settings } = useRootStore()
  let beat = 0
  let totalNotes = 8
  Tone.start()
  
  const makeSynths = (count) => {
    const synths = [];
    for (let i = 0; i < count; i++) {
      let synth = new Tone.Synth({
        oscillator: {
          type: settings.voice
        }
      }).toDestination();
      synths.push(synth);
    }
  
    return synths;
  };

  const synths = makeSynths(Object.keys(instruments).length)
  // let grid = makeGrid()

  const configLoop = () => {
    let duration = totalNotes+"n"
    let maxNotes = []
    Object.values(instruments)
      .forEach((instrument) => {
        if(instrument.display) {
          maxNotes.push(instrument.notes)
        }
      })
    totalNotes = Math.max(...maxNotes)
    
    const repeat = (time) => {
      Tone.getDestination().volume.rampTo(-Infinity, 0.001)
      Object.values(instruments).forEach((instrument, idx) => {
        let synth = synths[idx]
        let note = instrument.rhythm[beat]
        if(note && instrument.display) {
          synth.oscillator.type = settings.voice
          Tone.getDestination().volume.rampTo(settings.volume, 0.001)
          synth.triggerAttackRelease(instrument.audio, duration, time);
        }
      })
  
      beat = (beat + 1) % totalNotes;
      settings.beat = beat
      settings.totalNotes = totalNotes
      Tone.getDestination().volume.rampTo(settings.volume, 0.001)
      Tone.Transport.bpm.value = settings.tempo;
    };

    Tone.Transport.scheduleRepeat(repeat, duration);
  }

  // document.addEventListener('click', "playButton",);
  const handlePlay = () => {
      if (!settings.started) {
        Tone.start()
        console.log('started')
        Tone.getDestination().volume.rampTo(settings.volume, 0.001)
        configLoop()
        settings.started = true
      }
  
      if (settings.playing) {
        Tone.Transport.stop()
        document.getElementById('playButton').innerHTML = "Start"
        settings.playing = false
      } else {
        Tone.Transport.start()
        settings.playing = true
        document.getElementById('playButton').innerHTML = "Stop"
      }
      // settings.playing = !settings.playing
  }

  return (
    <RootStoreProvider instruments={instruments} settings={settings}>
      <div className='mainControlPanel'>
              <Button 
                  variant="contained" 
                  className="playButton"
                  id="playButton"
                  onClick={() => handlePlay()}>
                  Start
              </Button>
              <div className='voiceSelect'>
                  <div className={`control-item`}>
                    <Select className="voiceSelect"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      displayEmpty={true}
                      defaultValue={'sine'}
                      onChange={(e) => settings.voice = e.target.value}>
                      <MenuItem value={0}><em>Select Voice</em></MenuItem>
                      <MenuItem value={'sine'}>Sine</MenuItem>
                      <MenuItem value={'fatsine8'}>Fat Sine</MenuItem>
                      <MenuItem value={'square8'}>Square</MenuItem>
                    </Select>
                  </div>
              </div>
              <div className='tempoControl'>
                <Slider
                  size="small"
                  aria-label={`Tempo`}
                  defaultValue={settings.tempo}
                  label="Tempo"
                  min={60}
                  max={240}
                  onChange={(e, val) => {settings.tempo = val}}
                  valueLabelDisplay="auto"
                />  
                <InputLabel sx={{ mb: 1.5, marginTop: "20px"}} >
                      Tempo
                </InputLabel>
              </div>
              <div className='volumeControl'>
                <Slider
                  size="small"
                  defaultValue={settings.volume}
                  aria-label={`Volume`}
                  min={-70}
                  label="Volume"
                  onChange={(e, val) => {settings.volume = val}}
                  max={-10}
                  valueLabelDisplay="auto"
                />  
                <InputLabel sx={{ mb: 1.5, marginTop: "20px"}} >
                      Volume
                </InputLabel>
              </div>
            </div>
          </RootStoreProvider>
  )

}

export default observer(AudioEngine)
