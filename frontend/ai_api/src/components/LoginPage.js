import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Link } from "react-router-dom";

// Define your GQL mutation
const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [signIn] = useMutation(SIGN_IN);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);

      const response = await signIn({
        variables: { email, password },
      });

      if (response && response.data && response.data.signIn && response.data.signIn.user) {
        console.log(response.data.signIn.user.email);
        // You can save the token to local storage or session storage here
        localStorage.setItem("token", response.data.signIn.token);
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-4 font-bold">Login</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="block mb-1">
          Email
        </label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block mb-2 w-full"
        />

        <label htmlFor="password" className="block mb-1">
          Password
        </label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block mb-2 w-full"
        />

        {error && <p>Error: {error}</p>}

        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </button>
      </form>

      {localStorage.getItem("token") && (
        <p>
          Logged in! Go to <Link to="/dashboard">Dashboard</Link>
        </p>
      )}
    </div>
  );
}

export default LoginPage;
