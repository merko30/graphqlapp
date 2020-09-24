import React from "react";
import { useRegisterMutation } from "../../generated";

interface RegisterProps {}

const Register = (props: RegisterProps) => {
  const [register, { data, loading, error }] = useRegisterMutation();
  return <div>register</div>;
};

export default Register;
