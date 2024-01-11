import React, { useEffect, useState } from 'react'

export default function Demo() {
    const [value, setValue] = useState(()=> 5)
    useEffect(() => {
        console.log(value);
    },[])
  return (
    <div>{value}</div>
  )
}
