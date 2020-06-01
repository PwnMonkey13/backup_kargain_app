import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../../models/comment.model';
import CommentsBlockLight from './CommentBlockLight';

const CommentsList = ({ comments }) => {

    return (
        <div className="comments m-2">
            <div className="comments-list-preview">
                {comments && comments.map((item, index) => {
                    const comment = new Comment(item);
                    return <CommentsBlockLight key={index} comment={comment} index={index}/>;
                })}
            </div>
        </div>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.array.isRequired,
};

export default CommentsList;
