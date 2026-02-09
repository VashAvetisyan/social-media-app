import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	signUpModalOpen: false,
	logInModalOpen: false,
	commnetModalOpen: false,
	commentsPostDetails: {
		name: "",
		usename: "",
		id: "",
		text: ""
	}
}

const modalSlices = createSlice({
	name: "modal",
	initialState,
	reducers: {
		openSignUpModal: (state) => {
			state.signUpModalOpen = true
		},
		closeSignUpModal: (state) => {
			state.signUpModalOpen = false
		},
		openLogInModal: (state) => {
			state.logInModalOpen = true
		},
		closeLogInModal: (state) => {
			state.logInModalOpen = false
		},
		openCommentModal: (state) => {
			state.commnetModalOpen = true
		},
		closeCommentModal: (state) => {
			state.commnetModalOpen = false
		},
		setCommentDetails:(state, action) => {
			state.commentsPostDetails.name = action.payload.name
			state.commentsPostDetails.usename = action.payload.usename
			state.commentsPostDetails.id = action.payload.id
			state.commentsPostDetails.text = action.payload.text
		}
	}
});

export const { openSignUpModal, closeSignUpModal, openLogInModal, closeLogInModal, openCommentModal, closeCommentModal, setCommentDetails } = modalSlices.actions

export default modalSlices.reducer