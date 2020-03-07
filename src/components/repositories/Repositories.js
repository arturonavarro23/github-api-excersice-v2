import React, { useEffect, Fragment, Suspense } from "react";
import { Grid, Row, Col, Modal } from "react-bootstrap";
import Form from "./components/form";
import Results from "./components/results";
import Comments from "./components/comments";
import Loader from "../loader";
import GitHub from "../../services/github";
import useState from "../../hooks/useState";

const SUSPENSE_CONFIG = {
  timeoutMs: 1000,
};

const Repositories = () => {
  const [state, setState] = useState({
    commentsModalOpen: false,
    query: "facebook",
    repositoriesResource: null,
    commentsResource: null
  });

  const [startTransition] = React.useTransition(SUSPENSE_CONFIG);

  useEffect(
    () => {
      startTransition(() => {
        setState({
          repositoriesResource: GitHub.getRepositories(state.query)
        });
      });
    },
    [state.query, startTransition]
  );

  const onSearchFormSubmit = query => {
    setState({
      query
    });
  };

  const onRepositoryClick = repo => {
    setState({
      commentsModalOpen: true
    });

    startTransition(() => {
      setState({
        commentsResource: GitHub.getComments(repo)
      });
    });
  };

  const closeModal = () => {
    setState({
      commentsModalOpen: false
    });
  };

  const {
    repositoriesResource,
    commentsResource,
    commentsModalOpen,
    query
  } = state;

  return (
    <Fragment>
      <Grid>
        <Row>
          <Col xs={12}>
            <Form inputValue={query} onSubmit={onSearchFormSubmit} />
          </Col>
        </Row>
        <Row>
          <Suspense fallback={<Loader />}>
            {repositoriesResource && (
              <Results
                resource={repositoriesResource}
                onRepositoryClick={onRepositoryClick}
              />
            )}
          </Suspense>
        </Row>
      </Grid>
      <Modal show={commentsModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Suspense fallback={<Loader />}>
            {commentsResource && <Comments resource={commentsResource} />}
          </Suspense>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
};

export default Repositories;
