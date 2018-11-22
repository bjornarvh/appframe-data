module.exports = {
	"env": {
		"browser": true,
		"node": true,
		"es6": true,
		"jest": true
	},
	"extends": "eslint:recommended",
	"parser": "babel-eslint",
	"parserOptions": {
		"sourceType": "module"
	},
	"plugins": [
		"babel",
		"jest"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"quotes": [
			"error",
			"single"
		],
		"semi": [
			"error",
			"always"
		]
	}
};