import { cn } from "@/lib/utils"
import { Skeleton } from "./ui/skeleton"

export default function Skeletons({ amount = 12, className, wrapperClass, type }: { amount?: number, className?: string, wrapperClass?: string, type?: "profile" }) {
    return <div className={cn(wrapperClass || "grid lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4")}>
        {Array.from({ length: amount }).map((_, index) => <Skeleton key={index} className={className} />)}
    </div>
}
