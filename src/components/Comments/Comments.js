import React, { useContext, useRef, useState } from 'react';
import AnnounceClass from '../../models/announce.model';
import { useAuth } from '../../context/AuthProvider';
import { useRouter } from 'next/router';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import commentsService from '../../services/commentsService';
import Comment from '../../models/comment.model';
import CommentBlock from './CommentBlock';

const Comments = ({ announceRaw }) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const textareaCommentRef = useRef();
    const textareaResponseRefs = useRef([]);
    const announce = new AnnounceClass(announceRaw);
    const [comments, setComments] = useState(announce.getComments);
    const [doneSubmitting, setDoneSubmitting] = useState(true);

    const checkAuthRedirection = async () => {
        if (!isAuthenticated) {
            return router.push({
                pathname: '/auth/login',
                query: { redirect: router.asPath },
            });
        }
        return Promise.resolve();
    };

    const onSubmitComment = async (e) => {
        e.preventDefault();
        setDoneSubmitting(false);
        await checkAuthRedirection();
        const message = textareaCommentRef.current.value;

        try {
            const comment = await commentsService.createComment({
                announce_id: announce.getID,
                message,
            });
            setDoneSubmitting(true);
            dispatchModal({ msg: 'comment added successufully' });
            setComments(comments => [
                ...comments,
                comment,
            ]);
        } catch (err) {
            setDoneSubmitting(true);
            dispatchModalError({ err });
        }
    };

    const onSubmitResponse = async (commentId, indexComment, message) => {
        await checkAuthRedirection();
        setDoneSubmitting(false);

        try {
            const updatedComment = await commentsService.createCommentResponse({
                comment_id: commentId,
                message,
            });
            setDoneSubmitting(true);
            dispatchModal({ msg: 'response added successufully' });
            setComments(comments => [
                ...comments.slice(0, indexComment),
                updatedComment,
                ...comments.slice(indexComment, comments.length - 1),
            ]);
        } catch (err) {
            setDoneSubmitting(true);
            dispatchModalError({ err });
        }
    };

    return (
        <div id="comments" className="comments m-t-60 m-b-60">
            <div className="comments-header"><h4>Commentaires </h4>
                <div className="comments-mode">
                    <a href="https://benzin.fr/auctions/show/m50360e34019920sans0reserve-5eac26fe1b710?order=recents"
                       className="active">Récents
                    </a>
                    <a href="https://benzin.fr/auctions/show/m50360e34019920sans0reserve-5eac26fe1b710?order=populars">
                        Populaires
                    </a>
                </div>
            </div>

            <CommentForm {...{
                onSubmitComment,
                textareaCommentRef,
                doneSubmitting,
            }}/>

            <div className="comments-list">
                {comments && comments.map((item, indexComment) => {
                    const comment = new Comment(item);
                    return <CommentBlock
                        key={indexComment}
                        comment={comment}
                        indexComment={indexComment}
                        onSubmitResponse={onSubmitResponse}
                    />;
                })}
            </div>
        </div>
    );
};

const CommentForm = ({ onSubmitComment, textareaCommentRef, doneSubmitting }) => {
    return (
        <form onSubmit={e => onSubmitComment(e)}
              className="comments-write">
            <div className="form-group position-relative w-auto">
                     <textarea
                         rows={5}
                         cols={13}
                         ref={textareaCommentRef}
                         placeholder="ex: Superbe voiture"
                         className="form-control editor"
                     />
            </div>

            <div className="mx-auto my-2">
                <button
                    disabled={!doneSubmitting}
                    type="submit"
                    className="btn btn-primary">Envoyer
                </button>
            </div>
        </form>
    );
};

export default Comments;
