const experiences = [
  {
    title: 'Full Stack Android Developer',
    company: 'Bid.AI',
    date: 'Oct 2025 - Present',
    type: 'Internship',
    details: [
      'Architected multi-format file export with Puppeteer, EJS templating, ExcelJS, and csv-writer for structured data processing',
      'Built secure in-app bill sharing flow integrating backend services and external APIs',
      'Implemented Razorpay-based subscription system ensuring secure payment processing and backend verification',
      'Integrated real-time analytical systems using Jetpack Compose for structured data visualization',
    ],
  },
  {
    title: 'App Development Mentor',
    company: 'Tutedude',
    date: 'Oct 2025 - Present',
    type: 'Freelance',
    details: [
      'Mentoring students in building applications using Kotlin, focusing on system design, architecture, and debugging',
      'Conducting sessions on MVVM architecture, state management, and API integration',
      'Guided students in building scalable and efficient systems using modern development practices',
    ],
  },
  {
    title: 'Full Stack Mobile Developer',
    company: 'Dealora',
    date: 'Dec 2025 - Feb 2026',
    type: 'Freelance',
    details: [
      'Developed end-to-end coupon and notification system using Kotlin, Jetpack Compose, Node.js, and Express.js',
      'Implemented push notification architecture with Firebase Cloud Messaging (FCM)',
      'Designed and integrated REST APIs and backend features',
    ],
  },
  {
    title: 'Mobile Application Developer',
    company: 'XeA Innovations',
    date: 'Feb 2025 - Apr 2025',
    type: 'Internship',
    details: [
      'Built applications using Kotlin, Jetpack Compose, and MVVM with real-time location tracking',
      'Implemented REST APIs with Express.js, focusing on secure communication using Retrofit',
    ],
  },
  {
    title: 'Android Developer',
    company: 'BlinkFind',
    date: 'Sept 2024 - Dec 2024',
    type: 'Internship',
    details: [
      'Implemented OTP-based authentication using Firebase Authentication',
      'Optimized performance by 30% using Dependency Injection (Hilt)',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-4">Experience</h2>
        <div className="w-16 h-px bg-black mx-auto mb-16" />

        <div className="relative pl-8 border-l border-gray-300">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pb-12 last:pb-0">
              {/* Timeline marker */}
              <div className="absolute -left-[calc(2rem+4px)] top-1.5 w-2 h-2 bg-white border border-black rounded-full" />

              <div className="bg-white border border-gray-200 p-6 hover:border-black transition-colors duration-300">
                <div className="mb-4">
                  <h3 className="font-semibold text-lg">{exp.title}</h3>
                  <span className="block font-medium text-black">{exp.company}</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <span className="text-sm text-gray-500">{exp.date}</span>
                    <span className="text-sm text-gray-500 px-2 py-0.5 bg-gray-100">{exp.type}</span>
                  </div>
                </div>

                <ul className="space-y-2 pl-4">
                  {exp.details.map((detail, idx) => (
                    <li key={idx} className="relative text-gray-600 text-sm leading-relaxed before:content-[''] before:absolute before:-left-4 before:top-2.5 before:w-1 before:h-px before:bg-gray-400">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
