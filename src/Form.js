import { useState } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [bio, setBio] = useState("");
  const [staff, setStaff] = useState("");
  const [notification, setNotification] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const formObj = {
      name,
      email,
      phone,
      phoneType,
      staff,
      bio,
      notification,
      submittedOn: new Date(),
    };

    console.log(formObj);
    
    setName("");
    setEmail("");
    setPhone("");
    setPhoneType("");
    setStaff("");
    setBio("");
    setNotification(false);
  };

  return (
    <div>
      <h2>Contact Us</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            name="phone"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <select
            name="phoneType"
            onChange={(e) => setPhoneType(e.target.value)}
            value={phoneType}
          >
            <option value="" disabled>
              Select a phone type...
            </option>
            <option>Home</option>
            <option>Work</option>
            <option>Mobile</option>
          </select>
        </div>
        <div>
          <label htmlFor="instructor">Instructor</label>
          <input
            id="instructor"
            name="staff"
            type="radio"
            checked={staff === "instructor"}
            onChange={(e) => setStaff("instructor")}
            value={staff}
          />
          <label htmlFor="student">Student</label>
          <input
            id="student"
            name="staff"
            type="radio"
            checked={staff === "student"}
            onChange={(e) => setStaff("student")}
            value={staff}
          />
          <label htmlFor="both">Both</label>
          <input
            id="both"
            name="staff"
            type="radio"
            checked={staff === "both"}
            onChange={(e) => setStaff("both")}
            value={staff}
          />
        </div>

        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="notification"
            id="notification"
            checked={notification}
            onChange={(e) => setNotification(!notification)}
            value={notification}
          />
          <label htmlFor="notification">Sign up for email notifications</label>
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Form;
