import React from 'react'
import MeasurementRecord from './MeasurementRecord'
import useFetch from '../service/useFetch'

export default function MeasurementList() {
  const { measurements } = useFetch()

  return measurements.map((measurement) => (
    <MeasurementRecord
      key={measurements.indexOf(measurement)}
      recordKey={measurement.key}
      waist={measurement.waist}
      bicep={measurement.bicep}
      chest={measurement.chest}
      weight={measurement.weight}
      date={measurement.date}
      measurementsList={measurements}
    />
  ))
}
