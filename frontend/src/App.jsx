
import { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate
} from 'react-router-dom'

import './App.css'

// =====================================
// AI TOOLS DATA WITH LOGOS
// =====================================

const tools = [
  {
    name: 'ChatGPT',
    category: 'AI Writing',
    icon: '🤖',
    logo: 'https://cdn.simpleicons.org/openai',
    description: 'AI assistant for writing, learning and coding.',
    price: 'Freemium',
    url: 'https://chatgpt.com',
    details: 'ChatGPT helps users write content, answer questions, learn new topics and generate code.',
    features: ['AI Chat Assistant', 'Content Writing', 'Coding Help', 'Learning Support']
  },
  {
    name: 'Claude',
    category: 'AI Writing',
    icon: '🧠',
    logo: 'https://cdn.simpleicons.org/anthropic',
    description: 'AI assistant for writing and reasoning.',
    price: 'Freemium',
    url: 'https://claude.ai',
    details: 'Claude is an AI assistant designed for writing, analysis and reasoning.',
    features: ['Writing', 'Document Analysis', 'Reasoning']
  },
  {
    name: 'Grammarly',
    category: 'AI Writing',
    icon: '✍️',
    logo: 'https://cdn.simpleicons.org/grammarly',
    description: 'Improve grammar and writing quality.',
    price: 'Freemium',
    url: 'https://grammarly.com',
    details: 'Grammarly helps improve grammar, spelling and writing style.',
    features: ['Grammar Checking', 'Spelling', 'Writing Suggestions']
  },
  {
    name: 'DALL-E',
    category: 'AI Image',
    icon: '🎨',
    logo: 'https://cdn.simpleicons.org/openai',
    description: 'Create images using text prompts.',
    price: 'Paid',
    url: 'https://openai.com',
    details: 'DALL-E generates images from written descriptions.',
    features: ['Text to Image', 'Creative Images', 'Image Editing']
  },
  {
    name: 'Canva AI',
    category: 'AI Image',
    icon: '🖌️',
    logo: 'https://cdn.simpleicons.org/canva',
    description: 'Create designs using AI features.',
    price: 'Freemium',
    url: 'https://canva.com',
    details: 'Canva provides AI-powered design features.',
    features: ['Graphic Design', 'Presentations', 'AI Design Tools']
  },
  {
    name: 'Leonardo AI',
    category: 'AI Image',
    icon: '🖼️',
    logo: 'https://cdn.simpleicons.org/leonardo',
    description: 'Generate creative AI images.',
    price: 'Freemium',
    url: 'https://leonardo.ai',
    details: 'Leonardo AI helps users generate creative digital images.',
    features: ['Image Generation', 'Creative Design', 'Visual Assets']
  },
  {
    name: 'Runway',
    category: 'AI Video',
    icon: '🎬',
    logo: 'https://cdn.simpleicons.org/runway',
    description: 'AI-powered video creation and editing.',
    price: 'Freemium',
    url: 'https://runwayml.com',
    details: 'Runway offers AI-powered video generation and editing.',
    features: ['Video Generation', 'Video Editing', 'Creative Effects']
  },
  {
    name: 'Pika',
    category: 'AI Video',
    icon: '🎥',
    logo: 'https://cdn.simpleicons.org/pika',
    description: 'Generate videos using AI.',
    price: 'Freemium',
    url: 'https://pika.art',
    details: 'Pika transforms creative prompts into AI-generated videos.',
    features: ['Text to Video', 'Video Creation', 'Creative Effects']
  },
  {
    name: 'GitHub Copilot',
    category: 'AI Coding',
    icon: '💻',
    logo: 'https://cdn.simpleicons.org/githubcopilot',
    description: 'AI coding assistant for developers.',
    price: 'Paid',
    url: 'https://github.com/features/copilot',
    details: 'GitHub Copilot assists developers with code suggestions.',
    features: ['Code Suggestions', 'Code Completion', 'Programming Help']
  },
  {
    name: 'Cursor',
    category: 'AI Coding',
    icon: '⌨️',
    logo: 'https://cdn.simpleicons.org/cursor',
    description: 'AI-powered code editor.',
    price: 'Freemium',
    url: 'https://cursor.com',
    details: 'Cursor is an AI-powered code editor.',
    features: ['AI Code Editor', 'Code Generation', 'Code Assistance']
  },
  {
    name: 'ElevenLabs',
    category: 'AI Audio',
    icon: '🎙️',
    logo: 'https://cdn.simpleicons.org/elevenlabs',
    description: 'AI voice generation and audio tools.',
    price: 'Freemium',
    url: 'https://elevenlabs.io',
    details: 'ElevenLabs provides AI-powered voice generation.',
    features: ['Text to Speech', 'Voice Generation', 'Audio Tools']
  },
  {
    name: 'Suno',
    category: 'AI Audio',
    icon: '🎵',
    logo: 'https://cdn.simpleicons.org/suno',
    description: 'Create music using AI.',
    price: 'Freemium',
    url: 'https://suno.com',
    details: 'Suno helps users create AI-generated music.',
    features: ['AI Music', 'Song Generation', 'Creative Audio']
  },
  {
    name: 'Quizlet',
    category: 'AI Education',
    icon: '📚',
    logo: 'https://cdn.simpleicons.org/quizlet',
    description: 'AI-powered study and learning tools.',
    price: 'Freemium',
    url: 'https://quizlet.com',
    details: 'Quizlet provides digital study tools.',
    features: ['Flashcards', 'Study Tools', 'Learning Support']
  },
  {
    name: 'Notion AI',
    category: 'AI Productivity',
    icon: '📝',
    logo: 'https://cdn.simpleicons.org/notion',
    description: 'AI-powered notes and productivity.',
    price: 'Paid',
    url: 'https://notion.so',
    details: 'Notion AI helps users organize information.',
    features: ['AI Writing', 'Note Taking', 'Productivity']
  },
  {
    name: 'Perplexity',
    category: 'AI Research',
    icon: '🔍',
    logo: 'https://cdn.simpleicons.org/perplexity',
    description: 'AI-powered research and answers.',
    price: 'Freemium',
    url: 'https://perplexity.ai',
    details: 'Perplexity is an AI-powered search assistant.',
    features: ['AI Search', 'Research', 'Question Answering']
  }
]

