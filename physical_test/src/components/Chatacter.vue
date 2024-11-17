<template>
    <div class="character-container">
        <img :src="props.image" alt="Character image" class="character-image">
        <div class="info-container">
            <div>Name: <span>{{ props.name }}</span></div>
            <div>Status: <span>{{ props.status }}</span></div>
            <div>Location: <span>{{ props.location }}</span></div>
        </div>
    </div>
</template>
<script setup lang="ts">
interface Props {
  name: string;
  status: string;
  location: string;
  image: string;
}

const props = defineProps<Props>();

</script>
<style scoped>
    
</style>