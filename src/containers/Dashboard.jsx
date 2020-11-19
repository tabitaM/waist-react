import React from 'react'
import MeasurementForm from '../components/MeasurementForm'
import MeasurementList from '../components/MeasurementList'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import styled from 'styled-components'

export default function Dashboard() {
  return (
    <div>
      <Title> your measurements.</Title>
      <Row>
        <Col xs={5}>
          <MeasurementForm />
        </Col>
        <Col xs={7}>
          <MeasurementList />
        </Col>
      </Row>
    </div>
  )
}

const Title = styled.p`
  text-align: center;
  font-size: 25px;
  margin: 70px 0 100px 0;
`
