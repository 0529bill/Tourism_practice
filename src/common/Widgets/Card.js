import { Card as BootstrapCard, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { memo } from 'react';

function Card({ data, id }) {
  return (
    <>
      <Container>
        <Row key={id}>
          <Col md={{ span: 6, offset: 3 }} key={id}>
            <BootstrapCard style={{ width: '18rem' }}>
              <BootstrapCard.Img
                variant="top"
                src={data.Picture ? data.Picture.PictureUrl1 : 'no picture rn'}
              />
              <BootstrapCard.Body>
                <BootstrapCard.Title>{data.Name}</BootstrapCard.Title>
                <BootstrapCard.Text>
                  {data.Description ? data.Description : data.DescriptionDetail}
                </BootstrapCard.Text>
              </BootstrapCard.Body>
            </BootstrapCard>
          </Col>
        </Row>
      </Container>
    </>
  );
}

Card.propTypes = {
  data: PropTypes.object,
  id: PropTypes.number,
};

export default memo(Card);
