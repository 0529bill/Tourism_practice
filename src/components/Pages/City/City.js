import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Dropdown, Card, Button } from 'react-bootstrap';
import CityApi from '@Api/CityApi';
import CityImgReducer from '@Reducer/City/CityImgReducer';
import CityLoadReducer from '@Reducer/City/CityLoadReducer';
import useFetchCityApi from '@Hooks/useFetchCityApi';

function City() {
  const [imgState, imgDispatch] = useReducer(CityImgReducer, {
    images: [],
    fetching: false,
  });
  const [loadState, loadDispatch] = useReducer(CityLoadReducer, { load: 0 });
  const [initState, setInitState] = useState(true);
  const [selectCountry, setSelectCountry] = useState([]);

  const [disableList, setDisableList] = useState([]);

  /* data */
  let countrylist = {
    臺北市: 'Taipei',
    新北市: 'NewTaipei',
    桃園市: 'Taoyuan',
    臺中市: 'Taichung',
    臺南市: 'Tainan',
    高雄市: 'Kaohsiung',
    基隆市: 'Keelung',
    新竹市: 'Hsinchu',
    新竹縣: 'HsinchuCounty',
    苗栗縣: 'MiaoliCounty',
    彰化縣: 'ChanghuaCounty',
    南投縣: 'NantouCounty',
    雲林縣: 'YunlinCounty',
    嘉義縣: 'ChiayiCounty',
    嘉義市: 'Chiayi',
    屏東縣: 'PingtungCounty',
    宜蘭縣: 'YilanCounty',
    花蓮縣: 'HualienCounty',
    臺東縣: 'TaitungCounty',
    金門縣: 'KinmenCounty',
    澎湖縣: 'PenghuCounty',
    連江縣: 'LienchiangCounty',
  };

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
  useFetchCityApi(initState, loadState, imgDispatch, selectCountry);
  useEffect(() => {
    if (initState) {
      return;
    }

    a(bottomBoundaryRef.current);
  }, [a, bottomBoundaryRef.current]);

  console.log('imgState', imgState);

  /* function */

  const handleOnClick = (e) => {
    console.log('e', e);
    if (!e) {
      return;
    }

    imgDispatch({ type: 'CLEAR_DATA' });
    loadDispatch({ type: 'CLEAR_REQUEST' });
    if (countrylist[e.target.innerText]) {
      setSelectCountry(countrylist[e.target.innerText]);
    } else return;

    setInitState(false);
  };

  /* Main */

  return (
    <>
      <div>City</div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          Dropdown Button
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {Object.keys(countrylist).map((e, id) => (
            <Dropdown.Item key={id} onClick={(e) => handleOnClick(e)}>
              {e}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {imgState
        ? imgState.images.map((data, id) => (
            <Card
              style={{ width: '18rem' }}
              // key={data.ID}
              key={id}
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
        style={{ border: '1px solid red', marginTop: '50px' }}
        ref={bottomBoundaryRef}
      ></div>
    </>
  );
}

export default City;
