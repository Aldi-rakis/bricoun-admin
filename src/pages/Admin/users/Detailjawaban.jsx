import React, { useState, useEffect } from 'react';
import { Container, Form, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import LayoutAdmin from "../../../layouts/Admin2";
import { useParams } from "react-router-dom";

const Questionnaire = () => {
  const [userData, setUserData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const { user_id } = useParams(); // Ambil user_id dari parameter URL

  const rata = Math.round(totalScore / 7);

  const getKesehatanMental = (rata) => {
    // Hitung rata-rata dengan membagi total skor dengan 7
    const rataRata = rata / 7;

    // Tentukan kesehatan mental berdasarkan rata-rata
    if (rataRata >= 0 && rataRata <= 1) {
      return "Normal";
    } else if (rataRata > 1 && rataRata <= 2) {
      return "Sedang";
    } else if (rataRata > 2 && rataRata <= 3) {
      return "Berat";
    }
  };
  
    // Hitung rata-rata dengan membagi total skor dengan 7
   



  useEffect(() => {
    // Mengambil data dari API
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://backend-bricoun.rakis.my.id/api/answer/${user_id}`); // Perbaiki URL API
        const data = response.data.data[0];

        setUserData(response.data.user);
        setQuestions(data.answers.map(answer => answer.question));
        setAnswers(data.answers.map(answer => answer.score));
        setTotalScore(data.total_score);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [user_id]); // Menambahkan user_id ke dalam array dependencies

  const options = [
    'Sama sekali tidak',
    'Beberapa hari',
    'Lebih dari setengah hari',
    'Hampir setiap hari',
  ];

  return (
    <React.Fragment>
      <LayoutAdmin>
        <Container>
          <h4 className="text-center text-white">Kuesioner</h4>
          {userData && (
            <Card className="mb-4">
              <Card.Body>
                <Card.Title>Informasi Pengguna</Card.Title>
                <Card.Text>
                  <strong>Nama:</strong> {userData.username} <br />
                  <strong>Kelas:</strong> {userData.kelas} <br />
                  <strong>Umur:</strong> {userData.umur} <br />
                  <strong>rata-rata:</strong> {rata} <br />
                  <strong>kesehatan mental </strong> {getKesehatanMental(rata)}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
         <Form className='card p-4 text-black' style={{ maxHeight: '500px', overflowY: 'auto' }}>
  {questions.map((question, qIndex) => (
    <Form.Group as={Row} key={qIndex} className="mb-4">
      <Form.Label as="legend" column sm={12}>
        {qIndex + 1}. {question}
      </Form.Label>
      <Col sm={12} className="t">
        {options.map((option, index) => (
          <Form.Check
            key={index}
            type="radio"
            label={option}
            name={`question-${qIndex}`}
            id={`question-${qIndex}-option-${index}`}
            checked={answers[qIndex] === index}
            disabled
            // Menonaktifkan perubahan jawaban
          />
        ))}
      </Col>
    </Form.Group>
  ))}
  <h3 className="text-center text-black">Rata-rata Score: {rata}</h3>
</Form>

        </Container>
      </LayoutAdmin>
    </React.Fragment>
  );
};

export default Questionnaire;
