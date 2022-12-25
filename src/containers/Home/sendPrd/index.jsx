import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as Yup from 'yup'
import { ErrorMessage } from '../../../components'
import { fetchapi } from '../../../services/api'
import { ButtonProducts, Container, ContainerItens, Input, Label } from './styles'

export function SendPrd() {

    // const { push } = useHistory()
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
    });

    const onSubmit = async (data) => {

        console.log(data)
        await toast.promise(fetchapi.post('enviar-producao', {
            machine: data.machine,
            prod_per_hour: data.prdHour,
            lost_prod: data.loses,
            operator: data.inCharge,

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
                    <Label style={{ textAlign: "center", fontSize: "20px" }}>Enviar produção</Label>

                    <Label>Máquina</Label>
                    <Input type="text" {...register("machine")} validIpnut={errors.machine?.message} />
                    <ErrorMessage >{errors.machine?.message}</ErrorMessage>

                    <Label>Produção/hora</Label>
                    <Input type="text" {...register("prdHour")} validIpnut={errors.prdHour?.message} />
                    <ErrorMessage >{errors.prdHour?.message}</ErrorMessage>

                    <Label>Refugos</Label>
                    <Input type="text" {...register("loses")} validIpnut={errors.loses?.message} />
                    <ErrorMessage >{errors.loses?.message}</ErrorMessage>

                    <Label>Responsável</Label>
                    <Input type="text" {...register("inCharge")} validIpnut={errors.inCharge?.message} />
                    <ErrorMessage >{errors.inCharge?.message}</ErrorMessage>

                    {/* <Label>Produção total</Label>
                    <Input type="number" {...register("totalPrd")} validIpnut={errors.totalPrd?.message} />
                    <ErrorMessage >{errors.totalPrd?.message}</ErrorMessage> */}


                    <ButtonProducts type="submit"> Enviar tudo</ButtonProducts>

                </ContainerItens>
            </form>


        </Container>)
}

export default SendPrd

