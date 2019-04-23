import * as React from 'react';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import { IconSVG } from '@vs-form/vs-general';
const icon = 'M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z';
export const styles = {
    actionIcon: {
        fontSize: '1.5em'
    }
};
export default class VsSpeedDial extends React.Component {
    constructor(props) {
        super(props);
        this.getActions = () => {
            const comp = this.props.comp;
            const actions = comp.actions;
            const params = this.props.schemaManager.getComponentEventParams(comp);
            return actions.map((item) => {
                return (React.createElement(SpeedDialAction, { key: item.id || item.icon, icon: React.createElement(IconSVG, { svg: item.icon }), tooltipTitle: item.tooltip, onClick: this.handleActionClick(item, params) }));
            });
        };
        this.handleClick = () => {
            this.setState({ open: !this.state.open });
        };
        this.handleActionClick = (item, params) => () => {
            if (item.onClick) {
                item.onClick(params);
            }
            this.setState({ open: false });
        };
        this.state = {
            open: false
        };
    }
    render() {
        const comp = this.props.comp;
        return (React.createElement(SpeedDial, Object.assign({}, comp.props, { icon: React.createElement(IconSVG, { svg: icon }), direction: comp.direction || 'left', ariaLabel: comp.id, open: this.state.open, onClick: this.handleClick }), this.getActions()));
    }
}
