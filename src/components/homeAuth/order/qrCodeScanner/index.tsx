import { useRouter } from "next/navigation";
import { QrReader } from "@blackbox-vision/react-qr-reader";

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
        <div className=" w-72 h-72 relative ">
          <QrReader
            constraints={{ facingMode: "user" }}
            scanDelay={0}
            onResult={handleScan}
            videoStyle={{
              width: "320",
            }}
          />
          <div className="absolute inset-0 border-4 border-dashed border-red-500  m-16 "></div>
        </div>
      </div>
    </>
  );
}
