import React, {
  useReducer,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import useFetchData from '@Hooks/useFetchData';
import LoadReducer from '@Reducer/AllSpot/LoadReducer';
import AllSpotApi from '@Api/AllSpotApi';
import Card from '@Common/Widgets/Card';
import ImgReducer from '@Reducer/AllSpot/ImgReducer';

function AllSpot() {
  /* Global & Local State */
  const [loadState, loadDispatch] = useReducer(LoadReducer, { load: 0 });
  const [initState, setInitState] = useState(true);
  const [imgState, imgDispatch] = useReducer(ImgReducer, {
    images: [],
    fetching: true,
  });

  console.log('loadState', loadState);
  console.log('imgState', imgState);
  console.log('allspot', AllSpotApi);

  let bottomBoundaryRef = useRef(null);
  let a = useCallback(
    (node) => {
      return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          console.log('entry', entry);
          if (entry.intersectionRatio > 0.1 && entry.isIntersecting) {
            loadDispatch({ type: 'LOAD_REQUEST' });
          }
        });
      }).observe(node);
    },
    [loadDispatch]
  );
  /* Hooks */
  useEffect(() => {
    console.log('setState');
    setInitState(true);
    a(bottomBoundaryRef.current);
  }, []);

  useEffect(() => {
    console.log(bottomBoundaryRef.current);
    if (!bottomBoundaryRef.current && initState) {
      return;
    }
    a(bottomBoundaryRef.current);
  }, [a, bottomBoundaryRef.current]);

  useFetchData(AllSpotApi, loadState, imgDispatch, 'allspot');
  /* function */

  /* Main */
  return (
    <>
      <h1>All Spots</h1>
      <div>
        {imgState.images
          ? imgState.images.map((data, id) => <Card data={data} id={id} />)
          : null}
      </div>
      <div
        id="page-bottom-boundary"
        style={{ border: '1px solid red' }}
        ref={bottomBoundaryRef}
      ></div>
    </>
  );
}

export default AllSpot;
