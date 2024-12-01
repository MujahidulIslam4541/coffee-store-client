import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCoffee = () => {
  const updateCoffee = useLoaderData();
  const { _id, name, chef, price, photo, category, test, details } =
    updateCoffee;

  const handleUpdateCoffee = (event) => {
    event.preventDefault();

    const from = event.target;
    const name = from.name.value;
    const chef = from.chef.value;
    // const price = from.price.value;
    const test = from.test.value;
    const category = from.category.value;
    const details = from.details.value;
    const photo = from.photo.value;

    const UpdateCoffee = { name, chef, price, test, category, details, photo };
    console.log(UpdateCoffee);

    // data send to server
    fetch(`https://coffe-store-server-seven-smoky.vercel.app/coffee/${_id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(UpdateCoffee),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            title: "success",
            text: "Update Coffee successfully",
            icon: "success",
            confirmButtonText: "Cool",
          });
        }
      });
  };

  return (
    <div>
      <div className="bg-[#F4F3F0] w-8/12 mx-auto mt-20 p-20 rounded-lg">
        <h2 className="text-center font-bold text-2xl mb-10">Update Coffee</h2>
        <form onSubmit={handleUpdateCoffee}>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <label>Name</label>
              <br />
              <input
                type="text"
                name="name"
                id=""
                defaultValue={name}
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
                defaultValue={chef}
                className="w-full py-2 px-4"
                placeholder="Mr. Matin Paul"
              />
            </div>
            {/* <div>
              <label>Price</label>
              <br />
              <input
                type="text"
                name="Price"
                id=""
                defaultValue={price}
                className="w-full py-2 px-4"
                placeholder="Enter your Price"
              />
            </div> */}
            <div>
              <label>Taste</label>
              <br />
              <input
                type="text"
                name="test"
                id=""
                defaultValue={test}
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
                defaultValue={category}
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
                defaultValue={details}
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
                defaultValue={photo}
                className="w-full py-2 px-4"
                placeholder="https://i.ibb.co/PGqMPr9/11.png"
              />
            </div>

            <input
              type="submit"
              value="Update Coffee"
              className="w-full btn col-span-2 bg-[#D2B48C]"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCoffee;
