"use client";

import ToastComponent from "@/components/common/toast";
import customerService, { CustomerType } from "@/services/customerService";
import ordersService from "@/services/ordersService";
import { useRouter } from "next/navigation";

import { FormEvent, useEffect, useState } from "react";

import { Container, Form, FormGroup, Input, Label } from "reactstrap";

export default function CreateOrderForm() {
  const router = useRouter();
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [color, setColor] = useState("");
  const [customers, setCustomers] = useState<CustomerType[]>([]);

  useEffect(() => {
    customerService.getAll().then((res) => {
      setCustomers(res);
    });
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const customerId = formData.get("customerId")!.toString();
    const deviceModel = formData.get("deviceModel")!.toString();
    const deviceSerial = formData.get("deviceSerial")!.toString();
    const deviceImei = formData.get("deviceImei")!.toString();
    const serviceDescription = formData.get("serviceDescription")!.toString();
    const deadline = formData.get("deadline")!.toString();

    const params = {
      customerId: parseInt(customerId),
      deviceModel,
      deviceSerial,
      deviceImei,
      serviceDescription,
      deadline: new Date(deadline),
    };

    const { data, status } = await ordersService.postCreate(params);

    if (status === 201) {
      setColor("bg-success");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage("Ordem de serviço criada com sucesso!");
      router.push("/home/servicos");
    } else {
      setColor("bg-danger");
      setToastIsOpen(true);
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      setToastMessage(data.message);
    }
  };

  return (
    <>
      <div>
        <Container className="py-5">
          <Form
            onSubmit={handleSubmit}
            className="p-1 py-2 border-solid border-1 max-w-md border-azulClaro my-0 mx-auto text-center dark:text-white"
          >
            <p className="text-center text-azulClaro break-words">
              <strong>Cadastre uma nova ordem de serviço!</strong>
            </p>
            <FormGroup>
              <Label for="deviceModel" className="text-sm font-bold">
                Modelo
              </Label>
              <Input
                className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario "
                name="deviceModel"
                type="text"
                id="deviceModel"
                placeholder="Qual o modelo do dispositivo?"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="deviceSerial" className="text-sm font-bold">
                Serial (opcional)
              </Label>
              <Input
                className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario "
                name="deviceSerial"
                type="text"
                id="deviceSerial"
                placeholder="O dispositivo tem um serial?"
              />
            </FormGroup>

            <FormGroup>
              <Label for="deviceImei" className="text-sm font-bold">
                Imei (opcional)
              </Label>
              <Input
                className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario "
                name="deviceImei"
                type="tel"
                id="deviceImei"
                placeholder="O dispositivo tem um IMEI?"
              />
            </FormGroup>
            <FormGroup>
              <Label for="serviceDescription" className="text-sm font-bold">
                Descrição do Serviço
              </Label>
              <Input
                className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario "
                name="serviceDescription"
                type="textarea"
                id="serviceDescription"
                placeholder="Descreva o serviço a ser realizado!"
              />
            </FormGroup>
            <FormGroup>
              <Label for="deadline" className="text-sm font-bold">
                Prazo para terminar o serviço
              </Label>
              <Input
                className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario  dark:focus:text-textPrimario"
                name="deadline"
                type="date"
                id="deadline"
                placeholder="Data para finalizar o serviço"
                required
              />
            </FormGroup>
            <FormGroup>
              <Label for="customerId" className="text-sm font-bold">
                Cliente
              </Label>
              <Input
                type="select"
                className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder-text-textPrimario dark:focus:bg-secundario"
                id="customerId"
                name="customerId"
                required
              >
                <option value="">Selecione uma opção</option>
                {customers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {`${customer.firstName} ${customer.lastName} (Documento: ${customer.nif})`}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <button
              type="submit"
              className=" max-[370px]:text-sm max-[370px]:w-32 text-white text-center font-bold px-2 py-1 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300"
            >
              Cadastrar Serviço
            </button>
          </Form>
        </Container>
      </div>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={toastMessage}
      />
    </>
  );
}
