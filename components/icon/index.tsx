import React from "react";
import classNames from "classnames";
import omit from "omit.js";

export interface IconProps {
    fontset?: string; // e.g fa
    type: string;
    className?: string;
    title?: string;
    onClick?: React.MouseEventHandler<any>;
    spin?: boolean;
    style?: React.CSSProperties;
}

const Icon = (props: IconProps) => {
    const { fontset, type, className = "", spin } = props;
    const classString = classNames(
        {
            spticon: true,
            "spticon-spin": !!spin || type === "loading",
            [`spticon-${type}`]: !fontset,
            [`${fontset}`]: fontset,
            [`${fontset}-${type}`]: fontset && type
        },
        className
    );
    return <i {...omit(props, ["type", "spin"])} className={classString} />;
};

export default Icon;
