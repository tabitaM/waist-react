import React, { useRef, useState } from 'react'
import { auth, firebaseDB } from '../firebaseConfig'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import styled from 'styled-components'
import FormControl from 'react-bootstrap/FormControl'

export default function MeasurementRecord({
  recordKey,
  waist,
  bicep,
  chest,
  weight,
  date,
  measurementsList,
}) {
  const [editable, setEditable] = useState(false)
  const waistRef = useRef(null)
  const bicepRef = useRef(null)
  const chestRef = useRef(null)
  const weightRef = useRef(null)

  const updateMeasurement = () => {
    // hide inputs
    setEditable(false)

    // get measurement from firebase db
    const measurement = firebaseDB.ref(`/${auth.currentUser.uid}/${recordKey}`)

    // update measurement in firebase db
    measurement.update({
      waist: waistRef.current.value || waist,
      bicep: bicepRef.current.value || bicep,
      chest: chestRef.current.value || chest,
      weight: weightRef.current.value || weight,
    })
  }

  const deleteMeasurement = () => {
    const measurement = firebaseDB.ref(`/${auth.currentUser.uid}/${recordKey}`)
    if (window.confirm('Are you sure you want to delete this record?'))
      measurement.remove()
  }

  return (
    <Wrapper>
      <Date>{date}</Date>
      <MeasureSize> {waist}</MeasureSize>{' '}
      <SpecificMeasureName>waist</SpecificMeasureName>
      <MeasureSize> {bicep}</MeasureSize>
      <SpecificMeasureName>bicep</SpecificMeasureName>
      <MeasureSize> {chest}</MeasureSize>
      <SpecificMeasureName>chest</SpecificMeasureName>
      <MeasureSize> {weight}</MeasureSize>
      <SpecificMeasureName>weight</SpecificMeasureName>
      <div>
        <Icon
          onClick={() => setEditable(true)}
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-pencil-fill"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
          />
        </Icon>

        <Icon
          onClick={deleteMeasurement}
          width="1em"
          height="1em"
          viewBox="0 0 16 16"
          class="bi bi-trash-fill"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7z"
          />
        </Icon>
      </div>
      {editable && (
        <div>
          <EditSection>
            <InputData ref={waistRef} placeholder={waist} />
            <InputData ref={bicepRef} placeholder={bicep} />
            <InputData ref={chestRef} placeholder={chest} />
            <InputData ref={weightRef} placeholder={weight} />{' '}
          </EditSection>
          <EditButton variant="light" onClick={updateMeasurement}>
            Apply
          </EditButton>
          <EditButton variant="light" onClick={() => setEditable(false)}>
            Cancel
          </EditButton>
        </div>
      )}
    </Wrapper>
  )
}

const EditButton = styled(Button)`
  background-color: #65656b;
  border-color: #65656b;
  width: fit-content;
  height: 30px;
  font-size: 12px;
  margin-top: 10px;
`

const Wrapper = styled(Container)`
  display: flex;
`

const EditSection = styled.div`
  display: flex;
`

const InputData = styled(FormControl)`
  width: 10%;
  margin-right: 5px;
`

const Icon = styled.svg`
  cursor: pointer;
  margin-left: 10px;
  color: #65656b;
  margin-top: 10px;
  :hover {
    color: #f3591e;
  }
`

const MeasureSize = styled.div`
  font-size: 40px;
  margin-right: 2px;
  color: #f3591e;
`

const SpecificMeasureName = styled.div`
  font-size: 10px;
  margin-right: 10px;
`

const Date = styled.div`
  font-size: 15px;
  margin: 15px 10px 0 0;
`
