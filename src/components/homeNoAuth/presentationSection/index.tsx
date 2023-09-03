"use client";
import { Col, Container, Row } from "reactstrap";
import styles from "./styles.module.scss";
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
              className={styles.bannerImg}
              layout="responsive"
              priority={true}
              objectFit="contain"
              objectPosition="center"
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
