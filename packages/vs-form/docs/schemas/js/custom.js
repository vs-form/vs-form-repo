import { Component, registerCustomComponent, DataType } from '@vs-form/vs-form';
import SpeedDial from '../../custom/js/SpeedDial';
import Paper from '../../custom/js/Paper';
registerCustomComponent('speeddial', SpeedDial);
registerCustomComponent('paper', Paper);
const schema = {
    onActionClick: (num, p) => {
        const txt = p.schema.components.sdtext;
        txt.text = 'Item ' + num + ' clicked';
        p.schemaManager.renderComponent(txt);
    },
    components: {
        root: {
            type: Component.form,
            children: ['sdtext', 'speeddial', 'paper'],
        },
        sdtext: {
            type: Component.text,
            text: 'Speed-Dial Component'
        },
        speeddial: {
            type: Component.custom,
            name: 'speeddial',
            actions: [
                {
                    icon: 'M19,22H5V20H19V22M17.16,8.26C18.22,9.63 18.86,11.28 19,13C19,15.76 15.87,18 12,18C8.13,18 5,15.76 5,13C5,10.62 7.33,6.39 10.46,5.27C10.16,4.91 10,4.46 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.46 13.84,4.91 13.54,5.27C14.4,5.6 15.18,6.1 15.84,6.74L11.29,11.29L12.71,12.71L17.16,8.26Z',
                    tooltip: 'bishop',
                    onClick: (p) => p.schema.onActionClick(1, p)
                },
                {
                    icon: 'M19,22H5V20H19V22M16,18L13.2,7.74C14.72,7.07 15.41,5.31 14.74,3.79C14.08,2.27 12.31,1.58 10.79,2.25C9.27,2.91 8.58,4.68 9.25,6.2C9.55,6.89 10.1,7.44 10.79,7.74L8,18H16Z',
                    tooltip: 'pawn',
                    onClick: (p) => p.schema.onActionClick(2, p)
                },
                {
                    // tslint:disable-next-line:max-line-length
                    icon: 'M18,3A2,2 0 0,1 20,5C20,5.81 19.5,6.5 18.83,6.82L17,13.15V18H7V13.15L5.17,6.82C4.5,6.5 4,5.81 4,5A2,2 0 0,1 6,3A2,2 0 0,1 8,5C8,5.5 7.82,5.95 7.5,6.3L10.3,9.35L10.83,5.62C10.33,5.26 10,4.67 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.67 13.67,5.26 13.17,5.62L13.7,9.35L16.47,6.29C16.18,5.94 16,5.5 16,5A2,2 0 0,1 18,3M5,20H19V22H5V20Z',
                    tooltip: 'queen',
                    onClick: (p) => p.schema.onActionClick(3, p)
                },
            ]
        },
        paper: {
            type: Component.custom,
            name: 'paper',
            label: 'Paper',
            children: ['papertext', 'type']
        },
        papertext: {
            type: Component.text,
            text: 'Component in paper'
        },
        type: {
            type: Component.radiogroup,
            data: {
                field: 'type',
                dataType: DataType.string,
                items: ['A', 'B', 'C'],
            },
            props: {
                row: true
            },
            label: 'Type'
        },
    }
};
export default schema;
