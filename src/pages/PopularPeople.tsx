import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import PCard from "../components/PCard";

function PopularPeople() {
  const [loading, setLoading] = useState();
  const [personList, setPersonList] = useState([]);
  const { pageId } = useParams();

  // Fetch popular people
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `person/popular?api_key=${API_KEY}&page=${pageId}&language=en-US`
        );
        setPersonList(res.data.results);
        setLoading(false);
      } catch (e) {
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
        Popular People
      </Typography>
      <Divider />

      <Grid container direction="row" spacing={5} mt={2}>
        {loading
          ? placeholder.map((item) => (
              <Grid key={item} item xs={6} sm={4} md={3}>
                {detailSkeleton}
              </Grid>
            ))
          : personList.map((item) => (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                <PCard key={item.id} item={item} />
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
            to={`/person/popular/${item.page}`}
            {...item}
          />
        )}
      />
    </>
  );
}

export default PopularPeople;
