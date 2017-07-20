import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import WebpackStableChunkId from "webpackstablechunkid";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import { WebpackBundleSizeAnalyzerPlugin } from "webpack-bundle-size-analyzer";
import SimpleProgressWebpackPlugin from "customized-progress-webpack-plugin";
const vendorsConfig = require("../dist/vendors-config.json");

export const port = process.env.PORT || 8000;
export const __DEV__ = process.env.NODE_ENV !== "production";

const getPlugins = () => {
    let plugins = [
        new SimpleProgressWebpackPlugin({ format: "compact" }),
        new WebpackBundleSizeAnalyzerPlugin(
            path.resolve(__dirname, "../reports/bundle-report.txt")
        ),
        new WebpackStableChunkId(),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("../manifest.json")
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            minChunks: ({ resource } = {}) => {
                return (
                    resource && /utils\/([0-9a-zA-Z_-]+)\.js/i.test(resource) // TODO modifiy
                );
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest",
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: "style.min.[contenthash].css",
            disable: __DEV__,
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.min\.(.*)\.css$/g,
            cssProcessor: require("cssnano"), // eslint-disable-line global-require
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: path.resolve(__dirname, "../src/index.html"),
            inject: true,
            vendorsName: vendorsConfig.vendors.js
        })
    ];

    if (__DEV__) {
        plugins = plugins.concat([
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false // eslint-disable-line
                },
                sourceMap: true
            }),
            new webpack.HotModuleReplacementPlugin()
        ]);
    }
    return plugins;
};

export default {
    devtool: __DEV__ ? "#eval-source-map" : "#source-map", // '#eval-source-map'
    node: {
        __filename: false,
        __dirname: false
    },
    entry: {
        app: __DEV__
            ? [
                  `webpack-hot-middleware/client?reload=true?path=http://0.0.0.0:${port}/__webpack_hmr`,
                  path.resolve(__dirname, "../src/index.jsx")
              ]
            : path.resolve(__dirname, "../src/index.jsx")
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: __DEV__ ? "/" : "./static/",
        filename: __DEV__ ? "[name].[hash].js" : "[name].[chunkhash:8].js",
        chunkFilename: __DEV__
            ? "[name].[hash].chunk.js"
            : "[name].[chunkhash:8].chunk.js",
        library: __DEV__ ? "[name]" : "[name]_[chunkhash:8]"
    },
    resolve: {
        extensions: [".js", ".jsx", ".less"],
        modules: [
            path.resolve(__dirname, "src"),
            path.resolve(__dirname, "../node_modules")
        ],
        alias: {
            Spt: path.resolve(__dirname, "../../lib")
        }
    },
    target: "web",
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: __DEV__
                    ? "react-hot-loader!babel-loader"
                    : "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: "json-loader",
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: __DEV__
                    ? ExtractTextPlugin.extract({
                          fallback: "style-loader",
                          use: "css-loader?sourceMap!less-loader"
                      })
                    : "style-loader!css-loader?sourceMap!less-loader"
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpe?g|gif|mp4|webm)(\?\S*)?$/,
                loader: "url-loader?limit=8192&name=assets/[hash].[ext]"
            }
        ]
    },
    plugins: getPlugins()
};
