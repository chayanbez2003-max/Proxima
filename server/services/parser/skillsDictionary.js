/**
 * skillsDictionary.js
 *
 * COMPATIBILITY SHIM — do NOT add skills here.
 *
 * This file previously maintained a separate, parser-local skills list.
 * It has been unified with the platform-wide master catalog in:
 *   server/data/skillsCatalog.js
 *
 * Re-exporting from the catalog keeps both the parser (M2) and the
 * career intelligence engine (M3) reading from a single source of truth.
 * Any skills added to skillsCatalog.js are automatically picked up by
 * the parser on the next server restart.
 */
export { SKILLS_CATALOG as SKILLS_DICTIONARY } from "../../data/skillsCatalog.js";
