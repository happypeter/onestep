import styled from 'styled-components'
import Button from '@material-ui/core/Button'
import { Link } from 'react-router-dom'

export const Form = styled.form`
  padding: 16px 32px 32px;
  text-align: center;
`

export const Image = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 6px;
  margin: 0 auto 16px;
`

export const ActionButton = styled(Button)`
  && {
    background-color: #00bcd4;
    color: #ffffff;
    width: 100%;
    margin-top: 1.5em;
  }
`

export const Switch = styled.div`
  text-align: center;
  padding-bottom: 16px;
  color: #00bcd4;
  font-size: 14px;
  &:hover {
    cursor: pointer;
  }
`

export const Row = styled.div`
  display: flex;
  width: 100%;
`

export const Error = styled.span`
  color: #ff1744;
`

export const LinkWrap = styled(Link)`
  text-decoration: none;
  color: #00bcd4;
  font-size: 14px;
  display: block;
  margin-top: 8px;
  text-align: right;
`
