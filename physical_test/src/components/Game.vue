<template>
  <div class="game-container">
    <div v-if="!isGameActive" class="game-title">
      <div class="title-text">Давай поиграем в игру поймай шарик</div>
      <button @click="startGame" class="button">Старт</button>
    </div>
    <div v-if="isGameActive && !isGameOver" class="game-active">
      <div :class="timer <= 3 ? 'game-timer game-timer-red' : 'game-timer'">
        {{ timer }}
      </div>
      <div class="track vector">
        <div class="relative">
          <div
            class="sled"
            :style="{ left: `${vector[0]}%`, top: `${vector[1]}%` }"
            @mouseover="toggle"
          />
        </div>
      </div>
    </div>
    <transition name="anim">
      <div v-if="isGameOver" class="game-over">
        <img
          src="../assets/img/reset_game.png"
          alt="open your eyes"
          class="game-image"
        />

        <button @click="tryGameAgain" class="button">Еще раз</button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { TransitionPresets, useTransition } from "@vueuse/core";
import { rand } from "@vueuse/shared";

const duration = 1500;

const baseVector = ref([0, 0]);

const isGameActive = ref(false);
const isGameOver = ref(false);

const timer = ref(10);

const vector = useTransition(baseVector, {
  duration,
  transition: TransitionPresets.easeOutExpo,
});

function startTimer() {
  const interval = setInterval(() => {
    timer.value--;
    console.log(timer.value);
    if (timer.value === 0) {
      clearInterval(interval);
      //   isGameActive.value = false;
      //   timer.value = 10;
      isGameOver.value = true;
    }
  }, 1000);
}

function startGame() {
  isGameActive.value = true;
  startTimer();
}

function toggle() {
  baseVector.value = [rand(0, 100), rand(0, 100)];
}

function tryGameAgain() {
    timer.value = 10;
isGameOver.value = false;
  isGameActive.value = true;
  startTimer();


}
</script>
<style scoped>
.game-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  background-color: rgba(5, 5, 5, 0.3);
}

.game-title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-text {
  color: var(--color-primary);
  margin-bottom: 20px;
}

.game-active {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.game-timer {
  font-size: 20px;
  color: green;
  margin: 20px;
}

.game-timer-red {
  color: red;
}

.relative {
  position: relative;
}

.track {
  background: rgba(125, 125, 125, 0.3);
  border-radius: 0.5rem;
  max-width: 800px;
  width: 100%;
}

.sled {
  background: red;
  border-radius: 50%;
  height: 1rem;
  position: absolute;
  width: 1rem;
}

.vector.track {
  padding: 0.5rem;
}

.vector.track .relative {
  padding-bottom: 30%;
}

.vector.track .sled {
  transform: translateX(-50%) translateY(-50%);
}

.game-over {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.game-image {
  max-width: 300px;
  max-height: 300px;
}

.anim-enter-active {
  animation: anim-in 1s;
}

@keyframes anim-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
</style>
