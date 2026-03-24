"use client";

import { useEffect, useState, useCallback } from "react";
import { MapContainer, GeoJSON, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { FeatureCollection } from "geojson";
import { provinceStoryMap, storyInfoMap } from "@/stories";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X } from "lucide-react";
import { prefetchStoryModule, preloadStoryAssets } from "@/lib/preload-assets";

// Get initials from province name (e.g., "Sulawesi Utara" -> "SU")
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

// Track which stories have been prefetched
const prefetchedStories = new Set<string>();

export default function DashboardMap() {
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<{name: string, storySlug: string | null, position: [number, number]} | null>(null);

  useEffect(() => {
    fetch("/indonesia.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("Error loading GeoJSON", err));
  }, []);

  // Prefetch story when province with story is hovered
  const handlePrefetch = useCallback((storySlug: string) => {
    if (!prefetchedStories.has(storySlug)) {
      prefetchedStories.add(storySlug);
      // Prefetch the JS module
      prefetchStoryModule(storySlug);
      // Preload critical assets in background
      preloadStoryAssets(storySlug).catch(() => {
        // Silently fail, will retry on game start
      });
    }
  }, []);

  if (!geoData) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-t-2 border-[#E86B52] animate-spin" />
      </div>
    );
  }

  const handleProvinceSelect = (stateName: string, position: [number, number]) => {
    const slug = provinceStoryMap[stateName];
    setSelectedProvince({ name: stateName, storySlug: slug || null, position });
  };

  const selectedStoryInfo = selectedProvince?.storySlug ? storyInfoMap[selectedProvince.storySlug] : null;

  return (
    <div className="w-full h-full absolute inset-0 z-0 overflow-hidden">
      <MapContainer
        center={[-2.5, 118]} // Center of Indonesia
        zoom={5}
        zoomControl={false}
        attributionControl={false}
        scrollWheelZoom={true}
        dragging={true}
        className="w-full h-full bg-[#0A0705]"
        style={{
            background: "#0A0705"
        }}
      >
        {selectedProvince && (
          <Popup position={selectedProvince.position} closeButton={false} className="custom-map-popup mt-[-20px]">
            <div className="relative p-6 w-80 bg-[#0D0907] border border-transparent shadow-[0_10px_40px_rgba(0,0,0,0.8)] text-[#f4e1d1] transition-all duration-300 animate-in fade-in zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 group">
              {/* Corner brackets matching landing page */}
              <div className="absolute top-0 left-0 w-3 h-3 border-l border-t border-gray-800 transition-colors" />
              <div className="absolute top-0 right-0 w-3 h-3 border-r border-t border-gray-800 transition-colors" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-gray-800 transition-colors" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-gray-800 transition-colors" />

              <div className="relative">
                <button 
                  onClick={() => setSelectedProvince(null)}
                  className="absolute -top-2 -right-2 text-gray-500 hover:text-[#D96B4A] transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <div className="flex flex-col">
                  {selectedProvince.storySlug && selectedStoryInfo ? (
                    <>
                      <div className="mb-4 inline-flex border border-gray-800/80 rounded-sm relative self-start overflow-hidden">
                         <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-gray-600 z-10"></div>
                         <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-gray-600 z-10"></div>
                         {selectedStoryInfo.coverImage ? (
                           <Image 
                             src={selectedStoryInfo.coverImage} 
                             alt="" 
                             width={56} 
                             height={56} 
                             className="object-cover w-14 h-14"
                           />
                         ) : (
                           <div className="w-14 h-14 bg-gradient-to-br from-[#2a1a14] to-[#1a0f0a] flex items-center justify-center">
                             <span className="text-[#D96B4A]/60 text-base font-serif">
                               {getInitials(selectedProvince.name)}
                             </span>
                           </div>
                         )}
                      </div>
                      
                      <h3 className="text-lg font-serif text-white mb-3 tracking-wide">
                        Provinsi {selectedProvince.name}
                      </h3>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                         {selectedStoryInfo.title}. Petualangan menantimu di daerah ini—apakah kamu siap menjelajahi warisan nusantara?
                      </p>

                      <Button 
                        onClick={() => {
                          window.location.href = `/game?story=${selectedProvince.storySlug}`;
                        }}
                        className="w-full bg-[#1A1410] border border-gray-800 hover:border-[#D96B4A]/60 text-[#D96B4A] hover:bg-[#D96B4A]/10 transition-all uppercase tracking-widest text-xs py-5 rounded-none shadow-none font-sans"
                      >
                        Mulai Perjalanan
                      </Button>
                    </>
                  ) : (
                    <>
                       <div className="mb-4 inline-flex border border-gray-800/80 rounded-sm relative self-start overflow-hidden">
                         <div className="absolute top-0 left-0 w-1.5 h-1.5 border-l border-t border-gray-600 z-10"></div>
                         <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-r border-b border-gray-600 z-10"></div>
                         <div className="w-14 h-14 bg-gradient-to-br from-[#2a1a14] to-[#1a0f0a] flex items-center justify-center">
                           <span className="text-gray-600 text-base font-serif">
                             {getInitials(selectedProvince.name)}
                           </span>
                         </div>
                      </div>
                      
                      <h3 className="text-lg font-serif text-white mb-3 tracking-wide">
                        Provinsi {selectedProvince.name}
                      </h3>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-4">
                         Belum ada cerita yang tersedia untuk wilayah ini. Ikuti terus pembaruannya!
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Popup>
        )}

        <GeoJSON
          data={geoData}
          style={(feature) => {
             const stateName = feature?.properties?.state;
             const hasStory = !!provinceStoryMap[stateName];
             return {
                color: "#6b332b",
                weight: 1,
                fillColor: hasStory ? "#3d1c16" : "#170c09", // highlight provinces with stories slightly
                fillOpacity: hasStory ? 0.8 : 0.6,
             };
          }}
          onEachFeature={(feature, layer) => {
            const stateName = feature?.properties?.state;
            const hasStory = !!provinceStoryMap[stateName];
            const storySlug = provinceStoryMap[stateName];
            layer.on({
                click: (e) => {
                   handleProvinceSelect(stateName, [e.latlng.lat, e.latlng.lng]);
                },
                mouseover: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                        color: "#E86B52",
                        weight: 1.5,
                        fillColor: hasStory ? "#4a231b" : "#2a1410",
                    });
                    layer.bringToFront();
                    // Prefetch story assets when hovering over province with story
                    if (storySlug) {
                      handlePrefetch(storySlug);
                    }
                },
                mouseout: (e) => {
                    const layer = e.target;
                    layer.setStyle({
                        color: "#6b332b",
                        weight: 1,
                        fillColor: hasStory ? "#3d1c16" : "#170c09",
                    });
                }
            });
          }}
        />
      </MapContainer>
    </div>
  );
}