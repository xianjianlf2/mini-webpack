export function jsonLoader(source) {
  console.log(source)

  return `export default ${JSON.stringify(source)}`
}
