import React, { useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Link from 'next-translate/Link';
import i18nConfig from '../../../i18n.json';
import useTranslation from 'next-translate/useTranslation';
import startsWithLang from 'next-translate/_helpers/startsWithLang';

const DropdownSwitchLang = () => {
        const router = useRouter();
        const { allLanguages, allLanguagesLabel } = i18nConfig;
        const { lang } = useTranslation();
        const [open, setOpen] = useState(false);
        const replaceLang = href => startsWithLang(href, allLanguages)
            ? href.split('/').filter(part => part !== lang).join('/') || '/'
            : href;

        return (
            <li className="nav-item navbar-dropdown p-2" data-dropdown="dropdownLocale">
                <img className="dropdown-toggler rounded-circle"
                     width="30"
                     height="30"
                     src={`/images/flags/${lang}.svg`}
                     alt={lang}
                     onClick={() => setOpen(open => !open)}
                />

                <ul
                    id="dropdownLocale"
                    className={clsx('dropdown', open && 'show')}
                    style={{ minWidth: 'unset' }}>
                    {allLanguages && allLanguages.map((lng, index) => {
                        if (lng === lang) return null;
                        return (
                            <li key={index} className="px-0 dropdown-item">
                                <Link
                                    href={replaceLang(router.asPath)}
                                    prefetch={false}
                                    lang={lng}>
                                    <a className="nav-link text-left">
                                        <div className="dropdown-toggler" onClick={() => setOpen(open => !open)}>
                                            <img className="rounded-circle"
                                                 width="30"
                                                 height="30"
                                                 src={`/images/flags/${lng}.svg`}
                                                 alt={lng}
                                            />
                                            <span> {allLanguagesLabel[lng]} </span>
                                        </div>
                                    </a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </li>
        );
    }
;

export default DropdownSwitchLang;
