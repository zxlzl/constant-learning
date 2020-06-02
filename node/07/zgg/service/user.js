const delay = (data, tick)=>new Promise(resolve => {
  setTimeout(() => {
    resolve(data)
  }, tick);
})

module.exports = {
  getName(){
    return delay('zxl',1000)
  },
  getAge() {
    return 18
  }
}