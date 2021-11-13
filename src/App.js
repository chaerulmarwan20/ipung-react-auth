import React, { useReducer } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import HomeComp from "./component/HomeComp";
import ListMahasiswa from "./component/ListMahasiswa";
import LoginComp from "./component/LoginComp";
import MenuComp from "./component/MenuComp";
import Public from "./component/Public";
import RegisterComp from "./component/RegisterComp";
import RoleAdmin from "./component/RoleAccess/RoleAdmin";
import RoleMember from "./component/RoleAccess/RoleMember";
import RoleStaff from "./component/RoleAccess/RoleStaff";
import Transaction from "./component/Transaction";
import { authContext, initialState, reducer } from "./store";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BrowserRouter>
      <Switch>
        <authContext.Provider
          value={{
            state,
            dispatch,
          }}
        >
          <MenuComp />
          <Route exact path="/" component={Public} />
          <Route exact path="/login" component={LoginComp} />
          <Route exact path="/register" component={RegisterComp} />
          <Route exact path="/dashboard" component={HomeComp} />
          <Route exact path="/transaction" component={Transaction} />
          <Route exact path="/mahasiswa" component={ListMahasiswa} />
          <Route exact path="/admin" component={RoleAdmin} />
          <Route exact path="/staff" component={RoleStaff} />
          <Route exact path="/member" component={RoleMember} />
        </authContext.Provider>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
