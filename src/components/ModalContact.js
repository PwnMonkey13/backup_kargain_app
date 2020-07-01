import React, { useContext, useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import parseISO from 'date-fns/parseISO';
import { format } from 'date-fns';
import { ModalDialogContext } from '../context/ModalDialogContext';
import { useAuth } from '../context/AuthProvider';
import useStyles from './Conversations/conversation.styles';
import Link from 'next-translate/Link';
import { useForm } from 'react-hook-form';
import ValidationError from './Form/Validations/ValidationError';
import ConversationsService from '../services/ConversationsService';

export default function ModalContact ({ recipient, handleClose, open }) {
    const classes = useStyles();
    const [conversation, setConversation] = useState(null);
    const { authenticatedUser } = useAuth();
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);

    const { register, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all',
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
        } catch (err) {
            dispatchModalError({
                err,
                persist: true,
            });
        }
    };

    useEffect(() => {
        if (recipient) loadConversation();
    }, []);

    return (
        <Modal className={classes.modal} open={open} onClose={handleClose}>
            <Fade in={open}>
                <div className={classes.paper}>
                    {recipient && (
                        <>
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
                            <div className="layout" style={{
                                overflowY: 'scroll',
                                height: '80vh',
                            }}>
                                <div style={{
                                    height: '467px',
                                    backgroundColor: 'gainsboro',
                                }}>
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

                                <div className={classes.conversationInput}>
                                    <div className="layout" style={{
                                        display: 'flex',
                                        position: 'relative',
                                        width: '100%',
                                    }}>
                                        <form className={classes.conversationContainer}
                                              onSubmit={handleSubmit(onSubmitMessage)}>
                                        <textarea
                                            className={classes.conversationTextarea}
                                            name="message"
                                            ref={register({ required: 'required' })}
                                            placeholder="Écrivez votre message"
                                            maxLength="30000"
                                            rows="5"
                                        />
                                            {errors && <ValidationError errors={errors} name={name}/>}
                                            <button className={classes.conversationInputButton} type="submit">
                                                Envoyer
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </Fade>
        </Modal>
    );
}
