"use client";

import profileService from "@/services/profileService";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ClipboardIcon,
  HomeIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { useEffect, useState } from "react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  const [expanded, setExpandes] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    profileService.fetchCurrent().then((user) => {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
    });
  }, []);

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
      <nav className="h-screen flex flex-col bg-azul bg-opacity-95 border-r border-r-azulClaro shadow-sm">
        <div className="p-1 pb-2 flex justify-between items-center">
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

        <ul className={`flex-1 ${expanded ? "px-3" : "px-0"}`}>
          {sidebarOptions.map((option) => (
            <li key={option.name}>
              <Link
                href={option.href}
                className={classNames(
                  option.current
                    ? "bg-gray-800 text-azulClaro border-azulClaro border-2 "
                    : "text-gray-400 hover:text-white hover:bg-gray-700",
                  `group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold no-underline ${
                    expanded ? "" : "gap-0 p-0"
                  }`
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
                    expanded ? "w-20 ml-3" : "w-0"
                  }`}
                >
                  {option.name}
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/home/profile"
          className={` ${
            `/${segment}` === "/profile"
              ? "bg-gray-800 text-azulClaro border-azulClaro border-2 "
              : "text-gray-400 hover:text-white hover:bg-gray-700"
          } group flex  rounded-md  text-sm font-semibold no-underline  items-center justify-center ${
            expanded ? "px-3 py-3" : "px-0 py-3"
          }`}
        >
          <BuildingStorefrontIcon
            className={`group-hover:text-azulClaro h-8 w-8 shrink-0 ${
              `/${segment}` === "/profile" ? "text-azulClaro" : "text-gray-300"
            }`}
          />
          <div
            className={`overflow-hidden transition-all ${
              expanded ? "ml-3" : "w-0"
            }`}
          >
            {`${firstName} ${lastName}`}
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
