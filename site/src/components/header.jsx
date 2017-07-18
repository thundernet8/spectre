import React from "react";
// import Row from "Spt/row";
// import Col from "Spt/col";
import NavBar from "Spt/navbar";
import { LinkButton } from "Spt/button";

const NavSection = NavBar.Section;

export default class Header extends React.Component {
    render() {
        return (
            <NavBar id="header" className="clearfix">
                <NavSection>
                    <a href="#" className="spt-navbar-brand mr-10">
                        Spectre.React
                    </a>
                    <LinkButton href="/docs/introduce/zh-CN/" type="link">
                        Docs
                    </LinkButton>
                    <LinkButton href="/components/introduce/zh-CN/" type="link">
                        Components
                    </LinkButton>
                </NavSection>
                <NavSection>
                    <LinkButton
                        href="https://github.com/thundernet8/spectre"
                        type="primary"
                    >
                        Github
                    </LinkButton>
                </NavSection>
                {/* <Row>
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
                </Row> */}
            </NavBar>
        );
    }
}
