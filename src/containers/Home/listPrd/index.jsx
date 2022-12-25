import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { fetchapi } from '../../../services/api'
import formatDate from '../../../services/formateDate'
import { Carrousel, Container, ContainerItens, MachineNav, Production } from './styles'

export function ListProd() {


    const [filtered, setFiltered] = useState([])
    const [Data, setData] = useState([])
    const [activeMachine, setActiveMachine] = useState([])
    const [repetitive, setRepetitive] = useState()

    async function getProd() {
        const { data } = await fetchapi.get('producao')
        setData(data)
        console.log(data)
    }

    const { isFetching } = useQuery('Producao', () => getProd())

    useEffect(() => {

        function filteredProd() {
            const filteredPd = Data.filter(info => info.machine === activeMachine)
            setFiltered(filteredPd)

        }

        function dont() {
            const notRepetitive = Data.filter(info => info.machine !== activeMachine)
            setRepetitive(notRepetitive)
        }
        dont()
        filteredProd()
    }, [activeMachine])










    return (
        <Container >
            <MachineNav>
                {
                    repetitive && repetitive.map(machine => (
                        <button
                            onClick={() => setActiveMachine(machine.machine)}
                            key={machine.id}>
                            {machine.machine}
                        </button>

                    ))
                }
            </MachineNav>


            <ContainerItens>

                <Carrousel>
                    <div>Produção/hora</div>
                    <div>Refugos</div>
                    <div>Operador</div>
                    <div>Lançado às</div>
                    <div>Turno</div>
                </Carrousel>
                {
                    filtered ? filtered.map(info => (


                        <Production key={info.id}>
                            <div>{info.prod_per_hour}</div>
                            <div>{info.lost_prod}</div>
                            <div>{info.operator}</div>
                            <div>{formatDate(info.updatedAt)}</div>
                            <div>{
                                formatDate(info.updatedAt).split(' ')[3].split(':')[0] <= 5 ? '1º turno' :
                                    formatDate(info.updatedAt).split(' ')[3].split(':')[0] <= 15 ? '2º turno' :
                                        formatDate(info.updatedAt).split(' ')[3].split(':')[0] >= 15 ? '3º turno' : ''


                            }</div>
                        </Production>
                    )) : Data
                }






            </ContainerItens>



        </Container>)
}

export default ListProd

