import { FaNewspaper, FaShieldAlt, FaUsers, FaGlobe, FaRobot } from "react-icons/fa";

const team = [
  {
    name: "MD. Naymur Rahman",
    role: "Founder & Editor in Chief",
    photo: "https://i.pravatar.cc/150?img=11",
    bio: "Experienced journalist with over 10 years in digital media and investigative reporting.",
  },
  {
    name: "Fatema Begum",
    role: "Senior Reporter",
    photo: "https://i.pravatar.cc/150?img=5",
    bio: "Covers politics, economy and international affairs with deep insight.",
  },
  {
    name: "Rahul Ahmed",
    role: "Tech & AI Editor",
    photo: "https://i.pravatar.cc/150?img=8",
    bio: "Specializes in technology, AI and digital transformation in Bangladesh.",
  },
];

const stats = [
  { icon: FaNewspaper, label: "News Published", value: "10,000+" },
  { icon: FaUsers, label: "Monthly Readers", value: "5M+" },
  { icon: FaGlobe, label: "Countries Reached", value: "50+" },
  { icon: FaShieldAlt, label: "Years of Trust", value: "8+" },
];

const About = () => {
  return (
    <div className="space-y-8 pb-10">

      {/* Hero */}
      <div className="bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-8 text-white text-center">
        <h1 className="text-3xl font-bold mb-3">About The Dragon News</h1>
        <p className="text-red-100 text-sm max-w-xl mx-auto leading-relaxed">
          One of Bangladesh's most trusted digital news portals — delivering
          truthful, unbiased and responsible journalism since 2016.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-base-100 dark:bg-gray-800 rounded-xl p-6 border border-base-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-3 dark:text-white flex items-center gap-2">
          <FaShieldAlt className="text-red-500" />
          Our Mission
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          The Dragon News is committed to delivering accurate, fair and
          independent news to millions of readers across Bangladesh and around
          the world. We believe journalism is the fourth pillar of democracy —
          and we take that responsibility seriously.
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-3">
          Our platform is built entirely in the <strong>Bengali language (বাংলা)</strong>,
          making quality journalism accessible to every Bangladeshi regardless
          of their English proficiency. We are proud to serve our mother tongue
          and the people who speak it.
        </p>
      </div>

      {/* AI Feature Highlight */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 text-white flex gap-4 items-start">
        <div className="bg-blue-500/20 p-3 rounded-xl border border-blue-400/30 shrink-0">
          <FaRobot className="text-blue-400 text-2xl" />
        </div>
        <div>
          <h3 className="font-bold text-lg mb-1">AI-Powered Fake News Detector</h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            We are one of the first Bangladeshi news portals to integrate an
            AI-powered fake news detection system. Built on{" "}
            <strong className="text-blue-400">SVM + BanglaBERT + Llama 70B</strong>,
            our detector analyzes Bengali news text and classifies it as
            authentic, fake, or AI-generated. This tool empowers readers to
            verify news before sharing — fighting misinformation at its root.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ icon: Icon, label, value }) => (
          <div
            key={label}
            className="bg-base-100 dark:bg-gray-800 rounded-xl p-4 text-center border border-base-200 dark:border-gray-700"
          >
            <Icon className="text-red-500 text-2xl mx-auto mb-2" />
            <p className="text-2xl font-bold dark:text-white">{value}</p>
            <p className="text-xs text-gray-500 mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Why Bengali */}
      <div className="bg-base-100 dark:bg-gray-800 rounded-xl p-6 border border-base-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-3 dark:text-white">
          Why Bengali? বাংলা কেন?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
          Bengali is spoken by over <strong>230 million people</strong> worldwide,
          making it one of the most widely spoken languages on earth. Yet,
          quality digital journalism in Bengali remains limited. The Dragon News
          was founded to bridge this gap — bringing world-class news coverage
          to Bengali-speaking communities globally.
        </p>
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mt-3">
          From breaking news to sports, entertainment to technology — every
          article on our platform is crafted in Bengali, for Bengali speakers.
          Our AI tools are also specifically trained on Bengali text, making us
          a truly language-first news platform.
        </p>
      </div>

      {/* Team */}
      <div>
        <h2 className="text-xl font-bold mb-4 dark:text-white">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-base-100 dark:bg-gray-800 rounded-xl p-5 border border-base-200 dark:border-gray-700 text-center"
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover mx-auto mb-3 border-2 border-red-300"
              />
              <h3 className="font-bold text-sm dark:text-white">{member.name}</h3>
              <p className="text-xs text-red-500 font-medium mb-2">{member.role}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-base-100 dark:bg-gray-800 rounded-xl p-6 border border-base-200 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
          <div>
            <p className="font-semibold dark:text-white mb-1">Address</p>
            <p>123 Media Tower, Motijheel</p>
            <p>Dhaka - 1000, Bangladesh</p>
          </div>
          <div>
            <p className="font-semibold dark:text-white mb-1">Email</p>
            <p>info@dragonnews.com</p>
            <p>news@dragonnews.com</p>
          </div>
          <div>
            <p className="font-semibold dark:text-white mb-1">Phone</p>
            <p>+880 2-9876543</p>
            <p>+880 1712-345678</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;