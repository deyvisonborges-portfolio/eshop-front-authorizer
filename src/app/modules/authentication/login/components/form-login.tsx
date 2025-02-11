"use client";

import { Button, Form, Heading, Text } from "@/@lib-ui";

export function FormLogin() {
  return (
    <div id="container">
      <header>
        <Heading as="h1" size="large" weight="medium">
          Create an account
        </Heading>
        <Text>Enter your email below to create your account</Text>

        <div data-testid="form-container">
          <Form>
            <input type="email" placeholder="name@example.com" />
            <Button>Sign In with Email</Button>
          </Form>
        </div>
      </header>

      <footer>
        <div>
          <input type="checkbox" />
          <label htmlFor="">Remember-me</label>
        </div>
      </footer>
    </div>
  );
}

export function InputPassword() {
  return (
    <div>
      <div id="label-container" className="flex items-center justify-center">
        <span>Password</span>
        <button id="button-link">Forget your password?</button>
      </div>
      <input type="password" placeholder="*****" />
    </div>
  );
}

export function SocialLogin() {
  /**
   * display grid
   * grid-template-columns: repeat(1fr, 3)
   * gap: 24px;
   *
   * cada botao deve ser 100%
   */
  return (
    <div id="container" className="grid w-100">
      <button id="button-icon">Google Icon</button>
      <button id="button-icon">Apple Icon</button>
      <button id="button-icon">Github Icon</button>
    </div>
  );
}
