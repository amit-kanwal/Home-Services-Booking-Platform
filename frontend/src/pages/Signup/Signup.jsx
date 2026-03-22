import { Link } from "react-router-dom";
import "./Signup.css";
function Signup() {
  return (
    <>
      <div className="choose-page">
        <div className="signup-option">
          <h2>Sign Up</h2>
          <Link to="/CustomerSignup">
            <button className="btn-signup">Register as Customer</button>
          </Link>
          <Link to="/ProviderSignup">
            <button className="btn-signup">Register as Provider</button>
          </Link>
          <div className="login-text">
            <div className="account-text">
              Already have an <span>account</span>
            </div>
            <Link to="/Login">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
