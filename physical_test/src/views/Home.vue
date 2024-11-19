<template>
  <div class="container">
    <div class="header">
      <img src="../assets/img/Rick_and_Morty.svg.png" alt="logo" class="logo">
      <div class="search">
          <input type="text" id="search" placeholder="Введите имя персонажа" class="header-input" v-model="searchString">
          <select name="location" id="" class="header-select" v-model="selectValue">
              <option value="" class="select-option">Выберите локацию</option>
              <option value="1" class="select-option">Лока 1</option>
          </select>
          <button class="button">Найти</button>
      </div>
    </div>
    <main class="main">
      <div v-infinite-scroll="[onLoadMore, { distance: 20 }]" class="scroll-container">
        <div v-for="character in characters">
          <Character :name="character.name" :status="character.status" :image="character.image" :location="character.location.name"/>
        </div>
      </div>
    </main>
    <footer>
      <Game />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useCharacterListStore } from "../stores/characterList";
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { vInfiniteScroll } from '@vueuse/components'
import Character from "../components/Chatacter.vue";
import Game from "../components/Game.vue";

const characterListStore = useCharacterListStore();
const { characters } = storeToRefs(characterListStore);
const { getCharactersInfo } = characterListStore;

onMounted(async () => {
  console.log(characters.value);
  await getCharactersInfo();
  console.log(characters.value);
});

let searchString = ref("");
let selectValue = ref();
console.log(selectValue);
console.log(searchString)

function onLoadMore() {
  characterListStore.getNextPage();
};

let characterList = computed(() => {
  console.log(characters.value);
  if (!searchString.value && selectValue._value === "Status") {
    return characters.value;
  } else if (!searchString.value && selectValue._value) {
    return characters.value.filter(
      (character) =>
        character.status
          .toLowerCase()
          .includes(selectValue._value.toLowerCase()) &&
          character.name
    );
  } else if (searchString.value && !selectValue._value) {
    return characters.value.filter((character) =>
      character.name
        .toLowerCase()
        .includes(searchString.value.trim().toLowerCase())
    );
  } else if (searchString.value && selectValue._value) {
    return characters.value.filter(
      (character) =>
        character.name
          .toLowerCase()
          .includes(searchString.value.trim().toLowerCase()) &&
        character.status
          .toLowerCase()
          .includes(selectValue._value.toLowerCase())
    );
  }
});

</script>

<style scoped>
.container {
  margin: 20px 10px;
}

.header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logo { 
  width: 150px;
}

.search {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}
.header-input {
  width: 200px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--text-color);
  font-size: 14px;
  line-height: 19px;
}

.header-input:focus-visible {
  outline: none;
  border-bottom: 1px solid #16ACC9;
}

.header-select {
  width: 205px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--text-color);
  font-size: 14px;
  line-height: 19px;
  color: var(--text-color);
}

.select-option {
  font-size: 14px;
  line-height: 19px;
}

.header-select:focus-visible {
  outline: none;
  border-bottom: 1px solid var(--color-secondary);
}


.scroll-container {
  overflow-y: scroll;
  height: 50vh;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.6);
}

.scroll-container::-webkit-scrollbar {
  width: 10px;
}

.scroll-container::-webkit-scrollbar-track {
  -webkit-box-shadow: none;
  background-color: #7a7a83;
  border-radius: 10px;
}

.scroll-container::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: var(--color-primary);
}
</style>