import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[250px] w-[463px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[463px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  )
}