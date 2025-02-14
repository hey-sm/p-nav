/** @format */

import { Button } from "@/components/ui/button";
import { CoolMode } from "@/components/magicui/cool-mode";
import { TextAnimate } from "@/components/magicui/text-animate";
export default function CoolModeDemo() {
  return (
    <div className="w-screen h-screen flex">
      <CoolMode>
        <Button className="m-auto " variant="secondary">
          <TextAnimate animation="blurInUp" by="character">
            Blur in by character
          </TextAnimate>
        </Button>
      </CoolMode>
    </div>
  );
}
