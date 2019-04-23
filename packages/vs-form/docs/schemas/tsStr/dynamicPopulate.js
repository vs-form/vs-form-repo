
const dynamicPopulate = `import { ISchemaDesign, Component, DataType, types } from '@vs-form/vs-form'

const initList = [
  'One',
  'Two',
  'Three',
  'Four',
]

const countriesList = [
  'Albania',
  'Argentina',
  'Armenia',
  'Austria',
  'Bahamas',
  'Bahrain',
  'Cambodia',
  'Cameroon',
  'Canada',
  'China',
  'Costa Rica',
]

export const animalsList =
  [
    'albatross',
    'alligator',
    'ant',
    'antelope',
    'ape',
    'armadillo',
  ]

const updateItems = (s: ISchemaDesign, list: string[]) => {
  const listInt = list.map((c, ind) => ({ value: ind + 1, text: c }))
  const listStr = list.map(c => ({ value: c, text: c }))
  s.components.select1['data']['items'] = listStr
  s.components.select2['data']['items'] = listInt
  s.components.radio1['data']['items'] = listInt
  s.components.radio2['data']['items'] = listStr
  s.components.checklistbox1['data']['items'] = listStr
  s.components.checklistbox2['data']['items'] = listInt
}

const schema = (init: string[], countries: string[], animals: string[]): ISchemaDesign => ({
  onCreated(p) {
    updateItems(p.schema, init)
  },
  components: {
    root: {
      type: Component.panel,
      children: ['button1', 'button2', 'button3', 'select1', 'select2', 'radio1', 'radio2', 'checklistbox1', 'checklistbox2'],
    },
    button1: {
      type: Component.button,
      label: 'Populate Items with Countries',
      onClick: (p: types.ISchemaEventParams) => {
        updateItems(p.schemaManager.schema, countries)
        p.schemaManager.render()
      }
    },
    button2: {
      type: Component.button,
      label: 'Populate Items with Animals',
      onClick: (p: types.ISchemaEventParams) => {
        updateItems(p.schemaManager.schema, animals)
        p.schemaManager.render()
      }
    },
    button3: {
      type: Component.button,
      label: 'Clear Lookup-Items',
      onClick: (p: types.ISchemaEventParams) => {
        updateItems(p.schemaManager.schema, [])
        p.schemaManager.render()
      }
    },
    select1: {
      type: Component.select,
      data: {
        field: 'select_1',
        dataType: DataType.string,
        items: [],
      },
      label: 'Select1'
    },
    select2: {
      type: Component.select,
      data: {
        field: 'select_2',
        dataType: DataType.number,
        items: [],
      },
      label: 'Select2'
    },
    radio1: {
      type: Component.radiogroup,
      data: {
        field: 'radio_1',
        dataType: DataType.number,
        items: [],
      },
      label: 'radio1',
    },
    radio2: {
      type: Component.radiogroup,
      data: {
        field: 'radio_2',
        dataType: DataType.string,
        items: []
      },
      label: 'radio2',
    },
    checklistbox1: {
      type: Component.checklistbox,
      data: {
        field: 'clb1',
        dataType: DataType.arrayString,
        items: [],
      },
      label: 'Checklistbox',
      actionIcon: 'account',
    },
    checklistbox2: {
      type: Component.checklistbox,
      data: {
        field: 'clb2',
        dataType: DataType.arrayNumber,
        items: [],
      },
      label: 'Checklistbox Integer',
      actionIcon: 'account'
    },
  }
})

export default schema(initList, countriesList, animalsList)
`

export default dynamicPopulate