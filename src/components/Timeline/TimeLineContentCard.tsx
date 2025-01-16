import { getYouOrFullName } from "@/lib";
import { useUser } from "@/providers/UserProvider";
import { EndorsementType, FeedbackType } from "@/types";
import { useTranslations } from "next-intl";
import StarRating from "../StarRating";
import UserAvatar from "../UserAvatar";

export function TimeLineContentCard({ content }: { content: EndorsementType | FeedbackType }) {
    const { user } = useUser()
    const t = useTranslations("general")

    const contentType = "rating" in content ? "endorsement" : "feedback"

    return (
        <div className="border rounded-lg p-4">
            {/* Header */}
            <div className="flex mb-2 justify-between">
                <div className="flex flex-col">
                    <span className="font-sans font-bold text-lg">{content.title}</span>
                    <span className="text-muted-foreground text-sm">{t(contentType)}</span>
                </div>
                <UserAvatar user={content.created_by} />
            </div>

            {/* User name or "you" */}
            {(!content.created_by && content.created_by_email) ?
                <span className="font-semibold">{content.created_by_email}</span>
                :
                content.created_by && <span className="font-semibold">
                    {getYouOrFullName(content.created_by, t, user)} ({content.created_by.role?.name || t("external")})
                </span>
            }
            {/* Content */}
            <div>
                {"rating" in content && <>
                    <div className="my-2">
                        <StarRating rating={content.rating} showRatingTitle />
                    </div>
                </>}
                <p>{content.content}</p>
            </div>
        </div>
    )
}
