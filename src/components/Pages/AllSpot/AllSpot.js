import React, {
  useReducer,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { Card, Button } from 'react-bootstrap';
import useFetchAllSpot from '@Hooks/useFetchAllSpot';
import LoadReducer from '@Reducer/AllSpot/LoadReducer';
import ImgReducer from '@Reducer/AllSpot/ImgReducer';

function AllSpot() {
  const [loadState, loadDispatch] = useReducer(LoadReducer, { load: 0 });
  const [initState, setInitState] = useState(true);
  const [disableList, setDisableList] = useState([]);
  const [clickEvent, setClickEvent] = useState(false);
  const [imgState, imgDispatch] = useReducer(ImgReducer, {
    images: [],
    fetching: true,
  });

  console.log('loadState', loadState);
  console.log('imgState', imgState);
  //   useEffect(() => {
  //     if (loadState.load === 30 || loadState.load === 0) {
  //       return;
  //     }
  //     handleOnClick();
  //   }, [loadState.load]);

  let bottomBoundaryRef = useRef(null);
  let a = useCallback(
    (node) => {
      return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          console.log('entry', entry);
          if (entry.intersectionRatio > 0) {
            return loadDispatch({ type: 'LOAD_REQUEST' });
          }
        });
      }).observe(node);
    },
    [loadDispatch]
  );

  useEffect(() => {
    console.log('a first ');
    console.log('initFirst', initState);
    // if (initState) {
    //   return;
    // }
    console.log('a triggeted');
    a(bottomBoundaryRef.current);
  }, [a, bottomBoundaryRef.current]);

  /* function */

  useFetchAllSpot(loadState, imgDispatch);
  const handleOnClick = async (e) => {
    console.log('onClicked!');
    setInitState(false);
    // // if (disableList.includes(e.target.innerText)) {
    // //   return;
    // // } else {
    // //   setDisableList([...disableList, e.target.innerText]);
    // // }
  };
  console.log('imgState.images ', imgState.images);
  return (
    <>
      <h1>All Spots</h1>
      <div>
        {imgState.images ? (
          imgState.images.map((data) => (
            <Card
              style={{ width: '18rem' }}
              key={data.ID}
              style={{
                width: '300px',
                maxHeight: '500px',
              }}
            >
              <Card.Img
                variant="top"
                src={data.Picture ? data.Picture.PictureUrl1 : 'no picture rn'}
              />
              <Card.Body>
                <Card.Title>{data.Name}</Card.Title>
                <Card.Text>
                  {data.Description ? data.Description : data.DescriptionDetail}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div>c9</div>
        )}
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
