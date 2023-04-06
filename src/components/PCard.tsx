import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "../styles.css";

function PCard({ item }) {
  return (
    <Card
      className="card"
      sx={{ width: { xs: 130, md: 200 }, borderRadius: 2 }}
    >
      <CardActionArea LinkComponent={Link} to={`/person/${item.id}`}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          sx={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.profile_path})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: { xs: 200, md: 300 }
          }}
        >
          <Paper className="content-person">
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                sx={[
                  {
                    maxHeight: "30%",
                    overflow: "hidden"
                  }
                ]}
              >
                <Typography
                  color="primary.contrastText"
                  gutterBottom
                  variant="body1"
                  component="div"
                >
                  {`${item.name}`}
                </Typography>
              </Box>
            </CardContent>
          </Paper>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default PCard;
