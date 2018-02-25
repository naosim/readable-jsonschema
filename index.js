const readableJsonSchema = require(`${__dirname}/src/readable-jsonschema.js`)

const script = `
object({
  status: object({
    code: number('HTTPステータスコード'),
    message: string()
  }),
  errors: arrayOption(object({
    error_type: string(),
    error_message: string()
  }))
}, {
  "$schema": "http://json-schema.org/draft-07/schema#"
})
`

console.log(JSON.stringify(readableJsonSchema.build(script), null, '  '));
