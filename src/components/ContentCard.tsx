import { getYouOrFullName } from "@/lib";
import { useUser } from "@/providers/UserProvider";
import { EndorsementType, FeedbackType } from "@/types";
import { useFormatter, useTranslations } from "next-intl";
import StarRating from "./StarRating";
import UserAvatar from "./UserAvatar";

export function ContentCard({ content }: { content: EndorsementType | FeedbackType }) {
    const { user } = useUser()
    const t = useTranslations("general")
    const format = useFormatter()

    return (
        <div className="border rounded-lg p-4">
            {/* Header */}
            <div className="flex mb-2 justify-between">
                <div className="flex gap-4">
                    <UserAvatar user={content.user} />
                    <div>
                        {/* User name or "you" */}
                        <span className="font-semibold">{getYouOrFullName(content.user, t, user)}</span>
                        {/* Role */}
                        <p className="text-sm text-muted-foreground">{content.user.role.name}</p>
                    </div>
                </div>
                {/* Date */}
                <p className="text-muted-foreground text-xs">{format.dateTime(content.created_at, { year: "numeric", month: "short", day: "numeric" })}</p>
            </div>
            {/* Content */}
            <div>
                <div className="flex justify-between">
                    <span className="font-sans font-bold text-lg mb-1">{content.event.title}</span>
                    {"rating" in content && <StarRating rating={content.rating} />}
                </div>
                <p>{content.content}</p>
            </div>
        </div>
    )
}