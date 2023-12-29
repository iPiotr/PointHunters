import React from "react";
import { useAuth } from "../hooks/useAuth";
import UserStack from "./userStack";
import AuthStack from "./authStack";

export default function RootNavigation() {
  const { user } = useAuth();

  // return <AuthStack />;
  return user ? <UserStack /> : <AuthStack />;
}
