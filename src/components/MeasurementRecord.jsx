import React from 'react'
import firebase from 'firebase/app'

export default function MeasurementRecord({
  recordKey,
  waist,
  bicep,
  chest,
  weight,
  setMeasurements,
}) {
  // const snapshot = await firebase.database().ref(recordKey).once('value')

  async function updateMeasurement() {
    await firebase.database().ref(recordKey).once('value')
  }

  return (
    <div style={{ display: 'flex' }}>
      <div> Key: {recordKey}</div>
      <div> Waist: {waist}</div>
      <div> Bicep: {bicep}</div>
      <div> Chest: {chest}</div>
      <div> Weight: {weight}</div>
      <div>
        <button onClick={updateMeasurement}>Edit</button>
        <button onClick={() => {}}>Delete</button>
      </div>
    </div>
  )
}
