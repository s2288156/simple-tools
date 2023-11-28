<script setup lang="ts">
import { onMounted, ref } from 'vue'

let c = ref()
const testLine = (ctx: any) => {
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
let ctx: CanvasRenderingContext2D
onMounted(() => {
  ctx = c.value.getContext('2d')
  // testLine(ctx)
  ctx.fillStyle = 'rgb(200,0,0)'
  ctx.fillRect(10, 10, 55, 50)

  ctx.fillStyle = 'rgb(0,0,200,0.5)'
  ctx.fillRect(30, 30, 70, 100)
})
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
