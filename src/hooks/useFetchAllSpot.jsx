import { useReducer, useEffect } from 'react';
import AllSpotApi from '@Api/AllSpotApi';

export default function useFetchAllSpot(loadState, imgDispatch) {
  //   if (!clickEvent) {
  //     return;
  //   }
  // if (disableList.includes(e.target.innerText)) {
  //   return;
  // } else {
  //   setDisableList([...disableList, e.target.innerText]);
  // }
  useEffect(async () => {
    imgDispatch({ type: 'FETCH_DATA', fetching: true });
    let data = await AllSpotApi(loadState.load === 0 ? 0 : loadState.load);

    if (data === 'error') {
      console.log('error', data);

      imgDispatch({ type: 'FETCH_DATA', fetching: false });
      return;
    }
    imgDispatch({ type: 'STACK_IMAGE', data });
  }, [loadState]);
}
