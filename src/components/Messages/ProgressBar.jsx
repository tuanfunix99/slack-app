import React from "react";
import { Progress } from "semantic-ui-react";

const ProgressBar = ({ uploadState, progress }) =>
  uploadState && (
    <Progress
      className="progress__bar"
      percent={progress}
      progress
      indicating
      size="medium"
      inverted
    />
  );

export default ProgressBar;
