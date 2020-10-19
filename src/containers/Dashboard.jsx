import React from 'react'
import MeasurementForm from '../components/MeasurementForm'
import MeasurementList from '../components/MeasurementList'

export default function Dashboard() {
  return (
    <div>
      <MeasurementForm />
      <MeasurementList />
    </div>
  )
}
