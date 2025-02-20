import { Heading, Spinner, Text } from "@/@lib-ui";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <h1>Spinner</h1>
      <Spinner />
      <Spinner color="blue" />
      <Spinner color="green" />
      <Spinner color="red" />

      <br />
      <br />
      <h1>Login Page</h1>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Normal</h2>
        <Text size="large" weight="regular" decoration="normal">
          Large, peso regular
        </Text>
        <Text size="large" weight="medium" decoration="normal">
          Large, peso medium
        </Text>
        <Text size="large" weight="bold" decoration="normal">
          Large, peso bold
        </Text>
        <hr />

        <Text size="regular" weight="regular" decoration="normal">
          Regular, peso regular
        </Text>
        <Text size="regular" weight="medium" decoration="normal">
          Regular, peso medium
        </Text>
        <Text size="regular" weight="bold" decoration="normal">
          Regular, peso bold
        </Text>
        <hr />

        <Text size="medium" weight="regular" decoration="normal">
          Medium, peso regular
        </Text>
        <Text size="medium" weight="medium" decoration="normal">
          Medium, peso medium
        </Text>
        <Text size="medium" weight="bold" decoration="normal">
          Medium, peso bold
        </Text>
        <hr />

        <Text size="small" weight="regular" decoration="normal">
          Small, peso regular
        </Text>
        <Text size="small" weight="medium" decoration="normal">
          Small, peso medium
        </Text>
        <Text size="small" weight="bold" decoration="normal">
          Small, peso bold
        </Text>
        <hr />

        <Text size="mini" weight="regular" decoration="normal">
          Mini, peso regular
        </Text>
        <Text size="mini" weight="medium" decoration="normal">
          Mini, peso medium
        </Text>
        <Text size="mini" weight="bold" decoration="normal">
          Mini, peso bold
        </Text>
      </div>

      <br />
      <br />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Normal</h2>
        <Text size="large" weight="regular" decoration="link">
          Large, peso regular
        </Text>
        <Text size="large" weight="medium" decoration="link">
          Large, peso medium
        </Text>
        <Text size="large" weight="bold" decoration="link">
          Large, peso bold
        </Text>
        <hr />

        <Text size="regular" weight="regular" decoration="link">
          Regular, peso regular
        </Text>
        <Text size="regular" weight="medium" decoration="link">
          Regular, peso medium
        </Text>
        <Text size="regular" weight="bold" decoration="link">
          Regular, peso bold
        </Text>
        <hr />

        <Text size="medium" weight="regular" decoration="link">
          Medium, peso regular
        </Text>
        <Text size="medium" weight="medium" decoration="link">
          Medium, peso medium
        </Text>
        <Text size="medium" weight="bold" decoration="link">
          Medium, peso bold
        </Text>
        <hr />

        <Text size="small" weight="regular" decoration="link">
          Small, peso regular
        </Text>
        <Text size="small" weight="medium" decoration="link">
          Small, peso medium
        </Text>
        <Text size="small" weight="bold" decoration="link">
          Small, peso bold
        </Text>
        <hr />

        <Text size="mini" weight="regular" decoration="link">
          Mini, peso regular
        </Text>
        <Text size="mini" weight="medium" decoration="link">
          Mini, peso medium
        </Text>
        <Text size="mini" weight="bold" decoration="link">
          Mini, peso bold
        </Text>
      </div>

      <br />
      <br />

      <div style={{ display: "flex", flexDirection: "column" }}>
        <h2>Normal</h2>
        <Text size="large" weight="regular" decoration="uppercase">
          Large, peso regular
        </Text>
        <Text size="large" weight="medium" decoration="uppercase">
          Large, peso medium
        </Text>
        <Text size="large" weight="bold" decoration="uppercase">
          Large, peso bold
        </Text>
        <hr />

        <Text size="regular" weight="regular" decoration="uppercase">
          Regular, peso regular
        </Text>
        <Text size="regular" weight="medium" decoration="uppercase">
          Regular, peso medium
        </Text>
        <Text size="regular" weight="bold" decoration="uppercase">
          Regular, peso bold
        </Text>
        <hr />

        <Text size="medium" weight="regular" decoration="uppercase">
          Medium, peso regular
        </Text>
        <Text size="medium" weight="medium" decoration="uppercase">
          Medium, peso medium
        </Text>
        <Text size="medium" weight="bold" decoration="uppercase">
          Medium, peso bold
        </Text>
        <hr />

        <Text size="small" weight="regular" decoration="uppercase">
          Small, peso regular
        </Text>
        <Text size="small" weight="medium" decoration="uppercase">
          Small, peso medium
        </Text>
        <Text size="small" weight="bold" decoration="uppercase">
          Small, peso bold
        </Text>
        <hr />

        <Text size="mini" weight="regular" decoration="uppercase">
          Mini, peso regular
        </Text>
        <Text size="mini" weight="medium" decoration="uppercase">
          Mini, peso medium
        </Text>
        <Text size="mini" weight="bold" decoration="uppercase">
          Mini, peso bold
        </Text>
      </div>

      <br />
      <br />
      <h3>Heading</h3>
      <Heading as="h1" size="xxlarge">
        Titulo 1
      </Heading>
      <Heading as="h1" size="xxlarge" formatting="link" weight="medium">
        Titulo 1
      </Heading>
      <Heading as="h1" size="xxlarge" formatting="uppercase" weight="bold">
        Titulo 1
      </Heading>
      <Heading as="h2" size="xlarge">
        Titulo 2
      </Heading>
      <Heading as="h3" size="large">
        Titulo 3
      </Heading>
      <Heading as="h4" size="medium">
        Titulo 4
      </Heading>
      <Heading as="h5" size="small">
        Titulo 5
      </Heading>
      <Heading as="h6" size="xsmall">
        Titulo 6
      </Heading>
    </div>
  );
}
