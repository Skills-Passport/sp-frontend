import { LucideIcon } from "lucide-react"
import { UserType } from "./User"
import { useTranslations } from "next-intl"

export type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
}

export type TranslationFunction = ReturnType<typeof useTranslations>;

export type ProfileType = {
  id: string
  title: string
  desc: string
  icon: string,
  created_by: UserType
  created_at: Date
}

export type CompetencyType = {
  id: string
  title: string
  desc: string
  overview: string
  feedbacks_count?: number
  endorsements_count?: number
  skills: SkillType[]
  profiles: ProfileType[]
  created_at: Date
}

export type SkillType = {
  id: string
  title: string
  desc?: string
  groups_count: number
  is_added: boolean
  competency: CompetencyType
  created_at: Date
  ratings: RatingHistoryType[]
}

export type GroupType = {
  id: string
  name: string
  desc: string
  created_by: UserType
  closed_at: Date
  created_at: Date
}

export type FeedbackType = {
  id: string
  user: UserType
  created_at: Date
  event: EventType
  content: string
}

export type EndorsementType = {
  id: string
  user: UserType
  event: EventType
  content: string
  rating: number
  is_approved: boolean
  created_by: UserType
  created_at: Date
}

export type RatingHistoryType = {
  rating: number
  created_at: Date
}

export type TimeLineItemType = {
  type: TimeLineItemTypeEnum,
  created_at: Date,
  endorsement?: EndorsementType,
  feedback?: FeedbackType,
  ratingUpdate?: RatingHistoryType
}

export enum TimeLineItemTypeEnum {
  Feedback,
  Endorsement,
  RatingUpdate
}

export type EventType = {
  id: string
  title: string
}

export type SkillsQueryType = {
  page: string,
  search: string,
  competencies: string,
  is_added: string
}