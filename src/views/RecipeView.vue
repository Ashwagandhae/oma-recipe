<script setup lang="ts">
// routerlink
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="recipe" v-on:scroll="scroll()">
    <header :class="{ collapse: collapseHeader }">
      <h2>{{ name }}</h2>
      <div class="progress" :style="{ width: scrollProgress + '%' }"></div>
    </header>
    <h1>Ingredients</h1>
    <Ingredients :ingredients="ingredients"></Ingredients>
    <h1>Instructions</h1>
    <Instructions :instructions="instructions"></Instructions>
    <footer>
      <h2 v-scroll-in="-0.05">All done!</h2>
      <ul v-scroll-in="-0.05">
        <RouterLink to="/">Home</RouterLink>
      </ul>
    </footer>
  </div>
</template>

<script lang="ts">
import Ingredients from '../components/Ingredients.vue';
import Instructions from '../components/Instructions.vue';
import type {
  Recipe,
  Ingredient,
  Instruction,
  InstructionFilled,
} from '../types';

export default {
  name: 'Recipe',
  data() {
    return {
      name: '',
      ingredients: [] as Ingredient[],
      instructions: [] as InstructionFilled[],
      scrollProgress: 0,
      collapseHeader: false,
      lastScrollPosition: 0,
    };
  },
  components: {
    Ingredients,
    Instructions,
  },
  created() {
    window.addEventListener('scroll', this.scroll);
    this.fetchData();
  },
  watch: {
    $route: 'fetchData',
  },
  unmounted: function () {
    window.removeEventListener('scroll', this.scroll);
  },
  methods: {
    fetchData: async function () {
      if (this?.$route?.params?.name) {
        const dataRaw = await import(
          `../assets/${this.$route.params.name}.json`
        );

        const data: Recipe = await dataRaw.default;

        this.ingredients = [...data.ingredients];
        // add ingredient info to Instructions
        let ingredientDict: { [key: string]: Ingredient } = {};
        for (let ingredient of this.ingredients) {
          ingredientDict[ingredient.name] = { ...ingredient };
        }
        let instructionsWithIngredients = [...data.instructions].map(
          (instruction) => {
            let newInstruction: InstructionFilled = {
              ...instruction,
              ingredients: [],
            };
            if (instruction?.ingredients?.length > 0) {
              newInstruction.ingredients = instruction.ingredients.map(
                function (i) {
                  return { ...ingredientDict[i] };
                }
              );
            }
            return newInstruction;
          }
        );
        this.instructions = [...instructionsWithIngredients];
        this.name = data.name;
      }
    },
    scroll: function () {
      let winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      let height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      this.scrollProgress = (winScroll / height) * 100;

      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      // this.collapseHeader = currentScrollPosition > this.lastScrollPosition;
      this.collapseHeader = currentScrollPosition > 20;
      this.lastScrollPosition = currentScrollPosition;
    },
  },
};
</script>

<style scoped>
.recipe {
  margin: 40vmin auto;
  width: clamp(70vw, 90vw, 60rem);
}
header {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 2;
  width: 100%;
  height: auto;
  text-align: center;
  pointer-events: none;
}
header > h2 {
  margin-top: calc(40px + 1rem + 1em);
  transition: font-size 0.5s, margin 0.5s;
  font-size: max(7vw, 7vmax);
}

header.collapse > h2 {
  margin-top: 16px;
  font-size: 30px;
}
.progress {
  height: 5px;
  top: calc(4rem - 5px);

  position: fixed;
  width: 100%;
  background-color: var(--background-three);
}
footer {
  text-align: center;
  width: 100%;
  height: auto;
  margin: 10em auto;
}
footer > h2 {
  font-size: 7vmax;
}
footer > ul {
  list-style-type: none;
  display: block;
  width: max-content;
  margin: auto;
  padding: 0;
}
footer > ul > a {
  display: inline-block;
  padding: var(--padding-two);
  position: relative;
  width: max-content;
  text-align: center;
  transition: background-color 0.3s;
  cursor: default;
  color: var(--color-two);
}
footer > ul > a:hover {
  background-color: var(--background-two);
}
</style>
