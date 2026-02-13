export const EXPERIENCES = [
  {
    slug: "grab-software-developer-intern",
    date: "May 2027 - Oct 2027",
    title: "Software Developer Intern",
    org: "Grab",
    website: "https://www.grab.com/sg/",
    image: "/images/Grab.png",
    summary: "Built and delivered production-facing backend and frontend features in an agile sprint environment.",
    detail:
      "Worked on full-stack delivery for internal and user-facing modules by implementing Flask REST features and responsive UI components. Handled defect triage and validation by reproducing bugs, identifying root causes, and verifying fixes before release.",
    highlights: [
      "Implemented API and UI tasks through Git/PR workflows within sprint timelines.",
      "Performed issue reproduction and validation to improve release stability.",
      "Collaborated with teammates to keep integration behavior consistent end-to-end.",
    ],
  },
  {
    slug: "nk-robotics-part-time-instructor",
    date: "Jan 2025 - Present",
    title: "Part-time Instructor",
    org: "NK Robotics",
    website: "https://nkr.sg/",
    image: "/images/NKRobotics.png",
    summary: "Delivered coding and robotics instruction for mixed-ability learners in structured class settings.",
    detail:
      "Planned and ran practical coding/robotics lessons for more than 30 students across different skill levels. Focused heavily on debugging fundamentals, logical breakdown of problems, and clear communication so learners could fix issues independently.",
    highlights: [
      "Taught robotics and coding lessons to large mixed-ability class groups.",
      "Guided students with step-by-step debugging and problem decomposition.",
      "Adapted technical explanations based on learner pace and understanding.",
    ],
  },
  {
    slug: "nullspace-stem-instructor-intern",
    date: "Dec 2024 - Present",
    title: "STEM Instructor / Software Developer Intern",
    org: "Nullspace Robotics",
    website: "https://sg.nullspace.co/",
    image: "/images/Nullspace.png",
    summary: "Supported robotics and coding sessions while providing targeted technical troubleshooting.",
    detail:
      "Worked closely with learners during class and workshop sessions by diagnosing coding and hardware-related issues, offering actionable fixes, and reinforcing good technical habits. Also supported implementation-focused activities tied to robotics education.",
    highlights: [
      "Troubleshot technical issues in live classroom and workshop environments.",
      "Provided targeted feedback to improve student implementation quality.",
      "Supported lesson delivery and practical robotics activities.",
    ],
  },
  {
    slug: "tinkercademy-teaching-assistant-intern",
    date: "Nov 2023",
    title: "Teaching Assistant (Intern)",
    org: "Tinkercademy",
    website: "https://tinkercademy.com/",
    image: "/images/Tinkercadamy.png",
    summary: "Assisted instructors and participants during coding/tinkering sessions.",
    detail:
      "Contributed to programme facilitation by monitoring participants, answering implementation questions, and ensuring learners stayed on task during guided technical activities.",
    highlights: [
      "Monitored participant progress during coding sessions.",
      "Provided immediate support for setup and implementation blockers.",
      "Helped maintain class flow through active facilitation.",
    ],
  },
];

export const VOLUNTEER_EXPERIENCES = [
  {
    date: "2023",
    title: "Participant",
    org: "National Library Board",
    detail: "Promoted the NLB app and supported members of the public in using it effectively.",
  },
  {
    date: "2023",
    title: "Participant",
    org: "Make-A-Wish Singapore",
    detail: "Supported booth operations and school-wide outreach activities.",
  },
  {
    date: "2022",
    title: "Participant",
    org: "Elderly Centre",
    detail: "Supported residents through engagement activities and assisted staff with caregiving duties.",
  },
];

export function getExperienceBySlug(slug) {
  return EXPERIENCES.find((item) => item.slug === slug);
}
