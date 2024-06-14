import * as Foods from "@/store/actions/foods";

export interface FoodItem{
  amountInStock: number;
  cost: number;
  image: string;
  name: string;
  options?: string[];
  price: number;
  ingredients: string[];
  fileName: string
}

export interface Food {
  Foods: {
    [key: string]: FoodItem[]
  };
}

export const initialFoods: Food = {
  Foods: {},
};

export const Foods_Reducer = (state = initialFoods, action: {
  "type": string,
  "payload": {
      "Foods": string
  }
}) => {
  switch (action.type) {
    case Foods.SET_FOOD:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
