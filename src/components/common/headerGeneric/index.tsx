"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Container } from "reactstrap";
import styles from "./styles.module.scss";

interface props {
  logoUrl: string;
  btnUrl: string;
  btnContent: string;
}

export default function HeaderGeneric({ logoUrl, btnUrl, btnContent }: props) {
  return (
    <>
      <div className={styles.header}>
        <Container className={styles.headerContainer}>
          <Link href={logoUrl}>
            <Image
              src="/logoServiceEase.svg"
              width={180}
              height={70}
              alt="ServiceEase Logo"
            />
          </Link>
          <Link href={btnUrl}>
            <Button outline color="info" className={styles.headerBtn}>
              {btnContent}
            </Button>
          </Link>
        </Container>
      </div>
    </>
  );
}
