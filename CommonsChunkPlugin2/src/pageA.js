// 异步加载
require.ensure(['lodash'],function(){
    var _ = require('lodash')
},'vendor')

require.ensure(['./subPageA'],function(){
    var subPageA = require('./subPageA')
})

// import './subPageA'
import './subPageB'

export default 'pageA'