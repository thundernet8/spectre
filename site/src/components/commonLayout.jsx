import React from "react";
import Layout from "Spt/layout";
import Breadcrumb from "Spt/breadcrumb";
// import Icon from "Spt/icon";
import SiteHeader from "./header";
import SiteFooter from "./footer";

const { Header, Footer, Sider, Content } = Layout;

export default class CommonLayout extends React.Component {
    render() {
        return (
            <Layout>
                <Header className="header">
                    <SiteHeader />
                </Header>
                <Content style={{ padding: "0 50px" }}>
                    <Breadcrumb style={{ margin: "12px 0" }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb>
                    <Layout style={{ padding: "24px 0", background: "#fff" }}>
                        {this.props.sider ||
                            <Sider width={200} style={{ background: "#fff" }}>
                                Left menu
                            </Sider>}
                        <Content style={{ padding: "0 24px", minHeight: 280 }}>
                            {this.props.children}
                        </Content>
                    </Layout>
                </Content>
                <Footer>
                    <SiteFooter />
                </Footer>
            </Layout>
        );
    }
}
