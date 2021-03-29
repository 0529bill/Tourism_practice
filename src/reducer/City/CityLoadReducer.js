export default function CityLoadReducer(state, action) {
  console.log('loadState', state);
  console.log('loadAction', action);
  switch (action.type) {
    case 'LOAD_REQUEST':
      return { ...state, load: state.load + 30 };
    case 'CLEAR_REQUEST':
      return { load: 0 };
    default:
      return state;
  }
}
