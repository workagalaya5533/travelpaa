<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Emotional Travel Intelligence</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://unpkg.com/lucide-react"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
        }
        
        body {
            background-color: #000;
            color: white;
            overflow-x: hidden;
        }
        
        .hero-section {
            position: relative;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            background-color: black;
        }
        
        /* Background Space Gradient */
        .space-gradient {
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, #0f172a 0%, #000 40%, #0c0a1c 100%);
            z-index: -20;
        }
        
        /* Animated stars */
        .stars {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -15;
            overflow: hidden;
        }
        
        .star {
            position: absolute;
            background-color: white;
            border-radius: 50%;
            animation: twinkle linear infinite;
        }
        
        @keyframes twinkle {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 1; }
        }
        
        /* Earth Glow in Center */
        .earth-glow {
            position: absolute;
            left: 50%;
            top: 50%;
            width: 400px;
            height: 400px;
            transform: translate(-50%, -50%);
            border-radius: 50%;
            background: linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(45, 212, 191, 0.3) 100%);
            filter: blur(60px);
            animation: pulse 8s ease-in-out infinite, float 20s ease-in-out infinite;
            z-index: -10;
        }
        
        @keyframes pulse {
            0%, 100% { opacity: 0.4; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.1); }
        }
        
        @keyframes float {
            0%, 100% { transform: translate(-50%, -50%) translateY(0) rotate(0deg); }
            25% { transform: translate(-50%, -50%) translateY(-20px) rotate(5deg); }
            50% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
            75% { transform: translate(-50%, -50%) translateY(20px) rotate(-5deg); }
        }
        
        /* Main Content */
        .main-content {
            position: relative;
            z-index: 10;
            text-align: center;
            padding: 0 24px;
            max-width: 72rem;
            margin: 0 auto;
        }
        
        /* Tagline */
        .tagline {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            padding: 12px 24px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            border-radius: 9999px;
            border: 1px solid rgba(96, 165, 250, 0.5);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
            margin-bottom: 3rem;
            transition: all 0.3s ease;
            animation: fadeInDown 1s ease-out, glow 3s ease-in-out infinite;
        }
        
        .tagline:hover {
            transform: scale(1.05);
            box-shadow: 0 0 25px rgba(96, 165, 250, 0.7);
        }
        
        @keyframes glow {
            0%, 100% { box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5); }
            50% { box-shadow: 0 20px 25px -5px rgba(96, 165, 250, 0.3); }
        }
        
        .tagline-text {
            color: white;
            font-size: 0.875rem;
            font-weight: 500;
            letter-spacing: 0.025em;
        }
        
        .tagline-heart {
            width: 20px;
            height: 20px;
            color: rgba(96, 165, 250);
        }
        
        .tagline-compass {
            width: 16px;
            height: 16px;
            color: rgba(45, 212, 191);
            animation: pulse 2s ease-in-out infinite, spin 10s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Heading */
        .heading {
            font-size: 4.5rem;
            line-height: 0.9;
            letter-spacing: -0.025em;
            font-weight: 900;
            color: white;
            margin-bottom: 2rem;
            animation: fadeInUp 1s ease-out 0.2s both;
        }
        
        @media (min-width: 768px) {
            .heading {
                font-size: 7.5rem;
            }
        }
        
        .gradient-text {
            background: linear-gradient(to right, rgb(59, 130, 246) 0%, rgb(45, 212, 191) 50%, rgb(34, 197, 94) 100%);
            -webkit-background-clip: text;
            background-clip: text;
            color: transparent;
            animation: gradientShift 5s ease infinite, fadeIn 1.5s ease-out 0.5s both;
        }
        
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        /* Description */
        .description {
            max-width: 42rem;
            margin: 0 auto;
            font-size: 1.125rem;
            line-height: 1.75;
            color: rgb(209, 213, 219);
            margin-bottom: 3rem;
            animation: fadeInUp 1s ease-out 0.4s both;
        }
        
        .blue-text {
            color: rgb(96, 165, 250);
            font-weight: 600;
        }
        
        .teal-text {
            color: rgb(45, 212, 191);
            font-weight: 600;
        }
        
        .emerald-text {
            color: rgb(16, 185, 129);
            font-weight: 600;
        }
        
        /* Buttons */
        .buttons-container {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            justify-content: center;
            margin-bottom: 4rem;
            animation: fadeInUp 1s ease-out 0.6s both;
        }
        
        @media (min-width: 640px) {
            .buttons-container {
                flex-direction: row;
            }
        }
        
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 9999px;
            font-weight: 600;
            padding: 1.5rem 2.5rem;
            cursor: pointer;
            transition: all 0.3s ease;
            transform: translateY(0);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
        }
        
        .btn-primary {
            background: linear-gradient(to right, rgb(37, 99, 235) 0%, rgb(13, 148, 136) 100%);
            color: white;
            border: none;
        }
        
        .btn-primary:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 20px 25px -5px rgba(59, 130, 246, 0.5);
        }
        
        .btn-outline {
            border: 2px solid rgba(96, 165, 250, 0.6);
            background: rgba(255, 255, 255, 0.1);
            color: white;
        }
        
        .btn-outline:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 20px 25px -5px rgba(96, 165, 250, 0.3);
            background: rgba(255, 255, 255, 0.2);
        }
        
        /* Animations */
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInDown {
            from {
                opacity: 0;
                transform: translateY(-30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        /* Floating particles */
        .particles {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -5;
            overflow: hidden;
        }
        
        .particle {
            position: absolute;
            background: linear-gradient(to right, rgba(59, 130, 246, 0.7), rgba(45, 212, 191, 0.7));
            border-radius: 50%;
            opacity: 0.5;
            animation: floatParticle linear infinite;
        }
        
        @keyframes floatParticle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.7;
            }
            90% {
                opacity: 0.7;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    </style>
</head>
<body>
    <div id="root"></div>

    <script type="text/babel">
        const { useState, useEffect } = React;
        const { Heart, Compass } = lucideReact;

        const HeroSection = () => {
            const [isHovering, setIsHovering] = useState(false);
            const [stars, setStars] = useState([]);
            const [particles, setParticles] = useState([]);

            useEffect(() => {
                // Create stars
                const starsData = [];
                for (let i = 0; i < 150; i++) {
                    starsData.push({
                        id: i,
                        size: Math.random() * 3,
                        posX: Math.random() * 100,
                        posY: Math.random() * 100,
                        delay: Math.random() * 5,
                        duration: 2 + Math.random() * 8
                    });
                }
                setStars(starsData);

                // Create particles
                const particlesData = [];
                for (let i = 0; i < 30; i++) {
                    particlesData.push({
                        id: i,
                        size: 5 + Math.random() * 15,
                        posX: Math.random() * 100,
                        delay: Math.random() * 10,
                        duration: 10 + Math.random() * 20
                    });
                }
                setParticles(particlesData);
            }, []);

            return (
                <section className="hero-section">
                    {/* Background Space Gradient */}
                    <div className="space-gradient"></div>
                    
                    {/* Animated Stars */}
                    <div className="stars">
                        {stars.map(star => (
                            <div 
                                key={star.id}
                                className="star"
                                style={{
                                    width: `${star.size}px`,
                                    height: `${star.size}px`,
                                    left: `${star.posX}%`,
                                    top: `${star.posY}%`,
                                    animationDuration: `${star.duration}s`,
                                    animationDelay: `${star.delay}s`
                                }}
                            ></div>
                        ))}
                    </div>
                    
                    {/* Floating Particles */}
                    <div className="particles">
                        {particles.map(particle => (
                            <div 
                                key={particle.id}
                                className="particle"
                                style={{
                                    width: `${particle.size}px`,
                                    height: `${particle.size}px`,
                                    left: `${particle.posX}%`,
                                    animationDuration: `${particle.duration}s`,
                                    animationDelay: `${particle.delay}s`
                                }}
                            ></div>
                        ))}
                    </div>
                    
                    {/* Earth Glow in Center */}
                    <div className="earth-glow"></div>
                    
                    {/* Main Content */}
                    <div className="main-content">
                        {/* Tagline */}
                        <div 
                            className="tagline" 
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            <Heart className="tagline-heart" />
                            <span className="tagline-text">Emotional Travel Intelligence • Feel-First Journey</span>
                            <Compass className="tagline-compass" />
                        </div>
                        
                        {/* Heading */}
                        <h1 className="heading">
                            Journey <br />
                            Beyond <br />
                            <span className="gradient-text">Emotions</span>
                        </h1>
                        
                        {/* Description */}
                        <p className="description">
                            <span className="blue-text">Discover your emotional compass</span> and let your feelings guide you to <span className="teal-text">extraordinary destinations</span>. <br />
                            Travel that <span className="emerald-text">heals, inspires & transforms</span> your soul.
                        </p>
                        
                        {/* Buttons */}
                        <div className="buttons-container">
                            <button className="btn btn-primary">Start Your Journey</button>
                            <button className="btn btn-outline">Discover Emotions</button>
                        </div>
                    </div>
                </section>
            );
        };

        // Render the component
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(<HeroSection />);
    </script>
</body>
</html>