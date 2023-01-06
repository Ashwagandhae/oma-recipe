<template>
  <div
    class="ingredient"
    :class="{ checked: checked }"
    v-on:click="
      if (checkbox) {
        checked = !checked;
      }
    "
  >
    <button v-if="checkbox" class="check"></button>
    <input
      v-if="checkbox"
      type="checkbox"
      :checked="checked"
      class="hidden"
      aria-label="check ingredient"
      hidden
    />
    <span class="amount">{{ ingredient.amount }} </span>
    <span class="unit" v-if="ingredient.unit.length > 0"
      >{{ ingredient.unit }}
    </span>
    <span class="name">{{ toTitleCase(ingredient.name) }}</span>
  </div>
</template>

<script lang="ts">
import type { Ingredient } from '../types';

export default {
  name: 'Ingredient',
  data() {
    return {
      checked: false,
    };
  },
  methods: {
    toTitleCase: function (str: string) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      });
    },
  },
  props: {
    ingredient: {
      type: Object as () => Ingredient,
      required: true,
    },
    checkbox: Boolean,
  },
};
</script>

<style scoped>
.ingredient {
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.8ch;

  padding: var(--padding-two) var(--padding);
}

.check {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  background: var(--background-three);
  border: 5px solid var(--background-three);
  transition: background 0.3s, border 0.3s, transform 0.3s;
  vertical-align: middle;
}
.ingredient:hover .check {
  transform: scale(1.2);
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
.checked .check {
  animation-name: check;
  animation-duration: 0.5s;
  background: var(--color-two);
}
.amount {
  color: var(--color-two);
}
.unit {
  color: var(--color-two);
}
.amount,
.unit,
.name {
  transition: color 0.3s;
}
.checked .amount,
.checked .unit,
.checked .name {
  color: var(--color-weak);
}
</style>
