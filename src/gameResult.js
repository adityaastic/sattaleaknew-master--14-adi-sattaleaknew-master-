import { useState, useEffect } from "react";
import App from "./App";
import moment from "moment";
import AdvertisementComponent from "./utilities/advertismentComponent";
const momenttz = require("moment-timezone");
const GameResult = ({ dayGameData }) => {
  const currentDate = moment().format("YYYY-MM-DD");

  const [data, setGameData] = useState([]);

  const currentTime = moment().format("HH:mm");

  useEffect(() => {
    setGameData(dayGameData);
  }, [dayGameData]);

  // based on current date and time get data
  const getTodayResult = (gameData) => {
    const itemTime = moment(gameData.open_time, "HH:mm");
    const currentMoment = moment(currentTime, "HH:mm");

    if (gameData?.curr_date?.date === currentDate) {
      return currentMoment.isSameOrAfter(itemTime)
        ? gameData?.curr_date?.result || ""
        : "";
    }
    return "";
  };
  return (
    <>
      <marquee className="fs-3 bg-white marquee mt-1">
        {" "}
        <font color="#A52A2A"> News</font> <font color="#ff7e00">Live</font>{" "}
        <font color="#03F">MORNING STAR</font> &nbsp;
        <font color="#00b63c;">»</font> &nbsp;
      </marquee>
      <div className="pt-5 col-12 container-fluid daywisereport">
        <div className="row">
          {data && data.length > 0 ? (
            data.map((gameData, index) => (
              <div
                key={index}
                className={`col-md-${
                  index === 0 || index === 7 || index === 14 ? 12 : 6
                } col-sm-12 game_column`}
              >
                <div className="d-flex align-items-center flex-column col-lg-12">
                  <h6 className="mb-0 pt-2 fw-bold fs-6">
                    {gameData?.game_name}
                  </h6>
                  <p className="mb-0 fs-6 textColor">
                    ( {gameData?.open_time} )
                  </p>
                  <div className="d-flex align-items-end text-center">
                    <div>
                      <p className="mb-0 fs-6"></p>
                      <span className="btn">
                        {gameData?.prev_date?.result || "{ }"}
                      </span>
                    </div>
                    <div></div>
                    <div>
                      <p className="mb-0 fs-6"></p>
                      <span className="btn">{getTodayResult(gameData)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p></p>
          )}
        </div>
      </div>
      <AdvertisementComponent type='even'/>
    </>
  );
};

export default GameResult;
