import * as Tone from 'tone'
import { observer } from "mobx-react";
import { useRootStore, RootStoreProvider } from '../stores/RootStore'
// import * as Tone from "https://cdn.skypack.dev/tone"


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
    let oscillator
    for (let i = 0; i < count; i++) {
      if(settings.customVoice === true) {
          oscillator = settings.oscillator
      } else {
          oscillator = {
            type: settings.voice
          }}
      let synth = new Tone.Synth({
        oscillator: oscillator
      }).toDestination();
      synths.push(synth);
    }
  
    return synths;
  };

  const synths = makeSynths(Object.keys(instruments).length)
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

  const convertRange = ( value, inputRange, outputRange ) => { 
    return Math.floor((value-inputRange[0])*(outputRange[1]-outputRange[0])/
    (inputRange[1]-inputRange[0])+outputRange[0])
}

  const handlePlay = () => {
      if (!settings.started) {
        Tone.start()
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
                      displayEmpty={true}
                      aria-label={`Voice`}
                      label="Voice"
                      defaultValue={'default'}
                      onChange={(e) => {
                        if(e.target.value === 'default') {
                          settings.voice = 'sine3'
                        } else {
                          settings.voice = e.target.value
                        }
                      }}>
                      <MenuItem value={'default'}><em>Select Voice</em></MenuItem>
                      <MenuItem value={'sine'}>Sine</MenuItem>
                      <MenuItem value={'fatsine8'}>Fat Sine</MenuItem>
                      <MenuItem value={'square5'}>Square</MenuItem>
                      <MenuItem value={'sawtooth8'}>Sawtooth</MenuItem>
                      <MenuItem value={'triangle3'}>Triangle</MenuItem>
                      <MenuItem value={'pulse'}>Pulse</MenuItem>
                      {/* <MenuItem value={'custom'}>Custom</MenuItem> */}
                    </Select>
                  </div>
                  <div className={`wave-shaper control-item`}>
                  <Select className="baseTypeSelect"
                      displayEmpty={true}
                      aria-label={`Base Type`}
                      label="Base Type"
                      defaultValue={'pwm'}
                      onChange={(e) => {
                          console.log('should update oscillator')
                      }}>
                      <MenuItem value={'pwm'}><em>Pulse Wave Modulation</em></MenuItem>
                      <MenuItem value={'pulse'}>Pulse</MenuItem>
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
                  defaultValue={(
                    convertRange(settings.volume, [-30, -10], [0, 100]
                  ))}
                  aria-label={`Volume`}
                  min={0}
                  label="Volume"
                  max={100}
                  valueLabelDisplay="auto"
                  onChange={(e, val) => {
                    val = convertRange(val, [0, 100], [-30, -10])
                    settings.volume = val
                  }}
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
