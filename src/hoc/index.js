import React from 'react'
import reactClass from './class'
import reactFunction from './functional'

export default React.version >= 16.8 ? reactFunction : reactClass
