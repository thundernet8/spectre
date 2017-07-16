import React from "react";
import Row from "Spt/row";
import Col from "Spt/col";

export default class Footer extends React.Component {
    render() {
        return (
            <footer id="footer" className="clearfix">
                <Row>
                    <Col span={6}>Col1</Col>
                    <Col span={6}>Col2</Col>
                    <Col span={6}>Col3</Col>
                    <Col span={6}>Col4</Col>
                </Row>
            </footer>
        );
    }
}
