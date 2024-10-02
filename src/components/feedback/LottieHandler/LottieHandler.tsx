import Lottie from "lottie-react";
import notFound from "@assets/lottieFiles/notfound.json";
import error from "@assets/lottieFiles/error.json";
import loading from "@assets/lottieFiles/loading.json";
import empty from "@assets/lottieFiles/empty.json";
import success from "@assets/lottieFiles/success.json";

const lottieFilesMap = {
  notFound,
  error,
  loading,
  empty,
  success,
};

type LottieHandlerProps = {
  type: keyof typeof lottieFilesMap;
  message?: string;
};

const LottieHandler = ({ type, message }: LottieHandlerProps) => {
  const lottie = lottieFilesMap[type];
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <Lottie animationData={lottie} style={{ width: "500px" }} />
      {message && (
        <h3 style={{ fontSize: "19px", marginTop: "30px" }}>{message}</h3>
      )}
    </div>
  );
};

export default LottieHandler;
