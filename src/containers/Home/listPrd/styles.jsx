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
export const Production = styled.div`
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 15px;
border-bottom: 1px solid white;
padding-bottom: 10px;
div{
    display: flex;
    justify-content: center;
}


`

export const Carrousel = styled.div`
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 10px;
border-bottom: 1px solid white;
padding-bottom: 20px;
div{
    display: flex;
    justify-content: center;
}

`
export const MachineNav = styled.header`

    display: flex;
    gap: 25px; 
    justify-content: center;
    flex-direction: row;
    font-size: 18px;
    max-width: 735px ;
    flex-wrap: wrap;


`
export const ButtonMachines = styled.button`  
        background: none;
        border: none;
        text-decoration:${props => props.isActived ? 'underline' : 'none'};
        cursor: pointer;

        &:hover{
                opacity: 0.8;
            }
    `

export const SendTotalProd = styled.button`
margin-top: 20px;
width: 80% ;
height: 50px;
border-radius: 10px;
background-color: #565656;
color: #ffffff;
border: none;

&:hover{

}

&:active{
  transition: transform .2s;
transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
    transition-property: transform;
    transform: translateY(-3px);
    opacity: 0.8;
}
`