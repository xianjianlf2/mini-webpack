;(function (modules) {
  function require(id) {
    const [fn, mapping] = modules[id]

    const module = {
      exports: {}
    }

    function localRequire(filePath) {
      const id = mapping[filePath]
      return require(id)
    }

    fn(localRequire, module, module.exports)

    return module.exports
  }

  require(0)
  })({
    
      0: [function (require, module, exports) {
        "use strict";

var _foo = require("./foo.js");

console.log('main.js');
(0, _foo.foo)();
      },{"./foo.js":1}],
        
      1: [function (require, module, exports) {
        "use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = foo;

function foo() {
  console.log('foo');
}
      },{}],
        
   
  })
  