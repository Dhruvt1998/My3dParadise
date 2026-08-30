export type Project = {
  title: string;
  category: string;
  description: string;
  material: string;
  finish: string;
  image: string;
  accent: string;
};

export const projects: Project[] = [
  {
    title: "Cable Winder",
    category: "Functional Prototype",
    description:
      "cable windier info",
    material: "PETG",
    finish: "Raw / Technical",
    image: "/projects/CableWinder.jpeg",
    accent: "01"
  },
  {
    title: "Form Study 02",
    category: "Concept Model",
    description:
      "A clean presentation model developed to compare curvature, proportion, and surface transitions.",
    material: "PLA",
    finish: "Sanded",
    image: "/projects/form-study.svg",
    accent: "02"
  },
  {
    title: "Clamp System",
    category: "Small-Batch Part",
    description:
      "A compact modular clamping component designed for repeated workshop use and easy replacement.",
    material: "Nylon",
    finish: "Matte",
    image: "/projects/clamp-system.svg",
    accent: "03"
  },
  {
    title: "Cable Winder",
    category: "Functional Prototype",
    description:
        "cable windier info",
    material: "PETG",
    finish: "Raw / Technical",
    image: "/projects/CableWinder.jpeg",
    accent: "05"
  }
];
