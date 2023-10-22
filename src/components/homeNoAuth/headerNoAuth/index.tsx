"use client";

import Image from "next/image";
import styles from "./styles.module.scss";
import { Button, Container } from "reactstrap";
import Link from "next/link";

export const HeaderNoAuth = function () {
  return (
    <>
      <div className={`${styles.ctaSection}`}>
        <p className="text-branco">
          Se cadastre e comece a usar nossos serviços!!!
        </p>
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
