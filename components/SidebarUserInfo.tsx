'use client'

import Image from 'next/image'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { signOutUser } from '@/redux/slices/userSlice'
import { AppDispatch, RootState } from '@/redux/store'
import { closeLogInModal, closeSignUpModal } from '@/redux/slices/modalSlices'

const SidebarUserInfo = () => {
	const dispacth: AppDispatch = useDispatch()
	const user = useSelector((state: RootState) => state.user)
	console.log(user.name)

	async function handleSignUp() {
		await signOut(auth)

		dispacth(signOutUser())

		dispacth(closeSignUpModal())
		dispacth(closeLogInModal())
	}

	return (
		<>
			{
				user.name &&
				<div className='mt-auto flex items-center space-x-2 hover:bg-gray-500 hover:bg-opacity-10 xl:p-3 xl:pe-6 rounded-full transition cursor-pointer w-fit xl:w-[240px] justify-start translate-x-[25%] xl:translate-x-0' onClick={() => handleSignUp()}>
					<Image src={'/assets/profile.png'} width={36} height={36} alt='profile' className='w-9 h-9' />
					<div className='hidden xl:flex flex-col text-sm max-w-40'>
						<span className='whitespace-nowrap text-ellipsis overflow-hidden font-bold'>{user.name}</span>
						<span className='whitespace-nowrap text-ellipsis overflow-hidden text-gray-500'>@{user.username}</span>
					</div>
				</div>
			}
		</>
	)
}

export default SidebarUserInfo