import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import  { signUp } from '../features/account/accountSlice'

const SignUp = () => {
   
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        createUserWithEmailAndPassword(auth, email, password)

        .then((userAuth) => {
            navigate('/accountlogin')
            dispatch(
                signUp({
                    email: userAuth.user.email,
                    displayName: name,
                    uid: userAuth.user.uid,
                })
                
            )
          })
          .catch((error) => {
            alert(error)
          });

    }


  return (
    <form onSubmit={handleSubmit} className='max-w-[700px] mx-auto flex flex-col items-center mt-16'>
    <div className='flex flex-col space-y-5'>
        <h1 className='text-center text-3xl'>Sign Up</h1>
        <input type="text" placeholder='FullName' value={name}
        onChange={(e) => setName(e.target.value)}
        className='border-2 outline-none p-3' />
        <input type="email" placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        className='border-2 outline-none p-3' />
        <input type="password" placeholder='password'
         onChange={(e) => setPassword(e.target.value)}
         className='border-2 outline-none p-3' />
        <Link to='' className='text-xs text-blue-600 underline underline-offset-7' >Forget your password?</Link>
    </div>
    <div className='mt-4 px-16 py-4 bg-blue-500 hover:bg-blue-400 rounded-3xl'>
        <button>Sign Up</button>
    </div>
</form>
  )
}

export default SignUp