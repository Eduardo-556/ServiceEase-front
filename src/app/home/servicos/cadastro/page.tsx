"use client";
import CreateCustomer from "@/components/homeAuth/customer/customerCreate";
import CreateOrderForm from "@/components/homeAuth/order/orderCreate";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Cookies from "js-cookie";
import SpinnerLoading from "@/components/common/spinnerLoading";
export default function Page() {
  const router = useRouter();
  const [form, setForm] = useState("createOrderForm");
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!Cookies.get("serviceEase-token")) {
      localStorage.setItem("paginaAnterior", window.location.href);
      router.push("/login");
    } else {
      localStorage.removeItem("paginaAnterior");
    }
    setIsLoaded(true);
  }, []);
  if (!isLoaded) {
    return <SpinnerLoading />;
  }
  return (
    <>
      <div>
        <Container className="py-5 ">
          <p className="text-[45px]  text-azulClaro font-bold text-center break-words max-[501px]:text-2xl ">
            Cadastro de serviços
          </p>
          <Row className="pt-3 pb-5">
            <Col md={4} className="flex flex-col justify-center items-center">
              <span className=" text-center break-words font-semibold">
                Caso seja um cliente novo,
                <br />
                cadastre-o primeiro!
                <br />É só clicar em{" "}
                <span className="text-azulClaro">Cadastrar Cliente</span>
              </span>
              <button
                onClick={() => {
                  setForm("createOrderForm");
                }}
                className={` ${
                  form === "createOrderForm" ? "bg-azulClaro" : "bg-azul"
                } max-[370px]:text-sm max-[370px]:w-32  block w-48 text-white text-center font-bold my-3 mx-2 py-2 rounded-lg  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300`}
              >
                Cadastrar Serviço
              </button>
              <button
                onClick={() => {
                  setForm("createCustomerForm");
                }}
                className={` ${
                  form === "createCustomerForm" ? "bg-azulClaro" : "bg-azul"
                } max-[370px]:text-sm max-[370px]:w-32 block w-48 text-white text-center font-bold my-3 mx-2 py-2 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300`}
              >
                Cadastrar Cliente
              </button>
            </Col>
            <Col md>
              {form === "createOrderForm" ? (
                <CreateOrderForm />
              ) : (
                <CreateCustomer />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
