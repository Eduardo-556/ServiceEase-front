import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex justify-center items-center">
      <div className="">{children}</div>
    </main>
  );
}
