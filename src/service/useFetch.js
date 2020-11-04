import { useState, useEffect } from 'react'
import { firebaseDB } from '../firebaseConfig'
import date from '../utils/utils'

export default function useFetch() {
  const [measurements, setMeasurements] = useState([])

  useEffect(() => {
    const user = localStorage.getItem('user')
    firebaseDB.ref(`${user}`).on('value', (snapshot) => {
      let allData = []
      snapshot.forEach((snap) => {
        allData.push({ key: snap.key, ...snap.val() })
      })
      setMeasurements(allData)
    })
  }, [])

  const isTodayAlreadyMeasured = () => {
    if (measurements.length === 0) {
      return false
    }

    if (measurements[measurements.length - 1].date === date()) {
      console.log('Current date already measured: ', measurements[0].date)
      return true
    }
    return false
  }

  return { measurements, isTodayAlreadyMeasured }
}
