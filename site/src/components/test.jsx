import React from "react";
import Icon from "Spt/icon";
import Button from "Spt/button";
import Checkbox from "Spt/checkbox";
import Radio from "Spt/radio";
import Tooltip from "Spt/tooltip";
import Menu from "Spt/menu";

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const RadioGroup = Radio.Group;

export default class Test extends React.Component {
    render() {
        return (
            <div>
                <Menu
                    onClick={this.handleClick}
                    style={{ width: 240 }}
                    defaultSelectedKeys={["1"]}
                    defaultOpenKeys={["sub1"]}
                    mode="inline"
                >
                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <Icon type="mail" />
                                <span>Navigation One</span>
                            </span>
                        }
                    >
                        <MenuItemGroup key="g1" title="Item 1">
                            <Menu.Item key="1">Option 1</Menu.Item>
                            <Menu.Item key="2">Option 2</Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup key="g2" title="Item 2">
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <SubMenu
                        key="sub2"
                        title={
                            <span>
                                <Icon type="link" />
                                <span>Navigation Two</span>
                            </span>
                        }
                    >
                        <Menu.Item key="5">Option 5</Menu.Item>
                        <Menu.Item key="6">Option 6</Menu.Item>
                        <SubMenu key="sub3" title="Submenu">
                            <Menu.Item key="7">Option 7</Menu.Item>
                            <Menu.Item key="8">Option 8</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu
                        key="sub4"
                        title={
                            <span>
                                <Icon type="apps" />
                                <span>Navigation Three</span>
                            </span>
                        }
                    >
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>
                </Menu>
                test
                <Button type="primary" size="large" block>
                    Primary
                </Button>
                <Icon type="upward" />
                <Button
                    icon="upward"
                    type="primary"
                    shape="square"
                    size="large"
                />
                <Checkbox checked disabled>
                    Checkbox
                </Checkbox>
                <Checkbox checked>Checkbox</Checkbox>
                <Checkbox checked={false}>Checkbox</Checkbox>
                <RadioGroup value={2}>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                </RadioGroup>
                <Tooltip title="prompt text">
                    <span>Tooltip will show when mouse enter.</span>
                </Tooltip>
            </div>
        );
    }
}
