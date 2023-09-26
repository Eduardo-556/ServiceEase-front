"use client";

import PasswordForm from "@/components/homeAuth/profile/password";
import UserForm from "@/components/homeAuth/profile/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Cookies from "js-cookie";
export default function Page() {
  const [form, setForm] = useState("userForm");
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("serviceEase-token")) {
      localStorage.setItem("paginaAnterior", window.location.href);
      router.push("/login");
    } else {
      localStorage.removeItem("paginaAnterior");
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("serviceEase-token");
    router.push("/");
  };
  return (
    <>
      <div>
        <Container className="py-5">
          <p className="text-[45px]  text-azulClaro font-bold text-center break-words max-[501px]:text-2xl ">
            Minha Conta
          </p>
          <Row className="pt-3 pb-5">
            <Col md={4} className="flex flex-col justify-center items-center">
              <button
                onClick={() => {
                  setForm("userForm");
                }}
                className={` ${
                  form === "userForm" ? "bg-azulClaro" : "bg-azul"
                } max-[370px]:text-sm max-[370px]:w-32  block w-48 text-white text-center font-bold my-3 mx-2 py-2 rounded-lg  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300`}
              >
                Dados Pessoais
              </button>
              <button
                onClick={() => {
                  setForm("passwordForm");
                }}
                className={` ${
                  form === "passwordForm" ? "bg-azulClaro" : "bg-azul"
                } max-[370px]:text-sm max-[370px]:w-32 block w-48 text-white text-center font-bold my-3 mx-2 py-2 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300`}
              >
                Senha
              </button>
              <button
                onClick={() => {
                  setForm("logout");
                  handleLogout();
                }}
                className={` ${
                  form === "logout" ? "bg-azulClaro" : "bg-azul"
                } max-[370px]:text-sm max-[370px]:w-32  block w-48 text-white text-center font-bold my-3 mx-2 py-2 rounded-lg  transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300`}
              >
                Sair da Minha Conta
              </button>
            </Col>
            <Col md>
              {form === "userForm" ? <UserForm /> : <PasswordForm />}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
