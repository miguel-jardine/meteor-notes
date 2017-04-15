import { Link } from "react-router";
import React from "react";

// Presentational Component (aka Stateless Functional Component)
//      - Faster than a React.Component
//      - Does not need to manipulate state
//      - Does not need to make database calls.
// --------------------------------------------------
export default () => {
// --------------------------------------------------
  return (
    <div className="boxed-view">
      <div className="boxed-view__box">
        <h1>Page Not Found</h1>
        <p>Message</p>
        <Link className="button button--link" to="/login">Head Home</Link>
      </div>
    </div>
  );
};

// export default NotFound;