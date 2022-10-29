
import Sketch from "react-p5";
import { Component } from 'react'
import euclideanRhythm from './euclideanRhythm'
import { Slider } from '@material-ui/core'
import Controls from './components/Controls'

let canvasWidth = window.innerWidth
let canvasHeight = window.innerWidth
let numberOfInstruments

class EuclidCircles extends Component {
	constructor(props) {
		super(props)
		this.state = {
		  sides: props.sides,
		  instruments: props.instruments,
		  onsets: props.onsets,
		  notes: props.notes
		}	
	}

	circleColors = 
	["#d71f1f", "#605973", "#21378d", "#8c8a2e",
	 "#fed500", "#ef8802","#d71f1f", "#605973",
	 "#21378d", "#8c8a2e", "#fed500", "#ef8802",
	 "#d71f1f", "#605973", "#21378d"]

	vectors = (p5, x, y, radius, rotation, onsets, notes) => {
		let n = notes
		for (let i = 0; i < n; i++) {
			p5.vertex(x + Math.cos(i * p5.TAU / n + rotation) * radius, y + Math.sin(i * p5.TAU / n + rotation) * radius)
		}

		p5.stroke(255, 0, 0, 0)	
		p5.stroke(0)
		this.vertex(p5, x, y , n, radius, rotation, onsets)
	}

	vertex = (p5, x, y , n, radius, rotation, onsets) => {
		let markers = euclideanRhythm(onsets, 16)
		for (let i = 0; i < n; i++) {
			// p5.fill(this.circleColors[i])
			p5.stroke(this.circleColors[i])
			if(markers[i])
				p5.strokeWeight(10)
				p5.ellipse(x + Math.cos(i * p5.TAU / n + rotation) * radius, y + Math.sin(i * p5.TAU / n + rotation) * radius, 10)
		}
	}

	setup = (p5, canvasParentRef) => {
		p5.beginShape()
		// this.notes = p5.createSlider(3, 15, 15)
		p5.fill(0)

		// this.onset = p5.createSlider(1, 15, 15)
		p5.createCanvas((canvasWidth * .4) + 400, (canvasHeight / 2) ).parent(canvasParentRef)
		p5.endShape(p5.CLOSE)
	}

	draw = (p5) => {
		p5.background("#E7D5AF")
		p5.stroke(255)
		p5.noFill()
		for(let i = 0; i < this.state.instruments; i++) {
			let onsets = this.state.onsets[i]
			let notes = this.state.notes[i]
			p5.stroke("#525252")
			p5.strokeWeight(1)
			p5.circle((canvasWidth * .35) + 25, canvasHeight / 4, 150 + (i * 50))
			this.vectors(p5, (canvasWidth * .35) + 25, canvasHeight / 4, 75 + (i * 25), 0, onsets, notes)
		}
		p5.fill(0)
	}

	render() {
		return (
			<Sketch setup={this.setup} draw={this.draw}/>
		)
	}
}

export default EuclidCircles
