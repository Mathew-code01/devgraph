// client/src/components/ui/Input.tsx

import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

function Input({ label, className = "", ...props }: InputProps) {
  return (
    <label className="input-field">
      {label && <span className="input-label">{label}</span>}

      <input {...props} className={`input ${className}`} />
    </label>
  );
}

export default Input;