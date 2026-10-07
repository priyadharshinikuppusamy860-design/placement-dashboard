import { useState } from "react";

// Generic form hook. `validate(values)` returns an object of {field: message}.
export default function useForm(initial, validate) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
  };

  const handleSubmit = (callback) => async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length === 0) await callback(values);
  };

  return { values, errors, onChange, handleSubmit, setErrors };
}

export const rules = {
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Enter a valid email."),
  password: (v) => (v.length >= 6 ? "" : "Password must be at least 6 characters."),
  required: (v, label) => (v.toString().trim() ? "" : `${label} is required.`),
  cgpa: (v) => (v !== "" && Number(v) >= 0 && Number(v) <= 10 ? "" : "CGPA must be between 0 and 10."),
};
