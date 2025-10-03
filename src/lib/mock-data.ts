// Mock data for development when database is not connected
export const mockQuestions = [
  {
    id: '1',
    title: 'Two Sum',
    link: 'https://leetcode.com/problems/two-sum/',
    status: 'DONE',
    expertise: 'BEGINNER',
    topic: 'Arrays',
    difficulty: 'EASY',
    notes: 'Classic hashmap problem',
    solvedAt: new Date('2024-01-15'),
    userId: 'mock-user'
  },
  {
    id: '2',
    title: 'Valid Parentheses',
    link: 'https://leetcode.com/problems/valid-parentheses/',
    status: 'IN_PROGRESS',
    expertise: 'BEGINNER',
    topic: 'Stacks',
    difficulty: 'EASY',
    notes: 'Working on stack implementation',
    solvedAt: null,
    userId: 'mock-user'
  },
  {
    id: '3',
    title: 'Binary Tree Level Order Traversal',
    link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    status: 'TODO',
    expertise: 'INTERMEDIATE',
    topic: 'Trees',
    difficulty: 'MEDIUM',
    notes: '',
    solvedAt: null,
    userId: 'mock-user'
  }
]

export const mockProjects = [
  {
    id: '1',
    title: 'Personal Portfolio',
    description: 'A modern portfolio website built with Next.js and Tailwind CSS',
    repoLink: 'https://github.com/user/portfolio',
    liveDemo: 'https://portfolio.vercel.app',
    status: 'COMPLETED',
    complexity: 'BEGINNER',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    notes: 'Successfully deployed on Vercel',
    userId: 'mock-user'
  },
  {
    id: '2',
    title: 'E-commerce Dashboard',
    description: 'Admin dashboard for managing products and orders',
    repoLink: 'https://github.com/user/ecommerce-dashboard',
    liveDemo: 'https://dashboard.vercel.app',
    status: 'IN_PROGRESS',
    complexity: 'INTERMEDIATE',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    notes: 'Working on authentication system',
    userId: 'mock-user'
  }
]

export const mockSystemDesigns = [
  {
    id: '1',
    title: 'Design a Scalable Feed System',
    description: 'Design a system like Twitter or Instagram feed that can handle millions of users',
    status: 'DONE',
    expertise: 'INTERMEDIATE',
    notes: 'Key components: User service, Post service, Timeline service, Cache layer (Redis), Database sharding',
    userId: 'mock-user'
  },
  {
    id: '2',
    title: 'Design a URL Shortener',
    description: 'Design a system like bit.ly that can shorten URLs and handle high traffic',
    status: 'IN_PROGRESS',
    expertise: 'BEGINNER',
    notes: 'Working on the database design and hash generation algorithm',
    userId: 'mock-user'
  }
]
