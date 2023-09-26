"use client";

import OrderShowHome from "@/components/homeAuth/order/orderShowHome";
import profileService from "@/services/profileService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import SpinnerLoading from "@/components/common/spinnerLoading";

export default function Home() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (!Cookies.get("serviceEase-token")) {
      localStorage.setItem("paginaAnterior", window.location.href);
      router.push("/login");
    } else {
      localStorage.removeItem("paginaAnterior");
    }
  }, []);

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    });
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <SpinnerLoading />;
  }

  return (
    <>
      <div className="flex flex-col justify-items-center items-center">
        <h1 className="text-center text-5xl font-bold text-azulClaro p-3 max-[509px]:text-4xl max-[333px]:text-2xl">
          Welcome to ServiceEase <br />
          <span className="text-azul">{` ${firstName} ${lastName}`}</span>!
        </h1>
        <div className="flex">
          <Link
            href="/home/servicos/cadastro"
            className="no-underline  text-white text-center font-bold my-3 mx-2 py-2 px-2 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300"
          >
            Cadastrar Serviço
          </Link>
          <Link
            href="/home/clientes/cadastro"
            className="no-underline  text-white text-center font-bold my-3 mx-2 py-2 px-2 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300"
          >
            Cadastrar cliente
          </Link>
          <Link
            href="/home/clientes/cadastro"
            className="no-underline  text-white text-center font-bold my-3 mx-2 py-2 px-2 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300"
          >
            Ler QRCode
          </Link>
        </div>
      </div>
      {Cookies.get("serviceEase-token") ? <OrderShowHome /> : <></>}
    </>
  );
}
