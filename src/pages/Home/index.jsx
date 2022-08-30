import "./style.scss";
import React, { useState, useEffect } from "react";
import { Card } from "../../components/Card";

export function Home() {
  const [studentName, setStudentName] = useState("eduardonowa");
  const [students, setStudents] = useState([]);
  const [spanText, setSpanText] = useState([]);
  const [user, setUser] = useState({ name: "", avatar: "" });

  function handleAddStudent() {
    if (!studentName) {
      setSpanText("Empty Name");
    } else {
      setSpanText("");
      const newStudent = {
        name: studentName,
        time: new Date().toLocaleTimeString("pt-br", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }),
      };

      document.getElementById("nameInput").value = "";
      // setStudents([...students, newStudent]);
      setStudents((prevState) => [...prevState, newStudent]);
      // setStudentName("");
    }
  }

  useEffect(() => {
    // Fazendo a requisição de forma assíncrona
    // async function fetchData() {
    //   const response = await fetch(`https://api.github.com/users/${studentName}`)
    //   const data = await response.json()
    //   setUser({
    //     name: data.name,
    //     avatar: data.avatar_url,
    //   });
    // }

    // fetchData()

    // corpo do useEffect
    fetch(`https://api.github.com/users/${studentName}`)
      .then((response) => response.json())
      .then((data) => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        });
        console.log(data);
      });
  }, [students]);

  return (
    <div className="home-container">
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil" />
        </div>
      </header>
      <input
        type="text"
        placeholder="Digite o nome..."
        onChange={(e) => setStudentName(e.target.value)}
        id="nameInput"
      />
      <button onClick={handleAddStudent}>Adicionar</button>
      <span className="span" id="spanName">
        {spanText}
      </span>

      {students.map((student) => (
        <Card key={student.time} name={student.name} time={student.time} />
      ))}
    </div>
  );
}
