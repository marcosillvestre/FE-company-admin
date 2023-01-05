import React, { useEffect, useState } from 'react'
import { fetchapi } from '../../../services/api'
import formatDate from '../../../services/formateDate'
import { Carrousel, Container, ContainerItens, Production } from './styles'

export function TotalProd() {
    const [totalProduction, setTotalProduction] = useState([])
    const [machines, setMachine] = useState([])


    useEffect(() => {
        async function getProd() {
            const { data } = await fetchapi.get('producao')
            const filtered =
                data.reduce((soma, cur) => {
                    let nome = cur.machine_id
                    let repetido = soma.find(elem => elem.machine_id === nome)
                    if (repetido) repetido.prod_per_hour += cur.prod_per_hour
                    else soma.push(cur)
                    console.log(soma)
                    return soma
                }, [])
            setTotalProduction(filtered)
        }
        getProd()
    }, [])


    useEffect(() => {
        async function kk() {
            const { data } = await fetchapi.get('todas-maquinas')
            setMachine(data)
            let keys = ['id', 'machine']

            let fil = keys.map(key => ({ [key]: data.map(it => it[key]) }))
            // console.log(machines)
            console.log(fil[0])



        }
        kk()

    }, [])


    return (
        <Container >
            <ContainerItens>
                <Carrousel>
                    <div>Produção/hora</div>
                    <div>Refugos</div>
                    <div>Máquina</div>
                    <div>Lançado no dia</div>
                    <div>Turno</div>
                </Carrousel>
                {
                    totalProduction && totalProduction.map(info => (
                        <>
                            <Production key={info.id}>
                                <div>{info.prod_per_hour}</div>
                                <div>{info.lost_prod}</div>
                                <div>{info.machine_id}</div>
                                <div>{formatDate(info.updatedAt)}</div>
                                <div>{ }</div>

                            </Production>
                        </>
                    ))
                }


            </ContainerItens>


        </Container>)
}



