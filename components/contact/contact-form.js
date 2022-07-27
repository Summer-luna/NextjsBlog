import classes from "./contact-form.module.css";
import { useEffect, useState } from "react";
import Notification from "../ui/notification";

const sendContactData = async (contactDetails) => {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message) || "Something went wrong!";
  }
};

const ContactForm = () => {
  const [messageDetails, setMessageDetails] = useState({
    email: "",
    name: "",
    message: "",
  });
  const [requestStatus, setRequestStatus] = useState(); //'pending', 'success', 'error'
  const [requestError, setRequestError] = useState(); // handle request error

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  const sendMessageHandler = async (e) => {
    e.preventDefault();
    setRequestStatus("pending");
    try {
      await sendContactData(messageDetails);
      setRequestStatus("success");
      setMessageDetails({ email: "", name: "", message: "" });
    } catch (err) {
      setRequestError(err.message);
      setRequestStatus("error");
    }
  };

  const messageChangeHandler = (e) => {
    const { name, value } = e.target;
    //console.log(value);
    setMessageDetails((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  let notification;
  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message...",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message sent successfully",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error!",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={messageDetails.email}
              onChange={messageChangeHandler}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={messageDetails.name}
              onChange={messageChangeHandler}
            />
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows="5"
            name="message"
            required
            value={messageDetails.message}
            onChange={messageChangeHandler}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && <Notification notification={notification} />}
    </section>
  );
};

export default ContactForm;
