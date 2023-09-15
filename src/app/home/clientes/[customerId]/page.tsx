"use client";

import CustomerInfo from "@/components/homeAuth/customer/customerInfo";
import customerService, { CustomerType } from "@/services/customerService";

import { useEffect, useState } from "react";

export interface ParamsType {
  customerId: string;
}

export default function Page({ params }: { params: ParamsType }) {
  const [customer, setCustomer] = useState<CustomerType>();
  const customerId = params.customerId;
  const getCustomer = async function () {
    if (typeof customerId !== "string") {
      console.log(typeof customerId);
      return;
    }
    const res = await customerService.getDetails(customerId);

    setCustomer(res.data);
  };

  useEffect(() => {
    getCustomer();
  }, [customerId]);

  return (
    <>
      <div>
        <CustomerInfo params={params} />
      </div>
    </>
  );
}
