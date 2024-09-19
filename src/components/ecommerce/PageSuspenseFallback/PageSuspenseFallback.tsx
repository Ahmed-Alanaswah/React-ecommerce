import { LottieHandler } from "@components/feedback";
import { Suspense } from "react";
const PageSuspenseFallback = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<LottieHandler type="loading" />}>{children}</Suspense>
  );
};

export default PageSuspenseFallback;
