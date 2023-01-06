<template>
  <section class="ingredients">
    <ul>
      <Ingredient
        v-for="(ingredient, index) in ingredients"
        v-scroll-in
        :ingredient="ingredient"
        :checkbox="true"
        :key="index"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import Ingredient from '@/components/Ingredient.vue';
import type { Ingredient as TIngredient } from '../types';

export default {
  name: 'Ingredients',
  props: {
    ingredients: Array as () => TIngredient[],
  },
  components: {
    Ingredient,
  },
};
</script>

<style scoped>
.ingredients {
  text-align: left;
  background-color: var(--background-two);
}

ul {
  list-style: none;
  padding: 4vmin;
}
</style>
