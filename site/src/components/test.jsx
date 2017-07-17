import React from "react";
import Icon from "Spt/icon";
import Button from "Spt/button";

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
            </div>
        );
    }
}
