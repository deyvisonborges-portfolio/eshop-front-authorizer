import Image from "next/image";
import styles from "./page.module.css";
import { EyeIcon } from "@/lib/icons/eye";

export default function Home() {
  return (
    <>
      <EyeIcon />
      <EyeIcon size="large" />
      <EyeIcon size="medium" />
      <EyeIcon size="mini" />
      <EyeIcon size="regular" />
      <EyeIcon size="small" />
    </>
  );
}
