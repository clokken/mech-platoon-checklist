import PARTS_JSON from "../assets/parts.json";
import STARTER_PARTS_JSON from "../assets/starter_parts.json";

export { PARTS_JSON as PARTS };
export { STARTER_PARTS_JSON as STARTER_PARTS };

export type PartType = keyof typeof PARTS_JSON;

export const PART_TYPES = Object.keys(PARTS_JSON) as readonly PartType[];
