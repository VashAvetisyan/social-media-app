"use client"

import { db } from '@/firebase'
import { closeCommentModal, openLogInModal } from '@/redux/slices/modalSlices'
import { RootState } from '@/redux/store'
import { CalendarDaysIcon, ChartBarIcon, FaceSmileIcon, MapPinIcon, PhotoIcon } from '@heroicons/react/24/outline'
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import Image from 'next/image'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface postInputProps {
	insideModal?: boolean
}

const PostInput = ({ insideModal }: postInputProps) => {
	const [text, setText] = useState('')
	const user = useSelector((state: RootState) => state.user)
	const commentDetails = useSelector((state: RootState) => state.modals.commentsPostDetails)
	const dispatch = useDispatch()

	async function sendPost() {
		if(!user.username){
			dispatch(openLogInModal())
			return
		}
		await addDoc(collection(db, "posts"), {
			text: text,
			name: user.name,
			username: user.username,
			timestamp: serverTimestamp(),
			likes: [],
			comments: []
		})

		setText('')

	}

	async function sendCommnet() {
		const postRef = doc(db, 'posts', commentDetails.id)

		await updateDoc(postRef, {
			comments: arrayUnion({
				name: user.name,
				username: user.username,
				text: text
			})
		})

		setText('')
		dispatch(closeCommentModal())
	}

	return (
		<div className='flex space-x-5 p-3 border-b border-gray-100'>
			<Image
				src={insideModal ? "/assets/profile.png" : "/assets/logo.png"}
				width={44} height={44} alt={insideModal ? "Profile" : "Logo"}
				className='w-11 h-11 z-10 bg-white'
			/>
			<div className='w-full'>
				<textarea className='resize-none outline-none w-full min-h-[50px] text-lg'
					placeholder={insideModal ? "Send your reply" : " What's happening?"}
					onChange={(event) => setText(event.target.value)} value={text} />
				<div className='flex justify-between pt-5 border-t border-gray-100'>
					<div className='flex space-x-1.5'>
						<PhotoIcon className='w-[22px] h-[22px] text-[#F4AF01]' />
						<ChartBarIcon className='w-[22px] h-[22px] text-[#F4AF01]' />
						<FaceSmileIcon className='w-[22px] h-[22px] text-[#F4AF01]' />
						<CalendarDaysIcon className='w-[22px] h-[22px] text-[#F4AF01]' />
						<MapPinIcon className='w-[22px] h-[22px] text-[#F4AF01]' />
					</div>
					<button className='bg-[#F4AF01] text-white w-[80px] h-[36px] rounded-full text-sm cursor-pointer disabled:bg-opacity-60'
						disabled={!text}
						onClick={() => insideModal ? sendCommnet() : sendPost()}>
						Post
					</button>
				</div>
			</div>
		</div>
	)
}

export default PostInput