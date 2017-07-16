import path from "path";
import webpack from "webpack";
const AssetsPlugin = require("assets-webpack-plugin");
const pkg = require("../package.json");

const __DEV__ = process.env.NODE_ENV === "development";

const getPlugins = () => {
    let plugins = [
        new webpack.DllPlugin({
            context: __dirname,
            path: "manifest.json",
            name: "[name]_[chunkhash:8]"
        }),
        new AssetsPlugin({
            filename: "vendors-config.json",
            path: "./dist"
            // processOutput: function(assets) {
            //     Object.keys(assets).forEach(function(key) {
            //         let item = assets[key];
            //         item.js = item.js.substr(1);
            //     });
            //     return JSON.stringify(assets);
            // }
        })
    ];
    if (!__DEV__) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: __DEV__
                    ? false
                    : {
                          warnings: false // eslint-disable-line
                      },
                sourceMap: true
            })
        );
    }
    return plugins;
};

export default {
    entry: {
        vendors: Object.keys(pkg.dependencies)
    },
    output: {
        path: path.resolve(__dirname, "../dist"),
        publicPath: "./",
        filename: "[name].[chunkhash:8].js",
        library: "[name]_[chunkhash:8]",
        libraryTarget: "umd"
    },
    plugins: getPlugins()
};
