<template>
  <div>
    <canvas ref="canvas" @mousemove="mouseMove" style="border:1px solid #000;"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ctx: null,
      mouse: { x: 0, y: 0 },
    };
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    this.draw();
  },
  methods: {
    draw() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height); //清除画布
      this.ctx.beginPath();
      this.ctx.arc(this.mouse.x, this.mouse.y, 10, 0, Math.PI * 2, false); //画一个以鼠标位置为圆心的圆
      this.ctx.fillStyle = "#000"; //设置圆的颜色为黑色
      this.ctx.fill(); //填充圆
      requestAnimationFrame(this.draw); //每一帧都重新画
    },
    mouseMove(e) {
      this.mouse.x = e.clientX; //获取鼠标在页面上的x坐标
      this.mouse.y = e.clientY; //获取鼠标在页面上的y坐标
    },
  },
};
</script>
