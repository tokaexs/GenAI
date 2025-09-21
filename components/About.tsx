import React from 'react';

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-8">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-fuchsia-500 mb-3">{title}</h2>
        <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
            {children}
        </div>
    </div>
);

interface AboutProps {
    onExplore: () => void;
    onViewPricing: () => void;
}

export const About: React.FC<AboutProps> = ({ onExplore, onViewPricing }) => {
    return (
        <div className="w-full max-w-3xl mx-auto animate-fade-in-up text-left">
            <header className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                    About MoodScape
                </h1>
                <p className="text-lg text-slate-500 dark:text-slate-400">
                    Your pocket sanctuary, powered by generative AI.
                </p>
            </header>

            <div className="glassmorphism p-6 sm:p-8 rounded-2xl">
                <Section title="Our Mission">
                    <p>
                        In a world that's more connected yet often more isolating, youth mental wellness has never been more crucial. MoodScape's mission is to provide an accessible, immediate, and personalized space for young people to find calm and build emotional resilience. We believe that technology, when thoughtfully applied, can be a powerful ally in mental well-being.
                    </p>
                </Section>

                <Section title="How It Works">
                    <p>
                        MoodScape uses advanced generative AI to create a unique therapeutic experience just for you. Here’s a peek behind the curtain:
                    </p>
                    <ul className="list-disc list-inside space-y-2 pl-2">
                        <li>
                            <strong className="font-semibold text-slate-700 dark:text-slate-200">You Share, We Listen:</strong> You start by selecting a mood or describing how you feel. This context is the seed for your personalized session.
                        </li>
                        <li>
                            <strong className="font-semibold text-slate-700 dark:text-slate-200">AI-Powered Creation:</strong> Our engine, powered by Google's Gemini models, interprets your input and generates a complete "Therapy Bundle" — a unique combination of a calming narration, a powerful affirmation, a stunning visual, and a simple, guided micro-action like a breathing exercise.
                        </li>
                        <li>
                            <strong className="font-semibold text-slate-700 dark:text-slate-200">A Multi-Sensory Sanctuary:</strong> The result is an immersive, multi-sensory experience designed to guide you to a state of calm in just a few minutes. Every session is different, tailored to your needs in that specific moment.
                        </li>
                    </ul>
                </Section>
                
                <Section title="Our Commitment to Safety">
                     <p>
                        Your well-being is our highest priority. MoodScape is designed as a supportive tool, not a replacement for professional medical advice. Our AI includes a safety layer to detect crisis language and guide users toward professional help when needed. We are committed to creating a responsible and safe environment.
                    </p>
                </Section>

                <Section title="Why Youth Wellness Matters">
                    <p>
                        The formative years of youth are a period of immense growth, change, and challenge. Providing tools that foster self-awareness, stress management, and emotional regulation can have a lifelong positive impact. By making wellness practices engaging and accessible, we hope to empower the next generation to navigate life's ups and downs with greater confidence and peace.
                    </p>
                </Section>

                <div className="mt-10 pt-8 border-t border-slate-300/20 dark:border-slate-700/20 text-center">
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-fuchsia-500 mb-4">Ready to Begin?</h2>
                    <p className="text-slate-600 dark:text-slate-300 mb-6 max-w-xl mx-auto">
                        Start your journey towards a calmer mind today. Explore a personalized session or see our plans.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <button
                            onClick={onExplore}
                            className="w-full sm:w-auto bg-gradient-to-r from-cyan-600 to-fuchsia-700 hover:from-cyan-500 hover:to-fuchsia-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-cyan-500/50"
                        >
                            Explore MoodScape
                        </button>
                        <button
                            onClick={onViewPricing}
                            className="w-full sm:w-auto font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105 glassmorphism text-slate-800 dark:text-slate-100 hover:bg-slate-200/50 dark:hover:bg-slate-700/50"
                        >
                            View Pricing
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};