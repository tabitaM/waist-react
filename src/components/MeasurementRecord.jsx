import React from 'react'

export default function MeasurementRecord({ waist, bicep, chest, weight }) {
  return (
    <div style={{ display: 'flex' }}>
      <div> Waist: {waist}</div>
      <div> Bicep: {bicep}</div>
      <div> Chest: {chest}</div>
      <div> Weight: {weight}</div>
    </div>
  )
}
