import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

const FixedFooter = styled.footer`
    // position:fixed;
    // bottom:0
`

const Footer = ({ t, ...props }) => {
    return (
        <FixedFooter className="menu-footer">
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
        </FixedFooter>
    )
}

// export default withTranslation('common')(Footer);
export default Footer
