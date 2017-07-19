import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import warning from "warning";

export interface NavBarProps {
    prefixCls?: string;
    style?: React.CSSProperties;
    className?: string;
}

export interface NavSectionProps {
    prefixCls?: string;
    center?: boolean;
    style?: React.CSSProperties;
    className?: string;
}

export default class NavBar extends React.Component<NavBarProps, any> {
    static Section: any;

    static defaultProps = {
        prefixCls: "spt-navbar"
    };

    static propTypes = {
        prefixCls: PropTypes.string
    };

    render() {
        let sections;
        const { prefixCls, style, className, children } = this.props;
        sections = React.Children.map(children, (element: any) => {
            warning(
                element.type && element.type.__SPT_NAVSECTION,
                "NavBar only accepts NavBar.Section as it's children"
            );
            return element;
        });
        return (
            <nav className={classNames(className, prefixCls)} style={style}>
                {sections}
            </nav>
        );
    }
}

export class NavSection extends React.Component<NavSectionProps, any> {
    static __SPT_NAVSECTION = true;

    static defaultProps = {
        prefixCls: "spt-navbar",
        center: false
    };

    static propTypes = {
        prefixCls: PropTypes.string,
        center: PropTypes.bool
    };

    render() {
        const { prefixCls, style, className, children, center } = this.props;
        const classes = classNames(className, {
            [`${prefixCls}-center`]: center,
            [`${prefixCls}-section`]: !center
        });
        return (
            <section className={classes} style={style}>
                {children}
            </section>
        );
    }
}

NavBar.Section = NavSection;
