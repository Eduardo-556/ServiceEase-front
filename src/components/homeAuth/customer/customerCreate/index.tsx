"use cliente";

import ToastComponent from "@/components/common/toast";
import customerService from "@/services/customerService";
import profileService from "@/services/profileService";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Container, Form, FormGroup, Input, Label } from "reactstrap";

export default function CreateCustomer() {
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get("firstName")!.toString();
    const lastName = data.get("lastName")!.toString();
    const nif = data.get("nif")!.toString();
    const email = data.get("email")!.toString();
    const phone = data.get("phone")!.toString();
    const address = data.get("address")!.toString();
    const { id } = await profileService.fetchCurrent();
    const params = {
      firstName,
      lastName,
      nif,
      email,
      phone,
      address,
      userId: id,
    };

    const { status } = await customerService.postCreate(params);

    if (status === 201) {
      setColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Cliente cadastrado com sucesso!");
    } else {
      setColor("bg-danger");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Erro ao cadastrar cliente, verifique os campos.");
    }
  };

  return (
    <>
      <Container className="py-5">
        <Form
          onSubmit={handleSubmit}
          className="p-1 py-2 border-solid border-1 max-w-md border-azulClaro my-0 mx-auto text-center dark:text-white "
        >
          <p className="text-center text-azulClaro break-words">
            <strong>Cadastre um novo cliente!</strong>
          </p>
          <FormGroup>
            <Label for="firstName" className="text-sm font-bold">
              Nome
            </Label>
            <Input
              className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario "
              name="firstName"
              type="text"
              id="firstName"
              placeholder="Qual o primeiro nome?"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName" className="text-sm font-bold">
              Sobrenome
            </Label>
            <Input
              className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario "
              name="lastName"
              type="text"
              id="lastName"
              placeholder="Qual o último nome?"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="nif" className="text-sm font-bold">
              Documento de identidade
            </Label>
            <Input
              className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario "
              name="nif"
              type="text"
              id="nif"
              placeholder="Digite apenas números"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="phone" className="text-sm font-bold">
              Whatsapp / Telegram
            </Label>
            <Input
              className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario "
              name="phone"
              type="tel"
              id="phone"
              placeholder="+xx (xx) xxxxx-xxxx"
            />
          </FormGroup>
          <FormGroup>
            <Label for="email" className="text-sm font-bold">
              e-mail
            </Label>
            <Input
              className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario "
              name="email"
              type="email"
              id="email"
              placeholder="Qual o email?"
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="address" className="text-sm font-bold">
              Endereço
            </Label>
            <Input
              className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario "
              name="address"
              type="text"
              id="address"
              placeholder="Qual o endereço?"
              required
            />
          </FormGroup>
          <button
            type="submit"
            className=" max-[370px]:text-sm max-[370px]:w-32 text-white text-center font-bold px-2 py-1 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300"
          >
            Cadastrar Cliente
          </button>
        </Form>
      </Container>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={toastMessage}
      />
    </>
  );
}
