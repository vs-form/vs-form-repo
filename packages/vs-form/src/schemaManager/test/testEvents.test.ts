import { schemaCheckEvents } from '../test-schemas/schemaCheckEvents'
import { SchemaManager } from '../../index'

describe('Check data onChange Events', () => {
  let sm: SchemaManager
  beforeAll(() => {
    sm = new SchemaManager(schemaCheckEvents)
  })
  it('schema has no errors', () => {
    sm.checkSchema()
    expect(sm.getAllErrors.length).toEqual(0)
  })
  it('text1 onChange changes variable', () => {
    expect(sm.schema.numtext1Changes).toEqual(0)
    sm.updateValue('text1', 'some')
    expect(sm.schema.numtext1Changes).toEqual(1)
  })
  it('schema onChange changes variable', () => {
    expect(sm.schema.numSchemaChanges).toEqual(1)
  })
  it('text2 has not onChange', () => {
    sm.updateValue('text2', 'some2')
    expect(sm.schema.numtext1Changes).toEqual(1)
    expect(sm.schema.numSchemaChanges).toEqual(2)
  })

  it('text3 onBeforeChange changes entered value if name appears', () => {
    sm.updateValue('text3', 'Fritz')
    expect(sm.getValue('text3')).toEqual('Hello Fritz')
    expect(sm.schema.numtext1Changes).toEqual(1)
    expect(sm.schema.numSchemaChanges).toEqual(3)
  })

  it('text3 onBeforeChange not changes entered value if condition not met', () => {
    sm.updateValue('text3', 'Herby')
    expect(sm.getValue('text3')).toEqual('Herby')
    expect(sm.schema.numtext1Changes).toEqual(1)
    expect(sm.schema.numSchemaChanges).toEqual(4)
  })

})
