// Import project images
import crimenetImg from './images/CrimeNet/Screenshot 2025-11-06 101238.png'
import echoVerseImg from './images/Echoverse/Screenshot 2025-08-29 181834.png'
import echoVerse1 from './images/Echoverse/Screenshot 2025-11-06 101238.png'
import echoVerse2 from './images/Echoverse/Screenshot 2025-11-06 111445.png'
import echoVerse3 from './images/Echoverse/Screenshot 2025-11-06 113800.png'
import echoVerse4 from './images/Echoverse/Screenshot 2025-11-06 113826.png'
import khushiInteriorsImg from './images/KhushiInteriors/Screenshot 2026-01-25 082602.png'
import khushiInteriors1 from './images/KhushiInteriors/Screenshot 2026-01-25 082639.png'
import khushiInteriors2 from './images/KhushiInteriors/Screenshot 2026-01-25 082738.png'
import khushiInteriors3 from './images/KhushiInteriors/Screenshot 2026-01-25 103309.png'
import khushiInteriors4 from './images/KhushiInteriors/Screenshot 2026-01-25 103347.png'

export const portfolioData = {
  hero: {
    name: "NADIPI SRUJAN REDDY",
    role: "Java Full Stack Developer",
    tagline: "Building scalable and efficient web applications with modern technologies",
    greeting: "Hi, I'm",
    description: "Full Stack Developer experienced in designing, developing, and deploying secure, scalable web applications using Java, Spring Boot, React, and RESTful APIs, with hands-on exposure to DevOps tools."
  },

  about: {
    title: "About Me",
    objective: "Full Stack Developer experienced in designing, developing, and deploying secure, scalable web applications using Java, Spring Boot, React, and RESTful APIs, with hands-on exposure to DevOps tools.",
    bio: "Passionate full-stack developer with expertise in Java, Spring Boot, and modern web technologies. I love creating efficient, scalable solutions that solve real-world problems. Successfully delivered my first freelancing project - a production-ready interior design website. Currently pursuing B.Tech in Computer Science & Engineering with a strong focus on building production-ready applications.",
    yearsOfExperience: "2+",
    projectsCompleted: "10+",
    technologiesWorked: "15+"
  },

  education: [
    {
      id: 1,
      degree: "Bachelor of Technology",
      field: "Computer Science & Engineering",
      institution: "Teegala Krishna Reddy Engineering College",
      location: "Hyderabad",
      duration: "Nov 2022 – Nov 2026",
      score: "8.41 CGPA",
      description: "Focused on software development, data structures, algorithms, and full-stack technologies."
    },
    {
      id: 2,
      degree: "Intermediate",
      field: "MPC",
      institution: "Sree Venkateshwara Junior College",
      location: "Bodhan",
      duration: "Jun 2020 – Mar 2022",
      score: "81%",
      description: "Mathematics, Physics, and Chemistry with strong academic performance."
    },
    {
      id: 3,
      degree: "Secondary School Certificate (SSC)",
      field: "General",
      institution: "Matrusri High School",
      location: "Bodhan, Nizamabad",
      duration: "2020",
      score: "Passed",
      description: "Completed secondary education with good grades."
    }
  ],

  skills: {
    programming: [
      { name: "Java", level: 90, category: "Programming Language" },
      { name: "JavaScript", level: 75, category: "Programming Language" },
      { name: "TypeScript", level: 80, category: "Programming Language" },
      { name: "HTML", level: 90, category: "Markup Language" },
      { name: "CSS", level: 85, category: "Styling" }
    ],
    frameworks: [
      { name: "Spring Boot", level: 85, category: "Backend Framework" },
      { name: "React", level: 80, category: "Frontend Framework" },
      { name: "Tailwind CSS", level: 85, category: "CSS Framework" }
    ],
    databases: [
      { name: "MySQL", level: 85, category: "Relational Database" },
      { name: "PostgreSQL", level: 80, category: "Relational Database" },
      { name: "SQL", level: 85, category: "Query Language" },
      { name: "Firestore", level: 70, category: "NoSQL Database" },
      { name: "Supabase", level: 80, category: "Backend as a Service" }
    ],
    tools: [
      { name: "Git", level: 85, category: "Version Control" },
      { name: "GitHub", level: 90, category: "Repository Hosting" },
      { name: "Postman", level: 85, category: "API Testing" },
      { name: "MySQL Workbench", level: 80, category: "Database Tool" },
      { name: "JDBC", level: 80, category: "Database Connectivity" },
      { name: "Jenkins", level: 70, category: "CI/CD" },
      { name: "Docker", level: 75, category: "Containerization" },
      { name: "Kubernetes", level: 65, category: "Orchestration" },
      { name: "Vercel", level: 85, category: "Deployment Platform" },
      { name: "Sentry", level: 75, category: "Error Monitoring" }
    ],
    concepts: [
      { name: "DBMS", level: 85, category: "Database Management" },
      { name: "Operating Systems", level: 80, category: "System Software" },
      { name: "Software Engineering", level: 85, category: "Development Methodology" },
      { name: "Computer Networking", level: 75, category: "Networking" },
      { name: "Data Structures & Algorithms", level: 85, category: "Problem Solving" },
      { name: "OOP", level: 90, category: "Programming Paradigm" },
      { name: "RESTful APIs", level: 90, category: "API Design" }
    ]
  },

  projects: [
    {
      id: 1,
      title: "CrimeNet – Full-Stack Public Safety Platform",
      slug: "crimenet-public-safety-platform",
      description: "Production-ready crime reporting platform with role-based dashboards for Citizens, Police, and Admins. Features include real-time crime reporting, officer assignment workflows, JWT authentication, and comprehensive analytics.",
      image: crimenetImg,
      tech: ["React", "Spring Boot", "Firebase Auth", "Firestore", "Docker", "CI/CD", "Tailwind CSS", "JWT"],
      features: [
        "Built 30+ RESTful APIs for complete CRUD operations",
        "Implemented Citizen, Police, and Admin dashboards with role-based access",
        "JWT security and Firebase authentication integration",
        "Responsive UI using React and Tailwind CSS",
        "Officer assignment workflows with real-time updates",
        "Analytics dashboard for crime statistics and trends",
        "Dockerized application with CI/CD pipeline deployment"
      ],
      githubUrl: "https://github.com/srujanreddynadipi/crimenet",
      liveUrl: null,
      category: "Full Stack",
      status: "Completed",
      startDate: "2025",
      endDate: "2025"
    },
    {
      id: 2,
      title: "EchoVerse – AI Audiobook Generator",
      slug: "echoverse-ai-audiobook-generator",
      description: "AI-powered audiobook generation platform that converts PDF, Word documents, and text files into high-quality audio narration using IBM Watson Text-to-Speech and HuggingFace models.",
      image: echoVerseImg,
      images: [echoVerseImg, echoVerse1, echoVerse2, echoVerse3, echoVerse4],
      tech: ["React", "Node.js", "MySQL", "IBM Watson TTS", "HuggingFace", "AI/ML"],
      features: [
        "Convert PDF, Word, and Text files to audio format",
        "Multi-voice narration support with different character voices",
        "Automatic chapter segmentation and bookmarking",
        "User-friendly interfaces for Admin, Student, and Elderly users",
        "Admin analytics dashboard for usage statistics",
        "Progress tracking and playback controls",
        "Download and share generated audiobooks"
      ],
      githubUrl: "https://github.com/srujanreddynadipi/echoverse",
      liveUrl: null,
      category: "AI/ML",
      status: "Completed",
      startDate: "2024",
      endDate: "2025"
    },
    {
      id: 3,
      title: "Kushi Interiors – Full-Stack Interior Design Website",
      slug: "kushi-interiors-website",
      description: "Production-grade, full-stack interior design website with admin dashboard for my first freelancing client. Features modern responsive design, project gallery management, testimonial system, secure authentication, and comprehensive analytics.",
      image: khushiInteriorsImg,
      images: [khushiInteriorsImg, khushiInteriors1, khushiInteriors2, khushiInteriors3, khushiInteriors4],
      tech: ["React 19", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Vercel", "Framer Motion", "Sentry", "Google Analytics 4"],
      features: [
        "Modern responsive website with admin dashboard",
        "Project gallery & testimonial management system",
        "Secure authentication & content management",
        "Contact form with email integration",
        "SEO optimized with sitemap, meta tags, and structured data",
        "Real-time error tracking with Sentry integration",
        "Google Analytics 4 for visitor behavior insights",
        "< 2s page load time with 90+ performance score",
        "Enterprise-level security headers & HTTPS",
        "WCAG accessibility compliant",
        "PostgreSQL with Row Level Security (RLS)",
        "Code splitting & lazy loading optimization",
        "Automated CI/CD pipeline with Vercel",
        "A+ security rating",
        "100% mobile responsive"
      ],
      githubUrl: null,
      liveUrl: "https://lnkd.in/gyhMqrHZ",
      category: "Full Stack",
      status: "Completed",
      startDate: "2025",
      endDate: "2025"
    }
  ],

  experience: [
    {
      id: 1,
      type: "Internship",
      role: "React & Node.js Developer Intern",
      company: "Blue Planer Info Solutions Pvt. Ltd.",
      location: "Remote",
      duration: "Mar 2025 – Sep 2025",
      startDate: "Mar 2025",
      endDate: "Sep 2025",
      current: false,
      description: "Worked on full-stack development projects using React and Node.js, implementing secure REST APIs and role-based access control systems.",
      responsibilities: [
        "Developed full-stack modules for enterprise applications",
        "Built secure REST APIs with JWT authentication",
        "Implemented Role-Based Access Control (RBAC) for user management",
        "Collaborated with team using Git and Bitbucket for version control",
        "Participated in code reviews and agile development practices"
      ],
      technologies: ["React", "Node.js", "JWT", "Git", "Bitbucket", "REST APIs", "RBAC"]
    },
    {
      id: 2,
      type: "Training",
      role: "Java & Spring Boot Training",
      company: "TNSIF Foundation",
      location: "Online",
      duration: "Sep 2024 – Oct 2024",
      startDate: "Sep 2024",
      endDate: "Oct 2024",
      current: false,
      description: "Intensive training program focused on Java backend development and Spring Boot framework with real-world project implementation.",
      responsibilities: [
        "Built certificate verification system with Spring Boot",
        "Developed college placement management system",
        "Created 25+ REST APIs for various modules",
        "Implemented database operations using MySQL and JDBC",
        "Learned Spring Boot best practices and design patterns"
      ],
      technologies: ["Java", "Spring Boot", "MySQL", "JDBC", "REST APIs", "Maven"]
    }
  ],

  certifications: [
    {
      id: 1,
      title: "MERN Stack Developer Certification",
      issuer: "EY-GDS Edunet Foundation",
      date: "2024",
      credentialId: null,
      credentialUrl: null,
      description: "Comprehensive certification covering MongoDB, Express.js, React, and Node.js full-stack development.",
      skills: ["MongoDB", "Express.js", "React", "Node.js", "Full Stack Development"]
    },
    {
      id: 2,
      title: "Oracle SQL / PLSQL",
      issuer: "Oracle",
      date: "Ongoing",
      credentialId: null,
      credentialUrl: null,
      description: "Currently pursuing certification in Oracle Database SQL and PL/SQL programming.",
      skills: ["SQL", "PL/SQL", "Oracle Database", "Database Programming"]
    },
    {
      id: 3,
      title: "Snowflake",
      issuer: "Snowflake",
      date: "Upskilling",
      credentialId: null,
      credentialUrl: null,
      description: "Ongoing upskilling in Snowflake cloud data platform and data warehousing concepts.",
      skills: ["Snowflake", "Data Warehousing", "Cloud Data Platform"]
    }
  ],

  achievements: [
    {
      id: 1,
      title: "Runner-up – Cognitive-X Smart Intenz Hackathon 2025",
      date: "2025",
      description: "Secured second position in the Cognitive-X Smart Intenz Hackathon, presenting innovative solutions in AI and software development.",
      category: "Hackathon",
      icon: "trophy"
    },
    {
      id: 2,
      title: "Selected for Smart India Hackathon 2025",
      date: "2025",
      description: "Selected to represent at the national-level Smart India Hackathon, one of India's biggest coding competitions.",
      category: "Hackathon",
      icon: "award"
    },
    {
      id: 3,
      title: "MERN Stack Developer Certification – EY-GDS",
      date: "2024",
      description: "Successfully completed comprehensive MERN Stack Developer certification from EY-GDS Edunet Foundation.",
      category: "Certification",
      icon: "certificate"
    }
  ],

  contact: {
    email: "srujanreddynadipi@gmail.com",
    phone: "+91 7671879587",
    location: "Hyderabad, India",
    availability: "Open to opportunities",
    preferredContact: "Email"
  },

  social: {
    github: {
      url: "https://github.com/srujanreddynadipi",
      username: "srujanreddynadipi",
      display: "GitHub"
    },
    linkedin: {
      url: "https://linkedin.com/in/srujanreddynadipi",
      username: "srujanreddynadipi",
      display: "LinkedIn"
    },
    email: {
      url: "mailto:srujanreddynadipi@gmail.com",
      display: "Email"
    }
  },

  // Additional metadata
  metadata: {
    lastUpdated: "2026-02-06",
    version: "1.0.0",
    resumeUrl: null, // Will be updated when resume is uploaded
    profileImage: null // Will be updated when image is added
  }
}
