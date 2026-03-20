import { OrbitingCircles } from "./OrbitingCircles";

const SKILLS_OUTER = [
  { name: "cplusplus",   src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"     },
  { name: "typescript",  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"   },
  { name: "javascript",  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"   },
  { name: "python",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"           },
  { name: "nextjs",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"           },
  { name: "react",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"             },
  { name: "cloudflare",  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cloudflare/cloudflare-original.svg"   },
];

const SKILLS_INNER = [
  { name: "aws",         src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "linux",       src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"             },
  { name: "redhat",      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redhat/redhat-original.svg"           },
  { name: "express",     src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"         },
  { name: "mongodb",     src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"         },
  { name: "postgresql",  src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"   },
];

export function Frameworks() {
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={36} radius={130} speed={0.8}>
        {SKILLS_OUTER.map((skill) => (
          <Icon key={skill.name} src={skill.src} name={skill.name} />
        ))}
      </OrbitingCircles>

      <OrbitingCircles iconSize={28} radius={80} reverse speed={1.4}>
        {SKILLS_INNER.map((skill) => (
          <Icon key={skill.name} src={skill.src} name={skill.name} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src, name }: { src: string; name: string }) => (
  <img
    src={src}
    alt={name}
    title={name}
    className="rounded-sm duration-200 hover:scale-110 brightness-90 hover:brightness-110"
    style={{ filter: name === "nextjs" || name === "express" ? "invert(1)" : undefined }}
  />
);