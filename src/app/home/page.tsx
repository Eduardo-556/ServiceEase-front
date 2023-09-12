"use client";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (!sessionStorage.getItem("serviceEase-token")) {
      router.push("/login");
    }
  });
  return (
    <>
      <div className="bg-branco px-2 py-2 ">
        <div className="mx-auto  text-center">
          <h2 className="mt-2 text-4xl font-bold tracking-light text-azulClaro md:text-6xl">
            Home
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dicta
            minima nostrum omnis dolores recusandae quas corrupti tempore?
            Debitis veniam tempora vitae perspiciatis asperiores placeat ipsa
            aut voluptas ratione nostrum? Necessitatibus?
          </p>
        </div>
      </div>
    </>
  );
}
