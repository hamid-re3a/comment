import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Modal, Button, Form } from "react-bootstrap";
import Comment from "./Comment.js";

function Main() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [comments, setComments] = useState(null);

    const handleModal = (id) => {
        setId(id);
        handleShow();
    };

    const [id, setId] = useState(null);
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const updateComments = () => {
        window.axios.get("/api/comments").then((response) => {
            setComments(response.data.data);
        });
    };
    useEffect(() => {
        updateComments();
    }, []);
    function handleChangeName(event) {
        setName(event.target.value);
    }
    function handleChangeMessage(event) {
        setMessage(event.target.value);
    }
    function submitForm() {
        let params = {
            name,
            message,
        };
        if (id != null) {
            params.parent_id = id;
        }
        window.axios
            .post("/api/comments", params)
            .then(() => {
                handleClose();
                setId(null);
                updateComments();
            })
            .catch(() => alert("try again"));
    }
    return (
        <div className="container mb-5 mt-5">
            <div className="card">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Sample Post</h5>

                                <p className="card-text">
                                    Some quick example text to build on the post
                                    title and make up the bulk of the card's
                                    content.
                                </p>
                                <a href="#" className="card-link">
                                    External link
                                </a>
                                <a href="#" className="card-link">
                                    Another link
                                </a>
                            </div>
                        </div>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Comment</Modal.Title>
                            </Modal.Header>
                            <form onSubmit={submitForm}>
                                <Modal.Body>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Name
                                        </label>
                                        <input
                                            type="name"
                                            value={name}
                                            className="form-control"
                                            onChange={handleChangeName}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">
                                            Message
                                        </label>
                                        <input
                                            type="text"
                                            value={message}
                                            onChange={handleChangeMessage}
                                            className="form-control"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        onChange={() => submitForm()}
                                    >
                                        Submit
                                    </button>
                                </Modal.Body>
                            </form>
                        </Modal>

                        <div className="row">
                            <div className="col-md-12">
                                <h4 className="mt-5">Comments</h4>
                                <button
                                    type="button"
                                    className="btn"
                                    onClick={() => setShow(true)}
                                >
                                    Write a Comment
                                </button>
                                {comments == null
                                    ? null
                                    : comments
                                          .filter((c) => c.parent_id == null)
                                          .map((comment, index) => {
                                              return (
                                                  <Comment
                                                      key={index}
                                                      comments={comments}
                                                      comment={comment}
                                                      handleModal={handleModal}
                                                  />
                                              );
                                          })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;

if (document.getElementById("app")) {
    ReactDOM.render(<Main />, document.getElementById("app"));
}
