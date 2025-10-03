import { render, screen } from '@testing-library/react'
import { SessionProvider } from 'next-auth/react'
import DashboardPage from '@/app/dashboard/page'

const mockSession = {
  user: {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    image: 'https://example.com/avatar.jpg'
  },
  expires: '2024-12-31'
}

describe('Dashboard Page', () => {
  it('renders greeting with user name', () => {
    render(
      <SessionProvider session={mockSession}>
        <DashboardPage />
      </SessionProvider>
    )
    
    expect(screen.getByText(/Good morning, Test User!/)).toBeInTheDocument()
  })

  it('renders quick entry cards', () => {
    render(
      <SessionProvider session={mockSession}>
        <DashboardPage />
      </SessionProvider>
    )
    
    expect(screen.getByText('DSA Problems')).toBeInTheDocument()
    expect(screen.getByText('Frontend')).toBeInTheDocument()
    expect(screen.getByText('System Design')).toBeInTheDocument()
  })

  it('renders progress charts', () => {
    render(
      <SessionProvider session={mockSession}>
        <DashboardPage />
      </SessionProvider>
    )
    
    expect(screen.getByText('Overall Progress')).toBeInTheDocument()
    expect(screen.getByText('Weekly Progress')).toBeInTheDocument()
  })
})
