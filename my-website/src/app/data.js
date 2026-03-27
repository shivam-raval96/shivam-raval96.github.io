// ─────────────────────────────────────────────
//  Site data — edit this file to update content
// ─────────────────────────────────────────────

export const profile = {
  name: "Shivam Raval",
  title: "AI Research Scientist",
  tagline: "Generalist. Eternally curious.",
  email: "sraval@g.harvard.edu",
  github: "https://github.com/shivam-raval96",
  linkedin: "https://www.linkedin.com/in/shivam-raval-27820484/",
  scholar: "https://scholar.google.com/citations?user=hs94v8AAAAAJ&hl=en",
  headshot: "/headshot.jpg",
  interests: [
    "AI Interpretability & Safety",
    "High-dimensional Visualization",
    "Interactive ML Systems",
  ],
};

export const about = {
  bio: "I'm a research scientist focusing on making machine learning more interpretable through visualization and interactive systems. My work combines techniques from deep learning, human-computer interaction, and data visualization.",
  philosophy:
    "My research aims to bridge the gap between powerful ML models and human understanding of model internals. This involves explaining and visualizing clustering structures in high-dimensional data and interpreting latent activations in frontier AI models. I also use interactive visualizations to create explanatory articles that make AI interpretability methods more accessible.",
  impact:
    "By emphasizing visual, interactive explanations of AI techniques and enhancing our understanding of AI models, I aim to make these complex systems more accessible, transparent, and trustworthy — for researchers, developers, and policymakers alike.",
  quote: "We are who we choose to be.",
};

export const papers = [
  {
    id: 1,
    title: "MoE Lens — An Expert Is All You Need",
    subtitle:
      "Practical downstream application of interpretability for compute optimization.",
    authors: [
      "Marmik Chaudhari, Idhant Gulati, Nishkal Hundia, Pranav Karra,",
      { name: "Shivam Raval", highlight: true },
    ],
    venue: "ICLR SLLM Workshop 2025",
    prizes: ["Advisory capacity"],
    teaserImage: "/images/moelens.png",
    link: "https://openreview.net/pdf?id=jae1ZHJ3yl",
  },
  {
    id: 2,
    title:
      "Augmenting X-ray Astronomical Representations with Scientific Knowledge through Contrastive Learning",
    subtitle: "Multimodal representation alignment for astronomical data.",
    authors: [
      "Juan Rafael Martínez-Galarza, Nicolò Oreste Pinciroli Vago,",
      { name: "Shivam Raval", highlight: true },
      ", Carolina Cuesta-Lazaro, Melanie Weber, David Alvarez-Melis, Alberto Accomazzi, Cecilia Garraffo, Joshua Knutson, Ryan Thill, Christopher B Green, Imantha Ahangama",
    ],
    venue: "ICLR Re-Align Workshop 2025",
    prizes: [],
    teaserImage: "/images/astroai.png",
    link: "https://openreview.net/pdf?id=jae1ZHJ3yl",
  },
  {
    id: 3,
    title: "Hypertrix: An Indicatrix for High-Dimensional Visualizations",
    subtitle:
      "Visualizing and identifying anomalous distortion in visual projections.",
    authors: [
      { name: "Shivam Raval", highlight: true },
      ", Fernanda Viegas, Martin Wattenberg",
    ],
    venue: "IEEE VIS 2024",
    prizes: ["Best Short Paper Award"],
    teaserImage: "/images/hypertrix.png",
    link: "https://ieeevis.b-cdn.net/vis_2024/pdfs/v-short-1090.pdf",
  },
];

