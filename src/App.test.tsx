import { render, screen } from '@testing-library/react'
// Even though next line shouldn't be needed,
// as there is a type problem between vitest react-testing-library and jest
// this line solve TS no not recognise toBeInDocument to exist on expect() return type
// see https://stackoverflow.com/a/61423814
import '@testing-library/jest-dom'

import App from './App'

describe('App', () => {
    it('renders headline', () => {
        render(<App />)

        expect(screen.getByText('Wrong text')).toBeInTheDocument()
    })
})
