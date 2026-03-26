import { useState } from "react";
import type { Role } from "../types/role";

export const useRegisterForm = () => {
  const [selectedRole, setSelectedRole] = useState<Role>("Volunteer");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return {
    selectedRole,
    setSelectedRole,
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    toggleShowPassword,
  };
};
