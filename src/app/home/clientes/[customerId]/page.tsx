"use client";

import CreateCustomer from "@/components/homeAuth/customer/customerCreate";
import CustomerInfo from "@/components/homeAuth/customer/customerInfo";
import customerService, { CustomerType } from "@/services/customerService";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

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
  const [form, setForm] = useState("customerForm");
  const [customer, setCustomer] = useState<CustomerType>();
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
            </Col>
            <Col md>
              {form === "customerForm" ? (
                <CustomerInfo params={params} />
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
