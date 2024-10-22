import { DEFAULT_BG_COLOR } from "../constants/constants";

const colorObjectToRGBString = (colorObject) => {
  console.log(colorObject);
  if (colorObject !== DEFAULT_BG_COLOR) {
    console.log("dgdgdgdg")
    const { r, g, b, a } = colorObject?.metaColor;
    return `rgb(${r}, ${g}, ${b}, ${a})`;
  } else {
    return DEFAULT_BG_COLOR;
  }
};

export default colorObjectToRGBString;
