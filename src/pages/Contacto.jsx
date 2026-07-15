function Contacto() {
  const enviar = (e) => {
    e.preventDefault();
    alert('Mensaje enviado. Gracias por contactarte con ViNieve.');
    e.target.reset();
  };

  return (
    <section className="contacto-section">
      <h2>Contáctanos</h2>
      <p>¿Necesitás asesoramiento sobre qué equipo elegir? ¡Escribinos!</p>
      <form className="formulario-contacto" onSubmit={enviar}>
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Tu nombre" required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="tucorreo@email.com" required />
        </div>
        <div className="form-group">
          <label>Mensaje</label>
          <textarea placeholder="Tu mensaje..." required></textarea>
        </div>
        <button className="btn-enviar" type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default Contacto;
