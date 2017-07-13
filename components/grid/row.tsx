import React, { Children, cloneElement } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

interface RowProps {
    className?: string;
    gutter?: number;
    align?: "top" | "middle" | "bottom";
    justify?: "start" | "end" | "center" | "space-around" | "space-between";
    style?: React.CSSProperties;
}

export default class Row extends React.Component<RowProps, any> {
    static defaultProps = {
        gutter: 0
    };

    static propTypes = {
        className: PropTypes.string,
        gutter: PropTypes.number,
        align: PropTypes.string,
        justify: PropTypes.string
    };

    render() {
        const {
            justify,
            align,
            className,
            gutter,
            style,
            children,
            ...others
        } = this.props;
        const prefixCls = "spt-row";
        const classes = classNames(
            {
                prefixCls: true,
                [`${prefixCls}-flex`]: true,
                [`${prefixCls}-flex-${justify}`]: !!justify,
                [`${prefixCls}-flex-${align}`]: !!align
            },
            className
        );
        const rowStyle =
            (gutter as number) > 0
                ? {
                      marginLeft: (gutter as number) / -2,
                      marginRight: (gutter as number) / -2,
                      ...style
                  }
                : style;
        const cols = Children.map(children, (col: React.ReactElement<any>) => {
            if (!col) {
                return null;
            }
            if (col.props && (gutter as number) > 0) {
                return cloneElement(col, {
                    style: {
                        paddingLeft: (gutter as number) / 2,
                        paddingRight: (gutter as number) / 2,
                        ...col.props.style
                    }
                });
            }
            return col;
        });

        return (
            <div className={classes} style={rowStyle} {...others}>
                {cols}
            </div>
        );
    }
}
