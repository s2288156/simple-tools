<script setup lang="ts">
import {onMounted, ref} from 'vue'

const width = ref(1000)
const height = ref(800)
let c = ref()

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
  ctx.fillRect(0, 0, 150, 150)
  ctx.translate(75, 75)

  ctx.beginPath()
  ctx.arc(0, 0, 60, 0, Math.PI * 2, true)
  ctx.clip()

  let lingrad = ctx.createLinearGradient(0, -75, 0, 75)
  lingrad.addColorStop(0,'#232256')
  lingrad.addColorStop(1,'#143778')

  ctx.fillStyle = lingrad;
  ctx.fillRect(-75, -75, 150, 150);

  for (let i = 1; i < 50; i++) {
    ctx.save()
    ctx.fillStyle = `rgb(${i * 5}, 255, ${255 - i * 5})`
    ctx.translate(Math.random() * 100 - 50, Math.random() * 100 - 50)
    ctx.rotate(Math.random() * 2 * Math.PI)
    ctx.fillRect(0, 0, 10, 10)
    ctx.restore()
  }
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
