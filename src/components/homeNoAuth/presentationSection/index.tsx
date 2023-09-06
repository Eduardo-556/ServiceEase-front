"use client";
import { Col, Container, Row } from "reactstrap";

import Image from "next/image";
export const PresentationSection = function () {
  return (
    <>
      <Container>
        <Row>
          <Col md className="text-center">
            <span className="fs-1 fw-bold text-info">Service Ease</span>
            <p className="text-lg">
              Facilite sua vida
              <br />
              cadastre-se e comece a usar nossos serviços!!!
            </p>
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
      </Container>
    </>
  );
};
