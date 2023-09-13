"use client";
import customerService from "@/services/customerService";
import { CustomerType } from "@/services/customerService";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState<CustomerType[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("serviceEase-token")) {
      router.push("/login");
    }
  });

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
  }, [searchName]);

  return (
    <>
      <div className="flex min-h-screen justify-center overflow-hidden mt-4">
        <div className="flex flex-col items-center w-full  max-[452px]:w-60">
          <form onSubmit={handleSearch}>
            <div className="flex justify-between overflow-hidden rounded-md bg-white shadow shadow-black/20 max-[452px]:w-64">
              <input
                name="search"
                type="search"
                className="flex py-2 px-3 focus:outline-none"
                placeholder="Pesquisar..."
                value={searchName}
                onChange={(event) => {
                  setSearchName(event.currentTarget.value.toLowerCase());
                }}
              />
              <span
                onClick={handleSearchClick}
                className="m-1 inline-flex cursor-pointer items-center rounded-md bg-azul px-2 py-2 hover:bg-azulClaro"
              >
                <MagnifyingGlassIcon className="w-4 h-4 text-white" />
              </span>
            </div>
          </form>
          <ul className="p-0 ml-1 mr-2">
            {searchResult?.map((customer) => (
              <li key={customer.id}>
                <Link
                  href={`/home/clientes/${customer.id}`}
                  className="no-underline"
                >
                  <div className="mt-2 w-full overflow-hidden rounded-md bg-white">
                    <div className="py-2 px-3 hover:bg-slate-100">
                      <p className="text-sm  text-gray-600 font-bold">
                        {`${customer.firstName.toUpperCase()} ${customer.lastName.toUpperCase()}`}
                      </p>
                      <div className="text-sm text-gray-500 break-words max-[452px]:text-xs">
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
        </div>
      </div>
    </>
  );
}
