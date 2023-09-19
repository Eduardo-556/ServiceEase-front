"use client";

import ordersService, { OrderType } from "@/services/ordersService";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState<OrderType[]>([]);

  useEffect(() => {
    if (!sessionStorage.getItem("serviceEase-token")) {
      router.push("/login");
    }
  });

  const searchOrders = async function () {
    const res = await ordersService.getSearch(searchName);
    setSearchResult(res.data);
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchOrders();
  };

  const handleSearchClick = () => {
    searchOrders();
  };

  useEffect(() => {
    searchOrders();
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
            {searchResult?.map((order) => (
              <li key={order.id}>
                <Link
                  href={`/home/servicos/${order.id}`}
                  className="no-underline"
                >
                  <div className="mt-2 w-full overflow-hidden rounded-md bg-white">
                    <div className="py-2 px-3 hover:bg-slate-100">
                      <p className="text-sm  text-gray-600 font-bold">
                        {`${order.deviceModel.toUpperCase()}`}
                      </p>
                      <div className="text-sm text-gray-500 break-words max-[452px]:text-xs">
                        <span className="font-bold">Status: </span>
                        <span
                          className={`
                                    ${
                                      order.serviceStatus === "pending"
                                        ? "text-red-500"
                                        : ""
                                    }
                                    ${
                                      order.serviceStatus === "started"
                                        ? "text-green-500"
                                        : ""
                                    }
                                    ${
                                      order.serviceStatus === "paused"
                                        ? "text-yellow-500"
                                        : ""
                                    }
                                    ${
                                      order.serviceStatus === "ended"
                                        ? "text-gray-500"
                                        : ""
                                    }
                                    `}
                        >
                          {(() => {
                            switch (order.serviceStatus) {
                              case "pending":
                                return "Pendente";
                              case "started":
                                return "Iniciado";
                              case "paused":
                                return "Pausado";
                              case "ended":
                                return "Finalizado";
                              default:
                                return "Não definido";
                            }
                          })()}
                        </span>
                        <br />
                        <span className="font-bold">Serviço: </span>
                        {order.serviceDescription} <br />
                        <span className="font-bold">Cliente: </span>
                        {`${order.Customer.firstName.toUpperCase()} ${order.Customer.lastName.toUpperCase()}`}
                        <br />
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
