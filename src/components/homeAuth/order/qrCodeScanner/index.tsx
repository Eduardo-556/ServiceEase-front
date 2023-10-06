import { useRouter } from "next/navigation";
import { useState } from "react";

import { QrReader } from "react-qr-reader";
export default function QRCodeScanner() {
  const router = useRouter();
  const [resultado, setResultado] = useState("");

  const handleScan = (data: any, error: any) => {
    if (data) {
      setResultado(data.text);
      router.push(data.text);
      return;
    }
    handleError(error);
  };

  const handleError = (error: any) => {
    console.error(error);
  };

  const handleRedirect = (data: any) => {
    router.push(data.text);
    console.log(data.text);
  };

  return (
    <>
      <div>
        <QrReader
          constraints={{ facingMode: "user" }}
          scanDelay={0}
          onResult={handleScan}
          videoStyle={{ width: "100%" }}
        />
        <p>resultado: {resultado}</p>
      </div>
    </>
  );
}
