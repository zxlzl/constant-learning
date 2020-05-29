class EventEmitter {
  constructor(){
    this.hander = {}
  }

  on(eventName, callback) {
    if(!this.handles) {
      this.handles = {}
    }

    if (!this.handles[eventName]) {
      this.handles[eventName] = []
    }
    this.handles[eventName].push(callback);
  }

  emit(eventName, ...arg){
    if (this.handles[eventName]) {
      for (let i = 0; i < this.handles[eventName].length; i++) {
        this.handles[eventName][i](...arg)
      }
    }
  }
}

const event = new EventEmitter()
event.on('hello',num=>{
  console.log('hello触发：'+num);
})
let num= 0
setInterval(() => {
  event.emit('hello', num++)
}, 1000);