// demo
// https://www.npmjs.com/package/tapable
import { SyncHook, AsyncParallelHook } from 'tapable'

class List {
  getRoutes() {}
}

class Car {
  constructor() {
    this.hooks = {
      accelerate: new SyncHook(['newSpeed']),
      brake: new SyncHook(),
      calculateRoutes: new AsyncParallelHook(['source', 'target', 'routesList'])
    }
  }

  setSpeed(newSpeed) {
    // following call returns undefined even when you returned values
    this.hooks.accelerate.call(newSpeed)
  }

  useNavigationSystemPromise(source, target) {
    const routesList = new List()
    return this.hooks.calculateRoutes
      .promise(source, target, routesList)
      .then((res) => {
        // res is undefined for AsyncParallelHook
        return routesList.getRoutes()
      })
  }

  useNavigationSystemAsync(source, target, callback) {
    const routesList = new List()
    this.hooks.calculateRoutes.callAsync(source, target, routesList, (err) => {
      if (err) return callback(err)
      callback(null, routesList.getRoutes())
    })
  }
}

// 注册
const car = new Car()
car.hooks.accelerate.tap('test 1', (speed) => {
  console.log('accelerate', speed)
})

car.hooks.calculateRoutes.tapPromise('test 2 promise', (source, target) => {
  console.log('tapPromise', source, target)
})
// 触发

car.setSpeed()
car.useNavigationSystemPromise(['1', '2', '3'], 1)
