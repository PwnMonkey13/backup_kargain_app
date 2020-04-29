import Link from 'next/link'
import React from 'react'

export default () => {
    return (
        <div>
            <ul>
                <li>
                    <Link href="/damages" prefetch={false}>
                        <a>A damages de nous</a>
                    </Link>
                </li>
                <li>
                    <Link href="/uploads" prefetch={false}>
                        <a>uploads</a>
                    </Link>
                </li>
                <li>
                    <Link href="/tags" prefetch={false}>
                        <a>tags</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
