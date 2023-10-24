"use client";
import customerService from "@/services/customerService";
import { CustomerType } from "@/services/customerService";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import Cookies from "js-cookie";
import SpinnerLoading from "@/components/common/spinnerLoading";
export default function Page() {
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState<CustomerType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!Cookies.get("serviceEase-token")) {
      localStorage.setItem("paginaAnterior", window.location.href);
      router.push("/login");
    } else {
      localStorage.removeItem("paginaAnterior");
    }
  }, []);

  const searchCustomer = async function () {
    const res = await customerService.getSearch(searchName);
    setSearchResult(res.data);
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchCustomer();
  };

  const handleSearchClick = () => {
    searchCustomer();
  };

  useEffect(() => {
    searchCustomer();
    setIsLoaded(true);
  }, [searchName]);

  if (!isLoaded) {
    return <SpinnerLoading />;
  }
  return (
    <>
      <div className="flex min-h-screen justify-center overflow-hidden mt-4">
        <div className="flex flex-col items-center w-full  max-[452px]:w-60">
          <form onSubmit={handleSearch}>
            <div className="flex justify-between overflow-hidden rounded-md  shadow shadow-black/20  max-[468px]:w-64 dark:bg-secundario">
              <input
                name="search"
                type="search"
                className="flex py-2 px-3 focus:outline-none bg-slate-50 dark:bg-secundario dark:text-slate-50"
                placeholder="Pesquisar..."
                value={searchName}
                onChange={(event) => {
                  setSearchName(event.currentTarget.value.toLowerCase());
                }}
              />
              <div className="dark:bg-secundario  bg-slate-50 relative right-0">
                <span
                  onClick={handleSearchClick}
                  className="m-1 inline-flex cursor-pointer items-center rounded-md  px-2 py-2 hover:bg-azul "
                >
                  <MagnifyingGlassIcon className=" h-6 text-azulClaro" />
                </span>
              </div>
            </div>
          </form>
          {Cookies.get("serviceEase-token") ? (
            <ul className="p-0 ml-1 mr-2 " suppressHydrationWarning={true}>
              {searchResult?.map((customer) => (
                <li key={customer.id}>
                  <Link
                    href={`/home/clientes/${customer.id}`}
                    className="no-underline"
                  >
                    <div className="mt-2 w-full overflow-hidden rounded-md bg-white dark:bg-secundario">
                      <div className="py-2 px-3 hover:bg-slate-100 dark:bg-secundario">
                        <p className="text-sm  text-gray-600 font-bold dark:text-white">
                          {`${customer.firstName.toUpperCase()} ${customer.lastName.toUpperCase()}`}
                        </p>
                        <div className="text-sm text-gray-500 break-words max-[452px]:text-xs dark:text-textPrimario">
                          <span className="font-bold">Documento: </span>
                          {customer.nif} <br />
                          <span className="font-bold">Email: </span>
                          {customer.email} <br />
                          <span className="font-bold">Contato: </span>
                          {customer.phone} <br />
                          <span className="font-bold">Endereço: </span>
                          {customer.address} <br />
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}
