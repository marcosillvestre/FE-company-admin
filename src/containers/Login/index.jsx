import React, { useState } from "react";

import { yupResolver } from '@hookform/resolvers/yup';
import { useId } from "react";
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
import { Button, Container, ContainerItens, GoogleButton, InputUser, Label3D } from "./styles";

export function Login() {
    const { putInfoOnLocalS } = useUser()
    const { push } = useHistory()
    const [user, setUser] = useState()

    const schema = yup.object({
        email: yup.string().required("este campo precisa ser preechido").email("digite um email válido"),
        password: yup.string().required("este campo precisa ser preenchido").min(6, "a senha deve ter no minimo 6 dígitos")
    })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmit = async (user) => {
        const { data } = await toast.promise(
            fetchapi.post('login', {
                email: user.email,
                password: user.password,
                cargo: user.cargo
            }), {

            pending: 'Conferindo os dados',
            success: 'Login efetuado com sucesso',
            error: 'Alguma coisa deu errado, tente novamente mais tarde'
        }
        )
        putInfoOnLocalS(data)
        const isAdmin = data && data.admins

        setInterval(() => {
            isAdmin ? push(paths.admin) : push(paths.home)
        }, 2000);
    }

    const handleGoogleLogin = async () => {

        const provider = new firebase.auth.GoogleAuthProvider()
        const result = await auth.signInWithPopup(provider)

        if (result.user) {
            const { displayName, photoURL, email, updatePassword } = result.user
            if (!displayName || !photoURL) throw new Error("nao tem displayname nem foto")
        }

        setUser({
            id: useId,
            avatar: photoURL,
            nome: displayN

        })
    }


    return (
        <Container>
            <Label3D>
                <iframe
                    src='https://my.spline.design/clonercitycopy-af94954f36c9c13af1dd1febe759d4d7/'
                    frameborder='0' width='100%' height='150%'>
                </iframe>
            </Label3D>
            <ContainerItens>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <GoogleButton onClick={handleGoogleLogin}><img src={google} /> Continue with Google </GoogleButton>
                    <p>or</p>
                    <InputUser formNoValidate type='email' {...register("email")} placeholder="Email.." validIpnut={errors.email?.message} />
                    <ErrorMessage>{errors.email?.message}</ErrorMessage>
                    <InputUser formNoValidate type='password'{...register("password")} placeholder="Senha.." validIpnut={errors.password?.message} />
                    <ErrorMessage>{errors.password?.message}</ErrorMessage>
                    <InputUser formNoValidate type='text'{...register("cargo")} placeholder="Cargo.." validIpnut={errors.cargo?.message} />


                    <Button type="submit"> Log in </Button>
                    <p> No account ? <a href={paths.register}> Create one </a></p>
                </form>
            </ContainerItens>
        </Container>
    );
}
