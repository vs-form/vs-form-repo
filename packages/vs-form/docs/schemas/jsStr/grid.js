
const grid = `import { Component, DataType } from '@vs-form/vs-form';
const styles = {
    spacing: {
        paddingTop: '1px',
        paddingBottom: '1px',
    }
};
const schema = {
    name: 'columns',
    components: {
        root: {
            type: Component.panel,
            children: ['card'],
        },
        card: {
            type: Component.card,
            children: ['card1', 'card2', 'card3'],
        },
        card1: {
            type: Component.card,
            children: ['checkRows', 'textarea', 'text2', 'text3'],
            gridItem: {
                md: 6
            },
            gridContainer: {
                spacing: 24
            },
        },
        checkRows: {
            type: Component.checkbox,
            data: {
                field: 'checkRows',
                dataType: DataType.boolean,
            },
            label: 'columns',
        },
        textarea: {
            type: Component.textinput,
            data: {
                field: 'textarea',
                dataType: DataType.string
            },
            props: {
                multiline: true,
                rows: 10,
                variant: 'outlined'
            },
            label: 'textarea',
            gridItem: { md: 6 }
        },
        text2: {
            type: Component.textinput,
            data: {
                field: 'text2',
                dataType: DataType.string
            },
            label: 'text2',
            gridItem: {
                xl: 3
            },
        },
        text3: {
            type: Component.textinput,
            data: {
                field: 'text3',
                dataType: DataType.string
            },
            label: 'text3',
            gridItem: {
                xl: 3
            },
        },
        card2: {
            type: Component.card,
            children: ['text4', 'check10', 'check11'],
            gridItem: {
                md: 3
            },
        },
        text4: {
            type: Component.textinput,
            data: {
                field: 'text4',
                dataType: DataType.string
            },
            label: 'text4',
        },
        check10: {
            type: Component.checkbox,
            label: 'Checkbox 10',
            data: {
                field: 'check10',
                dataType: DataType.boolean
            },
            props: {
                style: styles.spacing,
            },
            gridItem: {
                style: styles.spacing
            },
        },
        check11: {
            type: Component.checkbox,
            label: 'Checkbox 10',
            data: {
                field: 'check11',
                dataType: DataType.boolean
            },
            props: {
                style: styles.spacing,
            },
            gridItem: {
                style: styles.spacing,
            },
        },
        card3: {
            type: Component.card,
            children: ['text400', 'check100', 'check110'],
            gridItem: {
                md: 3
            },
        },
        text400: {
            type: Component.textinput,
            data: {
                field: 'text400',
                dataType: DataType.string
            },
            label: 'text400',
        },
        check100: {
            type: Component.checkbox,
            label: 'Checkbox 10',
            data: {
                field: 'check100',
                dataType: DataType.boolean
            },
        },
        check110: {
            type: Component.checkbox,
            label: 'Checkbox 10',
            data: {
                field: 'check110',
                dataType: DataType.boolean
            },
        },
    }
};
export default schema;
`

export default grid