import { SchemaManager, ISchemaDesign } from '@vs-form/vs-form'
import {testSchemaList} from './schemas/testSchemaList'

const createSchema = (schema: ISchemaDesign) => {
  const schemaManager = new SchemaManager(schema, testSchemaList)
  schemaManager.checkSchema()
  return schemaManager
}

testSchemaList.forEach((s: ISchemaDesign) => {
  it('checks schemas for errors: ' + s.name, () => {
    const schemaManager = createSchema(s)

    if (schemaManager.getAllErrors.length > 0) {
      // tslint:disable-next-line:no-console
      console.log(schemaManager.printErrors())
    }
    expect(schemaManager.getAllErrors.length).toEqual(0)

  })
})
