import * as process from "process";
const ENV = process.env.NODE_ENV;
if (ENV !== "production" && ENV !== "test" && typeof window !== "undefined") {
    console.warn(
        "You are using a whole package of spectre, " +
            "please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size."
    );
}

// full export

export { default as Button } from "./button";

export { default as Col } from "./col";

export { default as Row } from "./row";

export { default as version } from "./version";
