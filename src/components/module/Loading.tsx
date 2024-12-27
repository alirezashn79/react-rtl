import { Commet } from "react-loading-indicators";

export default function Loading() {
  return (
    <div className="absolute inset-0 bg-blend-multiply backdrop-blur-sm flex flex-col gap-4 items-center justify-center">
      <Commet color="#18181b" size="medium" text="loading" />
    </div>
  );
}
