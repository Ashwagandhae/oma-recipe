<template>
  <div
    @click="$router.push({ name: 'Recipe', params: recipeCard.link })"
    class="recipeCard"
  >
    <h2>{{ recipeCard.name }}</h2>
    <p>{{ recipeCard.text }}</p>
  </div>
</template>

<script lang="ts">
export default {
  name: 'RecipeCards',
  props: {
    recipeCard: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.recipeCard {
  text-align: left;
  background-color: var(--background-two);
  display: block;
  padding: 4vmin;
  transition: background 0.3s;
  cursor: default;
}
.recipeCard:hover {
  background-color: var(--background-three);
}
</style>
