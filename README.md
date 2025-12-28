# ANTIGRAVITY AI – Cognitive Load Reduction System

An AI-powered web application that intelligently organizes, prioritizes, and simplifies tasks to reduce mental friction and prevent burnout.

## 🚀 Features

### Core Functionality
- **Manual Task Addition**: Add tasks with title, description, and optional deadline
- **File Upload Support**: Import tasks from CSV or text files
- **AI-Powered Analysis**: Automatic task categorization and prioritization using OpenAI
- **Smart Categorization**: Tasks automatically sorted into "Do Now", "Do Later", or "Delegate/Drop"
- **Priority Scoring**: 1-10 priority scale based on urgency and importance
- **Effort Estimation**: AI-calculated time estimates for task completion
- **Burnout Prevention**: Real-time burnout risk assessment based on workload

### User Experience
- **Futuristic UI**: Clean, minimal design with glassmorphism effects
- **Real-time Updates**: Instant feedback and task reorganization
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Intuitive Interface**: "Invisible AI" that works behind the scenes

## 🏗️ System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   (Next.js)     │◄──►│   (Next.js API) │◄──►│   (Firebase)    │
│                 │    │                 │    │                 │
│ • React Components│   │ • Task CRUD     │   │ • Tasks Collection│
│ • Task Management│   │ • AI Analysis   │   │ • User Data      │
│ • Burnout Monitor│   │ • File Upload   │   │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌─────────────────┐
                       │   AI Service    │
                       │   (OpenAI)      │
                       │                 │
                       │ • Task Analysis │
                       │ • NLP Processing│
                       │ • Reasoning     │
                       └─────────────────┘
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore
- **AI**: OpenAI GPT-3.5-turbo
- **UI Components**: Lucide React icons
- **File Processing**: PapaParse for CSV handling

## 📋 Prerequisites

- Node.js 18+
- npm or yarn
- Firebase project
- OpenAI API key

## 🚀 Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd antigravity-ai
npm install
```

### 2. Environment Setup

Copy the environment template and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your actual API keys:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key
```

### 3. Firebase Setup

1. Create a new Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Firestore Database
3. Get your Firebase config from Project Settings
4. Add your domain to authorized domains if deploying

### 4. OpenAI Setup

1. Get your API key from [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Ensure you have credits in your OpenAI account

### 5. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 Usage

### Adding Tasks

1. **Manual Entry**: Use the task input form to add tasks with title, description, and deadline
2. **File Upload**: Click "Upload CSV/Text" to import multiple tasks from a file

### Task Categories

- **Do Now**: Urgent, high-priority tasks requiring immediate attention
- **Do Later**: Important but not urgent tasks
- **Delegate/Drop**: Tasks that can be delegated or eliminated

### Burnout Monitoring

The system continuously monitors your workload and provides burnout risk indicators based on:
- Total number of tasks
- High-priority task count
- Tasks with approaching deadlines

## 🔧 API Endpoints

### Tasks Management
- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Add a new task (triggers AI analysis)
- `PUT /api/tasks/[id]` - Update a task
- `DELETE /api/tasks/[id]` - Delete a task

### AI Analysis
- `POST /api/analyze` - Analyze task text and return categorization

### Request/Response Examples

**Add Task:**
```json
POST /api/tasks
{
  "title": "Complete project proposal",
  "description": "Write and review the Q1 project proposal",
  "deadline": "2024-02-15T17:00:00Z"
}
```

**Response:**
```json
{
  "id": "task_123",
  "title": "Complete project proposal",
  "description": "Write and review the Q1 project proposal",
  "deadline": "2024-02-15T17:00:00Z",
  "category": "Do Now",
  "priority_score": 9,
  "estimated_effort": 4,
  "burnout_risk": "medium",
  "user_id": "user_456",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

## 🗃️ Database Schema

### Tasks Collection
```typescript
interface Task {
  id: string
  title: string
  description?: string
  deadline?: string
  priority_score: number (1-10)
  estimated_effort: number (hours)
  category: 'Do Now' | 'Do Later' | 'Delegate / Drop'
  burnout_risk: 'low' | 'medium' | 'high'
  user_id: string
  created_at: string
  updated_at: string
}
```

## 🤖 AI Prompt Logic

The system uses OpenAI to analyze tasks with this prompt structure:

```
Analyze this task and provide a JSON response with categorization,
priority scoring, effort estimation, and burnout risk assessment.

Task: [task text]
Deadline: [deadline or "No deadline specified"]

Consider: urgency, complexity, delegation potential, workload impact
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push

### Other Platforms

The app can be deployed to any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔮 Future Enhancements

- [ ] Google Calendar integration for deadline syncing
- [ ] Team collaboration features
- [ ] Advanced analytics and reporting
- [ ] Mobile app development
- [ ] Voice input for task creation
- [ ] Integration with popular project management tools

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Inspired by Google's Antigravity concept
- Built with modern web technologies
- Powered by AI for cognitive load reduction

---

**Experience the future of task management with ANTIGRAVITY AI – where AI works invisibly to reduce your mental friction.**
