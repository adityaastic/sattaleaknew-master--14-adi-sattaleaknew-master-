import { Table } from "antd";
import React, { useState, useEffect } from "react";
const moment = require("moment-timezone");

function MonthlyTable({ gamedata, dropValue }) {
  const currentMonth = moment().tz("Asia/Kolkata").month();
  const currentYear = moment().tz("Asia/Kolkata").year();
  const numberDaysMonth = moment().tz("Asia/Kolkata").daysInMonth();
  const [gameResult, setGameResult] = useState([]);
  const [data, setData] = useState([]);
  let [columns, setcolumn] = useState([]);
  useEffect(() => {
    if (gamedata) {
      setData(gamedata);
    }
  }, [gamedata]);
  var selectMonthDrop;
  useEffect(() => {
    if (dropValue) {
      setGameResult(dropValue);
      // console.log('gameResult', gameResult)
      if (gameResult == "") {
        selectMonthDrop = moment().tz("Asia/Kolkata").format("MMMM");
        // console.log('if======>', selectMonthDrop)
      } else {
        selectMonthDrop = moment(
          `${dropValue?.year}-${dropValue?.month}-01`
        ).format("MMMM");
        // console.log('else======>', selectMonthDrop)
      }
      // console.log(gameResult);
      // console.log()
    } else {
    }
  });
  useEffect(() => {
    if (data.length > 0) {
      let array = Object.keys(data[0]);
      for (let i = 0; i < array.length; i++) {
        array[i] = {
          title: array[i] === "day" ? selectMonthDrop : array[i],
          dataIndex: array[i],
          key: array[i],
        };
      }
      setcolumn(array);
    }
  }, [data]);

  useEffect(() => {
    function getDaysInMonth(year, month, timezone) {
      return moment.tz({ year: year, month: month }, timezone).daysInMonth();
    }

    // Get the current date in a specific timezone
    const timezone = "Asia/Kolkata"; // Set your desired timezone
    const date = moment.tz(timezone);

    // Get the current year and month
    const currentYear = date.year();
    const currentMonth = date.month();

    // Get the number of days in the current month
    const currentMonthDays = getDaysInMonth(
      currentYear,
      currentMonth,
      timezone
    );

    fetch("https://api.sattakingvip.co.in/getmonthdata", {
      method: "POST", // or 'PUT' depending on your requirements
      headers: {
        "Content-Type": "application/json", // specify the content type
      },
      body: JSON.stringify({
        month: currentMonth + 1,
        year: currentYear,
        gameName: "",
        result: "",
        days: currentMonthDays,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div id="table-section" className="pt-4 monthYrTbl">
      <div
        className="text-center text-danger p-1"
        style={{ background: "#f5ecce" }}
      >
        {!(dropValue == null) && (
          <h5 className="text-center p-2" style={{ display: "block" }}>
            {dropValue?.gameName} MONTHLY RECORD CHART {selectMonthDrop} -{" "}
            {dropValue?.year || currentYear}
          </h5>
        )}
      </div>
      <div className="table-responsive pb-3" id="scrollbar1">
        <Table dataSource={data} columns={columns} pagination={false} />
      </div>
    </div>
  );
}

export default MonthlyTable;
