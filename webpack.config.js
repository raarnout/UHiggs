const Path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
	entry: {
		app: "./src/js/app.js"
	},
	mode: "development",
	devtool: "inline-source-map",
	output: {
		path: Path.resolve(process.cwd(), 'dist'),
		pathinfo: true,
		filename: "js/[name].js",
		chunkFilename: "js/[name].js",
	},
	performance: { hints: false },
	optimization: {
		minimizer: [
			new TerserPlugin({
				parallel: true,
				terserOptions: {
					ecma: 5
				}
			}),
			new CssMinimizerPlugin({})
		],
		runtimeChunk: false
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/app.css",
			chunkFilename: "css/app.css",
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: "src/fonts", to: "fonts" },
				{ from: "src/img", to: "img" },
			]
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						cacheDirectory: true,
					}
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"postcss-loader",
					"sass-loader"
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				type: "asset/resource",
				generator: {
					filename: "fonts/[name][ext]"
				}
			},
			{
				test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/,
				type: "asset/resource",
				generator: {
					filename: "img/[name][ext]"
				}
			}
		]
	},
	devServer: {
		static: {
			directory: Path.join(process.cwd(), "/static"),
		},
		compress: true,
		port: 8080,
		open: true,
	}
};
