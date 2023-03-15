const path = require('path');

module.exports = {
	entry: './src/main.ts',
	devtool: 'inline-source-map',
	target: ['web', 'es4'],
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		library: 'Main',
		libraryExport: 'Main'
	}
};