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
    console.log(machines)



    const schema = Yup
        .object({
            machine_id:
                Yup.string().required('O id da máquine é obrigatório'),
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
            machine_id: data.machine_id,
            prod_per_hour: data.prdHour,
            lost_prod: data.loses,
            operator: data.inCharge,
        }),
            {
                pending: 'Enviando a sua produção',
                success: 'Produçao enviada com sucesso',
                error: 'Falha ao enviar dados'
            })
    }


    useEffect(() => {
        async function getProd() {
            const { data } = await fetchapi.get('producao')
            console.log(data)
        }
        getProd()
    }, [])




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

                    <Label>Responsável/Máquina</Label>
                    <Input placeholder='Seu nome/Máquina' type="text" {...register('inCharge')} validIpnut={errors.inCharge?.message} />
                    <ErrorMessage >{errors.inCharge?.message}</ErrorMessage>

                    <Label>Máquina</Label>
                    <Select  {...register('machine_id')} validIpnut={errors.machine_id?.message} >
                        {
                            machines && machines.map(maq => (
                                <option key={maq.id} value={maq.id}>{maq.machine}</option>

                            ))
                        }
                    </Select>
                    <ErrorMessage >{errors.machine_id?.message}</ErrorMessage>


                    <ButtonProducts type="submit"> Enviar tudo</ButtonProducts>

                </ContainerItens>
            </form>


        </Container>)
}

