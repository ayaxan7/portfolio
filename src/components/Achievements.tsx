const achievements = [
  {
    title: 'NPTEL Elite + Top 5%',
    description: 'Fundamentals of Object Oriented Programming (IIT Roorkee)',
    detail: 'Scored 90% - Top 5% nationwide',
    featured: false,
  },
  {
    title: 'Top 7 National Finalist',
    description: 'Smart India Hackathon 2025',
    detail: 'Team Leader - AI-powered IoT Bus Tracker',
    featured: true,
  },
  {
    title: 'Winner',
    description: 'CTF-DSCE Phoenix 2024',
    detail: '1st Place - Cybersecurity Competition',
    featured: false,
  },
  {
    title: 'First Runner-Up',
    description: 'BMC 2024',
    detail: 'IoT + Android solution for travelers',
    featured: false,
  },
  {
    title: 'First Runner-Up',
    description: 'Ideathon 2023',
    detail: 'Electric vehicles & public transport pitch',
    featured: false,
  },
  {
    title: 'Second Runner-Up',
    description: 'Lovable Vibe Hacks 2025',
    detail: '3rd Place - Hackathon',
    featured: false,
  },
];

function StarIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87l1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87l6.91-1.01L12 2z" />
    </svg>
  );
}

function MedalIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89L17 22l-5-3l-5 3l1.523-9.11" />
    </svg>
  );
}

export default function Achievements() {
  return (
    <section 
      id="achievements" 
      className="py-24"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="font-serif text-4xl md:text-5xl text-center mb-4">Achievements</h2>
        <div 
          className="w-16 h-px mx-auto mb-16"
          style={{ backgroundColor: 'var(--divider-accent)' }}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-6 text-center transition-all duration-300 ${
                achievement.featured ? '' : 'theme-card'
              }`}
              style={
                achievement.featured
                  ? { backgroundColor: 'var(--featured-bg)', color: 'var(--featured-text)' }
                  : { 
                      backgroundColor: 'var(--bg-card)',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'var(--border-color)'
                    }
              }
            >
              <div className="mb-4 flex justify-center">
                {achievement.featured ? <StarIcon /> : <MedalIcon />}
              </div>
              <h3 className="font-semibold text-base mb-1">{achievement.title}</h3>
              <p 
                className="text-sm mb-2"
                style={{ color: achievement.featured ? 'var(--featured-muted)' : 'var(--text-secondary)' }}
              >
                {achievement.description}
              </p>
              <span
                className="inline-block text-xs px-2 py-1"
                style={
                  achievement.featured
                    ? { backgroundColor: 'var(--featured-badge-bg)', color: 'var(--featured-badge-text)' }
                    : { backgroundColor: 'var(--bg-elevated)', color: 'var(--text-secondary)' }
                }
              >
                {achievement.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
