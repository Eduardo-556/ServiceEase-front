"use client";

import { ParamsType } from "@/app/home/servicos/[orderId]/page";
import ToastComponent from "@/components/common/toast";
import ordersService from "@/services/ordersService";
import { useRouter } from "next/navigation";
import QRCode from "qrcode.react";
import { FormEvent, useEffect, useState } from "react";
import { Container, Form, FormGroup, Input, Label } from "reactstrap";

export default function OrderInfo({ params }: { params: ParamsType }) {
  const orderId = params.orderId;
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [deviceModel, setDeviceModel] = useState("");
  const [deviceSerial, setDeviceSerial] = useState("");
  const [deviceImei, setDeviceImei] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [createdAt, setCreatedAt] = useState(new Date());
  const [serviceStatus, setServiceStatus] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [pauseTime, setPauseTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [totalTime, setTotalTime] = useState(new Date());
  const [totalCost, setTotalCost] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [url, setUrl] = useState("");
  const date = new Date(createdAt);
  const month = date.toLocaleDateString("default", { month: "long" });

  useEffect(() => {
    // Lembrar de trocar para window.location.href
    //const currentUrl = `http://192.168.0.104:3001/home/servicos/${orderId}`;
    const currentUrl = window.location.href;
    setUrl(currentUrl);
  }, []);

  useEffect(() => {
    ordersService.getDetails(orderId).then((order) => {
      setDeviceModel(order.deviceModel);
      setDeviceSerial(order.deviceSerial);
      setDeviceImei(order.deviceImei);
      setServiceDescription(order.serviceDescription);
      setDeadline(order.deadline);
      setCreatedAt(order.createdAt);
      setServiceStatus(order.serviceStatus);
      setStartTime(order.startTime);
      setPauseTime(order.pauseTime);
      setEndTime(order.endTime);
      setTotalTime(order.totalTime);
      setTotalTime(order.totalTime);
      setTotalCost(order.totalCost);
      setCustomerId(order.customerId);
      setCustomerFirstName(order.Customer.firstName);
      setCustomerLastName(order.Customer.lastName);
      setCustomerEmail(order.Customer.email);
      setCustomerPhone(order.Customer.phone);
    });
  }, []);

  const handleOrderUpdate = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const res = await ordersService.postUpdate(orderId, {
      deviceModel,
      deviceSerial,
      deviceImei,
      serviceDescription,
      deadline,
      serviceStatus,
    });

    if (res === 200) {
      setToastIsOpen(true);
      setErrorMessage("Serviço atualizado com sucesso!");
      setColor("bg-success");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
    } else {
      setToastIsOpen(true);
      setErrorMessage("Você não pode mudar para esse valor!");
      setColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
    }
  };

  const handlePrint = () => {
    const url = `/print/${orderId}`;
    const print = window.open(url, "", "width=600, height=600");
    setTimeout(() => {
      print!.print();
    }, 2000);
  };
  return (
    <>
      <Container>
        <Form
          onSubmit={handleOrderUpdate}
          id="form"
          className="border-solid border-1 max-w-full border-azulClaro p-3 pt-0 mt-2 dark:text-white"
        >
          <div className="flex items-center justify-center gap-2 w-[80%] mt-5 mx-auto uppercase">
            <p className="text-3xl font-bold break-words max-[501px]:text-xl text-center dark:text-white">
              {`${deviceModel}`}
            </p>
            <p
              className={`
                                    ${
                                      serviceStatus === "pending"
                                        ? "text-red-500"
                                        : ""
                                    }
                                    ${
                                      serviceStatus === "started"
                                        ? "text-green-500"
                                        : ""
                                    }
                                    ${
                                      serviceStatus === "paused"
                                        ? "text-yellow-500"
                                        : ""
                                    }
                                    ${
                                      serviceStatus === "ended"
                                        ? "text-gray-500"
                                        : ""
                                    }
                                    `}
            >
              {(() => {
                switch (serviceStatus) {
                  case "pending":
                    return "Pendente";
                  case "started":
                    return "Iniciado";
                  case "paused":
                    return "Pausado";
                  case "ended":
                    return "Finalizado";
                  default:
                    return "Não definido";
                }
              })()}
            </p>
          </div>
          <div className="flex justify-center">
            <p className="text-sm text-slate-500 text-center dark:text-textPrimario">
              Ordem de Serviço aberta em
              <br /> {`${date.getDate()} de ${month} de ${date.getFullYear()}`}
              <br />
              <br />
              {`Cliente ${customerFirstName.toUpperCase()} ${customerLastName.toUpperCase()}, Contato ${customerPhone}`}
            </p>
          </div>
          <hr />
          <div className="flex flex-col items-center ">
            <div>
              <QRCode value={url} className="border-4" />
            </div>
            <FormGroup>
              <Label for="deviceModel" className="text-sm font-bold">
                Modelo
              </Label>
              <Input
                className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario  dark:focus:text-textPrimario"
                name="deviceModel"
                type="text"
                id="deviceModel"
                placeholder="Qual o modelo do dispositivo?"
                required
                value={deviceModel}
                onChange={(event) => {
                  setDeviceModel(event.target.value);
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label for="deviceSerial" className="text-sm font-bold">
                Serial (opcional)
              </Label>
              <Input
                className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario  dark:focus:text-textPrimario"
                name="deviceSerial"
                type="text"
                id="deviceSerial"
                placeholder="O dispositivo tem um serial?"
                value={deviceSerial}
                onChange={(event) => {
                  setDeviceSerial(event.target.value);
                }}
              />
            </FormGroup>
            <div className="flex flex-col items-center ">
              <FormGroup>
                <Label for="deviceImei" className="text-sm font-bold">
                  Imei (opcional)
                </Label>
                <Input
                  className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario  dark:focus:text-textPrimario"
                  name="deviceImei"
                  type="tel"
                  id="deviceImei"
                  placeholder="O dispositivo tem um IMEI?"
                  value={deviceImei}
                  onChange={(event) => {
                    setDeviceImei(event.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label for="serviceDescription" className="text-sm font-bold">
                  Descrição do Serviço
                </Label>
                <Input
                  className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario  dark:focus:text-textPrimario"
                  name="serviceDescription"
                  type="textarea"
                  id="serviceDescription"
                  placeholder="Descreva o serviço a ser realizado!"
                  value={serviceDescription}
                  onChange={(event) => {
                    setServiceDescription(event.target.value);
                  }}
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
                  value={deadline.toString().split("T")[0]}
                  onChange={(event) => {
                    setDeadline(new Date(event.target.value));
                  }}
                />
              </FormGroup>
              <div className="flex justify-between  items-center gap-1 max-[394px]:flex-col">
                <button
                  type="submit"
                  className=" max-[370px]:text-sm max-[370px]:w-32 text-white text-center font-bold px-2 py-1 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300"
                >
                  Salvar Alterações
                </button>
                <button
                  onClick={handlePrint}
                  className=" max-[370px]:text-sm max-[370px]:w-32 text-white text-center font-bold px-2 py-1 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300"
                >
                  imprimir
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Container>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={errorMessage}
      />
    </>
  );
}
