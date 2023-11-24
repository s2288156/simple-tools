<script setup lang="ts">
import L from 'leaflet'
import 'leaflet-gpx'
import { onMounted, ref } from 'vue'

let map: any
onMounted(() => {
  map = L.map('map').setView([51.505, -0.09], 13)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map)
})
let file = ref<File>()
let message = ref()
const up = (event: any | Event) => {
  file.value = event.target.files[0]
  message.value = file.value?.name
  console.log(file.value)
}
</script>

<template>
  <div id="map"></div>
  <p>Message is: {{ message }}</p>
  <input type="file" @change="up($event)" />
</template>

<style scoped lang="scss">
#map {
  //height: 720px;
  height: 200px;
}
</style>
