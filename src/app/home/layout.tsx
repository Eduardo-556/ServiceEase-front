import Sidebar from "@/components/homeAuth/sidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const layout = (props: Props) => {
  return (
    <div className="flex mx-auto w-full">
      <div>
        <Sidebar />
      </div>
      <main className="w-full">{props.children}</main>
    </div>
  );
};

export default layout;
