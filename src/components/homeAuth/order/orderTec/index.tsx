"use client";

import { ParamsType } from "@/app/home/servicos/[orderId]/page";
import ToastComponent from "@/components/common/toast";
import ordersService from "@/services/ordersService";
import { useEffect, useState } from "react";
import { Container, Form, FormGroup, Input, Label } from "reactstrap";

export default function OrderTec({ params }: { params: ParamsType }) {
  const orderId = params.orderId;
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    ordersService.getDetails(orderId).then((order) => {
      return setSeconds(order.totalTime);
    });
  }, [orderId]);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((previusSeconds) => previusSeconds + 1);
        ordersService.postUpdateTime(orderId, {
          totalTime: seconds,
          serviceStatus: "started",
        });
      }, 1000) as any;
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
      ordersService.postUpdateTime(orderId, {
        totalTime: seconds,
        serviceStatus: "paused",
      });
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setSeconds(0);
    setIsActive(false);
  };

  const handleSave = async () => {
    const res = await ordersService.postUpdateTime(orderId, {
      totalTime: seconds,
      serviceStatus: "ended",
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
  function formatSecondsToTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <>
      <Container>
        <div className="border-solid border-1 max-w-full border-azulClaro p-3 pt-0 mt-2">
          <h1 className="text-3xl font-bold break-words max-[501px]:text-xl text-center p-2">
            Área do Técnico
          </h1>
          <div className="flex flex-col justify-center items-center gap-2 p-2 border-solid border-1 border-azulClaro rounded-full">
            <div className="text-4xl font-bold">
              {formatSecondsToTime(seconds)}
            </div>
            <div className="flex justify-center items-center gap-1 max-[478px]:flex-col ">
              <button
                onClick={toggleTimer}
                className={`w-full px-4 py-2 rounded-full ${
                  isActive
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                } text-white`}
              >
                {isActive ? "Parar" : "Iniciar"}
              </button>
              <button
                onClick={resetTimer}
                className="w-full px-4 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white"
              >
                Reiniciar
              </button>
            </div>
          </div>
          <div>
            <Form className="py-5 flex flex-col">
              <FormGroup>
                <Label for="deviceModel" className="text-sm font-bold">
                  Preço por hora de serviço
                </Label>
                <Input
                  name="deviceModel"
                  type="number"
                  id="deviceModel"
                  placeholder="Qual o valor por hora deseja cobrar?"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="deviceModel" className="text-sm font-bold">
                  Gasto com peças / equipamentos
                </Label>
                <Input
                  name="deviceModel"
                  type="number"
                  id="deviceModel"
                  placeholder="Caso não tenha, Deixe em branco"
                />
              </FormGroup>
              <button
                type="submit"
                className=" max-[370px]:text-sm max-[370px]:w-32 text-white text-center font-bold px-2 py-1 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300"
              >
                Finalizar Serviço
              </button>
            </Form>
          </div>
        </div>
      </Container>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={errorMessage}
      />
    </>
  );
}
