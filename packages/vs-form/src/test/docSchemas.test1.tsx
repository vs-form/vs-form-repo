import { SchemaManager, ISchemaDesign } from '../index'
import * as schemasTs from '../../doc/schemas/ts'

const createSchema = (schema: ISchemaDesign) => {
  const schemaManager = new SchemaManager(schema)
  schemaManager.checkSchema()
  return schemaManager
}

Object.keys(schemasTs).map((s) => schemasTs[s]).forEach((s: ISchemaDesign) => {

  it('checks doc Typescriptschemas for errors: ' + s.name, () => {
    const schemaManager = createSchema(s)

    if (schemaManager.getAllErrors.length > 0) {
      // tslint:disable-next-line:no-console
      console.log(schemaManager.printErrors())
    }
    expect(schemaManager.getAllErrors.length).toEqual(0)

  })
})
