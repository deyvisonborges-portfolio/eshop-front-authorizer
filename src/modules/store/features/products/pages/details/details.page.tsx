"use client"

import styles from "./details.module.css"
import { Button, Heading, Text } from "@/@lib-ui"
import { ProductUIModel } from "../../product.ui-model"
import { useEffect, useTransition } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useLoading } from "@/providers/loading.provider"
import { useCart } from "../../../cart/use-cart"
import { useSnackbar } from "notistack"
import { MongoCartService } from "@/modules/authentication/service/mongo/cart.service"
import {
  refreshProductDataByTag,
  refreshProductPage,
} from "@/app/(storefront)/product/[id]/actions"

type ProductDetailsPageProps = {
  product: ProductUIModel
  serverTimestamp: string
}

export function ProductDetailsPage({
  product,
  serverTimestamp,
}: ProductDetailsPageProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { enqueueSnackbar } = useSnackbar()

  const { handleAddItem } = useCart()

  const { startLoading, stopLoading } = useLoading()
  const [isPending, startTransition] = useTransition()

  const size = searchParams.get("size") || ""
  const color = searchParams.get("color") || ""

  const updateQuery = (key: "size" | "color", value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)

    startTransition(() =>
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    )
  }

  const handleClickAddToCart = () => {
    if (!size || !color) {
      enqueueSnackbar("Selecione as opções desejadas", {
        variant: "error",
      })
      return
    }
    startTransition(async () => {
      // await new MongoCartService().createCart({
      //   id: "",
      //   properties: undefined,
      // })
      handleAddItem({
        ...product,
        size,
        color,
        miniThumbUrl: product.images[0],
      })
      enqueueSnackbar("Produto adicionado ao carrinho", {
        variant: "success",
      })
    })
  }

  useEffect(() => {
    if (isPending) {
      startLoading()
      return
    }
    stopLoading()
  }, [isPending])

  return (
    <>
      <Button onClick={async () => await refreshProductPage()}>
        Revalidar Página
      </Button>

      <Button onClick={async () => await refreshProductDataByTag(product.id)}>
        Revalidar por tag
      </Button>
      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img
            src={product.images[0]}
            alt="Product image"
            width={600}
            height={600}
            className={styles.image}
          />
        </div>

        <div className={styles.details}>
          <Heading as="h1" weight="bold" size="small" className={styles.title}>
            {product.name}
          </Heading>

          <div className={styles.pricing}>
            <Heading as="h4" size="small" weight="bold">
              R$ {product.price}
            </Heading>
            <Text size="small" className={styles.installments}>
              Em até 12x de R$ 24,99
            </Text>
          </div>

          <div className={styles.options}>
            <div className={styles.optionGroup}>
              <Text size="large" weight="bold">
                Tamanhos disponíveis
              </Text>
              <div className={styles.sizeButtons}>
                {product?.sizes?.map((_size) => (
                  <Button
                    key={_size}
                    className={_size === size ? styles.focused : ""}
                    onClick={() => updateQuery("size", _size)}
                  >
                    {_size}
                  </Button>
                ))}
              </div>
            </div>

            <div className={styles.optionGroup}>
              <Text size="large" weight="bold">
                Cores disponíveis
              </Text>
              <div className={styles.colorButtons}>
                {product?.colors?.map((_color) => (
                  <Button
                    key={_color}
                    className={_color === color ? styles.focused : ""}
                    onClick={() => updateQuery("color", _color)}
                  >
                    {_color}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <Button className={styles.addToCart} onClick={handleClickAddToCart}>
              Adicionar ao carrinho
            </Button>
          </div>

          <div className={styles.description}>
            <h3 className={styles.descriptionTitle}>Descrição do produto</h3>
            <p className={styles.descriptionText}>{product.description}</p>
          </div>
        </div>
      </div>
    </>
  )
}
