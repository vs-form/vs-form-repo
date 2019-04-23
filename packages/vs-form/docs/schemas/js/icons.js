// import { ISchemaDesign, Component, DataType, ButtonAction } from '@vs-form/vs-form'
import { Component, DataType } from '@vs-form/vs-form';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
const schema = {
    components: {
        root: {
            type: Component.form,
            children: ['text1', 'icon1', 'divider1', 'text2', 'icon2', 'divider2', 'text3', 'iconComp', 'divider3', 'btn1', 'btn2', 'divider4', 'text4', 'icoBtn1', 'text5', 'icoBtn2', 'divider5', 'input1', 'input2'],
        },
        text1: {
            type: Component.text,
            text: 'Font Icon:',
            gridItem: {
                md: 2
            },
        },
        icon1: {
            type: Component.icon,
            icon: 'beer',
            gridItem: {
                md: 1
            },
        },
        divider1: {
            type: Component.divider
        },
        text2: {
            type: Component.text,
            text: 'SVG Icon:',
            gridItem: {
                md: 2
            },
        },
        icon2: {
            type: Component.icon,
            svg: 'M21,16V14L13,9V3.5A1.5,1.5 0 0,0 11.5,2A1.5,1.5 0 0,0 10,3.5V9L2,14V16L10,13.5V19L8,20.5V22L11.5,21L15,22V20.5L13,19V13.5L21,16Z',
            gridItem: {
                md: 1
            },
        },
        divider2: {
            type: Component.divider
        },
        text3: {
            type: Component.text,
            text: 'Icon Component:',
            gridItem: {
                md: 2
            },
        },
        iconComp: {
            type: Component.icon,
            tooltip: 'Icon with imported Component',
            component: AccessAlarmIcon,
            gridItem: { md: 1 },
        },
        divider3: {
            type: Component.divider
        },
        btn1: {
            type: Component.button,
            label: 'icon',
            icon: 'beer',
            gridItem: {
                md: 4
            },
        },
        btn2: {
            type: Component.button,
            label: 'icon right',
            icon: 'settings',
            iconRight: true,
            gridItem: {
                md: 4
            },
        },
        divider4: {
            type: Component.divider
        },
        text4: {
            type: Component.text,
            text: 'Icon-Button',
            gridItem: {
                md: 2
            },
        },
        icoBtn1: {
            type: Component.iconbutton,
            icon: 'beer',
            gridItem: { md: 2 },
        },
        text5: {
            type: Component.text,
            text: 'SVG Icon-Button',
            gridItem: {
                md: 4
            },
        },
        icoBtn2: {
            type: Component.iconbutton,
            icon: ['icon2'],
            gridItem: { md: 1 },
        },
        divider5: {
            type: Component.divider
        },
        input1: {
            type: Component.textinput,
            hint: 'with icon prefix',
            prefix: ['icon2'],
            data: {
                field: 'prefixIcon',
                dataType: DataType.string
            },
            gridItem: { md: 4 },
            label: 'Text'
        },
        input2: {
            type: Component.textinput,
            hint: 'with icon suffix',
            suffix: ['icon2'],
            data: {
                field: 'suffixIcon',
                dataType: DataType.string
            },
            gridItem: { md: 4 },
            label: 'Text2'
        },
    }
};
export default schema;
