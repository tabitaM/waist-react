import React, { useState } from 'react'
// import firebase from 'firebase/app'
import firebase from '../firebaseConfig'

export default function Dashboard() {
  const [waist, setWaist] = useState(0)
  const [chest, setChest] = useState(0)
  const [bicep, setBicep] = useState(0)
  const [weight, setWeight] = useState(0)

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget

    if (name === 'waist') {
      setWaist(value)
    } else if (name === 'chest') {
      setChest(value)
    } else if (name === 'bicep') {
      setBicep(value)
    } else if (name === 'weight') {
      setWeight(value)
    }
  }

  function addMeasurement(waist, chest, bicep, weight) {
    firebase.push({
      waist: waist,
      chest: chest,
      bicep: bicep,
      weight: weight,
    })
  }

  async function onHandleSubmit(event) {
    event.preventDefault()
    setWeight('')
  }

  return (
    <div>
      <h1> Dashboard page</h1>
      <div>
        <input
          type="text"
          placeholder="waist"
          name="waist"
          onChange={(event) => onChangeHandler(event)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="chest"
          name="chest"
          onChange={(event) => onChangeHandler(event)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="bicep"
          name="bicep"
          onChange={(event) => onChangeHandler(event)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="weight"
          name="weight"
          onChange={(event) => onChangeHandler(event)}
        />
      </div>
      <button
        onClick={() => {
          addMeasurement(waist, chest, bicep, weight)
        }}
        onSubmit={onHandleSubmit}
      >
        Add measure
      </button>
    </div>
  )
}
