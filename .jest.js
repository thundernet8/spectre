module.exports = {
    verbose: true,
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    testPathIgnorePatterns: ["/node_modules/", "node"],
    testRegex: "/__tests__/.*\\.test\\.(js|ts|jsx|tsx)$",
    transform: {
        "\\.tsx?$": "./node_modules/ts-jest/preprocessor.js",
        "\\.js$": "./node_modules/babel-jest"
    },
    transformIgnorePatterns: ["/node_modules/", "/dist/"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    collectCoverageFrom: [
        "components/**/*.{ts,tsx}",
        "!components/*/style/index.tsx",
        "!components/style/index.tsx"
    ],
    collectCoverage: true,
    globals: {
        "ts-jest": {
            tsConfigFile: "./tsconfig_test.json"
        }
    }
};
