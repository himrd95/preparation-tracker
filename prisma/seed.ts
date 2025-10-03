import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🚀 Starting database seed...')
  
  try {
    // Test connection
    await prisma.$connect()
    console.log('✅ Connected to database successfully')
  } catch (error) {
    console.error('❌ Failed to connect to database:', error)
    console.log('Please check your DATABASE_URL in .env.local')
    process.exit(1)
  }

  // Create a demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
    },
  })

  console.log('✅ Created demo user:', demoUser.email)

  // Create comprehensive DSA question bank
  console.log('📝 Creating comprehensive DSA question bank...')
  const dsaQuestions = [
    // Arrays
    {
      title: 'Two Sum',
      link: 'https://leetcode.com/problems/two-sum/',
      topic: 'Arrays',
      difficulty: 'EASY' as const,
      expertise: 'BEGINNER' as const,
    },
    {
      title: 'Best Time to Buy and Sell Stock',
      link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
      topic: 'Arrays',
      difficulty: 'EASY' as const,
      expertise: 'BEGINNER' as const,
    },
    {
      title: 'Maximum Subarray',
      link: 'https://leetcode.com/problems/maximum-subarray/',
      topic: 'Arrays',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Container With Most Water',
      link: 'https://leetcode.com/problems/container-with-most-water/',
      topic: 'Arrays',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: '3Sum',
      link: 'https://leetcode.com/problems/3sum/',
      topic: 'Arrays',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Product of Array Except Self',
      link: 'https://leetcode.com/problems/product-of-array-except-self/',
      topic: 'Arrays',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Rotate Array',
      link: 'https://leetcode.com/problems/rotate-array/',
      topic: 'Arrays',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Find Minimum in Rotated Sorted Array',
      link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
      topic: 'Arrays',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },

    // Strings
    {
      title: 'Valid Parentheses',
      link: 'https://leetcode.com/problems/valid-parentheses/',
      topic: 'Strings',
      difficulty: 'EASY' as const,
      expertise: 'BEGINNER' as const,
    },
    {
      title: 'Longest Substring Without Repeating Characters',
      link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
      topic: 'Strings',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Longest Palindromic Substring',
      link: 'https://leetcode.com/problems/longest-palindromic-substring/',
      topic: 'Strings',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Valid Anagram',
      link: 'https://leetcode.com/problems/valid-anagram/',
      topic: 'Strings',
      difficulty: 'EASY' as const,
      expertise: 'BEGINNER' as const,
    },
    {
      title: 'Group Anagrams',
      link: 'https://leetcode.com/problems/group-anagrams/',
      topic: 'Strings',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Longest Common Prefix',
      link: 'https://leetcode.com/problems/longest-common-prefix/',
      topic: 'Strings',
      difficulty: 'EASY' as const,
      expertise: 'BEGINNER' as const,
    },

    // Linked Lists
    {
      title: 'Reverse Linked List',
      link: 'https://leetcode.com/problems/reverse-linked-list/',
      topic: 'Linked Lists',
      difficulty: 'EASY' as const,
      expertise: 'BEGINNER' as const,
    },
    {
      title: 'Merge Two Sorted Lists',
      link: 'https://leetcode.com/problems/merge-two-sorted-lists/',
      topic: 'Linked Lists',
      difficulty: 'EASY' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Linked List Cycle',
      link: 'https://leetcode.com/problems/linked-list-cycle/',
      topic: 'Linked Lists',
      difficulty: 'EASY' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Remove Nth Node From End of List',
      link: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
      topic: 'Linked Lists',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Copy List with Random Pointer',
      link: 'https://leetcode.com/problems/copy-list-with-random-pointer/',
      topic: 'Linked Lists',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },

    // Stacks & Queues
    {
      title: 'Min Stack',
      link: 'https://leetcode.com/problems/min-stack/',
      topic: 'Stacks',
      difficulty: 'EASY' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Evaluate Reverse Polish Notation',
      link: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/',
      topic: 'Stacks',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Daily Temperatures',
      link: 'https://leetcode.com/problems/daily-temperatures/',
      topic: 'Stacks',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Largest Rectangle in Histogram',
      link: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
      topic: 'Stacks',
      difficulty: 'HARD' as const,
      expertise: 'EXPERT' as const,
    },

    // Trees
    {
      title: 'Binary Tree Inorder Traversal',
      link: 'https://leetcode.com/problems/binary-tree-inorder-traversal/',
      topic: 'Trees',
      difficulty: 'EASY' as const,
      expertise: 'BEGINNER' as const,
    },
    {
      title: 'Maximum Depth of Binary Tree',
      link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
      topic: 'Trees',
      difficulty: 'EASY' as const,
      expertise: 'BEGINNER' as const,
    },
    {
      title: 'Same Tree',
      link: 'https://leetcode.com/problems/same-tree/',
      topic: 'Trees',
      difficulty: 'EASY' as const,
      expertise: 'BEGINNER' as const,
    },
    {
      title: 'Symmetric Tree',
      link: 'https://leetcode.com/problems/symmetric-tree/',
      topic: 'Trees',
      difficulty: 'EASY' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Binary Tree Level Order Traversal',
      link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
      topic: 'Trees',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Validate Binary Search Tree',
      link: 'https://leetcode.com/problems/validate-binary-search-tree/',
      topic: 'Trees',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Lowest Common Ancestor of a Binary Search Tree',
      link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
      topic: 'Trees',
      difficulty: 'EASY' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Serialize and Deserialize Binary Tree',
      link: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
      topic: 'Trees',
      difficulty: 'HARD' as const,
      expertise: 'EXPERT' as const,
    },

    // Graphs
    {
      title: 'Number of Islands',
      link: 'https://leetcode.com/problems/number-of-islands/',
      topic: 'Graphs',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Course Schedule',
      link: 'https://leetcode.com/problems/course-schedule/',
      topic: 'Graphs',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Word Ladder',
      link: 'https://leetcode.com/problems/word-ladder/',
      topic: 'Graphs',
      difficulty: 'HARD' as const,
      expertise: 'EXPERT' as const,
    },
    {
      title: 'Clone Graph',
      link: 'https://leetcode.com/problems/clone-graph/',
      topic: 'Graphs',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },

    // Dynamic Programming
    {
      title: 'Climbing Stairs',
      link: 'https://leetcode.com/problems/climbing-stairs/',
      topic: 'Dynamic Programming',
      difficulty: 'EASY' as const,
      expertise: 'BEGINNER' as const,
    },
    {
      title: 'House Robber',
      link: 'https://leetcode.com/problems/house-robber/',
      topic: 'Dynamic Programming',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Coin Change',
      link: 'https://leetcode.com/problems/coin-change/',
      topic: 'Dynamic Programming',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Longest Increasing Subsequence',
      link: 'https://leetcode.com/problems/longest-increasing-subsequence/',
      topic: 'Dynamic Programming',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Edit Distance',
      link: 'https://leetcode.com/problems/edit-distance/',
      topic: 'Dynamic Programming',
      difficulty: 'HARD' as const,
      expertise: 'EXPERT' as const,
    },
    {
      title: 'Word Break',
      link: 'https://leetcode.com/problems/word-break/',
      topic: 'Dynamic Programming',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },

    // Sorting & Searching
    {
      title: 'Binary Search',
      link: 'https://leetcode.com/problems/binary-search/',
      topic: 'Searching',
      difficulty: 'EASY' as const,
      expertise: 'BEGINNER' as const,
    },
    {
      title: 'Search in Rotated Sorted Array',
      link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
      topic: 'Searching',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Find First and Last Position of Element in Sorted Array',
      link: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/',
      topic: 'Searching',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Merge Intervals',
      link: 'https://leetcode.com/problems/merge-intervals/',
      topic: 'Sorting',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Meeting Rooms II',
      link: 'https://leetcode.com/problems/meeting-rooms-ii/',
      topic: 'Sorting',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },

    // Hash Tables
    {
      title: 'Subarray Sum Equals K',
      link: 'https://leetcode.com/problems/subarray-sum-equals-k/',
      topic: 'Hash Tables',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },

    // Greedy
    {
      title: 'Jump Game',
      link: 'https://leetcode.com/problems/jump-game/',
      topic: 'Greedy',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Gas Station',
      link: 'https://leetcode.com/problems/gas-station/',
      topic: 'Greedy',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },

    // Backtracking
    {
      title: 'Generate Parentheses',
      link: 'https://leetcode.com/problems/generate-parentheses/',
      topic: 'Backtracking',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'N-Queens',
      link: 'https://leetcode.com/problems/n-queens/',
      topic: 'Backtracking',
      difficulty: 'HARD' as const,
      expertise: 'EXPERT' as const,
    },
    {
      title: 'Subsets',
      link: 'https://leetcode.com/problems/subsets/',
      topic: 'Backtracking',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },

    // Sliding Window
    {
      title: 'Minimum Window Substring',
      link: 'https://leetcode.com/problems/minimum-window-substring/',
      topic: 'Sliding Window',
      difficulty: 'HARD' as const,
      expertise: 'EXPERT' as const,
    },

    // Math
    {
      title: 'Pow(x, n)',
      link: 'https://leetcode.com/problems/powx-n/',
      topic: 'Math',
      difficulty: 'MEDIUM' as const,
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Sqrt(x)',
      link: 'https://leetcode.com/problems/sqrtx/',
      topic: 'Math',
      difficulty: 'EASY' as const,
      expertise: 'INTERMEDIATE' as const,
    }
  ]

  const questionIds = []
  for (const question of dsaQuestions) {
    const result = await prisma.question.create({
      data: {
        ...question,
        userId: demoUser.id,
      },
    })
    questionIds.push(result.id)
  }
  console.log(`✅ Created ${dsaQuestions.length} DSA questions in shared question bank`)

  // Create demo user progress for some questions
  console.log('📊 Creating demo user progress...')
  const userProgress = [
    {
      userId: demoUser.id,
      questionId: questionIds[0], // Two Sum
      status: 'DONE' as const,
      notes: 'Solved using a hash map.',
      solvedAt: new Date(),
    },
    {
      userId: demoUser.id,
      questionId: questionIds[8], // Valid Parentheses
      status: 'DONE' as const,
      notes: 'Used a stack to match parentheses.',
      solvedAt: new Date(),
    },
    {
      userId: demoUser.id,
      questionId: questionIds[15], // Merge Two Sorted Lists
      status: 'IN_PROGRESS' as const,
      notes: 'Working on iterative solution.',
    },
    {
      userId: demoUser.id,
      questionId: questionIds[9], // Longest Substring
      status: 'TODO' as const,
    },
    {
      userId: demoUser.id,
      questionId: questionIds[20], // Binary Tree Inorder
      status: 'TODO' as const,
    },
    {
      userId: demoUser.id,
      questionId: questionIds[3], // Container With Most Water
      status: 'TODO' as const,
    }
  ]

  for (const progress of userProgress) {
    await prisma.questionProgress.upsert({
      where: {
        userId_questionId: {
          userId: progress.userId,
          questionId: progress.questionId,
        },
      },
      update: {},
      create: progress,
    })
  }
  console.log('✅ Demo user progress created')

  // Create shared project bank
  console.log('🛠️ Creating shared project bank...')
  const projects = [
    {
      title: 'E-commerce Platform',
      description: 'Build a full-stack e-commerce application with user authentication, product catalog, shopping cart, and payment integration.',
      repoLink: 'https://github.com/example/ecommerce',
      liveDemo: null,
      complexity: 'ADVANCED' as const,
      techStack: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe', 'TailwindCSS'],
    },
    {
      title: 'Personal Portfolio',
      description: 'Create a responsive personal portfolio website showcasing projects, skills, and experience.',
      repoLink: 'https://github.com/example/portfolio',
      liveDemo: 'https://example.com/portfolio',
      complexity: 'BEGINNER' as const,
      techStack: ['React', 'TailwindCSS', 'Framer Motion', 'Vercel'],
    },
    {
      title: 'Real-time Chat App',
      description: 'Develop a real-time chat application using WebSockets with features like group chats, file sharing, and message history.',
      repoLink: null,
      liveDemo: null,
      complexity: 'INTERMEDIATE' as const,
      techStack: ['Next.js', 'Socket.io', 'Redis', 'PostgreSQL', 'Prisma'],
    },
    {
      title: 'Task Management App',
      description: 'Create a collaborative task management application with drag-and-drop functionality, team collaboration, and progress tracking.',
      repoLink: null,
      liveDemo: null,
      complexity: 'INTERMEDIATE' as const,
      techStack: ['React', 'Express', 'PostgreSQL', 'Socket.io', 'React DnD'],
    },
    {
      title: 'Weather Dashboard',
      description: 'Build a weather dashboard with location-based forecasts, interactive maps, and weather alerts.',
      repoLink: null,
      liveDemo: null,
      complexity: 'BEGINNER' as const,
      techStack: ['React', 'OpenWeather API', 'Chart.js', 'Geolocation API'],
    },
    {
      title: 'Social Media Analytics',
      description: 'Create a social media analytics platform with data visualization, engagement metrics, and reporting features.',
      repoLink: null,
      liveDemo: null,
      complexity: 'ADVANCED' as const,
      techStack: ['Next.js', 'D3.js', 'Python', 'FastAPI', 'PostgreSQL', 'Redis'],
    }
  ]

  const projectIds = []
  for (const project of projects) {
    const result = await prisma.projectBank.upsert({
      where: { title: project.title },
      update: {},
      create: project,
    })
    projectIds.push(result.id)
  }
  console.log('✅ Shared project bank created')

  // Create demo user progress for projects
  console.log('📈 Creating demo project progress...')
  const projectProgress = [
    {
      userId: demoUser.id,
      projectId: projectIds[0], // E-commerce Platform
      status: 'COMPLETED' as const,
      notes: 'Implemented user authentication, product catalog, shopping cart, and payment gateway.',
    },
    {
      userId: demoUser.id,
      projectId: projectIds[1], // Personal Portfolio
      status: 'IN_PROGRESS' as const,
      notes: 'Designed and developed the landing page and about section. Need to add projects and contact form.',
    },
    {
      userId: demoUser.id,
      projectId: projectIds[2], // Real-time Chat App
      status: 'PLANNED' as const,
      notes: 'Planning the architecture and tech stack. Will start with basic chat functionality.',
    }
  ]

  for (const progress of projectProgress) {
    await prisma.projectProgress.upsert({
      where: {
        userId_projectId: {
          userId: progress.userId,
          projectId: progress.projectId,
        },
      },
      update: {},
      create: progress,
    })
  }
  console.log('✅ Demo project progress created')

  // Create shared system design bank
  console.log('🏗️ Creating shared system design bank...')
  const systemDesigns = [
    {
      title: 'Design Twitter',
      description: 'Design a scalable Twitter-like social media platform with features like tweets, follows, timeline generation, and real-time updates.',
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Design Netflix',
      description: 'Design a video streaming service like Netflix with content delivery, recommendation systems, and global scalability.',
      expertise: 'EXPERT' as const,
    },
    {
      title: 'Design URL Shortener',
      description: 'Design a URL shortening service like Bitly with analytics, custom URLs, and high availability.',
      expertise: 'BEGINNER' as const,
    },
    {
      title: 'Design WhatsApp',
      description: 'Design a real-time messaging application like WhatsApp with end-to-end encryption, group chats, and media sharing.',
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Design Uber',
      description: 'Design a ride-sharing service like Uber with real-time matching, location tracking, and payment processing.',
      expertise: 'EXPERT' as const,
    },
    {
      title: 'Design Instagram',
      description: 'Design a photo-sharing social media platform like Instagram with image processing, stories, and discovery features.',
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Design Dropbox',
      description: 'Design a cloud storage service like Dropbox with file synchronization, version control, and collaboration features.',
      expertise: 'INTERMEDIATE' as const,
    },
    {
      title: 'Design Slack',
      description: 'Design a team communication platform like Slack with channels, direct messages, file sharing, and integrations.',
      expertise: 'INTERMEDIATE' as const,
    }
  ]

  const systemDesignIds = []
  for (const systemDesign of systemDesigns) {
    const result = await prisma.systemDesignBank.upsert({
      where: { title: systemDesign.title },
      update: {},
      create: systemDesign,
    })
    systemDesignIds.push(result.id)
  }
  console.log('✅ Shared system design bank created')

  // Create demo user progress for system designs
  console.log('📋 Creating demo system design progress...')
  const systemDesignProgress = [
    {
      userId: demoUser.id,
      systemDesignId: systemDesignIds[0], // Design Twitter
      status: 'IN_PROGRESS' as const,
      notes: 'Considered feed generation, user services, and data storage. Need to refine scaling strategies.',
    },
    {
      userId: demoUser.id,
      systemDesignId: systemDesignIds[1], // Design Netflix
      status: 'TODO' as const,
      notes: 'Focus on content delivery network (CDN), video encoding, and recommendation system.',
    },
    {
      userId: demoUser.id,
      systemDesignId: systemDesignIds[2], // Design URL Shortener
      status: 'TODO' as const,
      notes: 'Basic design for generating short URLs and redirection. Need to add analytics and custom URLs.',
    }
  ]

  for (const progress of systemDesignProgress) {
    await prisma.systemDesignProgress.upsert({
      where: {
        userId_systemDesignId: {
          userId: progress.userId,
          systemDesignId: progress.systemDesignId,
        },
      },
      update: {},
      create: progress,
    })
  }
  console.log('✅ Demo system design progress created')

  console.log('🎉 Database seeded successfully!')
  console.log('📊 Summary:')
  console.log(`   - Users: ${await prisma.user.count()}`)
  console.log(`   - Question Bank: ${await prisma.questionBank.count()}`)
  console.log(`   - Question Progress: ${await prisma.questionProgress.count()}`)
  console.log(`   - Project Bank: ${await prisma.projectBank.count()}`)
  console.log(`   - Project Progress: ${await prisma.projectProgress.count()}`)
  console.log(`   - System Design Bank: ${await prisma.systemDesignBank.count()}`)
  console.log(`   - System Design Progress: ${await prisma.systemDesignProgress.count()}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })