import p5 from "./p5/p5.esm.js"

new p5(p => {
	p.setup = () => {
		p.createCanvas(500, 500)
	}

	p.draw = () => {
		p.background("#afafff")
	}
})
