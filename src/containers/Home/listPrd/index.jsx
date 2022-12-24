import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { fetchapi } from '../../../services/api'
import formatDate from '../../../services/formateDate'
import { Carrousel, Container, ContainerItens, Production } from './styles'

export function ListProd() {

    const [infos, setInfos] = useState()


    // useEffect(() => {
    //     async function getProd() {
    //         const { data } = await fetchapi.get('producao')
    //         console.log(data)
    //     }
    //     getProd()
    // }, [])

    async function getProd() {
        const { data } = await fetchapi.get('producao')
        setInfos(data)
        console.log(data)
    }

    const { isFetching } = useQuery('Producao', () => getProd(),
        {
            staleTime: 60000,
        })



    return (
        <Container >


            <ContainerItens>

                <Carrousel>
                    <div>Máquina</div>
                    <div>Produção/hora</div>
                    <div>Refugos</div>
                    <div>Operador</div>
                    <div>Lançado às</div>
                    <div>Total</div>
                </Carrousel>
                {
                    infos && infos.map(info => (

                        <Production key={info.id}>
                            <div>{info.machine}</div>
                            <div>{info.prod_per_hour}</div>
                            <div>{info.lost_prod}</div>
                            <div>{info.operator}</div>
                            <div>{formatDate(info.updatedAt)}</div>
                            <div>{info.total_prod}</div>
                        </Production>
                    ))



                }





            </ContainerItens>



        </Container>)
}

export default ListProd

