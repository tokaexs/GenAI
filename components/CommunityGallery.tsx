import React, { useState, useEffect, useRef } from 'react';
import { GalleryItem } from '../types';

interface CommunityGalleryProps {
    items: GalleryItem[];
}

const GalleryCard: React.FC<{ item: GalleryItem; onClick: () => void }> = ({ item, onClick }) => (
    <div 
        className="break-inside-avoid mb-4 group cursor-pointer"
        onClick={onClick}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
        role="button"
        tabIndex={0}
    >
        <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <img 
                src={item.imageUrl} 
                alt="Shared MoodScape art" 
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white text-sm italic transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    "{item.affirmation}"
                </p>
            </div>
        </div>
    </div>
);

const DetailModal: React.FC<{ item: GalleryItem; onClose: () => void }> = ({ item, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
         <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 animate-fade-in"
            onClick={onClose}
        >
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-label="Image detail view"
                className="relative max-w-4xl w-11/12 animate-modal-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                 <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 bg-white/20 hover:bg-white/30 text-white font-bold p-3 rounded-full transition-colors z-10"
                    aria-label="Close detail view"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <figure>
                    <img src={item.imageUrl} alt="Shared MoodScape art" className="w-full h-auto object-contain rounded-lg shadow-2xl max-h-[80vh]" />
                    <figcaption className="text-center text-slate-300 italic mt-4">
                        "{item.affirmation}"
                    </figcaption>
                </figure>
            </div>
        </div>
    );
};

export const CommunityGallery: React.FC<CommunityGalleryProps> = ({ items }) => {
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    return (
        <div className="w-full animate-fade-in-up text-left">
             <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                    Community Gallery
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                    An anonymous wall of shared MoodScapes from around the world. You are not alone.
                </p>
            </div>
            
            <div className="w-full columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {items.map(item => (
                    <GalleryCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                ))}
            </div>

            {selectedItem && (
                <DetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />
            )}
        </div>
    );
};
