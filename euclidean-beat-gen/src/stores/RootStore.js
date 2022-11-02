import { makeAutoObservable } from "mobx"
import React, { useContext, useRef } from "react"
import { configure } from 'mobx';
import Notes from '../assets/sounds/sounds';
configure({ enforceActions: "never" })

export default class RootStore {
  constructor(instruments, settings, tempo, volume, preset = "default", playing = false) {
    makeAutoObservable(this)
    this.instruments = instruments

    if(settings) {
      this.settings = settings
      this.settings.preset = this.loadPreset(preset)
      if(!this.settings.voice) this.settings.voice = 'sine'
    } else { 
      this.settings = {
        started: false,
        playing: playing,
        tempo: tempo,
        preset: this.loadPreset(preset),
        volume: volume,
        voice: 'sine',
        beat: 0,
        totalNotes: 15
      }
    }
  }

  setinstruments = (instruments) => {
    this.instruments = instruments
  }

  setSettings(settings) {
    this.settings = settings
  }

  setTempo = (tempo) => {
    this.tempo = tempo
  }

  setVolume = (volume) => {
    this.volume = volume
  }

  togglePlay = () => {
    this.playing = !this.playing
  }

  getPlaying() {
    return this.playing
  }

  setVoice(voice) {
    this.settings.voice = voice
  }

  loadPreset(preset){
    switch(preset){
      case "1":
        break
      case "2":
        break
      case "3":
        break
      case "4":
        break
      default:
        return Notes
    }

  }
}

const RootStoreContext = React.createContext()
export const useRootStore = () => useContext(RootStoreContext)


export function RootStoreProvider({ children, instruments, settings }) {
  const store = useRef(new RootStore(instruments, settings))

  return (
    <RootStoreContext.Provider value={store.current}>
      {children}
    </RootStoreContext.Provider>
  )
}