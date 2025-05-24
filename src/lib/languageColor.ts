export function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Python: '#3572A5',
    Java: '#b07219',
    Ruby: '#701516',
    PHP: '#4F5D95',
    CSS: '#563d7c',
    HTML: '#e34c26',
    Go: '#00ADD8',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
    Rust: '#dea584',
  };

  return colors[language] || '#8f8f8f';
}
