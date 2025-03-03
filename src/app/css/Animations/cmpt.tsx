/** @format */

'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function Demo() {
    const [isShowing, setIsShowing] = useState(false)

    const text =
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus numquam minus, tempora recusandae incidunt itaque sint delectus perspiciatis dicta laboriosam harum magnam sunt maiores natus amet quas vel non ut!'

    // 将文本拆分成字符数组
    const characters = text.split('')

    return (
        <div className="space-y-4">
            <motion.div className="flex flex-wrap p-4 rounded-lg bg-neutral-100/50 dark:bg-neutral-900/50 leading-relaxed">
                {characters.map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isShowing ? 1 : 0 }}
                        transition={{
                            duration: 0.3,
                            delay: i * 0.02,
                            ease: 'easeInOut'
                        }}
                        className={`inline-block ${char === ' ' ? 'w-2' : ''}`}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.div>

            <div className="flex justify-center">
                <button
                    onClick={() => setIsShowing(!isShowing)}
                    className="px-4 py-2 rounded-full bg-neutral-200 dark:bg-neutral-800 
                             hover:bg-neutral-300 dark:hover:bg-neutral-700 
                             transition-colors"
                >
                    {isShowing ? 'Hide Text' : 'Show Text'}
                </button>
            </div>
        </div>
    )
}
