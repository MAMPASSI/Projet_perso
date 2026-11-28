export const formaterPrix = (prix) =>
  Number(prix || 0).toFixed(2).replace('.', ',') + ' €';