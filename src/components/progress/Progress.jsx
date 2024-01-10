import React from "react";
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";

class StepProgressBar extends React.Component {
  render() {
    return (
      <ProgressBar
        percent={100}
        filledBackground="linear-gradient(to right, #add8e6, #0079af)"
      >
        <Step transition="scale">
          {({ accomplished }) => (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '30px' }}>
              <img
                style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                width="30"
                src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/9d/Pichu.png/revision/latest?cb=20170407222851"
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
                src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/97/Pikachu_%28Smiling%29.png/revision/latest?cb=20170410234508"
              />
              <span style={{ fontSize: '12px' }}>Khám mắt tổng quát</span>
            </div>
          )}
        </Step>
        <Step transition="scale">
          {({ accomplished }) => (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '30px' }}>
              <img
                style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                width="30"
                src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
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
  }
}


export default StepProgressBar;