const categories = [
  'All',
  'AI Writing',
  'AI Image',
  'AI Video',
  'AI Coding',
  'AI Audio',
  'AI Education',
  'AI Productivity',
  'AI Research'
]

// =====================================
// STORAGE
// =====================================

function readStorage(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return value ?? fallback
  } catch {
    return fallback
  }
}

// =====================================
// LOGIN
// =====================================

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(
        'http://127.0.0.1:5000/api/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      if (!data.user) {
        throw new Error('User information not received from backend.')
      }

      localStorage.setItem('loggedInUser', JSON.stringify(data.user))
      alert('Login successful!')
      navigate('/dashboard')

    } catch (error) {
      alert(error.message || 'Backend connection failed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card animated-card">
        <div className="auth-logo">🤖</div>
        <h1>Welcome Back!</h1>
        <p>Login to your AI Tools Hub account ✨</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? '⏳ Logging in...' : '🚀 Login'}
          </button>
        </form>

        <p className="auth-link">
          Don't have an account?
          <Link to="/register"> Register</Link>
        </p>

        <Link className="back-home" to="/">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

// =====================================
// REGISTER
// =====================================

function Register() {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters.')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        'http://127.0.0.1:5000/api/register',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed')
      }

      alert(data.message || 'Registration successful!')
      navigate('/login')

    } catch (error) {
      alert(error.message || 'Backend connection failed!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card animated-card">
        <div className="auth-logo">🌟</div>
        <h1>Create Account</h1>
        <p>Join AI Tools Hub today!</p>

        <form onSubmit={handleRegister}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            minLength={8}
            required
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? '⏳ Registering...' : '✨ Register'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

        <Link className="back-home" to="/">
          ← Back to Home
        </Link>
      </div>
    </div>
  )
}

// =====================================
// TOOL LOGO COMPONENT
// =====================================

function ToolLogo({ tool }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="tool-logo">
      {!imageError && tool.logo ? (
        <img
          src={tool.logo}
          alt={`${tool.name} logo`}
          onError={() => setImageError(true)}
        />
      ) : (
        <span>{tool.icon}</span>
      )}
    </div>
  )
}

