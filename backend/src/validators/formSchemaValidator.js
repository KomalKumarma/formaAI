const supportedTypes = new Set(["text", "textarea", "number", "email", "phone", "date", "datetime", "select", "radio", "checkbox", "multi-select", "file", "section", "heading"]);

export function validateFormSchema(form) {
  const errors = [];
  const names = new Set();
  for (const field of form.fields ?? []) {
    if (!supportedTypes.has(field.type)) errors.push(`Unsupported field type: ${field.type}`);
    if (field.type !== "section" && field.type !== "heading" && !field.name) errors.push(`Field "${field.label}" needs a name.`);
    if (field.name && names.has(field.name)) errors.push(`Duplicate field name: ${field.name}`);
    if (field.name) names.add(field.name);
    if (["select", "radio", "checkbox", "multi-select"].includes(field.type) && !field.options?.length) errors.push(`Field "${field.label}" needs options.`);
  }
  for (const field of form.fields ?? []) if (field.showIf && !names.has(field.showIf.field)) errors.push(`Conditional field "${field.label}" references unknown field "${field.showIf.field}".`);
  return errors;
}
