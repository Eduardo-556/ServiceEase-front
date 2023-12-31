"use client";

import ToastComponent from "@/components/common/toast";
import CustomerInfo from "@/components/homeAuth/customer/customerInfo";
import OrderInfo from "@/components/homeAuth/order/orderInfo";
import OrderTec from "@/components/homeAuth/order/orderTec";
import QRCodeScanner from "@/components/homeAuth/order/qrCodeScanner";
import ordersService from "@/services/ordersService";
import profileService from "@/services/profileService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Cookies from "js-cookie";
import SpinnerLoading from "@/components/common/spinnerLoading";
export interface ParamsType {
  orderId: string;
}

export default function Page({ params }: { params: ParamsType }) {
  const router = useRouter();
  useEffect(() => {
    if (!Cookies.get("serviceEase-token")) {
      localStorage.setItem("paginaAnterior", window.location.href);
      router.push("/login");
    } else {
      localStorage.removeItem("paginaAnterior");
    }
  }, []);
  const [form, setForm] = useState("orderForm");
  const [userId, setUserId] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsopen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [customerId, setCustomer] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      setUserId(user.id);
    });
    ordersService.getDetails(params.orderId).then((order) => {
      setCustomer(order.customerId);
    });
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <SpinnerLoading/>;
  }

  function handleOpenConfirmationModal() {
    setIsConfirmationModalOpen(true);
  }

  function handleCloseConfirmationModal() {
    setIsConfirmationModalOpen(false);
  }

  const handleDeleteCustomer = async function () {
    const res = await ordersService.deleteOrder({
      serviceId: parseInt(params.orderId),
      userId: parseInt(userId),
    });

    if (res === 200) {
      setToastIsopen(true);
      setErrorMessage("Ordem excluída com sucesso!");
      setColor("bg-success");
      setTimeout(() => {
        setToastIsopen(false);
        router.push("/home/servicos");
      }, 2000);
    } else {
      setToastIsopen(true);
      setErrorMessage("Erro ao excluir ordem!");
      setColor("bg-danger");
      setTimeout(() => {
        setToastIsopen(false);
      }, 3000);
    }
    handleCloseConfirmationModal();
  };

  const customerParams = {
    customerId: customerId,
  };

  return (
    <>
      <div>
        <Container className="py-5">
          <p className="text-[45px]  text-azulClaro font-bold text-center break-words max-[501px]:text-2xl ">
            Ordem de Serviço
          </p>
          <Row className="pt-3 pb-5">
            <Col md={4} className="flex flex-col justify-center items-center">
              <button
                onClick={() => {
                  setForm("orderForm");
                }}
                className={` ${
                  form === "orderForm" ? "bg-azulClaro" : "bg-azul"
                } max-[370px]:text-sm max-[370px]:w-32  w-60 text-white text-center font-bold my-3 mx-2 py-2 rounded-lg  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300`}
              >
                Detalhes da ordem
              </button>
              <button
                onClick={() => {
                  setForm("tecForm");
                }}
                className={` ${
                  form === "tecForm" ? "bg-azulClaro" : "bg-azul"
                } max-[370px]:text-sm max-[370px]:w-32  w-60 text-white text-center font-bold my-3 mx-2 py-2 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300`}
              >
                Área técnica
              </button>
              <button
                onClick={() => {
                  handleOpenConfirmationModal();
                }}
                className={`
                  
                max-[370px]:text-sm max-[370px]:w-32  w-60 text-white text-center font-bold my-3 mx-2 py-2 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300`}
              >
                Excluir Ordem
              </button>
              <button
                onClick={() => {
                  setForm("customerForm");
                }}
                className={` ${
                  form === "customerForm" ? "bg-azulClaro" : "bg-azul"
                } max-[370px]:text-sm max-[370px]:w-32  w-60 text-white text-center font-bold my-3 mx-2 py-2 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300`}
              >
                Dados do cliente
              </button>
              <button
                onClick={() => {
                  setForm("QRCodeReader");
                }}
                className={` ${
                  form === "QRCodeReader" ? "bg-azulClaro" : "bg-azul"
                } max-[370px]:text-sm max-[370px]:w-32  w-60 text-white text-center font-bold my-3 mx-2 py-2 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300`}
              >
                Ler QRCode
              </button>
            </Col>
            <Col md>
              {isConfirmationModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className=" bg-white p-4 rounded  shadow-md">
                    <p>
                      Tem certeza de que deseja excluir esta ordem de serviço?
                    </p>
                    <div className="grid grid-cols-2 gap-1 py-1">
                      <button
                        onClick={handleDeleteCustomer}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Sim
                      </button>
                      <button
                        onClick={handleCloseConfirmationModal}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Não
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {form === "orderForm" && Cookies.get("serviceEase-token") ? (
                <OrderInfo params={params} />
              ) : (
                <></>
              )}
              {form === "tecForm" && Cookies.get("serviceEase-token") ? (
                <OrderTec params={params} />
              ) : (
                <></>
              )}
              {form === "customerForm" && Cookies.get("serviceEase-token") ? (
                <CustomerInfo params={customerParams} />
              ) : (
                <></>
              )}
              {form === "QRCodeReader" && Cookies.get("serviceEase-token") ? (
                <QRCodeScanner />
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Container>
      </div>
      <ToastComponent
        color={color}
        isOpen={toastIsOpen}
        message={errorMessage}
      />
    </>
  );
}
