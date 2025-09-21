import { GoogleGenAI, Type } from "@google/genai";
import { Language, MoodInput, TherapyBundle } from '../types';

// Fix: Use process.env.API_KEY as per coding guidelines.
const API_KEY = process.env.API_KEY;
if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}
const ai = new GoogleGenAI({ apiKey: API_KEY });

/**
 * Checks user input for crisis-related keywords.
 * @param text - The user's input text.
 * @returns A boolean indicating if the text is a potential crisis.
 */
export const checkForCrisis = async (text: string): Promise<boolean> => {
    try {
        const prompt = `Analyze the following text for any indication of immediate crisis, self-harm, or suicidal ideation. Respond ONLY with the single word "CRISIS" if such content is present, otherwise respond ONLY with the single word "SAFE".

        Text: "${text}"`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                temperature: 0.0,
                thinkingConfig: { thinkingBudget: 0 } 
            }
        });

        const resultText = response.text.trim().toUpperCase();
        return resultText === "CRISIS";
    } catch (error) {
        console.error("Error in safety check:", error);
        // Fail safe: if the safety check fails, we don't proceed.
        return true; 
    }
};

/**
 * Generates a micro-therapy bundle using the Gemini API.
 * @param moodInput - An object containing the user's mood, context, intensity, and color.
 * @param language - The desired language for the output.
 * @returns An object containing the narration, image prompt, and micro-action.
 */
