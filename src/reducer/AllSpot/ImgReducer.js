export default function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, fetching: action.fetching };
    case 'STACK_IMAGE':
      return { ...state, images: state.images.concat(action.data) };
  }
}
