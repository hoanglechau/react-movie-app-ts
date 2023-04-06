import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import ListItemButton from "@mui/material/ListItemButton";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import MCard from "./MCard";

function Movies() {
  const [openGenres, setOpenGenres] = useState(false);
  const [loading, setLoading] = useState(false);
  const [genresList, setGenresList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [genreId, setGenreId] = useState("");
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  // Get genres list
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenresList(res.data.genres);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  // Get movies list by genre
  useEffect(() => {
    const fetchData = async () => {
      let url = `discover/movie?api_key=${API_KEY}&language=en-US`;
      try {
        setLoading(true);
        if (genreId) {
          const res = await apiService.get(`${url}&with_genres=${genreId}`);
          setMovieList(res.data.results);
        }
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [genreId]);

  // Get movies list by search
  useEffect(() => {
    const fetchData = async () => {
      let url = `search/movie?api_key=${API_KEY}&language=en-US`;
      try {
        setLoading(true);
        if (q) {
          // Get movies list when there's a search query
          const res = await apiService.get(`${url}&query=${q}`);
          setMovieList(res.data.results);
        } else {
          // Get movies list by default
          const res = await apiService.get(
            `discover/movie?api_key=${API_KEY}&language=en-US`
          );
          setMovieList(res.data.results);
        }
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [q]);

  const placeholder = [0, 1, 2, 3];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

  return (
    <>
      <Typography variant="h5" my={3}>
        MOVIES
      </Typography>

      <Divider />
      <Stack flexDirection="row" width="100%" justifyContent="space-between">
        <Grid container direction="row" spacing={2} mt={2}>
          {loading
            ? placeholder.map((item) => (
                <Grid key={item} item xs={10} sm={3} md={4} lg={3}>
                  {detailSkeleton}
                </Grid>
              ))
            : q
            ? movieList.map((item) => (
                <Grid key={item.id} item xs={6} sm={3} md={4} lg={3}>
                  <MCard key={item.id} item={item} />
                </Grid>
              ))
            : movieList.map((item) => (
                <Grid key={item.id} item xs={8} sm={4} md={4} lg={3}>
                  <MCard key={item.id} item={item} />
                </Grid>
              ))}
        </Grid>
        {!q && (
          <Stack minWidth="150px" width={{ xs: "10%" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end"
              }}
            >
              <ListItemButton
                alignItems="center"
                onClick={() => setOpenGenres(!openGenres)}
                sx={{
                  p: 0,
                  transition: "0.2s",
                  "&:hover": { color: "primary.main" }
                }}
              >
                <IconButton color="inherit" children={<FilterListIcon />} />
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: "medium",
                    lineHeight: "20px",
                    mb: "2px",
                    my: 0
                  }}
                >
                  Genres
                </Typography>
                <KeyboardArrowDownIcon
                  sx={{
                    mr: -1,
                    transform: openGenres ? "rotate(0deg)" : "rotate(90deg)",
                    transition: "0.2s"
                  }}
                />
              </ListItemButton>
              {openGenres &&
                genresList.map((item) => (
                  <ListItemButton
                    key={item.id}
                    onClick={() => setGenreId(item.id)}
                    disableRipple={true}
                    sx={{
                      py: 0,
                      p: 0,
                      minHeight: 40,
                      color: "inherit"
                    }}
                  >
                    <Chip
                      variant="outlined"
                      key={item.id}
                      label={item.name}
                      sx={{
                        fontSize: 12,
                        fontWeight: "bold",
                        "&:hover": {
                          color: "white",
                          backgroundColor: "primary.light",
                          cursor: "pointer"
                        }
                      }}
                    />
                  </ListItemButton>
                ))}
              <Divider sx={{ marginTop: 3 }} />
            </Box>
          </Stack>
        )}
      </Stack>
    </>
  );
}

export default Movies;
