import { Skeleton } from "./ui/skeleton";

type SkeletonSchemaProps = {
  grid: number;
}

const SkeletonSchema = ({ grid }: SkeletonSchemaProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
      {Array.from({ length: grid }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3 mx-auto">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonSchema;
