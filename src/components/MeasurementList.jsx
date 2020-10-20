import React, { useState, useEffect } from 'react'
import firebaseDb from '../firebaseConfig'
import MeasurementRecord from './MeasurementRecord'

export default function MeasurementList() {
  const [measurements, setMeasurements] = useState([])

  useEffect(() => {
    firebaseDb.on('value', (snapshot) => {
      let allData = []
      snapshot.forEach((snap) => {
        allData.push({ key: snap.key, ...snap.val() })
      })
      setMeasurements(allData)
    })
  }, [])

  return measurements.map((measurement) => (
    <MeasurementRecord
      key={measurements.indexOf(measurement)}
      recordKey={measurement.key}
      waist={measurement.waist}
      bicep={measurement.bicep}
      chest={measurement.chest}
      weight={measurement.weight}
    />
  ))
}
