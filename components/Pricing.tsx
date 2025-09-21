import React from 'react';
import { Plan } from './PaymentModal';

interface PricingProps {
    onUpgrade: (plan: Plan) => void;
}

const CheckIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-cyan-500 dark:text-cyan-400" aria-hidden="true">
        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
    </svg>
);

const PricingCard: React.FC<{
    plan: string;
    price: string;
    description: string;
    features: string[];
    isFeatured?: boolean;
    onUpgrade: (plan: Plan) => void;
}> = ({ plan, price, description, features, isFeatured = false, onUpgrade }) => {
    const isFreePlan = price === "$0";
    
    let buttonContent: React.ReactNode;
    let buttonClasses: string;

    if (isFreePlan) {
        buttonContent = "Your Current Plan";
        buttonClasses = "w-full font-bold py-3 px-4 rounded-full text-lg bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed";
    } else if (isFeatured) {
        buttonContent = `Upgrade to ${plan}`;
        buttonClasses = "w-full font-bold py-3 px-4 rounded-full text-lg transition-all duration-300 ease-in-out shadow-lg bg-gradient-to-r from-cyan-500 to-fuchsia-600 hover:from-cyan-400 hover:to-fuchsia-500 text-white hover:shadow-cyan-500/50 dark:hover:shadow-cyan-400/30";
    } else {
        buttonContent = `Upgrade to ${plan}`;
        buttonClasses = "w-full font-bold py-3 px-4 rounded-full text-lg transition-all duration-300 ease-in-out shadow-lg bg-slate-600 hover:bg-slate-700 dark:bg-slate-500 dark:hover:bg-slate-600 text-white";
    }

    const handleUpgradeClick = () => {
        onUpgrade({ name: plan, price: price });
    };

    return (
        <div className={`relative w-full max-w-sm p-8 rounded-2xl transform transition-all duration-500 ease-in-out ${isFeatured ? 'glassmorphism border-cyan-500/50 dark:border-cyan-400/50 scale-105 shadow-2xl' : 'glassmorphism hover:scale-105 hover:shadow-xl'}`}>
            {isFeatured && <div className="absolute top-0 right-8 -mt-4 bg-fuchsia-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>}
             {isFeatured && <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 rounded-2xl blur-lg opacity-60 animate-pulse" style={{ animationDuration: '4s' }}></div>}
            <div className="relative">
                <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">{plan}</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-6">{description}</p>
                <p className="mb-6">
                    <span className="text-5xl font-extrabold text-slate-900 dark:text-white">{price}</span>
                    { !isFreePlan && <span className="text-lg font-medium text-slate-500 dark:text-slate-400">/month</span> }
                </p>
                <ul className="space-y-4 text-left mb-8">
                    {features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                            <CheckIcon />
                            <span className="text-slate-700 dark:text-slate-300">{feature}</span>
                        </li>
                    ))}
                </ul>
                <button
                    disabled={isFreePlan}
                    onClick={handleUpgradeClick}
                    className={buttonClasses}
                >
                    {buttonContent}
                </button>
            </div>
        </div>
    );
};

export const Pricing: React.FC<PricingProps> = ({ onUpgrade }) => {
    return (
        <div className="w-full animate-fade-in-up">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-fuchsia-500 dark:from-cyan-400 dark:to-fuchsia-400 mb-3">
                    Find Your Plan
                </h1>
                <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto">
                    Choose the plan that best fits your journey to mindfulness and well-being.
                </p>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-center lg:items-stretch gap-8">
                <PricingCard
                    plan="Explorer"
                    price="$0"
                    description="Your current plan with essential features."
                    features={['5 MoodScapes per month', 'Standard AI chat', 'Community access']}
                    onUpgrade={onUpgrade}
                />
                <PricingCard
                    plan="Companion"
                    price="$9"
                    description="Deeper personalization and more content."
                    features={['Unlimited MoodScapes', 'Advanced AI chat', 'Video scene generation', 'Save your favorites']}
                    isFeatured
                    onUpgrade={onUpgrade}
                />
                <PricingCard
                    plan="Sanctuary"
                    price="$19"
                    description="The ultimate wellness toolkit for you."
                    features={['All Companion features', 'Voice journaling (Coming soon)', 'Personalized progress tracking', 'Priority support']}
                    onUpgrade={onUpgrade}
                />
            </div>
        </div>
    );
};