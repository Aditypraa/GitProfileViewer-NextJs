export function formatDate(dateString: string, short = false): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // For mobile/short format, use more compact representation
  if (short) {
    if (diffDays <= 1) {
      return 'today';
    } else if (diffDays <= 2) {
      return 'yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays}d ago`;
    } else if (diffDays <= 30) {
      return `${Math.floor(diffDays / 7)}w ago`;
    } else if (diffDays <= 365) {
      return `${Math.floor(diffDays / 30)}mo ago`;
    } else {
      return `${Math.floor(diffDays / 365)}y ago`;
    }
  }

  // Regular format
  if (diffDays <= 1) {
    return 'today';
  } else if (diffDays <= 2) {
    return 'yesterday';
  } else if (diffDays <= 7) {
    return `${diffDays} days ago`;
  } else if (diffDays <= 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  } else if (diffDays <= 365) {
    return `${Math.floor(diffDays / 30)} months ago`;
  } else {
    return `${Math.floor(diffDays / 365)} years ago`;
  }
}
