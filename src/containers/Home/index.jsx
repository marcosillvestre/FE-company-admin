import React from 'react'
import { Sidebar } from '../../components'
import { SendPrd } from './sendPrd'


import paths from '../../constants/paths'
import { useUser } from '../../hooks/UserContext'
import { Container, Wrapper } from './styles'


export function Home({ match: { path } }) {
    const { name } = useUser()



    return (
        <Container>
            <Sidebar name={name} path={path} />

            <Wrapper>

                {path === paths.home && <SendPrd />}
                {path === paths.edit && <SendPrd />}
            </Wrapper>
        </Container>
    )
}

