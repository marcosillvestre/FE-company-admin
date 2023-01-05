import React from 'react'
import { Sidebar } from '../../components'
import { ListProd } from './listPrd'
import { SendPrd } from './sendPrd'
import { TotalProd } from './totalProd'


import paths from '../../constants/paths'
import { useUser } from '../../hooks/UserContext'
import { Container, Wrapper } from './styles'


export function Home({ match: { path } }) {
    const { name } = useUser()



    return (
        <Container>
            <Sidebar names={name} path={path} />

            <Wrapper>

                {path === paths.home && <SendPrd />}
                {path === paths.total && <TotalProd />}
                {path === paths.show && <ListProd />}
            </Wrapper>
        </Container>
    )
}

