import React from 'react'
import Button from 'material-ui/Button'
import styled from 'styled-components'

export default ({ raised, disabled, label, onClick }) => (
  <div>
    <ShortButton
      raised={raised}
      disabled={disabled}
      onClick={onClick || null}
    >
      {label}
    </ShortButton>
  </div>
)

const ShortButton = styled(Button)`
  && {
    color: #00BCD4;
    font-size: 1em;
    height: 100%;
    line-height: 100%;
  }
`
