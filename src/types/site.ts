export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  author: string;
  comment: string;
  rating: number;
}

export interface SiteConfig {
  businessName: string;
  tagline: string;
  category: string;
  city: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  googleMapsEmbedUrl?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  hero: {
    title: string;
    subtitle: string;
    ctaPrimaryText: string;
    ctaSecondaryText: string;
    backgroundImageUrl: string;
  };
  services: Service[];
  about: {
    title: string;
    description: string;
    imageUrl: string;
    points: string[];
  };
  testimonials: Testimonial[];
  googleRating?: {
    score: number;
    reviewsCount: number;
  };
}