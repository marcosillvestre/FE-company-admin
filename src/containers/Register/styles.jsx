import styled from 'styled-components'


export const Container = styled.div`
background-color:#CFCFCF ;
width: 100vw ;
height: 100vh ;

display: flex ;
align-items: center ;
justify-content: center ;
flex-direction: row ;

`

export const ContainerItens = styled.div`
min-width: 40vw;
min-height: 100vh ;
display: flex ;
flex-direction: column;
align-items: center ;
justify-content: center ;
form{
    background-color: black;
    padding: 25px ;
    display: flex ;
    flex-direction: column;
    justify-content: center ;
    text-align: center ;
    gap: 25px;
    border-radius: 20px
}
`
export const Title = styled.p`
color: #2F2F30;
margin-bottom: 25px;
font-size: 18px;
font-weight: 700;
font-family: 'Cinzel', serif;

`

export const Label3D = styled.div`
min-height: 100vh ;
min-width: 60vw ;
display: flex ;
align-items: center;
iframe{
    height: 100vh ;
}`

export const GoogleButton = styled.button`
width: 300px  ;
height: 45px ;
color: #ffffff ;
background: #2F2F30;
border-radius: 10px ;
border: 3px solid black ;
display: flex;
align-items: center;
justify-content: center;
gap: 15px;
font-size: 12px;

img{
    height: 25px
}
  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`
export const InputUser = styled.input`
width: 300px  ;
height: 45px ;
background: #2F2F30;
color: #ffff;
border-radius: 10px ;
border: ${props => (props.validIpnut ? '2px solid #CC1717;' : '3px solid black')};
padding-left: 15px  ;
font-size: 12px;

`

export const Button = styled.button`
width: 300px  ;
height: 45px ;
color: black ;
background: #ffffff;
border-radius: 10px ;
border: 3px solid black ;
font-size: 16px;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.6;
  }
`