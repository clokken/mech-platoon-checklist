import MISSIONS_LICHEN_JSON from "../assets/missions/lichen.json";
import MISSIONS_RAVINE_JSON from "../assets/missions/ravine.json";
import MISSIONS_SCORCH_JSON from "../assets/missions/scorch.json";
import MISSIONS_RUIN_JSON from "../assets/missions/ruin.json";

import { z } from "zod";

export const MissionInfoSchema = z.object({
  order: z.number().int(),
  faction: z.string().optional(),
  name: z.string(),
  parts: z.union([
    z.string().array(),
    z.literal('*'),
  ]),
  notes: z.string().optional(),
});

export const PlanetInfoSchema = z.object({
  name: z.string(),
  opposition: z.string(),
  missions: MissionInfoSchema.array(),
});

export type MissionInfo = z.infer<typeof MissionInfoSchema>;
export type PlanetInfo = z.infer<typeof PlanetInfoSchema>;

const MISSIONS_LICHEN = MISSIONS_LICHEN_JSON as PlanetInfo;
const MISSIONS_RAVINE = MISSIONS_RAVINE_JSON as PlanetInfo;
const MISSIONS_SCORCH = MISSIONS_SCORCH_JSON as PlanetInfo;
const MISSIONS_RUIN = MISSIONS_RUIN_JSON as PlanetInfo;

PlanetInfoSchema.parse(MISSIONS_LICHEN);
PlanetInfoSchema.parse(MISSIONS_RAVINE);
PlanetInfoSchema.parse(MISSIONS_SCORCH);
PlanetInfoSchema.parse(MISSIONS_RUIN);

export { MISSIONS_LICHEN, MISSIONS_RAVINE, MISSIONS_SCORCH, MISSIONS_RUIN };

const _ALL_PLANETS = [MISSIONS_LICHEN, MISSIONS_RAVINE, MISSIONS_SCORCH, MISSIONS_RUIN];
export const ALL_PLANETS = _ALL_PLANETS as Readonly<typeof _ALL_PLANETS>;

export function getPlanetInfo(planet: string): PlanetInfo | undefined {
  if (planet === 'Lichen') return MISSIONS_LICHEN;
  if (planet === 'Ravine') return MISSIONS_RAVINE;
  if (planet === 'Scorch') return MISSIONS_SCORCH;
  if (planet === 'Ruin') return MISSIONS_RUIN;
}
