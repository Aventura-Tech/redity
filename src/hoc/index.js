import React from 'react'
import reactClass from './class'
import reactFunction from './functional'
import connectFaker from './connectFaker'

let currentReact = false
const [x, y, z] = React.version.split('.')

if (x > 16 || (x >= 16 && y >= 8 & z >= 0)) {
  currentReact = true
}

export {
  connectFaker
}
export default currentReact ? reactFunction : reactClass
