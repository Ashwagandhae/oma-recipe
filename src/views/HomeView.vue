<template>
  <div class="home">
    <h1>Oma Recipes</h1>
    <div class="grid">
      <RecipeCard
        v-for="(recipeCard, index) in recipeCards"
        v-scroll-in
        :key="index"
        :recipeCard="recipeCard"
      ></RecipeCard>
    </div>
  </div>
</template>

<script lang="ts">
import RecipeCard from '../components/RecipeCard.vue';

export default {
  name: 'Home',
  data() {
    return {
      recipeCards: [
        {
          name: 'Oma Kuchen',
          text: 'A marbled cake with a chocolate coating',
          link: {
            name: 'omaKuchen',
          },
        },
        {
          name: 'Butter Plätzchen',
          text: 'Cookies of flour, butter, and sugar',
          link: {
            name: 'butter',
          },
        },
        {
          name: 'Rum Kugeln',
          text: 'Spheres of chocolate, coffee, rum, and coconut',
          link: {
            name: 'rumKugeln',
          },
        },
        {
          name: 'Apfel Pfannkuchen',
          text: 'A pancake with sliced apples',
          link: {
            name: 'apfelPfannkuchen',
          },
        },
        {
          name: 'Something else',
          link: {
            name: 'omaKuchen',
          },
        },
        {
          name: 'Something',
          link: {
            name: 'omaKuchen',
          },
        },
        {
          name: 'Something else',
          link: {
            name: 'omaKuchen',
          },
        },
        {
          name: 'Something else',
          link: {
            name: 'omaKuchen',
          },
        },
      ],
    };
  },
  components: {
    RecipeCard,
  },
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(18em, 1fr));
  grid-gap: 20px;
  align-items: stretch;
}
.home {
  text-align: center;
  margin: 40vmin auto;
  width: clamp(70vw, 90vw, 60rem);
}
</style>
