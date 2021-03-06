import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

const stringOrNumber = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
]);
const objectOrNumber = PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.number
]);

export interface ColSize {
    span?: number;
    order?: number;
    offset?: number;
    push?: number;
    pull?: number;
}

export interface ColProps {
    className?: string;
    span?: number;
    order?: number;
    offset?: number;
    push?: number;
    pull?: number;
    xs?: number | ColSize;
    sm?: number | ColSize;
    md?: number | ColSize;
    lg?: number | ColSize;
    xl?: number | ColSize;
    style?: React.CSSProperties;
}

export default class Col extends React.Component<ColProps, any> {
    static propTypes = {
        span: stringOrNumber,
        order: stringOrNumber,
        offset: stringOrNumber,
        push: stringOrNumber,
        pull: stringOrNumber,
        className: PropTypes.string,
        children: PropTypes.node,
        xs: objectOrNumber,
        sm: objectOrNumber,
        md: objectOrNumber,
        lg: objectOrNumber,
        xl: objectOrNumber
    };

    render() {
        const props = this.props;
        const {
            span,
            order,
            offset,
            push,
            pull,
            className,
            children,
            ...others
        } = props;
        const prefixCls = "spt-col";
        let sizeClassObj = {};
        ["xs", "sm", "md", "lg", "xl"].forEach(size => {
            let sizeProps: ColSize = {};
            if (typeof props[size] === "number") {
                sizeProps.span = props[size];
            } else if (typeof props[size] === "object") {
                sizeProps = props[size] || {};
            }

            delete others[size];

            sizeClassObj = {
                ...sizeClassObj,
                [`${prefixCls}-${size}-${sizeProps.span}`]:
                    sizeProps.span !== undefined,
                [`${prefixCls}-${size}-order-${sizeProps.order}`]:
                    sizeProps.order || sizeProps.order === 0,
                [`${prefixCls}-${size}-offset-${sizeProps.offset}`]:
                    sizeProps.offset || sizeProps.offset === 0,
                [`${prefixCls}-${size}-push-${sizeProps.push}`]:
                    sizeProps.push || sizeProps.push === 0,
                [`${prefixCls}-${size}-pull-${sizeProps.pull}`]:
                    sizeProps.pull || sizeProps.pull === 0
            };
        });
        const classes = classNames(
            {
                [`${prefixCls}-${span}`]: span !== undefined,
                [`${prefixCls}-order-${order}`]: order,
                [`${prefixCls}-offset-${offset}`]: offset,
                [`${prefixCls}-push-${push}`]: push,
                [`${prefixCls}-pull-${pull}`]: pull
            },
            className,
            sizeClassObj
        );

        return (
            <div className={classes} {...others}>
                {children}
            </div>
        );
    }
}
