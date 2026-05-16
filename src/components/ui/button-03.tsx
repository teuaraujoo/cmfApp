import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface btnProps {
  text: string
}

export default function ButtonShineHoverDemo({ text }: btnProps) {
  return (
    <Button className="h-36px text-white bg-[#1FA2E1] hover:bg-[#126F9C] relative overflow-hidden before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.7)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:transition-[background-position_0s_ease] before:duration-1000 hover:before:bg-[position:-100%_0,0_0] dark:before:bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.5)_50%,transparent_75%,transparent_100%)] cursor-pointer">
      {text}
      <ArrowRight className="h-4 w-4" />
    </Button>
  );
};

