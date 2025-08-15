import { AssessmentQuestion } from '@/types/assessment';

export const assessmentQuestions: AssessmentQuestion[] = [
  // Psychometric Section (10 questions)
  {
    id: 'psych_1',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'openness',
    question: 'I enjoy exploring new technologies and learning about emerging trends.',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' },
    weight: 1.2
  },
  {
    id: 'psych_2',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'conscientiousness',
    question: 'I prefer working with structured, well-defined technical specifications.',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' },
    weight: 1.0
  },
  {
    id: 'psych_3',
    type: 'multiple-choice',
    category: 'psychometric',
    subcategory: 'cognitive_style',
    question: 'When faced with a complex system problem, I prefer to:',
    options: [
      'Break it down into smaller, manageable components',
      'Look at the big picture first, then dive into details',
      'Research similar problems and adapt existing solutions',
      'Experiment with different approaches until something works'
    ],
    weight: 1.3
  },
  {
    id: 'psych_4',
    type: 'likert',
    category: 'psychometric',
    subcategory: 'motivation',
    question: 'I would pursue edge cloud architecture even if it required 6-12 months of intensive learning.',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' },
    weight: 1.5
  },
  {
    id: 'psych_5',
    type: 'multiple-choice',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'Which type of technology challenges excite you most?',
    options: [
      'Optimizing system performance and reducing latency',
      'Designing user interfaces and experiences',
      'Managing data and databases',
      'Building secure authentication systems'
    ],
    weight: 1.4
  },

  // Technical/Aptitude Section (8 questions)
  {
    id: 'tech_1',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'networking',
    question: 'What is the primary advantage of processing data at the edge rather than in a centralized cloud?',
    options: [
      'Lower costs',
      'Reduced latency and faster response times',
      'Better user interface design',
      'Easier data backup'
    ],
    weight: 1.5
  },
  {
    id: 'tech_2',
    type: 'multiple-choice',
    category: 'technical',
    subcategory: 'architecture',
    question: 'In a distributed edge network, what happens when one edge node fails?',
    options: [
      'The entire system shuts down',
      'Traffic is rerouted to other available nodes',
      'All data is lost permanently',
      'The central cloud takes over all processing'
    ],
    weight: 1.3
  },
  {
    id: 'aptitude_1',
    type: 'multiple-choice',
    category: 'aptitude',
    subcategory: 'logic',
    question: 'If latency increases by 10ms for each network hop, and your data travels through 5 hops, what is the total additional latency?',
    options: ['25ms', '40ms', '50ms', '60ms'],
    weight: 1.0
  },
  {
    id: 'tech_3',
    type: 'scenario',
    category: 'technical',
    subcategory: 'problem_solving',
    question: 'A smart factory needs real-time monitoring of 1000 sensors with response times under 5ms. How would you architect this system?',
    options: [
      'Send all data to a central cloud for processing',
      'Deploy edge computing nodes near sensor clusters',
      'Use a single powerful server in the factory',
      'Process everything on each individual sensor'
    ],
    weight: 1.6
  },

  // WISCAR Framework (12 questions - 2 per dimension)
  {
    id: 'wiscar_will_1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I consistently work through complex technical problems, even when the solution isn\'t immediately obvious.',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' },
    weight: 1.2
  },
  {
    id: 'wiscar_will_2',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'will',
    question: 'I stay motivated when working on long-term technical projects with uncertain outcomes.',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' },
    weight: 1.2
  },
  {
    id: 'wiscar_interest_1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'Edge computing and IoT systems fascinate me more than traditional web development.',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' },
    weight: 1.4
  },
  {
    id: 'wiscar_interest_2',
    type: 'multiple-choice',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'Which scenario sounds most interesting to work on?',
    options: [
      'Autonomous vehicle communication systems',
      'Social media platform features',
      'E-commerce checkout optimization',
      'Corporate HR management systems'
    ],
    weight: 1.3
  },
  {
    id: 'wiscar_skill_1',
    type: 'multiple-choice',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'How comfortable are you with Linux command line operations?',
    options: [
      'Expert - I use advanced commands and scripting daily',
      'Intermediate - I can navigate and perform basic operations',
      'Beginner - I know a few basic commands',
      'Novice - I rarely or never use command line'
    ],
    weight: 1.3
  },
  {
    id: 'wiscar_cognitive_1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'cognitive',
    question: 'You need to design a system where 100 smart cameras must process video in real-time. How do you approach this?',
    options: [
      'Start by understanding the specific latency and processing requirements',
      'Research what hardware specifications the cameras need',
      'Look for existing similar implementations to adapt',
      'Begin by testing with a small prototype setup'
    ],
    weight: 1.4
  },
  {
    id: 'wiscar_ability_1',
    type: 'likert',
    category: 'wiscar',
    subcategory: 'ability',
    question: 'I learn effectively from failure and use setbacks to improve my technical approach.',
    likertLabels: { min: 'Strongly Disagree', max: 'Strongly Agree' },
    weight: 1.2
  },
  {
    id: 'wiscar_real_world_1',
    type: 'multiple-choice',
    category: 'wiscar',
    subcategory: 'realWorld',
    question: 'What do you think is the most important skill for an Edge Cloud Architect?',
    options: [
      'Understanding distributed systems and networking',
      'Advanced programming in multiple languages',
      'Project management and team leadership',
      'Understanding business requirements and costs'
    ],
    weight: 1.3
  }
];

export const sectionTitles = {
  psychometric: 'Personality & Motivation Assessment',
  technical: 'Technical Knowledge Evaluation',
  aptitude: 'Problem-Solving Aptitude',
  wiscar: 'WISCAR Framework Analysis'
};

export const sectionDescriptions = {
  psychometric: 'Understanding your personality traits, cognitive style, and motivation for edge cloud architecture.',
  technical: 'Evaluating your current technical knowledge and understanding of edge computing concepts.',
  aptitude: 'Testing your logical reasoning and problem-solving abilities.',
  wiscar: 'Comprehensive evaluation of Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world fit.'
};