"use client";

import UserForm from "@/components/homeAuth/profile/user";
import { Col, Container, Row } from "reactstrap";

export default function Page() {
  return (
    <>
      <div>
        <Container className="py-5">
          <p className="text-[45px]  text-azulClaro font-bold text-center break-words max-[501px]:text-2xl ">
            Minha Conta
          </p>
          <Row className="pt-3 pb-5">
            <Col md={4} className="flex flex-col justify-center items-center">
              <button className="max-[370px]:text-sm max-[370px]:w-32  block w-48 text-white text-center font-bold my-3 mx-2 py-2 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300">
                Dados Pessoais
              </button>
              <button className="max-[370px]:text-sm max-[370px]:w-32 block w-48 text-white text-center font-bold my-3 mx-2 py-2 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300">
                Senha
              </button>
            </Col>
            <Col md>
              <UserForm />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
