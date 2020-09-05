import React, { useRef, useContext, useEffect, useState } from 'react';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation'
import { useForm } from 'react-hook-form';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import { format } from 'date-fns';
import parseISO from 'date-fns/parseISO';
import { ModalDialogContext } from '../context/ModalDialogContext';
import { useAuth } from '../context/AuthProvider';
import useStyles from './Conversations/conversation.styles';
import ValidationError from './Form/Validations/ValidationError';
import ConversationsService from '../services/ConversationsService';

export default function ModalContact ({ recipient, handleClose, open }) {
    const classes = useStyles();
    const { t } = useTranslation()
    const contentRef = useRef()
    const [conversation, setConversation] = useState(null);
    const { isAuthReady, isAuthenticated, authenticatedUser } = useAuth();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const { register, errors, handleSubmit, reset } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all'
    });

    const loadConversation = async () => {
        try {
            let conversation = await ConversationsService.getConversationWithProfile(recipient.getID);
            setConversation(conversation);
        } catch (err) {
            dispatchModalError({ err });
        }
    };

    const onSubmitMessage = async (form) => {
        const { message } = form;
        try {
            const conversation = await ConversationsService.postConversationMessage(message, recipient.getID);
            setConversation(conversation);
            dispatchModal({ msg: 'Message posted' });
            if(contentRef.current){
                contentRef.current.scrollTop = contentRef.current?.scrollHeight
            }
            reset()
        } catch (err) {
            dispatchModalError({
                err,
                persist: true
            });
        }
    };

    useEffect(() => {
        if(isAuthReady && isAuthenticated && recipient){
            loadConversation();
        }
    }, [isAuthReady, isAuthenticated]);

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={handleClose}
        >
            <Fade in={open}>
                <div className={classes.paper}>
                    {recipient && (
                        <div className={classes.conversation}>
                            <div className={classes.conversationHeader}>
                                <div className={classes.headerUsername}>
                                    <div style={{ maxWidth: '70%' }}>
                                        <Link href={recipient.getProfileLink} prefetch={false}>
                                            <a>
                                                <img className="rounded-circle"
                                                    src={recipient.getAvatar}
                                                    alt={recipient.getUsername}
                                                    width={50}
                                                />
                                                <span className="mx-2">{recipient.getFullName}</span>
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.conversationContent} ref={contentRef}>
                                <div className={classes.messageContainer}>
                                    {conversation?.createdAt && format(parseISO(conversation.createdAt), 'MM/dd/yyyy')}
                                    {conversation?.messages.map((message, index) => {
                                        if (authenticatedUser.getID === message?.from) {
                                            return (
                                                <div key={index} className={classes.textJustifiedEnd}>
                                                    <div className={classes.basicMessage}>
                                                        <div className={classes.messageBubble}>
                                                            {message?.content}
                                                        </div>

                                                        <img className="dropdown-toggler rounded-circle mx-2"
                                                            width="30"
                                                            height="30"
                                                            src={authenticatedUser.getAvatar}
                                                            title={authenticatedUser.getFullName}
                                                            alt={authenticatedUser.getUsername}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={index} className={classes.textJustifiedStart}>
                                                    <div className={classes.basicMessage}>
                                                        <div className={classes.messageBubbleLeft}>
                                                            {message?.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </div>
                            <div className={classes.conversationFooter}>
                                <form
                                    className={classes.conversationForm}
                                    onSubmit={handleSubmit(onSubmitMessage)}>
                                    <textarea
                                        className={classes.conversationTextarea}
                                        name="message"
                                        ref={register({ required: t('form_validations:required') })}
                                        placeholder={t('vehicles:write_your_message')}
                                        maxLength="30000"
                                        rows="3"
                                    />
                                    {errors && <ValidationError errors={errors} name={name}/>}
                                    <button className={classes.conversationInputButton} type="submit">
                                        {t('vehicles:send')}
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </Fade>
        </Modal>
    );
}
