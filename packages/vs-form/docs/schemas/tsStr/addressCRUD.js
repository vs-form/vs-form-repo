
const addressCRUD = `import { ISchemaDesign, Component, DataType } from '@vs-form/vs-form'

export const adressRecords = [
  { id: 1, type: 1, name: 'Leanne Graham', gender: 2, birthdate: '1975-04-12T00:00:00.000Z', address: 'Kulas Light', country: 'Argentina' },
  { id: 2, type: 2, name: 'Romaguera-Crona', gender: 1, birthdate: '1971-04-12T00:00:00.000Z', address: 'Victor Plains', country: 'China' },
  { id: 3, type: 3, name: 'Ervin Howell', gender: 1, birthdate: '1965-03-11T00:00:00.000Z', address: 'Victor Plains', country: 'Canada' },
  { id: 4, type: 1, name: 'Deckow-Crist', gender: 1, birthdate: '1945-04-12T00:00:00.000Z', address: 'Douglas Extension', country: 'Austria' },
  { id: 5, type: 2, name: 'Clementine Bauch', gender: 2, birthdate: '1972-04-12T00:00:00.000Z', address: 'Hoeger Mall', country: 'Bahrain' },
  { id: 6, type: 1, name: 'Romaguera-Jacobson', gender: 1, birthdate: '1942-04-12T00:00:00.000Z', address: 'Douglas Extension', country: 'Monaco' },
  { id: 7, type: 3, name: 'Patricia Lebsack', gender: 2, birthdate: '1918-04-12T00:00:00.000Z', address: 'Skiles Walks', country: 'Switzerland' },
  { id: 8, type: 1, name: 'Robel-Corkery', gender: 1, birthdate: '1925-04-12T00:00:00.000Z', address: 'Norberto Crossing', country: 'Germany' },
]

const schema = (onOk: any, onCancel: any): ISchemaDesign => ({
  hideValidationErrorPanel: true,
  disabled: true,
  components: {
    root: {
      type: Component.form,
      children: ['address', 'btnOk', 'btnCancel'],
    },
    address: {
      type: Component.subschema,
      schemaName: 'address',
      data: {
        field: 'address',
        dataType: DataType.object
      },
    },

    btnOk: {
      type: Component.button,
      label: 'OK',
      tooltip: 'Click to save',
      onClick(p) {
        if (p.schemaManager.validateValuesSchema()) {
          onOk(p.schema.values)
        } else {
          p.schemaManager.render()
        }
      },
      gridItem: {
        md: 3
      },
    },
    btnCancel: {
      type: Component.button,
      label: 'Cancel',
      onClick() {
        onCancel()
      },
      gridItem: {
        md: 4
      },
    },
  }
})

export default schema
`

export default addressCRUD