import Link from 'next/link'
import React from 'react'

export default () => {
    return (
        <div>
            <ul>
                <li>
                    <Link href="/dev/damages" prefetch={false}>
                        <a>damages</a>
                    </Link>
                </li>
                <li>
                    <Link href="/dev/damagesViewer" prefetch={false}>
                        <a>damages Viewer</a>
                    </Link>
                </li>
                <li>
                    <Link href="/dev/uploads" prefetch={false}>
                        <a>uploads</a>
                    </Link>
                </li>
                <li>
                    <Link href="/dev/tags" prefetch={false}>
                        <a>tags</a>
                    </Link>
                </li>
                <li>
                    <Link href="/dev/uploads" prefetch={false}>
                        <a>uploads</a>
                    </Link>
                </li>
            </ul>
        </div>
    )
}
