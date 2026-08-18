import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { useForm } from "react-hook-form";
import "./styles.css";

const visible = (rule, values) => {
  if (!rule) return true;
  const current = values[rule.field];
  if (rule.operator === "equals") return current === rule.value;
  if (rule.operator === "contains") return Array.isArray(current) && current.includes(rule.value);
  return false;
};

function Field({ field, register, errors }) {
  if (field.type === "section") return <h2>{field.label}</h2>;
  const rules = {
    required: field.required ? `${field.label} is required.` : false,
    minLength: field.validation?.minLength && { value: field.validation.minLength, message: `Enter at least ${field.validation.minLength} characters.` }
  };
  const error = errors[field.name]?.message;
  if (field.type === "select") return <label>{field.label}<select {...register(field.name, rules)} defaultValue=""><option value="" disabled>Select an option</option>{field.options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select>{error && <small>{error}</small>}</label>;
  if (field.type === "radio") return <fieldset><legend>{field.label}</legend>{field.options.map((option) => <label className="choice" key={option.value}><input type="radio" value={option.value} {...register(field.name, rules)} />{option.label}</label>)}{error && <small>{error}</small>}</fieldset>;
  if (field.type === "checkbox") return <fieldset><legend>{field.label}</legend>{field.options.map((option) => <label className="choice" key={option.value}><input type="checkbox" value={option.value} {...register(field.name, rules)} />{option.label}</label>)}{error && <small>{error}</small>}</fieldset>;
  if (field.type === "textarea") return <label>{field.label}<textarea placeholder={field.placeholder} {...register(field.name, rules)} />{error && <small>{error}</small>}</label>;
  return <label>{field.label}<input type={field.type} placeholder={field.placeholder} {...register(field.name, rules)} />{error && <small>{error}</small>}</label>;
}

function DynamicForm({ schema }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({ mode: "onBlur" });
  const values = watch();
  const [submitted, setSubmitted] = useState(false);
  return <main><p className="eyebrow">FORM VERSION {schema.version}</p><h1>{schema.name}</h1><p className="intro">{schema.description}</p><form onSubmit={handleSubmit(() => setSubmitted(true))}>{schema.fields.filter((field) => visible(field.showIf, values)).map((field) => <Field key={field.name ?? field.id} field={field} register={register} errors={errors} />)}<button type="submit">Validate Day 1 form</button>{submitted && <p className="success">Form validation passed. Draft persistence and AI extraction arrive in later phases.</p>}</form></main>;
}

function App() {
  const [schema, setSchema] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { fetch("http://localhost:4000/api/forms/vehicle-insurance-claim").then((response) => response.ok ? response.json() : Promise.reject()).then(({ data }) => setSchema(data)).catch(() => setError("Start the Forma AI API on port 4000 to load the Day 1 schema.")); }, []);
  return schema ? <DynamicForm schema={schema} /> : <main><p className="eyebrow">FORMA AI</p><h1>Dynamic form engine</h1><p>{error || "Loading schema..."}</p></main>;
}

createRoot(document.getElementById("root")).render(<StrictMode><App /></StrictMode>);
