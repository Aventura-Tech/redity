import React from 'react'
/**
 * creat connect for Component
 * @param {RegistersOfConnections} registersOfConnections
 * @param {function(string|number, OptionConnect|function(object):OptionConnect=):function(function):function(object):JSX.Element} connect
 */
export default function makeCapsule (registersOfConnections, connect) {
  /**
   * Encapsula secciones de un componente
   * @param {PropsCapsule} capsuleProps
   */
  function Capsule (capsuleProps) {
    function WrapperCapsule (props) {
      return <>
        { capsuleProps.children(props) }
      </>
    }
    const Component = connect(capsuleProps.keyName, {
      payload: { ...capsuleProps.payload }
    })(WrapperCapsule)
    return <Component />
  }

  /**
   * Crea una nueva Capsula
   * @param {string} keyName Key name de la  nueva capsula
   * @param {object=} defaultProps Props por defecto
   * @returns {function}
   */
  function createCapsule (keyName, defaultProps = {}) {
    /**
     * Capsule, only requiere only function
     * @param {{ children: function }} param0 Requiere Children function
     */
    const CustomCapsule = ({ children }) => (
      <Capsule keyName={keyName} >
        {
          /** @param {{}} props */
          props => children({ ...defaultProps, ...props })
        }
      </Capsule>
    )
    return CustomCapsule
  }

  return {
    Capsule,
    createCapsule
  }
}
