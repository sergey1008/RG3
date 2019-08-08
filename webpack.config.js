const path = require("path"),
	BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,
	TerserPlugin = require('terser-webpack-plugin');

const ignoredGSAPFiles = ['BezierPlugin', 'DirectionalRotationPlugin', 'RoundPropsPlugin'];

module.exports = (env, argv) => {
	return {
		entry: {
			base: "./src/js/common.js",
			common: "./src/ts/common.ts",
		},
		output: {
			path: path.resolve(__dirname, "./docs/"),
			filename: "js/[name].js",
			// publicPath: "/img/"
			chunkFilename: '[name].js'
		},
		devServer: {
			contentBase: "./docs",
			overlay: true,
		    // open: true,
		},
		devtool: 'source-map',
		module: {
			rules: [
				{
					test: /\.js$/,
					include: ignoredGSAPFiles.map(fileName => path.resolve('node_modules/gsap/' + fileName)),
					loader: 'null-loader',
				},
				{
					test: /\.js$/,
					loader: "babel-loader",
					query: {
					  "presets": [
					    "@babel/preset-env"
					  ]
					},
					// exclude: /\/node_modules\/(?!dom7|ssr-window|swiper)\//,
					exclude: /^.*node_modules((?!dom7|ssr-window|swiper).)*$/,
				},
				{
					test: /\.ts$/,
					loader: "ts-loader",
					// exclude: /node_modules/,
				},
				{
					test: /\.css$/,
					// loader: "css-loader",
					use: [
						{
							loader: "style-loader"
						},
						{
							loader: "css-loader",
							options: {
								minimize: true,
							}
						}
					]
				}
			]
		},
		resolve: {
			extensions: [
				".ts",
				".tsx",
				".js"
			]
		},
		optimization: {
			minimizer: [
				new TerserPlugin({
					cache: true,
					parallel: true,
					terserOptions: {
						output: {
							comments: false,
						},
						compress: {
							drop_console: true,
							ecma: 6,
							passes: 2
						}
					},
				}),
			],
	    	splitChunks: {
		        cacheGroups: {
		            vendors: {
		                test: /^.*node_modules((?!gsap).)*$/,
		                name: 'js/vendors',
		                enforce: true,
		                chunks: 'all',
		            },
		            lol: {
		                test: /(jquery.fancybox.js|jquery.fancybox.css)/,
		                name: 'js/vendors',
		                enforce: true,
		                chunks: 'all'
		            },
		            xpage: {
		            	test: /^.*xpage((?!index.ts).)*$/,
		            	name: 'js/xpage',
		                enforce: true,
		                chunks: 'all'
		            }
		        }
	    	}
		},
		plugins: [].concat(argv.mode == "development" ? new BundleAnalyzerPlugin() : [])
	}
}