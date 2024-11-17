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
          <button class="header-button">Найти</button>
      </div>
    </div>
    <main class="main">
      <div v-infinite-scroll="[onLoadMore, { distance: 20 }]">
        <div v-for="character in characterList">
          <Character :name="character.name" :status="character.status" :image="character.image" :location="character.location.name"/>
        </div>
      </div>
      <!-- <RecycleScroller
    class="scroller"
    :items="characterList"
    :item-size="20"
    key-field="id"
    v-slot="{ item }"
  >
      </RecycleScroller> -->
    </main>
  </div>
</template>

<script setup lang="ts">
import { useCharacterListStore } from "../stores/characterList";
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { vInfiniteScroll } from '@vueuse/components'
import Character from "../components/Chatacter.vue";

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
  width: 100px;
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
  border-bottom: 1px solid #EDF5E1;
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
  border-bottom: 1px solid #EDF5E1;
  font-size: 14px;
  line-height: 19px;
  color: #EDF5E1;
}

.select-option {
  font-size: 14px;
  line-height: 19px;
}

.header-select:focus-visible {
  outline: none;
  border-bottom: 1px solid var(--color-secondary);
}

.header-button {
  width: 70px;
  height: 20px;
  background: var(--color-secondary);
  border: 1px solid var(--color-primary);
  border-radius: 10px;
  color: var(--color-primary);
  cursor: pointer;
  font-size: 14px;
}
</style>