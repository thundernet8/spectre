import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Button from "..";

const ButtonGroup = Button.Group;

describe("Button", () => {
    it("should render Button", () => {
        const btn = shallow(<Button />);

        expect(btn.type()).toEqual("button");

        expect(btn.hasClass("spt-btn")).toBe(true);

        const largeBtn = shallow(<Button size="large" type="primary" />);

        expect(largeBtn.hasClass("spt-btn-lg")).toBe(true);
        expect(largeBtn.hasClass("spt-btn-primary")).toBe(true);

        // TODO add icon test
    });

    it("button renders correctly", () => {
        const tree = renderer
            .create(<Button size="large" type="primary" />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});

describe("Button Group", () => {
    it("should render Button Group", () => {
        const group = shallow(<ButtonGroup size="block" />);

        expect(group.type()).toEqual("div");

        expect(group.hasClass("spt-btn-group")).toBe(true);

        expect(group.hasClass("spt-btn-group-block")).toBe(true);
    });

    it("button group renders correctly", () => {
        const tree = renderer.create(<ButtonGroup size="large" />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
