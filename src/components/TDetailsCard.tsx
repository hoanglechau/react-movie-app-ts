import FavoriteIcon from "@mui/icons-material/Favorite";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import RecommendIcon from "@mui/icons-material/Recommend";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { dateConvert } from "../utils/converters";

interface Props {
  tvShowDetails: {
    id: number;
    name: string;
    poster_path: string;
    vote_average: number;
    vote_count: number;
    first_air_date: string;
    last_air_date: string;
    number_of_seasons: number;
    number_of_episodes: number;
    overview: string;
    genres: { id: number; name: string }[];
    production_companies: { id: number; name: string }[];
    status: string;
  };
  loading: boolean;
}

type TvShow = {
  id: number;
  name: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

function TDetailsCard({ tvShowDetails, loading }: Props) {
  const [tvShowMessage, setTvShowMessage] = useState<string>("");
  // This is for the conditional rendering of the favorite button
  const auth = useAuth();

  const addFavoriteTvShow = (
    name: string,
    poster: string,
    voteAverage: number,
    voteCount: number,
    id: number
  ) => {
    let list: TvShow[] = JSON.parse(
      localStorage.getItem("favoriteTvShows") || "[]"
    );
    if (list) {
      let itemId = [];
      for (const element of list) {
        itemId.push(element.id);
      }
      if (itemId.includes(tvShowDetails.id)) {
        setTvShowMessage("Already Added!");
      } else {
        list.push({
          id: id,
          name: name,
          poster_path: poster,
          vote_average: voteAverage,
          vote_count: voteCount
        });
        localStorage.setItem("favoriteTvShows", JSON.stringify(list));
        setTvShowMessage("Added!");
      }
    } else {
      localStorage.setItem("favoriteTvShows", JSON.stringify([]));
      list = JSON.parse(localStorage.getItem("favoriteTvShows") || "[]");
      list.push({
        id: id,
        name: name,
        poster_path: poster,
        vote_average: voteAverage,
        vote_count: voteCount
      });
      localStorage.setItem("favoriteTvShows", JSON.stringify(list));
      setTvShowMessage("Added!");
    }
  };
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

  return (
    <>
      {loading ? (
        detailSkeleton
      ) : tvShowDetails ? (
        <Stack
          maxWidth="100%"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems={{ xs: "center", md: "flex-start" }}
          sx={{
            borderRadius: "10px",
            margin: "auto"
          }}
        >
          <Stack
            my={3}
            sx={{
              borderRadius: "10px",
              minWidth: { xs: "100%", md: 350 }
            }}
          >
            <Box>
              <CardMedia
                component="img"
                alt={`${tvShowDetails.name}`}
                src={`https://www.themoviedb.org/t/p/original/${tvShowDetails.poster_path}`}
                sx={{
                  borderRadius: 5,
                  height: { xs: "auto", md: 500 }
                }}
              />
            </Box>
          </Stack>

          <Stack
            pl={{ xs: 0, md: 3 }}
            maxWidth="100%"
            justifyContent="space-evenly"
          >
            <Stack
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row"
              minHeight="100px"
            >
              <Typography mb={1} sx={{ typography: { xs: "h4", md: "h3" } }}>
                {`${tvShowDetails.name}`}
              </Typography>
              {auth.user && (
                <Stack flexDirection="column" alignItems="end">
                  <IconButton
                    onClick={() =>
                      addFavoriteTvShow(
                        tvShowDetails.name,
                        tvShowDetails.poster_path,
                        tvShowDetails.vote_average,
                        tvShowDetails.vote_count,
                        tvShowDetails.id
                      )
                    }
                    size="large"
                    children={<LoyaltyIcon fontSize="large" />}
                    color="primary"
                  />
                  <Typography color="error" variant="caption">
                    {tvShowMessage}
                  </Typography>
                </Stack>
              )}
            </Stack>

            <Stack my={{ xs: 2, md: 0 }}>
              <Typography sx={{ typography: { xs: "h5", md: "h6" } }}>
                Overview
              </Typography>
              <Typography variant="body1">{`${tvShowDetails.overview}`}</Typography>
            </Stack>

            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
            >
              <Typography mr={1} variant="caption">
                Genres
              </Typography>
              {tvShowDetails.genres.map((item) => (
                <Chip
                  key={`${item.id}`}
                  label={`${item.name}`}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Stack>
            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
              flexWrap="wrap"
            >
              <Typography mr={1} variant="caption">
                Companies
              </Typography>
              {tvShowDetails.production_companies.map((item) => (
                <Chip
                  key={`${item.id}`}
                  label={`${item.name}`}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Stack>
            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
              flexWrap="wrap"
            >
              <Typography mr={1} variant="caption">
                Status
              </Typography>
              <Chip
                label={`${tvShowDetails.status}`}
                size="small"
                variant="outlined"
              />
            </Stack>
            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
            >
              <Typography mr={1} variant="caption">
                First Air
              </Typography>
              <Chip
                label={`${dateConvert(tvShowDetails.first_air_date)}`}
                size="small"
                variant="outlined"
              />
              {tvShowDetails.last_air_date && (
                <>
                  <Typography mr={1} variant="caption">
                    &nbsp;&nbsp;&nbsp;Last Air
                  </Typography>
                  <Chip
                    label={`${dateConvert(tvShowDetails.last_air_date)}`}
                    size="small"
                    variant="outlined"
                  />
                </>
              )}
            </Stack>
            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
            >
              <Typography mr={1} variant="caption">
                Episodes
              </Typography>
              <Chip
                label={`${tvShowDetails.number_of_episodes}`}
                size="small"
                variant="outlined"
              />
            </Stack>

            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
            >
              <Typography mr={1} variant="caption">
                Seasons
              </Typography>
              <Chip
                label={`${tvShowDetails.number_of_seasons}`}
                size="small"
                variant="outlined"
              />
            </Stack>

            <Stack flexDirection="row" justifyContent="flex-start" mt={1}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                mr={3}
              >
                <RecommendIcon className="recommend_icon" fontSize="small" />
                <Typography variant="subtitle2" ml={1}>
                  {`${tvShowDetails.vote_count}`}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" justifyContent="center">
                <FavoriteIcon className="favorite_icon" fontSize="small" />
                <Typography variant="subtitle2" ml={1}>
                  {`${tvShowDetails.vote_average}`}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Typography variant="h4" m={5}>
          TV Show not found!
        </Typography>
      )}
      <Divider />
    </>
  );
}

export default TDetailsCard;
