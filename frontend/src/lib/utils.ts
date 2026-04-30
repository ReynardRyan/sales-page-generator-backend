export function cn(...inputs: (string | boolean | null | undefined)[]): string {
  return inputs.filter(Boolean).join(' ');
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getApiErrorMessage(error: unknown): string {
  const axiosError = error as { response?: { data?: { message?: string } } };
  if (axiosError?.response?.data?.message) return axiosError.response.data.message;
  if (error instanceof Error) return error.message;
  return 'Something went wrong';
}
