import { programs } from '$lib/data/programs';


export function getProgramBySlug(slug: string) {
  const program = programs.find((p) => p.slug === slug);
  return program && !program.isComingSoon ? program : null;
}



