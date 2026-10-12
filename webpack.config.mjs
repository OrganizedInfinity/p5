export default {
	entry: "./index.html",
	output: {
		path: "/var/nginx/p5",
		module: true
	},
	module: {
		rules: [
			{ test: /\.esm\.js$/, type: "javascript/esm" }
		]
	}
}
