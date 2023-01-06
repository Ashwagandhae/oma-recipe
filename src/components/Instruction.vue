<template>
  <div
    class="instruction"
    :class="{
      checked: checked,
      bake: instruction.title.toLowerCase().includes('bake'),
    }"
  >
    <div class="content">
      <h2 v-on:click="checked = !checked" class="title">
        <span class="index">{{ index + 1 }}</span>
        {{ instruction.title }}
      </h2>
      <p>{{ instruction.text }}</p>
    </div>
    <div class="help" v-if="instruction?.ingredients?.length > 0">
      <ul>
        <Ingredient
          v-for="(ingredient, index) in instruction.ingredients"
          :ingredient="ingredient"
          :checkbox="false"
          :key="index"
        />
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Ingredient from '@/components/Ingredient.vue';
import type { InstructionFilled } from '@/types';

export default {
  name: 'instructions',
  data() {
    return {
      checked: false,
    };
  },
  props: {
    instruction: {
      type: Object as () => InstructionFilled,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  components: {
    Ingredient,
  },
};
</script>

<style scoped>
.instruction {
  position: relative;
  margin: 20px 0;
  width: 100%;
}
.content {
  width: inherit;
  height: 100%;
  padding: 4vmin;
  transition: color 0.3s;
}
.checked .content,
.checked .title {
  color: var(--color-weak);
}

.title {
  cursor: default;
  transition: color 0.3s;
}
@keyframes check {
  from {
    transform: scale(1.2);
  }

  30% {
    transform: scale(0.9);
  }

  to {
    transform: scale(1.2);
  }
}
.index {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-family: var(--font);
  font-size: 0.8em;
  width: 1em;
  height: 1em;
  padding: 0.3em;
  margin: 0px;
  text-align: center;
  border-radius: 100px;
  transition: background 0.3s, transform 0.3s;
}
.instruction {
  text-align: left;
  width: inherit;
  background-color: var(--background-two);
}
.instruction.bake {
  background-color: var(--background-bake);
}
.instruction:hover .index {
  background-color: var(--background-three);
}
.title:hover .index {
  transform: scale(1.2);
}
.checked .index {
  animation-name: check;
  animation-duration: 0.5s;
}

.help {
  position: absolute;
  top: 0;
  right: 0;
  width: min(30%, max-content);
  height: calc(100% - 20px);
  overflow: scroll;
  background: var(--background-three);
  padding: var(--padding) var(--padding-two);
  margin: 0;

  clip-path: circle(20px at 100% 0%);
  transition: clip-path 0.8s;
}
.instruction:hover .help {
  clip-path: circle(50px at 100% 0%);
  transition: clip-path 0.3s;
}
.instruction:hover .help:hover {
  clip-path: circle(150% at 100% 50%);
  transition: clip-path 0.8s;
}
.help ul {
  padding: 0;
  margin: 0;
  width: auto;
}

p {
  margin: 0;
}
span {
  padding: 0 0.15em;
}
</style>
