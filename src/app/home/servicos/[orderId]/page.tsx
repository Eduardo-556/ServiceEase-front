"use client";

import ToastComponent from "@/components/common/toast";
import OrderInfo from "@/components/homeAuth/order/orderInfo";
import OrderTec from "@/components/homeAuth/order/orderTec";
import ordersService from "@/services/ordersService";
import profileService from "@/services/profileService";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

export interface ParamsType {
  orderId: string;
}

export default function Page({ params }: { params: ParamsType }) {
  const router = useRouter();
  useEffect(() => {
    if (!sessionStorage.getItem("serviceEase-token")) {
      router.push("/login");
    }
  });
  const [form, setForm] = useState("orderForm");
  const [userId, setUserId] = useState("");
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsopen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      setUserId(user.id);
    });
  }, []);

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
              {form === "orderForm" ? (
                <OrderInfo params={params} />
              ) : (
                <OrderTec params={params} />
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
