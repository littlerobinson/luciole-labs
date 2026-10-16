export interface User {
  name: string;
  email: string;
  password?: string;
}

// Base d'utilisateurs factice pour la démonstration de la recette Astro Forms
const users: User[] = [
  { name: "Alice", email: "alice@example.com" },
  { name: "Bob", email: "bob@example.com" },
];

/**
 * Vérifie si un e-mail est déjà enregistré (utilisé pour la validation asynchrone côté serveur).
 */
export async function isRegistered(email: string): Promise<boolean> {
  return users.some((user) => user.email.toLowerCase() === email.trim().toLowerCase());
}

/**
 * Enregistre un nouvel utilisateur.
 */
export async function registerUser(user: User): Promise<void> {
  users.push(user);
}
