"use state"

import { Form, Input } from "@/@lib-ui"

export default function AddressAppRoute() {
  return (
    <Form>
      <Input name="email" placeholder="Informe seu e-mail" />
    </Form>
  )
}
