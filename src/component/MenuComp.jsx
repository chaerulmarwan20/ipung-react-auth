import React, { useContext } from "react";
import { authContext } from "../store";
import MenuPublic from "./Menu/MenuPublic";
import MenuMember from "./Menu/MenuMember";
import MenuAdmin from "./Menu/MenuAdmin";
import MenuStaff from "./Menu/MenuStaff";

export default function MenuComp() {
  const { state } = useContext(authContext);

  if (!state.isAuthenticated) {
    return <MenuPublic />;
  }

  if (state.role === 1) {
    return <MenuAdmin />;
  } else if (state.role === 2) {
    return <MenuStaff />;
  }

  return <MenuMember />;
}
