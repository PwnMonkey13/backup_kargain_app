import React from 'react'
import Link from 'next/link'

const Footer = ({t, ...props}) => {
    return(
        <footer className="menu-footer">
            <ul>
                <li>
                    <Link href="/about">
                        <a>A propos de nous</a>
                    </Link>
                </li>
                <li>
                    <Link href="/confidentiality">
                        <a>Confidentialité</a>
                    </Link>
                </li>
                <li>
                    <Link href="/conditions">
                        <a>Conditions</a>
                    </Link>
                </li>
                <li>
                    <Link href="/locales">
                        <a>Langues</a>
                    </Link>
                </li>
            </ul>
        </footer>
    );
};

// export default withTranslation('common')(Footer);
export default Footer;

