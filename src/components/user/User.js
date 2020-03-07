import React from "react";
import UserProfile from "./components/userProfile";
import GitHub from "../../services/github";

const User = props => {
  const {
    match: {
      params: { name }
    }
  } = props;
  const resource = GitHub.getUser(name);
  return <UserProfile resource={resource} />;
};

export default User;
