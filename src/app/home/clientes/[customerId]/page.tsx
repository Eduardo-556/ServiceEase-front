"use client";

import ToastComponent from "@/components/common/toast";
import CreateCustomer from "@/components/homeAuth/customer/customerCreate";
import CustomerInfo from "@/components/homeAuth/customer/customerInfo";
import customerService, { CustomerType } from "@/services/customerService";
import profileService from "@/services/profileService";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Col, Container, Row, Toast } from "reactstrap";

export interface ParamsType {
  customerId: string;
}

export default function Page({ params }: { params: ParamsType }) {
  const router = useRouter();
  useEffect(() => {
    if (!sessionStorage.getItem("serviceEase-token")) {
      router.push("/login");
    }
  });
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [form, setForm] = useState("customerForm");
  const [customer, setCustomer] = useState<CustomerType>();
  const [userId, setUserId] = useState("");
  const [color, setColor] = useState("");
  const [toastIsOpen, setToastIsopen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const customerId = params.customerId;
  const getCustomer = async function () {
    if (typeof customerId !== "string") {
      console.log(typeof customerId);
      return;
    }
    const res = await customerService.getDetails(customerId);

    setCustomer(res.data);
  };

  useEffect(() => {
    getCustomer();
  }, [customerId]);

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
    const res = await customerService.deleteCustomer({
      customerId: customerId,
      userId: userId,
    });

    if (res === 200) {
      setToastIsopen(true);
      setErrorMessage("Usuário excluído com sucesso!");
      setColor("bg-success");
      setTimeout(() => {
        setToastIsopen(false);
        router.push("/home/clientes");
      }, 2000);
    } else {
      setToastIsopen(true);
      setErrorMessage("Erro ao excluir cliente!");
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
            Dados do Cliente
          </p>
          <Row className="pt-3 pb-5">
            <Col md={4} className="flex flex-col justify-center items-center">
              <button
                onClick={() => {
                  setForm("customerForm");
                }}
                className={` ${
                  form === "customerForm" ? "bg-azulClaro" : "bg-azul"
                } max-[370px]:text-sm max-[370px]:w-32  block w-48 text-white text-center font-bold my-3 mx-2 py-2 rounded-lg  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300`}
              >
                Dados Pessoais
              </button>
              <button
                onClick={() => {
                  setForm("serviceForm");
                }}
                className={` ${
                  form === "serviceForm" ? "bg-azulClaro" : "bg-azul"
                } max-[370px]:text-sm max-[370px]:w-32 block w-48 text-white text-center font-bold my-3 mx-2 py-2 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300`}
              >
                Serviços do cliente
              </button>
              <button
                onClick={() => {
                  handleOpenConfirmationModal();
                }}
                className={` ${
                  form === "customerDeleteForm" ? "bg-azulClaro" : "bg-azul"
                } max-[370px]:text-sm max-[370px]:w-32 block w-48 text-white text-center font-bold my-3 mx-2 py-2 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300`}
              >
                Excluir Cliente
              </button>
            </Col>
            <Col md>
              {isConfirmationModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                  <div className=" bg-white p-4 rounded  shadow-md">
                    <p>Tem certeza de que deseja excluir este cliente?</p>
                    <div className="grid grid-cols-2 gap-1">
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
              {form === "customerForm" ? (
                <CustomerInfo params={params} />
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
