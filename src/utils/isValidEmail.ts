/**
 * Validation du format d'une adresse email.
 * Utilisé conformément à la recette officielle Astro :
 * https://docs.astro.build/fr/recipes/build-forms/
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== "string") {
    return false;
  }
  // Expression régulière standard pour vérifier le format d'un email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}
