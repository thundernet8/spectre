var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
import React, { Children, cloneElement } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
export default class Row extends React.Component {
    render() {
        const _a = this.props, { justify, align, className, gutter, style, children } = _a, others = __rest(_a, ["justify", "align", "className", "gutter", "style", "children"]);
        const prefixCls = "spt-row";
        const classes = classNames(prefixCls, {
            [`${prefixCls}-flex`]: true,
            [`${prefixCls}-flex-${justify}`]: !!justify,
            [`${prefixCls}-flex-${align}`]: !!align
        }, className);
        const rowStyle = gutter > 0
            ? Object.assign({ marginLeft: gutter / -2, marginRight: gutter / -2 }, style) : style;
        const cols = Children.map(children, (col) => {
            if (!col) {
                return null;
            }
            if (col.props && gutter > 0) {
                return cloneElement(col, {
                    style: Object.assign({ paddingLeft: gutter / 2, paddingRight: gutter / 2 }, col.props.style)
                });
            }
            return col;
        });
        return (<div className={classes} style={rowStyle} {...others}>
                {cols}
            </div>);
    }
}
Row.defaultProps = {
    gutter: 0
};
Row.propTypes = {
    className: PropTypes.string,
    gutter: PropTypes.number,
    align: PropTypes.string,
    justify: PropTypes.string
};
