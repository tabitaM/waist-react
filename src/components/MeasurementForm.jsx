import React, { useState } from 'react'
import firebase, { auth } from 'firebase/app'
import date from '../utils/utils'
import useFetch from '../service/useFetch'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

export default function MeasurementForm() {
  const [measurement, setMesurement] = useState({
    waist: '',
    chest: '',
    bicep: '',
    weight: '',
  })

  const { isTodayAlreadyMeasured } = useFetch()
  const navigate = useHistory()

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget

    if (name === 'waist') {
      setMesurement({ ...measurement, waist: value })
    } else if (name === 'bicep') {
      setMesurement({ ...measurement, bicep: value })
    } else if (name === 'chest') {
      setMesurement({ ...measurement, chest: value })
    } else if (name === 'weight') {
      setMesurement({ ...measurement, weight: value })
    }
  }

  function addMeasurement() {
    //VALIDATIONS
    if (
      isNaN(measurement.waist) ||
      isNaN(measurement.bicep) ||
      isNaN(measurement.chest) ||
      isNaN(measurement.weight)
    ) {
      window.alert('Wrong measurement! ')
      setMesurement({ waist: '', chest: '', bicep: '', weight: '' })
      return
    }
    if (
      !measurement.waist ||
      !measurement.bicep ||
      !measurement.chest ||
      !measurement.weight
    ) {
      window.alert('Field cannot be empty! ')
      setMesurement({ waist: '', chest: '', bicep: '', weight: '' })
      return
    }
    if (isTodayAlreadyMeasured()) {
      window.alert('You already set a measurement for today!')
      setMesurement({ waist: '', chest: '', bicep: '', weight: '' })
      return
    }

    firebase.database().ref(`/${auth().currentUser.uid}`).push({
      waist: measurement.waist,
      bicep: measurement.bicep,
      chest: measurement.chest,
      weight: measurement.weight,
      date: date(),
    })

    // reset input
    setMesurement({ waist: '', chest: '', bicep: '', weight: '' })
  }

  return (
    <ContainerWrapper>
      <AddMeasurementSection>
        <Input>
          <InputData
            type="text"
            placeholder="waist"
            name="waist"
            value={measurement.waist}
            onChange={(event) => onChangeHandler(event)}
          />
        </Input>
        {isNaN(measurement.waist) ? 'not a number' : ''}

        <Input>
          <InputData
            type="text"
            placeholder="bicep"
            name="bicep"
            value={measurement.bicep}
            onChange={(event) => onChangeHandler(event)}
          />
        </Input>
        {isNaN(measurement.bicep) ? 'not a number' : ''}

        <Input>
          <InputData
            type="text"
            placeholder="chest"
            name="chest"
            value={measurement.chest}
            onChange={(event) => onChangeHandler(event)}
          />
        </Input>
        {isNaN(measurement.chest) ? 'not a number' : ''}

        <Input>
          <InputData
            type="text"
            placeholder="weight"
            name="weight"
            value={measurement.weight}
            onChange={(event) => onChangeHandler(event)}
          />
        </Input>
        {isNaN(measurement.weight) ? 'not a number' : ''}

        <AddMeasurementButton
          variant="light"
          type="submit"
          onClick={addMeasurement}
        >
          Add measure
        </AddMeasurementButton>
      </AddMeasurementSection>

      <div>
        <LogoutButton
          variant="light"
          onClick={() => {
            firebase.auth().signOut()
            localStorage.removeItem('user')
            navigate.push('')
            console.log('Logged out')
          }}
        >
          Logout
        </LogoutButton>
      </div>
    </ContainerWrapper>
  )
}

const ContainerWrapper = styled(Container)``

const AddMeasurementSection = styled.div`
  margin: 2em 0 0 5em;
`

const LogoutButton = styled(Button)`
  position: absolute;
  bottom: 40px;
  right: 40px;
  background-color: #65656b;
  border-color: #65656b;
  position: fixed;
`

const Input = styled(InputGroup)`
  width: 40%;
  margin-bottom: 1em;
`
const InputData = styled(FormControl)`
  background-color: #9999a0;
  border-color: #9999a0;
`

const AddMeasurementButton = styled(Button)`
  border-color: #f3591e;
  background-color: #f3591e;
  margin-left: 2em;
`
