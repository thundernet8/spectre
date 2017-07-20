import path from "path";
import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import SimpleProgressWebpackPlugin from "customized-progress-webpack-plugin";
import pkg from "./package.json";

const getPlugins = (minimal = true) => {
    const plugins = [
        new webpack.BannerPlugin(
            `${pkg.name} v${pkg.version}\n\nCopyright 2017-present, WuXueqian.\nAll rights reserved.`
        ),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new ExtractTextPlugin({
            filename: pkg.name + (minimal ? ".min.css" : ".css"),
            disable: false,
            allChunks: true
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.min\.css$/g,
            cssProcessor: require("cssnano"), // eslint-disable-line global-require
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new SimpleProgressWebpackPlugin({ format: "compact" })
    ];
    if (minimal) {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                compress: minimal
                    ? {
                          warnings: false // eslint-disable-line
                      } // eslint-disable-line
                    : false,
                sourceMap: true
            })
        );
    }
    return plugins;
};

const genConfig = (minimal, entry = "js") => ({
    devtool: "#source-map", // '#eval-source-map'
    node: {
        __filename: false,
        __dirname: false
    },
    entry: {
        spectre:
            entry === "js"
                ? ["./components/index.ts"]
                : ["./components/styles.ts"]
    },
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: minimal ? "[name].min.js" : "[name].js",
        library: pkg.name,
        libraryTarget: "umd",
        umdNamedDefine: true
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.tsx?$/,
                loader: "babel-loader!ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.less$/,
                exclude: [/node_modules/],
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader!less-loader"
                })
            }
        ]
    },
    plugins: getPlugins(minimal)
});

export default [
    genConfig(false),
    genConfig(true),
    genConfig(false, "style"),
    genConfig(true, "style")
];
