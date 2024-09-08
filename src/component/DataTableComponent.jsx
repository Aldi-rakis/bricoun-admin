// DataTableComponent.jsx
import React, { useEffect, useState } from 'react';
import $ from 'jquery';
// import 'datatables.net-dt/css/jquery.dataTables.min.css';
// import 'datatables.net-responsive-dt/css/responsive.dataTables.min.css';
// import 'datatables.net/js/jquery.dataTables.min.js';
// import 'datatables.net-responsive/js/dataTables.responsive.min.js';

const DataTableComponent2 = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    fetch('https://backend-bricoun.rakis.my.id/api/allAnswersByUser') // Ganti dengan URL API Anda
      .then(response => response.json())
      .then(responseData => {
        setData(responseData.data);
        console.log(responseData.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    // Initialize DataTable when data is fetched
    if (data.length) {
      $('#example').DataTable({
        responsive: true,
        data: data.map(item => [
          item.username,
          item.kelas,
          item.umur,
          item.date,
          item.total_score,
          item.answers.map(answer => `${answer.question}: ${answer.score}`).join('; ')
        ]),
        columns: [
          { title: 'Username' },
          { title: 'Kelas' },
          { title: 'Umur' },
          { title: 'Date' },
          { title: 'Total Score' },
          { title: 'Answers' }
        ]
      }).columns.adjust().responsive.recalc();
    }
  }, [data]);

  return (
    <div className="container w-full md:w-4/5 xl:w-3/5 mx-auto px-2">
      <h1 className="flex items-center font-sans font-bold break-normal text-indigo-500 px-2 py-8 text-xl md:text-2xl">
        DataTable with API Data
      </h1>
      <div id="recipients" className="p-8 mt-6 lg:mt-0 rounded shadow bg-white">
        <table id="example" className="stripe hover" style={{ width: '100%', paddingTop: '1em', paddingBottom: '1em' }}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Kelas</th>
              <th>Umur</th>
              <th>Date</th>
              <th>Total Score</th>
              <th>Answers</th>
            </tr>
          </thead>
          <tbody>
            {/* DataTables akan mengisi data di sini */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTableComponent2;
