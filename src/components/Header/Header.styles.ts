import styled from '@emotion/styled'

export const Header = styled.header`
		background: linear-gradient(135deg, var(--dark) 0%, salmon 100%);
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
		position: relative;
		z-index: 10;
		width: 100vw;
		min-width: 100%;
		height: 88px;
		border-bottom: 1px solid pink;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
`
		export const Container  = styled.div`
            margin: 0 auto;
        `
		export const HeaderContent  = styled.div`
            display: flex;
						flex-flow: row nowrap;
            align-items: center;
						justify-content: space-around;
	`
