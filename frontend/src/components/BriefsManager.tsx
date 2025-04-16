import React, { useState, useEffect } from 'react';
import {
  getBriefs,
  createBrief,
  updateBrief,
  deleteBrief,
} from '../services/briefsApi';
import { ProductBrief } from '../types';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group" // Import RadioGroup components

const BriefsManager = () => {
  const [briefs, setBriefs] = useState<ProductBrief[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBriefId, setSelectedBriefId] = useState<string | undefined>(undefined); // New state for selected brief ID

  useEffect(() => {
    const loadBriefs = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getBriefs();
        console.log("Briefs data fetched (before setting state):", data);
        setBriefs(data);
      } catch (e: any) {
        setError(e.message);
        console.error("Error fetching briefs:", e);
      } finally {
        setLoading(false);
      }
    };

    loadBriefs();
  }, []);

  if (loading) {
    return <div>Loading briefs...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Manage Product Briefs</h2> {/* Updated title format */}
      <RadioGroup value={selectedBriefId} onValueChange={setSelectedBriefId}>
        <ul>
          {briefs.map((brief) => (
            <li key={brief.id}>
              <RadioGroupItem value={brief.id} id={brief.id} className="peer cursor-pointer" />
              <label
                htmlFor={brief.id}
                className="bg-accent text-sidebar-foreground border border-border rounded-md p-2 peer-checked:ring-2 peer-checked:ring-primary flex items-center pointer-events-none"
              >
                {brief.title}
              </label>
            </li>
          ))}
        </ul>
      </RadioGroup>
    </div>
  );
};

export default BriefsManager;