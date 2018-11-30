/* eslint-env node */
const path = require('path');

const config = {
	entry: {
		'data-handler': './src/data-handler.ts', 
		'data-object': './src/data-object.ts',
		'redux-data-object': './src/redux-data-object.ts',
		'redux-data-object-reducer': './src/data-object-reducer.ts'
	},
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
		process.env.NODE_ENV = 'production';
		config.output.filename = '[name].min.js';
	} else {
		config.output.filename = '[name].js';
	}

	return config;
};
