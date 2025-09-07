import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const HeroSection = () => {
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;

    const ctx = canvas?.getContext('2d');
    let animationId;
    let particles = [];
    let rotation = 0;
    let globeScale = 1;
    let scaleDirection = 1;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = canvas?.offsetWidth;
      canvas.height = canvas?.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Enhanced Particle system for background
    class Particle {
      constructor() {
        this.reset();
        this.opacity = Math.random() * 0.8 + 0.2;
      }

      reset() {
        this.x = Math.random() * canvas?.width;
        this.y = Math.random() * canvas?.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.speedY = (Math.random() - 0.5) * 0.8;
        this.life = Math.random() * 200 + 100;
        this.maxLife = this.life;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life--;

        // Respawn particles
        if (this.life <= 0 || this.x < 0 || this.x > canvas?.width || this.y < 0 || this.y > canvas?.height) {
          this.reset();
        }

        // Fade effect based on life
        this.opacity = (this.life / this.maxLife) * 0.8 + 0.1;
      }

      draw() {
        ctx?.save();
        ctx.globalAlpha = this.opacity;
        
        // Create gradient for particles
        const gradient = ctx?.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient?.addColorStop(0, '#00FFFF');
        gradient?.addColorStop(0.5, '#0066FF');
        gradient?.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx?.beginPath();
        ctx?.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx?.fill();
        ctx?.restore();
      }
    }

    // Initialize enhanced particles
    for (let i = 0; i < 80; i++) {
      particles?.push(new Particle());
    }

    // Enhanced 3D Globe wireframe with depth and pulsing effect
    const drawEnhanced3DGlobe = () => {
      const centerX = canvas?.width / 2;
      const centerY = canvas?.height / 2;
      const baseRadius = Math.min(canvas?.width, canvas?.height) * 0.18;
      const radius = baseRadius * globeScale;

      ctx?.save();
      
      // Create pulsing glow effect
      const pulseIntensity = 0.3 + Math.sin(rotation * 3) * 0.2;
      
      // Outer glow
      ctx.shadowBlur = 40;
      ctx.shadowColor = `rgba(0, 255, 255, ${pulseIntensity})`;
      ctx.strokeStyle = `rgba(0, 255, 255, 0.4)`;
      ctx.lineWidth = 2;

      // Draw latitude lines with 3D perspective
      for (let i = 0; i < 10; i++) {
        const lat = (i * Math.PI) / 9 - Math.PI / 2;
        const y = centerY + radius * Math.sin(lat);
        const ellipseRadius = radius * Math.cos(lat);
        
        // Add depth with varying opacity
        const depth = Math.cos(lat);
        ctx.globalAlpha = 0.3 + depth * 0.4;
        
        ctx?.beginPath();
        ctx?.ellipse(centerX, y, ellipseRadius, ellipseRadius * 0.3, 0, 0, Math.PI * 2);
        ctx?.stroke();
      }

      // Draw longitude lines with rotation and 3D effect
      for (let i = 0; i < 16; i++) {
        const angle = (i * Math.PI) / 8 + rotation;
        
        // Calculate 3D visibility
        const visibility = Math.sin(angle + rotation * 0.5);
        if (visibility < -0.7) continue; // Hide back lines
        
        ctx.globalAlpha = Math.max(0.1, visibility * 0.8);
        ctx.strokeStyle = visibility > 0 ? 
          `rgba(0, 255, 255, ${0.6 + visibility * 0.4})` : 
          `rgba(0, 102, 255, ${0.3 + Math.abs(visibility) * 0.3})`;
        
        ctx?.beginPath();
        ctx?.ellipse(centerX, centerY, radius, radius * 0.3, angle, 0, Math.PI * 2);
        ctx?.stroke();
      }

      // Draw glowing center core
      ctx.shadowBlur = 60;
      ctx.shadowColor = '#0066FF';
      ctx.fillStyle = `rgba(0, 102, 255, ${0.1 + pulseIntensity * 0.3})`;
      ctx?.beginPath();
      ctx?.arc(centerX, centerY, radius * 0.8, 0, Math.PI * 2);
      ctx?.fill();

      // Outer sphere outline
      ctx.shadowBlur = 20;
      ctx.strokeStyle = `rgba(0, 255, 255, 0.8)`;
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.9;
      ctx?.beginPath();
      ctx?.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx?.stroke();

      // Add orbital rings
      ctx.strokeStyle = `rgba(0, 255, 255, 0.2)`;
      ctx.lineWidth = 1;
      ctx?.beginPath();
      ctx?.arc(centerX, centerY, radius * 1.3, 0, Math.PI * 2);
      ctx?.stroke();
      
      ctx?.beginPath();
      ctx?.arc(centerX, centerY, radius * 1.6, 0, Math.PI * 2);
      ctx?.stroke();

      ctx?.restore();
    };

    // Enhanced Animation loop
    const animate = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);

      // Create dynamic background gradient
      const gradient = ctx?.createRadialGradient(
        canvas?.width / 2, canvas?.height / 2, 0,
        canvas?.width / 2, canvas?.height / 2, Math.max(canvas?.width, canvas?.height)
      );
      gradient?.addColorStop(0, 'rgba(10, 11, 30, 0.1)');
      gradient?.addColorStop(0.5, 'rgba(30, 31, 63, 0.05)');
      gradient?.addColorStop(1, 'rgba(10, 11, 30, 0.2)');
      
      ctx.fillStyle = gradient;
      ctx?.fillRect(0, 0, canvas?.width, canvas?.height);

      // Update and draw enhanced particles
      particles?.forEach(particle => {
        particle?.update();
        particle?.draw();
      });

      // Draw enhanced 3D globe with pulsing effect
      drawEnhanced3DGlobe();
      
      // Update animations
      rotation += 0.008;
      globeScale += scaleDirection * 0.002;
      if (globeScale > 1.1 || globeScale < 0.9) {
        scaleDirection *= -1;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleGetStarted = () => {
    navigate('/wallet-connection');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted">
      {/* Enhanced Animated Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 1 }}
      />
      {/* Enhanced Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" style={{ zIndex: 2 }} />
      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Enhanced Main Title */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-foreground leading-tight"
          >
            <motion.span
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                ease: "linear"
              }}
              className="bg-gradient-to-r from-primary via-accent via-primary to-accent bg-[length:300%_100%] bg-clip-text text-transparent"
            >
              Pulse
            </motion.span>
            <br />
            <span className="text-foreground">DApp</span>
          </motion.h1>

          {/* Enhanced Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed"
          >
            The future of decentralized bill payments is here.
            <br />
            <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent font-medium">
              Automate, secure, and simplify
            </span> your financial life with blockchain technology.
          </motion.p>

          {/* Enhanced Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-8 text-sm md:text-base text-muted-foreground"
          >
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center space-x-3 glass px-4 py-3 rounded-xl border border-border"
            >
              <Icon name="Zap" size={24} className="text-accent glow-accent" />
              <span className="font-medium">One-Click Payments</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center space-x-3 glass px-4 py-3 rounded-xl border border-border"
            >
              <Icon name="Shield" size={24} className="text-success glow-success" />
              <span className="font-medium">Blockchain Security</span>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -5 }}
              className="flex items-center space-x-3 glass px-4 py-3 rounded-xl border border-border"
            >
              <Icon name="Clock" size={24} className="text-primary glow-primary" />
              <span className="font-medium">AutoPay Automation</span>
            </motion.div>
          </motion.div>

          {/* Enhanced CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="pt-8"
          >
            <Button
              variant="default"
              size="xl"
              onClick={handleGetStarted}
              iconName="ArrowRight"
              iconPosition="right"
              className="glow-primary hover:glow-accent transition-all duration-300 transform hover:scale-105 px-12 py-4 text-lg font-semibold"
            >
              Get Started Now
            </Button>
          </motion.div>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex flex-col items-center space-y-3 text-muted-foreground cursor-pointer group"
            >
              <span className="text-xs font-caption tracking-wider opacity-70 group-hover:opacity-100 transition-opacity">
                Scroll to explore
              </span>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 border-2 border-accent rounded-full flex justify-center"
              >
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-1 h-3 bg-accent rounded-full mt-2"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      {/* Enhanced Floating Elements */}
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.7, 0.3]
        }}
        transition={{ 
          rotate: { duration: 25, repeat: Infinity, ease: "linear" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-20 right-20 w-20 h-20 border-2 border-accent/40 rounded-full hidden lg:block"
        style={{ zIndex: 3 }}
      />
      <motion.div
        animate={{ 
          rotate: -360,
          y: [0, -25, 0],
          x: [0, 10, 0]
        }}
        transition={{ 
          rotate: { duration: 18, repeat: Infinity, ease: "linear" },
          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          x: { duration: 6, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute bottom-32 left-16 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl opacity-40 hidden lg:block glow-primary"
        style={{ zIndex: 3 }}
      />
      <motion.div
        animate={{ 
          rotate: 180,
          scale: [0.8, 1.1, 0.8],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{ 
          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
          scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }}
        className="absolute top-1/3 left-12 w-12 h-12 border border-success/50 rotate-45 hidden lg:block"
        style={{ zIndex: 3 }}
      />
    </section>
  );
};

export default HeroSection;