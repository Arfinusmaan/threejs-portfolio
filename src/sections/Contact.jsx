import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import Swal from "sweetalert2";

const Contact = () => {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value });
  };

  //service_f9q2omh
  //template_e8mvoet
  //sv6ysU3LrrpkwkQ7V

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: "Arfin Usmaan",
          from_email: form.email,
          to_email: "arfinusmaan008@gmail.com",
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setLoading(false);

      Swal.fire({
          title: "Message Sent!",
          text: "I'll get back to you as soon as possible.",
          icon: "success",
          background: "#0E0E10",
          color: "#ffffff",
          iconColor: "#3b82f6",
          confirmButtonColor: "#3b82f6",
          confirmButtonText: "Okay!",
        });

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);

       Swal.fire({
          title: "Oops!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          background: "#0E0E10",
          color: "#ffffff",
          iconColor: "#ef4444",
          confirmButtonColor: "#ef4444",
          confirmButtonText: "Retry",
        });

    }
  };

  return (
    <section className="c-space my-20" id="contact">
      <div className="relative min-h-screen flex flex-col justify-center items-center">
        <img
          src="/assets/terminal.png"
          alt="terminal background"
          className="absolute inset-0 min-h-screen"
        />
        <div className="contact-container">
          <h3 className="head-text">Let's talk</h3>

          <p className="text-lg text-white-600 mt-3">
            Whether you’re looking to build a new website, improve your existing
            platform, or bring a unique project to life, I’m here to help.
          </p>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="mt-12 flex flex-col space-y-7"
          >
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="field-input"
                required
                placeholder="John Doe"
              />
            </label>
            <label className="space-y-3">
              <span className="field-label">Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="field-input"
                required
                placeholder="johndoe@gmail.com"
              />
            </label>
            <label className="space-y-3">
              <span className="field-label">Full Name</span>
              <textarea
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className="field-input"
                required
                placeholder="Hi, I wanna give you a job..."
              />
            </label>

            <button className="field-btn" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}

              <img
                src="/assets/arrow-up.png"
                alt="arrow-up"
                className="field-btn_arrow"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
