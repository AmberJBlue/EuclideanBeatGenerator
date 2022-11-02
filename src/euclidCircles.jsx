
import Sketch from "react-p5";
import euclideanRhythm from './euclideanRhythm'
import { useRootStore } from './stores/RootStore'
import { observer } from "mobx-react";

let canvasWidth = window.innerWidth
let canvasHeight = window.innerWidth

const EuclidCircles = () => {
	const { instruments, settings} = useRootStore();
	const circleColors = 
	["#d71f1f", "#605973", "#21378d", "#8c8a2e",
	 "#fed500", "#ef8802","#d71f1f", "#605973",
	 "#21378d", "#8c8a2e", "#fed500", "#ef8802",
	 "#d71f1f", "#605973", "#21378d"]

	let metroSpeed = 0.5
	let metroSizeChange = 0
	let emphasisSpeed = 0.5
	let sizeChange = 20
	const vectors = (p5, x, y, radius, rotation, onsets, notes) => {
		for (let i = 0; i < notes; i++) {
			p5.vertex(x + Math.cos(i * p5.TAU / notes + rotation) * radius, y + Math.sin(i * p5.TAU / notes + rotation) * radius)
		}
		p5.stroke(0)
		vertex(p5, x, y , notes, radius, rotation, onsets, notes)
	}

	const vertex = (p5, x, y , n, radius, rotation, onsets, notes) => {
		let markers = euclideanRhythm(onsets, notes)

		for (let i = 0; i < n; i++) {
			sizeChange = (i === settings.beat && settings.playing) ? 10 + emphasisSpeed: 0;
			if (sizeChange > 20 || sizeChange < -20) {
					emphasisSpeed = emphasisSpeed * -1;
					console.log('fdsfsaadsfds')
			}

			p5.stroke(circleColors[i])
			if(markers[i]){ 
				p5.strokeWeight(10)
				p5.fill(circleColors[i])
				p5.ellipse(x + Math.cos(i * p5.TAU / n + rotation) * radius, y + Math.sin(i * p5.TAU / n + rotation) * radius, 10 + sizeChange, 10 + sizeChange)
			}
		}
	}

	const setup = (p5, canvasParentRef) => {
		p5.beginShape()
		// this.notes = p5.createSlider(3, 15, 15)
		p5.fill(0)

		// this.onset = p5.createSlider(1, 15, 15)
		p5.createCanvas((canvasWidth * .6), (canvasHeight *.6)).parent(canvasParentRef)
		p5.endShape(p5.CLOSE)
	}

	const draw = (p5) => {
		p5.background("#ede4d2")
		p5.stroke(255)
		p5.noFill()
		p5.scale(1.25)

		let x = (canvasWidth * .23)
		let y = (canvasHeight / 6) + 50

		for(let i = 0; i < Object.keys(instruments).length; i++) {
			if (!instruments[i].display) continue;	
			let onsets = instruments[i].onsets
			let notes = instruments[i].notes

			p5.stroke("#525252")
			p5.strokeWeight(1)
			p5.noFill()
			p5.circle(x, y, 150 + (i * 50))
			vectors(p5, x, y, 75 + (i * 25), 0, onsets, notes)

			p5.fill(0)
			p5.stroke(0)

			if(settings.beat % 2 === 0) {
				metroSizeChange = 3 + metroSpeed
			} else {
				metroSizeChange = 0
			}
			p5.circle(x, y, 50 + metroSizeChange)
		}
	}


	return (
		<Sketch setup={setup} draw={draw}/>
	)

}

export default observer(EuclidCircles)
