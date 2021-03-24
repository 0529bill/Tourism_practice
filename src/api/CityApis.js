import axios from 'axios';

function CityApis() {
  return axios
    .get(
      'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON'
    )
    .then((response) => response.data)
    .catch((error) => console.log(error));
}

export default CityApis;
