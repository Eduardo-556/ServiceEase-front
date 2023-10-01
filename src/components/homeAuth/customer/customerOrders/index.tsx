"use client";

import { ParamsType } from "@/app/home/clientes/[customerId]/page";
import customerService from "@/services/customerService";
import ordersService, { OrderType } from "@/services/ordersService";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "reactstrap";

export default function CustomerOrders({ customerId }: ParamsType) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const date = new Date(createdAt);
  const month = date.toLocaleDateString("default", { month: "long" });
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState<OrderType[]>([]);

  useEffect(() => {
    customerService.getDetails(customerId).then((customer) => {
      setFirstName(customer.firstName);
      setLastName(customer.lastName);
      setCreatedAt(customer.createdAt);
    });
  }, []);
  const fecthData = async () => {
    const res = await ordersService.getSearch(searchName);
    setSearchResult(res.data);
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <>
      <Container className="border-solid border-1 max-w-full border-azulClaro p-5 pt-0 mt-2">
        <div className="flex items-center justify-center gap-2 w-[80%] mt-5 mx-auto uppercase">
          <p className="text-3xl font-bold break-words max-[501px]:text-xl text-center dark:text-textPrimario">
            {`${firstName} ${lastName}`}
          </p>
        </div>
        <div className="flex justify-center">
          <p className="text-sm text-slate-500 text-center dark:text-secundario">
            Cliente desde <br />
            {`${date.getDate()} de ${month} de ${date.getFullYear()}`}
          </p>
        </div>
        <hr />
        <div className="flex flex-col items-center ">
          <ul className="p-0 ml-1 mr-2 max-h-[320px] overflow-y-scroll">
            {searchResult
              ?.filter((order) => order.customerId === parseInt(customerId))
              .map((order) => (
                <li key={order.id}>
                  <Link
                    href={`/home/servicos/${order.id}`}
                    className="no-underline"
                  >
                    <div className="mt-2 w-full overflow-hidden rounded-md bg-white">
                      <div className="py-2 px-3 hover:bg-slate-100 dark:bg-primeiroPlano">
                        <p className="text-sm  text-gray-600 font-bold dark:text-textPrimario">
                          {`${order.deviceModel.toUpperCase()}`}
                        </p>
                        <div className="text-sm text-gray-500 break-words max-[452px]:text-xs dark:text-secundario">
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
              ))}{" "}
          </ul>
        </div>
      </Container>
    </>
  );
}
