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

onMounted(() => {
  let ctx = c.value.getContext('2d')
  // testLine(ctx)
  ctx.arc(100, 100, 30, 0, 360 * Math.PI / 180)
  ctx.closePath()
  ctx.stroke()
})


</script>
<template>
  <canvas ref="c" class="canvas1"> </canvas>
</template>

<style>
.canvas1 {
  display: flex;
  justify-content: center;
  width: 300px;
  height: 150px;
  margin: 1px auto;
  background-color: antiquewhite;
  border: 1px solid black;
}
</style>
