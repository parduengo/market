import React from 'react'
import { render, screen } from '@testing-library/react'
import * as axios from 'axios'
import Publisher from './'

const account = '0x0000000000000000000000000000000000000000'

jest.mock('axios')

describe('Publisher', () => {
  test('should return correct markup by default', async () => {
    ;(axios as any).get.mockImplementationOnce(() =>
      Promise.resolve({ data: { name: 'jellymcjellyfish.eth' } })
    )

    render(<Publisher account={account} />)

    const element = await screen.findByRole('link')
    expect(element).toBeInTheDocument()
    expect(element).toContainHTML('<a')
    expect(element).toHaveAttribute('href', `/profile/${account}`)
  })

  test('should truncate account by default', async () => {
    ;(axios as any).get.mockImplementationOnce(() =>
      Promise.resolve({ data: { name: null } })
    )

    render(<Publisher account={account} />)

    const element = await screen.findByText('0x…00000000')
    expect(element).toBeInTheDocument()
  })

  test('should return correct markup in minimal state', async () => {
    ;(axios as any).get.mockImplementationOnce(() =>
      Promise.resolve({ data: { name: null } })
    )

    render(<Publisher minimal account={account} />)

    const element = await screen.findByText('0x…00000000')
    expect(element).not.toHaveAttribute('href')
  })

  test('should return markup with empty account', async () => {
    ;(axios as any).get.mockImplementationOnce(() =>
      Promise.resolve({ data: { name: null } })
    )

    render(<Publisher account={null} />)

    const element = await screen.findByRole('link')
    expect(element).toBeInTheDocument()
  })
})
