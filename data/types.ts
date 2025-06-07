export type Tag = {
  id: number;
  name: string;
}

export type Category = {
  id: number;
  name: string;
}

export type Pet = {
  id: number;
  category: Category;
  name: string;
  photoUrls: string[];
  tags: Tag[];
  status: 'available' | 'pending' | 'sold';
}
