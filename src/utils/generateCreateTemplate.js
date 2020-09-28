import React from 'react'
/**
 * Generate createTemplate
 * @param {import('../index').default} redity
 */
export default function generateCreateTemplate (redity) {
  /**
   * Create un componente Template
   * @template T
   * @param {string|number} keyName keyName connect
   * @param {T} props props for Component Template
   * @param {function(T):React.ReactElement} Component  Component Template
   * @returns {function(object):React.ReactElement}
   * @example
   * this.createTemplate('keyName', { name: 'Juan' }, props => (
   *  <h1>{props.name}</h1>
   * ))
   */
  function createTemplate (keyName, props, Component) {
    /**
     * @param {T} nextProps
     */
    function Wrapper (nextProps) {
      return <Component {...props} {...nextProps} />
    }

    return redity.connect(keyName)(Wrapper)
  }

  return createTemplate
}
