import p5 from "./p5/p5.esm.js"

new p5(p => {
	const blank = () => {  }
	const clear = () => { p.background("#080016") }
	const canvasSize = 1024
	const center = canvasSize / 2

	function RenderMenu(entries) {
		const	originX = 20, originY = 20,
			width = 256, height = 32*7,
			stroke = 7, padding = 20,
			textHeight = 32, spacing = 10
		p.background(255)
		p.stroke(0)
		p.strokeWeight(stroke)
		p.fill("#afafff")
		p.rect(originX, originY, width, height, padding)

		p.fill(0)
		p.strokeWeight(0)
		p.textSize(textHeight)
		p.textAlign(p.CENTER, p.TOP)
		p.text("Ahoj světe!", originX + width/2, originY + stroke)

		for (const entry of entries) {
			if (entry.Index == 0)
				continue
			p.textAlign(p.LEFT, p.TOP)
			p.text(entry.Index + ") " + entry.Label, originX + stroke, originY + stroke + (textHeight + spacing)*entry.Index)
		}
	}

	function RenderLines() {
		p.stroke(Math.random()*255, 255, 255)
		p.line(Math.random()*canvasSize, Math.random()*canvasSize, Math.random()*canvasSize, Math.random()*canvasSize)
	}

	function DrawTangent(degree) {
		const splay = 30
		const radius = 256
		p.stroke((degree%360)*255/270, 255, 255)
		const rx1 = Math.sin((degree + splay) * Math.PI / 180)
		const ry1 = Math.cos((degree + splay) * Math.PI / 180)
		const x1 = rx1 * radius + center
		const y1 = ry1 * radius + center
		const rx2 = Math.sin((degree - splay) * Math.PI / 180)
		const ry2 = Math.cos((degree - splay) * Math.PI / 180)
		const x2 = rx2 * radius + center
		const y2 = ry2 * radius + center
		
		p.line(x1, y1, x2, y2)
	}

	let degree = 0
	function RenderTangents() {
		const increment = 2
		p.background("#080016")

		DrawTangent(degree)
		DrawTangent(degree+120)
		DrawTangent(degree+240)

		degree += increment
		degree %= 360
	}

	function SetStroke(weight) {
		return () => {
			p.strokeWeight(weight)
			clear()
		}
	}

	let color = 0
	function InitCheckerboard() {
		const increment = canvasSize / 8

		p.fill(Math.sin(color)*255, 255, 255)
		color += 0.01;
		for ( let row = 0; row < canvasSize; row += increment*2 ) {
			for ( let column = 0; column < canvasSize; column += increment ) {
				p.rect(row + (increment * (column / increment % 2)), column, increment, increment)
			}
		}
	}

	const MenuEntries = [
		{ Index: 0, Label: "Default", Renderer: blank, Initializer: RenderMenu },
		{ Index: 1, Label: "Linky", Renderer: blank, Initializer: clear },
		{ Index: 2, Label: "Čáry máry", Renderer: RenderLines, Initializer: SetStroke(5) },
		{ Index: 3, Label: "Šachovnice", Renderer: InitCheckerboard, Initializer: SetStroke(0) },
		{ Index: 4, Label: "Moje tečny", Renderer: RenderTangents, Initializer: SetStroke(8) }
	]

	let CurrentEntry = MenuEntries[0];
	p.setup = () => {
		p.createCanvas(canvasSize, canvasSize)
		p.colorMode(p.HSB)
		CurrentEntry.Initializer(MenuEntries);
	}

	p.draw = () => {
		CurrentEntry.Renderer(MenuEntries);
		if (p.key >= '0' && p.key <= '9') {
			CurrentEntry = MenuEntries[p.key-'0']
			if (CurrentEntry == null)
				CurrentEntry = MenuEntries[0]
			CurrentEntry.Initializer(MenuEntries);
		}
	}
})
