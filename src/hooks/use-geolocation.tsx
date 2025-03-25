"use client"

import { useCallback, useState } from "react"

export function useGeolocation() {
  const [location, setLocation] = useState<[number, number] | undefined>()
  const [error, setError] = useState<string | undefined>()

  const getLocation = useCallback(async () => {
    if (!("geolocation" in navigator)) {
      setError("Geolocalização não é suportada pelo seu navegador")
      return
    }

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          })
        }
      )

      const { latitude, longitude } = position.coords
      setLocation([latitude, longitude])
    } catch (err) {
      // navigator.geolocation.getCurrentPosition(
      //   async (position) => {
      //     const { latitude, longitude } = position.coords
      //     const response = await fetch(
      //       `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      //     )
      //     const data = await response.json()
      //     console.log(data)
      //   },
      //   (err) => {
      //     console.error(`Erro ao obter localização: ${err.message}`)
      //   }
      // )
      if (err instanceof GeolocationPositionError) {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError("Permissão para geolocalização negada")
            break
          case err.POSITION_UNAVAILABLE:
            setError("Informações de localização indisponíveis")
            break
          case err.TIMEOUT:
            setError("Tempo esgotado ao buscar localização")
            break
          default:
            setError("Erro desconhecido ao obter localização")
        }
      } else {
        setError("Erro ao obter localização")
      }
    }
  }, [])

  const getCepFromCoords = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      )
      const data = await response.json()
      const postalCode = data.address?.postcode || "CEP não encontrado"
      console.log(postalCode)
    } catch (err) {
      console.error("Erro ao buscar o CEP.")
    }
  }

  return { getLocation, location, error }
}
