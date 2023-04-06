import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import MainLayout from "../layouts/MainLayout";
import Favorites from "../pages/Favorites";
import Home from "../pages/Home";
import LoginForm from "../pages/LoginForm";
import MovieDetails from "../pages/MovieDetails";
import NoMatch from "../pages/NoMatch";
import PersonDetails from "../pages/PersonDetails";
import TopMovies from "../pages/TopMovies";
import PopularPeople from "../pages/PopularPeople";
import TopTvShows from "../pages/TopTvShows";
import TvShowDetails from "../pages/TvShowDetails";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

// This component is used to protect the /favorite route
function RequireAuth({ children }: Props): JSX.Element {
  const location = useLocation();
  const auth = useAuth();

  if (!auth.user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children as JSX.Element;
}

// This component is used to render the routes
function Router() {
  const location = useLocation();
  const state = location.state;

  return (
    <>
      <Routes location={state?.backgroundLocation || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movie/popular/:pageId" element={<TopMovies />} />
          <Route path="movie/:movieId" element={<MovieDetails />} />
          <Route path="tv/popular/:pageId" element={<TopTvShows />} />
          <Route path="tv/:tvId" element={<TvShowDetails />} />
          <Route path="person/popular/:pageId" element={<PopularPeople />} />
          <Route path="person/:personId" element={<PersonDetails />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="*" element={<NoMatch />} />
          <Route
            path="/favorite"
            element={
              <RequireAuth>
                <Favorites />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
      {state?.backgroundLocation && (
        <Routes>
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      )}
    </>
  );
}

export default Router;
