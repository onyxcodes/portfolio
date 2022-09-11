import React from "react";
import './index.scss';

export interface ActionBarItemProps {
    item: JSX.Element,
    position: "left" | "center" | "right"
}

export interface ActionBarProps {
    position: string;
    items: ActionBarItemProps[];
    bgColor?: string;
};

const ActionBar = ( props: ActionBarProps ) => {
    const { position, items, bgColor } = props;
    let barClasses = position ? "actionbar-container".concat(" "+position) : "actionbar-container";
    return (
        <div 
            className={barClasses}
            style={{
                backgroundColor: bgColor
            }}
        >
            <div className="actionbar-left">
                {items?.map((i, index) => {
                    if (i.position == "left" && i.item) return (<div key={index} className="actionbar-item">{i?.item}</div>)
                })}
            </div>
            <div className="actionbar-center">
                {items?.map((i, index) => {
                    if (i.position == "center" && i.item) return (<div key={index} className="actionbar-item">{i?.item}</div>)
                })}
            </div>
            <div className="actionbar-right">
                {items?.map((i, index) => {
                    if (i.position == "right" && i.item) return (<div key={index} className="actionbar-item">{i.item}</div>)
                })}
            </div>
        </div>
    )
}

export default ActionBar;