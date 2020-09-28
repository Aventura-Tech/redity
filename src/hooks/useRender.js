import React from 'react'
import getHashForRender from '../utils/getHashForRender'

/**
 * @param {object} props
 */
export default function useRender (props) {
  const [propsHashed, setHashRender] = React.useState(getHashForRender(props))

  /**
   * Genera un render al component actual
   * @param {object=} props
   */
  function forceRender (props = {}) {
    setHashRender(getHashForRender(props))
  }

  return {
    propsHashed,
    forceRender
  }
}
