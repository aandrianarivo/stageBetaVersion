import CardHome from "../../components/Card/CardHome";
import { faClipboardCheck } from "@fortawesome/free-solid-svg-icons";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

import BasicPie from "../../components/Chart/BasicPie";
function HomeUser() {
  return (
    <div className="container-fluid">
      <div className="container-fluid d-flex flex-column">
        <div className="d-flex justify-content-between">
          <CardHome comp={faClipboardCheck} text="Approved" value={10} />
          <CardHome comp={faHourglass} text="IN PROGRESS" value={6} />
          <CardHome comp={faCoins} text="Total" value={16} />
        </div>
        <div className="d-flex justify-content-center">
        <div className="d-flex justify-content-center align-items-center">
            <div>
              <h5>Most requested products :</h5>
            </div>
          </div>
          <BasicPie />
        </div>
      </div>
    </div>
  );
}

export default HomeUser;
