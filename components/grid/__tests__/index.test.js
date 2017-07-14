import React from "react";
import { shallow } from "enzyme";
import renderer from "react-test-renderer";
import { Row, Col } from "..";

describe("Grid", () => {
    it("should render Row", () => {
        const row = shallow(<Row />);

        expect(row.type()).toEqual("div");

        expect(row.hasClass("spt-row")).toBe(true);
    });

    it("should render Col", () => {
        const col = shallow(<Col span={6} />);

        expect(col.type()).toEqual("div");

        expect(col.hasClass("spt-col-6")).toBe(true);
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(
                <Row gutter={10}>
                    <Col span={4}>Left Col</Col>
                    <Col span={20}>Right Col</Col>
                </Row>
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
