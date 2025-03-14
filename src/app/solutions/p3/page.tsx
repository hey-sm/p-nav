/** @format */

import { I18nDemo } from './client'
import { Locale, defaultLocale } from './translations'

export default function Page({
    params: { lang = defaultLocale }
}: {
    params: { lang: Locale }
}) {
    return <I18nDemo defaultLang={lang} />
}

// 生成静态路径
export function generateStaticParams() {
    return [{ lang: 'en' }, { lang: 'zh' }]
}

// 设置动态页面的元数据
export async function generateMetadata({
    params: { lang = defaultLocale }
}: {
    params: { lang?: Locale }
}) {
    return {
        title: `I18n Demo - ${lang.toUpperCase()}`
    }
}
