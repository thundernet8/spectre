import React, { cloneElement } from "react";
import RcTooltip from "rc-tooltip";
import { placements as rcPlacements } from "rc-tooltip/lib/placements";
import classNames from "classnames";

const autoAdjustOverflowEnabled = {
    adjustX: 1,
    adjustY: 1
};

const autoAdjustOverflowDisabled = {
    adjustX: 0,
    adjustY: 0
};

const targetOffset = [0, 0];

export interface AdjustOverflow {
    adjustX?: 0 | 1;
    adjustY?: 0 | 1;
}

export interface PlacementsConfig {
    arrowWidth?: number;
    horizontalArrowShift?: number;
    verticalArrowShift?: number;
    arrowPointAtCenter?: boolean;
    autoAdjustOverflow?: any;
}

function getOverflowOptions(autoAdjustOverflow: any) {
    if (typeof autoAdjustOverflow === "boolean") {
        return autoAdjustOverflow
            ? autoAdjustOverflowEnabled
            : autoAdjustOverflowDisabled;
    }
    return {
        ...autoAdjustOverflowDisabled,
        ...autoAdjustOverflow
    };
}

function getPlacements(config: PlacementsConfig = {}) {
    const {
        arrowWidth = 5,
        horizontalArrowShift = 16,
        verticalArrowShift = 12,
        autoAdjustOverflow = true
    } = config;
    const placementMap = {
        left: {
            points: ["cr", "cl"],
            offset: [-4, 0]
        },
        right: {
            points: ["cl", "cr"],
            offset: [4, 0]
        },
        top: {
            points: ["bc", "tc"],
            offset: [0, -4]
        },
        bottom: {
            points: ["tc", "bc"],
            offset: [0, 4]
        },
        topLeft: {
            points: ["bl", "tc"],
            offset: [-(horizontalArrowShift + arrowWidth), -4]
        },
        leftTop: {
            points: ["tr", "cl"],
            offset: [-4, -(verticalArrowShift + arrowWidth)]
        },
        topRight: {
            points: ["br", "tc"],
            offset: [horizontalArrowShift + arrowWidth, -4]
        },
        rightTop: {
            points: ["tl", "cr"],
            offset: [4, -(verticalArrowShift + arrowWidth)]
        },
        bottomRight: {
            points: ["tr", "bc"],
            offset: [horizontalArrowShift + arrowWidth, 4]
        },
        rightBottom: {
            points: ["bl", "cr"],
            offset: [4, verticalArrowShift + arrowWidth]
        },
        bottomLeft: {
            points: ["tl", "bc"],
            offset: [-(horizontalArrowShift + arrowWidth), 4]
        },
        leftBottom: {
            points: ["br", "cl"],
            offset: [-4, verticalArrowShift + arrowWidth]
        }
    };
    Object.keys(placementMap).forEach(key => {
        placementMap[key] = config.arrowPointAtCenter
            ? {
                  ...placementMap[key],
                  overflow: getOverflowOptions(autoAdjustOverflow),
                  targetOffset
              }
            : {
                  ...rcPlacements[key],
                  overflow: getOverflowOptions(autoAdjustOverflow)
              };
    });
    return placementMap;
}

export type TooltipPlacement =
    | "top"
    | "left"
    | "right"
    | "bottom"
    | "topLeft"
    | "topRight"
    | "bottomLeft"
    | "bottomRight"
    | "leftTop"
    | "leftBottom"
    | "rightTop"
    | "rightBottom";

export interface AbstractTooltipProps {
    prefixCls?: string;
    overlayClassName?: string;
    style?: React.CSSProperties;
    overlayStyle?: React.CSSProperties;
    placement?: TooltipPlacement;
    builtinPlacements?: Object;
    visible?: boolean;
    onVisibleChange?: (visible: boolean) => void;
    mouseEnterDelay?: number;
    mouseLeaveDelay?: number;
    transitionName?: string;
    trigger?: "hover" | "focus" | "click";
    openClassName?: string;
    arrowPointAtCenter?: boolean;
    autoAdjustOverflow?: boolean | AdjustOverflow;
    // getTooltipContainer had been rename to getPopupContainer
    getTooltipContainer?: (triggerNode: Element) => HTMLElement;
    getPopupContainer?: (triggerNode: Element) => HTMLElement;
    children?: React.ReactNode;
}

export interface TooltipProps extends AbstractTooltipProps {
    title?: React.ReactNode;
    overlay?: React.ReactNode;
}

const splitObject = (obj, keys) => {
    const picked = {};
    const omited = { ...obj };
    keys.forEach(key => {
        if (obj && key in obj) {
            picked[key] = obj[key];
            delete omited[key];
        }
    });
    return { picked, omited };
};

