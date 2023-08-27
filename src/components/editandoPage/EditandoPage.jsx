import React from "react";
import style from "./EditandoPage.module.css";
import { useState, useEffect } from "react";

const EditandoPage = ({ index, setEditando, libroEditar, setMensaje }) => {
  const [libroEdicionTitulo, setLibroEdicionTitulo] = useState("");
  const [libroEdicionEditorial, setLibroEdicionEditorial] = useState("");
  const [libroEdicionPaginas, setLibroEdicionPaginas] = useState(0);
  const [libroEdicionFechaDePublicacion, setlibroEdicionFechaDePublicacion] =
    useState("");
  const [libroEdicionNombres, setlibroEdicionNombres] = useState("");
  const [libroEdicionApellidos, setlibroEdicionApellidos] = useState("");

  useEffect(() => {
    if (libroEditar.length > 0) {
      const libro = libroEditar[0];
      setLibroEdicionTitulo(libro.titulo);
      setLibroEdicionEditorial(libro.editorial);
      setLibroEdicionPaginas(libro.paginas);
      setlibroEdicionFechaDePublicacion(libro.fechaDePublicacion);
      setlibroEdicionNombres(libro.autor.nombre);
      setlibroEdicionApellidos(libro.autor.apellidos);
    }
  }, [libroEditar]);

  function generarUniqueKey(length) {
    const caracteres =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      result += caracteres.charAt(randomIndex);
    }
    return result;
  }

  // Generar una clave única de 10 caracteres
  const uniqueKey = generarUniqueKey(10);

  const libro = libroEditar[0];
  const handleEditar = async (e) => {
    e.preventDefault();
    
    console.log("Libro");
    try {
      const response = await fetch(
        `http://localhost:4000/libros/${libro.LibrosId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombreAutor: libroEdicionNombres,
            apellidoAutor: libroEdicionApellidos,
            fechaDePublicacion: libroEdicionFechaDePublicacion,
            titulo: libroEdicionTitulo,
            editorial: libroEdicionEditorial,
            paginas: libroEdicionPaginas,
          }), // Los datos a actualizar
        }
      );

      console.log("Respuesta:", response);

      if (response.ok) {
        setMensaje(`El libro con id:${uniqueKey} se editó correctamente.`);
      } else {
        setMensaje(`Error al editar el libro con id:${uniqueKey}.`);
      }
    } catch (error) {
      console.error(error);
      setMensaje("Error al conectarse al servidor.");
    }
    setEditando(false);
    setLibroEdicionTitulo("");
    setLibroEdicionEditorial("");
    setLibroEdicionPaginas(0);
    setlibroEdicionFechaDePublicacion("");
    setlibroEdicionNombres("");
    setlibroEdicionApellidos("");
  };

  const handleCerrar = () => {
    console.log("cerrando editando");
    setEditando(false);
  };

  return (
    <div className={`${style.mainContainer} `}>
      <h1 className="text-center mt-5 mb-5">Editando Libro #{index + 1}</h1>
      <form
        className="container-sm mb-3 d-flex flex-column justify-content-center w-50"
        onSubmit={handleEditar}
      >
        <h2>Información del Libro</h2>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título
          </label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={libroEdicionTitulo}
            onChange={(e) => setLibroEdicionTitulo(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="editorial" className="form-label">
            Editorial
          </label>
          <input
            type="text"
            className="form-control"
            id="editorial"
            value={libroEdicionEditorial}
            onChange={(e) => setLibroEdicionEditorial(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="paginas" className="form-label">
            Número de páginas
          </label>
          <input
            type="number"
            className="form-control"
            id="paginas"
            value={libroEdicionPaginas}
            onChange={(e) => setLibroEdicionPaginas(e.target.valueAsNumber)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fechaDePublicacion" className="form-label">
            Fecha de Publicación
          </label>
          <input
            type="date"
            className="form-control"
            id="fechaDePublicacion"
            value={libroEdicionFechaDePublicacion}
            onChange={(e) => setlibroEdicionFechaDePublicacion(e.target.value)}
          />
        </div>
        <h2>Autor</h2>
        <div className="mb-3">
          <label htmlFor="nombres" className="form-label">
            Nombres
          </label>
          <input
            type="text"
            className="form-control"
            id="nombres"
            value={libroEdicionNombres}
            onChange={(e) => setlibroEdicionNombres(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="apellidos" className="form-label">
            Apellidos
          </label>
          <input
            type="text"
            className="form-control"
            id="apellidos"
            value={libroEdicionApellidos}
            onChange={(e) => setlibroEdicionApellidos(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-lg btn-primary mx-auto ">
          Actualizar
        </button>
      </form>
      <div className="d-flex">
        <button
          className=" btn btn-lg btn-danger mx-auto  "
          onClick={handleCerrar}
        >
          Dejar de Editar
        </button>
      </div>
    </div>
  );
};

export default EditandoPage;
