
var NH = Math.round((window.innerHeight -40 )/ 20)
var NW = Math.round((window.innerWidth -30) / 20)

var total = NW*NH


var directorio = {}
var d2 = {}

var rowkeys = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
rowkeys = rowkeys.split('')

function build(){

    for(let i=0; i<=NH; i++){
    var c = document.createElement('div')
    c.className = 'row'
    for(var j=1; j<=NW; j++){
        var d = document.createElement('div')
        var identifier = rowkeys[i]+j.toString()
        d.id = identifier
        d.className = 'bloque'
        directorio[identifier] = {el: d, life : false, family: {}}
        c.appendChild(d)
    }
    document.body.appendChild(c)
}
}


function setLifeSquares(){
    var arr = Object.keys(directorio)

    // var preset = ['c6', 'c7', 'c8', 'b8', 'a7']
    // var preset = ['c6', 'c7', 'c8', 'd6', 'd7', 'd8', 'e6', 'e7', 'e8']
    for(var id of arr){

        var r = Math.round(Math.random()*10).toString()
        if(r%5===0){
            directorio[id].life = true                    
        }
    }

    // for(var id of preset){
    //     directorio[id].life = true                    
    // }
    // d2 = directorio;
}


function setLeft(){
    var arr = Object.keys(directorio)

    for(var id of arr){                

        var [letter, ...number] = id

        for(var l=0; l<rowkeys.length; l++){
            if(rowkeys[l] === letter){
                letterKey = l
            }
        }
        number = parseInt(number.join(''))

        var numin = number - 1

        numin === 0 ? numin = undefined : numin = numin.toString();

        var left       
        numin !== undefined ? left = letter+numin : left = undefined;

        if (left !== undefined){
            directorio[id].family['left'] = left
        }

    }            
}

function setRight(){
    var arr = Object.keys(directorio)

    for(var id of arr){                

        var [letter, ...number] = id

        for(var l=0; l<rowkeys.length; l++){
            if(rowkeys[l] === letter){
                letterKey = l
            }
        }
        number = parseInt(number.join(''))

        var numplus = number + 1

        numplus > NW ? numplus = undefined : numplus = numplus.toString();

        var right        
        numplus !== undefined ? right = letter+numplus : right = undefined;

        if (right !== undefined){
            directorio[id].family['right'] = right
        }

    }            
}

function setUp(){
    var arr = Object.keys(directorio)

    for(var id of arr){                

        var [letter, ...number] = id
        var letterKey
        for(var l=0; l<rowkeys.length; l++){
            if(rowkeys[l] === letter){
                letterKey = l
            }
        }
        number = number.join('')

        var lettermin = rowkeys[letterKey - 1] 

        var up        
        lettermin !== undefined ? up = lettermin+number : up = undefined;

        if (up !== undefined){
            directorio[id].family['up'] = up
        }
    }            
}

function setDown(){
    var arr = Object.keys(directorio)

    for(var id of arr){                

        var [letter, ...number] = id
        var letterKey
        for(var l=0; l<rowkeys.length; l++){
            if(rowkeys[l] === letter){
                letterKey = l
            }
        }
        number = number.join('')

        var letterplus = letterKey + 1 
        letterplus > NH ? letterplus = undefined : letterplus = rowkeys[letterplus];

        var down        
        letterplus !== undefined ? down = letterplus+number : down = undefined;

        if (down !== undefined){
            directorio[id].family['down'] = down
        }
    }            
}

function setDiagonal(strVertical, strHorizontal){
    var arr = Object.keys(directorio)

    for(var id of arr){                
        var vertical = directorio[id].family[strVertical]
        var horizonal = directorio[id].family[strHorizontal]

        if(vertical !== undefined && horizonal !== undefined){
            var letter = vertical[0]
            var [, ...number] = horizonal
            number = number.join('')
            directorio[id].family[`${strVertical}_${strHorizontal}`] = letter+number
        }
    }            
}        


function updateSquares(){
    var arr = Object.keys(directorio)            
    var listBool = {}
    for(var id of arr){
        var arr2 = Object.keys(directorio[id].family)
        var llaves = []
        for(var l of arr2){
            llaves.push(directorio[id].family[l])
        }
        var count = 0
        for(var vec of llaves){
            if(directorio[vec].life === true){
                count += 1
            }
        }

        if(count < 2){
            listBool[id] = false
        } 
        else if(count === 2){
            listBool[id] = directorio[id].life
        } 
        else if(count === 3){
            listBool[id] = true
        }
        else if(count > 3){
            listBool[id] = false
        } 
        
    }
    for(var id of arr){
        directorio[id].life = listBool[id]
    }
}

// function littleTest(){
//     var arr = Object.keys(directorio['d7'].family)
//     var llaves = []
//     for(var l of arr){
//         llaves.push(directorio['d7'].family[l])
//     }
//     var count = 0
//     // var life = directorio[id].life
//     for(var vec of llaves){
//         if(directorio[vec].life === true){
//             count += 1
//         }
//     }
//     console.log(count)    
// }

function colorSquares(){
    var arr = Object.keys(directorio)
    for(var id of arr){                
        if(directorio[id].life === true){
            directorio[id].el.style = "background-color : #ff00ff;"
        } else {
            directorio[id].el.style = "background-color : black;"                    
        }
    }
}


function init(){
    build()
    setRight()
    setLeft()
    setDown()
    setUp()
    setDiagonal('down', 'right')
    setDiagonal('up', 'right')
    setDiagonal('down', 'left')
    setDiagonal('up', 'left')
    setLifeSquares()
    colorSquares()
    // littleTest()
    setInterval(() =>{
        updateSquares()
        colorSquares()
    }, 1000)
}
init()





