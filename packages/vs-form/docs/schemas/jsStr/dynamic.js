
const dynamic = `import { Component, DataType } from '@vs-form/vs-form';
const schema = {
    components: {
        root: {
            type: Component.expansionpanel,
            label: 'Change props dynamically',
            children: ['textChange1', 'textChange2', 'divider1', 'staticText1', 'staticText2', 'buttonChangeProp1', 'buttonChangeProp2', 'divider2', 'clbShowHide', 'panelShowHide'],
            expanded: true
        },
        textChange1: {
            type: Component.textinput,
            data: {
                field: 'textChange1',
                dataType: DataType.string,
                onChange(p) {
                    const comp = p.schema.components.textChange2;
                    p.schemaManager.updateValue('textChange2', p.value);
                    p.schemaManager.renderComponents([comp]);
                },
            },
            gridItem: { md: 6 },
            label: 'Text1',
            hint: 'Text2 changes if this text changes'
        },
        textChange2: {
            type: Component.textinput,
            data: {
                field: 'textChange2',
                dataType: DataType.string,
            },
            gridItem: { md: 6 },
            label: 'Text2',
        },
        divider1: {
            type: Component.divider
        },
        staticText1: {
            type: Component.text,
            text: 'static Text',
            props: {
                color: 'textPrimary'
            },
            gridItem: { md: 3 },
        },
        staticText2: {
            type: Component.text,
            text: 'static Text2',
            gridItem: { md: 3 },
            props: {}
        },
        buttonChangeProp1: {
            type: Component.button,
            label: 'Change Text color',
            gridItem: { md: 3 },
            onClick(p) {
                const comp1 = p.schema.components.staticText1;
                const comp2 = p.schema.components.staticText2;
                comp1.props.variant = 'body2';
                comp2.props.variant = 'body2';
                comp1.props.color = 'error';
                comp2.props.color = 'error';
                p.schemaManager.renderComponents([comp1, comp2]);
            }
        },
        buttonChangeProp2: {
            type: Component.button,
            label: 'Change Text size',
            gridItem: { md: 3 },
            onClick(p) {
                const comp1 = p.schema.components.staticText1;
                const comp2 = p.schema.components.staticText2;
                comp1.props.variant = 'h4';
                comp2.props.variant = 'h4';
                comp1.props.color = 'default';
                comp2.props.color = 'default';
                p.schemaManager.renderComponents([comp1, comp2]);
            }
        },
        divider2: {
            type: Component.divider
        },
        clbShowHide: {
            type: Component.checklistbox,
            gridItem: { md: 4 },
            data: {
                field: 'clbShowHide',
                dataType: DataType.arrayString,
                items: [{ value: 'inputShowHide', text: 'show Input' }, { value: 'buttonShowHide', text: 'show Button' }, { value: 'textShowHide', text: 'show Text' }],
                onChange(p) {
                    [p.schema.components.inputShowHide, p.schema.components.buttonShowHide, p.schema.components.textShowHide].forEach(cmp => cmp.hidden = true);
                    const cs = p.value.map((v) => p.schema.components[v]);
                    cs.forEach(cmp => cmp.hidden = false);
                    p.schemaManager.renderComponent(p.schema.components.panelShowHide);
                }
            },
            label: 'Show / Hide elements',
        },
        panelShowHide: {
            type: Component.panel,
            gridItem: { md: 8 },
            children: ['inputShowHide', 'buttonShowHide', 'textShowHide']
        },
        inputShowHide: {
            type: Component.textinput,
            data: {
                field: 'inputShowHide',
                dataType: DataType.string
            },
            hidden: true,
            label: 'Input'
        },
        buttonShowHide: {
            type: Component.button,
            hidden: true,
            label: 'Button'
        },
        textShowHide: {
            type: Component.text,
            hidden: true,
            text: 'Some text'
        },
    }
};
export default schema;
`

export default dynamic