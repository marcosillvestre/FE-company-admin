import React from 'react'
import { Sidebar } from '../../components'
import { SendPrd } from './sendPrd'

import { Container, Wrapper } from './styles'


export function Home() {

    return (
        <Container>
            <Wrapper>
                <Sidebar />

                <SendPrd />
            </Wrapper>
        </Container>
    )
}
