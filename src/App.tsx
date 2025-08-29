import React, { useState, useMemo } from 'react';
import { TextVisualization } from './components/TextVisualization';
import { PredictabilityLegend } from './components/PredictabilityLegend';
import { sentenceData, paragraphData, novelData } from './data/predictabilityData';
import Lablogo from './assets/BogaertsLab_logo.png';

export default function App() {
  const [sentenceSlider, setSentenceSlider] = useState(0);
  const [paragraphSlider, setParagraphSlider] = useState(0);
  const [novelSlider, setNovelSlider] = useState(0);

  // Set fixed maximum surprisal to avoid outlier skewing
  const { maxSurprisal, allData } = useMemo(() => {
    const combined = [...sentenceData, ...paragraphData, ...novelData];
    return { 
      maxSurprisal: 18, // Fixed max to prevent outliers from skewing colors
      allData: combined, 
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background p-6">
      <div className="max-w-7xl mx-auto flex-1 flex flex-col justify-between">
        <div className="mb-6 text-center">
          <h1 className="mb-2">Dutch LLM: word predictability</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Use the slider to visualize the predictability of each word as estimated by a Dutch large language model.
            The model used for this visualization is<span style={{fontStyle: 'italic', padding: '2px 6px', borderRadius: '4px' }}>gpt2-dutch-small</span>(de Vries & Nissim, 2020).
          </p>
        </div>
        

        <div className="mb-6">
          <PredictabilityLegend allData={allData} maxSurprisal={maxSurprisal} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TextVisualization
            title=<span style={{fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px' }}>Sentence Corpus: RaCCooNS</span>
            data={sentenceData}
            sliderValue={sentenceSlider}
            onSliderChange={(value) => setSentenceSlider(value[0])}
            maxSurprisal={maxSurprisal}
          />
          
          <TextVisualization
            title=<span style={{fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px' }}>Paragraph Corpus: MECO</span>
            data={paragraphData}
            sliderValue={paragraphSlider}
            onSliderChange={(value) => setParagraphSlider(value[0])}
            maxSurprisal={maxSurprisal}
          />
          
          <TextVisualization
            title=<span style={{fontWeight: 'bold', padding: '2px 6px', borderRadius: '4px' }}>Book Corpus: GECO</span>
            data={novelData}
            sliderValue={novelSlider}
            onSliderChange={(value) => setNovelSlider(value[0])}
            maxSurprisal={maxSurprisal}
          />
        </div>

        <div className="text-center mt-4">
          <p className="model-info text-sm text-muted-foreground mb-10">
            Click on the Bogaertslab logo to learn more about our research. 
          </p>
          
          <div>
            <a href="https://www.bogaertslab.com/" target="_blank" rel="noopener noreferrer">
              <img src={Lablogo} className="logo mx-auto h-16 hover:opacity-80 transition-opacity" alt="BogaertsLab logo" />
            </a>
          </div> 
        </div> 
      </div>
    </div>
  );
}