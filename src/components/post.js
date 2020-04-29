import Link from 'next/link'
import React from 'react'

export default ({ title, body, id }) => (
    <article>
        <h2>{title}</h2>
        <p>{body}</p>
        <Link href="/blog/[id]" as={`/blog/${id}`}>
            <a>Read more...</a>
        </Link>
    </article>
)
