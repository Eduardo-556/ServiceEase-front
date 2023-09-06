"use client";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ClipboardIcon,
  EllipsisVerticalIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const [expanded, setExpandes] = useState(true);

  const segment = useSelectedLayoutSegment();
  const sidebarOptions = [
    {
      name: "Home",
      href: "/home",
      icon: HomeIcon,
      current: !segment ? true : false,
    },
    {
      name: "Clientes",
      href: "/home/clientes",
      icon: UserGroupIcon,
      current: `/${segment}` === "/clientes" ? true : false,
    },
    {
      name: "Serviços",
      href: "/home/servicos",
      icon: ClipboardIcon,
      current: `/${segment}` === "/servicos" ? true : false,
    },
  ];

  return (
    <div className="h-screen">
      <nav className="h-full flex flex-col bg-azul border-r border-r-azulClaro shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="/logoServiceEase.svg"
            alt="logo"
            className={`overflow-hidden transition-all ${
              expanded ? "w-32" : "w-0"
            }`}
          />
          <button
            onClick={() => setExpandes((curr) => !curr)}
            className="p-1.5 rounded-lg  hover:bg-azulClaro"
          >
            {expanded ? (
              <ChevronDoubleLeftIcon className="w-8 text-azulClaro hover:text-vermelho" />
            ) : (
              <ChevronDoubleRightIcon className="w-8 text-azulClaro hover:text-vermelho" />
            )}
          </button>
        </div>

        <ul className="flex-1 px-3">
          {sidebarOptions.map((option) => (
            <li key={option.name}>
              <Link
                href={option.href}
                className={classNames(
                  option.current
                    ? "bg-gray-800 text-azulClaro"
                    : "text-gray-400 hover:text-white hover:bg-gray-700",
                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold no-underline"
                )}
              >
                <option.icon
                  className={classNames(
                    option.current ? "text-azulClaro" : "text-gray-300",
                    " group-hover:text-azulClaro h-8 w-8 shrink-0 "
                  )}
                />
                <div
                  className={`overflow-hidden transition-all ${
                    expanded ? "w-52 ml-3" : "w-0"
                  }`}
                >
                  {option.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="border-t flex p-3 border-t-azulClaro">
          <img src="/user.png" alt="user avatar" className="w-10 h-10" />
          <div
            className={` flex justify-between items-center  overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold text-gray-300 text-center text-base">
                Eduardo Silva
              </h4>
              <span className="text-xs text-gray-400">eduardo@email.com</span>
            </div>
            <button>
              <EllipsisVerticalIcon className="h-8 text-azulClaro hover:text-vermelho" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
