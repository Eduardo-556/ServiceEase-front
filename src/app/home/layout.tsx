import Sidebar from "@/components/homeAuth/sidebar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const layout = (props: Props) => {
  return (
    <main className="flex mx-auto static">
      <div className="h-screen  fixed">
        <Sidebar />
      </div>
      <div className="w-screen ml-14">{props.children}</div>
    </main>
  );
};

export default layout;
