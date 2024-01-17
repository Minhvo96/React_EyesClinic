import React, { useEffect, useState } from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const StepProgressBar = ({ eyeSightValues, progressBarPercent, diagnoseInputs, diseases, selectedMedicines }) => {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (eyeSightValues) {
      const leftEyePercent = eyeSightValues.leftEye ? 25 : 0;
      const rightEyePercent = eyeSightValues.rightEye ? 25 : 0;
      setPercent(leftEyePercent + rightEyePercent);
    } else if (progressBarPercent) {
      setPercent(progressBarPercent);
      if (diagnoseInputs || diseases.length > 0 || selectedMedicines.length > 0) {
        let percentValue = 65;
        if (diagnoseInputs && diseases.length > 0 && selectedMedicines.length > 0) {
          percentValue = 100;
        } else if ((diagnoseInputs && diseases.length > 0) || (diagnoseInputs && selectedMedicines.length > 0) || (diseases.length > 0 && selectedMedicines.length > 0)) {
          percentValue = 75;
        }
        setPercent(percentValue);
      }
    }
  }, [diagnoseInputs, progressBarPercent, eyeSightValues, diseases, selectedMedicines]);

  return (
    <ProgressBar percent={percent} filledBackground="linear-gradient(to right, #add8e6, #0079af)">
      <Step transition="scale">
        {({ accomplished }) => (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '30px' }}>
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="30"
              src="../../images/Eye4.png"
            />
            <span style={{ fontSize: '12px' }}>Đo thị lực</span>
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished }) => (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '30px' }}>
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="30"
              src="../../images/Eye5.png"
            />
            <span style={{ fontSize: '12px' }}>Khám mắt</span>
          </div>
        )}
      </Step>
      <Step transition="scale">
        {({ accomplished }) => (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '30px' }}>
            <img
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width="30"
              src="../../images/Logo7.png"
            />
            <div className="d-flex justify-content-center">
              <span style={{ fontSize: '12px', overflow: 'visible' }}>Thanh&nbsp;</span>
              <span style={{ fontSize: '12px', overflow: 'visible' }}>toán</span>
            </div>
          </div>
        )}
      </Step>
    </ProgressBar>
  );
};



export default StepProgressBar;