import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Dropdown, Card, Button } from 'react-bootstrap';
import CityApis from '@Api/CityApis';
import ImgReducer from './Reducer/ImgReducer';
import LoadReducer from './Reducer/LoadReducer';

function City() {
  const [imgState, imgDispatch] = useReducer(ImgReducer, {
    images: [],
    fetching: true,
  });
  const [loadState, loadDispatch] = useReducer(LoadReducer, { load: 0 });

  console.log('loadState', loadState);

  useEffect(() => {
    if (loadState.load === 30 || loadState.load === 0) {
      return;
    }
    handleOnClick();
  }, [loadState.load]);

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
    if (bottomBoundaryRef.current && imgState.images) {
      a(bottomBoundaryRef.current);
    }
  }, [a, bottomBoundaryRef]);

  /* function */

  const handleOnClick = async () => {
    imgDispatch({ type: 'FETCH_DATA', fetching: true });
    let data = await CityApis(loadState.load === 0 ? 30 : loadState.load);
    console.log('data', data);
    if (data === 'error') {
      imgDispatch({ type: 'FETCH_DATA', fetching: false });
      return;
    }
    imgDispatch({ type: 'STACK_IMAGE', data });
  };
  console.log('imgState', imgState);
  console.log('loadState', loadState);

  /* Main */

  return (
    <>
      <div>City</div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleOnClick()}>台北市</Dropdown.Item>
          <Dropdown.Item>新北市</Dropdown.Item>
          <Dropdown.Item>桃園市</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {imgState.images
        ? imgState.images.map((data) => (
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
        : null}
      <div
        id="page-bottom-boundary"
        style={{ border: '1px solid red' }}
        ref={bottomBoundaryRef}
      ></div>
    </>
  );
}

export default City;
