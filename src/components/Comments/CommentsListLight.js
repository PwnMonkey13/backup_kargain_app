import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../../models/comment.model';
import Typography from '@material-ui/core/Typography';

const CommentsList = ({ comments }) => {
    return (
        <div className="comments">
            <ul className="commentsCardList">
                {comments && comments.map((item, index) => {
                    const comment = new Comment(item);
                    return (
                        <li key={index} className="my-2">
                            <Typography as="p" gutterBottom>
                                <strong>{comment.getAuthor.getFullName}</strong> {comment.getMessage}
                            </Typography>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.array.isRequired,
};

export default CommentsList;
