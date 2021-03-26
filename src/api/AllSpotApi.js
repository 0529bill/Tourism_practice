import axios from 'axios';

function CityApi(skipNum) {
  let skip = skipNum ? `&$skip=${skipNum}` : '';

  return axios
    .get(
      `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30${skip}&$format=JSON`
    )
    .then((response) => response.data)
    .catch((error) => 'error');
}

export default CityApi;