export const experience = {
  education: [
    {
      title: "PhD in Physics",
      org: "Harvard University",
      location: "Cambridge, MA",
      period: "Expected Dec 2025",
      description:
        "Dissertation on visualizing and interpreting high-dimensional data: theory and applications.",
      highlights: [
        "Mathematical & engineering principles for training foundation models",
        "Geometric deep learning and manifold learning techniques",
        "Human-computer interaction and visualization",
      ],
      awards: [
        "Purcell Fellowship",
        "Best Short Paper — IEEE VIS 2024",
        "Nominated member, Sigma Xi Scientific Research Honor Society",
      ],
    },
  ],
  industry: [
    {
      title: "Human Frontier Collective Fellow",
      org: "Scale AI",
      location: "San Francisco, CA",
      period: "June 2025 – Ongoing",
      description:
        "Fellowship focused on advancing AI safety and alignment research in collaboration with industry leaders.",
      highlights: [],
      awards: [],
    },
    {
      title: "External Collaborator",
      org: "Google DeepMind — People + AI Research (PAIR)",
      location: "Cambridge, MA",
      period: "Aug 2024 – Ongoing",
      description: "",
      highlights: [
        "Collaborating on an explorable article on LLM interpretability using Sparse Autoencoders (SAEs)",
        "Developed research direction and initial analyses on novel SAE phenomena like shrinkage and feature splitting",
      ],
      awards: [],
    },
  ],
  research: [
    {
      title: "Doctoral Researcher",
      org: "Harvard University — Insight and Interaction Lab",
      location: "Cambridge, MA",
      period: "Feb 2022 – Ongoing",
      description: "",
      highlights: [
        "Developing embedding visualization tools and interpretable techniques for high-dimensional representations",
        "Used by collaborators for new insights in ICU healthcare settings, interpretability, and physics",
        "2 conference presentations (IEEE VIS 2023–24), 2 workshop presentations (NeurIPS 2023, ICLR 2025), 3 articles under review",
      ],
      awards: [],
    },
  ],
  leadership: [
    {
      title: "Research Mentor and Advisor",
      org: "AI Safety Camp, ML4Good & AI Safety India Initiative",
      location: "Remote",
      period: "2025 – Ongoing",
      description: "",
      highlights: [
        "Leading multiple projects on AI Interpretability, Safety, and Alignment as Research Scientist / Mentor",
        "Collaboration has led to several publications and ongoing research",
      ],
      awards: [],
    },
    {
      title: "Academic Mentorship & Student Leadership Fellow",
      org: "Harvard University",
      location: "Cambridge, MA",
      period: "2019 – Ongoing",
      description: "",
      highlights: [
        "Mentored undergrad and early grad students on explainable AI, visualization, and LLM interpretability",
        "Results: three accepted workshop submissions and four papers in preparation",
        "Organised student activities and outdoor trips aimed at improving mental and physical health",
      ],
      awards: [],
    },
  ],
  talks: [
    {
      title:
        "Massive Activations in Language Reasoning Models: What Are They Good For?",
      venue: "Frontiers in NeuroAI, Kempner Institute Symposium",
      location: "Cambridge, MA",
      date: "June 2025",
      type: "Symposium Talk",
      description:
        "Presenting research on understanding and interpreting large-scale activations in language models during reasoning tasks.",
    },
    {
      title: "Hypertrix: An Indicatrix for High-Dimensional Visualizations",
      venue: "IEEE VIS 2024",
      location: "St. Pete Beach, FL",
      date: "October 2024",
      type: "Conference Presentation",
      description:
        "Best short paper award winner on novel techniques for visualizing and identifying anomalous distortion in visual projections of high-dimensional data.",
    },
  ],
};

export const blogs = [
  {
    id: 0,
    title: "Why SAEs Fail (and Why CLTs Might Too)",
    description: "An interactive exploration of SAEs and CLTs.",
    date: "2025-05-15",
    readTime: "Interactive",
    tags: ["Interpretability", "Visualization", "Machine Learning"],
    link: "https://shivam-raval96.github.io/Explorable-SAE/",
    external: true,
  },
  {
    id: 2,
    title: "The Future of Interactive Academic Papers",
    description:
      "How interactive visualizations are changing the way we communicate research.",
    date: "2024-02-28",
    readTime: "12 min",
    tags: ["Research", "Academic Writing", "Interactive Media"],
    external: false,
  },
];

export const visuals = [
  {
    id: "music_vis",
    title: "A Basic Music Visualizer",
    description: "Real-time audio visualization with canvas rendering.",
    date: "2024-06-14",
    tags: ["Visualization", "Music", "Canvas"],
  },
  {
    id: "attractor",
    title: "Strange Attractors",
    description: "An interactive exploration of non-linear dynamics and chaos.",
    date: "2024-03-15",
    tags: ["Visualization", "Non-linear Dynamics"],
  },
];
