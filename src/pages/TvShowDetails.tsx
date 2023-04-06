import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import TDetailsCard from "../components/TDetailsCard";

function TvShowDetails() {
  const { tvId } = useParams();
  const [loading, setLoading] = useState();
  const [tvShowDetails, setTvShowDetails] = useState(null);

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
      } catch (e) {
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
