import React from 'react';
import PropTypes from 'prop-types';
import Comment from '../../models/comment.model';
import CommentsBlock from './CommentBlock';
import TitleMUI from '../TitleMUI';

const CommentsList = ({ comments }) => {
    return (
        <div className="comments m-t-60 m-b-60">

            <div className="comments-header">
                <TitleMUI as="h3" variant="h3">Commentaires ({comments.length})</TitleMUI>
                <div className="comments-mode">
                    <a href="https://benzin.fr/auctions/show/m50360e34019920sans0reserve-5eac26fe1b710?order=recents"
                       className="active">Récents
                    </a>
                    <a href="https://benzin.fr/auctions/show/m50360e34019920sans0reserve-5eac26fe1b710?order=populars">
                        Populaires
                    </a>
                </div>
            </div>

            <div className="comments-list">
                {comments && comments.map((item, index) => {
                    const comment = new Comment(item);
                    return <CommentsBlock key={index} comment={comment} index={index}/>;
                })}
            </div>
        </div>
    );
};

CommentsList.propTypes = {
    comments: PropTypes.array.isRequired,
};

export default CommentsList;
