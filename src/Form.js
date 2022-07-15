import { useState, useEffect } from "react";
// import validator from 'validator'

const Form = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [bio, setBio] = useState("");
  const [staff, setStaff] = useState("");
  const [notification, setNotification] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [dropDownVisible, setDropDownVisible] = useState(true)

  useEffect(() => {
    const errors = [];
    if (!name.length) errors.push("Please enter your name");
    if (!email.length) errors.push("Please provide a valid email");
    // if (phone.length && !validator.isMobilePhone(phone)) errors.push("Please provide a valid phone");
    const checkPhone = () => {
      const phoneArr = phone.split("-")
      for (let i = 0; i < 10; i++) {
        if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(phoneArr[i])) return false;
      }
    }

    if (phone.length < 12 || phone.length > 12 || !checkPhone) errors.push("Please provide a valid phone");

    if (bio.length > 280) errors.push("Bio length exceeded");

    setValidationErrors(errors);
  }, [name, email, phone, bio]);

  const onSubmit = (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert("Cannot submit");

    // if(phone.length)
    console.log(phone)

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
    setValidationErrors([])
    setHasSubmitted(false);
  };

  return (
    <div>
      <h2>User Registration Form</h2>
      {hasSubmitted && validationErrors.length > 0 && (
        <div>
          The following errors were found:
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {/* {phone.length ? setDropDownVisible(false) : setDropDownVisible(true)} */}
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
            placeholder="###-###-####"
            // onChange={(e) => setPhone(e.target.value)}
            onChange={(e) => { setPhone(e.target.value); setDropDownVisible(false) }}
            value={phone}
          />
          <select
            name="phoneType"
            onChange={(e) => setPhoneType(e.target.value)}
            value={phoneType}
            disabled={dropDownVisible}
          >
            {console.log(phone)}
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
