import React, { useState } from 'react';
import { Dropdown, Card, Button } from 'react-bootstrap';
import CityApis from '@Api/CityApis';
// import CityApis from '../../../api/CityApis';

function City() {
  const [onClickData, setOnClickData] = useState();

  const handleOnClick = async () => {
    let data = await CityApis();
    setOnClickData(data);
  };

  console.log('onCLickData', onClickData);

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
      {onClickData
        ? onClickData.map((data) => (
            <>
              <Card style={{ width: '18rem' }} key={data.id}>
                <Card.Img
                  variant="top"
                  src={
                    data.Picture ? data.Picture.PictureUrl1 : 'no picture rn'
                  }
                />
                <Card.Body>
                  <Card.Title>{data.Name}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <Button variant="primary">Go somewhere</Button>
                </Card.Body>
              </Card>
            </>
          ))
        : null}
    </>
  );
}

export default City;
