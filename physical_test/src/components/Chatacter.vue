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

    .character-container {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid var(--color-primary);
        border-radius: 10px;
        color: var(--color-primary);
        margin-right: 10px;
        font-size: 14px;
        line-height: 19px;
    }
    .character-image {
        width: 40px;
    }
</style>