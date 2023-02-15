import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";

/// NOT USED IN APP

const TestForm = () => {
  const [togglePassword, setTogglePassword] = useState(true);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    console.log(data);
  };

  const togglePasswordVisibility = () => {
    return togglePassword ? setTogglePassword(false) : setTogglePassword(true);
  };

  const dropdownNumbers = Array.from({ length: 31 }, (v, i) => i + 1);

  const range = (start, stop, step) =>
    Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

  const dropdownLetters = range("A".charCodeAt(0), "Z".charCodeAt(0), 1).map((x) =>
    String.fromCharCode(x)
  );

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="input-field-inline half">
            <input
              type="text"
              className="first-name"
              id="firstName"
              name="firstName"
              placeholder={errors.firstName ? "First Name is required" : "first Name"}
              {...register("firstName", {
                required: true,
                maxLength: { value: 30, message: "maxLength excedeed" },
              })}
            />
            <span className={errors.firstName ? "error-msg-shown" : "error-msg-hidden"}>
              {errors?.firstName?.message}
            </span>
          </div>
          <div className="input-field-inline tenth">
            <select name="selectedNumber" id="selectNumber" className="select-number dash">
              {dropdownNumbers.map((el) => (
                <option key={el} value={el}>
                  {el}
                </option>
              ))}
            </select>
            <span className="error-msg"></span>
          </div>
          <div className="input-field-inline tenth">
            <select name="selectedLetter" id="selectLetter" className="select-letter dash">
              {dropdownLetters.map((letter) => (
                <option key={letter} value={letter}>
                  {letter}
                </option>
              ))}
            </select>
          </div>

          <div className="input-field-inline thirty">
            <input
              className="dash"
              type="number"
              name="lastFourDigits"
              placeholder={errors.lastfourDigits ? "Enter 4 digits" : "Last Four Digits"}
              id="lastFourDigits"
              {...register("lastfourDigits", {
                required: true,
                minLength: { value: 4, message: "type min 4 numbers" },
                maxLength: {
                  value: 4,
                  message: "type max 4 numbers",
                },
              })}
            />
            <span className="error-msg">{errors?.lastfourDigits?.message}</span>
          </div>
        </div>
        <div className="row">
          <div className="input-field">
            <input
              type={togglePassword ? "password" : "text"}
              placeholder={errors.password ? "Password is required" : "Password"}
              className="password"
              id="password"
              name="password"
              {...register("password", {
                required: true,
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*^#?&]{8,}$/i,
                  message: "wrong password format",
                },
              })}
            />
            <span className="error-message">{errors?.password?.message}</span>
          </div>
          <span className="toggle-icon-container" onClick={togglePasswordVisibility}>
            <i className={togglePassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </span>
        </div>
        <div className="row">
          <div className="submit-btn">
            <input type="submit" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default TestForm;
