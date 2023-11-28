<script setup lang="ts">
import { onMounted, ref } from 'vue'

let c = ref()

let ctx: CanvasRenderingContext2D
onMounted(() => {
  ctx = c.value.getContext('2d')
  // drawLine(ctx)
  // drawBezierCurve(ctx)
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
