import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CardHome({ text, comp ,value}) {
  return (
    <Card sx={{ minWidth: 200, maxWidth: 200,maxHeight:250 ,minHeight:200}}>
      <CardContent
        sx={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FontAwesomeIcon icon={comp} size="2xl" className=""/>
        <hr/>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {text}
        </Typography>
        <Typography sx={{ fontSize: 35 }} color="text.primary" gutterBottom>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}
CardHome.propTypes = {
  text: PropTypes.string.isRequired,
  comp: PropTypes.object.isRequired,
  value:PropTypes.number.isRequired
};
export default CardHome;
