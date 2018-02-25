(function(global) {
  "use strict;"

  function parseArgs2(v1, v2) {
    var args = [v1, v2].filter(v => v);
    var result = { isRequired: true }
  
    if(!args || args.length == 0) {
      return result
    }
    
    if(args.length == 1) {
      if(typeof args[0] == 'string') {
        result.description = args[0]
        return result;
      }
      Object.keys(args[0]).forEach(k => result[k] = args[0][k])
      return result
    }
  
    Object.keys(args[0]).forEach(k => result[k] = args[0][k])
    result.description = args[1]
    return result
  
  }
  
  
  function putOption(obj) {
    obj.isRequired = false
    return obj
  }
  
  function putType(type, obj) {
    obj.type = type
    return obj
  }
  
  var string = (v1, v2) => putType('string', parseArgs2(v1, v2))
  var stringOption = (v1, v2) => putOption(string(v1, v2))
  
  var number = (v1, v2) => putType('number', parseArgs2(v1, v2))
  var numberOption = (v1, v2) => putOption(number(v1, v2))
  
  var boolean = (v1, v2) => putType('boolean', parseArgs2(v1, v2))
  var booleanOption = (v1, v2) => putOption(boolean(v1, v2))
  
  function object(v1, v2, v3) {
    var properties = v1
    var required = Object.keys(properties).filter(k => properties[k].isRequired);
    option = parseArgs2(v2, v3)
    option.properties = properties
    option.type = 'object'
    option.required = required
    return option;
  }
  var objectOption = (v1, v2, v3) => putOption(object(v1, v2, v3))
  
  function array(v1, v2, v3) {
    var items = v1
    option = parseArgs2(v2, v3)
    option.items = items
    option.type = 'array'
    return option;
  }
  var arrayOption = (v1, v2, v3) => putOption(array(v1, v2, v3))
  
  function deleteIsRequired(obj) {
    if(Array.isArray(obj)) {
      return obj.map(v => deleteIsRequired(v))
    }
    if(typeof obj !== 'object') {
      return obj
    }
  
    var result = Object.keys(obj)
      .filter(k => k !== 'isRequired')
      .map(k => {
        var v = obj[k]
        return typeof v === 'object' ? [k, deleteIsRequired(v)] : [k, v]
      })
      .reduce((memo, p) => {memo[p[0]] = p[1]; return memo}, {})
    return result
  }
  
  function build(script) {
    var result = eval(script);
    return deleteIsRequired(result);
  }

  // Exports
  if ("process" in global) {
    module["exports"].build = build;
  } 
  global.build = build

})((this || 0).self || global);
