import { useState, useEffect, useRef } from 'react';
import { initDb } from '../database/schema';
import {
  listerProduits,
  compterProduits,
  listerCategories,
  insererProduit,
} from '../database/produits';

const TAILLE_PAGE = 10;

export function useProduits() {
  // Données
  const [produits, setProduits] = useState([]);
  const [categories, setCategories] = useState([]);
  const [total, setTotal] = useState(0);

  // Filtres
  const [recherche, setRecherche] = useState('');
  const [categorie, setCategorie] = useState(null);

  // États de chargement
  const [version, setVersion] = useState(0);
  const [chargement, setChargement] = useState(true);
  const [rafraichissement, setRafraichissement] = useState(false);
  const [chargementPlus, setChargementPlus] = useState(false);
  const [erreur, setErreur] = useState(null);

  const generation = useRef(0);

  // Catégories
  useEffect(() => {
    initDb()
      .then(listerCategories)
      .then((liste) => setCategories([null, ...liste]))
      .catch(console.log);
  }, []);

  // Produits (relancé si la recherche, la catégorie ou la version change)
  useEffect(() => {
    let actuel = true;
    generation.current += 1;

    const lire = async () => {
      try {
        await initDb();
        const [lignes, nombre] = await Promise.all([
          listerProduits({ recherche, categorie, limite: TAILLE_PAGE, decalage: 0 }),
          compterProduits({ recherche, categorie }),
        ]);
        if (actuel) {
          setProduits(lignes);
          setTotal(nombre);
          setErreur(null);
        }
      } catch (e) {
        console.log(e);
        if (actuel) setErreur('Impossible de charger les produits');
      } finally {
        if (actuel) {
          setChargement(false);
          setRafraichissement(false);
        }
      }
    };

    lire();
    return () => {
      actuel = false;
    };
  }, [recherche, categorie, version]);

  const recharger = () => setVersion((v) => v + 1);

  const reessayer = () => {
    setChargement(true);
    recharger();
  };

  const rafraichir = () => {
    setRafraichissement(true);
    recharger();
  };

  const ajouterProduitBDD = async () => {
    try {
      await insererProduit(`Nouveau produit ${Date.now() % 1000}`, 'Maison', 9.9, 5);
      recharger();
    } catch (e) {
      console.log(e);
      setErreur("Impossible d'ajouter le produit");
    }
  };

  const chargerPlus = async () => {
    if (chargementPlus || produits.length >= total) return;

    const lecture = generation.current;
    setChargementPlus(true);

    try {
      const suite = await listerProduits({
        recherche,
        categorie,
        limite: TAILLE_PAGE,
        decalage: produits.length,
      });
      if (lecture !== generation.current) return;
      setProduits((actuels) => [...actuels, ...suite]);
    } catch (e) {
      console.log(e);
    } finally {
      setChargementPlus(false);
    }
  };

  return {
    produits, categories, total,
    recherche, setRecherche,
    categorie, setCategorie,
    chargement, rafraichissement, chargementPlus, erreur,
    reessayer, rafraichir, chargerPlus, ajouterProduitBDD,
  };
}