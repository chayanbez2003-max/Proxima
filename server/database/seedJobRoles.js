import JobRole           from "../models/JobRole.model.js";
import { JOB_ROLES_SEED } from "../data/jobRoles.js";

/**
 * seedJobRoles
 *
 * Idempotent seeder — inserts only roles that don't already exist.
 * Called once at server startup from server.js.
 *
 * @returns {Promise<void>}
 */
const seedJobRoles = async () => {
  const existingCount = await JobRole.countDocuments();

  if (existingCount >= JOB_ROLES_SEED.length) {
    console.log(`📋 Job roles already seeded (${existingCount} roles in DB).`);
    return;
  }

  const operations = JOB_ROLES_SEED.map((role) => ({
    updateOne: {
      filter: { role: role.role },
      update: { $setOnInsert: role },
      upsert: true,
    },
  }));

  const result = await JobRole.bulkWrite(operations, { ordered: false });
  console.log(`✅ Job roles seeded: ${result.upsertedCount} inserted, ${result.matchedCount} already existed.`);
};

export { seedJobRoles };
