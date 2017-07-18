import React from "react";
import classNames from "classnames";
import { SiderProps } from "./sider";

export interface BasicProps {
    style?: React.CSSProperties;
    prefixCls?: string;
    className?: string;
}

function generator(props) {
    return (BacicComponent): any => {
        return class Adapter extends React.Component<BasicProps, any> {
            static Header: any;
            static Footer: any;
            static Content: any;
            static Sider: any;
            render() {
                const { prefixCls } = props;
                return <BacicComponent prefixCls={prefixCls} {...this.props} />;
            }
        };
    };
}

class Basic extends React.Component<BasicProps, any> {
    render() {
        const { prefixCls, className, children, ...others } = this.props;
        let hasSider;
        React.Children.forEach(children, (element: any) => {
            if (element && element.type && element.type.__SPT_LAYOUT_SIDER) {
                hasSider = true;
            }
        });
        const divCls = classNames(className, prefixCls, {
            [`${prefixCls}-has-sider`]: hasSider
        });
        return (
            <div className={divCls} {...others}>
                {children}
            </div>
        );
    }
}

const Layout: React.ComponentClass<BasicProps> & {
    Header: React.ComponentClass<BasicProps>;
    Footer: React.ComponentClass<BasicProps>;
    Content: React.ComponentClass<BasicProps>;
    Sider: React.ComponentClass<SiderProps>;
} = generator({
    prefixCls: "spt-layout"
})(Basic);

const Header = generator({
    prefixCls: "spt-layout-header"
})(Basic);

const Footer = generator({
    prefixCls: "spt-layout-footer"
})(Basic);

const Content = generator({
    prefixCls: "spt-layout-content"
})(Basic);

Layout.Header = Header;
Layout.Footer = Footer;
Layout.Content = Content;

export default Layout;
