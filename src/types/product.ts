export type Product = {
  id: number;
  name: string;
  slug: string;
  image: string;
  price: string;
  color: string;
  memory: string;
  categoryId: number;
  details: {
    intro: {
      title: string;
      image: string;
    };
    sections: {
      title: string;
      image: string;
      content: string;
    }[];
  };
};
