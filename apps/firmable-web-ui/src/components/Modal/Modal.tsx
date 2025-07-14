'use client'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const ModalOverlay = styled.div`
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
`

const ModalContainer = styled.div`
	background-color: #2d2d2d;
	border: 1px solid var(--neon-blue);
	border-radius: 8px;
	padding: 24px;
	max-width: 400px;
	width: 100%;
`

const ModalTitle = styled.h3`
	font-size: 1.125rem;
	color: var(--neon-blue);
	margin-bottom: 16px;
`

const ButtonContainer = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 8px;
`

const ModalButton = styled.button`
	background-color: #2d2d2d;
	border: 1px solid;
	border-radius: 9999px;
	padding: 8px 16px;
	cursor: pointer;
`

const CancelButton = styled(ModalButton)`
	border-color: var(--neon-blue);
	color: var(--neon-blue);
`

const LoadButton = styled(ModalButton)`
	border-color: var(--neon-pink);
	color: var(--neon-pink);
`

const Modal: React.FC = () => {
	const [visible, setVisible] = useState<boolean>(false)

	const handleCancel = () => {
		console.log('Modal cancelled')
		setVisible(false)
	}

	const handleConfirm = () => {
		setVisible(false)
		// Here you would typically handle the loading of the sample
		// For example, you might dispatch an action or call a function to load the sample
	}

	useEffect(() => {
		const openModal = () => setVisible(true)
		window.addEventListener('openSampleModal', openModal)
		return () => window.removeEventListener('openSampleModal', openModal)
	}, [])

	if (!visible) return null

	return (
		<ModalOverlay>
			<ModalContainer>
				<ModalTitle>Load Sample</ModalTitle>
				<ButtonContainer>
					<CancelButton onClick={handleCancel}>Cancel</CancelButton>
					<LoadButton onClick={handleConfirm}>Load</LoadButton>
				</ButtonContainer>
			</ModalContainer>
		</ModalOverlay>
	)
}

export default Modal
