import React, { useRef, useState } from 'react'
import { auth, firebaseDB } from '../firebaseConfig'

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
    <div style={{ display: 'flex' }}>
      <div> Key: {recordKey}</div>
      <div> Waist: {waist}</div>
      <div> Bicep: {bicep}</div>
      <div> Chest: {chest}</div>
      <div> Weight: {weight}</div>
      <div>Date: {date}</div>
      <div>
        <button onClick={() => setEditable(true)}>Edit</button>
        <button onClick={deleteMeasurement}>Delete</button>
      </div>
      {editable && (
        <div>
          <input ref={waistRef} placeholder={waist}></input>
          <input ref={bicepRef} placeholder={bicep}></input>
          <input ref={chestRef} placeholder={chest}></input>
          <input ref={weightRef} placeholder={weight}></input>
          <button onClick={updateMeasurement}>Apply</button>
          <button onClick={() => setEditable(false)}>Cancel</button>
        </div>
      )}
    </div>
  )
}
