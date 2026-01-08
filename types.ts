export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  weight: string;
  rating: number;
  image: string;
  description: string;
  tags: string[];
}

export interface Testimonial {
  id: number;
  text: string;
  author: string;
  role: string;
  location: string;
  image: string;
}

export interface Category {
  id: string;
  label: string;
}