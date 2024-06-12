import * as Foods from "@/store/actions/foods";

export interface Food {
  Foods: { [key: string]: Array<{ [key: string]: any}> };
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
