import { useRouter } from "next/navigation";
import { QrReader } from "react-qr-reader";

export default function QRCodeScanner() {
  const router = useRouter();

  const handleScan = (data: any, error: any) => {
    if (data) {
      router.push(data.text);
      return;
    }
    handleError(error);
  };

  const handleError = (error: any) => {
    console.error(error);
  };

  return (
    <>
      <h1 className="text-center text-2x pt-5 text-azulClaro font-bold">
        Aponte a webCam para o QRCode.
      </h1>
      <div className="flex justify-center items-center">
        <div className="w-[300px] h-[300px]">
          <QrReader
            constraints={{ facingMode: "environment" }}
            scanDelay={0}
            onResult={handleScan}
            videoStyle={{
              width: "300px",
              height: "300px",

              border: "2px solid #333",
              borderRadius: "10px",
              boxShadow: "2px 2px 5px #888",
            }}
          />
        </div>
      </div>
    </>
  );
}
