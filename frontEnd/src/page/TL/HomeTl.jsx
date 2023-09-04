import CardHome from "../../components/Card/CardHome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

// import SimpleCharts from "../../components/Chart/SimpleCharts";

function HomeTl() {
  return (
    <div className="container-fluid">
      <div>
        <div className="d-flex justify-content-between">
          <CardHome comp={faClipboardCheck} text="Approved" value={2} />
          <CardHome comp={faHourglass} text="IN PROGRESS" value={3} />
          <CardHome comp={faCoins} text="Total" value={13}/>
        </div>
        <div className="container-fluid">
          {/* <SimpleCharts /> */}
        </div>
      </div>
    </div>
  );
}

export default HomeTl;
