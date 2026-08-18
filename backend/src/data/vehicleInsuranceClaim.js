export const vehicleInsuranceClaim = {
  id: "vehicle-insurance-claim",
  name: "Vehicle Insurance Claim",
  description: "Tell us about the incident or complete the guided form below.",
  version: 1,
  status: "published",
  fields: [
    { id: "claimant-section", type: "section", label: "Personal information" },
    { name: "fullName", type: "text", label: "Full name", required: true, validation: { minLength: 2 } },
    { name: "email", type: "email", label: "Email address", required: true },
    { id: "vehicle-section", type: "section", label: "Vehicle information" },
    { name: "vehicle", type: "text", label: "Vehicle make and model", required: true, placeholder: "For example, Honda Civic" },
    { name: "incidentType", type: "select", label: "Incident type", required: true, options: [
      { label: "Vehicle accident", value: "vehicle_accident" },
      { label: "Animal collision", value: "animal_collision" },
      { label: "Theft", value: "theft" },
      { label: "Other", value: "other" }
    ] },
    { name: "incidentDate", type: "date", label: "Incident date", required: true },
    { name: "anotherVehicle", type: "radio", label: "Was another vehicle involved?", required: true, options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }], showIf: { field: "incidentType", operator: "equals", value: "vehicle_accident" } },
    { name: "otherDriver", type: "text", label: "Other driver's name", required: true, showIf: { field: "anotherVehicle", operator: "equals", value: "yes" } },
    { id: "damage-section", type: "section", label: "Damage information" },
    { name: "damageTypes", type: "checkbox", label: "What was damaged?", required: true, options: [{ label: "Windshield", value: "windshield" }, { label: "Body panels", value: "body_panels" }, { label: "Lights", value: "lights" }] },
    { name: "windshieldReplacement", type: "radio", label: "Is windshield replacement required?", required: true, options: [{ label: "Yes", value: "yes" }, { label: "No", value: "no" }], showIf: { field: "damageTypes", operator: "contains", value: "windshield" } },
    { name: "incidentDescription", type: "textarea", label: "Describe what happened", required: true, validation: { minLength: 20 }, placeholder: "Include the location, events, and damage." }
  ]
};
