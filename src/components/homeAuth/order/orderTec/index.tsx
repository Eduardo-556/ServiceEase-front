"use client";

import { ParamsType } from "@/app/home/servicos/[orderId]/page";
import ToastComponent from "@/components/common/toast";
import ordersService from "@/services/ordersService";
import { useRouter } from "next/navigation";
import { FormEvent, use, useEffect, useState } from "react";
import { Container, Form, FormGroup, Input, Label } from "reactstrap";

export default function OrderTec({ params }: { params: ParamsType }) {
  const orderId = params.orderId;
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [priceHours, setPriceHours] = useState(30.0);
  const [priceParts, setPriceParts] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [technicalDescription, setTechnicalDescription] = useState("");
  useEffect(() => {
    ordersService.getDetails(orderId).then((order) => {
      setSeconds(order.totalTime);
      setTechnicalDescription(order.technicalDescription);
    });
  }, [orderId]);

  useEffect(() => {
    ordersService.postUpdate(orderId, {
      technicalDescription,
    });
  }, [technicalDescription]);

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

  function formatSecondsToTime(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const fractionHours = minutes / 60;
    const totalHours = hours + fractionHours;
    const hoursCost = totalHours * (priceHours ? priceHours : 0);
    const totalCost = hoursCost + (priceParts ? priceParts : 0);
    setTotalCost(totalCost);
  }, [priceHours, priceParts, seconds]);

  const handleSubmit = async function (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const priceHour = parseFloat(data.get("priceHour") as string);
    const spentParts = parseFloat(data.get("spentParts") as string);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    const fractionHours = minutes / 60;
    const totalHours = hours + fractionHours;
    const hoursCost = totalHours * priceHour;
    const totalCost = hoursCost + spentParts;

    const res = await ordersService.postUpdate(orderId, {
      totalCost: totalCost,
      serviceStatus: "ended",
    });
    if (res === 200) {
      setToastIsOpen(true);
      setErrorMessage("Serviço finalizado com sucesso!");
      setColor("bg-success");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
      router.push("/home/servicos");
    } else {
      setToastIsOpen(true);
      setErrorMessage("Erro ao finalizar serviço, verifique as informações!");
      setColor("bg-danger");
      setTimeout(() => {
        setToastIsOpen(false);
      }, 3000);
    }
  };
  return (
    <>
      <Container>
        <div className="border-solid border-1 max-w-full border-azulClaro p-3 pt-0 mt-2">
          <h1 className="text-3xl font-bold break-words max-[501px]:text-xl text-center p-2 dark:text-white">
            Área do Técnico
          </h1>
          <div className="flex flex-col justify-center items-center gap-2 p-2 border-solid border-1 border-azulClaro rounded-full dark:bg-primeiroPlano">
            <div className="text-4xl font-bold dark:text-white">
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
                className="w-full px-4 py-2 rounded-full bg-yellow-500 hover:bg-yellow-600 text-white "
              >
                Reiniciar
              </button>
            </div>
          </div>
          <div>
            <Form
              onSubmit={handleSubmit}
              className="py-5 flex flex-col justify-center items-center gap-1 dark:text-white"
            >
              <FormGroup>
                <Label
                  for="technicalDescription"
                  className="text-sm font-bold dark:text-white"
                >
                  Descrição técnica do serviço
                </Label>
                <Input
                  className="h-36 dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario  dark:focus:text-textPrimario"
                  name="technicalDescription"
                  type="textarea"
                  id="technicalDescription"
                  placeholder="Descreva o serviço, trabalhos realizado, peças trocadas, aguardando peça, ...."
                  inputMode="numeric"
                  value={technicalDescription}
                  onChange={(e) => setTechnicalDescription(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for="priceHour" className="text-sm font-bold ">
                  Preço por hora de serviço
                </Label>
                <Input
                  className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario  dark:focus:text-textPrimario"
                  name="priceHour"
                  type="text"
                  id="priceHour"
                  placeholder="$12,50"
                  inputMode="numeric"
                  value={priceHours ? priceHours : 0}
                  onChange={(e) => setPriceHours(parseFloat(e.target.value))}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="spentParts" className="text-sm font-bold ">
                  Gasto com peças / equipamentos
                </Label>
                <Input
                  className="dark:bg-secundario border-0 dark:text-textPrimario dark:placeholder:text-textPrimario dark:focus:bg-secundario  dark:focus:text-textPrimario"
                  name="spentParts"
                  type="text"
                  id="deviceModel"
                  inputMode="numeric"
                  value={priceParts ? priceParts : 0}
                  onChange={(e) => setPriceParts(parseFloat(e.target.value))}
                  placeholder="$50,00   Caso não tenha, Deixe em branco"
                />
              </FormGroup>
              <div className="flex flex-col  justify-center items-center ">
                <span className="font-extrabold dark:text-white">
                  Preço Total do Serviço
                </span>
                <div className=" flex justify-center items-center border-solid border-1 bg-slate-50 border-azulClaro m-1 p-1 rounded-lg dark:bg-primeiroPlano  dark:text-white">
                  <p className=" text-center font-semibold text-green-500 ml-1">
                    $
                  </p>
                  <p className=" text-center font-semibold">
                    {totalCost.toFixed(2)}
                  </p>
                </div>
              </div>
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
