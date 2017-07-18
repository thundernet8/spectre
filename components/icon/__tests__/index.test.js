import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Icon from "..";

describe("Icon", () => {
    it("should render Icon", () => {
        const icon = shallow(<Icon type="upward" />);
        expect(icon.type()).toEqual("i");
        expect(icon.hasClass("spticon")).toBe(true);
        expect(icon.hasClass("spticon-upward")).toBe(true);

        const spinIcon = shallow(<Icon type="upward" spin />);
        expect(spinIcon.hasClass("spticon-spin")).toBe(true);

        const faIcon = shallow(<Icon fontset="fa" type="home" />);
        expect(faIcon.hasClass("fa fa-home")).toBe(true);
        expect(faIcon.hasClass("spticon-home")).toBe(false);
    });

    it("icon renders correctly", () => {
        const tree = renderer.create(<Icon type="upward" />).toJSON();
        expect(tree).toMatchSnapshot();

        const tree2 = renderer
            .create(<Icon fontset="fa" type="home" />)
            .toJSON();
        expect(tree2).toMatchSnapshot();
    });
});
