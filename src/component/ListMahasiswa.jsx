import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Container, Button, Table } from "react-bootstrap";
import axios from "axios";
import { authContext } from "../store";

const api = "http://localhost:3001";

export default function ListMahasiswa() {
  const [mahasiswa, setMahasiswa] = useState([]);

  const { state, dispatch } = useContext(authContext);

  const fetchData = () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.token}`,
      },
    };

    axios
      .get(`${api}/auth/api/v1/admin/mahasiswa`, config)
      .then((res) => {
        setMahasiswa(res.data.values);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const timeout = () => {
    setTimeout(() => {
      dispatch({
        type: "LOGOUT",
      });
    }, state.tokenExpires);
  };

  useEffect(() => {
    fetchData();
    timeout();
    // eslint-disable-next-line
  }, []);

  if (!state.isAuthenticated) {
    return <Redirect to="/login" />;
  }

  return (
    <Container className="mt-3">
      <h2>Data Mahasiswa</h2>
      <hr />
      <Table bordered hover>
        <thead>
          <tr>
            <th>NIM</th>
            <th>Nama</th>
            <th>Jurusan</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {mahasiswa.map((mahasiswa) => {
            return (
              <tr key={mahasiswa.id_mahasiswa}>
                <td>{mahasiswa.nim}</td>
                <td>{mahasiswa.nama}</td>
                <td>{mahasiswa.jurusan}</td>
                <td>
                  <Button variant="secondary">Edit</Button>
                  <span> </span>
                  <Button variant="danger">Hapus</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
