import { useState } from "react";
import type { Role } from "../types/role";

export const useLoginForm = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return {
    selectedRole,
    setSelectedRole,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    toggleShowPassword,
  };
};
