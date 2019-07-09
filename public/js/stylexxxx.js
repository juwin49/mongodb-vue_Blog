/*根据id获取元素*/
  var $ = function (id) {
      return document.getElementById(id)
  }
  var side = $('leftnav')
  /*监听事件*/
  /*addEvent用于给一个元素绑定多个事件*/
  var addEvent = function (obj, event, fn) {
      if (obj.addEventListener){
          /*event：事件名称，fn:回调函数，false*/
          obj.addEventListener(event,fn,false)
      }else if(obj.attachEvent){//IE
          obj.attachEvent('on' + event,fn)
      }
  }
 var scrollEvent = function () {
     /*获得元素的高度*/
     var sideHeight = side.offsetHeight
     console.log(sideHeight)
     /*获得可视区域的高度*/
     var clientHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
     /*获得滑动高度*/
     var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop
     /*当可视区域高度+滑动高度>元素的高度*/
     if((clientHeight+scrollHeight) > sideHeight){
         side.style.cssText = 'position:fixed;right:30px;top:' + (-(sideHeight - clientHeight)) +'px'
     }else {
         /*默认定位*/
         side.style.position = 'static'
     }
 }
//       addEvent(window,'scroll',function () {
//           scrollEvent()
//       })
//        addEvent(window,'resize',function () {
//            scrollEvent()
//        })

  //或单独写事件
  window.onscroll = function () {
      scrollEvent()
  }
  window.onresize = function () {
      scrollEvent()
  }
