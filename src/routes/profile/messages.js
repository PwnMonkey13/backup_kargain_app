import React, { useContext, useEffect, useState } from 'react';
import Link from 'next-translate/Link';
import parseISO from 'date-fns/parseISO';
import { format } from 'date-fns';
import clsx from 'clsx';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import UserModel from '../../models/user.model';
import { useAuth } from '../../context/AuthProvider';
import ConversationsService from '../../services/ConversationsService';
import useStyles from '../../components/Conversations/conversation.styles';
import { useForm } from 'react-hook-form';
import { ModalDialogContext } from '../../context/ModalDialogContext';
import ValidationError from '../../components/Form/Validations/ValidationError';

const Messages = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [openedConversation, setOpenedConversation] = useState(false);
    const { dispatchModal, dispatchModalError } = useContext(ModalDialogContext);
    const [recipient, setRecipient] = useState(null);
    const { authenticatedUser } = useAuth();

    const { register, errors, handleSubmit } = useForm({
        mode: 'onChange',
        validateCriteriaMode: 'all'
    });

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'), {
        defaultMatches: true
    });

    const loadConversations = async () => {
        try {
            const conversations = await ConversationsService.getCurrentUserConversations();
            console.log(conversations)
            setConversations(conversations);
        } catch (err) {
            dispatchModalError({ err });
        }
    };

    const onSubmitMessage = async (form) => {
        const { message } = form;
        try {
            const conversation = await ConversationsService.postConversationMessage(message, recipient.getID);
            setSelectedConversation(conversation);
            dispatchModal({ msg: 'Message posted' });
        } catch (err) {
            dispatchModalError({
                err,
                persist: true
            });
        }
    };

    const handleSelectConversation = (index) => {
        const conversation = conversations[index];
        setSelectedConversation(conversation);
        setRecipient(new UserModel(conversation.to));
        setOpenedConversation(true);
    };

    const closeConversation = () => {
        setOpenedConversation(false);
    };

    useEffect(() => {
        loadConversations();
    }, []);

    useEffect(() => {
        if (conversations.length) handleSelectConversation(0);
    }, []);

    return (
        <>
            <h2>{t('vehicles:messaging')}</h2>
            <div className={classes.conversations}>
                <div className={classes.conversationsList}>
                    <div className={classes.styleScroller}>
                        <div className={classes.scrollerContainer}>
                            <div style={{ width: '100%' }}>
                                {conversations.length > 0 ? conversations.map((conversation, index) => {
                                    const recipient = new UserModel(conversation.to);
                                    return (
                                        <div key={index}
                                            className={classes.conversationListItem}
                                            onClick={() => handleSelectConversation(index)}>

                                            <img className="dropdown-toggler rounded-circle mx-2"
                                                width="30"
                                                height="30"
                                                src={recipient.getAvatar}
                                                title={recipient.getFullName}
                                                alt={recipient.getUsername}
                                            />

                                            <div className={classes.itemDetails}>
                                                <p className="mt-0">
                                                    {recipient.getFullName}
                                                </p>
                                                <p className={classes.itemDetailsPreview}>
                                                    {format(parseISO(conversation.createdAt), 'MM/dd/yyyy')}
                                                </p>
                                                <p className={classes.itemDetailsPreview}>
                                                    {conversation?.message?.content}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }) : (
                                    <p>{t('vehicles:no_conversations_yet')}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {selectedConversation && (
                    <div className={clsx(
                        classes.conversation,
                        !openedConversation && classes.conversationCloseMobile
                    )} style={{ width: '70%' }}>
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
                                {isMobile && (
                                    <div className={classes.pointerClose} onClick={() => closeConversation()}>
                                        <CloseIcon/>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className={classes.conversationContent}>
                            <div className={classes.messageContainer}>
                                {selectedConversation.createdAt && format(parseISO(selectedConversation.createdAt), 'MM/dd/yyyy')}
                                {selectedConversation?.messages.map((message, index) => {
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
                                                    <img className="dropdown-toggler rounded-circle mx-2"
                                                        width="30"
                                                        height="30"
                                                        src={recipient.getAvatar}
                                                        title={recipient.getFullName}
                                                        alt={recipient.getUsername}
                                                    />
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
        </>
    );
};

export default Messages;
