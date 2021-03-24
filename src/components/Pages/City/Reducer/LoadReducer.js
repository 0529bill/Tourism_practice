export default function LoadReducer(state, action) {
  switch (action.type) {
    case 'LOAD_REQUEST':
      return { ...state, load: state.load + 30 };
    default:
      return state;
  }
}
