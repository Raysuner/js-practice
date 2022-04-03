Promise.all2 = function (promises) {
  return new Promise((resolve, reject) => {
    if (!promises[Symbol.iterator]) {
      reject(new Error(`${typeof promises} ${promises} is not iterable`))
    }
    const len = promises.length
    const result = new Array(len)
    let count = 0
    if (!len) {
      resolve(result)
      return
    }
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(
        res => {
          count++
          result[i] = res
          if (count === len) {
            resolve(result)
          }
        },
        err => {
          reject(err)
        }
      )
    }
  })
}

Promise.race2 = function (promises) {
  return new Promise((resolve, reject) => {
    if (!promises[Symbol.iterator]) {
      reject(new Error(`${typeof promises} ${promises} is not iterable`))
    }
    for (const promise of promises) {
      Promise.resolve(promise).then(resolve, reject)
    }
  })
}