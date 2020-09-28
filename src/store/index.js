export default function localStores () {
  /** @type {RegistersOfConnections} */
  const registersOfConnections = new Map()

  /** @type {HideChildrens} */
  const hideChildrens = new Map()

  /** @type {TemplateChildrens} */
  const templateChildrens = new Map()

  return {
    registersOfConnections,
    hideChildrens,
    templateChildrens
  }
}
