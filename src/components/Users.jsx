import React, { useState } from "react";
import Navbar from "./Navbar";
import { useLoaderData } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";

const Users = () => {
  const loadedUsers = useLoaderData();
  const [users, setUsers] = useState(loadedUsers);

  const handleDelete = (id) => {
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
        // delete data from database
        fetch(`https://coffe-store-server-seven-smoky.vercel.app/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log("deleted data from database", data);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            const reamingUsers = users.filter((user) => user._id !== id);
            setUsers(reamingUsers);
          });
      }
    });
    console.log(id);
  };

  return (
    <div>
      <Navbar></Navbar>
      <h2 className="text-2xl">Users: {users.length}</h2>

      <div className="overflow-x-auto w-11/12 mx-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>CreationTime</th>
              <th>LastLoginTime</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user) => (
              <tr key={user._id}>
                <th>1</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.creationTime}</td>
                <td>{user.lastSignInTime}</td>
                
                <td className="flex gap-2 text-xl">
                  <button>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(user._id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
