"use client";
import { ClipLoader, BounceLoader } from "react-spinners";
const override = {
  display: "block",
  margin: "100px auto",
};
const LoadingPage = ({ loading }) => {
  return (
    <BounceLoader
      color="#3B82F6"
      loading={loading}
      cssOverride={override}
      size={150}
      aria-label="Loading Spinner"
    />
    // <ClockLoader color="#36d7b7" />
  );
};

export default LoadingPage;
