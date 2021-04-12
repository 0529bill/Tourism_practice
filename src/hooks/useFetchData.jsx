import { useEffect } from 'react';

export default function useFetchCityApi(
  Apis,
  loadState,
  imgDispatch,
  status,
  selectCountry,
  state
) {
  useEffect(() => {
    if (status === 'city') {
      if (selectCountry.length === 0) {
        return;
      }
    }

    async function fetchData() {
      imgDispatch({ type: 'FETCH_DATA', fetching: true });

      window.localStorage.setItem('isFetching', true);
      let d = window.localStorage.getItem('isFetching');

      let data = await Apis(
        loadState.load === 0 ? 0 : loadState.load - 30,
        selectCountry
      );

      if (data === 'error') {
        return;
      }
      imgDispatch({ type: 'STACK_IMAGE', data });

      imgDispatch({ type: 'FETCH_DATA', fetching: false });
      window.localStorage.setItem('isFetching', false);
    }
    fetchData();
  }, [loadState.load]);
}
