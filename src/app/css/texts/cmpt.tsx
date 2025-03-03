/** @format */

'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface RippleEffect {
    x: number
    y: number
    id: number
    color: string
}

export default function Demo() {
    const [ripples, setRipples] = useState<RippleEffect[]>([])

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const color = '#' + Math.floor(Math.random() * 0xffffff).toString(16)

        setRipples((prev) => [
            ...prev,
            {
                x,
                y,
                id: Date.now(),
                color
            }
        ])

        setTimeout(() => {
            setRipples((prev) => prev.slice(1))
        }, 2000)
    }

    return (
        <div className="flex gap-4 items-center justify-center">
            <Button
                variant="ghost"
                size="lg"
                onClick={handleClick}
                className="relative overflow-hidden rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 hover:text-white transition-colors"
            >
                <span className="relative z-10">Button 1</span>
                {ripples.map((ripple) => (
                    <motion.span
                        key={ripple.id}
                        className="absolute pointer-events-none rounded-[50%] border-2"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            borderColor: ripple.color
                        }}
                        initial={{
                            width: 0,
                            height: 0,
                            opacity: 0.75
                        }}
                        animate={{
                            width: 350,
                            height: 350,
                            opacity: 0,
                            x: -175,
                            y: -175
                        }}
                        transition={{
                            duration: 2,
                            ease: 'linear'
                        }}
                    />
                ))}
            </Button>

            <Button
                variant="ghost"
                size="lg"
                onClick={handleClick}
                className="relative overflow-hidden rounded-full bg-neutral-800/80 hover:bg-neutral-700 text-neutral-200 hover:text-white transition-colors"
            >
                <span className="relative z-10">Button 2</span>
                {ripples.map((ripple) => (
                    <motion.span
                        key={ripple.id}
                        className="absolute pointer-events-none rounded-[50%] border-2"
                        style={{
                            left: ripple.x,
                            top: ripple.y,
                            borderColor: ripple.color
                        }}
                        initial={{
                            width: 0,
                            height: 0,
                            opacity: 0.75
                        }}
                        animate={{
                            width: 350,
                            height: 350,
                            opacity: 0,
                            x: -175,
                            y: -175
                        }}
                        transition={{
                            duration: 2,
                            ease: 'linear'
                        }}
                    />
                ))}
            </Button>
        </div>
    )
}
