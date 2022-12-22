import { yupResolver } from '@hookform/resolvers/yup';
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { toast } from "react-toastify";
import * as yup from 'yup';
import google from '../../assets/google.svg';
import { ErrorMessage } from "../../components/ErrorMessage";
import paths from "../../constants/paths";
import { useUser } from "../../hooks/UserContext";
import { fetchapi } from "../../services/api";
import { auth, firebase } from "../../services/firebase";

import { Button, Container, ContainerItens, GoogleButton, InputUser, Label3D, Title } from "./styles";

export function Register() {
    const { putInfoOnLocalS } = useUser()
    const { push } = useHistory()

    const schema = yup.object({
        email: yup.string().required("este campo precisa ser preechido").email("digite um email válido"),
        password: yup.string().required("este campo precisa ser preenchido").min(6, "a senha deve ter no minimo 6 dígitos"),
        position: yup.string(),
        name: yup.string().required("este campo precisa ser preenchido")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (user) => {
        const { data } = await toast.promise(
            fetchapi.post('cadastro', {
                email: user.email,
                password: user.password,
                position_in_company: user.position,
                name: user.name
            }), {

            pending: 'Conferindo os dados',
            success: 'Cadastro efetuado com sucesso',
            error: 'Já existe uma conta com essas informações'
        }
        )
        putInfoOnLocalS(data)
        const isAdmin = data && data.admins

        setInterval(() => {
            isAdmin ? push(paths.admin) : push(paths.home)
        }, 2000);
    }

    async function handleGoogleLogin() {

        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await auth.signInWithPopup(provider)

        const { email, uid, displayName } = result.user
        console.log(result.user)

        try {
            const { data, status } = await fetchapi.post('cadastro', {
                name: displayName,
                email: email,
                password: uid,
            }, { validateStatus: () => true })

            if (status === 200 || status === 201) {
                toast.success('Cadastro realizado com sucesso')
                push(paths.home)
                putInfoOnLocalS(data)
            } else if (status === 409) {
                toast.error('Já existe um usuário com essas informações, faça login')
            } else {
                throw new Error()
            }
        } catch (error) {
            toast.error('Something wrong')
        }

    }



    return (
        <Container>
            <Label3D>
                <iframe src='https://my.spline.design/clonerhaircopy-9c354f19038fd1cefbe7d2748214dc8d/' frameBorder='0' width='100%' height='100%'></iframe>
            </Label3D>
            <ContainerItens>
                <Title>Company admin</Title>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <GoogleButton onClick={handleGoogleLogin}><img src={google} /> Continue with Google </GoogleButton>

                    <p style={{ color: "white" }}>or</p>
                    <InputUser formNoValidate type='text' {...register("name")} placeholder="Nome.." validIpnut={errors.name?.message} />
                    <ErrorMessage>{errors.name?.message}</ErrorMessage>

                    <InputUser formNoValidate type='email' {...register("email")} placeholder="Email.." validIpnut={errors.email?.message} />
                    <ErrorMessage>{errors.email?.message}</ErrorMessage>
                    <InputUser formNoValidate type='password'{...register("password")} placeholder="Senha.." validIpnut={errors.password?.message} />
                    <ErrorMessage>{errors.password?.message}</ErrorMessage>

                    <InputUser formNoValidate type='text'{...register("position")} placeholder="Cargo.." />

                    <Button type="submit"> Log in </Button>
                    <p style={{ color: 'white' }}> Have account ? <a href={paths.login}>  Login </a></p>
                </form>
            </ContainerItens>
        </Container>
    );
}

