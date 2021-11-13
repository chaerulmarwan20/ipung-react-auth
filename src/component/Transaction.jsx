import React, { useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { authContext } from "../store";

export default function Transaction() {
  const { state } = useContext(authContext);

  if (!state.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="jumbotron container mt-5">
      <h1 className="display-4">Transaction</h1>
      <p className="lead">
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <hr className="my-4" />
      <p>
        It uses utility classes for typography and spacing to space content out
        within the larger container.
      </p>
      <Link className="btn btn-primary btn-lg" to="#" role="button">
        Learn more
      </Link>
    </div>
  );
}
