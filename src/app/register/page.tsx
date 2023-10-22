import HeaderGeneric from "@/components/common/headerGeneric";
import RegisterBody from "@/components/homeNoAuth/register";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "ServiceEase | Register",
};

export default function Register() {
  return (
    <>
      <div className="bg-gradient-to-b from-branco to-gray-300 dark:bg-primeiroPlano">
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/login"
          btnContent="Quero fazer login"
        />
        <RegisterBody />
      </div>
    </>
  );
}
