"use client"

import { MapPinIcon } from "@/@lib-icons/src/icons/map-pin"
import styles from "./styles.module.css"

import { Button, Form, Heading, Input, Spinner, Text } from "@/@lib-ui"
import { useStepper } from "@/@lib-ui/src/core-components/stepper"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { useRouter } from "next/navigation"
import { useSnackbar } from "notistack"
import { useState, useTransition } from "react"
import { useGeolocation } from "@/hooks/use-geolocation"
import { error } from "console"

export default function ShippingAddressAppRoute() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [selectedOption, setSelectedOption] = useState("current")
  const [cep, setCep] = useState("")
  const [address, setAddress] = useState({
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "Brasil",
  })

  const { goToNextStep, data, setData } = useStepper()
  const { getLocation, error: geoLocationError } = useGeolocation()
  const { enqueueSnackbar } = useSnackbar()

  if (geoLocationError) {
    enqueueSnackbar(geoLocationError, { variant: "error" })
  }

  const updateAddress = async () => {
    try {
      // https://react.dev/reference/react/useTransition
      startTransition(async () => {
        const fetcher = (await (
          await fetch("/api/address", { method: "PUT" })
        ).json()) as any

        if (fetcher?.success) {
          setData({ ...data, address })
          goToNextStep()
        }
      })
    } catch (error) {
      if (isRedirectError(error)) {
        router.refresh()
      }
    }
  }

  const fetchAddressByCep = async (cep: string) => {
    if (cep.length !== 8) return

    startTransition(async () => {
      try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const data = await response.json()

        if (data.erro) {
          enqueueSnackbar("CEP não encontrado", { variant: "error" })
          return
        }

        setAddress({
          street: data.logradouro,
          city: data.localidade,
          state: data.uf,
          postalCode: data.cep,
          country: "Brasil",
        })
      } catch (error) {
        enqueueSnackbar("Erro ao buscar CEP", { variant: "error" })
      }
    })
  }

  return (
    <div>
      <Heading as="h3" size="medium">
        Escolha a forma de entrega
      </Heading>
      <Text>Por favor, insira seu endereço de entrega</Text>

      <div className={styles["map-container"]} onClick={getLocation}>
        <MapPinIcon />
        <Text>Insira seu endereço para ver a disponibilidade de entrega</Text>
      </div>

      <select
        className={styles.select}
        value={selectedOption}
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="current">Usar endereço atual</option>
        <option value="new">Cadastrar novo endereço</option>
      </select>

      {selectedOption === "new" && (
        <Form>
          <Input
            disabled={isPending}
            name="email"
            label="CEP"
            placeholder="Informe seu CEP"
            defaultValue={cep}
            onChange={(e) => {
              setCep(e.target.value)
              if (e.target.value.length === 8) {
                fetchAddressByCep(e.target.value)
              }
            }}
          />
          <Input
            disabled={isPending}
            name="street"
            label="Endereço"
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
          />
          <Input
            disabled={isPending}
            name="city"
            label="Cidade"
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
          />
          <Input
            disabled={isPending}
            name="state"
            label="Estado"
            value={address.state}
            onChange={(e) => setAddress({ ...address, state: e.target.value })}
          />
          <Input
            disabled={isPending}
            name="postalCode"
            label="Código postal"
            value={address.postalCode}
            onChange={(e) =>
              setAddress({ ...address, postalCode: e.target.value })
            }
          />
          <Input
            disabled={isPending}
            name="country"
            label="País"
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
          />
          <Button disabled={isPending} onClick={updateAddress}>
            {isPending ? <Spinner /> : "Continuar"}
          </Button>
        </Form>
      )}
    </div>
  )
}
