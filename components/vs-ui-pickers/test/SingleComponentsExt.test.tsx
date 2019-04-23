import React from 'react'
import { enums, SchemaManager, ISchemaDesign, VsForm, getRegisteredComponent } from '@vs-form/vs-form'
import { mount, ReactWrapper } from 'enzyme'
import { JssProvider } from 'react-jss'

import { register } from '../src/index'

const generateClassName = (rule: any, styleSheet: any) =>
  `${styleSheet.options.classNamePrefix}-${rule.key}`

// reduce size of snapshot file
const delProps = (wrapper: ReactWrapper) => {
  wrapper.findWhere((n) => n.length > 0 && n.prop('node') !== '____').forEach((child) => {
    delete child.props().schema
    delete child.props().schemaManager
    delete child.props().comp
    delete child.props().classes
    delete child.props().inputRef
  })
}

export const schema: ISchemaDesign = {
  name: 't',
  components: {
    root: {
      type: enums.Component.form,
      children: ['date'],
    },
    date: {
      type: enums.Component.dateext,
      data: {
        field: 'date1',
        dataType: enums.DataType.date,
      },
      label: 'Date1',
    },
  }
}

describe('Test Rendering single Component', () => {
  beforeAll(async () => {
    // register Component
    register()
    await getRegisteredComponent(enums.Component.form)
  })

  const schemaManager = new SchemaManager(schema)
  schemaManager.checkSchema()

  it(`schema has no errors`, () => {
    if (schemaManager.getAllErrors.length > 0) {
      console.log(schemaManager.printErrors())
    }
    expect(schemaManager.getAllErrors.length).toEqual(0)
  })

  let wrapper: ReactWrapper
  it(`mounts without crashing and matches snapshot `, () => {
    wrapper = mount(
      <JssProvider generateClassName={generateClassName}>
        <VsForm schemaManager={schemaManager} />
      </JssProvider>
    )
    delProps(wrapper)
    expect(wrapper).toMatchSnapshot()
  })
  const presentNodes = ['DatePickerModal', 'BasePicker', 'DateTextField', 'TextField', 'input']

  presentNodes.forEach((node: string) => {
    it(`node "${node}" has been rendered `, () => {
      const n = wrapper.find(node)
      expect(n.exists()).toBe(true)
    })
  })

})