export default class Tooltip extends React.Component<TooltipProps, any> {
    static defaultProps = {
        prefixCls: "spt-tooltip",
        placement: "top",
        transitionName: "zoom-big-fast", // TODO modify
        mouseEnterDelay: 0.1,
        mouseLeaveDelay: 0.1,
        arrowPointAtCenter: false,
        autoAdjustOverflow: true
    };

    refs: {
        tooltip: any;
    };

    constructor(props: TooltipProps) {
        super(props);

        this.state = {
            visible: !!props.visible
        };
    }

    componentWillReceiveProps(nextProps: TooltipProps) {
        if ("visible" in nextProps) {
            this.setState({ visible: nextProps.visible });
        }
    }

    onVisibleChange = visible => {
        const { onVisibleChange } = this.props;
        if (!("visible" in this.props)) {
            this.setState({ visible: this.isNoTitle() ? false : visible });
        }
        if (onVisibleChange && !this.isNoTitle()) {
            onVisibleChange(visible);
        }
    };

    getPopupDomNode() {
        return this.refs.tooltip.getPopupDomNode();
    }

    getPlacements() {
        const {
            builtinPlacements,
            arrowPointAtCenter,
            autoAdjustOverflow
        } = this.props;
        return (
            builtinPlacements ||
            getPlacements({
                arrowPointAtCenter,
                verticalArrowShift: 8,
                autoAdjustOverflow
            })
        );
    }

    isHoverTrigger() {
        const { trigger } = this.props;
        if (!trigger || trigger === "hover") {
            return true;
        }
        if (Array.isArray(trigger)) {
            return trigger.indexOf("hover") >= 0;
        }
        return false;
    }

    getDisabledCompatibleChildren(element) {
        if (
            (element.type.__SPT_BUTTON || element.type === "button") &&
            element.props.disabled &&
            this.isHoverTrigger()
        ) {
            const { picked, omited } = splitObject(element.props.style, [
                "position",
                "left",
                "right",
                "top",
                "bottom",
                "float",
                "display",
                "zIndex"
            ]);
            const spanStyle = {
                display: "inline-block", // default inline-block is important
                ...picked,
                cursor: "not-allowed"
            };
            const buttonStyle = {
                ...omited,
                pointerEvents: "none"
            };
            const child = cloneElement(element, {
                style: buttonStyle,
                className: null
            });
            return (
                <span style={spanStyle} className={element.props.className}>
                    {child}
                </span>
            );
        }
        return element;
    }

    isNoTitle() {
        const { title, overlay } = this.props;
        return !title && !overlay; // overlay for old version compatibility
    }

    // 动态设置动画点
    onPopupAlign = (domNode, align) => {
        const placements = this.getPlacements();
        // 当前返回的位置
        const placement = Object.keys(placements).filter(
            key =>
                placements[key].points[0] === align.points[0] &&
                placements[key].points[1] === align.points[1]
        )[0];
        if (!placement) {
            return;
        }
        // 根据当前坐标设置动画点
        const rect = domNode.getBoundingClientRect();
        const transformOrigin = {
            top: "50%",
            left: "50%"
        };
        if (placement.indexOf("top") >= 0 || placement.indexOf("Bottom") >= 0) {
            transformOrigin.top = `${rect.height - align.offset[1]}px`;
        } else if (
            placement.indexOf("Top") >= 0 ||
            placement.indexOf("bottom") >= 0
        ) {
            transformOrigin.top = `${-align.offset[1]}px`;
        }
        if (placement.indexOf("left") >= 0 || placement.indexOf("Right") >= 0) {
            transformOrigin.left = `${rect.width - align.offset[0]}px`;
        } else if (
            placement.indexOf("right") >= 0 ||
            placement.indexOf("Left") >= 0
        ) {
            transformOrigin.left = `${-align.offset[0]}px`;
        }
        domNode.style.transformOrigin = `${transformOrigin.left} ${transformOrigin.top}`;
    };

    render() {
        const { props, state } = this;
        const {
            prefixCls,
            title,
            overlay,
            openClassName,
            getPopupContainer,
            getTooltipContainer
        } = props;
        const children = props.children as React.ReactElement<any>;
        let visible = state.visible;
        // Hide tooltip when there is no title
        if (!("visible" in props) && this.isNoTitle()) {
            visible = false;
        }

        const child = this.getDisabledCompatibleChildren(
            React.isValidElement(children)
                ? children
                : <span>
                      {children}
                  </span>
        );
        const childProps = child.props;
        const childCls = classNames(childProps.className, {
            [openClassName || `${prefixCls}-open`]: true
        });

        return (
            <RcTooltip
                {...this.props}
                getTooltipContainer={getPopupContainer || getTooltipContainer}
                ref="tooltip"
                builtinPlacements={this.getPlacements()}
                overlay={overlay || title}
                visible={visible}
                onVisibleChange={this.onVisibleChange}
                onPopupAlign={this.onPopupAlign}
            >
                {visible ? cloneElement(child, { className: childCls }) : child}
            </RcTooltip>
        );
    }
}
