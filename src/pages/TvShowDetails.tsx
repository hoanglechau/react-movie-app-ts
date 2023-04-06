import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import TDetailsCard from "../components/TDetailsCard";

function TvShowDetails() {
  const { tvId } = useParams();
  const [loading, setLoading] = useState(false);
  const [tvShowDetails, setTvShowDetails] = useState({
    id: 0,
    name: "",
    poster_path: "",
    vote_average: 0,
    vote_count: 0,
    first_air_date: "",
    last_air_date: "",
    number_of_seasons: 0,
    number_of_episodes: 0,
    overview: "",
    genres: [],
    production_companies: [],
    status: ""
  });

  // Fetch TV show details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `tv/${tvId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );
        setTvShowDetails(res.data);
        setLoading(false);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [tvId]);

  return (
    <>
      <TDetailsCard tvShowDetails={tvShowDetails} loading={loading} />
    </>
  );
}

export default TvShowDetails;
