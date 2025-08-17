import { FaGithub, FaBluesky, FaHeart } from "react-icons/fa6";

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/koh-tom",
    icon: FaGithub,
    className: "text-gray-400 hover:text-white transition-colors",
  },
  {
    name: "BlueSky",
    url: "https://bsky.app/profile/coysdaje.bsky.social",
    icon: FaBluesky,
    className: "text-blue-500 hover:text-blue-400 transition-colors",
  },
];

export const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-8 px-4 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* コピーライト */}
        <div className="text-sm text-center md:text-left">
          &copy; {new Date().getFullYear()} Koh TOMITA. 2025. All rights
          reserved.
        </div>

        {/* リンク */}
        <div className="flex gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={link.className}
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>

        {/* 技術スタック */}
        <div className="text-sm text-center md:text-right flex items-center gap-2">
          <span>Built with</span>
          Next.js, TypeScript, Ruby on Rails で構築
        </div>
      </div>
    </footer>
  );
};
