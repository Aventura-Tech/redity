import React from 'react'
import { RequireKeyModel, IsNotComponent } from '../utils/exceptions'

export default function (modelKey, mapStateToProps = false, mapDispatchToProps = false) {
  let statesToProps = {}
  let actionsToProps = {}
  // ====================================== //
  // If not string is fatal error           //
  // ====================================== //
  if (typeof modelKey !== 'string') {
    if (modelKey !== false) {
      throw RequireKeyModel('connect')
    }
  }

  return (Component) => {
    if (typeof mapStateToProps === 'function') {
      // ====================================== //
      // Generate states fakers                 //
      // ====================================== //
      const res = mapStateToProps()
      if (typeof res === 'object' && !Array.isArray(res)) {
        statesToProps = res
      }
    }

    if (typeof mapDispatchToProps === 'function') {
      // ====================================== //
      // Generate methods dispatchers fakers    //
      // ====================================== //
      const res = mapDispatchToProps()
      if (typeof res === 'object' && !Array.isArray(res)) {
        for (const key in res) {
          actionsToProps = {
            ...actionsToProps,
            [key]: () => true
          }
        }
      }
    }
    // ====================================== //
    // If not component or null               //
    // ====================================== //
    if (!Component) throw IsNotComponent('connect')

    // ====================================== //
    // Wrapper for father Component           //
    // ====================================== //
    return function Wrapper (props) {
      // ====================================== //
      // Render                                 //
      // ====================================== //
      return <Component {...statesToProps} {...actionsToProps} {...props} />
    }
  }
}
