import * as colorList from '../../node_modules/muse-ui/src/utils/colors.js'

function Obj2Hash(obj) {

    const colorList = Object.values(obj)
    const len = colorList.length
    return function getRandomColor(name) {
        let color = colorList[Math.round(Math.random() * len)]
        try {
           
            color = colorList[Array
                    .prototype
                    .reduce
                    .call(name, (sum, val) => {
                        return sum + val.charCodeAt()
                    }, 0) * 10000 % len]
        } catch (error) {}

        return color
    }
}

export default Obj2Hash(colorList)