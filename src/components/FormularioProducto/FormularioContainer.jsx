import { useState } from 'react';
import FormularioProducto from './FormularioProducto';

function FormularioContainer() {
  const [datosForm, setDatosForm] = useState({
    nombre: '',
    email: '',
    producto: '',
    mensaje: ''
  });

  const manejarCambio = (evento) => {
    const { name, value } = evento.target;

    setDatosForm({
      ...datosForm,
      [name]: value
    });
  };

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    console.log('Consulta enviada:', datosForm);
    alert('Consulta enviada correctamente');

    setDatosForm({
      nombre: '',
      email: '',
      producto: '',
      mensaje: ''
    });
  };

  return (
    <FormularioProducto
      datosForm={datosForm}
      manejarCambio={manejarCambio}
      manejarEnvio={manejarEnvio}
    />
  );
}

export default FormularioContainer;
