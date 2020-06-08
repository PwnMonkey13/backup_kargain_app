import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import Comment from '../../models/comment.model';
import { getTimeAgo } from '../../libs/utils';

const CommentBlock = ({ comment, indexComment, disableReply, onSubmitResponse : fireResponse,  }) => {
    const date = comment.getRaw?.updatedAt
    const { t, lang } = useTranslation();
    const timeAgo = getTimeAgo(date, lang);
    const textareaResponseRefs = useRef([]);
    const [doneSubmitting, setDoneSubmitting] = useState(true);

    const handleLikeComment = (commentId) => {
        //TODO
        console.log(commentId);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const textarea = textareaResponseRefs.current[indexComment];
        const message = textarea ? textarea.value : null;
        fireResponse(comment.getID, indexComment, message)
    }

    return (
        <div key={indexComment} className="comment">
            <Link href="/profile/">
                <a className="comment-picture">
                    <img src={comment.getAuthor.getAvatar} alt={comment.getAuthor.getUsername}/>
                </a>
            </Link>

            <div className="comment-content">
                <div className="comment-infos">
                    <Link href="/profile/">
                        <a className="profile-small">
                            <div className="profile-small-infos">
                                <Typography as="p" gutterBottom>
                                    {comment.getAuthor.getFullName}
                                </Typography>
                            </div>
                        </a>
                    </Link>
                    <small>
                        {timeAgo}
                    </small>
                </div>
                <div className="comment-text my-1">
                    {comment.getMessage}
                </div>
                <div className="comment-buttons">
                    <a className="">
                        <small
                            onClick={() => handleLikeComment(comment.getID)}>{comment.getLikes.length} j'aime
                        </small>
                    </a>
                </div>

                {!disableReply && (
                    <>
                        <div className="comment-replies">
                            {comment.getResponses && comment.getResponses.map((response, indexResponse) => {
                                const comment = new Comment(response);
                                return <CommentBlock
                                    key={indexResponse}
                                    comment={comment}
                                    index={indexResponse}
                                    disableReply
                                />;
                            })}

                            <div className="new-comment-reply">
                                <div className="form-group inline-submit m-0 pl-0">
                                    <small>{t('vehicles:supply')} :</small>
                                    <div className="position-relative">
                                    <textarea
                                        ref={el => textareaResponseRefs.current[indexComment] = el}
                                        placeholder="eg: Superbe voiture"
                                        style={{ minWidth : '25rem'}}
                                        className="form-control editor"
                                        rows={3}
                                    />
                                        <button
                                            type="button"
                                            disabled={!doneSubmitting}
                                            className="form-submit"
                                            onClick={e => onSubmit(e)}
                                        >
                                            <SendIcon/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

CommentBlock.propTypes = {
    comment : PropTypes.any.isRequired,
    indexComment : PropTypes.number,
    onSubmitResponse : PropTypes.func
}

CommentBlock.defaultProps = {
    onSubmitResponse : () => {}
}

export default CommentBlock
