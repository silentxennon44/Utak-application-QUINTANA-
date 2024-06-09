import * as NagivationActions from "@/store/actions/navigation";

export interface NavigationState {
  location: string;
  isNoLoc: boolean;
  isLoading: boolean;
}

export const initialNavigation: NavigationState = {
  location: "home",
  isNoLoc: false,
  isLoading: true,
};

export const Navigation_Reducer = (state = initialNavigation, action: any) => {
  switch (action.type) {
    case NagivationActions.SET_LOCATION:
      return Object.assign({}, state, action.payload);
    case NagivationActions.SET_IS_NO_LOC:
      return Object.assign({}, state, action.payload);
    case NagivationActions.SET_IS_PAGE_LOADING:
      return Object.assign({}, state, action.payload);
    default:
      return state;
  }
};
