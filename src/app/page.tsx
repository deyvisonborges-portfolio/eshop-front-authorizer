import Button from "@/@lib-ui/src/core-components/button";
import { EyeIcon } from "@/lib/icons/eye";
// import { Button } from "@/components/button";
import { ThemeProvider } from "@/styles/theme.provider";

export default function Home() {
  return (
    <ThemeProvider>
      <Button />
      <EyeIcon />
      <EyeIcon size="large" />
      <EyeIcon size="medium" />
      <EyeIcon size="mini" />
      <EyeIcon size="regular" />
      <EyeIcon size="small" />

      <div style={{ backgroundColor: "#222", padding: "20px", color: "white" }}>
        <h2>Button Squared (Default)</h2>
        <Button size="mini">Mini Button</Button>
        <Button size="small">Small Button</Button>
        <Button size="medium">Medium Button</Button>
        <Button size="regular">Regular Button</Button>
        <Button size="large">Large Button</Button>

        <h2>Button Rounded</h2>
        <Button size="mini" variant="rounded">
          Mini Button
        </Button>
        <Button size="small" variant="rounded">
          Small Button
        </Button>
        <Button size="medium" variant="rounded">
          Medium Button
        </Button>
        <Button size="regular" variant="rounded">
          Regular Button
        </Button>
        <Button size="large" variant="rounded">
          Large Button
        </Button>

        <h2>Button Pill</h2>
        <Button size="mini" variant="pill">
          Mini Button
        </Button>
        <Button size="small" variant="pill">
          Small Button
        </Button>
        <Button size="medium" variant="pill">
          Medium Button
        </Button>
        <Button size="regular" variant="pill">
          Regular Button
        </Button>
        <Button size="large" variant="pill">
          Large Button
        </Button>

        {/* <h2>With Icon</h2>
        <Button size="mini" icon={<Eye />}>
          Mini Button
        </Button>
        <Button size="small" icon={<Eye />}>
          Small Button
        </Button>
        <Button size="medium" icon={<Eye />}>
          Medium Button
        </Button>
        <Button size="regular" icon={<Eye />}>
          Regular Button
        </Button>
        <Button size="large" icon={<Eye />}>
          Large Button
        </Button> */}
      </div>
    </ThemeProvider>
  );
}
