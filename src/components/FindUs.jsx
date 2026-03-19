import { FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";

// Social media links — update hrefs with real URLs later
const socialLinks = [
  { icon: <FaFacebook className="text-blue-600" />, label: "Facebook", href: "#" },
  { icon: <FaXTwitter className="text-black dark:text-white" />, label: "Twitter / X", href: "#" },
  { icon: <FaInstagram className="text-pink-500" />, label: "Instagram", href: "#" },
];

const FindUs = () => {
  return (
    <div>
      <h2 className="font-semibold mb-3">Find Us On</h2>
      <div className="join flex join-vertical w-full">
        {socialLinks.map(({ icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="btn join-item justify-start bg-base-100 border border-base-200 hover:bg-red-50 hover:text-red-500 transition"
          >
            {icon}
            {label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default FindUs;