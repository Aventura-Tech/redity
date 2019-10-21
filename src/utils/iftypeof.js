import Enum from './enum'

/**
 *
 * @param {any} data Data for varify
 * @param {any} typePayload Constructor or 'any'
 */
export default function iftypeof (data, typePayload = 'any', warn = true) {
  const ExceptionNotTypeOf = name => {
    //   eslint-disable-next-line no-console
    if (warn) console.warn(`Payload is not type of ${name}`)
  }

  if (typePayload !== 'any') {
    if (Array.isArray(typePayload)) {
      let pass = false
      for (let i = 0; i < typePayload.length; i++) {
        // eslint-disable-next-line valid-typeof
        if (typeof data === typePayload[i].name.toLowerCase()) {
          if (typePayload[i].name === 'Object' && Array.isArray(data)) {
            break
          }
          pass = true
          break
        }
      }

      if (!pass) {
        let names = ''
        for (let i = 0; i < typePayload.length; i++) {
          names = names + typePayload[i].name + ', '
        }

        ExceptionNotTypeOf(`[${names.slice(0, -2)}]`)
        return false
      }
    } else if (typePayload.name === Enum.name) {
      const values = typePayload.values
      let pass = false
      for (let i = 0; i < values.length; i++) {
        if (data === values[i]) {
          pass = true
          break
        }
      }
      if (!pass) {
        ExceptionNotTypeOf(`${typePayload.name}(${typePayload.values.toString()})`)
        return false
      }
    } else if (typePayload.name === 'Object' && Array.isArray(data)) {
      ExceptionNotTypeOf(typePayload.name)
      return false
    // eslint-disable-next-line valid-typeof
    } else if (typeof data !== typePayload.name.toLowerCase()) {
      ExceptionNotTypeOf(typePayload.name)
      return false
    }
  }

  return true
}
