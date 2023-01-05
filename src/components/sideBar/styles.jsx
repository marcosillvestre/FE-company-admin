import styled from 'styled-components'


export const LinkMenu = styled.li`
margin: 20px ;
display: flex;
text-align: left;


    background: ${props => props.isActive ? '#565656' : 'none'};
    color: ${props => props.isActive ? 'black' : 'white'};
    border-radius: ${props => props.isActive ? '16px' : '0px'};
    
        &:hover{
    border-radius: 5px 0 0 5px;
    background: #efefef;
    color: black;
    transform:${props => !props.trans && 'translateX(20px)'};
    transition: transform 0.5s;

    &:active{
         background: #efefef;
        color: black;
    }
        }
`

export const MenuList = styled.a`
padding: 35px;
&:hover{
    color: black;
}

`