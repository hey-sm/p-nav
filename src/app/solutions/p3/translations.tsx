/** @format */

export const translations = {
    en: {
        title: 'Hello World!',
        content: 'This is a demo page.',
        button: 'Toggle Language'
    },
    zh: {
        title: '你好，世界！',
        content: '这是一个示例页面。',
        button: '切换语言'
    }
} as const

export type Locale = keyof typeof translations
export const defaultLocale: Locale = 'en'
export const locales: Locale[] = ['en', 'zh']
