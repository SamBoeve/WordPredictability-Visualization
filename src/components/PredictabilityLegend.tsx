import React from 'react';
import { WordData } from '../data/predictabilityData';

interface PredictabilityLegendProps {
  allData: WordData[];
  maxSurprisal: number;
}

// Convert surprisal to color based on data-driven HSL scale
function surprisalToColor(surprisal: number, max: number): string {
  const ratio = Math.min(surprisal / max, 1);
  const hue = (1 - ratio) * 120; // 120 = green, 0 = red
  return `hsl(${hue}, 100%, 50%)`;
}

// Calculate quartiles from the data
function calculateQuartiles(data: number[]): { q1: number; q2: number; q3: number; min: number; max: number } {
  const sorted = [...data].sort((a, b) => a - b);
  const len = sorted.length;
  
  const q1 = sorted[Math.floor(len * 0.25)];
  const q2 = sorted[Math.floor(len * 0.5)]; // median
  const q3 = sorted[Math.floor(len * 0.75)];
  const min = sorted[0];
  const max = sorted[len - 1];
  
  return { q1, q2, q3, min, max };
}

export const PredictabilityLegend: React.FC<PredictabilityLegendProps> = ({
  allData,
  maxSurprisal
}) => {
  const surprisalValues = allData.map(word => word.surprisal);
  const quartiles = calculateQuartiles(surprisalValues);
  
  const legendItems = [
    { 
      label: 'Most Predictable', 
      surprisal: quartiles.min + (quartiles.q1 - quartiles.min) / 2,
      description: `${quartiles.min.toFixed(1)} - ${quartiles.q1.toFixed(1)}` 
    },
    { 
      label: 'Moderately Predictable', 
      surprisal: quartiles.q1 + (quartiles.q2 - quartiles.q1) / 2,
      description: `${quartiles.q1.toFixed(1)} - ${quartiles.q2.toFixed(1)}` 
    },
    { 
      label: 'Less Predictable', 
      surprisal: quartiles.q2 + (quartiles.q3 - quartiles.q2) / 2,
      description: `${quartiles.q2.toFixed(1)} - ${quartiles.q3.toFixed(1)}` 
    },
    { 
      label: 'Least Predictable', 
      surprisal: quartiles.q3 + (quartiles.max - quartiles.q3) / 2,
      description: `${quartiles.q3.toFixed(1)} - ${quartiles.max.toFixed(1)}` 
    },
  ];

  return (
    <div className="bg-card p-4 rounded-lg border">
      <h3 className="mb-3">Predictability Scale</h3>
      <div className="space-y-2">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center gap-3">
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: surprisalToColor(item.surprisal, maxSurprisal) }}
            />
            <div className="flex-1">
              <span className="text-sm">{item.label}</span>
              <span className="text-xs text-muted-foreground ml-2">
                (surprisal {item.description})
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex justify-between items-center text-xs text-muted-foreground mb-2">
          <span>Most Predictable</span>
          <span>Least Predictable</span>
        </div>
        <div className="h-2 rounded-full" style={{
          background: `linear-gradient(to right, 
            hsl(120, 100%, 50%), 
            hsl(90, 100%, 50%), 
            hsl(60, 100%, 50%), 
            hsl(30, 100%, 50%), 
            hsl(0, 100%, 50%))`
        }} />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>{quartiles.min.toFixed(1)}</span>
          <span>{quartiles.max.toFixed(1)}</span>
        </div>
      </div>
      
      <p className="text-xs text-muted-foreground mt-3">
        Lower surprisal values indicate more predictable words. Scale calculated from actual data quartiles.
      </p>
    </div>
  );
};