export type Ingredient = {
  name: string;
  amount: number;
  unit: string;
};
export type Instruction = {
  title: string;
  text: string;
  ingredients: string[];
};
export type InstructionFilled = Omit<Instruction, 'ingredients'> & {
  ingredients: Ingredient[];
};
export type Recipe = {
  name: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
};
