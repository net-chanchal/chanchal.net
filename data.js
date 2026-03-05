const portfolioData = {
    meta: {
        title: "Chanchal | Senior Backend Engineer",
    },
    navbar: {
        logo: "Chanchal.",
        links: [
            { id: "about", text: "About" },
            { id: "experience", text: "Experience" },
            { id: "skills", text: "Skills" },
            { id: "contact", text: "Contact" }
        ]
    },
    hero: {
        subtitle: "Senior Backend Engineer",
        title: "System architecture<br />at scale.",
        description: "Designing enterprise-grade, highly available platforms using Laravel, distributed systems, and modern cloud infrastructure.",
        cta1: { text: "Connect", link: "#contact", primary: true },
        cta2: { text: "Explore Work", link: "#experience", primary: false }
    },
    about: {
        image: "chanchal.png",
        title: "10+ Years of Engineering",
        description: "I specialize in crafting high-performance backend engineering solutions and database-driven system designs. Throughout my career, I've led systems entirely from initial planning to production deployment, ensuring the delivery of highly available and rigorously secure platforms.",
        stats: [
            { value: "10+", label: "Years", highlight: false },
            { value: "100%", label: "Scale Ready", highlight: true }
        ]
    },
    experience: {
        title: "Core Competencies",
        items: [
            { icon: "ph-database", iconColor: "text-ios-blue dark:text-ios-blueDark", bgHover: "bg-ios-blue/10 dark:bg-ios-blueDark/20", title: "Distributed Systems", description: "Fault-tolerant architectures processing high-load transactions reliably." },
            { icon: "ph-rocket-launch", iconColor: "text-[#FF9500]", bgHover: "bg-[#FF9500]/10 dark:bg-[#FF9500]/20", title: "High-Performance", description: "Specializing in Laravel architecture for scalable, secure APIs." },
            { icon: "ph-brain", iconColor: "text-[#AF52DE]", bgHover: "bg-[#AF52DE]/10 dark:bg-[#AF52DE]/20", title: "AI Pipelines", description: "Engineering data pipelines and integrating advanced capability systems." },
            { icon: "ph-cloud", iconColor: "text-[#5AC8FA]", bgHover: "bg-[#5AC8FA]/10 dark:bg-[#5AC8FA]/20", title: "Cloud Infra", description: "Scalable cloud environments with modern DevOps practices." },
            { icon: "ph-shield-check", iconColor: "text-[#34C759]", bgHover: "bg-[#34C759]/10 dark:bg-[#34C759]/20", title: "Security", description: "Rigorous standards to protect sensitive data and ensure enterprise compliance." },
            { icon: "ph-strategy", iconColor: "text-[#FF2D55]", bgHover: "bg-[#FF2D55]/10 dark:bg-[#FF2D55]/20", title: "Leadership", description: "Technical strategy from initial planning to finalized deployment." }
        ]
    },
    skills: {
        title: "Technical Engine",
        groups: [
            {
                title: "Backend & Architecture",
                items: [
                    "Laravel / PHP",
                    "Distributed Systems",
                    "Database Design (SQL/NoSQL)",
                    "Data Pipelines & Integration"
                ]
            },
            {
                title: "Infrastructure & DevOps",
                items: [
                    "Cloud Platforms (AWS/GCP)",
                    "Docker & Kubernetes",
                    "CI/CD & Automation",
                    "System Security & Scaling"
                ]
            }
        ],
        tags: ["Microservices", "GraphQL", "Redis", "RabbitMQ", "Linux/Nginx"]
    },
    contact: {
        title: "Start a Project",
        description: "Looking for an experienced architect to scale your infrastructure? Let's discuss your technical challenges.",
        email: "me@chanchal.net",
        socialLinks: [
            { icon: "ph-github-logo", url: "https://github.com/net-chanchal", label: "GitHub" },
            { icon: "ph-linkedin-logo", url: "https://linkedin.com/in/net-chanchal", label: "LinkedIn" }
        ]
    },
    footer: {
        designer: "DESIGNED IN CALIFORNIA",
        copyrightName: "CHANCHAL"
    }
};
