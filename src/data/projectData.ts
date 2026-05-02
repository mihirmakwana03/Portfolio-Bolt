import { ProjectCaseStudy } from '../types/project';

export const projectsData: ProjectCaseStudy[] = [
  {
    title: 'Smart Office Face Recognition System',
    tagline: 'Real-time Computer Vision Access Control',
    description:
      'Real-time face recognition system for office access control. Built with MTCNN and RetinaFace for detection, FaceNet and ArcFace for 512D embeddings. Migrated from TensorFlow MTCNN to facenet-pytorch, optimised Streamlit demo with resource caching. Kingston CI7523 coursework.',
    image: 'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['AI/ML', 'Computer Vision'],
    github: 'https://github.com/mihirmakwana03/CV-Assignment',
    demo: '#',
    category: 'cv',
    featured: true,
    problem:
      'Traditional office access control relies on ID cards or PINs, which are prone to loss, theft, and sharing. The goal was to build a non-intrusive, real-time face recognition pipeline robust to lighting changes, pose variation, and partial occlusion, capable of running on commodity hardware.',
    solution:
      'Implemented a two-stage pipeline: (1) face detection and alignment with MTCNN and RetinaFace, (2) 512-D embedding extraction with FaceNet (InceptionResNetV1) and ArcFace, followed by cosine-distance matching against an enrolled gallery. Migrated from TensorFlow-based MTCNN to facenet-pytorch for tighter integration and better GPU utilisation, and wrapped the whole pipeline in a Streamlit demo with resource caching for sub-second responses.',
    architecture:
      'Webcam frames → OpenCV preprocessing → MTCNN/RetinaFace detector → 160×160 aligned face → FaceNet/ArcFace embedding → cosine match against FAISS-indexed gallery → decision. All orchestrated inside Streamlit with @st.cache_resource for the models and @st.cache_data for the gallery embeddings.',
    keyFeatures: [
      'Real-time detection and recognition at webcam framerate',
      'Dual-model comparison (FaceNet vs ArcFace) with ablation study',
      'Enrollment workflow for adding new identities from a handful of images',
      'Confidence-thresholded decisions with unknown-face rejection',
      'Streamlit demo with cached models for fast cold starts',
    ],
    challenges: [
      'Migrating from TensorFlow MTCNN to facenet-pytorch without losing accuracy',
      'Balancing detection recall against false positives under varied lighting',
      'Keeping latency low while running two models per frame',
    ],
    outcome:
      'Delivered a working real-time access-control prototype as Kingston CI7523 coursework, with a reproducible Streamlit demo and a written comparison of detector/embedder combinations.',
    techStack: {
      frontend: ['Streamlit'],
      backend: ['Python', 'PyTorch', 'facenet-pytorch', 'OpenCV'],
      database: ['FAISS (gallery index)'],
      deployment: ['Local GPU inference'],
    },
  },
  {
    title: 'Medical Image Classification: OrganSMNIST',
    tagline: 'Transfer Learning on CT Scans',
    description:
      'Multi-class classification of abdominal CT organ images at 224×224. Benchmarked 13 experiments across MLPs, CNNs, and transfer learning (MobileNetV2, ResNet50). ResNet50 gave strongest generalisation. Kingston CI7521 CW2.',
    image: 'https://images.pexels.com/photos/4226124/pexels-photo-4226124.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['AI/ML', 'Deep Learning'],
    github: 'https://github.com/mihirmakwana03/CI7521-CW2-notebook-OrganSMNIST',
    demo: 'https://github.com/mihirmakwana03/CI7521-CW2-notebook-OrganSMNIST',
    category: 'ai',
    featured: true,
    comingSoon: false,
    problem:
      'Medical image classification is notoriously sensitive to architecture and training-regime choices. The task was to identify which model family generalises best on OrganSMNIST (abdominal CT organ images) upsampled to 224×224.',
    solution:
      'Ran 13 controlled experiments spanning MLPs, from-scratch CNNs, and transfer learning with MobileNetV2 and ResNet50 pretrained on ImageNet. Used identical data splits, augmentation, and early-stopping across runs for fair comparison. ResNet50 with fine-tuning of the last blocks produced the strongest validation and test performance.',
    architecture:
      'Data pipeline (MedMNIST+ OrganSMNIST, 224×224, on-the-fly augmentation) → shared training loop in TensorFlow/Keras → per-model head (MLP / CNN / MobileNetV2 / ResNet50) → callbacks for early stopping and LR scheduling → logged metrics and confusion matrices.',
    keyFeatures: [
      '13-experiment ablation across four model families',
      'Identical splits and augmentation for fair comparison',
      'Per-class accuracy and confusion matrices for error analysis',
      'Transfer learning with staged unfreezing',
    ],
    challenges: [
      'Preventing overfitting on a relatively small medical dataset',
      'Matching upsampled 224×224 inputs to pretrained ImageNet backbones',
      'Running a large experiment matrix within coursework compute limits',
    ],
    outcome:
      'Produced a benchmarking report showing ResNet50 as the strongest generaliser, with full per-experiment metrics, training curves, and confusion matrices. Kingston CI7521 CW2.',
    techStack: {
      frontend: [],
      backend: ['Python', 'TensorFlow/Keras', 'NumPy', 'Matplotlib'],
      database: ['MedMNIST+ OrganSMNIST'],
      deployment: ['Jupyter / local GPU'],
    },
  },
  {
    title: 'Multi-Class Classification on Imbalanced Data',
    tagline: 'Classical ML Benchmarking',
    description:
      'Benchmarked 8 classical ML classifiers (LDA, QDA, Decision Tree, KNN, Logistic Regression, SVM, Random Forest, Gaussian NB) on a 5-class imbalanced dataset. SMOTE oversampling + quantile transformer + two-stage hyperparameter search. Kingston CI7521 CW1.',
    image: 'https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['AI/ML'],
    github: 'https://github.com/mihirmakwana03/CI7521-CW1-notebook',
    demo: 'https://github.com/mihirmakwana03/CI7521-CW1-notebook',
    category: 'ai',
    featured: true,
    comingSoon: false,
    problem:
      'Real-world multi-class datasets are rarely balanced and rarely Gaussian. The task was to establish which classical ML algorithm performs best on a 5-class imbalanced dataset after principled preprocessing.',
    solution:
      'Applied a quantile transformer to address skew, SMOTE to oversample minority classes inside cross-validation folds only (to avoid leakage), and ran a two-stage hyperparameter search (coarse grid → refined randomised search) across 8 classifiers. Scored with macro-F1 to reflect class balance.',
    architecture:
      'Raw data → train/val/test split → per-fold quantile transform + SMOTE (fit on train fold only) → classifier → macro-F1. Pipeline expressed with scikit-learn Pipelines and imbalanced-learn Pipelines to guarantee leakage-free evaluation.',
    keyFeatures: [
      '8-classifier head-to-head with identical preprocessing',
      'Leakage-free SMOTE inside CV folds',
      'Two-stage hyperparameter search per classifier',
      'Macro-F1 reporting with per-class precision/recall breakdown',
    ],
    challenges: [
      'Avoiding data leakage when combining oversampling with cross-validation',
      'Tuning classifiers fairly within a fixed compute budget',
      'Interpreting results across classifiers with very different inductive biases',
    ],
    outcome:
      'Delivered a reproducible benchmarking report ranking the 8 classifiers by macro-F1 with full methodology, as Kingston CI7521 CW1.',
    techStack: {
      frontend: [],
      backend: ['Python', 'scikit-learn', 'imbalanced-learn', 'pandas'],
      database: ['Provided coursework dataset'],
      deployment: ['Jupyter'],
    },
  },
  {
    title: 'Growatt CRM: InfoSystem Dashboard',
    tagline: 'MERN Stack CRM Dashboard',
    description:
      'React.js frontend for a MERN-stack CRM tracking clients and service tickets for Growatt InfoSystem. REST APIs with Node.js/Express, MongoDB schemas, role-based views for admin and field-engineer users. Built during NTech Infoway internship.',
    image: '/Project-Growatt.png',
    tags: ['Full-Stack'],
    github: 'https://github.com/mihirmakwana03/growatt-frontend',
    demo: 'https://growatt-frontend.vercel.app/',
    category: 'fullstack',
    featured: true,
    problem:
      'Growatt InfoSystem needed a central CRM to track clients, service histories, and field engineer workloads, previously managed across spreadsheets and paper.',
    solution:
      'Built a MERN-stack CRM with role-based views: admins manage clients, records, and engineers; field engineers see only their assigned tickets with a mobile-friendly layout. Used REST APIs for all data operations and MongoDB for flexible client/ticket schemas.',
    architecture:
      'React SPA (Vercel) → REST API (Node.js + Express) → MongoDB. JWT auth with role claims, protected routes on both client and server, and a shared validation layer between API and UI.',
    keyFeatures: [
      'Role-based dashboards for admin and field engineers',
      'Client and service-record management',
      'Service ticket lifecycle with status transitions',
      'Mobile-friendly UI for on-site engineer use',
    ],
    challenges: [
      'Designing MongoDB schemas flexible enough for varied record types',
      'Keeping the field-engineer view usable on low-end Android devices',
      'Enforcing role-based access consistently across API and UI',
    ],
    outcome:
      'Delivered a production CRM for NTech Infoway\'s client. Replaced spreadsheet-based workflows and gave Growatt InfoSystem a single source of truth for its clients and service operations.',
    techStack: {
      frontend: ['React', 'React Router', 'Axios'],
      backend: ['Node.js', 'Express.js', 'JWT'],
      database: ['MongoDB', 'Mongoose'],
      deployment: ['Vercel (Frontend)', 'Cloud hosting (Backend)', 'MongoDB Atlas'],
    },
  },
  {
    title: 'HappinessFactors Website',
    tagline: 'Laravel Company Website',
    description:
      'Laravel company website with Blade templates and Tailwind styling, integrated with Groove.cm for headless content management. Delivered as freelance work.',
    image: '/Project-HappinessFactors.png',
    tags: ['Full-Stack'],
    github: 'https://github.com/mihirmakwana03/HF-Testing',
    demo: 'https://happinessfactors.com',
    category: 'fullstack',
    featured: true,
    problem:
      'HappinessFactors needed a company website that the non-technical team could update without touching code, backed by a maintainable Laravel codebase.',
    solution:
      'Built a Laravel site with Blade templates and Tailwind styling, integrated with Groove.cm as a headless CMS so marketing can update pages, posts, and media without developer involvement.',
    architecture:
      'Laravel backend (Blade + controllers) ↔ Groove.cm content API → cached server-rendered pages. Tailwind for the entire visual layer, with shared components/partials for consistent branding.',
    keyFeatures: [
      'Server-rendered Blade pages with Tailwind styling',
      'Groove.cm headless CMS integration',
      'Reusable component partials for consistent branding',
      'Responsive, fast-loading marketing pages',
    ],
    challenges: [
      'Mapping Groove.cm content models into Blade cleanly',
      'Balancing caching against content freshness',
    ],
    outcome:
      'Delivered a live marketing site that the HappinessFactors team can maintain independently through Groove.cm.',
    techStack: {
      frontend: ['Blade Templates', 'Tailwind CSS'],
      backend: ['Laravel', 'PHP'],
      database: ['MySQL'],
      deployment: ['Laravel Cloud'],
    },
  },
];
