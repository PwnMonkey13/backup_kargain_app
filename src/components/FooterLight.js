import React from 'react';
import Link from 'next-translate/Link';
import useTranslation from 'next-translate/useTranslation';

const FooterLight = () => {
    const { t } = useTranslation();

    return (
        <footer>
            <div className="container">
                <div className="footer-widget pt-5 pb-5">
                    <ul className="d-flex justify-content-center">
                        <li>
                            <Link href="/static/contact">
                                <a>Contact</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/static/about" prefetch={false}>
                                <a>{t('layout:about-us')}</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/static/privacy" prefetch={false}>
                                <a>{t('layout:privacy')}</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/static/conditions" prefetch={false}>
                                <a>{t('layout:terms')}</a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default FooterLight;
