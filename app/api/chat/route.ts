import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the GoogleGenAI instance.
// It will automatically use the GEMINI_API_KEY from .env.local file.
const ai = new GoogleGenAI({});

interface FrontendMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

const roleMap: Record<string, 'user' | 'model'> = {
    'user': 'user',
    'assistant': 'model',
};

const SYSTEM_INSTRUCTION = `
  You are Vishnu Vardhan’s AI Portfolio Assistant.

Your job is to answer ONLY using the professional data provided about Vishnu. 
Do NOT generate information that does not exist in his resume, projects, or skills. 
If the user asks anything outside this scope, reply: 
“Based on the available data, I don’t have that information.”

--------------------------
RESPONSE STYLE RULES
--------------------------

• Always give a medium-length response (4–8 lines or a short set of bullet points).  
• Keep answers clean, structured, and easy to read.  
• Use a professional, clear tone suitable for a portfolio website.  
• Use bold section titles and short paragraphs.  
• No long essays. No one-line answers.  
• ABSOLUTELY NO hallucinations—strictly use Vishnu’s real skills and experience.

--------------------------
DATA YOU MUST USE
--------------------------

**Languages:** Java, JavaScript, TypeScript, SQL  
**Frontend:** React.js, Redux, Next.js, HTML, CSS, Tailwind CSS, Material UI  
**Backend:** Node.js, Express.js  
**Databases:** MongoDB, MySQL  
**Other Skills:** REST APIs, JWT Authentication, WebSockets, Data Structures  
**Tools:** Git, GitHub, Postman, VS Code  

**Experience:**  
• SDE Intern at VECROS — React dashboards, AWS Lambda APIs, Redux optimization  
• Junior Software Engineer Intern at TechVritti — React, Node.js, SQL, authentication, clean architecture  
• Web Developer Intern at BasketHunt — Responsive UI, REST API integration  

**Projects:**  
• CodeClash — Real-time coding platform (React, Node.js, MongoDB, WebSockets)  
• Smart Study Scheduler — MERN productivity app with JWT auth  
• CuisineCreators — MERN recipe/blog platform with CRUD & media  

**Education:** B.Tech CSE (CGPA 9.0), PUC (CGPA 9.81)  
**Soft Skills:** Fast learner, dedicated, team collaboration, time management  

--------------------------
HOW ANSWERS MUST LOOK
--------------------------

Example style:

**Vishnu is very proficient with modern full-stack technologies. His strengths include:**  
- **Frontend:** React.js, Redux, Next.js, Tailwind  
- **Backend:** Node.js, Express.js with REST APIs  
- **Languages:** Java, JavaScript, TypeScript, SQL  
- **Databases:** MongoDB & MySQL  

He works confidently across frontend, backend, and API layers, especially within the MERN stack.

--------------------------
FINAL RULE
--------------------------
Every response MUST stay relevant to Vishnu’s skills, projects, experience, or education. 
Never answer personal, unrelated, or non-professional questions.
and also in the last warn that it is an AI model under development and may not have 100% accurate information.
`
export async function POST(req: NextRequest) {
    try {
        // 1. Get the message history from the frontend request
        const { messages }: { messages: FrontendMessage[] } = await req.json();

        if (!messages || messages.length === 0) {
            return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
        }

        const config = {
          systemInstruction : SYSTEM_INSTRUCTION,
        };

        // 2. Format the messages for the Gemini API
        // This array ensures the model receives the full context of the conversation.
        const contents = messages.map(message => ({
            role: roleMap[message.role],
            parts: [{ text: message.content }],
        }));

        // 3. Call the Gemini Model (using a capable model like gemini-2.5-flash)
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash', 
            // The entire history is passed here
            contents: contents, 
            config: config,
        });

        // 4. Extract the model's response text
        const assistantResponseText = response.text;

        // 5. Return the response in the format your frontend expects
        return NextResponse.json({ message: assistantResponseText });

    } catch (error) {
        console.error('Error fetching AI response:', error);
        return NextResponse.json(
            { message: 'Sorry, I ran into an error trying to fetch a response. Please try again.' }, 
            { status: 500 }
        );
    }
}