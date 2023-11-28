<script setup lang="ts">
import { onMounted, ref } from 'vue'

let c = ref()

let ctx: CanvasRenderingContext2D
onMounted(() => {
  ctx = c.value.getContext('2d')
  // drawLine(ctx)
  // drawBezierCurve(ctx)
  // drawForPath2D(ctx)
  // drawStyle(ctx)
  drawLineDash(ctx)
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
  ctx.bezierCurveTo(550, 300, 400, 500,500, 500)
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
    offset ++
    if (offset > 16) {
      offset = 0
    }
    draw()
    setTimeout(march, 20)
  }
  march()
}
</script>
<template>
  <canvas ref="c" class="canvas1" width="1000" height="800"> </canvas>
</template>

<style>
.canvas1 {
  display: flex;
  justify-content: center;
  margin: 1px auto;
  background-color: antiquewhite;
  border: 1px solid black;
}
</style>
