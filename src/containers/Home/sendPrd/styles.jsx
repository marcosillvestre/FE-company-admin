import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
margin-left: 50px;
`

export const ContainerItens = styled.main`
min-width: 500px ;
background: #565656 ;
padding: 50px  ;
display: flex;
flex-direction: column ;
text-align: left ;
gap: 15px ;
min-height: 65% ;
color: #ffffff;
border-radius: 15px;
`
export const SelectCategory = styled.select`
color: black;
margin-bottom: 10px;

`
export const ButtonProducts = styled.button`
width: 100% ;
height: 50px;
border-radius: 10px;
background-color: #9758a6;
color: #ffffff;
border: none;
`
export const Label = styled.label`
margin-bottom: -8px;
`

export const Input = styled.input`
border-radius: 10px;
border: ${props => (props.validIpnut ? '2px solid #CC1717;' : 'none')};
height: 35px ;
padding-left: 15px;
margin-bottom: 10px;
`

export const LabelUpload = styled.label`
border: 1px dashed #FFFFff;
display: flex ;
gap: 10px;
justify-content: center ;
align-items: center ;
margin-bottom: 10px;

input{
    width: 0 ;
    opacity: 0  ;
}
`



export const Select = styled.select`
border-radius: 10px;
border: ${props => (props.validIpnut ? '2px solid #CC1717;' : 'none')};
height: 35px ;
padding-left: 15px;
margin-bottom: 10px;
`

export const LinkToList = styled(Link)`
`