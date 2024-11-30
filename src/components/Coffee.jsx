import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";


const Coffee = ({ coffee, coffees, setCoffees }) => {
  const { _id, name, chef, price, photo, category, test } = coffee;

  const handleDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const reaming = coffees.filter((cof) => cof._id !== _id);
              setCoffees(reaming);
            }
          });
      }
    });
  };

  return (
    <>
      <div className="card card-side border-2 shadow-xl bg-[#F5F4F1]">
        <figure>
          <img src={photo} alt="Movie" />
        </figure>
        <div className="flex justify-between w-full px-10 ">
          <div>
            <h2 className="card-title">Name: {name}</h2>
            <p>
              <span className="font-semibold ">Chef:</span> {chef}
            </p>
            <p>
              <span className="font-semibold ">Category:</span> {category}
            </p>
            <p>
              <span className="font-semibold ">Test:</span> {test}
            </p>
            <p>
              <span className="font-semibold ">Price:</span> {price}$
            </p>
          </div>

          <div className="flex flex-col justify-around text-xl">
            <button>
              <FaEye />
            </button>
            <Link to={`/updateCoffee/${_id}`}>
              <button>
                <FaEdit />
              </button>
            </Link>
            <button onClick={() => handleDelete(_id)}>
              <MdDelete />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Coffee;
