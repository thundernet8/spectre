import path from "path";
import express from "express";
import webpack from "webpack";
import config from "./webpack.config.babel";
import { port } from "./webpack.config.babel";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

let app = express();
let compiler = webpack(config);

const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true
        // chunks: false
    }
});

let hotMiddleware = webpackHotMiddleware(compiler, {
    log: console.info
});

// force page reload when html-webpack-plugin template changes
compiler.plugin("compilation", function(compilation) {
    compilation.plugin("html-webpack-plugin-after-emit", function(data, cb) {
        hotMiddleware.publish({ action: "reload" });
        cb();
    });
});

// handle fallback for HTML5 history API
app.use(require("connect-history-api-fallback")());
// serve webpack bundle output
app.use(devMiddleware);
// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);
// serve pure static assets
app.use("/static", express.static(path.resolve(__dirname, "../dist")));

// serve vendors js file as it is not in hot middleware
app.get("*", function(req, res, next) {
    const reg = /\/?(vendors\.[0-9a-z]+?\.js)/i;
    const match = req.url.match(reg);
    if (match && match.length > 1) {
        // /vendors.xxxxxxxx.js
        res.sendFile(path.join(__dirname, "../dist", match[1]));
    } else if (/.*\.(js|css|jpg|png|gif).*?/.test(req.url)) {
        next();
    } else {
        res.sendFile(path.join(__dirname, "../dist/index.html"));
    }
});

const server = app.listen(port, "0.0.0.0", err => {
    if (err) {
        return console.error(err);
    }
    console.log("Listening at http://0.0.0.0:" + port);
});

process.on("SIGTERM", () => {
    console.log("Stopping dev server");
    devMiddleware.close();
    server.close(() => {
        process.exit(0);
    });
});
