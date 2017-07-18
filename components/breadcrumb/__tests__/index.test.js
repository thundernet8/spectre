import React from "react";
// import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import BreadCrumb from "..";

const BreadCrumbItem = BreadCrumb.Item;

describe("BreadCrumb", () => {
    it("should render BreadCrumb", () => {
        // TODO:
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(
                <BreadCrumb>
                    <BreadCrumbItem>Home</BreadCrumbItem>
                    <BreadCrumbItem>Posts</BreadCrumbItem>
                    <BreadCrumbItem>One post name</BreadCrumbItem>
                </BreadCrumb>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
