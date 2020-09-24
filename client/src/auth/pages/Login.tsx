import React from "react";
import { useLoginMutation } from "../../generated";

interface LoginProps {}

const Login = (props: LoginProps) => {
  const [login, { data, loading, error }] = useLoginMutation();
  return <div>login</div>;
};

export default Login;
