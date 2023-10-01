"use client";

import { ParamsType } from "@/app/home/clientes/[customerId]/page";
import ToastComponent from "@/components/common/toast";
import customerService from "@/services/customerService";
import { FormEvent, useEffect, useState } from "react";
import { Form, FormGroup, Label, Input } from "reactstrap";

export default function CustomerInfo({ params }: { params: ParamsType }) {
  const customerId = params.customerId;
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsopen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nif, setNif] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const date = new Date(createdAt);
  const month = date.toLocaleDateString("default", { month: "long" });

  useEffect(() => {
    customerService.getDetails(customerId).then((customer) => {
      setFirstName(customer.firstName);
      setLastName(customer.lastName);
      setNif(customer.nif);
      setPhone(customer.phone);
      setEmail(customer.email);
      setAddress(customer.address);
      setCreatedAt(customer.createdAt);
    });
  }, []);

  const handleUserUpdate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await customerService.postUpdate(customerId, {
      firstName,
      lastName,
      nif,
      email,
      phone,
      address,
    });

    if (res === 200) {
      setToastIsopen(true);
      setErrorMessage("Usuário atualizado com sucesso!");
      setColor("bg-success");
      setTimeout(() => {
        setToastIsopen(false);
      }, 3000);
    } else {
      setToastIsopen(true);
      setErrorMessage("Você não pode mudar para esse email!");
      setColor("bg-danger");
      setTimeout(() => {
        setToastIsopen(false);
      }, 3000);
    }
  };

  return (
    <>
      <Form
        onSubmit={handleUserUpdate}
        className="border-solid border-1 max-w-full border-azulClaro p-5 pt-0 mt-2 dark:text-textPrimario"
      >
        <div className="flex items-center justify-center gap-2 w-[80%] mt-5 mx-auto uppercase">
          <p className="text-3xl font-bold break-words max-[501px]:text-xl text-center">
            {`${firstName} ${lastName}`}
          </p>
        </div>
        <div className="flex justify-center">
          <p className="text-sm text-slate-500 text-center dark:text-secundario">
            Cliente desde <br />
            {`${date.getDate()} de ${month} de ${date.getFullYear()}`}
          </p>
        </div>
        <hr />
        <div className="flex flex-col items-center ">
          <FormGroup>
            <Label for="firstName" className="text-sm font-bold">
              Nome
            </Label>
            <Input
              className="dark:bg-primeiroPlano border-0 dark:text-secundario"
              name="firstName"
              type="text"
              id="firstName"
              placeholder="Qual seu primeiro nome?"
              required
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="lastName" className="text-sm font-bold">
              Sobrenome
            </Label>
            <Input
              className="dark:bg-primeiroPlano border-0 dark:text-secundario"
              name="lastName"
              type="text"
              id="lastName"
              placeholder="Qual seu último nome?"
              required
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label for="nif" className="text-sm font-bold">
              Documento de identidade
            </Label>
            <Input
              className="dark:bg-primeiroPlano border-0 dark:text-secundario"
              name="nif"
              type="text"
              id="nif"
              placeholder="Qual seu último nome?"
              required
              value={nif}
              onChange={(event) => {
                setNif(event.target.value);
              }}
            />
          </FormGroup>
          <div className="flex flex-col items-center ">
            <FormGroup>
              <Label for="phone" className="text-sm font-bold">
                Whatsapp / Telegram
              </Label>
              <Input
                className="dark:bg-primeiroPlano border-0 dark:text-secundario"
                name="phone"
                type="tel"
                id="phone"
                placeholder="+xx (xx) xxxxx-xxxx"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email" className="text-sm font-bold">
                e-mail
              </Label>
              <Input
                className="dark:bg-primeiroPlano border-0 dark:text-secundario"
                name="email"
                type="email"
                id="email"
                placeholder="Qual seu email?"
                required
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="address" className="text-sm font-bold">
                Endereço
              </Label>
              <Input
                className="dark:bg-primeiroPlano border-0 dark:text-secundario"
                name="address"
                type="text"
                id="address"
                placeholder="Qual seu address?"
                required
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
            </FormGroup>
            <button
              type="submit"
              className=" max-[370px]:text-sm max-[370px]:w-32 text-white text-center font-bold px-2 py-1 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </Form>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={errorMessage}
      />
    </>
  );
}
