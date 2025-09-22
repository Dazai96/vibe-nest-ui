// Data randomizer for different app instances
export class DataRandomizer {
  private static instance: DataRandomizer;
  private seed: number;

  constructor() {
    this.seed = Date.now() + Math.random() * 1000;
  }

  static getInstance(): DataRandomizer {
    if (!DataRandomizer.instance) {
      DataRandomizer.instance = new DataRandomizer();
    }
    return DataRandomizer.instance;
  }

  // Simple seeded random number generator
  private seededRandom(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  // Get random item from array
  randomChoice<T>(array: T[]): T {
    return array[Math.floor(this.seededRandom() * array.length)];
  }

  // Get random number between min and max
  randomBetween(min: number, max: number): number {
    return Math.floor(this.seededRandom() * (max - min + 1)) + min;
  }

  // Get random boolean
  randomBoolean(): boolean {
    return this.seededRandom() > 0.5;
  }

  // Get random mood data
  getRandomMoodData() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map(day => ({
      day,
      mood: this.randomBetween(3, 9) + this.seededRandom()
    }));
  }

  // Get random user names
  getRandomUserNames() {
    const firstNames = [
      'Alex', 'Sam', 'Jordan', 'Taylor', 'Casey', 'Morgan', 'Riley', 'Avery',
      'Quinn', 'Sage', 'River', 'Phoenix', 'Blake', 'Cameron', 'Drew', 'Emery',
      'Finley', 'Hayden', 'Jamie', 'Kai', 'Lane', 'Parker', 'Reese', 'Skyler'
    ];
    
    const lastNames = [
      'Johnson', 'Smith', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
      'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez',
      'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin'
    ];

    return {
      firstName: this.randomChoice(firstNames),
      lastName: this.randomChoice(lastNames)
    };
  }

  // Get random post content
  getRandomPostContent() {
    const templates = [
      "Feeling grateful for the small moments today. What's something positive that happened to you recently?",
      "Struggling with anxiety lately. Any tips for managing stress during exam season?",
      "Had a great therapy session today. It's amazing how talking helps process emotions.",
      "Looking for study buddies! Anyone else preparing for finals?",
      "Mental health check-in: How is everyone doing today?",
      "Just discovered this amazing meditation app. Highly recommend for stress relief!",
      "Feeling overwhelmed with assignments. How do you all manage your workload?",
      "Celebrating small wins today! Completed all my tasks and feeling accomplished.",
      "Anyone else find comfort in music when feeling down? What's your go-to playlist?",
      "Grateful for this supportive community. You all make such a difference!",
      "Taking a mental health day today. Self-care is so important.",
      "Struggling with imposter syndrome lately. Anyone else experience this?",
      "Beautiful sunset walk today. Nature really helps clear my mind.",
      "Feeling proud of my progress in therapy. Recovery isn't linear but every step counts.",
      "Looking for book recommendations! What's the last book that really impacted you?",
      "Had a panic attack yesterday but I'm okay now. Thanks to everyone who reached out.",
      "Practicing mindfulness today. Even 5 minutes of meditation makes a difference.",
      "Feeling lonely but trying to remember that this feeling is temporary.",
      "Grateful for my support system. Who are the people that lift you up?",
      "Taking things one day at a time. Sometimes that's all we can do."
    ];

    return this.randomChoice(templates);
  }

  // Get random community names
  getRandomCommunityNames() {
    const communities = [
      'Study Buddies', 'Mental Health Warriors', 'Anxiety Support', 'Depression Recovery',
      'Mindfulness Masters', 'Stress Busters', 'Self-Care Squad', 'Wellness Warriors',
      'Exam Stress Relief', 'Campus Mental Health', 'Therapy Talk', 'Recovery Stories',
      'Positive Vibes', 'Mindful Students', 'Coping Strategies', 'Mental Wellness',
      'Support Circle', 'Healing Together', 'Mental Health Matters', 'Wellness Community'
    ];

    return this.randomChoice(communities);
  }

  // Get random mood colors
  getRandomMoodColors() {
    const moodColors = [
      { name: 'Happy', color: 'hsl(55, 95%, 65%)' },
      { name: 'Sad', color: 'hsl(220, 50%, 55%)' },
      { name: 'Anxious', color: 'hsl(45, 85%, 55%)' },
      { name: 'Calm', color: 'hsl(186, 85%, 45%)' },
      { name: 'Excited', color: 'hsl(330, 50%, 65%)' },
      { name: 'Frustrated', color: 'hsl(0, 75%, 60%)' },
      { name: 'Grateful', color: 'hsl(142, 65%, 50%)' },
      { name: 'Lonely', color: 'hsl(270, 75%, 60%)' }
    ];

    return this.randomChoice(moodColors);
  }

  // Get random statistics
  getRandomStats() {
    return {
      totalPosts: this.randomBetween(50, 500),
      totalUsers: this.randomBetween(1000, 10000),
      totalCommunities: this.randomBetween(20, 100),
      activeToday: this.randomBetween(100, 1000),
      moodAverage: this.randomBetween(6, 8) + this.seededRandom()
    };
  }

  // Get random achievement
  getRandomAchievement() {
    const achievements = [
      'First Post', 'Week Streak', 'Helper', 'Supporter', 'Mindful', 'Grateful',
      'Community Builder', 'Wellness Warrior', 'Stress Buster', 'Positive Thinker',
      'Meditation Master', 'Supportive Friend', 'Recovery Champion', 'Mental Health Advocate'
    ];

    return this.randomChoice(achievements);
  }

  // Get random quote
  getRandomQuote() {
    const quotes = [
      "You are not alone in this journey.",
      "Every small step counts towards healing.",
      "It's okay to not be okay sometimes.",
      "Your mental health matters.",
      "Progress, not perfection.",
      "You are stronger than you think.",
      "Healing is not linear, and that's okay.",
      "Self-care is not selfish.",
      "You deserve love and support.",
      "Tomorrow is a new opportunity to try again."
    ];

    return this.randomChoice(quotes);
  }
}

// Export singleton instance
export const dataRandomizer = DataRandomizer.getInstance();
