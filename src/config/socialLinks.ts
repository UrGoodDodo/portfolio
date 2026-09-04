export interface SocialLink {
  label: string;
  url: string;
  icon: 'telegram' | 'github';
}

export const socialLinks: SocialLink[] = [
  {
    label: 'Telegram',
    url: 'https://t.me/Tyrenask',
    icon: 'telegram',
  },
  {
    label: 'GitHub',
    url: 'https://github.com/UrGoodDodo',
    icon: 'github',
  },
];