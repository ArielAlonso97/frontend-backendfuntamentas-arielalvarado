import { useState, useEffect } from "react";
import EditandoPage from "../../components/editandoPage/EditandoPage";

export default function Boton({ valor, mensaje, setMensaje, index, libro }) {
  const [editando, setEditando] = useState(false);
  const [libroEditar, setLibroEditar] = useState({});

  useEffect(() => {
    const consulta = async () => {
      try {
        const url = `http://localhost:4000/libros/${libro.LibrosId}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        console.log("libro libro a Editar fetch", resultado);
        setLibroEditar(resultado);
      } catch (error) {
        console.error("Error en la consulta:", error);
      }
    };

    consulta();
  }, [mensaje]);

  const handleEliminar = async (e) => {
    e.preventDefault();
    console.log("Eliminando");
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar?');
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:4000/libros/${libro.LibrosId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        console.log("Respuesta:", response);
  
        if (response.ok) {
          setMensaje(
            `El libro con id:${libro.LibrosId} se eliminó correctamente.`
          );
        } else {
          setMensaje(`Error al eliminar el libro con id:${libro.LibrosId}.`);
        }
      } catch (error) {
        console.error(error);
        setMensaje("Error al conectarse al servidor.");
      }
    }
   
  };

  const handleEditar = async (e) => {
    e.preventDefault();
    console.log("editando");
    setEditando(true);
    
  };

  return (
    <>
      <button
        onClick={valor == "x" ? handleEliminar : handleEditar}
        className={valor === "editar" ? "btn btn-primary" : "btn btn-danger"}
        type="button"
      >
        {valor}
      </button>
      {/* <p>{mensaje}</p> */}
      {editando && (
        <EditandoPage
          libroEditar={libroEditar}
          setEditando={setEditando}
          index={index}
          setMensaje={setMensaje}
        />
      )}
    </>
  );
}
