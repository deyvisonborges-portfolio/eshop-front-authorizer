import { EyeIcon } from "@/lib/icons/eye";
import { Button } from "@/components/button";
import { ThemeProvider } from "@/styles/theme.provider";

export default function Home() {
  return (
    <ThemeProvider>
      <Button />
      <EyeIcon />
      <h1 className="deyv">teste</h1>
      <EyeIcon size="large" />
      <EyeIcon size="medium" />
      <EyeIcon size="mini" />
      <EyeIcon size="regular" />
      <EyeIcon size="small" />
    </ThemeProvider>
  );
}
