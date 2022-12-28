import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { ErrorMessage } from '../../../components'
import { fetchapi } from '../../../services/api'
import { ButtonProducts, Container, ContainerItens, Input, Label, Select } from './styles'

export function SendPrd() {

    const [machines, setMachines] = useState()

    useEffect(() => {
        async function getMachines() {
            const { data } = await fetchapi.get('todas-maquinas')
            setMachines(data)

        }
        getMachines()
    }, [])



    const schema = Yup
        .object({
            machine:
                Yup.string().required('O nome da máquine é obrigatório'),
            prdHour:
                Yup.string().required('É necessário informar a produção da ultima hora'),
            loses:
                Yup.string(),
            inCharge:
                Yup.string().required('Quem é o responsável pela operção ?'),
            totalPrd:
                Yup.string()
        })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {

        console.log(data)
        await toast.promise(fetchapi.post('enviar-producao', {
            machine: data.machine,
            prod_per_hour: data.prdHour,
            lost_prod: data.loses,
            operator: data.inCharge,
            machine_id: data.machine.id,

        }),
            {
                pending: 'Enviando a sua produção',
                success: 'Produçao enviada com sucesso',
                error: 'Falha ao enviar dados'
            })

        // setTimeout(() => {
        // }, 2000)
    }


    useEffect(() => {
        async function getProd() {
            const { data } = await fetchapi.get('producao')
            console.log(data)
        }
        getProd()
    }, [])



    // const { isFetching } = useQuery('', () => getCategories(),
    //     {
    //         staleTime: 60000,
    //     })

    return (
        <Container >

            <form noValidate onSubmit={handleSubmit(onSubmit)}>
                <ContainerItens>
                    <Label style={{ textAlign: 'center', fontSize: '20px' }}>Enviar produção</Label>

                    <Label>Produção/hora</Label>
                    <Input type="text" {...register('prdHour')} validIpnut={errors.prdHour?.message} />
                    <ErrorMessage >{errors.prdHour?.message}</ErrorMessage>

                    <Label>Refugos</Label>
                    <Input type="text" {...register('loses')} validIpnut={errors.loses?.message} />
                    <ErrorMessage >{errors.loses?.message}</ErrorMessage>

                    <Label>Responsável</Label>
                    <Input type="text" {...register('inCharge')} validIpnut={errors.inCharge?.message} />
                    <ErrorMessage >{errors.inCharge?.message}</ErrorMessage>

                    <Label>Máquina</Label>
                    <Select type="number" {...register('machine')} validIpnut={errors.machine?.message} >
                        {
                            machines && machines.map(maq => (
                                <option key={maq.id} value={maq.id}>{maq.machine}</option>

                            ))
                        }
                    </Select>
                    <ErrorMessage >{errors.machine?.message}</ErrorMessage>


                    <ButtonProducts type="submit"> Enviar tudo</ButtonProducts>

                </ContainerItens>
            </form>


        </Container>)
}

export default SendPrd

