// execute with ts-node src/playground/writeschema.ts
import { validSchemaComponents, validSchemaSchema } from '../validSchema'
import * as fs from 'fs'

fs.writeFile('D:/dev/App/vs-form/src/schemaManager/playground/validschma.json', JSON.stringify(validSchemaComponents, null, 2), err => {
  if (err) { throw err }
})

fs.writeFile('D:/dev/App/vs-form/src/schemaManager/playground/validschma-schema.json', JSON.stringify(validSchemaSchema, null, 2), err => {
  if (err) { throw err }
})
