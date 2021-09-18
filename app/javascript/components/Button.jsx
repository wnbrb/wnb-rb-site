import React from 'react'

import 'stylesheets/button'

const Button = ({children, type}) => (
  <div className={`button ${type}`}>
    {children}
  </div>
)

export default Button;
