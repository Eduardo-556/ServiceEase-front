"use client";

import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "./styles.module.scss";

export default function RegisterBody() {
  return (
    <>
      <Container className="py-5">
        <p className="text-3xl font-bold mb-10 text-center text-azulClaro max-sm:text-2xl">
          Bem-vindo(a) ao ServiceEase!
        </p>
        <Form className="w-96 p-12 border-solid border-1 border-azulClaro my-0 mx-auto max-sm:w-11/12">
          <p className="text-center text-azulClaro">
            <strong>Bem-vindo(a) ao ServiceEase!</strong>
          </p>
          <FormGroup>
            <Label for="firstName" className="text-sm font-bold pt-2">
              Nome
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Qual o seu nome?"
              required
              maxLength={20}
              className={styles.input}
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
              className={styles.input}
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
              className={styles.input}
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
              className={styles.input}
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
              className={styles.input}
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
              className={styles.input}
            />
          </FormGroup>
          <FormGroup>
            <Label for="passwordConfirm" className="text-sm font-bold pt-2">
              Confirme sua senha
            </Label>
            <Input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              placeholder="Confirme sua senha"
              required
              minLength={6}
              maxLength={20}
              className={styles.input}
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
              className={styles.inputLanguage}
            >
              <option>Português</option>
              <option>English</option>
            </Input>
          </FormGroup>
          <Button type="submit" outline className={styles.formBtn}>
            Cadastrar
          </Button>
        </Form>
      </Container>
    </>
  );
}
