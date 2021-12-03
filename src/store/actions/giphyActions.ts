export const SET_KEYWORD = 'SET_KEYWORD';

export const setSearchKeyword = (keyword: string) => {
  return {
    type: SET_KEYWORD,
    payload: keyword
  }
}
