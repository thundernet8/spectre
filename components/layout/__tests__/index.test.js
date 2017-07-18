import React from "react";
// import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import Layout from "..";

const { Header, Content, Sider, Footer } = Layout;

describe("Layout", () => {
    it("should render Layout", () => {
        // TODO:
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(
                <Layout>
                    <Header>Header</Header>
                    <Layout>
                        <Content>Main content</Content>
                        <Sider>Right sidebar</Sider>
                    </Layout>
                    <Footer>Footer</Footer>
                </Layout>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
