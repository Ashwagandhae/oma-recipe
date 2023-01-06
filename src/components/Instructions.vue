<template>
  <section class="instructions">
    <ul>
      <Instruction
        v-for="(instruction, index) in instructions"
        v-scroll-in
        :instruction="instruction"
        :key="index"
        :index="index"
      />
    </ul>
  </section>
</template>

<script lang="ts">
import Instruction from '@/components/Instruction.vue';
import type { InstructionFilled } from '@/types';

export default {
  name: 'Instructions',
  props: {
    instructions: Array as () => InstructionFilled[],
  },
  components: {
    Instruction,
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
