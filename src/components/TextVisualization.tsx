import React from 'react';
import { WordData } from '../data/predictabilityData';
import { Slider } from './ui/slider';

interface TextVisualizationProps {
  title: string;
  data: WordData[];
  sliderValue: number;
  onSliderChange: (value: number[]) => void;
  maxSurprisal: number;
}

// Convert surprisal to color based on data-driven HSL scale
function surprisalToColor(surprisal: number, max: number): string {
  const ratio = Math.min(surprisal / max, 1);
  const hue = (1 - ratio) * 120; // 120 = green, 0 = red
  return `hsl(${hue}, 100%, 50%)`;
}

export const TextVisualization: React.FC<TextVisualizationProps> = ({
  title,
  data,
  sliderValue,
  onSliderChange,
  maxSurprisal
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <h2 className="mb-2">{title}</h2>
        <div className="flex-1 p-4 bg-card rounded-lg border min-h-[300px] overflow-y-auto">
          <div className="leading-relaxed">
            {data.map((wordData, index) => (
              <span
                key={index}
                className="transition-all duration-200 ease-in-out"
                style={{
                  backgroundColor: index < sliderValue 
                    ? surprisalToColor(wordData.surprisal, maxSurprisal)
                    : 'transparent',
                  padding: index < sliderValue ? '2px 0' : '0',
                  borderRadius: '2px'
                }}
                title={`Surprisal: ${wordData.surprisal.toFixed(2)}`}
              >
                {wordData.word}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <div className="mt-auto">
        <div className="mb-2 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Context</span>
          <span className="text-sm text-muted-foreground">
            {sliderValue} / {data.length} words
          </span>
        </div>
        <Slider
          value={[sliderValue]}
          onValueChange={onSliderChange}
          max={data.length}
          min={0}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>No context</span>
          <span>Full context</span>
        </div>
      </div>
    </div>
  );
};