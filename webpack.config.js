/* eslint-env node */
const path = require('path');

const config = {
	entry: './src/data-object.js',
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
