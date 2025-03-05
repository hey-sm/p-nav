/** @format */

import { TextFadeIn } from './component'

export default function Demo() {
    return (
        <div className="space-y-8">
            {/* 基本用法 */}
            <TextFadeIn />

            {/* 快速动画示例 */}
            <TextFadeIn
                duration={0.2}
                delay={0.01}
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
            />

            {/* 慢速动画示例 */}
            <TextFadeIn
                duration={0.5}
                delay={0.05}
                text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos."
            />
        </div>
    )
}
