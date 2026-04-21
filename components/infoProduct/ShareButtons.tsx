// components/InfoProduct/ShareButtons.tsx
import { Button } from "@/components/ui/button";
import { Share2, Facebook, Mail } from "lucide-react";

type Props = {
  onShare: (platform: "facebook" | "mail") => void;
};

const PLATFORMS = [
  { id: "facebook" as const, label: "Facebook", icon: Facebook },
  { id: "mail" as const, label: "Correo", icon: Mail },
];

export const ShareButtons = ({ onShare }: Props) => (
  <div className="hidden md:flex items-center gap-2 flex-wrap">
    <Share2 className="w-4 h-4 text-gray-400" />
    <span className="text-xs text-gray-400 mr-1">Compartir:</span>
    {PLATFORMS.map(({ id, label, icon: Icon }) => (
      <Button key={id} variant="outline" size="sm" className="text-xs h-7 px-3 cursor-pointer" onClick={() => onShare(id)} aria-label={`Compartir en ${label}`}>
        <Icon className="w-3 h-3 mr-1" />
        {label}
      </Button>
    ))}
  </div>
);