<script setup>
import Navbar from './components/Navbar.vue';
import MainComp from './components/MainComp.vue';
import About from './components/About.vue';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

//앱이 실행되면 날씨 데이터 가져오기
//반드시 dispatch 함수로 액션함수를 가져와야 한다
onMounted(() => {
  store.dispatch('getWeather');
});

// onSearchCity 함수추가
const onSearchCity = (city) => {
  weatherData.value.city = city;
  //검새어가 입력되었을때 
  getWeather();
}

</script>

<template>
  <button @click="$store.dispatch('getWeather')">getWeather</button>
  <!-- 액션함수는 dispatch라는 함수로 호출한다 -->
  <!-- <p>count: {{ $store.state.count }}</p>
  <button @click="$store.commit('addCount', 10)">
    count++
  </button> -->
  <Navbar />
  <div v-if="!$store.state.toggle"> <!-- false -->
    <MainComp />
  </div>
  <div v-else>
    <About />
  </div>
</template>

<style scoped lang="scss">

</style>
