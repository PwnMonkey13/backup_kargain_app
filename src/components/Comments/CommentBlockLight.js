import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { getTimeAgo } from '../../libs/utils';
import Link from 'next/link';
import Typography from '@material-ui/core/Typography';

const CommentsBlockLight = ({ comment, index, disableReply }) => {
    const date = comment.getRaw?.updatedAt;
    const timeAgo = date && getTimeAgo(date);
    const textareaResponseRefs = useRef([]);
    const [doneSubmitting, setDoneSubmitting] = useState(true);

    const handleLikeComment = (commentId) => {
        console.log(commentId);
    };

    const responsesLength = comment.getResponses.length;

    return (
        <div id={index} key={index} className="comment my-2">
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
                        {timeAgo ? `il y a ${timeAgo}` : 'A l\'instant'}
                    </small>
                    <br/>
                    <small>
                        {comment.getLikes.length} j'aime
                    </small>
                </div>
                <div className="my-1">
                    <p className="comment-text">
                        {comment.getMessage}
                    </p>
                </div>
                {responsesLength > 0 && (
                    <Typography>{responsesLength} {responsesLength > 1 ? 'réponses' : 'response'} </Typography>
                )}
            </div>
        </div>
    );
};

CommentsBlockLight.propTypes = {
    comment: PropTypes.any.isRequired,
    index: PropTypes.number.isRequired,
};
export default CommentsBlockLight;
