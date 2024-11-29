"use client"

import { Link } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { useUser } from "@/providers/UserProvider"
import { ProfileType } from "@/types"
import { Tooltip } from "@radix-ui/react-tooltip"
import { icons } from "lucide-react"
import { TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"

export default function ProfileTile({ profile, variant = "default", className }: { profile: ProfileType, variant?: "default" | "icon", className?: string }) {
    // Import icon dynamically and fallback to CircleDashed if icon is not found
    const Icon = icons[profile.icon as keyof typeof icons] || icons["CircleDashed"]

    const component = () => {
        if (variant === "default")
            return (
                <div className={cn("flex items-center gap-4 bg-border p-2 rounded-lg", className)}>
                    <div className="p-2 bg-background rounded-full">
                        <Icon size={20} strokeWidth={2.5} />
                    </div>
                    <span className="font-medium mr-3">{profile.title}</span>
                </div>
            )
        else if (variant === "icon")
            return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className={cn("flex items-center gap-4 bg-border p-2 rounded-full", className)}>
                                <Icon size={20} strokeWidth={2.5} />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>{profile.title}</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )
        return null
    }

    return (
        <Link href={`/student/profiles/${profile.id}`}>
            {component()}
        </Link>
    )
}
