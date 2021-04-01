import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Dropdown } from 'react-bootstrap';
import CityImgReducer from '@Reducer/City/CityImgReducer';
import CityLoadReducer from '@Reducer/City/CityLoadReducer';
import CityApi from '@Api/CityApi';
import Card from '@Common/Widgets/Card';
import useFetchData from '@Hooks/useFetchData';

function City() {
  /* Global & Local State */
  const [imgState, imgDispatch] = useReducer(CityImgReducer, {
    images: [],
    fetching: false,
  });
  const [loadState, loadDispatch] = useReducer(CityLoadReducer, { load: 0 });
  const [initState, setInitState] = useState(true);
  const [selectCountry, setSelectCountry] = useState([]);

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
          if (entry.intersectionRatio > 0.1) {
            return loadDispatch({ type: 'LOAD_REQUEST' });
          }
        });
      }).observe(node);
    },
    [loadDispatch]
  );

  /* Hooks */
  console.log('CityApi', CityApi);
  useFetchData(CityApi, loadState, imgDispatch, 'city', selectCountry);
  useEffect(() => {
    if (initState && bottomBoundaryRef.current) {
      return;
    }

    a(bottomBoundaryRef.current);
  }, [bottomBoundaryRef.current]);

  /* function */

  const handleOnClick = (e) => {
    imgDispatch({ type: 'CLEAR_DATA' });
    loadDispatch({ type: 'CLEAR_REQUEST' });
    if (countrylist[e.target.innerText]) {
      setSelectCountry(countrylist[e.target.innerText]);
    } else return 'Please select a country';

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
        ? imgState.images.map((data, id) => <Card data={data} id={id} />)
        : null}
      <div
        id="page-bottom-boundary"
        style={{ border: '1px solid gray', marginTop: '50px' }}
        ref={bottomBoundaryRef}
      ></div>
    </>
  );
}

export default City;
