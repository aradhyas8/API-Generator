import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, gql } from '@apollo/client';

const REGISTER = gql`
  mutation signUp($email: String!, $password: String!) {
    register(email: $email, password: $password) {
      token
      user {
        id
        email
      }
    }
  }
`;

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [registerUser, { data }] = useMutation(REGISTER);

  const onSubmit = (formData) => {
    registerUser({ variables: formData });
  };

  if (data) {
    console.log(data.register);
    // You can save the token to local storage or session storage here
    // Or handle redirect to another page here
  }

  return (
    <div className="p-10">
      <h1 className="text-4xl mb-4 font-bold">Register</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="block mb-1">Email</label>
        <input {...register('email', { required: 'Email is required' })} type="email" className="block mb-2 w-full" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <label htmlFor="password" className="block mb-1">Password</label>
        <input {...register('password', { required: 'Password is required' })} type="password" className="block mb-2 w-full" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
