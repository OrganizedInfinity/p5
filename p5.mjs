import p5 from "./node_modules/p5/lib/p5.esm.js"

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
		p.background("#080016")
		p.stroke("#eeeeee")
		p.strokeWeight(stroke)
		p.fill("#afafff")
		p.rect(originX, originY, width, height, padding)

		p.fill(0)
		p.strokeWeight(0)
		p.textSize(textHeight)
		p.textAlign(p.CENTER, p.TOP)
		p.text("Vyber efekt:", originX + width/2, originY + stroke)

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
		// [deg]
		const splay = 30
		// [px]
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
		// [deg]
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

	function DrawCheckerboard(increment) {
		p.fill("#afafff")
		for ( let row = 0; row < canvasSize; row += increment*2 ) {
			for ( let column = 0; column < canvasSize; column += increment ) {
				p.rect(row + (increment * (column / increment % 2)), column, increment, increment)
			}
		}
	}

	function InitCheckerboard(increment) {
		return () => {
			DrawCheckerboard(increment);
		}
	}

	function RenderBars() {
		p.background("#080016")
		p.fill("#afafff")
		for ( let offset = 0; offset < canvasSize; offset += Math.random() * canvasSize/4 ) {
			let width = Math.random() * canvasSize/8;
			
			p.rect(offset, 0, width, canvasSize)

			offset += width;
		}
	}

	const MenuEntries = [
		{ Index: 0, Label: "Default", Renderer: blank, Initializer: RenderMenu },
		{ Index: 1, Label: "Linky", Renderer: RenderBars, Initializer: SetStroke(0) },
		{ Index: 2, Label: "Čáry máry", Renderer: RenderLines, Initializer: SetStroke(5) },
		{ Index: 3, Label: "Šachovnice", Renderer: InitCheckerboard(canvasSize/8), Initializer: SetStroke(0) },
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
