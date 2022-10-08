import React from 'react'

export default function Error() {
  return (
    <div style={{display:'flex', alignItems: 'center', justifyContent:'center', minHeight: '100vh', flexDirection: 'column' }}>Page not found
        <div><a href={`/`}> Regresar</a></div>
    </div>
  )
}
