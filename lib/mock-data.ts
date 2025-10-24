export interface User {
  rank: number
  username: string
  avatar: string
  videos: number
  streak: number
  earnings: number
  niniScore: number
  verified?: boolean
  recentVideos?: {
    title: string
    views: number
    earnings: number
    date: string
  }[]
  badges?: string[]
}

export const mockUsers: User[] = [
  {
    rank: 1,
    username: "viral_queen",
    avatar: "/nato-desatado.png",
    videos: 847,
    streak: 156,
    earnings: 12847,
    niniScore: 9.8,
    verified: true,
    recentVideos: [
      { title: "Morning Routine 2025", views: 45000, earnings: 450, date: "2025-01-04" },
      { title: "Get Ready With Me", views: 38000, earnings: 380, date: "2025-01-03" },
      { title: "Day in My Life", views: 52000, earnings: 520, date: "2025-01-02" },
    ],
    badges: ["Top Creator", "Consistency King", "Viral Master"],
  },
  {
    rank: 2,
    username: "crypto_ninja",
    avatar: "/byron-pixel.png",
    videos: 723,
    streak: 142,
    earnings: 11234,
    niniScore: 9.6,
    verified: true,
    recentVideos: [
      { title: "Crypto News Today", views: 42000, earnings: 420, date: "2025-01-04" },
      { title: "Bitcoin Analysis", views: 39000, earnings: 390, date: "2025-01-03" },
      { title: "Trading Tips", views: 44000, earnings: 440, date: "2025-01-02" },
    ],
    badges: ["Top Creator", "Finance Expert"],
  },
  {
    rank: 3,
    username: "meme_lord",
    avatar: "/byron-mecha.png",
    videos: 691,
    streak: 138,
    earnings: 10567,
    niniScore: 9.4,
    verified: true,
    recentVideos: [
      { title: "Meme Compilation #47", views: 55000, earnings: 550, date: "2025-01-04" },
      { title: "Funny Moments", views: 48000, earnings: 480, date: "2025-01-03" },
      { title: "Best Memes 2025", views: 51000, earnings: 510, date: "2025-01-02" },
    ],
    badges: ["Top Creator", "Viral Master", "Comedy King"],
  },
  {
    rank: 4,
    username: "tech_guru",
    avatar: "/nato-desatado.png",
    videos: 634,
    streak: 129,
    earnings: 9823,
    niniScore: 9.2,
    recentVideos: [
      { title: "iPhone 16 Review", views: 38000, earnings: 380, date: "2025-01-04" },
      { title: "Best Tech 2025", views: 41000, earnings: 410, date: "2025-01-03" },
      { title: "Gadget Unboxing", views: 36000, earnings: 360, date: "2025-01-02" },
    ],
    badges: ["Tech Expert", "Consistency King"],
  },
  {
    rank: 5,
    username: "fitness_beast",
    avatar: "/byron-pixel.png",
    videos: 589,
    streak: 121,
    earnings: 9156,
    niniScore: 9.0,
    recentVideos: [
      { title: "Full Body Workout", views: 35000, earnings: 350, date: "2025-01-04" },
      { title: "Meal Prep Sunday", views: 32000, earnings: 320, date: "2025-01-03" },
      { title: "Gym Motivation", views: 37000, earnings: 370, date: "2025-01-02" },
    ],
    badges: ["Fitness Pro", "Consistency King"],
  },
  {
    rank: 6,
    username: "food_explorer",
    avatar: "/byron-mecha.png",
    videos: 542,
    streak: 115,
    earnings: 8734,
    niniScore: 8.8,
    recentVideos: [
      { title: "Best Tacos in Town", views: 31000, earnings: 310, date: "2025-01-04" },
      { title: "Cooking Challenge", views: 29000, earnings: 290, date: "2025-01-03" },
      { title: "Food Review", views: 33000, earnings: 330, date: "2025-01-02" },
    ],
    badges: ["Foodie Expert"],
  },
  {
    rank: 7,
    username: "travel_addict",
    avatar: "/nato-desatado.png",
    videos: 498,
    streak: 108,
    earnings: 8291,
    niniScore: 8.6,
    recentVideos: [
      { title: "Bali Travel Guide", views: 28000, earnings: 280, date: "2025-01-04" },
      { title: "Hidden Gems", views: 26000, earnings: 260, date: "2025-01-03" },
      { title: "Travel Vlog", views: 30000, earnings: 300, date: "2025-01-02" },
    ],
    badges: ["Travel Expert"],
  },
  {
    rank: 8,
    username: "gaming_pro",
    avatar: "/byron-pixel.png",
    videos: 467,
    streak: 102,
    earnings: 7845,
    niniScore: 8.4,
    recentVideos: [
      { title: "Fortnite Highlights", views: 34000, earnings: 340, date: "2025-01-04" },
      { title: "Gaming Setup Tour", views: 27000, earnings: 270, date: "2025-01-03" },
      { title: "Best Plays", views: 31000, earnings: 310, date: "2025-01-02" },
    ],
    badges: ["Gaming Legend"],
  },
  {
    rank: 9,
    username: "fashion_icon",
    avatar: "/byron-mecha.png",
    videos: 423,
    streak: 95,
    earnings: 7412,
    niniScore: 8.2,
    recentVideos: [
      { title: "Outfit of the Day", views: 25000, earnings: 250, date: "2025-01-04" },
      { title: "Fashion Haul", views: 23000, earnings: 230, date: "2025-01-03" },
      { title: "Style Tips", views: 26000, earnings: 260, date: "2025-01-02" },
    ],
    badges: ["Style Icon"],
  },
  {
    rank: 10,
    username: "study_master",
    avatar: "/nato-desatado.png",
    videos: 389,
    streak: 89,
    earnings: 6978,
    niniScore: 8.0,
    recentVideos: [
      { title: "Study With Me", views: 22000, earnings: 220, date: "2025-01-04" },
      { title: "Productivity Tips", views: 20000, earnings: 200, date: "2025-01-03" },
      { title: "Exam Prep", views: 24000, earnings: 240, date: "2025-01-02" },
    ],
    badges: ["Study Pro"],
  },
]
