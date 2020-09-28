import React from 'react'

/**
 * @param {DataToolsConnect} dataToolsConnect
 * @param {HideChildrens} hideChildrens
 * @param {TemplateChildrens} templateChildrens
 */
export default function CapsuleElement (dataToolsConnect, hideChildrens, templateChildrens) {
  this.hide = function () {
    if (hideChildrens.has(dataToolsConnect.keyName)) return false
    hideChildrens.set(dataToolsConnect.keyName, true)
    dataToolsConnect.render(dataToolsConnect.props)
    return true
  }

  this.show = function () {
    if (!hideChildrens.has(dataToolsConnect.keyName)) return false
    hideChildrens.delete(dataToolsConnect.keyName)
    dataToolsConnect.render(dataToolsConnect.props)
    return true
  }

  /**
   * @param {function(object):React.ReactElement} TemplateComponent
   * @param {boolean} render
   */
  this.setTemplate = function (TemplateComponent, render = false) {
    function TemplateChildren (props) {
      return <TemplateComponent {...props} />
    }
    templateChildrens.set(dataToolsConnect.keyName, TemplateChildren)
    if (render) dataToolsConnect.render(dataToolsConnect.props)
  }

  /**
   * @param {boolean} render
   * @returns {boolean}
   */
  this.removeTemplate = function (render = false) {
    const result = templateChildrens.delete(dataToolsConnect.keyName)
    if (render) dataToolsConnect.render(dataToolsConnect.props)
    return result
  }

  this.restore = function () {
    if (!templateChildrens.has(dataToolsConnect.keyName)) return false
    templateChildrens.delete(dataToolsConnect.keyName)
    dataToolsConnect.render(dataToolsConnect.props)
    return true
  }

  /**
   * Intercambia los chidlren
   * @param {CapsuleElement} otherCapsuleElement
   */
  this.trade = function (otherCapsuleElement) {

  }

  this.payload = function () {
    return Object.freeze({ ...dataToolsConnect.payload })
  }

  this.props = function () {
    const { _hash, ...props } = dataToolsConnect.props
    return Object.freeze(props)
  }

  this.render = function (nextProps = {}) {
    dataToolsConnect.render({ ...dataToolsConnect.props, ...nextProps })
  }
}
