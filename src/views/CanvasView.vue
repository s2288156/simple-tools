<script setup lang="ts">
import {onMounted, ref} from 'vue'

const width = ref(1000)
const height = ref(800)
let c = ref()
const timeoutIds: number[] = []

let ctx: CanvasRenderingContext2D
onMounted(() => {
  ctx = c.value.getContext('2d')
})

const drawLine = (ctx: any) => {
  ctx.lineWidth = 8
  ctx.strokeStyle = 'pink'
  ctx.lineCap = 'round'

  ctx.moveTo(50, 100)
  ctx.lineTo(100, 100)
  ctx.stroke()

  ctx.beginPath()

  ctx.lineWidth = 3
  ctx.strokeStyle = 'black'
  ctx.lineCap = 'round'

  ctx.moveTo(100, 50)
  ctx.lineTo(100, 100)
  ctx.stroke()
}
const drawBezierCurve = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath()
  ctx.moveTo(100, 100)
  ctx.quadraticCurveTo(200, 100, 200, 200)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(300, 300)
  ctx.bezierCurveTo(550, 300, 400, 500, 500, 500)
  ctx.stroke()
}
const drawForPath2D = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath()
  ctx.moveTo(100, 100)
  const rectangle = new Path2D();
  rectangle.rect(100, 100, 100, 100)

  const circle = new Path2D();
  circle.arc(300, 300, 50, 0, 2 * Math.PI)

  ctx.stroke(rectangle)
  ctx.fill(circle)
}
const drawStyle = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath()
  // 填充颜色
  ctx.fillStyle = 'red'
  ctx.rect(200, 200, 100, 100)
  ctx.fill()

  // beginPath() 可以保证其之后的style不影响前面的绘制
  ctx.beginPath()
  // 线条颜色
  ctx.strokeStyle = 'green'
  ctx.rect(300, 300, 100, 100)
  ctx.stroke()

  ctx.beginPath()
  // 画背景
  ctx.fillStyle = "#FD0";
  ctx.fillRect(0, 0, 75, 75);
  ctx.fillStyle = "#6C0";
  ctx.fillRect(75, 0, 75, 75);
  ctx.fillStyle = "#09F";
  ctx.fillRect(0, 75, 75, 75);
  ctx.fillStyle = "#F30";
  ctx.fillRect(75, 75, 75, 75);
  ctx.fillStyle = "#FFF";

  // 设置透明度值
  ctx.globalAlpha = 0.2;
  ctx.beginPath();
  ctx.arc(75, 75, 10 + 10 * 6, 0, Math.PI * 2, true);
  ctx.fill();

}
const drawLineDash = (ctx: CanvasRenderingContext2D) => {
  let offset = 0
  const draw = () => {
    ctx.clearRect(0, 0, 500, 500)
    // 第一个值: 虚线线段长度; 第二个值: 虚线线段间隔.
    ctx.setLineDash([4, 4])
    ctx.lineWidth = 2
    ctx.lineDashOffset = -offset
    ctx.strokeRect(100, 100, 100, 100)
  }

  const march = () => {
    offset++
    if (offset > 16) {
      offset = 0
    }
    draw()
    setTimeout(march, 20);
  }
  // march()
  draw()
}
const cleanCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath()
  ctx.setLineDash([0, 0])
  ctx.globalAlpha = 1
  ctx.clearRect(0, 0, width.value, height.value)
}
const drawFillText = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath()
  ctx.font = '50px Arial'
  ctx.fillText('Hello World', 100, 100)
  ctx.strokeText('Hello World', 100, 150)
}
const drawImage = (ctx: CanvasRenderingContext2D) => {
  let img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 0, 0)
    ctx.beginPath();
    ctx.moveTo(30, 96);
    ctx.lineTo(70, 66);
    ctx.lineTo(103, 76);
    ctx.lineTo(170, 15);
    ctx.stroke();
  }
  img.src = '/src/assets/images/td.png'
}
const drawSaveRestore = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath()
  ctx.fillStyle = '#8c8c8c'
  ctx.fillRect(100, 100, 200, 200)
  ctx.save()

  ctx.fillStyle = '#ff4d4f'
  ctx.fillRect(120, 120, 160, 160)
  ctx.save()

  ctx.fillStyle = '#ff9c6e'
  ctx.fillRect(140, 140, 120, 120)

  ctx.restore()
  ctx.fillRect(160, 160, 80, 80)

  ctx.restore()
  ctx.fillRect(180, 180, 40, 40)
}
const drawTranslateRect = (ctx: CanvasRenderingContext2D) => {
  ctx.translate(100, 100)
  ctx.fillRect(0, 0, 100, 100)
  ctx.translate(100, 100)
  ctx.fillRect(0, 0, 100, 100)
}
const drawClipRect = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = '#d9d9d9'
  ctx.fillRect(200, 200, 150, 150)

  ctx.arc(275, 275, 75, 0, Math.PI * 2, true)
  // clip后，后面的绘制都会被裁剪掉
  ctx.clip()

  ctx.clearRect(0, 0, width.value, height.value)
  ctx.clip()
  ctx.beginPath()
  ctx.fillStyle = '#ff9c6e'
  ctx.fillRect(210, 210, 130, 130)
}
const drawClockAnimations = (ctx: CanvasRenderingContext2D) => {
  ctx.translate(500, 200)
  function clock() {
    ctx.clearRect(-500,-200, width.value, height.value)
    ctx.save()
    ctx.lineWidth = 3
    ctx.arc(0, 0, 100, 0, Math.PI * 2, true)
    ctx.stroke()
    ctx.restore()

    // hour marks
    ctx.save()
    let hourLine = new Path2D();
    hourLine.moveTo(0, -95)
    hourLine.lineTo(0, -85)
    ctx.lineWidth = 2

    for (let i = 0; i < 12; i++) {
      ctx.beginPath()
      ctx.rotate(Math.PI / 6)
      ctx.stroke(hourLine)
    }
    ctx.restore()

    // minute marks
    ctx.save()
    let minuteLine = new Path2D();
    minuteLine.moveTo(0, -95)
    minuteLine.lineTo(0, -90)
    ctx.lineWidth = 1
    for (let i = 0; i < 60; i++) {
      ctx.beginPath()
      ctx.rotate(Math.PI / 30)
      ctx.stroke(minuteLine)
    }
    ctx.restore()

    const now = new Date()
    let sec = now.getSeconds()
    let min = now.getMinutes()
    let hr = now.getHours()

    // write hour
    ctx.save()
    let hourHand = new Path2D();
    hourHand.moveTo(0, 10)
    hourHand.lineTo(0, -70)
    ctx.strokeStyle = '#141414'
    ctx.lineWidth = 5
    ctx.rotate(Math.PI * 2 * hr / 12)
    ctx.stroke(hourHand);
    ctx.restore()

    // write minute
    ctx.save()
    let minuteHand = new Path2D();
    minuteHand.moveTo(0, 15)
    minuteHand.lineTo(0, -80)
    ctx.strokeStyle = '#d4b106'
    ctx.lineWidth = 3
    ctx.rotate(Math.PI * 2 * min / 60)
    ctx.stroke(minuteHand);
    ctx.restore()

    // write second
    ctx.save()
    let secondHand = new Path2D();
    secondHand.moveTo(0, 20)
    secondHand.lineTo(0, -90)
    ctx.strokeStyle = '#f5222d'
    ctx.lineWidth = 1
    ctx.rotate(Math.PI * 2 * sec / 60)
    ctx.stroke(secondHand);
    ctx.restore()


    ctx.save()
    ctx.beginPath()
    ctx.fillStyle = '#f5222d'
    const circleCenter = new Path2D();
    circleCenter.arc(0, 0, 4, 0, Math.PI * 2, true)
    ctx.fill(circleCenter)
    ctx.restore()
    window.requestAnimationFrame(clock)
  }

  window.requestAnimationFrame(clock)
}
</script>
<template>
  <div class="canvas-header">
    <button @click="cleanCanvas(ctx)">cleanCanvas</button>
    <button @click="drawLine(ctx)">drawLine</button>
    <button @click="drawBezierCurve(ctx)">drawBezierCurve</button>
    <button @click="drawForPath2D(ctx)">drawForPath2D</button>
    <button @click="drawStyle(ctx)">drawStyle</button>
    <button @click="drawLineDash(ctx)">drawLineDash</button>
    <button @click="drawFillText(ctx)">drawFillText</button>
    <button @click="drawImage(ctx)">drawImage</button>
    <button @click="drawSaveRestore(ctx)">drawSaveRestore</button>
    <button @click="drawTranslateRect(ctx)">drawTranslateRect</button>
    <button @click="drawClipRect(ctx)">drawClipRect</button>
    <button @click="drawClockAnimations(ctx)">drawClockAnimations</button>
  </div>
  <canvas ref="c" class="canvas1" :width="width" :height="height"></canvas>
</template>

<style scoped lang="scss">
.canvas-header {
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    padding: 5px 5px;
    margin: 2px
  }
}

.canvas1 {
  display: flex;
  justify-content: center;
  margin: 1px auto;
  background-color: antiquewhite;
  border: 1px solid black;
}
</style>
