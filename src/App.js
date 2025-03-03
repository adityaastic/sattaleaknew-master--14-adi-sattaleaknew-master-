import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import trackVisitor from "./utilities/tracker";
import moment from "moment";
import GameResult from "./gameResult";
import AdvertisementComponent from "./utilities/advertismentComponent";
import { Helmet } from "react-helmet";

function App() {
  const [data, setData] = useState([]);
  const currentTime = moment().format("HH:mm");
  const todayDate = moment(new Date()).format("lll");
  var currentDate = moment().tz("Asia/Kolkata").format("YYYY-MM-DD");
  const [datagame, setDataFor] = useState([]);
  let prevDate = moment(new Date())
    .tz("Asia/Kolkata")
    .subtract(1, "days")
    .format("YYYY-MM-DD");

  const scrollToChart = () => {
    const tableSection = document.getElementById("table-section");
    if (tableSection) {
      tableSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    trackVisitor();
  });

  useEffect(() => {
    fetch("https://api.sattakingvip.co.in/getData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        game_name: "",
        curr_date: currentDate,
        prev_date: prevDate,
        open_time: "market_sunday_time_open",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        // Sort data based on open_time
        const sortedData = json.sort((a, b) => {
          const timeA = moment(a.open_time, "HH:mm");
          const timeB = moment(b.open_time, "HH:mm");
          return timeA.diff(timeB);
        });

        // Set sorted data into state
        setData(sortedData);
      })
      .catch((error) => console.error(error));
  }, [currentDate, prevDate]);

  // changes according to timing
  // useEffect(() => {
  //   if (data?.length > 0) {
  //     // Convert current time to a moment object for comparison
  //     const currentMoment = moment(currentTime, "HH:mm");

  //     // Process and filter the data
  //     const processedData = data.map((item) => {
  //       const itemTime = moment(item.open_time, "HH:mm");
  //       const resultAvailable = item?.curr_date?.result ? true : false;

  //       return {
  //         gameName: item.game_name,
  //         result: resultAvailable ? item?.curr_date?.result : "wait",
  //         openTime: item.open_time,
  //         isAvailable: resultAvailable,
  //         itemTime: itemTime,
  //       };
  //     });

  //     // Sort the processed data by open_time
  //     const sortedProcessedData = processedData.sort((a, b) => {
  //       return a.itemTime.diff(b.itemTime);
  //     });

  //     // Separate records into those with available results and those with "wait"
  //     const availableResults = sortedProcessedData.filter(
  //       (item) => item.isAvailable
  //     );
  //     const upcomingRecords = sortedProcessedData.filter(
  //       (item) => !item.isAvailable
  //     );

  //     // Determine the records to display
  //     let recordsToDisplay = [];

  //     if (availableResults.length > 0) {
  //       recordsToDisplay = [...availableResults];

  //       const lastAvailableIndex = sortedProcessedData.indexOf(
  //         availableResults[availableResults.length - 1]
  //       );
  //       const nextRecord = sortedProcessedData[lastAvailableIndex + 1];
  //       if (nextRecord) {
  //         recordsToDisplay.push(nextRecord);
  //       }
  //     } else {
  //       recordsToDisplay = [...upcomingRecords.slice(0, 3)];
  //     }

  //     if (recordsToDisplay.length > 3) {
  //       recordsToDisplay = recordsToDisplay.slice(-3);
  //     }

  //     setDataFor(recordsToDisplay);

  //     // Debugging log
  //   }
  // }, [data, currentTime]);

  useEffect(() => {
    if (data?.length > 0) {
      const currentMoment = moment(currentTime, "HH:mm");
  
      const processedData = data.map((item) => {
        const itemTime = moment(item.open_time, "HH:mm");
        const resultAvailable = item?.curr_date?.result ? true : false;
  
        return {
          gameName: item.game_name,
          result: resultAvailable ? item?.curr_date?.result : "wait",
          openTime: item.open_time,
          isAvailable: resultAvailable,
          itemTime: itemTime,
        };
      });
  
      const sortedProcessedData = processedData.sort((a, b) =>
        a.itemTime.diff(b.itemTime)
      );
  
      const availableResults = sortedProcessedData.filter((item) => item.isAvailable);
      const upcomingRecords = sortedProcessedData.filter((item) => !item.isAvailable);
  
      let recordsToDisplay = [];
  
      if (availableResults.length > 0) {
        recordsToDisplay = [...availableResults];
  
        const lastAvailableIndex = sortedProcessedData.indexOf(
          availableResults[availableResults.length - 1]
        );
        const nextRecord = sortedProcessedData[lastAvailableIndex + 1];
        if (nextRecord) {
          recordsToDisplay.push(nextRecord);
        }
      } else {
        recordsToDisplay = [...upcomingRecords.slice(0, 3)];
      }
  
      if (recordsToDisplay.length > 3) {
        recordsToDisplay = recordsToDisplay.slice(-3);
      }
  
      // Move "wait" items to the top
      recordsToDisplay.sort((a, b) => (a.result === "wait" ? -1 : 1));
  
      setDataFor(recordsToDisplay);
    }
  }, [data, currentTime]);
  return (
    <div>
      {/* seo setup start */}
      <Helmet>
        <title></title>
        <meta
          name="description"
          content="satta-king-satta,satta-company,sattasport, satta sport, sattaking"
        />
        <meta
          name="Keywords"
          content="satta-leak, sattakingreal, satta king real, sattaking real, Satta King, Satta King live result, Satta king online result, Satta king online, Satta king result today, Gali result, Desawar result, Faridabad result, Gaziyabad result, Satta matka king, Satta Bazar, Black satta king, Satta king 2017, satta king 2018, Gali Leak Number, Gali Single Jodi, Black Satta Result, Desawar Single Jodi, Satta king up, Satta king desawar, Satta king gali, Satta king 2019 chart, Satta baba king, Satta king chart, Gali live result, Disawar live result, Satta Number, Matka Number, Satta.com, Satta Game, Gali Number, Delhi Satta king,"
        />
        <link rel="canonical" href="https://satta-leak.co/" />
      </Helmet>
      {/* seo setup end */}
      <div className="row navbaar m-0 w-100 text-center">
        <div className="col-6 nav-c p-1 border border-2 border-white text-white fw-bold">
          <a href="/"> HOME</a>
        </div>
        <div className="col-6 p-1 border border-2 border-white border-start-0 text-white fw-bold">
          <span onClick={scrollToChart}> CHART</span>
        </div>
      </div>

      <div className="text-center header p-4">
        <h1 className="fw-bold">SATTA LEAK</h1>
      </div>

      <marquee>
        ध्यान रहे :: हम यहाँ सट्टा नंबर की Guessing/भविष्यवाणी करके गेम बनाकर
        देते हैं । हमारा किसी भी कंपनी से कोई लेना देना नहीं है । आप अपनी
        समझदारी से पैसे का लेन-देन करें । सबके हित में जारी ।
      </marquee>

      <div className="leak-result text-center text-white fw-bold">
        SATTA LEAK ONLINE RESULT
      </div>

      <marquee className="fs-3 bg-white marquee">
        {" "}
        <font color="#A52A2A"> News</font> <font color="#ff7e00">Live</font>{" "}
        <font color="#03F">MORNING STAR</font> &nbsp;
        <font color="#00b63c;">»</font> &nbsp;
      </marquee>

      <div className="banner container-fluid text-center">
        <a href="/">WWW.SATTA-LEAK.CO :-</a>
        <h3 className="text-white mt-1">
          जी हाँ सबसे तेज़ और सही रिजल्ट् सिर्फ इसी साइट पे मिलेगा
        </h3>
        <h5 className="text-white">{todayDate} </h5>
        {datagame?.map((todayData, index) => (
          <div key={index} className="game">
            <h1 className="info text-info mb-0">{todayData?.gameName}</h1>{" "}
            <button type="button" className=" btn mb-5 ">
              <div className="blinking-text">{todayData?.result || ""}</div>
            </button>
          </div>
        ))}
      </div>
      <AdvertisementComponent type="odd" />
      <GameResult dayGameData={data} />
    </div>
  );
}

export default App;
