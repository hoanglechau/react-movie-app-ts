import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import MCard from "../components/MCard";
import TCard from "../components/TCard";

function Favorites() {
  const movieList = JSON.parse(localStorage.getItem("favoriteMovies"));
  const TvShowList = JSON.parse(localStorage.getItem("favoriteTvShows"));

  return (
    <>
      {!movieList && !TvShowList && (
        <Typography variant="h5" mb={2} mt={10}>
          You don't have any favorites yet!
        </Typography>
      )}
      {movieList && (
        <>
          <Typography variant="h5" mb={2}>
            FAVORITE MOVIES
          </Typography>
          <Divider />
          <Grid container direction="row" spacing={5} mt={2}>
            {movieList?.map((item) => (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                <MCard key={item.id} item={item} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {TvShowList && (
        <>
          <Typography variant="h5" mb={2} mt={10}>
            FAVORITE TV SHOWS
          </Typography>
          <Divider />
          <Grid container direction="row" spacing={5} mt={2}>
            {TvShowList?.map((item) => (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                <TCard key={item.id} item={item} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default Favorites;
