"use client";

import OrderInfo from "@/components/homeAuth/order/orderInfo";
import OrderTec from "@/components/homeAuth/order/orderTec";
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
            </Col>
            <Col md>
              {form === "orderForm" ? (
                <OrderInfo params={params} />
              ) : (
                <OrderTec params={params} />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
