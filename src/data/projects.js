export const filterCategories = ['All', 'C++', 'Java', 'Academic']

export const projects = [
  {
    id: 'student-management-record-system',
    title: 'Student Management Record System',
    category: 'C++',
    description:
      'A desktop application developed to manage student records with CRUD operations.',
    technologies: ['C++', 'Object-Oriented Programming', 'CRUD Operations'],
    thumbnail: 'records',
    demoStatus: 'coming-soon',
    demoUrl: null,
    details: {
      overview:
        'A desktop application built to manage student records, applying object-oriented programming concepts throughout.',
      role: 'Sole developer, built as an academic project.',
      features: [
        'Developed a desktop application to manage student records',
        'Implemented Create, Read, Update and Delete operations',
        'Applied Object-Oriented Programming concepts',
      ],
    },
  },
  {
    id: 'quiz-lab',
    title: 'Quiz Lab',
    category: 'Academic',
    description:
      'A quiz application with multiple-choice questions, user interaction and automatic score calculation.',
    technologies: ['Programming Fundamentals', 'MCQs', 'Score Calculation'],
    thumbnail: 'quiz',
    demoStatus: 'coming-soon',
    demoUrl: null,
    details: {
      overview:
        'A multiple-choice quiz application focused on clear user interaction and automatic score calculation.',
      role: 'Sole developer, built as an academic project.',
      features: [
        'Built a quiz application with multiple-choice questions',
        'Implemented score calculation',
        'Added clear user interaction and feedback',
      ],
    },
  },
  {
    id: 'library-management-system',
    title: 'Library Management System',
    category: 'Java',
    description:
      'A Java-based system for managing books and student records using classes and object-oriented programming.',
    technologies: ['Java', 'Classes', 'Object-Oriented Programming'],
    thumbnail: 'library',
    demoStatus: 'github',
    demoUrl: 'https://github.com/K25SW01',
    details: {
      overview:
        'A Java system for managing books and student records, organized into reusable, object-oriented program components.',
      role: 'Sole developer, built as an academic project.',
      features: [
        'Developed a system for managing books and student records',
        'Used Java classes and object-oriented programming concepts',
        'Organized the project into reusable program components',
      ],
    },
  },
]
