export function generateSlug(title: string): string{
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    return slug;
}