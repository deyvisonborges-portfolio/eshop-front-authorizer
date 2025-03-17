import { StoreLayout } from "@/modules/store/layouts/store-layout"
import { PropsWithChildren } from "react"

export default function StoreAppLayout({
  children,
}: Readonly<PropsWithChildren>) {
  return <StoreLayout>{children}</StoreLayout>
}
