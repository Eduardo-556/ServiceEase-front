"use client";

import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../register/styles.module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import ToastComponent from "@/components/common/toast";
import authService from "@/services/authService";
import Cookies from "js-cookie";
export default function LoginBody() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [toastColor, setToastColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  useEffect(() => {
    if (Cookies.get("serviceEase-token")) {
      router.push("/home");
    }
  });
  const registerSucess = searchParams.get("registred");
  useEffect(() => {
    if (registerSucess === "true") {
      setToastColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Cadastro realizado com sucesso");
    }
  }, [searchParams, registerSucess]);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const params = { email, password };

    const { status } = await authService.login(params);

    if (status === 200) {
      const paginaAnterior = localStorage.getItem("paginaAnterior");
      if (paginaAnterior) {
        router.push(paginaAnterior);
      } else {
        router.push("/home");
      }
    } else {
      setToastColor("bg-danger");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Email ou senha incorretos");
    }
  };

  return (
    <>
      <Container className="py-5">
        <p className="text-3xl font-bold mb-10 text-center text-azulClaro max-sm:text-2xl">
          Bem-vindo(a) ao ServiceEase!
        </p>
        <Form
          onSubmit={handleLogin}
          className="w-96 p-12 border-solid border-1 border-azulClaro my-0 mx-auto max-sm:w-11/12"
        >
          <p className="text-center text-azulClaro">
            <strong>Bem-vindo(a) ao ServiceEase!</strong>
          </p>
          <FormGroup>
            <Label for="email" className="text-sm font-bold pt-2">
              E-MAIL
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Qual seu email?"
              required
              className={styles.input}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password" className="text-sm font-bold pt-2">
              SENHA
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Qual sua senha?"
              required
              className={styles.input}
            />
          </FormGroup>
          <Button type="submit" outline className={styles.formBtn}>
            ENTRAR
          </Button>
        </Form>
      </Container>
      <ToastComponent
        color={toastColor}
        isOpen={toastIsOpen}
        message={toastMessage}
      />
    </>
  );
}
