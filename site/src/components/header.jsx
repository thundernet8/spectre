import React from "react";
import Row from "Spt/row";
import Col from "Spt/col";

export default class Header extends React.Component {
    render() {
        return (
            <header id="header" className="clearfix">
                <Row>
                    <Col span={4}>SPECTRE</Col>
                    <Col span={20}>
                        <ul>
                            <li>
                                <a href="/index/zh-CN/">HOME</a>
                            </li>
                            <li>
                                <a href="/docs/introduce/zh-CN/">COMPONENTS</a>
                            </li>
                        </ul>
                    </Col>
                </Row>
            </header>
        );
    }
}
