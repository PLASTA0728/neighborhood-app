import avocadoWorld from "./map-styles/avocado-world";
import blueEssence from "./map-styles/blue-essence";
import wy from "./map-styles/wy";

export const STYLE_MAP: Record<string, any> = {
  'light': null, // tells the map to use default style
  'dark': null,
  'avocado-world': avocadoWorld,
  'blue-essence': blueEssence,
  'wy': wy,
};