// =====================================
// HOME PAGE
// =====================================

function HomePage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [showFavorites, setShowFavorites] = useState(false)
  const [selectedTool, setSelectedTool] = useState(null)

  const [favorites, setFavorites] = useState(() =>
    readStorage('ai-tool-favorites', [])
  )

  const [reviews, setReviews] = useState(() =>
    readStorage('ai-tool-reviews', [])
  )

  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState('')
  const [reviewMessage, setReviewMessage] = useState('')

  useEffect(() => {
    localStorage.setItem(
      'ai-tool-favorites',
      JSON.stringify(favorites)
    )
  }, [favorites])

  useEffect(() => {
    localStorage.setItem(
      'ai-tool-reviews',
      JSON.stringify(reviews)
    )
  }, [reviews])

  const toggleFavorite = (name) => {
    setFavorites(previous =>
      previous.includes(name)
        ? previous.filter(item => item !== name)
        : [...previous, name]
    )
  }

  const filteredTools = tools.filter(tool => {
    const text = search.toLowerCase()

    const matchesSearch =
      tool.name.toLowerCase().includes(text) ||
      tool.description.toLowerCase().includes(text) ||
      tool.category.toLowerCase().includes(text)

    const matchesCategory =
      category === 'All' || tool.category === category

    const matchesFavorites =
      !showFavorites || favorites.includes(tool.name)

    return matchesSearch && matchesCategory && matchesFavorites
  })

  const getToolReviews = name =>
    reviews.filter(review => review.toolName === name)

  const submitReview = (e) => {
    e.preventDefault()

    if (!selectedTool || rating === 0 || !reviewText.trim()) {
      setReviewMessage('Please enter rating and review.')
      return
    }

    const newReview = {
      id: Date.now(),
      toolName: selectedTool.name,
      rating,
      reviewText: reviewText.trim(),
      date: new Date().toLocaleDateString()
    }

    setReviews(previous => [...previous, newReview])
    setRating(0)
    setReviewText('')
    setReviewMessage('Review submitted successfully! 🎉')
  }

  return (
    <div className="home-container">

      {/* NAVBAR */}
      <nav className="navbar">
        <Link to="/" className="brand">
          <span className="brand-icon">💡</span>
          <span>AI Tools Hub</span>
        </Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <a href="#directory">Directory</a>
          <a href="#categories">Categories</a>
          <Link to="/login">Login</Link>
          <Link to="/register" className="nav-register">
            Get Started 🚀
          </Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="floating-emoji emoji-one">🤖</div>
        <div className="floating-emoji emoji-two">✨</div>
        <div className="floating-emoji emoji-three">🚀</div>
        <div className="floating-emoji emoji-four">💡</div>

        <span className="hero-tag">
          ✨ YOUR SMART AI DISCOVERY PLATFORM
        </span>

        <h1>
          Welcome to <span>AI Tools Hub</span>
        </h1>

        <p>
          Discover, Explore and Experience the World of AI.
          Find the perfect AI tool for every idea! 💜
        </p>

        <div className="hero-buttons">
          <a href="#directory" className="primary-btn">
            Explore AI Tools →
          </a>
          <Link to="/register" className="secondary-btn">
            Join Us ✨
          </Link>
        </div>

        <div className="hero-stats">
          <div>
            <strong>15+</strong>
            <span>AI Tools</span>
          </div>
          <div>
            <strong>9</strong>
            <span>Categories</span>
          </div>
          <div>
            <strong>∞</strong>
            <span>Possibilities</span>
          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="search-section" id="directory">
        <div className="section-heading">
          <span>🔎 DISCOVER</span>
          <h2>Find Your Perfect AI Tool</h2>
          <p>Search through our collection of AI applications.</p>
        </div>

        <div className="search-controls">
          <input
            type="text"
            placeholder="🔍 Search AI tools..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <button
            className="favorite-filter"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            {showFavorites ? 'Show All' : '❤️ Favorites'}
          </button>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="category-section" id="categories">
        <h2>Explore Categories 🗂️</h2>
        <div className="category-list">
          {categories.map(cat => (
            <button
              key={cat}
              className={category === cat ? 'category-active' : ''}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* TOOL CARDS */}
      <section className="tools-section">
        <div className="tools-heading">
          <h2>Popular AI Tools 🔥</h2>
          <span>{filteredTools.length} Tools Found</span>
        </div>

        <div className="tools-grid">
          {filteredTools.map(tool => (
            <div className="tool-card" key={tool.name}>

              <div className="tool-card-top">
                <ToolLogo tool={tool} />

                <button
                  className="favorite-icon"
                  onClick={() => toggleFavorite(tool.name)}
                  title="Add to favorites"
                >
                  {favorites.includes(tool.name) ? '❤️' : '🤍'}
                </button>
              </div>

              <h3>{tool.name}</h3>
              <span className="category-label">
                {tool.category}
              </span>

              <p className="tool-description">
                {tool.description}
              </p>

              <div className="tool-price">
                💳 {tool.price}
              </div>

              <button
                className="details-btn"
                onClick={() => {
                  setSelectedTool(tool)
                  setReviewMessage('')
                }}
              >
                View Details →
              </button>

              <a
                className="visit-btn"
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Tool ↗
              </a>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="no-results">
            <span>🔍</span>
            <h2>No AI Tools Found!</h2>
            <p>Try another search or category.</p>
            <button onClick={() => {
              setSearch('')
              setCategory('All')
              setShowFavorites(false)
            }}>
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* TOOL DETAILS MODAL */}
      {selectedTool && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedTool(null)}
        >
          <div
            className="modal-content"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedTool(null)}
            >
              ✕
            </button>

            <ToolLogo tool={selectedTool} />

            <h2>{selectedTool.name}</h2>
            <span className="category-label">
              {selectedTool.category}
            </span>

            <p>{selectedTool.details}</p>

            <h3>✨ Features</h3>
            <ul>
              {selectedTool.features.map(feature => (
                <li key={feature}>✅ {feature}</li>
              ))}
            </ul>

            <a
              href={selectedTool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-btn modal-visit"
            >
              Visit {selectedTool.name} ↗
            </a>

            <hr />

            <h3>⭐ Ratings & Reviews</h3>

            {getToolReviews(selectedTool.name).length === 0 && (
              <p>No reviews yet. Be the first to review!</p>
            )}

            {getToolReviews(selectedTool.name).map(review => (
              <div className="review-card" key={review.id}>
                <p>{'⭐'.repeat(review.rating)}</p>
                <p>{review.reviewText}</p>
                <small>{review.date}</small>
              </div>
            ))}

            <form onSubmit={submitReview} className="review-form">
              <h3>Write Your Review ✍️</h3>

              <label>Select Rating</label>
              <select
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
              >
                <option value={0}>Select Rating</option>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num} Star{num > 1 ? 's' : ''}
                  </option>
                ))}
              </select>

              <textarea
                placeholder="Write your review..."
                value={reviewText}
                onChange={e => setReviewText(e.target.value)}
                required
              />

              <button type="submit">
                Submit Review 🚀
              </button>

              <p>{reviewMessage}</p>
            </form>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <h2>💡 AI Tools Hub</h2>
        <p>Discover the Future. Explore the Power of AI.</p>
        <p>© 2026 AI Tools Hub. All Rights Reserved.</p>
      </footer>
    </div>
  )
}

// =====================================
// DASHBOARD
// =====================================

function Dashboard() {
  const navigate = useNavigate()
  const user = readStorage('loggedInUser', null)

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser')
    alert('Logout successful!')
    navigate('/login')
  }

  if (!user) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <h1>Please Login First 🔐</h1>
          <p>You need to login to access Dashboard.</p>
          <Link to="/login" className="primary-btn">
            Go to Login
          </Link>
          <br />
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card animated-card">
        <div className="auth-logo">👋</div>
        <h1>Welcome, {user.name}!</h1>
        <p>Welcome to your AI Tools Hub Dashboard.</p>

        <div className="profile-box">
          <h3>👤 My Profile</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <Link to="/" className="primary-btn">
          Explore AI Tools 🚀
        </Link>

        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  )
}

// =====================================
// MAIN APP
// =====================================

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
