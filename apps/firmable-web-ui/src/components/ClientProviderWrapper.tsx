'use client'

import React from 'react'
import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'

export default function ClientProviderWrapper({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<>
			<Header />
			{children}
			<Footer />
		</>
	)
}
