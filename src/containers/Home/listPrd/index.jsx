import React, { useEffect, useState } from 'react'
import { fetchapi } from '../../../services/api'
import formatDate from '../../../services/formateDate'
import { ButtonMachines, Carrousel, Container, ContainerItens, MachineNav, Production, SendTotalProd } from './styles'

export function ListProd() {
    let machineId = 0

    const [filtered, setFiltered] = useState([]) //as infos filtradas
    const [data, setData] = useState([]) //as infos
    const [activeMachine, setActiveMachine] = useState(machineId)  //a maquina ativa 
    const [machines, setMachines] = useState([]) //so as maquinas

    useEffect(() => {
        async function getProd() {
            const { data } = await fetchapi.get('producao')
            setData(data)

        }
        async function getAllMachines() {
            const { data } = await fetchapi.get('todas-maquinas')
            const allMachines = [{ id: 0, machine: 'Todas as máquinas' }, ...data]
            setMachines(allMachines)
        }
        getAllMachines()
        getProd()

    }, [])

    useEffect(() => {
        if (activeMachine === 0) {
            setFiltered(data)
        } else {
            const final = data.filter(
                infos => infos.machine_id === activeMachine
            )
            setFiltered(final)

        }

    }, [activeMachine, data])


    //  o activeMachine seta a produção


    // useEffect(() => {
    //     function someProd() {
    //         var sum = data.reduce((acc, value) => acc + value['prod_per_hour'], 0)
    //         setTotalProduction(sum)
    //     }
    //     someProd()

    // }, [data])

    // console.log(Object.values(filtered))










    return (
        <Container >
            <MachineNav>
                {
                    machines && machines.map(machine => (
                        <ButtonMachines
                            onClick={() => { setActiveMachine(machine.id) }}
                            isActived={activeMachine === machine.id}
                            type='button'
                            key={machine.id}>
                            {machine.machine}
                        </ButtonMachines>

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
                        <>
                            <Production key={info.id}>
                                <div>{info.prod_per_hour}</div>
                                <div>{info.lost_prod}</div>
                                <div>{info.operator}</div>
                                <div>{formatDate(info.updatedAt)}</div>
                                <div>{ }</div>

                            </Production>
                        </>
                    ))
                }

            </ContainerItens>
            <SendTotalProd>Enviar produção total </SendTotalProd>



        </Container>)
}

export default ListProd

