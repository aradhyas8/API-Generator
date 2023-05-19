// LoginPage.js
import React from 'react';
import { useForm } from 'react-hook-form';

function LoginPage() {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data);
        // You would normally send a request to your backend here.
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
