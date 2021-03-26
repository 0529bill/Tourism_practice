import { useReducer, useEffect } from 'react';

import CityApi from '@Api/CityApi';

export default function useFetchCityApi(
  initState,
  loadState,
  imgDispatch,
  selectCountry
) {
  //   if (!clickEvent) {
  //     return;
  //   }
  // if (disableList.includes(e.target.innerText)) {
  //   return;
  // } else {
  //   setDisableList([...disableList, e.target.innerText]);
  // }

  useEffect(() => {
    if (initState) {
      return;
    }
    async function fetchData() {
      console.log('triggeredUseFetch');
      imgDispatch({ type: 'FETCH_DATA', fetching: true });
      let data = await CityApi(
        loadState.load === 0 ? 0 : loadState.load - 30,
        selectCountry
      );

      if (data === 'error') {
        imgDispatch({ type: 'FETCH_DATA', fetching: true });
        return;
      }
      imgDispatch({ type: 'STACK_IMAGE', data });
      console.log('images is send');
    }
    fetchData();
  }, [loadState.load]);
}
