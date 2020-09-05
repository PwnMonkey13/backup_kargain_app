import React, { useContext, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import AnnounceClass from '../../models/announce.model';
import { useAuth } from '../../context/AuthProvider';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import commentsService from '../../services/CommentsService';
import CommentsList from './CommentsList'

const Comments = ({ announceRaw }) => {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const textareaCommentRef = useRef();
    const announce = new AnnounceClass(announceRaw);
    const [comments, setComments] = useState(announce.getComments);
    const [doneSubmitting, setDoneSubmitting] = useState(true);

    const checkAuthRedirection = async () => {
        if (!isAuthenticated) {
            return router.push({
                pathname: '/auth/login',
                query: { redirect: router.asPath }
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
                message
            });
            setDoneSubmitting(true);
            dispatchModal({ msg: 'comment added successfully' });
            setComments(comments => [
                ...comments,
                comment
            ]);
        } catch (err) {
            setDoneSubmitting(true);
            dispatchModalError({ err });
        }
    };

    return(
        <div className="comments_container">
            <CommentsList comments={comments}/>
            <CommentForm {...{
                onSubmitComment,
                textareaCommentRef,
                doneSubmitting
            }}/>
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
                    rows={3}
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
                    {t('vehicles:add_a_comment')}
                </button>
            </div>
        </form>
    );
};

export default Comments;
