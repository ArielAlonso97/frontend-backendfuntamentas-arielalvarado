import { useState, useEffect } from "react";
import style from '../../pages/CatalogoLibros/CatalogoLibros.module.scss'

export default function NuevoLibro({
  mensaje,
  setMensaje
}) {
  const [titulo, setTitulo] = useState('');
  const [editorial, setEditorial] = useState('');
  const [paginas, setPaginas] = useState(0);
  const [fechaDePublicacion, setFechaPublicacion] = useState('');
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState(''); 

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

  const handleInsert = async (e) => {
    e.preventDefault();
    const confirmed = window.confirm('¿Todos los datos son corrects?');
    if (confirmed) {
      console.log(
        JSON.stringify({
          nombreAutor: nombres,
          apellidoAutor: apellidos,
          fechaDePublicacion: fechaDePublicacion,
          titulo: titulo,
          editorial: editorial,
          paginas: paginas,
        })
      );
      try {
        const response = await fetch("http://localhost:4000/libros", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nombreAutor: nombres,
            apellidoAutor: apellidos,
            fechaDePublicacion: fechaDePublicacion,
            titulo: titulo,
            editorial: editorial,
            paginas: paginas,
          }), // Los datos a insertar
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setMensaje(
            `El libro con key:${generarUniqueKey(10)} se insertó correctamente.`
          );
        } else {
          setMensaje(
            `Error al insertar el libro con key:${generarUniqueKey(10)} y.`
          );
        }
      } catch (error) {
        console.error(error);
        setMensaje("Error al conectarse al servidor.");
      }
    }
    setTitulo('')
    setEditorial('')
    setPaginas(0)
    setFechaPublicacion('')
    setNombres('')
    setApellidos('')
  };

  return (
    <div className={style.nuevoLibro}>
      
      <h1 className="text-center mt-5 mb-5">Agregar Nuevo Libro</h1>

      <form className="container-sm mb-5" onSubmit={handleInsert}>
        <h2>Información del Libro</h2>
        <div className="mb-3">
          <label htmlFor="titulo" className="form-label">
            Título
          </label>
          <input
            type="text"
            className="form-control"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
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
            value={editorial}
            onChange={(e) => setEditorial(e.target.value)}
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
            value={paginas}
            onChange={(e) => setPaginas(e.target.valueAsNumber)}
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
            value={fechaDePublicacion}
            onChange={(e) => setFechaPublicacion(e.target.value)}
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
            value={nombres}
            onChange={(e) => setNombres(e.target.value)}
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
            value={apellidos}
            onChange={(e) => setApellidos(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}
