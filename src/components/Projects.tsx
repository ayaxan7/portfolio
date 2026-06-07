const projects = [
  {
    title: 'Abhaya',
    subtitle: 'Secure Emergency Response System',
    description:
      'A real-time secure alert system ensuring reliability even when the application is inactive. Features event-driven communication pipelines for emergency notifications using background services and Firebase Cloud Messaging for low-latency alert delivery.',
    tech: ['Kotlin', 'Firebase', 'Accessibility Services'],
    github: 'https://github.com/ayaxan7',
  },
  {
    title: 'BetterMux',
    subtitle: 'Distributed Storage System',
    description:
      'A lightweight cloud-like storage system with Unix-like command interface (ls, cd, cat) for interacting with remote storage. Features client-server architecture for secure file operations and structured data access.',
    tech: ['Android', 'MongoDB', 'Retrofit', 'Node.js'],
    github: 'https://github.com/ayaxan7',
  },
  {
    title: 'Transport Tracker',
    subtitle: 'IoT-Based Tracking System',
    description:
      'Real-time tracking system using ESP32 and NEO-6M GPS module for continuous location acquisition. Features periodic data polling and transmission pipeline with hardware-to-server communication using REST APIs.',
    tech: ['Node.js', 'N8N', 'ESP32', 'Neo-6M'],
    github: 'https://github.com/ayaxan7',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-4">Projects</h2>
        <div className="w-16 h-px bg-white mx-auto mb-16" />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <article
              key={index}
              className="bg-gray-900 border border-gray-800 p-8 hover:border-gray-600 hover:-translate-y-1 transition-all duration-300"
            >
              <h3 className="font-serif text-2xl mb-1">{project.title}</h3>
              <p className="text-sm text-gray-400 uppercase tracking-wider mb-6">{project.subtitle}</p>
              <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2 py-1 bg-gray-800 text-gray-300 border border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-gray-400 transition-colors group"
              >
                View on GitHub
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
