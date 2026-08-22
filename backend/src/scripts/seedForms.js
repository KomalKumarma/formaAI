import { connectDatabase } from "../config/database.js";
import { config } from "../config/env.js";
import { vehicleInsuranceClaim } from "../data/vehicleInsuranceClaim.js";
import { Form } from "../models/Form.js";
import { validateFormSchema } from "../validators/formSchemaValidator.js";

const errors = validateFormSchema(vehicleInsuranceClaim);
if (errors.length) throw new Error(errors.join("\n"));
await connectDatabase(config.mongoUri);
if (!config.mongoUri) throw new Error("Set MONGO_URI before seeding forms.");
await Form.updateOne({ formId: vehicleInsuranceClaim.id, version: vehicleInsuranceClaim.version }, { $set: { formId: vehicleInsuranceClaim.id, ...vehicleInsuranceClaim } }, { upsert: true });
console.log("Vehicle Insurance Claim seeded");
process.exit(0);
