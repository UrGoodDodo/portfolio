import type { Language } from './config';

type UiDictionary = {
  site: {
    name: string;
    copyrightName: string;
  };

  nav: {
    home: string;
    projects: string;
    about: string;
  };

  projectsPage: {
    title: string;
    description: string;
  };

  sectionTitles: Record<string, string>;

  project: {
    backToProjects: string;
    role: string;
    technologies: string;
    year: string;
    links: string;
    gallery: string;
    gameplay: string;
    beforeAfter: string;
    before: string;
    after: string;
  };

  footer: {
    rights: string;
  };

  common: {
    viewProject: string;
    latestProjects: string;
    viewAllProjects: string;
    aboutMe: string;
    contactMe: string;
  };
};

export const ui: Record<Language, UiDictionary> = {
  en: {
    site: {
      name: 'Kirill Zinnatullin',
      copyrightName: 'Kirill Zinnatullin',
    },

    nav: {
      home: 'Home',
      projects: 'Projects',
      about: 'About',
    },

    projectsPage: {
      title: 'Projects',
      description:
        'A selection of my work in game development, programming, technical art and level design.',
    },

    sectionTitles: {
      overview: 'Overview',
      'technical-breakdown': 'Technical Breakdown',
      'level-design': 'Level Design',
      challenges: 'Challenges',
      results: 'Results',
      'development-process': 'Development Process',
    },

    project: {
      backToProjects: 'Back to Projects',
      role: 'Role',
      technologies: 'Technologies',
      year: 'Year',
      links: 'Links',
      gallery: 'Gallery',
      gameplay: 'Gameplay',
      beforeAfter: 'Before / After',
      before: 'Before',
      after: 'After',
    },

    footer: {
      rights: 'All rights reserved',
    },

    common: {
      viewProject: 'View Project',
      latestProjects: 'Latest Projects',
      viewAllProjects: 'View All Projects',
      aboutMe: 'More About Me',
      contactMe: 'Get in Touch',
    },
  },

  ru: {
    site: {
      name: 'Кирилл Зиннатуллин',
      copyrightName: 'Кирилл Зиннатуллин',
    },

    nav: {
      home: 'Главная',
      projects: 'Проекты',
      about: 'Обо мне',
    },

    projectsPage: {
      title: 'Проекты',
      description:
        'Подборка моих работ в области разработки игр, программирования, технического арта и левел-дизайна.',
    },

    sectionTitles: {
      overview: 'Обзор',
      'technical-breakdown': 'Техническая часть',
      'level-design': 'Левел-дизайн',
      challenges: 'Сложности',
      results: 'Результаты',
      'development-process': 'Процесс разработки',
    },

    project: {
      backToProjects: 'Назад к проектам',
      role: 'Роль',
      technologies: 'Технологии',
      year: 'Год',
      links: 'Ссылки',
      gallery: 'Галерея',
      gameplay: 'Геймплей',
      beforeAfter: 'До / После',
      before: 'До',
      after: 'После',
    },

    footer: {
      rights: 'Все права защищены',
    },

    common: {
      viewProject: 'Открыть проект',
      latestProjects: 'Последние проекты',
      viewAllProjects: 'Все проекты',
      aboutMe: 'Подробнее обо мне',
      contactMe: 'Связаться со мной',
    },
  },
};