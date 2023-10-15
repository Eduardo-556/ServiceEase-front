"use client";

import OrderShowHome from "@/components/homeAuth/order/orderShowHome";
import profileService from "@/services/profileService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import SpinnerLoading from "@/components/common/spinnerLoading";
import { ThemeContext } from "@/components/hooks/theme";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export default function Home() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
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
      <div className="flex justify-between ">
        <h1 className="text-center text-5xl font-bold mx-auto text-azulClaro p-3 max-[509px]:text-4xl max-[391px]:text-2xl">
          Welcome to ServiceEase <br />
          <span className="text-azul dark:text-white">{` ${firstName} ${lastName}`}</span>
          !
        </h1>
        <div>
          <button
            onClick={toggleTheme}
            className="m-1 p-2 top-0 rounded-full bg-gray-300 dark:bg-gray-900 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
          >
            {theme === "light" ? (
              <>
                <MoonIcon width={30} />
                <span>Dark</span>
              </>
            ) : (
              <>
                <SunIcon width={30} className="text-yellow-400" />
                <span className="text-textPrimario">Light</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center max-[391px]:flex-col">
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
          href="/home/qrCode"
          className="no-underline  text-white text-center font-bold my-3 mx-2 py-2 px-2 rounded-lg  transition ease-in-out delay-150 bg-azul hover:-translate-y-1 hover:scale-110 hover:bg-azulClaro duration-300"
        >
          Ler QRCode
        </Link>
      </div>
      {Cookies.get("serviceEase-token") ? <OrderShowHome /> : <></>}
    </>
  );
}
