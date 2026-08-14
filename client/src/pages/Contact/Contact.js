import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "./Contact.css";
import { BsFacebook, BsGithub, BsLinkedin } from "react-icons/bs";
import { socials } from "../../utils/profile";

const SOCIAL_ICONS = {
  LinkedIn: BsLinkedin,
  GitHub: BsGithub,
  Facebook: BsFacebook,
};

const EMPTY_FORM = { name: "", email: "", msg: "", website: "" };

const Contact = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [sending, setSending] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.msg) {
      toast.error("Please provide all fields");
      return; // without this, the request went out with empty fields anyway
    }

    setSending(true);
    try {
      const res = await axios.post("/api/contact", form);

      if (res.data.success) {
        toast.success(res.data.message);
        setForm(EMPTY_FORM);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      // Previously this only console.logged, so a failed send looked like
      // nothing happened at all to the visitor.
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contact" id="contact">
      <h2 className="visually-hidden">Contact</h2>
      <div className="card card0 border-0">
        <div className="row">
          <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12">
            <div className="card1">
              <div className="row border-line">
                <img
                  src="https://img.freepik.com/free-photo/hot-line-contact-us-call-center-search-interface_53876-124009.jpg?w=600"
                  alt=""
                  className="image"
                  width="600"
                  height="400"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="card2 d-flex card border-0 px-4 py-5">
              <div className="row">
                <div className="row">
                  <h3 className="h6">
                    Contact With
                    {socials.map(({ _id, name, url, color }) => {
                      const Icon = SOCIAL_ICONS[name];
                      return (
                        <a
                          key={_id}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${name} profile`}
                        >
                          <Icon
                            color={color}
                            size={30}
                            className="ms-2"
                            aria-hidden="true"
                          />
                        </a>
                      );
                    })}
                  </h3>
                </div>

                <div className="row px-3 mb-4">
                  <div className="line" />
                  <small className="or text-center">OR</small>
                  <div className="line" />
                </div>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="row px-3">
                    <label htmlFor="contact-name" className="visually-hidden">
                      Your name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      autoComplete="name"
                      placeholder="Enter your Name"
                      className="mb-3"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="row px-3">
                    <label htmlFor="contact-email" className="visually-hidden">
                      Your email address
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Enter Your Email Address"
                      className="mb-3"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="row px-3">
                    <label htmlFor="contact-msg" className="visually-hidden">
                      Your message
                    </label>
                    <textarea
                      id="contact-msg"
                      name="msg"
                      rows={5}
                      placeholder="Write your message"
                      className="mb-3"
                      value={form.msg}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* Honeypot: hidden from people, irresistible to bots.
                      A filled value makes the API skip sending. */}
                  <div className="honeypot" aria-hidden="true">
                    <label htmlFor="contact-website">
                      Leave this field empty
                    </label>
                    <input
                      id="contact-website"
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={form.website}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="row px-3">
                    <button
                      type="submit"
                      className="button"
                      disabled={sending}
                    >
                      {sending ? "SENDING…" : "SEND MESSAGE"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
