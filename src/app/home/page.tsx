import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ServiceEase | Home",
};

export default function Home() {
  return (
    <>
      <div className="bg-branco px-6 py-24 sm:py-32 lg:px-8 h-screen lg:pl-72">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mt-2 text-4xl font-bold tracking-light text-azulClaro md:text-6xl">
            Home
          </h2>
        </div>
      </div>
    </>
  );
}