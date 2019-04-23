
const gridSystem = `import { Component, DataType } from '@vs-form/vs-form';
import { set } from '@vs-form/vs-form';
const applyGridContainerProp = (prop, p) => {
    const p1 = p.schema.components.panel1;
    const p2 = p.schema.components.panel2;
    set(p1, 'gridContainer.' + prop, p.value);
    set(p2, 'gridContainer.' + prop, p.value);
    p.schemaManager.renderComponents([p1, p2]);
};
const styles = {
    root: {
        height: '450px',
        border: '1px dotted black',
    },
    img: {
        margin: 5,
        height: 120,
        witdth: 140,
    },
    text: {
        fontFamily: 'Courier New, Lucida, Console'
    },
    settings: {
        background: 'snow'
    }
};
const schema = {
    name: 'gridSystem',
    label: 'Grid System',
    onCreated(p) {
        p.schema.onChange({ ...p, component: p.schema.components.root, value: '' });
    },
    onChange(p) {
        const textContainer = p.schema.components.textContainer;
        const textChild = p.schema.components.textChild;
        const pn = p.schema.components.panel1;
        const child = p.schema.components.media1;
        if (pn.gridContainer) {
            const { container, ...options } = pn.gridContainer;
            textContainer.text = 'gridContainer = ' + JSON.stringify(options, null, 2);
        }
        if (child.gridItem) {
            const { item, ...options } = child.gridItem;
            textChild.text = 'gridItem = ' + JSON.stringify(options, null, 2);
        }
        p.schemaManager.renderComponents([textContainer, textChild]);
    },
    styles,
    components: {
        root: {
            type: Component.panel,
            children: ['textContainer', 'textChild', 'cardoptionsContainer', 'cardoptionsItems', 'panel1', 'panel2'],
        },
        textContainer: {
            type: Component.text,
            text: '',
            props: {
                className: 'text'
            },
        },
        textChild: {
            type: Component.text,
            text: '',
            props: {
                className: 'text'
            },
        },
        cardoptionsContainer: {
            type: Component.card,
            children: ['radiospacing', 'radiodirection', 'radiojustify', 'radioalignItems', 'radioalignContent'],
            label: 'Container Options',
            props: {
                className: 'settings',
                elevation: 1
            }
        },
        cardoptionsItems: {
            type: Component.card,
            children: ['itemsWidth'],
            label: 'Item Options',
            props: {
                className: 'settings',
                elevation: 1
            }
        },
        radiospacing: {
            type: Component.radiogroup,
            data: {
                field: 'spacing',
                dataType: DataType.number,
                items: [{ value: 0, text: '0' }, { value: 8, text: '8' }, { value: 16, text: '16' },
                    { value: 24, text: '24' }, { value: 32, text: '32' }, { value: 40, text: '40' },],
                default: 8,
                onChange(p) {
                    applyGridContainerProp('spacing', p);
                }
            },
            props: {
                row: true
            },
            label: 'spacing',
        },
        radiodirection: {
            type: Component.radiogroup,
            data: {
                field: 'direction',
                dataType: DataType.string,
                items: [{ value: 'row', text: 'row' }, { value: 'column', text: 'column' }, { value: 'row-reverse', text: 'row-reverse' }, { value: 'column-reverse', text: 'column-reverse' }],
                default: 'row',
                onChange(p) {
                    applyGridContainerProp('direction', p);
                }
            },
            props: {
                row: true
            },
            label: 'direction',
        },
        radiojustify: {
            type: Component.radiogroup,
            data: {
                field: 'justify',
                dataType: DataType.string,
                items: [{ value: 'flex-start', text: 'flex-start' }, { value: 'center', text: 'center' }, { value: 'flex-end', text: 'flex-end' },
                    { value: 'space-between', text: 'space-between' }, { value: 'space-around', text: 'space-around' }, { value: 'space-evenly', text: 'space-evenly' }],
                default: 'flex-start',
                onChange(p) {
                    applyGridContainerProp('justify', p);
                }
            },
            props: {
                row: true
            },
            label: 'justify',
        },
        radioalignItems: {
            type: Component.radiogroup,
            data: {
                field: 'alignItems',
                dataType: DataType.string,
                items: [{ value: 'flex-start', text: 'flex-start' }, { value: 'center', text: 'center' },
                    { value: 'flex-end', text: 'flex-end' }, { value: 'stretch', text: 'stretch' }, { value: 'baseline', text: 'baseline' },
                ],
                default: 'stretch',
                onChange(p) {
                    applyGridContainerProp('alignItems', p);
                }
            },
            props: {
                row: true
            },
            label: 'align Items',
        },
        radioalignContent: {
            type: Component.radiogroup,
            data: {
                field: 'alignContent',
                dataType: DataType.string,
                items: [{ value: 'flex-start', text: 'flex-start' }, { value: 'center', text: 'center' }, { value: 'flex-end', text: 'flex-end' },
                    { value: 'space-between', text: 'space-between' }, { value: 'space-around', text: 'space-around' }, { value: 'stretch', text: 'stretch' }],
                default: 'stretch',
                onChange(p) {
                    applyGridContainerProp('alignContent', p);
                }
            },
            props: {
                row: true
            },
            label: 'align Content',
        },
        itemsWidth: {
            type: Component.radiogroup,
            data: {
                field: 'itemsWidth',
                dataType: DataType.string,
                items: [{ value: 'false', text: 'false' }, { value: 'true', text: 'true' }, { value: 'auto', text: 'auto' }, { value: '1', text: '1' }, { value: '2', text: '2' }, { value: '3', text: '3' },
                    { value: '4', text: '4' }, { value: '5', text: '5' }, { value: '6', text: '6' }, { value: '7', text: '7' }, { value: '8', text: '8' },
                    { value: '9', text: '9' }, { value: '10', text: '10' }, { value: '11', text: '11' }, { value: '12', text: '12' },
                ],
                default: 'auto',
                onChange(p) {
                    const pn1 = p.schema.components.panel1;
                    const pn2 = p.schema.components.panel2;
                    const c = p.schema.components;
                    const items = [c.media1, c.media2, c.media3, c.input1, c.input2, c.input3];
                    if (p.value === 'false') {
                        items.forEach(i => set(i, 'gridItem.xs', false));
                    }
                    else if (p.value === 'true') {
                        items.forEach(i => set(i, 'gridItem.xs', true));
                    }
                    else if (p.value === 'auto') {
                        items.forEach(i => set(i, 'gridItem.xs', 'auto'));
                    }
                    else {
                        const num = parseInt(p.value, 10);
                        if (num) {
                            items.forEach(i => set(i, 'gridItem.xs', num));
                        }
                    }
                    p.schemaManager.renderComponents([pn1, pn2]);
                }
            },
            props: {
                row: true
            },
            label: 'Items width',
        },
        panel1: {
            type: Component.panel,
            children: ['media1', 'media2', 'media3'],
            props: {
                className: 'root'
            },
        },
        media1: {
            type: Component.mediastatic,
            props: {
                image: 'https://images.pexels.com/photos/312826/pexels-photo-312826.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                className: 'img',
            },
            gridItem: {
                xs: 'auto'
            },
        },
        media2: {
            type: Component.mediastatic,
            props: {
                image: 'https://images.pexels.com/photos/6886/dog-puppy-tumblr-puppylove.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                className: 'img',
            },
            gridItem: {
                xs: 'auto'
            },
        },
        media3: {
            type: Component.mediastatic,
            props: {
                image: 'https://images.pexels.com/photos/36355/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
                className: 'img',
            },
            gridItem: {
                xs: 'auto'
            },
        },
        panel2: {
            type: Component.panel,
            children: ['input1', 'input2', 'input3'],
            props: {
                className: 'root'
            },
        },
        input1: {
            type: Component.textinput,
            data: {
                field: 'input1',
                dataType: DataType.string,
            },
            gridItem: {
                xs: 'auto'
            },
            label: 'Text 1',
        },
        input2: {
            type: Component.textinput,
            data: {
                field: 'input2',
                dataType: DataType.string,
            },
            gridItem: {
                xs: 'auto'
            },
            label: 'Text 2',
        },
        input3: {
            type: Component.textinput,
            data: {
                field: 'input3',
                dataType: DataType.string,
            },
            gridItem: {
                xs: 'auto'
            },
            label: 'Text 3',
        },
    }
};
export default schema;
`

export default gridSystem