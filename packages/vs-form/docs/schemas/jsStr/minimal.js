
const minimal = `import { Component, DataType } from '@vs-form/vs-form';
const schema = {
    // @ts-ignore
    components: {
        text: {
            type: Component.textinput,
            data: {
                field: 'text',
                dataType: DataType.string,
            },
            label: 'Test',
        }
    }
};
export default schema;
`

export default minimal