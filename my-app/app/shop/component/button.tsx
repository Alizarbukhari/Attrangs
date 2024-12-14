import React from 'react'
import { buttonType } from '../types/types'

function Button(prop:buttonType) {
  return (
    <div>
        
        <button onClick={prop.onClick} className="text-sm px-4 py-2 border rounded"  >{prop.tittle}</button>
    </div>
  )
}

export default Button