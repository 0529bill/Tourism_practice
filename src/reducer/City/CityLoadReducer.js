export default function CityLoadReducer(state, action) {
  console.log('CItyReducerloadState', state);
  console.log('CityReducerloadAction', action);
  switch (action.type) {
    case 'LOAD_REQUEST':
      return { ...state, load: state.load + 30 };
    case 'CLEAR_REQUEST':
      return { load: 0 };
    default:
      return;
  }
}
