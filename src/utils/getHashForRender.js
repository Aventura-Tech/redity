export default function getHashForRender (props) {
  const KEY = 'CONNECT'
  return {
    ...props,
    _hash: `${KEY}_${Math.random().toString(36).substr(2, 9)}`
  }
}
