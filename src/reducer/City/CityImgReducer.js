export default function CityImgReducer(state, action) {
  console.log('CityReducerstate', state);
  console.log('CityReduceraction', action);
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, fetching: action.fetching };
    case 'STACK_IMAGE':
      let data = state.images.concat(action.data);
      let stacked = [
        ...new Map(data.map((item) => [item['ID'], item])).values(),
      ];
      return { ...state, images: stacked };
    case 'CLEAR_DATA':
      return { images: [], fetching: false };
    default:
      return;
  }
}
