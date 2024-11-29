import { Link, useLoaderData } from "react-router-dom";
import "./App.css";
import Coffee from "./components/Coffee";


function App() {
  const coffees = useLoaderData();

  return (
    <>
      <div className="mt-40 w-11/12 mx-auto">
        <h2 className="text-center font-bold text-orange-700 text-2xl">
          Our Popular Products
        </h2>
        <div className="flex justify-center items-center">
          <Link to="/addCoffee">
            <button className="px-2 py-2 my-4 rounded-lg font-semibold bg-[#E3B577]">Add Coffee</button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {coffees.map((coffee, index) => (
            <Coffee key={index} coffee={coffee}></Coffee>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
