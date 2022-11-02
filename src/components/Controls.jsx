import '../App.css'
import {
  MenuItem,
  Switch,
  Select,
  TextField,
  Paper
} from '@material-ui/core'
import 'react-dropdown/style.css'
import { useRootStore, RootStoreProvider } from '../stores/RootStore'
import { observer } from "mobx-react";
import AudioEngine from '../assets/AudioEngine';

 const ControlPanel = () => {
  let { instruments, settings } = useRootStore()

    return (
      <RootStoreProvider instruments={instruments} settings={settings}>
        <Paper className={"mainControl"} elevation={5}> 
          <AudioEngine/>
          <div className='instrumentControlPanel'>
            {Object.keys(instruments).map((key) => (
              <div key={`instrument-${key+1}`} className={`control-item control${ key + 1 }`}>
                <Select className="instrumentSelect"
                  disabled={!instruments[key].display}
                  labelId="instrument-select-label"
                  displayEmpty={true}
                  value={instruments[key].audio}
                  label={`Instrument ${key + 1}`}
                  onChange={(e) => {instruments[key].audio = e.target.value}}>
                  <MenuItem value=""><em>Instrument</em></MenuItem>
                  {Object.keys(settings.preset).map((key) => (  
                    <MenuItem key={key} value={settings.preset[key].filePath}>{settings.preset[key].name}</MenuItem>
                  ))}
                </Select>
                <TextField
                  id="onsetInput"
                  disabled={!instruments[key].display}
                  className='onsetInput'
                  label="On Notes"
                  type="number"
                  InputProps={{ inputProps: { min: 0, max: 15 } }}
                  value={instruments[key].onsets}
                  onChange={(e) => instruments[key].updateOnsets(e.target.value)}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  id="notesInput"
                  disabled={!instruments[key].display}
                  className='notesInput'
                  label="Total Notes"
                  type="number"
                  // InputProps={{ inputProps: { min: 0, max: 15 } }}
                  value={instruments[key].notes}
                  onChange={(e) => {
                    instruments[key].updateNotes(e.target.value)
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <Switch 
                  className='instrumentToggle' 
                  checked={instruments[key].getDisplay() === true ? true : false}
                  onChange={() => {instruments[key].toggle()}}
                />
              </div>
            ))}
          </div>
        </Paper>
      </RootStoreProvider>
    )

  }

export default observer(ControlPanel);
