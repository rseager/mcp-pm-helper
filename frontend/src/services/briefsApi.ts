import { ProductBrief } from '../types';

const BASE_URL = 'http://localhost:8000/api';

export async function getBriefs(): Promise<ProductBrief[]> {
  const response = await fetch(`${BASE_URL}/briefs`);
  if (!response.ok) throw new Error('Failed to fetch briefs');
  return response.json();
}

export async function createBrief(brief: ProductBrief): Promise<ProductBrief> {
  const response = await fetch(`${BASE_URL}/briefs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(brief),
  });
  if (!response.ok) throw new Error('Failed to create brief');
  return response.json();
}

export async function updateBrief(id: string, updates: Partial<ProductBrief>): Promise<ProductBrief> {
  const response = await fetch(`${BASE_URL}/briefs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update brief');
  return response.json();
}

export async function deleteBrief(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/briefs/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete brief');
}
