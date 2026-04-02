import { ProjectCaseStudy } from '../types/project';

export const projectsData: ProjectCaseStudy[] = [
  {
    title: 'Growatt Infosystems Website',
    tagline: 'Full-Stack Business Platform',
    description:
      'Developed a full-stack business website using the MERN stack during my internship at NTech Infoway. The platform showcases services and company information with a modern responsive user experience.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['MongoDB', 'Express.js', 'React', 'Node.js'],
    github: 'https://github.com/mihirmakwana03',
    demo: 'https://growatt-frontend.vercel.app/',
    category: 'fullstack',
    problem:
      'Growatt Infosystems needed a professional web presence to showcase their solar energy solutions and services. The company required a platform that could effectively communicate their value proposition, display their product catalog, and provide an intuitive user experience for potential clients.',
    solution:
      'Built a modern, responsive full-stack application using the MERN stack. Implemented a component-based architecture with React for dynamic UI rendering, Express.js for RESTful API endpoints, and MongoDB for flexible data storage. The solution included an admin panel for content management and real-time updates.',
    architecture:
      'The application follows a three-tier architecture: React frontend deployed on Vercel for optimal performance and CDN distribution, Node.js/Express backend handling business logic and API routes, and MongoDB Atlas for cloud-based database storage. Communication between layers uses RESTful APIs with JWT authentication for secure admin access.',
    keyFeatures: [
      'Responsive design optimized for mobile, tablet, and desktop devices',
      'Dynamic service showcase with detailed product information',
      'Admin dashboard for content management without code deployment',
      'Contact form with email notification integration',
      'SEO-optimized pages with meta tags and structured data',
      'Fast page load times with code splitting and lazy loading',
    ],
    challenges: [
      'Implementing efficient state management across multiple complex components',
      'Optimizing image loading and rendering performance for product galleries',
      'Creating a flexible content management system without a traditional CMS',
      'Ensuring cross-browser compatibility and responsive design consistency',
    ],
    outcome:
      'Successfully delivered a production-ready platform that improved the company\'s online presence. The website achieved 95+ Lighthouse performance score, reduced bounce rate by providing intuitive navigation, and enabled the marketing team to update content independently through the admin panel.',
    techStack: {
      frontend: ['React 18', 'React Router', 'Axios', 'CSS3', 'Responsive Design'],
      backend: ['Node.js', 'Express.js', 'JWT', 'Nodemailer'],
      database: ['MongoDB Atlas', 'Mongoose ODM'],
      deployment: ['Vercel (Frontend)', 'Cloud Hosting (Backend)', 'MongoDB Atlas (Database)'],
    },
  },
  {
    title: 'HappinessFactors Website',
    tagline: 'Wellbeing Services Platform',
    description:
      'Built the HappinessFactors website from scratch using the Laravel framework. The platform focuses on personal development and wellbeing services with a clean, responsive interface.',
    image: 'https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Laravel', 'PHP', 'MySQL', 'JavaScript'],
    github: 'https://github.com/mihirmakwana03',
    demo: 'https://happinessfactors.com/',
    category: 'fullstack',
    problem:
      'HappinessFactors required a comprehensive web platform to deliver their personal development and wellbeing services online. The client needed a solution that could handle service bookings, display educational content, manage client interactions, and provide a seamless user experience across all devices.',
    solution:
      'Developed a full-featured Laravel application leveraging the framework\'s MVC architecture and built-in tools. Implemented Eloquent ORM for database operations, Blade templating for dynamic views, and Laravel\'s authentication system for secure user management. Created a custom booking system with email notifications and integrated a content management interface.',
    architecture:
      'The application uses Laravel\'s MVC pattern with clear separation of concerns: Models handle data and business logic, Controllers manage request/response flow, and Views render the UI. MySQL database stores user data, bookings, and content. The frontend uses Blade templates enhanced with vanilla JavaScript for interactive elements, ensuring fast load times and SEO-friendly server-side rendering.',
    keyFeatures: [
      'Service booking system with calendar integration and availability management',
      'User authentication and profile management with secure password handling',
      'Content management system for blog posts and educational resources',
      'Email notification system for bookings, confirmations, and reminders',
      'Responsive design with mobile-first approach',
      'Admin dashboard for managing services, bookings, and users',
      'SEO optimization with meta tags and clean URL structure',
    ],
    challenges: [
      'Implementing complex booking logic with time slot management and conflict prevention',
      'Designing an intuitive admin interface for non-technical users',
      'Ensuring data security and GDPR compliance for user information',
      'Optimizing database queries for efficient data retrieval and pagination',
    ],
    outcome:
      'Delivered a fully functional platform that enabled HappinessFactors to scale their services online. The website handles 100+ monthly bookings, provides clients with easy access to resources, and reduced administrative workload through automated notifications and management tools. The platform maintains 99.9% uptime and serves users globally.',
    techStack: {
      frontend: ['Blade Templates', 'JavaScript', 'Bootstrap', 'CSS3'],
      backend: ['Laravel 10', 'PHP 8', 'Eloquent ORM', 'Laravel Mail'],
      database: ['MySQL', 'Database Migrations', 'Seeders'],
      deployment: ['Shared Hosting', 'cPanel', 'SSL Certificate'],
    },
  },
  {
    title: 'Yoga Website',
    tagline: 'Studio Management Platform',
    description:
      'A comprehensive yoga studio platform featuring class booking system, user authentication, payment integration, and admin panel for managing classes and members.',
    image: 'https://images.pexels.com/photos/3822621/pexels-photo-3822621.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Node.js', 'MongoDB', 'Authentication'],
    github: 'https://github.com/mihirmakwana03',
    demo: '#',
    category: 'fullstack',
    problem:
      'Yoga studios face challenges managing class schedules, member registrations, and payment processing manually. Studio owners needed a digital solution to streamline operations, allow online bookings, handle payments securely, and provide members with easy access to class information and their booking history.',
    solution:
      'Created a comprehensive full-stack application with React for the user interface, Node.js/Express for backend services, and MongoDB for data persistence. Implemented JWT-based authentication for secure user sessions, integrated payment gateway for online transactions, and built an admin dashboard for studio management. The platform enables members to browse classes, book sessions, and manage their profiles seamlessly.',
    architecture:
      'The system follows a modern microservices-inspired architecture: React SPA for the frontend with Redux for state management, RESTful API built with Express.js handling authentication, booking logic, and payment processing, and MongoDB for storing user profiles, class schedules, and booking records. The authentication flow uses JWT tokens with refresh token rotation for enhanced security.',
    keyFeatures: [
      'User registration and authentication with email verification',
      'Class schedule display with real-time availability updates',
      'Online booking system with calendar integration',
      'Payment gateway integration for secure transactions',
      'User dashboard showing booking history and profile management',
      'Admin panel for managing classes, instructors, and members',
      'Automated email notifications for bookings and reminders',
      'Responsive design optimized for mobile bookings',
    ],
    challenges: [
      'Implementing real-time seat availability updates across multiple users',
      'Integrating payment gateway with proper error handling and security',
      'Managing complex booking states and preventing double bookings',
      'Creating an intuitive admin interface for schedule management',
      'Ensuring data consistency between user actions and database state',
    ],
    outcome:
      'Successfully built a production-ready platform that digitized the entire yoga studio operations. The system reduced booking errors by 90%, increased online registrations by 60%, and saved administrative time by automating routine tasks. The platform serves as a comprehensive solution for yoga studios looking to modernize their operations.',
    techStack: {
      frontend: ['React 18', 'Redux Toolkit', 'React Router', 'Axios', 'Material-UI'],
      backend: ['Node.js', 'Express.js', 'JWT', 'Bcrypt', 'Nodemailer'],
      database: ['MongoDB', 'Mongoose', 'Database Indexing'],
      deployment: ['Frontend: Netlify', 'Backend: Heroku', 'Database: MongoDB Atlas'],
    },
  },
  {
    title: 'E-Commerce Platform',
    tagline: 'Full-Featured Online Store',
    description:
      'Full-featured online shopping platform with product catalog, shopping cart, checkout process, order management, and secure payment gateway integration.',
    image: 'https://images.pexels.com/photos/34577/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=800',
    tags: ['PHP', 'Laravel', 'MySQL', 'Payment Gateway'],
    github: 'https://github.com/mihirmakwana03',
    demo: '#',
    category: 'fullstack',
    problem:
      'Small and medium businesses struggle to establish online sales channels due to the complexity and cost of e-commerce platforms. They need an affordable, customizable solution that handles product management, order processing, payment integration, and provides customers with a smooth shopping experience.',
    solution:
      'Developed a complete e-commerce platform using Laravel framework, leveraging its robust ecosystem for rapid development. Implemented a product management system with categories and search functionality, shopping cart with session management, secure checkout process with payment gateway integration, and an admin panel for order and inventory management.',
    architecture:
      'Built on Laravel\'s MVC architecture with Eloquent ORM for database operations. The frontend uses Blade templates with Ajax for dynamic cart updates. MySQL database stores products, orders, and user data with normalized schema design. Payment processing is handled through secure API integration with proper encryption and validation.',
    keyFeatures: [
      'Product catalog with categories, filters, and search functionality',
      'Shopping cart with real-time price calculations and inventory checks',
      'User authentication and profile management',
      'Secure checkout process with multiple payment options',
      'Order tracking and history for customers',
      'Admin dashboard for product, order, and customer management',
      'Inventory management with low-stock alerts',
      'Responsive design for mobile shopping experience',
    ],
    challenges: [
      'Implementing secure payment processing with PCI compliance considerations',
      'Managing inventory levels across concurrent user transactions',
      'Optimizing database queries for fast product search and filtering',
      'Creating a scalable cart system that handles session management efficiently',
    ],
    outcome:
      'Delivered a fully functional e-commerce platform that enables businesses to sell online effectively. The platform processes transactions securely, provides intuitive product browsing, and streamlines order management. The admin panel empowers business owners to manage their store independently without technical expertise.',
    techStack: {
      frontend: ['Blade Templates', 'JavaScript', 'jQuery', 'Bootstrap'],
      backend: ['Laravel', 'PHP', 'Payment Gateway API', 'Laravel Queue'],
      database: ['MySQL', 'Database Relationships', 'Transactions'],
      deployment: ['Shared Hosting', 'SSL Certificate', 'Email Server'],
    },
  },
  {
    title: 'Online Job Portal',
    tagline: 'Recruitment Platform',
    description:
      'Job search and recruitment platform connecting employers with job seekers. Features include job postings, application tracking, resume management, and advanced search filters.',
    image: 'https://images.pexels.com/photos/5310571/pexels-photo-5310571.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'Node.js', 'Express', 'MySQL'],
    github: 'https://github.com/mihirmakwana03',
    demo: '#',
    category: 'fullstack',
    problem:
      'Job seekers and employers face difficulties finding each other efficiently. Traditional job boards lack advanced matching capabilities, intuitive interfaces, and comprehensive application tracking. There was a need for a modern platform that simplifies job searching, streamlines the application process, and provides employers with tools to manage candidates effectively.',
    solution:
      'Built a comprehensive job portal with separate interfaces for job seekers and employers. Implemented advanced search with multiple filters, resume upload and parsing, application tracking system, and employer dashboard for managing job postings and candidates. Used React for dynamic UI, Node.js/Express for backend services, and MySQL for relational data storage.',
    architecture:
      'The application uses a three-tier architecture with React frontend for rich user interactions, Express.js RESTful API for business logic, and MySQL database for structured data storage. Implemented role-based access control (RBAC) for job seekers and employers. File uploads are handled with multer middleware, and resume data is stored with proper indexing for fast search operations.',
    keyFeatures: [
      'Advanced job search with filters for location, salary, experience, and skills',
      'User profiles for job seekers with resume upload and portfolio links',
      'Employer dashboard for posting jobs and managing applications',
      'Application tracking system showing application status',
      'Email notifications for new jobs and application updates',
      'Resume builder tool for job seekers',
      'Job recommendations based on user profile and preferences',
      'Analytics dashboard for employers showing application metrics',
    ],
    challenges: [
      'Implementing efficient search algorithm with multiple filter combinations',
      'Handling file uploads and storage for resumes and documents',
      'Designing a scalable database schema for complex relationships',
      'Creating an intuitive interface for both job seekers and employers',
      'Ensuring data privacy and security for sensitive user information',
    ],
    outcome:
      'Created a functional job portal that connects employers with qualified candidates efficiently. The platform handles job postings, application submissions, and candidate management in one centralized system. Advanced search and filtering capabilities help users find relevant opportunities quickly, while the application tracking system keeps everyone informed throughout the hiring process.',
    techStack: {
      frontend: ['React', 'Redux', 'React Router', 'Axios', 'Tailwind CSS'],
      backend: ['Node.js', 'Express.js', 'Multer', 'JWT', 'Bcrypt'],
      database: ['MySQL', 'Sequelize ORM', 'Database Indexing'],
      deployment: ['Frontend: Vercel', 'Backend: Railway', 'Database: PlanetScale'],
    },
  },
];
