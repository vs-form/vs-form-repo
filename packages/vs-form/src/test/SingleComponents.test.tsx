import * as React from 'react'
import { cloneDeep } from '../schemaManager/lodash'
import { enums, SchemaManager, ISchemaDesign, VsForm, Component, getRegisteredComponent, IComponent } from '../index'
import { mount, shallow, ReactWrapper } from 'enzyme'
import { schema, componentList, IRenderedComp, textOnly, tab } from './singleComponents'
// import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
// import Element from '../baseComponents/Element'

import { JssProvider } from 'react-jss';

const generateClassName = (rule: any, styleSheet: any) =>
  `${styleSheet.options.classNamePrefix}-${rule.key}`;

// const theme = createMuiTheme({
//   typography: {
//     useNextVariants: true,
//   },
// })

// reduce size of snapshot file
const delProps = (wrapper: ReactWrapper) => {
  wrapper.findWhere((n) => n.length > 0 && n.prop('node') !== '____').forEach((child) => {
    delete child.props().schema
    delete child.props().schemaManager
    delete child.props().comp
    delete child.props().classes
    delete child.props().inputRef
    delete child.props().className
    delete child.props().IconProps
    delete child.props().focusVisibleClassName
    delete child.props().control
    delete child.props().checkedIcon
    delete child.props().icon
  })

}

const createSchema = (schema: ISchemaDesign) => {
  const schemaManager = new SchemaManager(schema)
  schemaManager.checkSchema()
  return schemaManager
}

describe('Test Rendering single Components', () => {
  beforeAll(async () => {
    // register Components
    Object.keys(enums.Component).forEach(async (c) => {
      await getRegisteredComponent(enums.Component[c])
    })

  })

  componentList.forEach(async (rc: IRenderedComp) => {
    const testSchema = cloneDeep(schema)
    testSchema.components.test = rc.comp
    testSchema.components.root['children'] = ['test']
    if (rc.comp['children']) {
      testSchema.components.test1 = textOnly.comp
      rc.comp['children'] = ['test1']
    }
    if (rc.comp.type === Component.tabs) {
      testSchema.components.test1 = tab.comp
      rc.comp['tabs'] = ['test1']
      testSchema.components.test2 = textOnly.comp
      testSchema.components.test1['children'] = ['test2']
    }
    const schemaManager = createSchema(testSchema)

    it(`schema with "${rc.comp.type}" has no errors`, () => {
      if (schemaManager.getAllErrors.length > 0) {
        console.log(schemaManager.printErrors())
      }
      expect(schemaManager.getAllErrors.length).toEqual(0)
    })

    let wrapper: any
    it(`"${rc.comp.type}" mounts without crashing and matches snapshot `, async () => {
      wrapper = await mount(
        <JssProvider generateClassName={generateClassName}>
          <VsForm schemaManager={schemaManager} />
        </JssProvider>
      )
      delProps(wrapper)
      expect(wrapper).toMatchSnapshot()
    })

    rc.renderedNodes.forEach((node: string) => {
      it(`"${rc.comp.type}" : node "${node}" has been rendered `, () => {
        const n = wrapper.find(node)
        expect(n.exists()).toBe(true)
      })
    })

  })
})
