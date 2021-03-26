export default function CityImgReducer(state, action) {
  console.log('state', state);
  console.log('action', action);
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, fetching: action.fetching };
    case 'STACK_IMAGE':
      return { ...state, images: state.images.concat(action.data) };
    case 'CLEAR_DATA':
      return { images: [], fetching: false };
  }
}
