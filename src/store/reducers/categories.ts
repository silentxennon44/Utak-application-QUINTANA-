import * as CategoryActions from "@/store/actions/categories";
import { menusCategories } from "@/staticData";

export interface CategoryState {
  category: string;
}

export const initialCategory: CategoryState = {
  category: menusCategories[0],
};

export const Category_Reducer = (state = initialCategory, action: {
  "type": string,
  "payload": {
      "category": string
  }
}) => {
  switch (action.type) {
    case CategoryActions.SET_CATEGORY:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
