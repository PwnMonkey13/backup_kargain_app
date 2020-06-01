import Link from 'next/link';
import React from 'react';
import clsx from 'clsx';

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

export default CTALink;
