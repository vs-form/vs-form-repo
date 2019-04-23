import * as sub from './schemaValidTestSub'
import * as schemas1 from './schemaValidTest'
import * as schemas2 from './schemaValidTestSimple'

const schemas: any = {...schemas1, ...schemas2, ...sub}
// const schemas = Object.keys(schemas2).map(s => schemas2[s])

export default schemas
