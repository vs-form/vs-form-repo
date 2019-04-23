import { types } from '@vs-form/vs-form'

import simple from './basic/simple'
import inputs from './basic/inputs'
import columns from './basic/columns'
import numbers from './basic/numbers'
import checkboxes from './basic/checkboxes'
import checklistbox from './basic/checklistbox'
import dates from './basic/dates'
import selects from './basic/selects'
import other from './basic/other'
import buttons from './basic/buttons'
import dynSelects from './basic/dynSelects'
import subschema from './containers/subschema'
import subArray from './containers/subArray'
import focus from './containers/focus'
import subNested from './containers/subschemaNested'
import address from './subschema/address'
import subSimple from './subschema/simple'
import nested from './subschema/nested'
import nested1 from './subschema/nested1'
import nested2 from './subschema/nested2'
import nested3 from './subschema/nested3'
import icons from './subschema/icons'
import tabs from './containers/tabs'
import gridSystem from './interactive/gridSystem'
import styles from './styles/stylesSchema'
import validation from './validation/validation2'
import complex from './validation/complex'

export const testSchemaList: types.ISchemaList = [simple, inputs, columns, numbers, checkboxes, checklistbox, dates, selects, buttons, dynSelects, other, subschema, address, tabs, subSimple, nested, nested1, nested2, nested3, icons, subArray, subNested, gridSystem, styles, validation, complex]

export const schemaListCategories: ISchemaListCategoriesList = [
  { title: 'Basic', list: [simple]  },
  { title: 'Grid System', list: [gridSystem, columns] },
  { title: 'Components', list: [inputs, numbers, checkboxes, checklistbox, dates, selects, buttons, dynSelects, other]  },
  { title: 'Subschemas and Containers', list: [subschema, tabs, subNested, subArray, focus], expanded: true },
  { title: 'Styles', list: [styles] },
  { title: 'Validation', list: [validation, complex] },
]

export interface ISchemaListCategories {
  title: string,
  list: types.ISchemaList,
  expanded?: boolean,
}

export interface ISchemaListCategoriesList extends Array<ISchemaListCategories> { }
