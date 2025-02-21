"use client";
import { Button, Form, Input } from "@/@lib-ui";
import { InputCheckbox } from "@/@lib-ui/src/core-components/input-checkbox";
import InputOTP from "@/@lib-ui/src/core-components/input-otp";
import { InputRadio } from "@/@lib-ui/src/core-components/input-radio";
import { EyeIcon } from "@/@lib-icons/src/icons/eye";
// import { Button } from "@/components/button";
import { ThemeProvider } from "@/styles/theme.provider";
import { ProductCard } from "@/modules/store/features/products/components/product-card";
import Link from "next/link";

// <Button />
//       <EyeIcon />
//       <EyeIcon size="large" />
//       <EyeIcon size="medium" />
//       <EyeIcon size="mini" />
//       <EyeIcon size="regular" />
//       <EyeIcon size="small" />

//       <div style={{ padding: "20px", color: "white" }}>
//         <h2>Button Squared (Default)</h2>
//         <Button size="mini">Button</Button>
//         <Button size="small">Button</Button>
//         <Button size="medium">Button</Button>
//         <Button size="regular">Button</Button>
//         <Button size="large">Button</Button>

//         <h2>Button Rounded</h2>
//         <Button size="mini" variant="rounded">
//           Button
//         </Button>
//         <Button size="small" variant="rounded">
//           Button
//         </Button>
//         <Button size="medium" variant="rounded">
//           Button
//         </Button>
//         <Button size="regular" variant="rounded">
//           Button
//         </Button>
//         <Button size="large" variant="rounded">
//           Button
//         </Button>

//         <h2>Button Pill</h2>
//         <Button size="mini" variant="pill">
//           Button
//         </Button>
//         <Button size="small" variant="pill">
//           Button
//         </Button>
//         <Button size="medium" variant="pill">
//           Button
//         </Button>
//         <Button size="regular" variant="pill">
//           Button
//         </Button>
//         <Button size="large" variant="pill">
//           Button
//         </Button>

//         <h2>Button Colors (WIP)</h2>
//         <Button color="primary">Primary Color</Button>
//         <Button color="secondary">Secondary Color</Button>

//         {/* <h2>With Icon</h2>
//         <Button size="mini" icon={<Eye />}>
//           Button
//         </Button>
//         <Button size="small" icon={<Eye />}>
//           Button
//         </Button>
//         <Button size="medium" icon={<Eye />}>
//           Button
//         </Button>
//         <Button size="regular" icon={<Eye />}>
//           Button
//         </Button>
//         <Button size="large" icon={<Eye />}>
//           Button
//         </Button> */}
//       </div>
export default function Home() {
  return (
    <>
      <Link href="/product/test">
        <ProductCard />
      </Link>
    </>
  );
}
