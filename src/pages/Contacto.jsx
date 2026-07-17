function Contacto() {
  return (
    <section className="section contacto">
      <h2>Contacto</h2>
      <p>Escribinos para consultar por productos, talles o disponibilidad.</p>
      <form className="contact-form" onSubmit={(e) => { e.preventDefault(); alert('Gracias por tu consulta.'); }}>
        <label>Nombre</label><input required placeholder="Tu nombre" />
        <label>Email</label><input type="email" required placeholder="tu@email.com" />
        <label>Mensaje</label><textarea required placeholder="Escribí tu consulta" />
        <button className="btn">Enviar consulta</button>
      </form>
    </section>
  );
}

export default Contacto;
