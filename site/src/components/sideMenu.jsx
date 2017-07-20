import React from "react";
import Menu from "Spt/menu";

const SubMenu = Menu.SubMenu;

export default class SideMenu extends React.Component {
    state = {
        current: "1",
        openKeys: ["sub1"]
    };

    handleClick = e => {
        this.setState({ current: e.key });
    };

    onOpenChange = openKeys => {
        this.setState({
            openKeys: [openKeys.pop()]
        });
    };

    render() {
        return (
            <Menu
                onClick={this.handleClick}
                onOpenChange={this.onOpenChange}
                openKeys={this.state.openKeys}
                selectedKeys={[this.state.current]}
                style={{ width: 240 }}
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                mode="inline"
            >
                <SubMenu key="sub1" title={<span>Getting started</span>}>
                    <Menu.Item key="1">Introduction</Menu.Item>
                    <Menu.Item key="2">Installation</Menu.Item>
                    <Menu.Item key="3">Custom version</Menu.Item>
                    <Menu.Item key="4">Browser support</Menu.Item>
                    <Menu.Item key="5">{`What's new`}</Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span>Elements</span>}>
                    <Menu.Item key="1">Typography</Menu.Item>
                    <Menu.Item key="2">Tables</Menu.Item>
                    <Menu.Item key="3">Buttons</Menu.Item>
                    <Menu.Item key="4">Forms</Menu.Item>
                    <Menu.Item key="5">Icons</Menu.Item>
                    <Menu.Item key="6">Labels</Menu.Item>
                    <Menu.Item key="7">Codes</Menu.Item>
                    <Menu.Item key="8">Media</Menu.Item>
                </SubMenu>
                <SubMenu key="sub3" title={<span>Layout</span>}>
                    <Menu.Item key="1">Flexbox grid</Menu.Item>
                    <Menu.Item key="2">Responsive</Menu.Item>
                    <Menu.Item key="3">Navbar</Menu.Item>
                    <Menu.Item key="4">Panels</Menu.Item>
                    <Menu.Item key="5">Empty states</Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span>Components</span>}>
                    <Menu.Item key="1">Autocomplete</Menu.Item>
                    <Menu.Item key="2">Avatars</Menu.Item>
                    <Menu.Item key="3">Badges</Menu.Item>
                    <Menu.Item key="4">Bars</Menu.Item>
                    <Menu.Item key="5">Cards</Menu.Item>
                    <Menu.Item key="6">Chips</Menu.Item>
                    <Menu.Item key="7">Menus</Menu.Item>
                    <Menu.Item key="8">Modals</Menu.Item>
                    <Menu.Item key="9">Navigation</Menu.Item>
                    <Menu.Item key="10">Popovers</Menu.Item>
                    <Menu.Item key="11">Steps</Menu.Item>
                    <Menu.Item key="12">Tiles</Menu.Item>
                    <Menu.Item key="13">Toasts</Menu.Item>
                    <Menu.Item key="14">Tooltips</Menu.Item>
                </SubMenu>
                <SubMenu key="sub5" title={<span>Utilities</span>}>
                    <Menu.Item key="1">Position</Menu.Item>
                    <Menu.Item key="2">Display</Menu.Item>
                    <Menu.Item key="3">Text</Menu.Item>
                    <Menu.Item key="4">Shapes</Menu.Item>
                    <Menu.Item key="5">Divider</Menu.Item>
                    <Menu.Item key="6">Loading</Menu.Item>
                </SubMenu>
                <SubMenu key="sub6" title={<span>Experimentals</span>}>
                    <Menu.Item key="1">Accordions</Menu.Item>
                    <Menu.Item key="2">Calendars</Menu.Item>
                    <Menu.Item key="3">Carousels</Menu.Item>
                    <Menu.Item key="4">Comparison sliders</Menu.Item>
                    <Menu.Item key="5">Filters</Menu.Item>
                    <Menu.Item key="6">Meters</Menu.Item>
                    <Menu.Item key="7">Parallax</Menu.Item>
                    <Menu.Item key="8">Progress</Menu.Item>
                    <Menu.Item key="9">Sliders</Menu.Item>
                    <Menu.Item key="10">Timelines</Menu.Item>
                </SubMenu>
            </Menu>
        );
    }
}
