export class ChangeOutPath {
  apply(hooks) {
    hooks.emitFile.tap('changeOutputPath', (context) => {
      console.log('--------->changeOutputPath')
      context.changeOutputPath('./dist/pluginOutput.js')
    })
  }
}
