export type Language = 'ja' | 'en';

export interface Translation {
  // Navigation
  nav: {
    about: string;
    network: string;
    products: string;
    partners: string;
    contact: string;
  };
  
  // Hero
  hero: {
    title1: string;
    title2: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  
  // About
  about: {
    label: string;
    title: string;
    subtitle: string;
    description: string;
    bridge: {
      title: string;
      content: string;
    };
    green: {
      title: string;
      content: string;
    };
    future: {
      title: string;
      content: string;
    };
    corePartners: {
      title: string;
      partners: {
        name: string;
        description: string;
      }[];
    };
    stats: {
      years: { value: string; label: string };
      partners: { value: string; label: string };
      transactions: { value: string; label: string };
    };
  };
  
  // Global Network
  network: {
    label: string;
    title: string;
    description: string;
    locations: {
      japan: string;
      china: string;
      usa: string;
      europe: string;
      india: string;
      sea: string;
    };
    roles: {
      headquarters: string;
      customer: string;
      supplier: string;
    };
  };
  
  // Products
  products: {
    label: string;
    title: string;
    categories: {
      fragrance: { name: string; description: string };
      industrial: { name: string; description: string };
      electronic: { name: string; description: string };
      daily: { name: string; description: string };
    };
  };
  
  // Partners
  partners: {
    label: string;
    title: string;
    description: string;
  };
  
  // Process
  process: {
    label: string;
    title: string;
    steps: {
      consultation: { title: string; description: string };
      sourcing: { title: string; description: string };
      quality: { title: string; description: string };
      logistics: { title: string; description: string };
      support: { title: string; description: string };
    };
  };
  
  // Contact
  contact: {
    label: string;
    title: string;
    info: {
      address: string;
      phone: string;
      email: string;
    };
    form: {
      name: string;
      email: string;
      phone: string;
      company: string;
      message: string;
      submit: string;
      required: string;
    };
  };
  
  // Footer
  footer: {
    description: string;
    quickLinks: string;
    contact: string;
    copyright: string;
  };
}

export interface Translations {
  ja: Translation;
  en: Translation;
}
