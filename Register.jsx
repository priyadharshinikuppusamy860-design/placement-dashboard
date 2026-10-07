import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useForm, { rules } from "../hooks/useForm";
import Field from "../components/Field";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { values, errors, onChange, handleSubmit } = useForm(
    { name: "", email: "", password: "", branch: "", cgpa: "" },
    (v) => {
      const e = {};
      const checks = {
        name: rules.required(v.name, "Name"), email: rules.email(v.email), password: rules.password(v.password),
        branch: rules.required(v.branch, "Branch"), cgpa: rules.cgpa(v.cgpa),
      };
      Object.entries(checks).forEach(([k, msg]) => { if (msg) e[k] = msg; });
      return e;
    }
  );

  const submit = async (vals) => {
    try { setServerError(""); await register(vals); navigate("/"); }
    catch (e) { setServerError(e.message); }
  };

  return (
    <div className="auth-box">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <Field label="Full name" error={errors.name}><input name="name" value={values.name} onChange={onChange} /></Field>
        <Field label="Email" error={errors.email}><input name="email" type="email" value={values.email} onChange={onChange} /></Field>
        <Field label="Password" error={errors.password}><input name="password" type="password" value={values.password} onChange={onChange} /></Field>
        <Field label="Branch" error={errors.branch}><input name="branch" value={values.branch} onChange={onChange} /></Field>
        <Field label="CGPA" error={errors.cgpa}><input name="cgpa" type="number" step="0.01" value={values.cgpa} onChange={onChange} /></Field>
        {serverError && <p className="error">{serverError}</p>}
        <button type="submit">Register</button>
      </form>
      <p>Already registered? <Link to="/login">Login</Link></p>
    </div>
  );
}
