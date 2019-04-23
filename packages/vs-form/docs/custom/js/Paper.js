import React from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
export default class VsSpeedDial extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const comp = this.props.comp;
        return (React.createElement(Paper, null,
            comp.label &&
                React.createElement(Typography, { variant: "h5", component: "h3" }, comp.label),
            this.props.children));
    }
}
