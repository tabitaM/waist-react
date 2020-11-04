import React, { useState } from 'react'
import firebase, { auth } from 'firebase/app'
import date from '../utils/utils'
import useFetch from '../service/useFetch'
import { useHistory } from 'react-router-dom'

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
    if (isTodayAlreadyMeasured()) {
      window.alert('You already set a measurement for today!')
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
    <div>
      <h1> Dashboard page</h1>
      <h4>bicep: {measurement.bicep}</h4>
      <div>
        <input
          type="text"
          placeholder="waist"
          name="waist"
          value={measurement.waist}
          onChange={(event) => onChangeHandler(event)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="bicep"
          name="bicep"
          value={measurement.bicep}
          onChange={(event) => onChangeHandler(event)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="chest"
          name="chest"
          value={measurement.chest}
          onChange={(event) => onChangeHandler(event)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="weight"
          name="weight"
          value={measurement.weight}
          onChange={(event) => onChangeHandler(event)}
        />
      </div>
      <div>
        <button type="submit" onClick={addMeasurement}>
          Add measure
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            firebase.auth().signOut()
            localStorage.removeItem('user')
            navigate.push('')
            console.log('Logged out')
          }}
        >
          Logout
        </button>
      </div>
    </div>
  )
}
