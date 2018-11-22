/* eslint-env node */
const path = require('path');

const config = {
	entry: './src/data-object.ts',
	module: {
		rules: [
			{
				test: /(\.[tj]sx?)$/,
				use: 'babel-loader',
				exclude: /node_modules/
			}
		]
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		library: 'DataObject'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
	}
};

module.exports = (env, argv) => {
	if (argv.mode === 'production') {
		config.output.filename = 'data-object.min.js';
	} else {
		config.output.filename = 'data-object.js';
	}

	return config;
};
