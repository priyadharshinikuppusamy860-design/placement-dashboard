import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useForm, { rules } from "../hooks/useForm";
import Field from "../components/Field";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { values, errors, onChange, handleSubmit } = useForm({ email: "", password: "" }, (v) => {
    const e = {};
    if (rules.email(v.email)) e.email = rules.email(v.email);
    if (rules.required(v.password, "Password")) e.password = rules.required(v.password, "Password");
    return e;
  });

  const submit = async (vals) => {
    try { setServerError(""); await login(vals); navigate("/"); }
    catch (e) { setServerError(e.message); }
  };

  return (
    <div className="auth-box">
      <h2>Student Login</h2>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <Field label="Email" error={errors.email}><input name="email" type="email" value={values.email} onChange={onChange} /></Field>
        <Field label="Password" error={errors.password}><input name="password" type="password" value={values.password} onChange={onChange} /></Field>
        {serverError && <p className="error">{serverError}</p>}
        <button type="submit">Login</button>
      </form>
      <p>New here? <Link to="/register">Create an account</Link></p>
    </div>
  );
}
