import * as _ from "lodash"

console.log(_.chunk([1,2,3,4,5],2))

const num = 44

interface Cat {
    name: String,
    sex: String
}

function touchCat(cat: Cat) {
    console.log('miao~', cat.name)
}

touchCat({
    name: "tome",
    sex: "17"
})