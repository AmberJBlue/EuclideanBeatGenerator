import euclideanRhythm from '../euclideanRhythm'
import { action, makeObservable, observable  } from "mobx";

class Instrument {
  constructor(audio, notes, onsets, display = true) {
    this.display = display
    this.audioName = audio.split("/").pop()
    this.audio = audio
    this.notes = notes
    this.onsets = onsets
    this.rhythm = this.getRhythm()

    makeObservable(this, {
      display: observable,
      audio: observable,
      notes: observable,
      onsets: observable,
      rhythm: observable,
      toggle: action,
      updateNotes: action,
      updateOnsets: action
    });
  }

  set updateAudio(val) {
    this.audio = val
    this.getAudioName(this.audio)
  }

  updateNotes(val) {
    if (val > 15 || val < 1) {return}
    this.notes = val
    this.rhythm = euclideanRhythm(this.onsets, this.notes)
  }

  updateOnsets(val){
    this.onsets = val
    this.rhythm = euclideanRhythm(this.onsets, this.notes)

  }

  getDisplay() {
    return this.display
  }

  getAudioName(audio) {
    this.audioName = audio.split("/").pop()
  }
  

  toggle(){
    this.display = !this.display
  }

  getRhythm(){
    return euclideanRhythm(this.onsets, this.notes)
  }
}

export default Instrument;