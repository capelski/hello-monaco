const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const distDir = path.resolve(__dirname, 'dist');
const indexPath = path.resolve(__dirname, 'index.html');

module.exports = {
	mode: 'development',
	entry: {
		'app': './src/index.tsx',
		'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
		'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
		'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
		'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
		'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
	},
	output: {
		globalObject: 'self',
		filename: '[name].bundle.js',
		path: distDir
	},
	resolve: {
		extensions: ['.js', '.json', '.ts', '.tsx', '.worker']
	},
	module: {
		rules: [{
			test: /\.tsx?$/,
			loader: 'awesome-typescript-loader'
		}, {
			test: /\.css$/,
			use: [ 'style-loader', 'css-loader' ]
		}]
	},
	plugins: [
		new CopyWebpackPlugin([
			{
				from: indexPath,
				to: distDir,
			},
		]),
		new HtmlWebpackPlugin ({
			inject: true,
			template: indexPath
		})
    ],
};
