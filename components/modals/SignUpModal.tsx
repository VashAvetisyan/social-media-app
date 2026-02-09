"use client"

import React, { useEffect, useState } from 'react'
import { Modal } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { closeSignUpModal, openSignUpModal } from '@/redux/slices/modalSlices'
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase'
import { signInUser } from '@/redux/slices/userSlice'

export default function SignUpModal() {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [showPassword, setShowPassword] = useState(false)

	const isOpen = useSelector(
		(state: RootState) => state.modals.signUpModalOpen
	)
	const dispacth: AppDispatch = useDispatch()

	async function handleSignUp() {
		const userCredentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		)

		await updateProfile(userCredentials.user, {
			displayName: name
		})

		dispacth(signInUser({
			name: userCredentials.user.displayName,
			username: userCredentials.user.email!.split("@")[0],
			email: userCredentials.user.email,
			uid: userCredentials.user.uid
		}))
	}

	async function handleGuestLogIn() {
		await signInWithEmailAndPassword(auth, "guest12345000@gmail.com", "12345678")
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (!currentUser) return

			//Handel Redux Actions
			dispacth(signInUser(
				{
					name: currentUser.displayName,
					username: currentUser.email!.split("@")[0],
					email: currentUser.email,
					uid: currentUser.uid
				}
			))
		})

		return unsubscribe
	}, [])

	return (
		<>
			<button
				className='w-full h-[48px] md:w-[88px] md:h-[40px] text-base md:text-sm font-bold bg-white rounded-full'
				onClick={() => dispacth(openSignUpModal())}
			>
				Sign up
			</button>

			<Modal open={isOpen} className='flex justify-center items-center' onClose={() => dispacth(closeSignUpModal())}>
				<div className='w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl'>
					<XMarkIcon className='w-7 mt-5 ms-5 cursor-pointer' onClick={() => dispacth(closeSignUpModal())} />
					<div className='pt-10 pb-20 px-4 sm:px-20'>
						<h1 className='text-3xl font-bold mb-10'>Create your accoont</h1>
						<div className="w-full space-y-5 mb-10">
							<input type="text" className='w-full h-[54px] border border-gray-200 outline-none pl-3 rounded-[4px] focus:border-[#F4AF01] transition' placeholder='Name' onChange={(event) => setName(event.target.value)} value={name} />
							<input type="email" className='w-full h-[54px] border border-gray-200 outline-none pl-3 rounded-[4px] focus:border-[#F4AF01] transition' placeholder='Email' onChange={(event) => setEmail(event.target.value)} value={email} />
							<div className='w-full h-[54px] border border-gray-200 outline-none  rounded-[4px] focus-within:border-[#F4AF01] transition flex items-center overflow-hidden pr-3'>
								<input type={showPassword ? "text" : "password"} placeholder='Password' className='w-full h-full ps-3 outline-none' onChange={(event) => setPassword(event.target.value)} value={password} />
								<div className='w-7 h-7 text-gray-400 cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
									{
										showPassword ? <EyeSlashIcon /> : <EyeIcon />
									}
								</div>
							</div>
						</div>
						<button className='bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md mb-5 w-full' onClick={() => handleSignUp()}>
							Sign in
						</button>
						<span className='mb-5 text-sm text-center block'>Or</span>
						<button className='bg-[#F4AF01] text-white h-[48px] rounded-full shadow-md mb-5 w-full' onClick={() => handleGuestLogIn()}>
							Login In as Guest
						</button>
					</div>
				</div>

			</Modal>
		</>
	)
}
