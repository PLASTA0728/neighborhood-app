export type MapConfig = {
  id: string;
  label: string;
  mapId: string;
}

export const MAP_CONFIGS : MapConfig[] = [
  {
    id: "default",
    label: "Default",
    mapId: process.env.DEFAULT,
  },
  {
    id: "wy",
    label: "Wy",
    mapId: process.env.WY,
  },
  {
    id: "avocadoWorld",
    label: "AvocadoWorld",
    mapId: process.env.AVOCADO_WORLD, 
  },
  {
    id: "blueEssence",
    label: "BlueEssence",
    mapId: process.env.BLUE_ESSENCE,
  }
]