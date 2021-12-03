import * as actions from "../actions/giphyActions";

const defaultState = {
  searchKeyword: ''
}

export const giphyReducer = (state = defaultState, action: any) => {
  switch (action.type) {
    case actions.SET_KEYWORD:
      return {
        ...state,
        searchKeyword: action.payload
      };
    default:
      return state;
  }
}
