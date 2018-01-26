import base from './css/base.less'
import './css/common.less'

var app = document.getElementById('app')
app.innerHTML = '<div class="' + base.box + '"></div>'

console.log($)
$.get('/rest/form/search',{},function(data){
    console.log(data)
})

// alert(2)

// 页面刷新调试
if(module.hot){
    module.hot.accept()
}