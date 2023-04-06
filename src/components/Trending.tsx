import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MCard from "./MCard";

type Movie = {
  id: number;
  title: string;
  vote_average: number;
  vote_count: number;
  poster_path: string;
};

interface Props {
  trendingList: Movie[];
  loadingTrending: boolean;
}

function Trending({ trendingList, loadingTrending }: Props) {
  // Placeholders for loading state
  const placeholder = [0, 1, 2, 3, 4, 5];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

  return (
    <>
      <Stack
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h5" my={3}>
          TRENDING
        </Typography>
      </Stack>
      <Divider />
      <Grid
        container
        direction="row"
        wrap="nowrap"
        spacing={5}
        mt={2}
        sx={{ overflow: "auto" }}
      >
        {loadingTrending
          ? placeholder.map((item: number) => (
              <Grid key={item} item xs={6} sm={4} md={3}>
                {detailSkeleton}
              </Grid>
            ))
          : trendingList?.map((item: Movie) => (
              <Grid key={item.id} item xs={6} sm={4} md={3}>
                <MCard key={item.id} item={item} />
              </Grid>
            ))}
      </Grid>
    </>
  );
}

export default Trending;
