import React from 'react';
import clsx from 'clsx';
import Link from 'next-translate/Link';

const CTALink = ({ href, title, id, className }) => {
    return (
        <Link href={href} prefetch={false} passHref>
            <a id={id} className={
                clsx(className,
                    'btn btn-outline-primary',
                    'mx-1'
                )
            }>
                {title}
            </a>
        </Link>
    );
};

CTALink.defaultProps = {
    href : "/"
}
export default CTALink;
