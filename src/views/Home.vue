<template>
  <div class="container">
    <div class="header">
      <img src="../assets/img/Rick_and_Morty.svg.png" alt="logo" class="logo">
      <div class="search">
          <input type="text" id="search" placeholder="Введите имя персонажа" class="header-input" v-model="searchString" v-on:change="onChangeSelected">
          <select name="location" id="location" class="header-select" v-model="selectValue" @change="onChangeSelected">
              <option value="" selected class="select-option">Выберите локацию</option>
              <option v-for="location in locations" :value="location.name" class="select-option">{{ location.name }}</option>

          </select>
      </div>
    </div>
    <main class="main">
      <div v-infinite-scroll="[onLoadMore, { distance: 20 }]" class="scroll-container">
        <div v-for="character in characterList">
          <Character :name="character.name" :status="character.status" :image="character.image" :location="character.location.name"/>
        </div>
      </div>
      <Game class="game"/>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useCharacterListStore } from "../stores/characterList";
import { useLocationListStore } from "../stores/locationList";
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { vInfiniteScroll } from '@vueuse/components'
import Character from "../components/Chatacter.vue";
import Game from "../components/Game.vue";

const characterListStore = useCharacterListStore();
const { characters, allCharacters } = storeToRefs(characterListStore);
const { getCharactersInfo } = characterListStore;

const locationListStore = useLocationListStore();
const { locations } = storeToRefs(locationListStore);
const { getLocationsInfo } = locationListStore;

onMounted(async () => {
  // console.log(characters.value);
  // console.log(locations.value);
  await getCharactersInfo();
  await getLocationsInfo();
  // console.log(characters.value);
  // console.log(locations.value);
});

let searchString = ref("");
let selectValue = ref("");
// console.log(selectValue);
// console.log(searchString)


function onLoadMore() {
  characterListStore.getNextPage();
};

let characterList = computed(() => {
  // console.log(characters.value);
  if (searchString.value === "" && selectValue.value === "") {
    return characters.value;
  } else if (searchString.value === "" && selectValue.value) {
    return allCharacters.value.filter(
      (character) =>
        character.location.name
          .toLowerCase()
          .includes(selectValue._value.toLowerCase()) &&
          character.name
    );
  } else if (searchString.value && selectValue.value === "") {
    return allCharacters.value.filter((character) =>
      character.name
        .toLowerCase()
        .includes(searchString.value.trim().toLowerCase())
    );
  } else if (searchString.value && selectValue.value) {
    return allCharacters.value.filter(
      (character) =>
        character.name
          .toLowerCase()
          .includes(searchString.value.trim().toLowerCase()) &&
        character.location.name
          .toLowerCase()
          .includes(selectValue._value.toLowerCase())
    );
  }
});

function onChangeSelected() {
  let characterList = computed(() => {
  console.log(characters.value);
  if (searchString.value === "" && selectValue.value === "") {
    return characters.value;
  } else if (searchString.value === "" && selectValue.value) {
    return allCharacters.value.filter(
      (character) =>
        character.location.name
          .toLowerCase()
          .includes(selectValue._value.toLowerCase()) &&
          character.name
    );
  } else if (searchString.value && selectValue.value === "") {
    return allCharacters.value.filter((character) =>
      character.name
        .toLowerCase()
        .includes(searchString.value.trim().toLowerCase())
    );
  } else if (searchString.value && selectValue.value) {
    return allCharacters.value.filter(
      (character) =>
        character.name
          .toLowerCase()
          .includes(searchString.value.trim().toLowerCase()) &&
        character.location.name
          .toLowerCase()
          .includes(selectValue._value.toLowerCase())
    );
  }
});
}

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
  max-width: 370px;
}
.header-input {
  width: 200px;
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--text-color);
  font-size: 14px;
  line-height: 19px;
  color: var(--text-color);
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
  color: black;
}

.header-select:focus-visible {
  outline: none;
  border-bottom: 1px solid var(--color-secondary);
}


.scroll-container {
  overflow-y: scroll;
  max-height: 45vh;
  margin-top: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  max-width: 360px;
  transition: 300ms;
}


.header-select::-webkit-scrollbar {
  width: 10px;
}

.header-select::-webkit-scrollbar-track {
  -webkit-box-shadow: none;
  background-color: transparent;
  border-radius: 10px;
}

.header-select::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: var(--color-primary);
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

.main {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (min-width: 320px) and (max-height: 740px) and (orientation: portrait) {

  .search {
    margin-top: 10px
  }
  .game {
  display: none;
}
.logo {
    width: 100px;
  }
  
}

@media screen and (min-width: 320px) and (max-height: 660px) and (orientation: landscape) {

  .search {
    margin-top: 10px
  }

.game {
  display: none;
}
  .logo {
    width: 100px;
  }

}


@media screen and (min-width: 768px) {
  
  .scroll-container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    max-width: 980px;
    transition: 300ms;
  }
  .search {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 30px;
    max-width: 500px;
  }
}

@media screen and (min-width: 1280px) {
  .scroll-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    max-width: 1280px;
    width: 100%;
    transition: 300ms;
  }
}
</style>