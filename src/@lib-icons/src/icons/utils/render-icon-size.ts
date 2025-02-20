import { IconProps } from "../../types";

export const renderIconSize = (size: IconProps["size"] = "regular") => {
  switch (size) {
    case "mini":
      return 12;
    case "small":
    case "medium":
      return 16;
    case "regular":
      return 20;
    case "large":
      return 24;
    default:
      return 20;
  }
};
