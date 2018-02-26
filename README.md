# readable-jsonschema
Generate jsonschema from easy-to-read notation written in javascript

## Usage
input
```javascript
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
```

output
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "status": {
      "type": "object",
      "properties": {
        "code": {
          "type": "number",
          "description": "HTTP status code",
          "minimum": 0,
          "maximum": 100
        },
        "message": {
          "type": "string"
        }
      },
      "required": [
        "code",
        "message"
      ]
    },
    "errors": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "error_type": {
            "type": "string"
          },
          "error_message": {
            "type": "string"
          }
        },
        "required": [
          "error_type",
          "error_message"
        ]
      }
    }
  },
  "required": [
    "status"
  ]
}
```

## reference
### number(option, description)
Return `number` type object.
### example
#### simple
```javascript
number()
```
↓
```
{"type":"number"}
```

#### option
```javascript
number({ minimum: 0, maximum: 100 })
```
↓
```
{"type":"number","minimum":0,"maximum":100}
```

#### description
```javascript
number("point of test")
```
↓
```
{"type":"number","description":"point of test"}
```

#### option and description
```javascript
number({ minimum: 0, maximum: 100 }, "point of test")
```
↓
```
{"type":"number","description":"point of test","minimum":0,"maximum":100}
```

### string(option, description)
Return `string` type object. The argument specification is the same as `number()`.

### object(properties, option, description)
Return `object` type object. The argument specification is the same as `number()`.

### array(items, option, description)
Return `array` type object. The argument specification is the same as `number()`.