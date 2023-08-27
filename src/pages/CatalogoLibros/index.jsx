import React, { useState, useEffect } from "react";
import Boton from "../../components/Boton/Boton";
import style from "./CatalogoLibros.module.scss";
import NuevoLibro from "../../components/NuevoLibro/NuevoLibro";

export default function CatalogoLibros() {
  const [editando, setEditando] = useState(false);
  const [libros, setLibros] = useState([]);
  const [mensaje, setMensaje] = useState("");

  const [titulo, setTitulo] = useState("");
  const [editorial, setEditorial] = useState("");
  const [paginas, setPaginas] = useState(0);
  const [fechaDePublicacion, setFechaPublicacion] = useState("");
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");

  useEffect(() => {
    const consulta = async () => {
      try {
        const url = "http://localhost:4000/libros";
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        console.log(resultado);
        setLibros(resultado);
      } catch (error) {
        console.error("Error en la consulta:", error);
      }
    };

    consulta();
  }, [mensaje]);

  return (
    <main className="mt-5 container-xl d-flex gap-5">
      

      <div className={style.tablecontainer}>
      <h1 className="text-dark text-center container padding text-uppercase">
        Catálogo de Libros
      </h1>
        <table className="table table-dark table-striped rounded">
          <thead>
            <tr>
              <th className={style.thelement} scope="col">
                #
              </th>
              <th className={style.thelement} scope="col">
                Título
              </th>
              <th className={style.thelement} scope="col">
                Editorial
              </th>
              <th className={style.thelement} scope="col">
                No de Páginas
              </th>
              <th className={style.thelement} scope="col">
                Fecha
              </th>
              <th className={style.thelement} scope="col">
                Autor
              </th>
              <th className={style.thelement} scope="col">
                Editar
              </th>
              <th className={style.thelement} scope="col">
                Borrar
              </th>
            </tr>
          </thead>
          <tbody>
            {libros.map((libro, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{libro.titulo}</td>
                <td>{libro.editorial}</td>
                <td>{libro.paginas}</td>
                <td>{libro.fechaDePublicacion}</td>
                <td>
                  {libro.autor
                    ? libro.autor.nombre + " " + libro.autor.apellidos
                    : ""}
                </td>
                <td>
                  <Boton
                    mensaje={mensaje}
                    setMensaje={setMensaje}
                    libro={libro}
                    index={index}
                    className="btn btn-primary"
                    valor="editar"
                  ></Boton>
                </td>
                <td>
                  <Boton
                    mensaje={mensaje}
                    setMensaje={setMensaje}
                    libro={libro}
                    index={index}
                    className="btn btn-primary"
                    valor="x"
                  ></Boton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <NuevoLibro  mensaje={mensaje} setMensaje={setMensaje} />
    </main>
  );
}
