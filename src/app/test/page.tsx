import { Form } from "@/@lib-ui";
import styles from "./page.module.css";

export default function TestPage() {
  return (
    <Form utilities={[styles.test, styles.otherTest]}>
      {/* <Form utilities={Object.values(styles)}> */}
      <div className="deyvin">Test Page</div>
    </Form>
  );
}
