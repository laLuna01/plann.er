import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import CreateTripPage from "./pages/create-trip";
import TripDetailsPage from "./pages/trip-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage></CreateTripPage>,
  }, 
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage></TripDetailsPage>,
  },
]);

function App() {
  return <RouterProvider router={router} />
}

export default App
