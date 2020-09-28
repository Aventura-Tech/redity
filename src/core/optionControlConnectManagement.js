// ====================================== //
// Funcionalidad en discusión             //
// ====================================== //
export default function optionControlConnectManagement () {
  /** @type {function(object):OptionConnect} */
  let currentOptionConnect = null

  /** @type {OptionConnect} */
  const option = {
    id: null,
    props: {},
    payload: {}
  }

  function defaultOptionConnect () {
    return option
  }

  /**
   * @param {OptionConnect|function(object):OptionConnect} optionConnect
   */
  function setOptionConnect (optionConnect) {
    if (typeof optionConnect === 'function') {
      currentOptionConnect = optionConnect
    } else if (typeof optionConnect === 'object' && !Array.isArray(optionConnect)) {
      currentOptionConnect = function () {
        return { ...option, ...optionConnect }
      }
    } else {
      throw new Error('optionConnect is not a function or object')
    }
  }

  /**
   * ProcessProps
   * @param {object} props
   * @returns {OptionConnect}
   */
  function processOptionControlConnect (props) {
    const currentOption = currentOptionConnect(props)
    const optionConnect = {
      ...option,
      ...currentOption,
      props: {
        ...props,
        ...currentOption.props
      }
    }
    return optionConnect
  }

  return {
    defaultOptionConnect,
    setOptionConnect,
    processOptionControlConnect
  }
}
