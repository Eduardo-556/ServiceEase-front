"use client";

import ordersService, { OrderType } from "@/services/ordersService";
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

    const intervalId = setInterval(fecthData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Container className="py-5 flex flex-col">
        <span className="text-center font-bold text-2xl text-azulClaro">
          Serviços
        </span>

        <Row className="flex max-[630px]:flex-col py-2">
          <Col className="flex flex-col ">
            <span className="text-center font-semibold text-base text-green-500">
              Iniciados
            </span>
            <ul className="p-0 ml-1 mr-2 max-h-[320px] overflow-y-scroll">
              {searchResult
                ?.filter((order) => order.serviceStatus === "started")
                .map((order) => (
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
          </Col>
          <Col className="flex flex-col ">
            <span className="text-center font-semibold text-base text-yellow-500">
              Pausados
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
          </Col>
          <Col className="flex flex-col ">
            <span className="text-center font-semibold text-base text-red-500">
              Pendente
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
          </Col>
        </Row>
      </Container>
    </>
  );
}
