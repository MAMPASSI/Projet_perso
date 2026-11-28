const IMAGES_PAR_CATEGORIE = {
  Maison: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500',
  Informatique: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500',
  Téléphone: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
  Vêtements: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
  Alimentaire: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=500',
};

const IMAGE_DEFAUT =
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500';

// Renvoie l'image d'une catégorie, ou l'image par défaut
export const imagePour = (categorie) =>
  IMAGES_PAR_CATEGORIE[categorie] || IMAGE_DEFAUT;