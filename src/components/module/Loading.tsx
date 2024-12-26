import { Progress } from "../ui/progress";

export default function Loading({ progress }: { progress: number }) {
  return (
    <div className="absolute inset-0 bg-blend-multiply backdrop-blur-sm flex flex-col gap-4 items-center justify-center">
      <Progress value={progress} className="w-[10%]" />
      <p className="text-xl animate-pulse">Loading</p>
    </div>
  );
}
