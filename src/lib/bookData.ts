
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  coverImage: string;
  description: string;
  category: string;
  featured?: boolean;
  publicationDate: string;
  pages: number;
  rating: number;
}

export const books: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 24.99,
    coverImage: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices.",
    category: "Fiction",
    featured: true,
    publicationDate: "2020-08-13",
    pages: 304,
    rating: 4.2
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",
    price: 21.99,
    coverImage: "https://images.unsplash.com/photo-1598618589929-b1433d05cfc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "No matter your goals, Atomic Habits offers a proven framework for improving every day. James Clear, one of the world's leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.",
    category: "Self-Help",
    featured: true,
    publicationDate: "2018-10-16",
    pages: 320,
    rating: 4.8
  },
  {
    id: "3",
    title: "Educated",
    author: "Tara Westover",
    price: 22.99,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Born to survivalists in the mountains of Idaho, Tara Westover was seventeen the first time she set foot in a classroom. Her family was so isolated from mainstream society that there was no one to ensure the children received an education, and no one to intervene when one of Tara's older brothers became violent.",
    category: "Memoir",
    publicationDate: "2018-02-20",
    pages: 334,
    rating: 4.7
  },
  {
    id: "4",
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 19.99,
    coverImage: "https://images.unsplash.com/photo-1602306834394-6c8b7ea0ed9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house with big windows overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
    category: "Thriller",
    featured: true,
    publicationDate: "2019-02-05",
    pages: 336,
    rating: 4.3
  },
  {
    id: "5",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 25.99,
    coverImage: "https://images.unsplash.com/photo-1603162950865-e7e15670b9e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "For years, rumors of the 'Marsh Girl' have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl. But Kya is not what they say.",
    category: "Fiction",
    publicationDate: "2018-08-14",
    pages: 384,
    rating: 4.6
  },
  {
    id: "6",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    price: 23.99,
    coverImage: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Doing well with money isn't necessarily about what you know. It's about how you behave. And behavior is hard to teach, even to really smart people.",
    category: "Finance",
    featured: true,
    publicationDate: "2020-09-08",
    pages: 256,
    rating: 4.7
  },
  {
    id: "7",
    title: "Project Hail Mary",
    author: "Andy Weir",
    price: 26.99,
    coverImage: "https://images.unsplash.com/photo-1587876931567-564ce588bfbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish. Except that right now, he doesn't know that. He can't even remember his own name, let alone the nature of his assignment or how to complete it.",
    category: "Sci-Fi",
    publicationDate: "2021-05-04",
    pages: 496,
    rating: 4.6
  },
  {
    id: "8",
    title: "The Four Winds",
    author: "Kristin Hannah",
    price: 28.99,
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Texas, 1934. Millions are out of work and a drought has broken the Great Plains. Farmers are fighting to keep their land and their livelihoods as the crops are failing, the water is drying up, and dust threatens to bury them all.",
    category: "Historical Fiction",
    publicationDate: "2021-02-02",
    pages: 464,
    rating: 4.5
  }
];

export const categories = [
  "All",
  "Fiction",
  "Self-Help",
  "Memoir",
  "Thriller",
  "Finance",
  "Sci-Fi",
  "Historical Fiction"
];

// Cart context type
export interface CartItem extends Book {
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (book: Book) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}
