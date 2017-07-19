import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import NavBar from "..";

const NavSection = NavBar.Section;

describe("NavBar", () => {
    it("should render NavBar and NavSection", () => {
        const navbar = mount(
            <NavBar>
                <NavSection>Left section</NavSection>
                <NavSection center>Center section</NavSection>
                <NavSection>Right section</NavSection>
            </NavBar>
        );

        // expect(navbar.find("section").get(0).tagName).toEqual("header");

        expect(navbar.hasClass("spt-navbar")).toBe(true);

        expect(navbar.find("section").get(0).tagName).toEqual("SECTION");

        expect(navbar.childAt(0).hasClass("spt-navbar-section")).toBe(true);

        expect(navbar.childAt(1).hasClass("spt-navbar-center")).toBe(true);
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(
                <NavBar>
                    <NavSection>Left section</NavSection>
                    <NavSection center>Center section</NavSection>
                    <NavSection>Right section</NavSection>
                </NavBar>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
