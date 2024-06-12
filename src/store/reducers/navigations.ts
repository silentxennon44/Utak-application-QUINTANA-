import * as NavigationActions from "@/store/actions/navigation";

export interface NavigationState {
  location: string;
}

export const initialNavigation: NavigationState = {
  location: "Overview",
};

export const Navigation_Reducer = (state = initialNavigation, action: any) => {
  switch (action.type) {
    case NavigationActions.SET_NAVIGATION:
      return Object.assign({}, state, action.payload);
    case NavigationActions.SET_IS_NO_LOC:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