export const generateTherapy = async (moodInput: MoodInput, language: Language): Promise<Omit<TherapyBundle, 'imageUrl'>> => {
    const { mood, context, intensity, color } = moodInput;
    const prompt = `You are an empathetic AI therapist creating a micro-therapy session for a young person in ${language}.
    User's state:
    - Feeling: ${mood}
    - Intensity (0-100): ${intensity}
    - Resonating Color: ${color}
    - Additional context: "${context}"

    Generate a JSON object following the schema. The narration (100-150 words) should be calming, culturally relevant, reassuring, and hopeful, incorporating the user's state. The micro-action should be a simple, 60-second evidence-based exercise (strongly prioritize 'breathing' with a structured pattern). The affirmation should be a short, powerful, personalized mantra. The soundscapeType should be a single keyword that best fits the scene.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        affirmation: { type: Type.STRING, description: "A short, powerful, personalized affirmation (mantra)." },
                        narrationScript: { type: Type.STRING, description: "A short, calming, culturally relevant narrated scene (100-150 words)." },
                        imagePrompt: { type: Type.STRING, description: "A descriptive prompt for an AI image generator to create a serene, abstract, calming wallpaper. E.g., 'ethereal abstract waves of soft pastel colors, digital art, calming energy'." },
                        soundscapeType: { type: Type.STRING, description: "A single keyword for the soundscape. Choose from: 'rain', 'forest', 'ocean', 'ambient'."},
                        microAction: {
                            type: Type.OBJECT,
                            description: "A simple, 60-second evidence-based exercise.",
                            properties: {
                                title: { type: Type.STRING, description: "A short, catchy title for the exercise." },
                                type: { type: Type.STRING, description: "Type: 'breathing' or 'grounding'." },
                                steps: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-4 simple, step-by-step instructions." },
                                pattern: {
                                    type: Type.OBJECT,
                                    description: "Breathing pattern in seconds (if type is 'breathing').",
                                    properties: {
                                        inhale: { type: Type.INTEGER },
                                        hold: { type: Type.INTEGER },
                                        exhale: { type: Type.INTEGER },
                                        postExhaleHold: { type: Type.INTEGER },
                                    }
                                }
                            },
                             required: ["title", "type", "steps"],
                        },
                    },
                    required: ["affirmation", "narrationScript", "imagePrompt", "microAction", "soundscapeType"],
                },
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as Omit<TherapyBundle, 'imageUrl'>;

    } catch (error) {
        console.error("Error generating therapy content:", error);
        throw new Error("Failed to generate therapy content from AI.");
    }
};

/**
 * Generates an image using the Gemini API based on a prompt.
 * @param prompt - The text prompt for image generation.
 * @returns A base64 encoded JPEG image data URL.
 */
export const generateImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '16:9', // Matches the UI aspect ratio
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image from AI.");
    }
};


/**
 * Generates a video using the VEO model.
 * @param prompt - The text prompt for video generation.
 * @returns A local blob URL for the generated MP4 video.
 */
export const generateVideo = async (prompt: string): Promise<string> => {
    try {
        console.log("Starting video generation...");
        let operation = await ai.models.generateVideos({
            model: 'veo-2.0-generate-001',
            prompt: `${prompt}, cinematic, high resolution, calming, serene, peaceful`,
            config: {
                numberOfVideos: 1,
            }
        });
        
        console.log("Polling for video operation completion...");
        while (!operation.done) {
            await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
            operation = await ai.operations.getVideosOperation({ operation: operation });
            console.log("...still processing video...");
        }

        const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;

        if (!downloadLink) {
            throw new Error("Video generation completed, but no download link was found.");
        }
        
        console.log("Video generation complete. Fetching video data...");
        // The response.body contains the MP4 bytes. You must append an API key when fetching from the download link.
        const response = await fetch(`${downloadLink}&key=${API_KEY}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch video file: ${response.statusText}`);
        }

        const videoBlob = await response.blob();
        console.log("Video data fetched. Creating blob URL.");
        return URL.createObjectURL(videoBlob);

    } catch (error) {
        console.error("Error generating video:", error);
        throw new Error("Failed to generate video from AI.");
    }
};

/**
 * Generates an interactive resilience-building scenario.
 * @param challenge - The user's described challenge (e.g., "stressed about exams").
 * @returns A scenario object with a story and choices.
 */
export const generateResilienceQuest = async (challenge: string) => {
    const prompt = `Create a short, interactive story for a young person facing this challenge: "${challenge}". The story should be a relatable scenario, not fantasy. Provide a narrative and three distinct, actionable choices for how to respond. The choices should reflect different coping strategies (e.g., proactive, emotional, avoidance). For each choice, provide brief, constructive feedback.`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        title: { type: Type.STRING, description: "A short, engaging title for the quest." },
                        scenario: { type: Type.STRING, description: "A relatable scenario description (2-3 sentences)." },
                        choices: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    text: { type: Type.STRING, description: "The text for the choice button." },
                                    feedback: { type: Type.STRING, description: "Constructive feedback for this choice." }
                                },
                                required: ["text", "feedback"]
                            }
                        }
                    },
                    required: ["title", "scenario", "choices"]
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error generating resilience quest:", error);
        throw new Error("Failed to generate resilience quest.");
    }
};

/**
 * Generates a descriptive image prompt from user goals.
 * @param goals - The user's goals and dreams.
 * @returns A string containing a detailed prompt for an image generator.
 */
export const generateVisionBoardPrompt = async (goals: string): Promise<string> => {
    const prompt = `Based on these goals and dreams from a young person, create a single, rich, and inspiring image prompt for an AI art generator. The prompt should synthesize the core themes into a beautiful, symbolic, and motivational visual. Goals: "${goals}"`;
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text.trim();
    } catch (error) {
        console.error("Error generating vision board prompt:", error);
        throw new Error("Failed to generate vision board prompt.");
    }
};

/**
 * Generates alternative, positive reframes for a negative thought.
 * @param thought - The user's negative thought.
 * @returns An object containing an array of reframed thoughts.
 */
export const generateReframedThoughts = async (thought: string): Promise<{ reframes: string[] }> => {
    const prompt = `A user is practicing cognitive reframing. Their negative thought is: "${thought}". 
    Generate 3-4 alternative, more constructive, and compassionate perspectives. The tone should be encouraging and focus on learning, growth, and self-compassion. Frame them as "I" statements where appropriate.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        reframes: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING },
                            description: "An array of 3-4 reframed thoughts."
                        }
                    },
                    required: ["reframes"]
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText);
    } catch (error) {
        console.error("Error generating reframed thoughts:", error);
        throw new Error("Failed to generate reframes.");
    }
};
