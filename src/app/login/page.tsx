import HeaderGeneric from "@/components/common/headerGeneric";
import LoginBody from "@/components/homeNoAuth/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ServiceEase | Login",
};

export default function Login() {
  return (
    <>
      <main className="bg-gradient-to-b from-branco to-gray-300">
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/register"
          btnContent="Quero fazer parte"
        />
        <LoginBody />
      </main>
    </>
  );
}
