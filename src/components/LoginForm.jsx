import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { postLoginFormData } from "../service/loginApiCalls";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [togglePassword, setTogglePassword] = useState(true);

  const { checkTokenValidity } = useContext(AuthContext);

  const history = useHistory();

  const onSubmit = (data) => {
    let formData = {
      first_name: data.firstName,
      born_day: data.selectedNumber,
      first_city_letter: data.selectedletter,
      lfd: data.lastfourDigits,
      password: data.password,
    };

    postLoginFormData(formData)
      .then((response) => {
        console.log(response, "iz loginforme");
        checkTokenValidity();
        history.push("/companions");
      })
      .catch((error) => {
        console.log(error.message, "error catch");
      });
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
    <div>
      <form className="react-form container" onSubmit={handleSubmit(onSubmit)}>
        <div className="first-row-elements-container">
          <div className="firstName-container">
            <input
              type="text"
              placeholder={errors.firstName ? "First Name is required" : "first Name"}
              className={errors.firstName ? "input-invalid" : "first-name"}
              id="firstName"
              name="firstName"
              {...register("firstName", {
                required: true,
                maxLength: { value: 30, message: "Enter maximum 30 letters" },
              })}
            />
            <div className="error-message">{errors?.firstName?.message}</div>
          </div>
          <div className="selects-and-digits-container">
            <div className="select-number-container">
              <select
                name="selectedNumber"
                id="selectNumber"
                className="select-number"
                {...register("selectedNumber", { required: true })}
              >
                {dropdownNumbers.map((el) => (
                  <option key={el} value={el}>
                    {el}
                  </option>
                ))}
              </select>
            </div>
            <div className="select-letter-container">
              <select
                name="selectedLetter"
                id="selectLetter"
                className="select-letter"
                {...register("selectedletter", { required: true })}
              >
                {dropdownLetters.map((letter) => (
                  <option key={letter} value={letter}>
                    {letter}
                  </option>
                ))}
              </select>
            </div>
            <div className="four-digits-container">
              <input
                className={errors.lastfourDigits ? "last-four-digits-invalid" : "last-four-digits"}
                type="number"
                name="lastFourDigits"
                placeholder={errors.lastfourDigits ? "Enter 4 digits" : "Last Four Digits"}
                id="lastFourDigits"
                {...register("lastfourDigits", {
                  required: true,
                  minLength: { value: 4, message: "Enter min 4 digits" },
                  maxLength: {
                    value: 4,
                    message: "Enter max 4 digits",
                  },
                  pattern: {
                    value: /^\s*[+-]?(\d+|\.\d+|\d+\.\d+|\d+\.)(e[+-]?\d+)?\s*$/,
                    message: "You must Input numbers",
                  },
                })}
              />
              <div className="error-message">{errors?.lastfourDigits?.message}</div>
            </div>
          </div>
        </div>
        <div className="password-container">
          <input
            type={togglePassword ? "password" : "text"}
            placeholder={errors.password ? "Password is required" : "Password"}
            className={errors.password ? "input-invalid" : "password"}
            id="password"
            name="password"
            {...register("password", {
              required: true,
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*^#?&]{8,}$/i,
                message: "Password format is not valid",
              },
            })}
          />

          <span className="toggle-icon-container" onClick={togglePasswordVisibility}>
            <i className={togglePassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
          </span>
          <div className="error-message">{errors?.password?.message}</div>
        </div>
        <div className="submit-btn-container">
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
