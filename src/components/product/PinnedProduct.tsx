import { Card } from 'antd'
import React from 'react'

const PinnedProduct = ({display} : {display :Boolean}) => {
  console.log(display)
  return (
    <>
    <Card title="hello" className={display ? "" : "hiden"}> hha</Card>
    </>
    
  )
}

export default PinnedProduct