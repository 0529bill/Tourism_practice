import { useEffect } from 'react';
import _ from 'lodash';

export default function useFetchCityApi(
  Apis,
  loadState,
  imgDispatch,
  status,
  selectCountry
) {
  useEffect(() => {
    if (status === 'city') {
      if (selectCountry.length === 0) {
        return;
      }
    }

    async function fetchData() {
      imgDispatch({ type: 'FETCH_DATA', fetching: true });

      let data = await Apis(
        loadState.load === 0 ? 0 : loadState.load - 30,
        selectCountry
      );

      if (data === 'error') {
        console.log('error fetching data');
        return;
      }

      imgDispatch({ type: 'STACK_IMAGE', data });

      imgDispatch({ type: 'FETCH_DATA', fetching: false });
    }
    fetchData();
  }, [loadState.load]);
}
