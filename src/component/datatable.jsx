import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';

const DataTableComponent = () => {
    const [data, setData] = useState([]);

    // Fetch data from API
    useEffect(() => {
        fetch('https://backend-bricoun.rakis.my.id/api/allAnswersByUser') // Ganti dengan URL API Anda
            .then(response => response.json())
            .then(responseData => {
                setData(responseData.data);
                console.log(responseData.data);
// Inisialisasi DataTable setelah data di-load
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Hapus DataTable saat komponen di-unmount untuk menghindari kebocoran memori
    

    return (
        <div className="  rounded shadow bg-black">
            <table  className="table table-striped" style={{ width: '100%' }}>
                <thead>
                <tr>
                        <th style={{ textAlign: 'left' }}>no</th>
                        <th style={{ textAlign: 'left' }}>Username</th>
                        <th style={{ textAlign: 'left' }}>Kelas</th>
                        <th style={{ textAlign: 'left' }}>Umur</th>
                     
                       
                        <th style={{ textAlign: 'left' }}>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                              <td style={{ textAlign: 'left' }}>{index + 1}</td>
                            <td style={{ textAlign: 'left' }}>{item.username}</td>
                            <td style={{ textAlign: 'left' }}>{item.kelas}</td>
                            <td style={{ textAlign: 'left' }}>{item.umur}</td>
                          
                            
                            <td style={{ textAlign: 'left' }}>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleDetailClick(item)}>
                                    Lihat Detail
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Fungsi untuk menangani klik tombol "Lihat Detail"
const handleDetailClick = (item) => {
    // Misalnya menampilkan jawaban dalam modal
    const answers = item.answers.map((answer, idx) => (
        <div key={idx}>
            <strong>{answer.question}</strong>: {answer.score}
        </div>
    ));
    
    // Contoh, menampilkan jawaban di dalam console
    console.log('Jawaban untuk:', item.username);
    console.log(answers);
};

export default DataTableComponent;
