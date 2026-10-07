import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import useForm, { rules } from "../hooks/useForm";
import Field from "../components/Field";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [saved, setSaved] = useState(false);
  const { values, errors, onChange, handleSubmit } = useForm(
    { name: user.name, branch: user.branch, cgpa: user.cgpa, skills: user.skills || "" },
    (v) => {
      const e = {};
      if (rules.required(v.name, "Name")) e.name = rules.required(v.name, "Name");
      if (rules.required(v.branch, "Branch")) e.branch = rules.required(v.branch, "Branch");
      if (rules.cgpa(v.cgpa)) e.cgpa = rules.cgpa(v.cgpa);
      return e;
    }
  );

  const submit = async (vals) => { await updateProfile(vals); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <main className="auth-box">
      <h2>My Profile</h2>
      <p className="muted">{user.email}</p>
      <form onSubmit={handleSubmit(submit)} noValidate>
        <Field label="Full name" error={errors.name}><input name="name" value={values.name} onChange={onChange} /></Field>
        <Field label="Branch" error={errors.branch}><input name="branch" value={values.branch} onChange={onChange} /></Field>
        <Field label="CGPA" error={errors.cgpa}><input name="cgpa" type="number" step="0.01" value={values.cgpa} onChange={onChange} /></Field>
        <Field label="Skills (comma separated)"><textarea name="skills" rows="3" value={values.skills} onChange={onChange} /></Field>
        <button type="submit">Save changes</button>
        {saved && <span className="notice"> Saved ✓</span>}
      </form>
    </main>
  );
}
