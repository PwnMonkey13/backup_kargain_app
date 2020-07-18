import React, { useContext, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import AnnounceClass from '../../models/announce.model';
import { useAuth } from '../../context/AuthProvider';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import commentsService from '../../services/CommentsService';
import Comment from '../../models/comment.model';
import CommentBlock from './CommentBlock';
import Typography from '@material-ui/core/Typography';

const Comments = ({ announceRaw }) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const textareaCommentRef = useRef();
    const { t } = useTranslation();
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
            dispatchModal({ msg: 'comment added successfully' });
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
            dispatchModal({ msg: 'response added successfully' });
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
            <div className="comments-header">
                <Typography component="h3" variant="h3">
                    {t('vehicles:comment_plural')}
                </Typography>
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
                        disableReply
                        indexComment={indexComment}
                        onSubmitResponse={onSubmitResponse}
                    />;
                })}
            </div>
        </div>
    );
};

const CommentForm = ({ onSubmitComment, textareaCommentRef, doneSubmitting }) => {
    const { t } = useTranslation();
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
                    className="btn btn-primary">
                    {t('vehicles:send')}
                </button>
            </div>
        </form>
    );
};

export default Comments;
