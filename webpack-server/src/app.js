import vue from 'vue'
console.log('this is ceshi foo !!!')
// import base from './css/base.less'
import './css/common.less'

import(/* webpackChunkName: 'async' */'./js/a.js').then(function (a){
 console.log(1)
})

// var app = document.getElementById('app')
// app.innerHTML = '<div class="' + base.box + '"></div>'

// console.log($)
// $.get('/rest/form/search', {}, function (data) {
//     console.log(data)
// })

// // alert(2)

// // 页面刷新调试
// if (module.hot) {
//     module.hot.accept()
// }