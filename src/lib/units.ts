import UNITS_JSON from "../assets/units.json";

export { UNITS_JSON as UNITS };

export type UnitInfo = typeof UNITS_JSON[number];
