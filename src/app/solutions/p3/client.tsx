/** @format */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { translations } from './translations'

type Language = 'en' | 'zh'

export function I18nDemo({ defaultLang = 'en' }: { defaultLang: Language }) {
    const [currentLang, setCurrentLang] = useState<Language>(defaultLang)

    const toggleLanguage = () => {
        setCurrentLang(currentLang === 'en' ? 'zh' : 'en')
    }

    return (
        <div className="container mx-auto p-4 space-y-4">
            <Button onClick={toggleLanguage}>
                {translations[currentLang].button}
            </Button>
            <div className="rounded-lg border p-4 space-y-4">
                <h1 className="text-2xl font-bold">
                    {translations[currentLang].title}
                </h1>
                <p>{translations[currentLang].content}</p>
            </div>
        </div>
    )
}
