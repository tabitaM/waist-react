import React, { useRef, useState } from 'react'
import firebase from 'firebase/app'

export default function MeasurementRecord({
  recordKey,
  waist,
  bicep,
  chest,
  weight,
  setMeasurements,
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
    const measurement = firebase.database().ref(recordKey)

    // update measurement in firebase db
    measurement.update({
      waist: waistRef.current.value || waist,
      bicep: bicepRef.current.value || bicep,
      chest: chestRef.current.value || chest,
      weight: weightRef.current.value || weight,
    })
  }

  return (
    <div style={{ display: 'flex' }}>
      <div> Key: {recordKey}</div>
      <div> Waist: {waist}</div>
      <div> Bicep: {bicep}</div>
      <div> Chest: {chest}</div>
      <div> Weight: {weight}</div>
      <div>
        <button onClick={() => setEditable(true)}>Edit</button>
        <button onClick={() => {}}>Delete</button>
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
