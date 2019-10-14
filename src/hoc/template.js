import React from 'react'
/**
 *
 * @param {string} message
 * @param {string} type
 */
export default function (message, type) {
  function Template () {
    const style = {
      padding: '1em',
      borderRadius: '7px'
    }
    switch (type) {
      case 'success':
        style.backgroundColor = '#13CE66'
        style.color = 'black'
        break
      case 'warn':
        style.backgroundColor = '#FFC82C'
        style.color = 'black'
        break
      case 'error':
        style.backgroundColor = '#FF4949'
        style.color = 'white'
        break
      default:
    }
    return (
      <p style={style}>{message}</p>
    )
  }

  return Template
}
