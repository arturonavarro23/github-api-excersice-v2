import React from "react";
import { Grid, Row, Col, Image, FormControl } from "react-bootstrap";
import { faMapMarkerAlt, faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Repo from "../repo";
import useFilterRepos from "../../../../hooks/useFilterRepos";
import "./UserProfile.scss";

const UserProfile = props => {
  const { resource } = props;
  const user = resource.read();
  const [repos, query, onQueryChange] = useFilterRepos(user.repos || []);

  const renderRepo = repo => <Repo key={repo.id} repo={repo} />;

  return (
    <Grid className="profile">
      <Row>
        <Col xs={3}>
          <Image src={user.avatar_url} rounded />
        </Col>
        <Col xs={8}>
          <h1>{user.name}</h1>
          <p>{user.bio}</p>
          <p>
            <span className="info">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> {user.location}
            </span>
            <span className="info">
              <FontAwesomeIcon icon={faLink} /> {user.blog}
            </span>
          </p>
          <Grid fluid>
            <Row>
              <Col xs={6}>
                <h4>Repositories</h4>
              </Col>
              <Col xs={6} className="filter">
                <FormControl
                  type="text"
                  placeholder="Filter..."
                  name="query"
                  value={query}
                  onChange={onQueryChange}
                />
              </Col>
            </Row>
          </Grid>
          {repos.map(renderRepo)}
        </Col>
      </Row>
    </Grid>
  );
};

export default UserProfile;
