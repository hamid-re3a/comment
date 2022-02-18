import React from "react";
const pics = [
    "https://i.imgur.com/stD0Q19.jpg",
    "https://i.imgur.com/nAcoHRf.jpg",
    "https://i.imgur.com/xELPaag.jpg",
    "https://i.imgur.com/nUNhspp.jpg",
    "https://i.imgur.com/HjKTNkG.jpg",
    "https://i.imgur.com/nAcoHRf.jpg",
];
const Comment = ({ comments, comment, handleModal }) => {
    return (
        <div className="media mt-4">
            <img
                className="me-3 rounded-circle"
                alt="Bootstrap Media Preview"
                src={window._.sample(pics)}
            />
            <div className="media-body">
                <div className="row">
                    <div className="col-8 d-flex">
                        <h5>{comment.name}</h5>
                        <span> - {comment.created_at}</span>
                    </div>
                    {comment._dpt <= 1 ? (
                        <div className="col-4">
                            <div className="reply">
                                <a
                                    href="#"
                                    onClick={() => {
                                        handleModal(
                                            comment.id,
                                            comment._dpt + 1
                                        );
                                    }}
                                >
                                    <span>
                                        <i className="fa fa-reply pull-left"></i>{" "}
                                        reply
                                    </span>
                                </a>
                            </div>
                        </div>
                    ) : null}
                </div>
                {comment.message}
                {comments
                    .filter((c) => c.parent_id == comment.id)
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
    );
};

export default Comment;
