import { version } from "../package.json";

describe("dist files", () => {
    it("export modules correctly", () => {
        const spt = process.env.CI
            ? require("../dist/spectre") // eslint-disable-line global-require
            : require("../components"); // eslint-disable-line global-require
        expect(Object.keys(spt)).toMatchSnapshot();
    });

    it("have matched version", () => {
        const spt = require("../dist/spectre"); // eslint-disable-line global-require
        expect(spt.version).toBe(version);
    });
});
