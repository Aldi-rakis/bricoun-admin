//import react
import React, { useState, useEffect } from "react";

//import layout
import LayoutAdmin from "../../../layouts/Admin2";

//import js cookie
import Cookies from "js-cookie";

//import Link from react router dom
import { Link } from "react-router-dom";

//import toats
import toast from "react-hot-toast";

//import react-confirm-alert
import { confirmAlert } from "react-confirm-alert";
import { useNavigate } from 'react-router';

//import CSS react-confirm-alert
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

function UsersIndex() {
  //title page
  document.title = "Users - Administrator SIPANTAI";

  //token
  const token = Cookies.get("token");

  //state search
  const [search, setSearch] = useState("");

  //state untuk menyimpan data dari API
  const [data, setData] = useState([]);

  let navigate = useNavigate();

  function handleClick() {
    navigate('/admin/jawaban')
  }

  // Fetch data from API
  useEffect(() => {
    fetch("https://backend-bricoun.rakis.my.id/api/allAnswersByUser") // Ganti dengan URL API Anda
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData.data);
        console.log(responseData.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Fungsi untuk menentukan kesehatan mental berdasarkan total skor
  const getKesehatanMental = (total_score_terbaru) => {
    // Hitung rata-rata dengan membagi total skor dengan 7
    const rataRata = total_score_terbaru / 7;

    // Tentukan kesehatan mental berdasarkan rata-rata
    if (rataRata >= 0 && rataRata <= 1) {
      return "Normal";
    } else if (rataRata > 1 && rataRata <= 2) {
      return "Sedang";
    } else if (rataRata > 2 && rataRata <= 3) {
      return "Berat";
    }
  };


  return (
    <React.Fragment>
      <LayoutAdmin>
        <div className="row mt-4">
          <div className="col-md-12">
            <div className="card border-0 border-top-success rounded shadow-sm mb-5">
              <div className="card-header">
                <span className="font-weight-bold text-black">
                  <i className="fa fa-users"></i> DATA PENGISIAN
                </span>
              </div>
              <div className="card-body">
                <form className="form-group">
                  <div className="input-group mb-3">

                    <input
                      type="text"
                      className="form-control"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="search by user name"
                    />
                    <button type="submit" className="btn btn-md btn-success">
                      <i className="fa fa-search"></i> SEARCH
                    </button>
                  </div>
                </form>
                <div className="table-responsive">
                  <table className="table table-bordered table-striped table-hovered">
                    <thead>
                      <tr className="text-center">
                        <th scope="col">No.</th>
                        <th scope="col">Full Name</th>
                        <th scope="col">Kelas</th>
                        <th scope="col">Umur</th>
                        <th scope="col">Kesehatan Mental</th>
                        <th scope="col">Tanggal</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((user, index) => (
                        <tr key={index}>
                          <td className="text-center">{index + 1}</td>
                          <td>{user.username}</td>
                          <td>{user.kelas}</td>
                          <td>{user.umur}</td>
                          <td>{getKesehatanMental(user.total_score_terbaru)}</td>
                          <td>{user.tanggal_terakhir_pengisian}</td>
                          <td className="text-center">

                            <Link to={`/admin/jawaban/${user.user_id}`}>
                              <button className="btn btn-sm btn-primary text-white">
                                Detail
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAdmin>
    </React.Fragment>
  );
}

export default UsersIndex;
