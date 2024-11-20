import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useLocationListStore = defineStore("locationListStore", () => {
  const locations = ref([]);
  const currentPage = ref(1);

  async function getLocationsInfo() {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/location/?page=1"
      );
    //   console.log(response.data);
      locations.value.push(...response.data.results);
      getNextPage();
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }

  async function getNextPage() {
    currentPage.value++;
    if (currentPage.value > 7) {
      return
    }
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/location/?page=${currentPage.value}`
      );
      locations.value.push(...response.data.results);
      getNextPage();
    } catch (error) {
      console.error(error);
      console.log(error);
    }
  }



  return { locations, getLocationsInfo };
});
