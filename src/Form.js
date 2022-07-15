import { useState, useEffect } from "react";
import './index.css'
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
  const [nameValidation, setNameValidation] = useState(false)
  const [emailValidation, setEmailValidation] = useState(false)


  useEffect(() => {
    const errors = [];

    if (!name.length) {
      errors.push("Please enter your name");
      setNameValidation(false)
    } else setNameValidation(true)

    if (!email.length || !email.includes('@')) {
      errors.push("Please provide a valid email");
      setEmailValidation(false)
    } else setEmailValidation(true)

    // if (phone.length && !validator.isMobilePhone(phone)) errors.push("Please provide a valid phone");
    if (phone.length) {
      if (phone.length !== 12) errors.push("Please provide a valid phone");
      else {
        const phoneParts = phone.split("-")
        const phoneNum = phoneParts.join('').split('')
        for (let i = 0; i < 10; i++) {
          if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(Number(phoneNum[i]))) errors.push("Please provide a valid phone");
          else setDropDownVisible(false)
        }
      }
    }

    if (bio.length > 280) errors.push("Bio length exceeded");
    setValidationErrors(errors);
  }, [name, email, phone, bio]);

  const onSubmit = (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (validationErrors.length) return alert("Cannot submit");

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
    setDropDownVisible(false);
    setStaff("");
    setBio("");
    setNotification(false);
    setValidationErrors([])
    setHasSubmitted(false);
  };

  return (
    <div>
      <h2>User Registration Form</h2>
      {/* errors are shown dynamically as user fills out the form */}
      {validationErrors.length > 0 && (
        <div>
          Fields highlighted in blue are required:
          <ul>
            {validationErrors.find((error) => (
              {error}
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
            className={nameValidation ? null : 'highlight'}
            onChange={(e) => setName(e.target.value)}
            value={name}
            />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            className={emailValidation ? null : 'highlight'}
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
            onChange={(e) => { setPhone(e.target.value) }}
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
