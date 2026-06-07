const skillCategories = [
  {
    title: 'Languages',
    skills: ['Kotlin', 'Java', 'Python', 'C', 'C++', 'JavaScript', 'TypeScript'],
  },
  {
    title: 'Core Concepts',
    skills: ['Data Structures & Algorithms', 'Operating Systems', 'Computer Networks'],
  },
  {
    title: 'Security & Systems',
    skills: ['Authentication Systems', 'API Security', 'CTF Problem Solving', 'Linux'],
  },
  {
    title: 'Tools & Technologies',
    skills: ['Android Studio', 'Jetpack Compose', 'Git', 'GitHub', 'Firebase', 'MongoDB', 'Postman'],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-4">Skills</h2>
        <div 
          className="w-16 h-px mx-auto mb-16"
          style={{ backgroundColor: 'var(--divider-accent)' }}
        />

        <div className="grid md:grid-cols-2 gap-12">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 
                className="text-sm font-semibold uppercase tracking-widest mb-4 pb-2 border-b"
                style={{ borderColor: 'var(--border-color)' }}
              >
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm px-4 py-2 transition-all duration-200 cursor-default theme-tag"
                    style={{ 
                      backgroundColor: 'var(--bg-elevated)',
                      color: 'var(--text-secondary)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'var(--border-color)'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
