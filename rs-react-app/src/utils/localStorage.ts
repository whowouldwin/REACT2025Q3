export function getSearchText(): string {
  return localStorage.getItem('searchText') || '';
}
export function setSearchText(text: string): void {
  localStorage.setItem('searchText', text);
}
