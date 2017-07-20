import React from "react";
import Icon from "Spt/icon";
import Button from "Spt/button";
import Checkbox from "Spt/checkbox";
import Radio from "Spt/radio";

const RadioGroup = Radio.Group;

export default class Test extends React.Component {
    render() {
        return (
            <div>
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
                <Checkbox checked={true} disabled>
                    Checkbox
                </Checkbox>
                <Checkbox checked={true}>Checkbox</Checkbox>
                <Checkbox checked={false}>Checkbox</Checkbox>
                <RadioGroup value={2}>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                </RadioGroup>
            </div>
        );
    }
}
