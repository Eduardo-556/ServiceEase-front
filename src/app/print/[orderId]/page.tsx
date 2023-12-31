"use client";
import QRCode from "qrcode.react";
import { ParamsType } from "../../home/servicos/[orderId]/page";
import { useEffect, useState } from "react";
import ordersService from "@/services/ordersService";
import SpinnerLoading from "@/components/common/spinnerLoading";

export default function Print({ params }: { params: ParamsType }) {
  const orderId = params.orderId;

  const [deviceModel, setDeviceModel] = useState("");
  const [deviceSerial, setDeviceSerial] = useState("");
  const [deviceImei, setDeviceImei] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [deadline, setDeadline] = useState(new Date());
  const [createdAt, setCreatedAt] = useState(new Date());
  const [customerFirstName, setCustomerFirstName] = useState("");
  const [customerLastName, setCustomerLastName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [url, setUrl] = useState("");
  const date = new Date(createdAt);
  const month = date.toLocaleDateString("default", { month: "long" });
  const deadlineDate = new Date(deadline);
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // Lembrar de trocar para window.location.href
    //const currentUrl = `http://192.168.0.104:3001/home/servicos/${orderId}`;
    const currentUrl = `https://serviceease.vercel.app/home/servicos/${orderId}`;
    setUrl(currentUrl);
  }, []);

  useEffect(() => {
    ordersService.getDetails(orderId).then((order) => {
      setDeviceModel(order.deviceModel);
      setDeviceSerial(order.deviceSerial);
      setDeviceImei(order.deviceImei);
      setServiceDescription(order.serviceDescription);
      setDeadline(order.deadline);
      setCreatedAt(order.createdAt);
      setCustomerFirstName(order.Customer.firstName);
      setCustomerLastName(order.Customer.lastName);
      setCustomerEmail(order.Customer.email);
      setCustomerPhone(order.Customer.phone);
    });
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <SpinnerLoading />;
  }
  return (
    <main className="bg-white">
      <h1 className="text-center">{deviceModel}</h1>
      <h5 className="text-center">
        Ordem de Serviço aberta em{" "}
        {`${date.getDate()} de ${month} de ${date.getFullYear()}`}
      </h5>
      <div className="flex gap-2 items-center justify-center p-2">
        <div id="orderInfo">
          <h4>
            <strong> Cliente: </strong>
            {customerFirstName} {customerLastName}
          </h4>

          <h5>
            <strong>Descrição do serviço: </strong>
            {serviceDescription}
          </h5>
          <h5>
            <strong>IMEI / Serial :</strong> {deviceImei} {deviceSerial}
          </h5>
          <h5>
            <strong>Prazo para entrega: </strong>
            {deadlineDate.toLocaleDateString("default", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
            })}
          </h5>
          <h5>
            <strong>Contato: </strong>
            {customerPhone} / {customerEmail}
          </h5>
        </div>
        <div id="qrCode">
          <p className="text-[10px] text-center">
            Use o Leitor de QRCode da Home
          </p>
          <QRCode value={url} />
        </div>
      </div>
    </main>
  );
}
