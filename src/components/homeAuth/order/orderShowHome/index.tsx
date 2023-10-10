"use client";

import ordersService, { OrderType } from "@/services/ordersService";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";

export default function OrderShowHome() {
  const [searchName, setSearchName] = useState("");
  const [searchResult, setSearchResult] = useState<OrderType[]>([]);
  const fecthData = async () => {
    const res = await ordersService.getSearch(searchName);
    setSearchResult(res.data);
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <>
      <Container className="py-5 flex flex-col">
        <span className="flex items-center justify-center gap-1 text-center font-bold text-2xl text-azulClaro">
          Serviços
          <button
            onClick={fecthData}
            className="bg-azul rounded-full flex justify-center items-center text-sm p-1 hover:bg-red-500"
          >
            <ArrowPathIcon className="w-4 h-4" /> Atualizar
          </button>
        </span>

        <Row className="flex max-[630px]:flex-col py-2">
          <Col className="flex flex-col ">
            <span className="text-center font-semibold text-base text-green-500">
              {`Iniciados  (${
                searchResult?.filter(
                  (order) => order.serviceStatus === "started"
                ).length
              })`}
            </span>
            <ul className="p-0 ml-1 mr-2 max-h-[320px] overflow-y-scroll">
              {searchResult
                ?.filter((order) => order.serviceStatus === "started")
                .map((order) => (
                  <li key={order.id}>
                    <Link
                      href={`/home/servicos/${order.id}`}
                      className="no-underline "
                    >
                      <div className=" mt-2 w-full overflow-hidden rounded-md  ">
                        <div className="py-2 px-3 hover:bg-slate-100 dark:bg-secundario">
                          <p className="text-sm  text-gray-600 font-bold dark:text-white">
                            {`${order.deviceModel.toUpperCase()}`}
                          </p>
                          <div className="text-sm text-gray-500 break-words max-[452px]:text-xs dark:text-textPrimario">
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
          </Col>
          <Col className="flex flex-col ">
            <span className="text-center font-semibold text-base text-yellow-500">
              {`Pausados  (${
                searchResult?.filter(
                  (order) => order.serviceStatus === "paused"
                ).length
              })`}
            </span>
            <ul className="p-0 ml-1 mr-2 max-h-[320px] overflow-y-scroll">
              {searchResult
                ?.filter((order) => order.serviceStatus === "paused")
                .map((order) => (
                  <li key={order.id}>
                    <Link
                      href={`/home/servicos/${order.id}`}
                      className="no-underline"
                    >
                      <div className="mt-2 w-full overflow-hidden rounded-md bg-white ">
                        <div className="py-2 px-3 hover:bg-slate-100 dark:bg-secundario">
                          <p className="text-sm  text-gray-600 font-bold dark:text-white">
                            {`${order.deviceModel.toUpperCase()}`}
                          </p>
                          <div className="text-sm text-gray-500 break-words max-[452px]:text-xs dark:text-textPrimario">
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
          </Col>
          <Col className="flex flex-col ">
            <span className="text-center font-semibold text-base text-red-500">
              {`Pendente (${
                searchResult?.filter(
                  (order) => order.serviceStatus === "pending"
                ).length
              })`}
            </span>
            <ul className="p-0 ml-1 mr-2 max-h-[320px] overflow-y-scroll">
              {searchResult
                ?.filter((order) => order.serviceStatus === "pending")
                .map((order) => (
                  <li key={order.id}>
                    <Link
                      href={`/home/servicos/${order.id}`}
                      className="no-underline"
                    >
                      <div className="mt-2 w-full overflow-hidden rounded-md bg-white">
                        <div className="py-2 px-3 hover:bg-slate-100 dark:bg-secundario">
                          <p className="text-sm  text-gray-600 font-bold dark:text-white">
                            {`${order.deviceModel.toUpperCase()}`}
                          </p>
                          <div className="text-sm text-gray-500 break-words max-[452px]:text-xs dark:text-textPrimario">
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
          </Col>
        </Row>
      </Container>
    </>
  );
}
