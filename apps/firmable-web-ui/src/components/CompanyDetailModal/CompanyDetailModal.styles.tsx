import styled from 'styled-components'

export const ModalOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
`

export const ModalContent = styled.div`
	background-color: white;
	border-radius: 0.5rem;
	width: 90%;
	max-width: 800px;
	max-height: 90vh;
	overflow-y: auto;
	padding: 2rem;
	position: relative;
	color: #6b7280;
`

export const CloseModalButton = styled.button`
	position: absolute;
	top: 1rem;
	right: 1rem;
	background: none;
	border: none;
	font-size: 1.5rem;
	cursor: pointer;
	color: #6b7280;
`
