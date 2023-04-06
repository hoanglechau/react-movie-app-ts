import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import TCard from "../components/TCard";

type TvShow = {
  id: number;
  name: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
};

function TopTvShows() {
  const [loading, setLoading] = useState(false);
  const [tvShowList, setTvShowList] = useState([]);
  const { pageId } = useParams();

  // Fetch popular TV shows
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `tv/top_rated?api_key=${API_KEY}&page=${pageId}&language=en-US`
        );
        setTvShowList(res.data.results);
        setLoading(false);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [pageId]);

  // Placeholders for loading state
  const placeholder = [0, 1, 2, 3, 4];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

  return (
    <>
      <Typography variant="h5" mb={2}>
        Top Rated TV Shows
      </Typography>
      <Divider />

      <Grid container direction="row" spacing={5} mt={2}>
        {loading
          ? placeholder.map((item) => (
              <Grid key={item} item xs={6} sm={4} md={3}>
                {detailSkeleton}
              </Grid>
            ))
          : tvShowList.map((item: TvShow) => (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                <TCard key={item.id} item={item} />
              </Grid>
            ))}
      </Grid>
      <Pagination
        size="large"
        count={10}
        sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/tv/popular/${item.page}`}
            {...item}
          />
        )}
      />
    </>
  );
}

export default TopTvShows;
