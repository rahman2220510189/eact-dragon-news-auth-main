import { useState } from "react";
import {
  FaBriefcase,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaClock,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const jobs = [
  {
    id: 1,
    title: "Senior Reporter",
    department: "News",
    location: "Dhaka, Bangladesh",
    type: "Full Time",
    salary: "BDT 50,000 - 70,000",
    description:
      "We are looking for an experienced Senior Reporter with deep knowledge in politics, economy and international affairs to join our growing newsroom.",
    requirements: [
      "Minimum 5 years of journalism experience",
      "Proficiency in both Bengali and English",
      "Ability to write fast and accurately under deadline",
      "Strong understanding of digital media",
    ],
  },
  {
    id: 2,
    title: "Frontend Developer",
    department: "Technology",
    location: "Dhaka / Remote",
    type: "Full Time",
    salary: "BDT 60,000 - 90,000",
    description:
      "We need a skilled Frontend Developer to help build and improve our news portal. You will work with React, Tailwind CSS and our REST API backend.",
    requirements: [
      "2+ years of experience with React.js",
      "Strong knowledge of Tailwind CSS",
      "Experience with REST API integration",
      "Proficiency with Git version control",
    ],
  },
  {
    id: 3,
    title: "Video Journalist",
    department: "Multimedia",
    location: "Dhaka, Bangladesh",
    type: "Full Time",
    salary: "BDT 40,000 - 60,000",
    description:
      "We are hiring a Video Journalist to create and edit compelling video content for our digital platforms and social media channels.",
    requirements: [
      "2+ years of video editing experience",
      "Proficiency in Adobe Premiere or DaVinci Resolve",
      "Experience with camera operation",
      "Creative storytelling skills",
    ],
  },
  {
    id: 4,
    title: "Social Media Manager",
    department: "Marketing",
    location: "Dhaka / Remote",
    type: "Part Time",
    salary: "BDT 25,000 - 35,000",
    description:
      "We are looking for a creative Social Media Manager to grow and manage our presence across Facebook, Instagram, X and YouTube.",
    requirements: [
      "1+ year of social media marketing experience",
      "Creative content creation skills",
      "Familiarity with analytics tools",
      "Passion for staying on top of trends",
    ],
  },
];

const JobCard = ({ job }) => {
  const [open, setOpen] = useState(false);
  const [applied, setApplied] = useState(false);

  return (
    <div className="bg-base-100 dark:bg-gray-800 rounded-xl border border-base-200 dark:border-gray-700 overflow-hidden">

      {/* Job Header */}
      <div
        className="p-5 cursor-pointer hover:bg-base-200 dark:hover:bg-gray-700 transition"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <h3 className="font-bold text-base dark:text-white">{job.title}</h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                job.type === "Full Time"
                  ? "bg-green-100 text-green-600"
                  : "bg-yellow-100 text-yellow-600"
              }`}>
                {job.type}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <FaBriefcase className="text-red-400" /> {job.department}
              </span>
              <span className="flex items-center gap-1">
                <FaMapMarkerAlt className="text-red-400" /> {job.location}
              </span>
              <span className="flex items-center gap-1">
                <FaMoneyBillWave className="text-red-400" /> {job.salary}
              </span>
            </div>
          </div>
          <div className="text-gray-400 shrink-0 mt-1">
            {open ? <FaChevronUp /> : <FaChevronDown />}
          </div>
        </div>
      </div>

      {/* Expandable Details */}
      {open && (
        <div className="px-5 pb-5 border-t border-base-200 dark:border-gray-700 pt-4">
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            {job.description}
          </p>
          <h4 className="font-semibold text-sm dark:text-white mb-2">
            Requirements:
          </h4>
          <ul className="space-y-1.5 mb-5">
            {job.requirements.map((req, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
              >
                <span className="text-red-500 mt-0.5 shrink-0">✓</span>
                {req}
              </li>
            ))}
          </ul>

          {applied ? (
            <div className="bg-green-50 border border-green-300 text-green-600 text-sm rounded-lg px-4 py-2 text-center">
              ✅ Application submitted successfully!
            </div>
          ) : (
            <button
              onClick={() => setApplied(true)}
              className="btn w-full bg-red-500 hover:bg-red-600 text-white border-none rounded-lg text-sm"
            >
              Apply Now
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const Career = () => {
  return (
    <div className="space-y-6 pb-10">

      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 text-white">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Career Opportunities</h1>
        <p className="text-gray-300 text-sm max-w-lg leading-relaxed">
          Join The Dragon News and help shape the future of Bengali journalism.
          We are always looking for passionate, talented people to grow with us.
        </p>
        <div className="flex items-center gap-2 mt-4 text-xs text-gray-400">
          <FaClock className="text-red-400" />
          <span>{jobs.length} open positions available</span>
        </div>
      </div>

      {/* Why Join Us */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          {
            title: "Competitive Salary",
            desc: "We offer market-competitive compensation packages with performance bonuses.",
          },
          {
            title: "Career Growth",
            desc: "Regular training, skill development programs and clear growth paths.",
          },
          {
            title: "Flexible Hours",
            desc: "Flexible schedules and remote work options depending on your role.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-base-100 dark:bg-gray-800 rounded-xl p-4 border border-base-200 dark:border-gray-700"
          >
            <h3 className="font-bold text-sm mb-1 text-red-500">{item.title}</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Job Listings */}
      <div>
        <h2 className="text-xl font-bold mb-4 dark:text-white">Open Positions</h2>
        <div className="flex flex-col gap-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Career;