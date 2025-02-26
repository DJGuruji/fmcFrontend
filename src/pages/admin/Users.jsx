import React, { useEffect, useState } from "react";
import axios from "../../axios";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const Users = () => {
  const { user } = useAuthStore();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Response from backend:", response.data);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          toast.error("Unexpected Response");
          console.error("Unexpected response format:", response.data);
        }
        setLoading(false);
      } catch (error) {
        toast.error("Error Fetching Users");
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.mobile.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.job.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.officePlace.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.office.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const deleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.delete(`admin/deleteuser/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        toast.success("User Deleted");

        console.log("Response from backend:", response.data);
        setUsers(users.filter((user) => user._id !== userId));
      } catch (error) {
        toast.error("User Deleting Failed");
        console.error("Error deleting user:", error);
      }
    }
  };

  const promoteUser = async (userId, role) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `admin/promoteuser/${userId}`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message);
      console.log("Response from backend:", response.data);
      // Update the user role locally
      setUsers(
        users.map((user) => {
          if (user._id === userId) {
            return { ...user, role };
          }
          return user;
        })
      );
    } catch (error) {
      toast.error("Error Promoting User Role");
      console.error("Error promoting user role:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-slate-900">
        <div
          className="w-8 h-8 border-4 dark:border-gray-200 border-blue-800 border-t-transparent rounded-full animate-spin"
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  const isAdmin = user && user.role === "admin";

  return (
    <div className="dark:bg-slate-900 min-h-screen">
      <h1 className="text-center text-zinc-800 dark:text-white mb-4 text-xl">All Users </h1>

      <div className="mb-4">
        <label className="text-xl text-zinc-500 dark:text-white ">Filter </label>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by name or email or role..."
          className="md:w-1/4 dark:text-white lg:w-1/4 xl:w-1/4 w-full dark:bg-slate-800  border-2 border-blue-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-slate-800 dark:text-white">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Mobile</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Profession</th>
                <th className="px-4 py-2">State</th>
                <th className="px-4 py-2">District</th>
                <th className="px-4 py-2">Office</th>
                <th className="px-4 py-2">Address</th>
                {isAdmin && (
                  <>
                    <th className="px-4 py-2">Actions</th>
                    <th className="px-4 py-2">Promote Role To</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t">
                 <td className="px-4 py-2">
                    <Link
                      to={`/profile/${user._id}`}
                      className="text-blue-600 dark:text-blue-300 hover:underline"
                    >
                    
                    <span className="flex flex-col  items-center">
                    {user.photo?   <img
                        src={user.photo}
                        alt=""
                        className="mx-auto w-12 h-12 rounded-full object-cover mb-4 cursor-pointer"
                      
                      /> : ""}
                      {user.name}
                    </span>
                 
                    </Link>
                  </td>
                  <td className="px-4 py-2">{user.role}</td>
                  <td className="px-4 py-2">{user.mobile}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.job}</td>
                  <td className="px-4 py-2">{user.state}</td>
                  <td className="px-4 py-2">{user.district}</td>
                  <td className="px-4 py-2">{user.office}</td>
                  <td className="px-4 py-2">{user.officePlace}</td>
                  {isAdmin && (
                    <>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="border-2 border-red-800 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md hover:rounded-xl"
                        >
                          Delete
                        </button>
                      </td>

                      <td className="px-4 py-2 flex flex-col ">
                        {user.role != "admin" && (
                          <button
                            onClick={() => promoteUser(user._id, "admin")}
                            className="border-2 border-green-600 bg-green-500 hover:bg-green-600 text-white  px-3 py-1 m-1 rounded-md hover:rounded-xl"
                          >
                            Admin
                          </button>
                        )}
                        {user.role != "staff" && (
                          <button
                            onClick={() => promoteUser(user._id, "staff")}
                            className="border-2 border-blue-700 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md m-1 hover:rounded-xl"
                          >
                            staff
                          </button>
                        )}
                        {user.role != "user" && (
                          <button
                            onClick={() => promoteUser(user._id, "user")}
                            className="border-2 border-yellow-500 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-md m-1 hover:rounded-xl"
                          >
                            User
                          </button>
                        )}
                        {user.role != "block" && (
                          <button
                            onClick={() => promoteUser(user._id, "block")}
                            className="border-2 border-black bg-black hover:bg-gray-900 text-white px-4 py-1 rounded-md m-1 hover:rounded-xl"
                          >
                            Block
                          </button>
                        )}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
