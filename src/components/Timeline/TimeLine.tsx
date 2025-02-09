"use client"

import { useTimeLineItems } from "@/hooks/use-timeline-items";
import { cn } from "@/lib/utils";
import { TimeLineItemType, TimeLineItemTypeEnum } from "@/types";
import { UserType } from "@/types/auth";
import { ArrowUpDownIcon, BadgeCheckIcon, MessageCircleIcon, PlusIcon, StarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import AddFeedbackModal from "../Modals/AddFeedbackModal";
import { Skeleton } from "../ui/skeleton";
import { TimeLineContentCard } from "./TimeLineContentCard";
import { TimelineRatingUpdateCard } from "./TimelineRatingUpdateCard";

export function TimeLine({ user, skillId }: { user: UserType, skillId: string }) {
    const t = useTranslations("general")

    let { data: allItems, isLoading } = useTimeLineItems(skillId)

    const [sortDescending, setSortDescending] = useState(true)
    const [items, setItems] = useState<TimeLineItemType[] | undefined>()

    const getSortedItems = useCallback((items: TimeLineItemType[] | undefined, isDescending: boolean) => {
        if (!items) return undefined;
        return [...items].sort((a, b) => {
            const dateA = new Date(a.created_at).getTime()
            const dateB = new Date(b.created_at).getTime()
            return isDescending ? dateB - dateA : dateA - dateB
        })
    }, [])

    const sortItems = useCallback(() => {
        const sortedItems = getSortedItems(allItems, !sortDescending)
        setItems(sortedItems)
        setSortDescending(!sortDescending)
    }, [allItems, sortDescending, getSortedItems])

    useEffect(() => {
        const sortedItems = getSortedItems(allItems, sortDescending)
        setItems(sortedItems)
    }, [allItems, sortDescending, getSortedItems])

    const getIcon = (item: TimeLineItemType) => {
        switch (item.type) {
            case TimeLineItemTypeEnum.Feedback:
                return <MessageCircleIcon className="h-5 w-5 text-primary" strokeWidth={2.5} />
            case TimeLineItemTypeEnum.Endorsement:
                // TODO: ADD GREEN COLOR
                return <BadgeCheckIcon className="h-5 w-5" strokeWidth={2.5} />
            case TimeLineItemTypeEnum.Rating:
                return <StarIcon className="h-5 w-5 text-gold" strokeWidth={2.5} />
        }
    }

    const getCard = (item: TimeLineItemType) => {
        switch (item.type) {
            case TimeLineItemTypeEnum.Feedback:
                if (item.Feedback)
                    return <TimeLineContentCard content={item.Feedback} />
            case TimeLineItemTypeEnum.Endorsement:
                if (item.Endorsement)
                    return <TimeLineContentCard content={item.Endorsement} />
            case TimeLineItemTypeEnum.Rating:
                if (item.Rating)
                    // The rating update does not have a user, so we pass the user from the parent component
                    return <TimelineRatingUpdateCard ratingUpdate={item.Rating} user={user} />
            default:
                return <></>
        }
    }

    const AddFeedbackButton = () => (
        <AddFeedbackModal skillId={skillId}>
            <div className="relative flex items-center">
                <div className="absolute -left-4 md:left-1/2 flex flex-col items-center md:-translate-x-1/2" >
                    <button className="inline-flex items-center text-nowrap rounded-full bg-border px-4 py-1 text-sm font-medium border shadow-sm hover:bg-muted transition-colors">
                        <PlusIcon className="mr-1.5 h-4 w-4" />
                        {t("addFeedback")}
                    </button>
                </div>
            </div>
        </AddFeedbackModal>
    )

    return (
        <div className="relative mx-auto w-full">
            {/* Sort items */}
            <div className="flex justify-between items-center mb-8">
                <button
                    onClick={sortItems}
                    className="inline-flex items-center rounded-full bg-background px-4 py-1.5 text-sm font-medium border shadow-sm hover:bg-muted transition-colors"
                >
                    <ArrowUpDownIcon className="mr-1.5 h-4 w-4" />
                    {sortDescending ? t("newestFirst") : t("oldestFirst")}
                </button>
            </div>

            {/* Timeline container */}
            <div className="relative w-full">
                {/* Timeline line */}
                <div className="absolute left-4 md:left-1/2 top-0 h-full w-px bg-border " />

                {/* Timeline items */}
                <div className="space-y-8 p-4 w-full">
                    {sortDescending && (
                        <AddFeedbackButton />
                    )}

                    {/* Loading skeletons */}
                    {isLoading && Array.from({ length: 5 }).map((_, index) =>
                        <div className="relative flex items-start md:items-center" key={index}>
                            <Skeleton className={cn("bg-border", "w-full h-24 ml-12 md:ml-0 md:w-[calc(50%-20px)]", index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8')} />
                        </div>
                    )}

                    {items?.map((item, index) => (
                        <div key={index} className="relative flex items-start md:items-center w-full">
                            {/* Date marker */}
                            <div className="absolute left-0 md:left-1/2 flex flex-col items-center -translate-x-1/2 bg-background">
                                <div className="rounded-full h-8 w-8 md:h-10 md:w-10 border flex items-center justify-center">
                                    {getIcon(item)}
                                </div>
                                <div className="mt-1.5 text-xs ">
                                    <div>{new Date(item.created_at).toLocaleString('default', { month: 'short' }).toUpperCase()}</div>
                                    <div>{new Date(item.created_at).getFullYear()}</div>
                                </div>
                            </div>
                            <div className={cn("ml-12 md:ml-0 w-full md:w-[calc(50%-20px)]", index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8')}>
                                {getCard(item)}
                            </div>
                        </div>
                    )
                    )}
                    {!sortDescending && (
                        <AddFeedbackButton />
                    )}
                </div>
            </div>
        </div >
    )
}
