import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { fetchapi } from '../../../services/api'
import formatDate from '../../../services/formateDate'
import { Carrousel, Container, ContainerItens, MachineNav, Production } from './styles'

export function ListProd() {
    const { location: { state } } = useHistory()
    console.log(state)

    let categoryId = 0



    const [filtered, setFiltered] = useState([]) //as infos filtradas
    const [data, setData] = useState([]) //as infos
    const [activeMachine, setActiveMachine] = useState(categoryId)  //a maquina ativa 
    const [repetitive, setRepetitive] = useState() //so as maquinas


    useEffect(() => {
        async function getProd() {
            const { data } = await fetchapi.get('producao')
            setData(data)

        }

        async function getAllMachines() {
            const { data } = await fetchapi.get('todas-maquinas')
            setRepetitive(data)

        }

        getAllMachines()
        getProd()

    }, [activeMachine])


    console.log(filtered)
    // usar o activeMachine para setar a produção

    useEffect(() => {

        if (activeMachine === 0) {
            setFiltered(data)
        } else {
            const final = filtered.filter(
                infos => infos.machine_id === activeMachine
            )
            setFiltered(final)
        }

    }, [activeMachine, data, filtered])




    return (
        <Container >
            <MachineNav>
                {
                    repetitive && repetitive.map(machine => (
                        <button
                            onClick={() => setActiveMachine(machine.id)}
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
                    filtered && filtered.map(info => (


                        <Production key={info.id}>
                            <div>{info.prod_per_hour}</div>
                            <div>{info.lost_prod}</div>
                            <div>{info.operator}</div>
                            <div>{formatDate(info.updatedAt)}</div>
                            <div>{ }</div>
                        </Production>
                    ))
                }






            </ContainerItens>



        </Container>)
}

export default ListProd

