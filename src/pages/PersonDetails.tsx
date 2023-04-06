import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import PDetailsCard from "../components/PDetailsCard";

function PersonDetails() {
  const { personId } = useParams();
  const [loading, setLoading] = useState(false);
  const [personDetails, setPersonDetails] = useState({
    id: 0,
    name: "",
    profile_path: "",
    birthday: "",
    deathday: "",
    place_of_birth: "",
    biography: "",
    known_for_department: ""
  });

  // Fetch person details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `person/${personId}?api_key=${API_KEY}&language=en-US`
        );
        setPersonDetails(res.data);
        setLoading(false);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [personId]);

  return (
    <>
      <PDetailsCard personDetails={personDetails} loading={loading} />
    </>
  );
}

export default PersonDetails;
