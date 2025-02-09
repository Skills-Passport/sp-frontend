import { EndorsementsList } from "@/components/EndorsementsList"
import { FeedbacksList } from "@/components/FeedbacksList"
import UpdateRatingModal from "@/components/Modals/Student/UpdateRatingModal"
import ProfileTile from "@/components/ProfileTile"
import StarRating from "@/components/StarRating"
import TimeLineWithUser from "@/components/Timeline/TimeLineWithUser"
import PageTitle from "@/components/Typography/PageTitle"
import SectionTitle from "@/components/Typography/SectionTitle"
import { Link } from "@/i18n/routing"
import { getMostRecentRating, isNewestRatingApproved } from "@/lib"
import { getStudentSkill } from "@/lib/queries/server/queries"
import { PencilIcon } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { notFound } from "next/navigation"

const SkillsDetail = async (props: { params: Promise<{ id: string }> }) => {
    const params = await props.params;
    const t = await getTranslations("general")

    const skill = await getStudentSkill(params.id)
    if (!skill) notFound()

    return <div className="flex flex-col gap-2">

        {/* Title and profiles */}
        <div className="flex justify-between">
            <PageTitle>{skill.title}</PageTitle>
            <div className="flex gap-2">
                {skill?.competency?.profiles?.map((profile) => <ProfileTile key={profile.id} profile={profile} variant="icon" />)}
            </div>
        </div>

        {/* Description */}
        {skill.desc && <div className="prose" dangerouslySetInnerHTML={{ __html: skill.desc }}></div>}

        {/* Rating */}
        <div className="mt-4">
            <SectionTitle>{t("rating")}</SectionTitle>

            <div className="flex gap-4">
                {/* Star rating */}
                <StarRating rating={getMostRecentRating(skill.ratings) || 0} approved={isNewestRatingApproved(skill.ratings)} />

                {/* Edit rating */}
                {skill.is_added && <UpdateRatingModal currentRating={getMostRecentRating(skill.ratings)} skillId={skill.id}>
                    <div className="flex items-center bg-border p-1 rounded-full"><PencilIcon size={15} /></div>
                </UpdateRatingModal>}
            </div>
        </div>

        {/* Skill journey */}
        <div>
            <SectionTitle>{t("yourJourney")}</SectionTitle>
            <TimeLineWithUser skillId={skill.id} />
        </div>

        {/* Feedbacks */}
        <div className="mt-6">
            <FeedbacksList skillId={skill.id} />
        </div>

        {/* Endorsements */}
        <div className="mt-6 mb-4">
            <EndorsementsList skillId={skill.id} />
        </div>

        {/* Competencies */}
        <span className="font-bold">{t("competencies")}</span>
        <div className="flex gap-2">
            {skill.competency && <Link href={`/student/competencies/${skill.competency.id}`}>
                <div className="bg-sidebar-accent px-4 py-1 rounded-full">{skill.competency.title}</div>
            </Link>}
        </div>
    </div>
}

export default SkillsDetail