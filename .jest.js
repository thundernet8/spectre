module.exports = {
    verbose: true,
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
    testPathIgnorePatterns: ["/node_modules/", "node"],
    testRegex: "/(__tests__|tests)/.*\\.test\\.(js|ts|jsx|tsx)$",
    transform: {
        "\\.tsx?$": "./node_modules/ts-jest/preprocessor.js",
        "\\.js$": "./node_modules/babel-jest",
        "\\.less$": "./node_modules/jest-css-modules"
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
            tsConfigFile: "./tsconfig_jest.json"
        }
    }
};
