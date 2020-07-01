import React from 'react';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';
import { makeStyles } from '@material-ui/styles';
import { Col, Row } from 'reactstrap';

const useStyles = makeStyles(theme => ({
    footerLinks: {
        display: 'flex',
        justifyContent: 'center',
    },
}));

const FooterLight = () => {
    const { t } = useTranslation();
    const classes = useStyles();

    return (
        <footer>
            <style jsx>{`
                .footerLinks {
                   & > div{
                        border-right : 1px solid gainsboro;
                    }
                }
                
                a {
                    color: #343333;
                    font-weight: 700
                }
                    `}
            </style>

            <div className="container">
                <Row className="footerLinks my-4 py-2">
                    <Col sm={6} md={3}>
                        <Link href="/static/contact">
                            <a>Contact</a>
                        </Link>
                    </Col>
                    <Col sm={6} md={3}>
                        <Link href="/static/about" prefetch={false}>
                            <a>{t('layout:about-us')}</a>
                        </Link>
                    </Col>
                    <Col sm={6} md={3}>
                        <Link href="/static/confidentiality" prefetch={false}>
                            <a>{t('layout:privacy')}</a>
                        </Link>
                    </Col>
                    <Col sm={6} md={3}>
                        <Link href="/static/conditions" prefetch={false}>
                            <a>{t('layout:terms')}</a>
                        </Link>
                    </Col>
                </Row>
            </div>
        </footer>
    );
};

export default FooterLight;
