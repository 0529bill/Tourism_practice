export default function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_DATA':
      return { ...state, fetching: action.fetching };
    case 'STACK_IMAGE':
      let data = state.images.concat(action.data);
      let stacked = [
        ...new Map(data.map((item) => [item['ID'], item])).values(),
      ];
      return { ...state, images: stacked };
  }
}
