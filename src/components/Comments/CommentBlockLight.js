import React from 'react';
import Link from 'next-translate/Link';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { getTimeAgo } from '../../libs/utils';
import Typography from '@material-ui/core/Typography';

const CommentsBlockLight = ({ comment, index }) => {
    const date = comment.getRaw?.updatedAt;
    const { t, lang } = useTranslation();
    const timeAgo = getTimeAgo(date, lang);
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
                        {timeAgo}
                    </small>
                    <br/>
                    <small>
                        {comment.getLikes.length} j'aime
                    </small>
                </div>
                <p className="my-1 comment-text">
                    {comment.getMessage}
                </p>
                {responsesLength > 0 && (
                    <Typography>{t('vehicles:response')}</Typography>
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
