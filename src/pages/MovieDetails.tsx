import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import MDetailsCard from "../components/MDetailsCard";

function MovieDetails() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);

  // Fetch movie details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );
        setMovieDetails(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <>
      <MDetailsCard movieDetails={movieDetails} loading={loading} />
    </>
  );
}

export default MovieDetails;
