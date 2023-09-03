import HeaderGeneric from "@/components/common/headerGeneric";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ServiceEase | Register",
};

export default function Register() {
  return (
    <>
      <main>
        <HeaderGeneric
          logoUrl="/"
          btnUrl="/login"
          btnContent="Quero fazer login"
        />
      </main>
    </>
  );
}
