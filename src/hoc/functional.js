import React from 'react'

/**
 * Connect a component with the model
 * @param {string} modelKey Key of Model
 * @param {object} mapStateActionToProps options
 * @returns {funtion}
 */
export default function (modelKey, mapStateActionToProps = false) {
  if (typeof modelKey !== 'string') throw new Error('Require the model key')

  return Component => {
    if (!Component) throw new Error('Requiere a Componente')

    return function (props) {
      return <Component {...props} />
    }
  }
}
