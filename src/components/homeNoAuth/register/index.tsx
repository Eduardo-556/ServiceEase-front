"use client";

import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "./styles.module.scss";
import { FormEvent, useEffect, useState } from "react";
import authService from "@/services/authService";
import { useRouter } from "next/navigation";
import ToastComponent from "@/components/common/toast";
import Cookies from "js-cookie";

export default function RegisterBody() {
  const router = useRouter();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  useEffect(() => {
    if (Cookies.get("serviceEase-token")) {
      router.push("/home");
    }
  });
  const handleRegister = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const firstName = formData.get("firstName")!.toString();
    const lastName = formData.get("lastName")!.toString();
    const phone = formData.get("phone")!.toString();
    const birth = formData.get("birth")!.toString();
    const email = formData.get("email")!.toString();
    const password = formData.get("password")!.toString();
    const confirmPassword = formData.get("confirmPassword")!.toString();
    const language = formData.get("language")! as "pt-BR" | "en-US";

    const params = {
      firstName,
      lastName,
      phone,
      birth,
      email,
      password,
      language,
    };

    if (password !== confirmPassword) {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("As senhas não coincidem!");
      return;
    }

    const { data, status } = await authService.register(params);

    if (status == 200) {
      router.push("/login?registred=true");
    } else {
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage(data.message);
    }
  };
  return (
    <>
      <div className="py-5 dark:bg-primeiroPlano">
        <p className="text-3xl font-bold mb-10 text-center text-azulClaro max-sm:text-2xl">
          Bem-vindo(a) ao ServiceEase!
        </p>
        <Form
          onSubmit={handleRegister}
          className="w-96 p-12 border-solid border-1 border-azulClaro my-0 mx-auto max-sm:w-11/12 dark:text-white"
        >
          <p className="text-center text-azulClaro">
            <strong>Bem-vindo(a) ao ServiceEase!</strong>
          </p>
          <FormGroup>
            <Label for="firstName" className="text-sm font-bold pt-2 ">
              Nome
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Qual o seu nome?"
              required
              maxLength={20}
              className={`${styles.input}  dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:text-textPrimario dark:focus:bg-secundario `}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName" className="text-sm font-bold pt-2">
              Sobrenome
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Qual o seu sobrenome?"
              required
              maxLength={20}
              className={`${styles.input} dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:text-textPrimario dark:focus:bg-secundario `}
            />
          </FormGroup>
          <FormGroup>
            <Label for="phone" className="text-sm font-bold pt-2">
              WHATSAPP / TELEGRAM
            </Label>
            <Input
              id="phone"
              name="phone"
              type="text"
              placeholder=" +55 (xx) xxxxx-xxxx"
              required
              className={`${styles.input} dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:text-textPrimario dark:focus:bg-secundario `}
            />
          </FormGroup>
          <FormGroup>
            <Label for="email" className="text-sm font-bold pt-2">
              E-mail
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="Qual o seu e-mail?"
              required
              className={`${styles.input} dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:text-textPrimario dark:focus:bg-secundario `}
            />
          </FormGroup>
          <FormGroup>
            <Label for="birth" className="text-sm font-bold pt-2">
              Data de nascimento
            </Label>
            <Input
              id="birth"
              name="birth"
              type="date"
              min="1930-01-01"
              max="2020-12-31"
              className={`${styles.input} dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:text-textPrimario dark:focus:bg-secundario `}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password" className="text-sm font-bold pt-2">
              Senha
            </Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Digite sua senha"
              required
              minLength={6}
              maxLength={20}
              className={`${styles.input} dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:text-textPrimario dark:focus:bg-secundario `}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword" className="text-sm font-bold pt-2">
              Confirme sua senha
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirme sua senha"
              required
              minLength={6}
              maxLength={20}
              className={`${styles.input} dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:text-textPrimario dark:focus:bg-secundario `}
            />
          </FormGroup>
          <FormGroup>
            <Label for="language" className="text-sm font-bold pt-2">
              Qual seu idioma?
            </Label>
            <Input
              id="language"
              name="language"
              type="select"
              required
              className={`${styles.inputLanguage} dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:text-textPrimario dark:focus:bg-secundario`}
            >
              <option value="pt-BR">Português</option>
              <option value="en-US">English</option>
            </Input>
          </FormGroup>
          <Button type="submit" outline className={styles.formBtn}>
            Cadastrar
          </Button>
        </Form>
      </div>
      <ToastComponent
        color="bg-danger"
        isOpen={toastIsOpen}
        message={toastMessage}
      />
    </>
  );
}
