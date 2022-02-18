import React from "react";
import ReactDOM from "react-dom";

function Main() {
    return (
        <div className="container mb-5 mt-5">
            <div className="card">
                <div className="row">
                    <div className="col-md-12">
                        <h3 className="text-center mb-5">
                            Nested comment section
                        </h3>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="media mt-4">
                                    <img
                                        className="me-3 rounded-circle"
                                        alt="Bootstrap Media Preview"
                                        src="https://i.imgur.com/stD0Q19.jpg"
                                    />
                                    <div className="media-body">
                                        <div className="row">
                                            <div className="col-8 d-flex">
                                                <h5>Maria Smantha</h5>
                                                <span>- 2 hours ago</span>
                                            </div>
                                            <div className="col-4">
                                                <div className="reply">
                                                    <a href="#">
                                                        <span>
                                                            <i className="fa fa-reply pull-left"></i>{" "}
                                                            reply
                                                        </span>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                        It is a long established fact that a
                                        reader will be distracted by the
                                        readable content of a page.
                                        <div className="media mt-4">
                                            <a className="pe-3" href="#">
                                                <img
                                                    className="rounded-circle"
                                                    alt="Bootstrap Media Another Preview"
                                                    src="https://i.imgur.com/xELPaag.jpg"
                                                />
                                            </a>
                                            <div className="media-body">
                                                <div className="row">
                                                    <div className="col-12 d-flex">
                                                        <h5>Simona Disa</h5>
                                                        <span>
                                                            - 3 hours ago
                                                        </span>
                                                    </div>
                                                </div>
                                                letters, as opposed to using
                                                'Content here, content here',
                                                making it look like readable
                                                English.
                                            </div>
                                        </div>
                                        <div className="media mt-3">
                                            <a className="pe-3" href="#">
                                                <img
                                                    className="rounded-circle"
                                                    alt="Bootstrap Media Another Preview"
                                                    src="https://i.imgur.com/nAcoHRf.jpg"
                                                />
                                            </a>
                                            <div className="media-body">
                                                <div className="row">
                                                    <div className="col-12 d-flex">
                                                        <h5>John Smith</h5>
                                                        <span>
                                                            - 4 hours ago
                                                        </span>
                                                    </div>
                                                </div>
                                                the majority have suffered
                                                alteration in some form, by
                                                injected humour, or randomised
                                                words.
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
