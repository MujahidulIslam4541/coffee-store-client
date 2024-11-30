import Swal from "sweetalert2";
import Navbar from "./Navbar";

const AddCoffee = () => {
  const handleAddCoffee = (event) => {
    event.preventDefault();

    const from = event.target;
    const name = from.name.value;
    const chef = from.chef.value;
    const Price = from.Price.value;
    const test = from.test.value;
    const category = from.category.value;
    const details = from.details.value;
    const photo = from.photo.value;

    const newCoffee = { name, chef, Price, test, category, details, photo };
    console.log(newCoffee);

    // data send to server
    fetch("http://localhost:5000/coffee", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            title: "success",
            text: "Coffee added successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };
  return (
    <>
    <Navbar></Navbar>
      <div className="bg-[#F4F3F0] w-8/12 mx-auto mt-20 p-20 rounded-lg">
        <h2 className="text-center font-bold text-2xl mb-10">
          Add Coffee Data
        </h2>
        <form onSubmit={handleAddCoffee}>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <label>Name</label>
              <br />
              <input
                type="text"
                name="name"
                id=""
                className="w-full py-2 px-4"
                placeholder="Coffee Name"
              />
            </div>
            <div>
              <label>Chef</label>
              <br />
              <input
                type="text"
                name="chef"
                id=""
                className="w-full py-2 px-4"
                placeholder="Mr. Matin Paul"
              />
            </div>
            <div>
              <label>Price</label>
              <br />
              <input
                type="number"
                name="Price"
                id=""
                className="w-full py-2 px-4"
                placeholder="Cappu Authorizer"
              />
            </div>
            <div>
              <label>Taste</label>
              <br />
              <input
                type="text"
                name="test"
                id=""
                className="w-full py-2 px-4"
                placeholder="Sweet and hot"
              />
            </div>
            <div>
              <label>Category</label>
              <br />
              <input
                type="text"
                name="category"
                id=""
                className="w-full py-2 px-4"
                placeholder="Americano"
              />
            </div>
            <div>
              <label>Details</label>
              <br />
              <input
                type="text"
                className="w-full py-2 px-4"
                name="details"
                id=""
                placeholder="Espresso with hot water"
              />
            </div>
            <div className=" col-span-2">
              <label>Photo</label>
              <br />
              <input
                type="text"
                name="photo"
                id=""
                className="w-full py-2 px-4"
                placeholder="https://i.ibb.co/PGqMPr9/11.png"
              />
            </div>

            <input
              type="submit"
              value="Add Coffee"
              className="w-full btn col-span-2 bg-[#D2B48C]"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddCoffee;
