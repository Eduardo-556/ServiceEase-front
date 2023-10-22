"use client";
import { Col, Container, Row } from "reactstrap";

import Image from "next/image";
import Link from "next/link";
export const PresentationSection = function () {
  return (
    <>
      <Container>
        <Row className="flex justify-center items-center">
          <Col md className="text-center">
            <span className="fs-1 fw-bold text-info">Service Ease</span>
            <p className="text-lg dark:text-white ">
              Simplificando a Gestão de Serviços
              <br />
              Registre Clientes e Ordens de Serviço com Facilidade!
            </p>
            <div>
              <span className="text-xl fw-bold dark:text-white">
                Bem-vindo ao Seu Parceiro em Gestão de Ordens de Serviço para
                Assistência Técnica de Celulares
              </span>
            </div>
          </Col>
          <Col md>
            <Image
              priority={true}
              quality={100}
              placeholder="blur"
              blurDataURL="/banner.svg"
              src="/banner.svg"
              width={500}
              height={500}
              alt="banner"
            />
          </Col>
        </Row>
        <Row>
          <div className="flex justify-center items-center py-5 max-[713px]:flex-col">
            <h1 className="text-center text-info font-bold text-4xl">
              Gerencie suas Ordens de Serviço de forma simples e eficiente!
            </h1>
            <Image
              src="https://i.imgur.com/6G0f2y9.png"
              width={600}
              height={500}
              alt="banner"
              quality={100}
              className="w-auto h-auto"
            />
          </div>
        </Row>
        <Row>
          <div className="flex-col justify-center items-center py-5">
            <h1 className="text-center text-info font-bold text-4xl py-2">
              Informações facilitadas para o técnico e o cliente
            </h1>
            <div className="flex justify-center gap-4 max-[865px]:flex-col">
              <Image
                src="https://i.imgur.com/fXnXK3R.png"
                width={400}
                height={0}
                alt="banner"
                quality={100}
                className="w-auto h-auto"
              />
              <Image
                src="https://i.imgur.com/SB25UGg.png"
                width={400}
                height={0}
                alt="banner"
                quality={100}
                className="w-auto h-auto"
              />
            </div>
          </div>
        </Row>
        <Row>
          <div className="flex-col justify-center items-center py-5 ">
            <h1 className="text-center text-info font-bold text-4xl py-2">
              Tenha as Informações na sua mão!
            </h1>
            <div className="flex justify-center gap-4 max-[465px]:flex-col">
              <Image
                src="https://i.imgur.com/i3V1Rhp.png"
                width={290}
                height={0}
                alt="banner"
                quality={100}
                className="w-auto h-auto"
              />
              <Image
                src="https://i.imgur.com/3BeJRhL.png"
                width={290}
                height={0}
                alt="banner"
                quality={100}
                className="w-auto h-auto"
              />
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};
