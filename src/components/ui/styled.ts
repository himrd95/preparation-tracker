import styled from 'styled-components'

export const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.1);
    
    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
    }
  }
`

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  background: hsl(var(--background) / 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid hsl(var(--border));
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: hsl(var(--foreground));

  @media (prefers-color-scheme: dark) {
    background: hsl(var(--background) / 0.9);
  }
`

export const SidebarContainer = styled.aside<{ $isOpen: boolean }>`
  position: fixed;
  left: 0;
  top: 64px;
  bottom: 0;
  width: 280px;
  background: hsl(var(--card) / 0.8);
  backdrop-filter: blur(20px);
  border-right: 1px solid hsl(var(--border));
  padding: 24px 0;
  overflow-y: auto;
  z-index: 1000;
  transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  transition: transform 0.3s ease-in-out;
  color: hsl(var(--card-foreground));

  @media (prefers-color-scheme: dark) {
    background: hsl(var(--card) / 0.9);
  }

  @media (max-width: 768px) {
    width: 100%;
    transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
  }
`

export const SidebarOverlay = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 999;
  opacity: ${props => props.$isOpen ? '1' : '0'};
  visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
  transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

  @media (min-width: 769px) {
    display: none;
  }
`

export const MainContent = styled.main<{ $sidebarOpen: boolean }>`
  margin-top: 64px;
  padding: 24px;
  min-height: calc(100vh - 64px);
  transition: margin-left 0.3s ease-in-out;

  @media (min-width: 769px) {
    margin-left: ${props => props.$sidebarOpen ? '280px' : '0'};
  }
`

export const Card = styled.div`
  background: hsl(var(--card));
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid hsl(var(--border));
  transition: all 0.2s ease;
  color: hsl(var(--card-foreground));

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
  }

  @media (prefers-color-scheme: dark) {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
    
    &:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }
  }
`

export const Button = styled.button<{ $variant?: 'primary' | 'secondary' | 'ghost' }>`
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  border: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  line-height: 1.5;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ $variant = 'primary' }) => {
    switch ($variant) {
      case 'primary':
        return `
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          
          &:hover:not(:disabled) {
            background: hsl(var(--primary) / 0.9);
          }
        `
      case 'secondary':
        return `
          background: hsl(var(--secondary));
          color: hsl(var(--secondary-foreground));
          
          &:hover:not(:disabled) {
            background: hsl(var(--secondary) / 0.8);
          }
        `
      case 'ghost':
        return `
          background: transparent;
          color: hsl(var(--foreground));
          
          &:hover:not(:disabled) {
            background: hsl(var(--accent));
          }
        `
    }
  }}
`

export const Input = styled.input`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: hsl(var(--ring));
    box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
  }

  &::placeholder {
    color: hsl(var(--muted-foreground));
  }
`

export const Select = styled.select`
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid hsl(var(--border));
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  font-size: 14px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: hsl(var(--ring));
    box-shadow: 0 0 0 2px hsl(var(--ring) / 0.2);
  }
`

// Keyframe animations for quote widget
const fadeInUp = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

const fadeOutDown = `
  @keyframes fadeOutDown {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
`

const expandWidget = `
  @keyframes expandWidget {
    from {
      width: 3rem;
      height: 3rem;
      padding: 0.75rem;
    }
    to {
      width: 20rem;
      height: 7.5rem;
      padding: 1rem;
    }
  }
`

const collapseWidget = `
  @keyframes collapseWidget {
    from {
      width: 20rem;
      height: 7.5rem;
      padding: 1rem;
    }
    to {
      width: 3rem;
      height: 3rem;
      padding: 0.75rem;
    }
  }
`

export const QuoteWidgetContainer = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 50;
  animation-fill-mode: both;
`

export const QuoteWidgetCard = styled.div<{ $isExpanded: boolean }>`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  
  ${expandWidget}
  ${collapseWidget}
  
  animation: ${props => props.$isExpanded ? 'expandWidget 0.4s ease-in-out' : 'collapseWidget 0.4s ease-in-out'};
  animation-fill-mode: both;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    border-color: rgba(255, 255, 255, 0.3);
  }

  @media (prefers-color-scheme: dark) {
    background: rgba(0, 0, 0, 0.2);
    border-color: rgba(255, 255, 255, 0.1);
    
    &:hover {
      border-color: rgba(255, 255, 255, 0.2);
    }
  }
`

export const Content = styled.div<{ $isExpanded: boolean }>`
  ${fadeInUp}
  ${fadeOutDown}

  animation: ${props => props.$isExpanded ? 'fadeInUp 0.4s ease-out' : 'fadeOutDown 0.4s ease-out'};
  animation-fill-mode: both;
  animation-delay: ${props => props.$isExpanded ? '0.3s' : '0s'};

  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  align-items: flex-start;
`