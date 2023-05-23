import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';

// Define your GQL mutation
const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
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
  const { register, handleSubmit, errors } = useForm();
  const [signIn, { data }] = useMutation(SIGN_IN);

  const onSubmit = (data) => {
    signIn({ variables: data });
  };

  if (data) {
    console.log(data.signIn);
    // You can save the token to local storage or session storage here
    localStorage.setItem('token', data.signIn.token);
    // Or handle redirect to another page here
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-4 font-bold">Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input name="email" type="email" ref={register({ required: 'Email is required' })} className="block mb-2 w-full" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label htmlFor="password" className="block mb-1">Password</label>
        <input name="password" type="password" ref={register({ required: 'Password is required' })} className="block mb-2 w-full" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
