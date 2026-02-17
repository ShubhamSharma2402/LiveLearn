// js/store.js

// Sample users
export const users = [
  { id: "u1", name: "Shubham Sharma", email: "shubham@example.com", role: "learner" },
  { id: "u2", name: "Aman Verma", email: "aman@example.com", role: "host" },
  { id: "u3", name: "Priya Singh", email: "priya@example.com", role: "learner" },
  { id: "u4", name: "Rahul Mehta", email: "rahul@example.com", role: "host" },
];

// Sample sessions
export const sessions = [
  {
    id: "s1",
    title: "Advanced React Patterns for Production Apps",
    description: "Learn scalable React architecture used in startups.",
    hostId: "u2",
    hostName: "Aman Verma",
    hostAvatar: "https://i.pravatar.cc/150?img=11",
    category: "Web Development",
    price: 899,
    duration: "2h 30m",
    rating: 4.8,
    totalStudents: 124,
    date: "2026-03-18T18:00:00",
    image: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "s2",
    title: "Data Science with Python: Beginner to Advanced",
    description: "Master Python data science libraries & techniques.",
    hostId: "u4",
    hostName: "Rahul Mehta",
    hostAvatar: "https://i.pravatar.cc/150?img=12",
    category: "Data Science",
    price: 1299,
    duration: "3h",
    rating: 4.6,
    totalStudents: 98,
    date: "2026-03-20T15:00:00",
    image: "https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "s3",
    title: "UI/UX Design Fundamentals",
    description: "Design beautiful and intuitive user interfaces.",
    hostId: "u2",
    hostName: "Aman Verma",
    hostAvatar: "https://i.pravatar.cc/150?img=11",
    category: "Design",
    price: 599,
    duration: "1h 45m",
    rating: 4.7,
    totalStudents: 74,
    date: "2026-03-22T14:00:00",
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
  },
  {
    id: "s4",
    title: "Fullstack Web Development Bootcamp",
    description: "Become a fullstack developer with hands-on projects.",
    hostId: "u4",
    hostName: "Rahul Mehta",
    hostAvatar: "https://i.pravatar.cc/150?img=12",
    category: "Web Development",
    price: 1599,
    duration: "5h",
    rating: 4.9,
    totalStudents: 210,
    date: "2026-03-25T10:00:00",
    image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800"
  }
];

// Sample bookings
export const bookings = [
  { id: "b1", userId: "u1", hostId: "u2", sessionId: "s1", price: 899, date: "2026-02-16T12:00:00" },
  { id: "b2", userId: "u3", hostId: "u4", sessionId: "s2", price: 1299, date: "2026-02-16T13:00:00" }
];

// Sample reviews
export const reviews = [
  { id: "r1", userId: "u1", sessionId: "s1", rating: 5, comment: "Amazing session!" },
  { id: "r2", userId: "u3", sessionId: "s2", rating: 4, comment: "Very informative." },
  { id: "r3", userId: "u1", sessionId: "s3", rating: 4, comment: "Great design tips!" }
];
