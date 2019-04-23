import { ISchemaDesign, Component, DataType, types } from '@vs-form/vs-form'

const addressUser = [
  { id: 1, type: 1, name: 'Leanne Graham', gender: 2, birthdate: '1975-04-12T00:00:00.000Z', address: 'Kulas Light', country: 'Argentina', photo: '', notes: '...' },
  { id: 2, type: 2, name: 'Romaguera-Crona', gender: 1, birthdate: '1971-04-12T00:00:00.000Z', address: 'Victor Plains', country: 'China', photo: '', notes: '...' },
  { id: 3, type: 3, name: 'Ervin Howell', gender: 1, birthdate: '1965-03-11T00:00:00.000Z', address: 'Victor Plains', country: 'Canada', photo: '', notes: '...' },
  { id: 4, type: 1, name: 'Deckow-Crist', gender: 1, birthdate: '1945-04-12T00:00:00.000Z', address: 'Douglas Extension', country: 'Austria', photo: '', notes: '...' },
  { id: 5, type: 2, name: 'Clementine Bauch', gender: 2, birthdate: '1972-04-12T00:00:00.000Z', address: 'Hoeger Mall', country: 'Bahrain', photo: '', notes: '...' },
  { id: 6, type: 1, name: 'Romaguera-Jacobson', gender: 1, birthdate: '1942-04-12T00:00:00.000Z', address: 'Douglas Extension', country: 'Monaco', photo: '', notes: '...' },
  { id: 7, type: 3, name: 'Patricia Lebsack', gender: 2, birthdate: '1918-04-12T00:00:00.000Z', address: 'Skiles Walks', country: 'Switzerland', photo: '', notes: '...' },
  { id: 8, type: 1, name: 'Robel-Corkery', gender: 1, birthdate: '1925-04-12T00:00:00.000Z', address: 'Norberto Crossing', country: 'Germany', photo: '', notes: '...' },
  { id: 9, type: 1, name: 'Leanne Graham', gender: 2, birthdate: '1975-04-12T00:00:00.000Z', address: 'Kulas Light', country: 'Argentina', photo: '', notes: '...' },
  { id: 10, type: 2, name: 'Romaguera-Crona', gender: 1, birthdate: '1971-04-12T00:00:00.000Z', address: 'Victor Plains', country: 'China', photo: '', notes: '...' },
  { id: 11, type: 3, name: 'Ervin Howell', gender: 1, birthdate: '1965-03-11T00:00:00.000Z', address: 'Victor Plains', country: 'Canada', photo: '', notes: '...' },
  { id: 12, type: 1, name: 'Deckow-Crist', gender: 1, birthdate: '1945-04-12T00:00:00.000Z', address: 'Douglas Extension', country: 'Austria', photo: '', notes: '...' },
  { id: 13, type: 2, name: 'Clementine Bauch', gender: 2, birthdate: '1972-04-12T00:00:00.000Z', address: 'Hoeger Mall', country: 'Bahrain', photo: '', notes: '...' },
  { id: 14, type: 1, name: 'Romaguera-Jacobson', gender: 1, birthdate: '1942-04-12T00:00:00.000Z', address: 'Douglas Extension', country: 'Monaco', photo: '', notes: '...' },
  { id: 15, type: 3, name: 'Patricia Lebsack', gender: 2, birthdate: '1918-04-12T00:00:00.000Z', address: 'Skiles Walks', country: 'Switzerland', photo: '', notes: '...' },
  { id: 16, type: 1, name: 'Robel-Corkery', gender: 1, birthdate: '1925-04-12T00:00:00.000Z', address: 'Norberto Crossing', country: 'Germany', photo: '', notes: '...' },
]

const schema: ISchemaDesign = {
  name: 'subArray',
  label: 'Subschema Array',
  onCreated(p) {
    addressUser.forEach((a: any) => {
      const dt = new Date(a.birthdate)
      a.birthdate = dt
    })
    p.schema.values.addressUser = addressUser
  },
  values: {
  },
  components: {
    root: {
      type: Component.panel,
      children: ['cardSettings', 'tabs'],
    },
    cardSettings: {
      type: Component.card,
      label: 'Settings',
      children: ['rowsPerPage', 'hidePagination', 'btnApply'],
    },
    rowsPerPage: {
      type: Component.integer,
      data: {
        field: 'rowsPerPage',
        dataType: DataType.integer,
        default: 5
      },
      gridItem: {
        md: 3
      },
      label: 'Rows per Page'
    },
    hidePagination: {
      type: Component.switch,
      data: {
        field: 'hidePagination',
        dataType: DataType.boolean,
      },
      gridItem: {
        md: 2
      },
      label: 'Hide Pagination',
    },
    btnApply: {
      type: Component.button,
      label: 'Apply',
      gridItem: {
        md: 2
      },
      onClick(p) {
        const comp1 = p.schema.components.address1 as types.IComponentSubschema
        const comp2 = p.schema.components.address2 as types.IComponentSubschema
        comp1.hidePagination = p.schema.values.hidePagination
        comp2.hidePagination = p.schema.values.hidePagination
        comp1.rowsPerPage = p.schema.values.rowsPerPage
        comp2.rowsPerPage = p.schema.values.rowsPerPage
        p.schemaManager.render()
      }
    },
    tabs: {
      type: Component.tabs,
      tabs: ['tab1', 'tab2']
    },
    tab1: {
      type: Component.tab,
      label: 'Array',
      children: ['address1']
    },
    tab2: {
      type: Component.tab,
      label: 'prefilled data',
      children: ['address2']
    },
    address1: {
      type: Component.subschema,
      data: {
        field: 'addressCustomer',
        dataType: DataType.array
      },
      schemaName: 'address',
      label: 'customer addresses'
    },
    address2: {
      type: Component.subschema,
      data: {
        field: 'addressUser',
        dataType: DataType.array
      },
      keyField: 'id',
      schemaName: 'address',
      label: 'User addresses'
    },
  }
}

export default schema
