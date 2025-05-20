import { programs } from '$lib/data/programs';

export function getProgramBySlug(slug: string) {
  return programs.find((program) => program.slug === slug);
}


