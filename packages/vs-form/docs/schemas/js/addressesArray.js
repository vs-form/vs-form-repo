import { Component, DataType } from '@vs-form/vs-form';
const schema = {
    components: {
        root: {
            type: Component.form,
            children: ['addresses'],
        },
        addresses: {
            type: Component.subschema,
            label: 'Addresses',
            schemaName: 'address',
            data: {
                field: 'addresses',
                dataType: DataType.array,
            },
            columnSettings: [
                {
                    compId: 'name',
                    width: 200
                },
                {
                    compId: 'address',
                    autowidth: true
                },
            ]
        },
    }
};
export default schema;
