const education = [
  {
    year: '2023 - 2027',
    degree: 'Bachelor of Engineering',
    field: 'Computer Science - Data Science',
    school: 'Dayananda Sagar College of Engineering, Bengaluru',
    score: 'CGPA: 8.42',
  },
  {
    year: '2023',
    degree: 'Class 12',
    field: null,
    school: 'Satyam International School',
    score: '85.60%',
  },
  {
    year: '2021',
    degree: 'Class 10',
    field: null,
    school: 'Don Bosco Academy',
    score: '90.50%',
  },
];

export default function Education() {
  return (
    <section id="education" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-4">Education</h2>
        <div 
          className="w-16 h-px mx-auto mb-16"
          style={{ backgroundColor: 'var(--divider-accent)' }}
        />

        <div className="grid md:grid-cols-3 gap-6">
          {education.map((edu, index) => (
            <div
              key={index}
              className="p-6 transition-colors duration-300 theme-card"
              style={{ 
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: 'var(--border-color)'
              }}
            >
              <span 
                className="text-xs font-medium uppercase tracking-wider"
                style={{ color: 'var(--text-muted)' }}
              >
                {edu.year}
              </span>
              <h3 className="font-semibold text-lg mt-2 mb-1">{edu.degree}</h3>
              {edu.field && <p className="font-medium mb-1">{edu.field}</p>}
              <p 
                className="text-sm mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {edu.school}
              </p>
              <span 
                className="inline-block text-sm font-semibold px-2 py-1 theme-badge"
                style={{ 
                  backgroundColor: 'var(--accent-bg)',
                  color: 'var(--accent-text)'
                }}
              >
                {edu.score}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
