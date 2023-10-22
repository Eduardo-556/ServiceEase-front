"use client";
import Image from "next/image";
import styles from "./styles.module.scss";
import { Button, Container } from "reactstrap";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/components/hooks/theme";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import SpinnerLoading from "@/components/common/spinnerLoading";

export const HeaderNoAuth = function () {
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return <SpinnerLoading />;
  }
  return (
    <>
      <div className={`${styles.ctaSection}`}>
        <p className="text-branco">
          Se cadastre e comece a usar nossos serviços!!!
        </p>
      </div>
      <div>
        <button
          onClick={toggleTheme}
          className="m-1 p-2 top-0 rounded-full bg-gray-300 dark:bg-gray-900 hover:bg-gray-400 dark:hover:bg-gray-600 transition-colors flex items-center space-x-2"
        >
          {theme === "light" ? (
            <>
              <MoonIcon width={30} />
              <span>Dark</span>
            </>
          ) : (
            <>
              <SunIcon width={30} className="text-yellow-400" />
              <span className="text-textPrimario">Light</span>
            </>
          )}
        </button>
      </div>
      <Container className={styles.nav}>
        <Image
          src="/logoServiceEase.svg"
          alt="logoServiceEase"
          width={180}
          height={70}
        />
        <div>
          <Link href="/login">
            <Button className={`${styles.navBtn} dark:bg-azulClaro`} outline>
              Entrar
            </Button>
          </Link>
          <Link href="/register">
            <Button className={`${styles.navBtn} dark:bg-azulClaro`} outline>
              Cadastro
            </Button>
          </Link>
        </div>
      </Container>
    </>
  );
};
