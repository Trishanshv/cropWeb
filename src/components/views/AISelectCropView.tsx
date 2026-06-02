'use client';

import React, { useState } from 'react';
import { useToastStore } from '../../store/toastStore';
import { useNavigationStore } from '../../store/navigationStore';
import { Sprout, Bug, ShieldAlert, HeartHandshake, ArrowLeft, MessageSquare, ShieldCheck } from 'lucide-react';

interface CropCategory {
  id: string;
  name: string;
  avatarText: string;
  crops: {
    id: string;
    name: string;
    scientificName: string;
    svgPath?: string;
    threats: {
      insect: { name: string; severity: string; remedy: string }[];
      disease: { name: string; severity: string; remedy: string }[];
      nutrient: { name: string; severity: string; remedy: string }[];
    };
  }[];
}

export const AISelectCropView: React.FC = () => {
  const { showToast } = useToastStore();
  const { navigateTo } = useNavigationStore();

  const [selectedCategory, setSelectedCategory] = useState<string>('Pulses');
  const [activeCrop, setActiveCrop] = useState<any | null>(null);
  const [activeProblemType, setActiveProblemType] = useState<'insect' | 'disease' | 'nutrient'>('insect');
  const [selectedThreat, setSelectedThreat] = useState<any | null>(null);

  // Figma category-to-crop hierarchy with localized mock parameters
  const categoriesList: CropCategory[] = [
    {
      id: 'fruit',
      name: 'Fruit',
      avatarText: '🍊',
      crops: [
        {
          id: 'banana',
          name: 'Banana',
          scientificName: 'Musa acuminata',
          threats: {
            insect: [
              { name: 'Banana Stem Weevil', severity: 'Critical (35% infestation)', remedy: 'Inject Pseudostem with Neem oil solution.' },
              { name: 'Banana Aphids', severity: 'Moderate', remedy: 'Spray insecticidal soap; monitor bunchy top virus.' },
              { name: 'Banana Rust Thrips', severity: 'Low', remedy: 'Keep farm weed-free; spray organic Azadirachtin.' },
              { name: 'Mealybugs', severity: 'Low', remedy: 'Introduce natural predatory ladybugs.' }
            ],
            disease: [
              { name: 'Panama Wilt Fungal', severity: 'Critical', remedy: 'Drench soil with Carbendazim; improve drainage.' },
              { name: 'Sigatoka Leaf Spot', severity: 'Moderate', remedy: 'Prune affected leaves; apply copper fungicide.' },
              { name: 'Bunchy Top Virus', severity: 'High', remedy: 'Destroy infected plants; spray to control aphid vector.' },
              { name: 'Banana Anthracnose', severity: 'Low', remedy: 'Wash harvest with organic sanitizers.' }
            ],
            nutrient: [
              { name: 'Nitrogen Deficiency', severity: 'Leaf Yellowing', remedy: 'Apply organic compost or urea fertilizer.' },
              { name: 'Potassium Deficiency', severity: 'Leaf Margin Necrosis', remedy: 'Apply potash or wood ash dressing.' },
              { name: 'Magnesium Deficiency', severity: 'Interveinal Chlorosis', remedy: 'Apply Epsom salt (Magnesium sulfate) spray.' }
            ]
          }
        },
        {
          id: 'mango',
          name: 'Mango',
          scientificName: 'Mangifera indica',
          threats: {
            insect: [
              { name: 'Mango Hopper', severity: 'High', remedy: 'Spray bio-pesticide Beauveria bassiana.' },
              { name: 'Fruit Fly', severity: 'Moderate', remedy: 'Install methyl eugenol pheromone traps.' }
            ],
            disease: [
              { name: 'Powdery Mildew', severity: 'Moderate', remedy: 'Spray wettable sulfur early in flowering.' },
              { name: 'Anthracnose Rot', severity: 'High', remedy: 'Prune dry twigs; apply Bordeaux mixture.' }
            ],
            nutrient: [
              { name: 'Boron Deficiency', severity: 'Fruit cracking', remedy: 'Apply borax soil dressing.' }
            ]
          }
        }
      ]
    },
    {
      id: 'vegetable',
      name: 'Vegetable',
      avatarText: '🥗',
      crops: [
        {
          id: 'tomato',
          name: 'Tomato',
          scientificName: 'Solanum lycopersicum',
          threats: {
            insect: [
              { name: 'Tomato Fruit Borer', severity: 'High (22% damage)', remedy: 'Deploy Helicoverpa pheromone traps; apply Bacillus thuringiensis.' },
              { name: 'Serpentine Leaf Miner', severity: 'Moderate', remedy: 'Apply yellow sticky traps; neem seed kernel extract.' },
              { name: 'Thrips Vector', severity: 'Low', remedy: 'Install reflective mulches; wash leaves with water.' },
              { name: 'Whitefly Colony', severity: 'Moderate', remedy: 'Spray organic systemic bio-pesticides.' },
              { name: 'Spider Mites', severity: 'Low', remedy: 'Increase humidity; spray organic acaricides.' }
            ],
            disease: [
              { name: 'Early Blight Fungus', severity: 'Moderate', remedy: 'Apply copper oxychloride; avoid overhead watering.' },
              { name: 'Late Blight Fungus', severity: 'Critical', remedy: 'Spray organic copper bactericides; isolate crop.' },
              { name: 'Bacterial Wilt', severity: 'Severe', remedy: 'Uproot affected plant; correct soil acidity.' }
            ],
            nutrient: [
              { name: 'Calcium Deficiency', severity: 'Blossom End Rot', remedy: 'Apply agricultural lime or bone meal.' },
              { name: 'Phosphorus Deficiency', severity: 'Purple Leaves', remedy: 'Apply rock phosphate or bone meal.' }
            ]
          }
        },
        {
          id: 'potato',
          name: 'Potato',
          scientificName: 'Solanum tuberosum',
          threats: {
            insect: [
              { name: 'Potato Tuber Moth', severity: 'Moderate', remedy: 'Heap soil around plant base; store in cold room.' }
            ],
            disease: [
              { name: 'Early Blight', severity: 'Low', remedy: 'Maintain balanced crop rotation.' }
            ],
            nutrient: [
              { name: 'Potassium Deficit', severity: 'Bronzed leaf tips', remedy: 'Apply muriate of potash.' }
            ]
          }
        }
      ]
    },
    {
      id: 'cereal',
      name: 'Cereal',
      avatarText: '🌾',
      crops: [
        {
          id: 'paddy',
          name: 'Paddy (Rice)',
          scientificName: 'Oryza sativa',
          threats: {
            insect: [
              { name: 'Brown Planthopper', severity: 'High', remedy: 'Maintain alternate wetting and drying of field.' },
              { name: 'Stem Borer Larvae', severity: 'Moderate', remedy: 'Release Trichogramma egg parasitoids.' }
            ],
            disease: [
              { name: 'Blast Disease Fungus', severity: 'Severe', remedy: 'Apply bio-agent Pseudomonas fluorescens.' }
            ],
            nutrient: [
              { name: 'Zinc Deficiency', severity: 'Rusty leaf spots', remedy: 'Spray Zinc sulfate solution.' }
            ]
          }
        },
        {
          id: 'wheat',
          name: 'Wheat',
          scientificName: 'Triticum aestivum',
          threats: {
            insect: [
              { name: 'Aphid Colony', severity: 'Moderate', remedy: 'Release ladybug predators; spray neem.' }
            ],
            disease: [
              { name: 'Brown Rust Fungus', severity: 'Trace', remedy: 'Use rust-resistant varieties; apply organic bio-agents.' }
            ],
            nutrient: [
              { name: 'Nitrogen Deficiency', severity: 'Pale leaves', remedy: 'Apply compost tea or urea.' }
            ]
          }
        }
      ]
    },
    {
      id: 'oilseed',
      name: 'Oil Seed',
      avatarText: '🌻',
      crops: [
        {
          id: 'safflower',
          name: 'Safflower',
          scientificName: 'Carthamus tinctorius',
          threats: {
            insect: [
              { name: 'Safflower Aphid', severity: 'Severe', remedy: 'Spray systemic neem seed extract; conserve ladybird beetles.' }
            ],
            disease: [
              { name: 'Alternaria Leaf Spot', severity: 'Moderate', remedy: 'Spray organic copper fungicide.' }
            ],
            nutrient: [
              { name: 'Sulfur Deficiency', severity: 'Stunted stems', remedy: 'Add gypsum mineral to soil.' }
            ]
          }
        }
      ]
    },
    {
      id: 'pulses',
      name: 'Pulses',
      avatarText: '🫘',
      crops: [
        {
          id: 'pigeonpea',
          name: 'Pigeon Pea',
          scientificName: 'Cajanus cajan',
          threats: {
            insect: [
              { name: 'Pod Borer Complex', severity: 'High', remedy: 'Apply neem-based formulations; install pheromone traps.' },
              { name: 'Pod Fly', severity: 'Moderate', remedy: 'Harvest early; spray organic insect repellents.' }
            ],
            disease: [
              { name: 'Fusarium Wilt', severity: 'Severe', remedy: 'Apply Trichoderma bio-fungicide to soil.' }
            ],
            nutrient: [
              { name: 'Phosphorus Deficiency', severity: 'Weak root nodules', remedy: 'Apply single superphosphate.' }
            ]
          }
        },
        {
          id: 'gram',
          name: 'Gram (Chickpea)',
          scientificName: 'Cicer arietinum',
          threats: {
            insect: [
              { name: 'Gram Pod Borer', severity: 'Moderate (12% damage)', remedy: 'Deploy Helicoverpa pheromone traps; apply organic Azadirachtin spray.' },
              { name: 'Cutworm Larvae', severity: 'Low', remedy: 'Flood field briefly to expose pests to birds.' },
              { name: 'Aphids Vector', severity: 'Low', remedy: 'Spray mild soap solution or spray systemic bio-pesticide.' }
            ],
            disease: [
              { name: 'Ascochyta Blight', severity: 'Moderate', remedy: 'Use certified seed; spray bio-fungicide.' },
              { name: 'Dry Root Rot', severity: 'High', remedy: 'Maintain optimum soil moisture; treat seeds with Trichoderma.' }
            ],
            nutrient: [
              { name: 'Iron Deficiency', severity: 'Yellowing of young leaves', remedy: 'Spray Chelated Iron (Fe-EDTA) solution.' }
            ]
          }
        },
        {
          id: 'lathyrus',
          name: 'Lathyrus',
          scientificName: 'Lathyrus sativus',
          threats: {
            insect: [
              { name: 'Leaf Aphids', severity: 'Low', remedy: 'Spray organic pesticide; encourage hoverflies.' }
            ],
            disease: [
              { name: 'Powdery Mildew', severity: 'Moderate', remedy: 'Dust with sulfur powder.' }
            ],
            nutrient: [
              { name: 'Potassium Deficit', severity: 'Muted borders', remedy: 'Apply organic potash compost.' }
            ]
          }
        },
        {
          id: 'pea',
          name: 'Pea',
          scientificName: 'Pisum sativum',
          threats: {
            insect: [
              { name: 'Pea Pod Borer', severity: 'Moderate', remedy: 'Spray organic neem oil extract.' }
            ],
            disease: [
              { name: 'Rust Disease', severity: 'Low', remedy: 'Use resistant cultivars.' }
            ],
            nutrient: [
              { name: 'Molybdenum Deficiency', severity: 'Poor nodules', remedy: 'Apply ammonium molybdate spray.' }
            ]
          }
        },
        {
          id: 'lentil',
          name: 'Lentil',
          scientificName: 'Lens culinaris',
          threats: {
            insect: [
              { name: 'Black Aphids', severity: 'Low', remedy: 'Conserve green lacewing predators.' }
            ],
            disease: [
              { name: 'Collar Rot', severity: 'Severe', remedy: 'Avoid waterlogging; treat seeds with bio-agent.' }
            ],
            nutrient: [
              { name: 'Boron Deficit', severity: 'Stunted blossoms', remedy: 'Apply borax compost.' }
            ]
          }
        },
        {
          id: 'greenblack',
          name: 'Green / Black Gram',
          scientificName: 'Vigna mungo',
          threats: {
            insect: [
              { name: 'Whitefly Vector', severity: 'Moderate', remedy: 'Spray neem seed kernel extract.' }
            ],
            disease: [
              { name: 'Yellow Mosaic Virus', severity: 'Critical', remedy: 'Spray to eliminate whitefly vectors; discard infected plants.' }
            ],
            nutrient: [
              { name: 'Nitrogen Deficit', severity: 'Slow growth', remedy: 'Apply compost dressing.' }
            ]
          }
        }
      ]
    }
  ];

  const handleFeedback = () => {
    showToast('Submitting diagnosis telemetry to agricultural researchers...', 'success');
  };

  const handleBackToSelect = () => {
    setActiveCrop(null);
    setActiveProblemType('insect');
  };

  const selectedCategoryObj = categoriesList.find(c => c.name === selectedCategory) || categoriesList[4];

  return (
    <div className="flex flex-col gap-6 w-full max-w-xl mx-auto animate-fade-in select-none text-foreground text-left transition-colors duration-200">
      
      {/* 1. BRAND HEADER */}
      <div className="bg-primary-green text-white px-4 py-2.5 rounded-t-lg flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          {activeCrop ? (
            <button
              onClick={handleBackToSelect}
              className="p-1 rounded bg-emerald-950 hover:bg-emerald-900 border border-transparent mr-1 transition-colors"
              aria-label="Back to crops list"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => navigateTo('home', 'ai_crop_doctor')}
              className="p-1 rounded bg-emerald-950 hover:bg-emerald-900 border border-transparent mr-1 transition-colors"
              aria-label="Back to AI Home"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
          )}
          <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider">
            {activeCrop ? `Crop problem type ( ${selectedCategory} >> ${activeCrop.name} )` : 'Crop-Based Insect & Disease identification'}
          </h2>
        </div>
        <span className="text-[9px] font-bold text-white uppercase tracking-widest">
          AI Enabled
        </span>
      </div>

      {/* -------------------- STEP 1: CATEGORY & CROP SELECTOR -------------------- */}
      {!activeCrop ? (
        <div className="flex flex-col gap-5 w-full">
          
          {/* Category tabs selection */}
          <div className="flex flex-col gap-2">
            <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">Crops categories</span>
            <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-1">
              {categoriesList.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      showToast(`Swapped crop directory to: ${cat.name}`, 'info');
                    }}
                    className={`flex flex-col items-center gap-1.5 px-3 py-2.5 rounded-xl border text-center flex-1 min-w-[76px] transition-all duration-200 focus:outline-none ${
                      isSelected 
                        ? 'bg-primary-green/10 border-primary-green text-accent-green font-bold' 
                        : 'bg-card-dark border-border hover:bg-card-dark-hover text-text-secondary hover:text-foreground'
                    }`}
                  >
                    <span className="text-xl leading-none">{cat.avatarText}</span>
                    <span className="text-[10px] uppercase tracking-wider">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Related crops panel */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
              Related to {selectedCategory}
            </span>

            <div className="bg-primary-green/5 border border-border rounded-2xl p-5 flex flex-col gap-4 text-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {selectedCategoryObj.crops.map((crop) => (
                  <button
                    key={crop.id}
                    onClick={() => {
                      setActiveCrop(crop);
                      showToast(`Loaded diagnostic registry for ${crop.name}`, 'success');
                    }}
                    className="flex flex-col items-center gap-2 p-3 bg-card-dark border border-border hover:border-accent-green hover:bg-card-dark-hover rounded-2xl transition-all duration-200 group focus:outline-none text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-background border border-border flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                      <Sprout className="w-5 h-5 text-accent-green" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold text-foreground truncate max-w-[120px]">{crop.name}</span>
                      <span className="text-[9px] text-text-secondary truncate italic max-w-[120px]">{crop.scientificName}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Prompt info */}
          <p className="text-[10px] text-text-secondary italic text-center mt-2 leading-relaxed">
            Click on any crop avatar under the related category directory to resolve the diagnostic threat logs.
          </p>

        </div>
      ) : (
        // -------------------- STEP 2: CROP DIAGNOSTICS CONSOLE --------------------
        <div className="flex flex-col gap-5 w-full">
          
          {/* Circular Problem category selector tabs */}
          <div className="flex items-center justify-around py-3 bg-card-dark border border-border rounded-xl px-4 transition-colors duration-200">
            
            {/* Insect Button */}
            <button
              onClick={() => setActiveProblemType('insect')}
              className={`flex flex-col items-center gap-1 group focus:outline-none transition-colors ${activeProblemType === 'insect' ? 'text-accent-green font-bold' : 'text-text-secondary hover:text-foreground'}`}
            >
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                activeProblemType === 'insect' ? 'bg-primary-green/20 border-primary-green text-accent-green' : 'bg-background border border-border group-hover:border-border'
              }`}>
                <Bug className="w-5 h-5" />
              </div>
              <span className="text-[9.5px] uppercase tracking-wider">Insect</span>
            </button>

            {/* Disease Button */}
            <button
              onClick={() => setActiveProblemType('disease')}
              className={`flex flex-col items-center gap-1 group focus:outline-none transition-colors ${activeProblemType === 'disease' ? 'text-accent-green font-bold' : 'text-text-secondary hover:text-foreground'}`}
            >
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                activeProblemType === 'disease' ? 'bg-primary-green/20 border-primary-green text-accent-green' : 'bg-background border border-border group-hover:border-border'
              }`}>
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="text-[9.5px] uppercase tracking-wider">Disease</span>
            </button>

            {/* Nutrient Button */}
            <button
              onClick={() => setActiveProblemType('nutrient')}
              className={`flex flex-col items-center gap-1 group focus:outline-none transition-colors ${activeProblemType === 'nutrient' ? 'text-accent-green font-bold' : 'text-text-secondary hover:text-foreground'}`}
            >
              <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                activeProblemType === 'nutrient' ? 'bg-primary-green/20 border-primary-green text-accent-green' : 'bg-background border border-border group-hover:border-border'
              }`}>
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-[9.5px] uppercase tracking-wider">Nutrient</span>
            </button>

          </div>

          {/* Related problem block */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider">
              Related to {activeProblemType}
            </span>

            {/* Figma Green diagnostics block container */}
            <div className="bg-primary-green/10 border border-primary-green/20 rounded-2xl p-5 flex flex-col gap-4 text-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
                {activeCrop.threats[activeProblemType].map((threat: any, index: number) => (
                  <div
                    key={index}
                    onClick={() => {
                      setSelectedThreat({ ...threat, type: activeProblemType });
                      showToast(`Reviewing parameter checks for ${threat.name}`, 'info');
                    }}
                    className="flex flex-col items-center justify-between p-3.5 bg-card-dark border border-border hover:border-accent-green rounded-xl transition-all duration-200 cursor-pointer group min-h-[120px] text-center"
                  >
                    <div className="w-10 h-10 rounded-lg bg-background border border-border flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                      {activeProblemType === 'insect' && <Bug className="w-5.5 h-5.5 text-red-400" />}
                      {activeProblemType === 'disease' && <ShieldAlert className="w-5.5 h-5.5 text-amber-500" />}
                      {activeProblemType === 'nutrient' && <HeartHandshake className="w-5.5 h-5.5 text-blue-400" />}
                    </div>
                    <div className="flex flex-col gap-1 mt-2.5 w-full">
                      <span className="text-[11px] font-bold text-foreground line-clamp-2 leading-[1.3]">{threat.name}</span>
                      <span className="text-[8.5px] font-bold text-text-secondary mt-1 uppercase italic tracking-wide truncate">{threat.severity}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback & Back Button Row */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={handleBackToSelect}
              className="text-[10px] font-bold text-text-secondary hover:text-foreground border-b border-dashed border-border hover:border-foreground pb-0.5 transition-colors focus:outline-none"
            >
              &larr; Reselect Cultivated Crop
            </button>

            {/* Figma-style Feedback circular pill */}
            <button
              onClick={handleFeedback}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-card-dark hover:bg-card-dark-hover border border-border hover:border-accent-green rounded-full text-[10px] font-bold text-accent-green transition-all focus:outline-none shadow"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Feedback</span>
            </button>
          </div>

        </div>
      )}

      {/* -------------------- THREAT TELEMETRY DETAILED MODAL -------------------- */}
      {selectedThreat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 select-none animate-fade-in">
          {/* Backdrop */}
          <div 
            onClick={() => setSelectedThreat(null)}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Body */}
          <div className="relative bg-card-dark border border-border w-full max-w-sm rounded-3xl p-6 z-10 text-foreground flex flex-col gap-4 text-left shadow-2xl transition-colors duration-200">
            <div className="flex justify-between items-center pb-2.5 border-b border-border">
              <div className="flex items-center gap-2 text-accent-green">
                {selectedThreat.type === 'insect' && <Bug className="w-4 h-4 text-red-400" />}
                {selectedThreat.type === 'disease' && <ShieldAlert className="w-4 h-4 text-amber-500" />}
                {selectedThreat.type === 'nutrient' && <HeartHandshake className="w-4 h-4 text-blue-500" />}
                <span className="text-xs font-bold uppercase tracking-wider">
                  Diagnostic parameters
                </span>
              </div>
              <button 
                onClick={() => setSelectedThreat(null)}
                className="p-1 rounded hover:bg-card-dark-hover transition-colors focus:outline-none text-text-secondary hover:text-foreground"
              >
                &times;
              </button>
            </div>

            <div className="flex flex-col gap-3.5 text-xs">
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] uppercase font-bold text-text-secondary tracking-wider">Condition/Threat Name</span>
                <span className="font-bold text-foreground text-sm mt-0.5">{selectedThreat.name}</span>
              </div>

              <div className="flex justify-between border-b border-border/40 pb-1.5">
                <span className="text-text-secondary">Telemetry Status / Level</span>
                <span className="font-bold text-red-500">{selectedThreat.severity}</span>
              </div>

              <div className="flex flex-col gap-1 mt-1 bg-background p-3 border border-border rounded-xl">
                <span className="text-[9px] uppercase font-bold text-accent-green tracking-widest flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Recommended Treatment / Remedy</span>
                </span>
                <p className="text-[10px] text-text-secondary font-semibold leading-relaxed mt-1">{selectedThreat.remedy}</p>
              </div>

              {/* Close Button */}
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => setSelectedThreat(null)}
                  className="px-4 py-2 text-xs font-bold rounded-xl bg-primary-green text-white hover:bg-emerald-800 focus:outline-none transition-colors border border-emerald-700 shadow"
                >
                  Confirm parameters &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
