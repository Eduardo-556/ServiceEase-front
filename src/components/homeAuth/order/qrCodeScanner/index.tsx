"use client";

import jsQR from "jsqr";
import { useEffect } from "react";

export default function QRCodeScanner() {
  useEffect(() => {
    const videoElement = document.createElement("video");
    const canvasElement = document.createElement("canvas");
    const context = canvasElement.getContext("2d");
    let scanning = false;

    const startScanner = () => {
      const constraints = {
        video: {
          facingMode: "environment",
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
          .getUserMedia(constraints)
          .then((stream) => {
            videoElement.srcObject = stream;
            videoElement.play();
            scanning = true;
            scanQRCode();
          })
          .catch((error) => {
            console.error("Error accessing the camera:", error);
          });
      } else {
        console.error("getUserMedia is not supported in this browser.");
      }
    };

    const scanQRCode = () => {
      if (scanning) {
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;
        context!.drawImage(
          videoElement,
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );

        const imageData = context!.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          window.location.href = code.data; // Redirect to the URL in the QR code
          scanning = false;
        }

        requestAnimationFrame(scanQRCode);
      }
    };

    startScanner();
  }, []);
  return <></>;
}
