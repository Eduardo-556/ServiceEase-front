"use client";
import CreateCustomer from "@/components/homeAuth/customer/customerCreate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Col, Container, Row } from "reactstrap";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    if (!sessionStorage.getItem("serviceEase-token")) {
      router.push("/login");
    }
  });
  return (
    <>
      <div>
        <Container className="py-5 ">
          <p className="text-[45px]  text-azulClaro font-bold text-center break-words max-[501px]:text-2xl ">
            Cadastro de cliente
          </p>
          <Row className="pt-3 pb-5">
            <Col md>
              <CreateCustomer />
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
