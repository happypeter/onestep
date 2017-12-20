import React from 'react'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'

export default ({
  error,
  disabled,
  value,
  htmlFor,
  inputLabel,
  onBlur,
  onKeyDown,
  type,
  formHelperText
}) => (
  <FormControl
    error={error}
    fullWidth={true}
    margin={'dense'}
    disabled={disabled || false}
    value={value || null}
  >
    <InputLabel htmlFor={htmlFor}>{inputLabel}</InputLabel>
    <Input
      onBlur={onBlur || null}
      onKeyDown={onKeyDown || null}
      type={type || null}
    />
    <FormHelperText>{formHelperText}</FormHelperText>
  </FormControl>
)
