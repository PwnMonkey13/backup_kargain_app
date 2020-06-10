import React from 'react';
import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="menu-footer">
            <ul>
                <li>
                    <Link href="/static/about" prefetch={false}>
                        <a>A propos de nous</a>
                    </Link>
                </li>
                <li>
                    <Link href="/static/confidentiality" prefetch={false}>
                        <a>Confidentialité</a>
                    </Link>
                </li>
                <li>
                    <Link href="/static/conditions" prefetch={false}>
                        <a>Conditions</a>
                    </Link>
                </li>
                <li>
                    <Link href="/static/locales" prefetch={false}>
                        <a>Langues</a>
                    </Link>
                </li>
            </ul>
        </footer>
    );
};

export default Footer;
