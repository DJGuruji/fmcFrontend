import React from "react";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <div className="dark:bg-slate-900 w-full min-h-screen flex justify-center ">
       <div className="  dark:bg-slate-900 w-full ">
      <ul>
        <li className="mt-5">
          <Link
            to="/changepass"
            className="text-blue-600 font-bold hover:bg-zinc-300 p-2  rounded-xl "
          >
            Reset Password
          </Link>
        </li>
      </ul>
      <button
        className="btn text-red-600 text-lg hover:bg-red-200 rounded-lg mt-3 p-2 "
        onClick={() => document.getElementById("my_modal_1").showModal()}
      >
        Delete Account
      </button>
      <dialog id="my_modal_1" className="modal dark:bg-slate-800 ">
        <div className="modal-box p-5 rounded-md ">
          <h3 className="font-bold text-lg text-red-600 p-5">Delete Account</h3>
          <p className="py-4">
            {" "}
            <p className="mb-4 text-zinc-800 dark:text-white">
              Are you sure you want to delete your account permanently?
            </p>
            <p className="mb-4 text-zinc-800 dark:text-white">
              Deleting your account will remove all your Posts ,videos and all
              actions
            </p>
          </p>
          <div className="modal-action flex">
            <form method="dialog">
              <button className="btn bg-blue-600 p-2 text-white rounded-md hover:rounded-xl border-2 border-blue-700 hover:bg-blue-700">
                Cancel
              </button>
            </form>
            <button className=" ml-5 bg-red-600 hover:bg-red-700 text-white rounded-md hover:rounded-xl p-2">
              <Link to="/deleteacc" className="text-center flex items-center">
                Delete Account
              </Link>
            </button>
          </div>
        </div>
      </dialog>
    </div>
    </div>
  );
};

export default Settings;
