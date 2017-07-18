import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import omit from "omit.js";
import Icon from "../icon";
import Group from "./button-group";

export type ButtonType =
    | "default"
    | "primary"
    | "link"
    | "success"
    | "info"
    | "danger";
export type ButtonShape = "circle" | "circle-outline" | "square";
export type ButtonSize = "small" | "large";

export interface ButtonProps {
    type?: ButtonType;
    htmlType?: string;
    icon?: string;
    shape?: ButtonShape;
    size?: ButtonSize;
    onClick?: React.FormEventHandler<any>;
    onMouseUp?: React.FormEventHandler<any>;
    onMouseDown?: React.FormEventHandler<any>;
    loading?: boolean | { delay?: number };
    disabled?: boolean;
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
    block?: boolean;
}

export default class Button extends React.Component<ButtonProps, any> {
    static Group: typeof Group;

    static defaultProps = {
        prefixCls: "spt-btn",
        loading: false,
        clicked: false,
        block: false
    };

    static propTypes = {
        type: PropTypes.string,
        shape: PropTypes.oneOf(["circle", "circle-outline", "square"]),
        size: PropTypes.oneOf(["large", "default", "small"]),
        htmlType: PropTypes.oneOf(["submit", "button", "reset"]),
        onClick: PropTypes.func,
        loading: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
        className: PropTypes.string,
        icon: PropTypes.string,
        block: PropTypes.bool
    };

    timeout: number;
    delayTimeout: number;

    constructor(props: ButtonProps) {
        super(props);
        this.state = {
            loading: props.loading
        };
    }

    componentWillReceiveProps(nextProps: ButtonProps) {
        const currentLoading = this.props.loading;
        const loading = nextProps.loading;

        if (currentLoading) {
            clearTimeout(this.delayTimeout);
        }

        if (typeof loading !== "boolean" && loading && loading.delay) {
            this.delayTimeout = setTimeout(
                () => this.setState({ loading }),
                loading.delay
            );
        } else {
            this.setState({ loading });
        }
    }

    componentWillUnmount() {
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout);
        }
    }

    handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Add click effect
        this.setState({ clicked: true });
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.setState({ clicked: false }), 500);

        const onClick = this.props.onClick;
        if (onClick) {
            onClick(e);
        }
    };

    // Handle auto focus when click button in Chrome
    handleMouseUp = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (this.props.onMouseUp) {
            this.props.onMouseUp(e);
        }
    };

    render() {
        const {
            type,
            shape,
            size = "",
            className,
            htmlType,
            children,
            icon,
            prefixCls,
            block,
            ...others
        } = this.props;

        const { loading, clicked } = this.state;

        // large => lg
        // small => sm
        let sizeCls = "";
        switch (size) {
            case "large":
                sizeCls = "lg";
                break;
            case "small":
                sizeCls = "sm";
            default:
                break;
        }

        const classes = classNames(prefixCls, className, {
            [`${prefixCls}-${type}`]: type,
            [`${prefixCls}-${shape}`]: shape,
            [`${prefixCls}-${sizeCls}`]: sizeCls,
            [`${prefixCls}-icon-only`]: !children && icon && !loading,
            [`${prefixCls}-loading`]: loading,
            [`${prefixCls}-clicked`]: clicked,
            [`${prefixCls}-block`]: block
        });

        const iconType = loading ? "loading" : icon;
        const iconNode = iconType ? <Icon type={iconType} /> : null;

        return (
            <button
                {...omit(others, ["loading", "clicked"])}
                type={htmlType || "button"}
                className={classes}
                onMouseUp={this.handleMouseUp}
                onClick={this.handleClick}
            >
                {iconNode}
                {children}
            </button>
        );
    }
}
