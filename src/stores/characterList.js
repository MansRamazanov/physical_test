import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useCharacterListStore = defineStore("characterListStore", () => {
  const characters = ref([]);
  const currentPage = ref(1);
  const allCharacters = ref([]);

  async function getCharactersInfo() {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character/?page=1"
      );
      // console.log(response.data);
      characters.value.push(...response.data.results);
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }

  async function getNextPage() {
    currentPage.value++;
    if (currentPage.value > 42) {
      return
    }
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?page=${currentPage.value}`
      );
      characters.value.push(...response.data.results);
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }

  async function getAllCharacters() {

    for (let i = 1; i <= 42; i++) {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/?page=${i}`
        );
        allCharacters.value.push(...response.data.results);
      } catch (error) {
        console.error(error);
        console.log(error);
      }
    }
  }

  getAllCharacters();

  return { characters, allCharacters, getCharactersInfo, getNextPage };
});
