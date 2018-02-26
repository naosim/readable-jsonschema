const readableJsonSchema = require(`${__dirname}/src/readable-jsonschema.js`)

const script = `
object({
  status: object({
    code: number({ minimum: 0, maximum: 100 }, 'HTTP status code'),
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

console.log(JSON.stringify(readableJsonSchema.build('number()')));
console.log(JSON.stringify(readableJsonSchema.build('number({ minimum: 0, maximum: 100 })')));
console.log(JSON.stringify(readableJsonSchema.build('number("point of test")')));
console.log(JSON.stringify(readableJsonSchema.build('number({ minimum: 0, maximum: 100 }, "point of test")')));
