import * as React from 'react';
import { ItemProps } from '@vs-form/vs-form';
export interface IAction {
    id: string;
    icon: string;
    tooltip: string;
    onClick: any;
}
export interface ISpeedDialState {
    open: boolean;
}
export declare const styles: {
    actionIcon: {
        fontSize: string;
    };
};
export default class VsSpeedDial extends React.Component<ItemProps, ISpeedDialState> {
    constructor(props: ItemProps);
    render(): JSX.Element;
    private getActions;
    private handleClick;
    private handleActionClick;
}
