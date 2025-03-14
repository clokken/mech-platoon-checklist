import FACTION_PLANETS_JSON from "../assets/faction_planets.json";

export { FACTION_PLANETS_JSON as FACTION_PLANETS };

export type FactionName = keyof typeof FACTION_PLANETS_JSON;

export const FACTION_NAMES = Object.keys(FACTION_PLANETS_JSON) as readonly FactionName[];

export function isFactionName(str: string): str is FactionName {
  if (str === '') return false;
  return (FACTION_NAMES as readonly string[]).includes(str);
}
