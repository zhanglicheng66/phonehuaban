

var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');
var linewidth = 5

autoSetCanvasSize(yyy)

listenTouser(yyy)


var eraserEnabled = false
pen.onclick = function () {
    eraserEnabled=false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = function () {
    eraserEnabled=true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

qingchu.onclick = function(){
    context.clearRect(0, 0, yyy.width, yyy.height);
}

baocun.onclick = function(){
    var url = yyy.toDataURL("image/png")
    console.log(url)
    var a = document.createElement('a')
    document.body.appendChild(a)
    a.href = url
    a.download = '我的画画'
    a.target = '_blank'
    a.click()
}
// brush.onclick = function(){
//     eraserEnabled = false
//     actions.className = 'actions'
// }


red.onclick = function () {
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')

}
green.onclick = function () {
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
}
blue.onclick = function () {
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
}

xi.onclick = function () {
    linewidth = 5
}
cu.onclick = function () {
    linewidth = 20
}
/******/

function autoSetCanvasSize(canvas) {
    setCanvasSize()

    window.onresize = function() {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
}

function drawCircle(x, y, radius) {
    context.beginPath()
    // context.fillStyle = 'black'
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

function drawLine(x1, y1, x2, y2) {
    context.beginPath();
    // context.strokeStyle = 'black'
    context.moveTo(x1, y1) // 起点
    context.lineWidth = linewidth
    context.lineTo(x2, y2) // 终点
    context.stroke()
    context.closePath()
}

function listenTouser(canvas) {


    var using = false
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    if(document.body.ontouchstart !== undefined){
        //触屏设备
        xxx.ontouchstart = function (aaa) {
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY
            console.log(x,y)
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }


        xxx.ontouchmove = function (aaa) {
            console.log('边摸边动')
            var x = aaa.touches[0].clientX
            var y = aaa.touches[0].clientY

            if (!using) {return}

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }

        }

        xxx.ontouchend = function () {
            console.log('摸完了')
            using=false
        }
    }else{
        //非触屏设备
        canvas.onmousedown = function(aaa) {
            var x = aaa.clientX
            var y = aaa.clientY
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    "x": x,
                    "y": y
                }
            }
        }
        canvas.onmousemove = function(aaa) {
            var x = aaa.clientX
            var y = aaa.clientY

            if (!using) {return}

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    "x": x,
                    "y": y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }

        }
        canvas.onmouseup = function(aaa) {
            using = false
        }
    }
    }


