import { useState } from "react";
import styles from "./Contacto.module.css";

export const Contacto = () => {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/mdklbzyr", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.contactContainer}>
        {/* Columna izquierda */}
        <div className={styles.info}>
          <h2>Contacto</h2>
          <p>📞 3794-158714</p>
          <p>📧 zentrepuestos@gmail.com</p>
          <p>📍 Av. El Maestro, W3400 Corrientes ,Argentina </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Nombre
            <input type="text" name="nombre" required />
          </label>

          <label>
            Email
            <input type="email" name="email" required />
          </label>

          <label>
            Teléfono
            <input type="text" name="telefono" />
          </label>

          <label>
            Mensaje
            <textarea name="mensaje" required />
          </label>

          <button type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Enviando..." : "Enviar"}
          </button>

          {status === "success" && (
            <p className={styles.success}>✅ ¡Mensaje enviado con éxito!</p>
          )}
          {status === "error" && (
            <p className={styles.error}>
              ❌ Ocurrió un error, intenta otra vez.
            </p>
          )}
        </form>
      </div>
    </section>
  );
};
