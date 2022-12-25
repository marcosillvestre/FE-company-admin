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
    flex-direction: row;
    font-size: 18px;
    button{
        background: none;
        border: none;
    }

`