import { createContext, useContext, useState } from 'react';

const PanierContext = createContext(null);

export function PanierProvider({ children }) {
  // Chaque article : { id, nom, prix, stock, image, quantite }
  const [articles, setArticles] = useState([]);

  // Renvoie true si l'ajout a réussi, false si le stock est atteint
  const ajouter = (produit) => {
    const existant = articles.find((a) => a.id === produit.id);

    if (existant) {
      if (existant.quantite >= existant.stock) return false;
      setArticles((liste) =>
        liste.map((a) =>
          a.id === produit.id ? { ...a, quantite: a.quantite + 1 } : a
        )
      );
      return true;
    }

    if (produit.stock <= 0) return false;
    setArticles((liste) => [...liste, { ...produit, quantite: 1 }]);
    return true;
  };

  // Bouton « + » du panier : même règle de stock
  const incrementer = (id) => {
    const article = articles.find((a) => a.id === id);
    if (!article || article.quantite >= article.stock) return false;

    setArticles((liste) =>
      liste.map((a) => (a.id === id ? { ...a, quantite: a.quantite + 1 } : a))
    );
    return true;
  };

  const diminuer = (id) => {
    setArticles((liste) =>
      liste
        .map((a) => (a.id === id ? { ...a, quantite: a.quantite - 1 } : a))
        .filter((a) => a.quantite > 0)
    );
  };

  const supprimer = (id) => {
    setArticles((liste) => liste.filter((a) => a.id !== id));
  };

  const vider = () => setArticles([]);

  // Quantité d'un produit dans le panier (0 s'il n'y est pas)
  const quantiteDe = (id) =>
    articles.find((a) => a.id === id)?.quantite || 0;

  // Valeurs calculées (pas d'état)
  const nombreArticles = articles.reduce((s, a) => s + a.quantite, 0);
  const total = articles.reduce((s, a) => s + a.prix * a.quantite, 0);

  return (
    <PanierContext.Provider
      value={{
        articles,
        ajouter,
        incrementer,
        diminuer,
        supprimer,
        vider,
        quantiteDe,
        nombreArticles,
        total,
      }}
    >
      {children}
    </PanierContext.Provider>
  );
}

export const usePanier = () => {
  const contexte = useContext(PanierContext);
  if (!contexte) {
    throw new Error("usePanier doit être utilisé à l'intérieur de <PanierProvider>");
  }
  return contexte;
};