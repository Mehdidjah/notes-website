/**
 * CollaboNotes - Premium Landing Page
 * Author: Mehdi
 */

import { 
  FileText, Users, Zap, Sparkles, ArrowRight, CheckCircle2,
  Type, Keyboard, Download, Bookmark, StickyNote, Highlighter,
  BookOpen, Layout, Palette, Hash, List, Star, Copy, Focus
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/shared/Navbar';

const Landing = () => {
  // Content is immediately visible - no flicker
  const isLoaded = true;

  const features = [
    {
      icon: Sparkles,
      title: 'Real-time Collaboration',
      description: 'Write together with your team. See changes instantly as they happen.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Every keystroke feels instant. No lag, no waiting.',
    },
    {
      icon: Users,
      title: 'Team-First Design',
      description: 'Built for teams that ship. Presence indicators show who\'s online.',
    },
    {
      icon: FileText,
      title: 'Premium Editor',
      description: 'Beautiful typography, rich formatting, and distraction-free writing.',
    },
  ];

  const creativeFeatures = [
    { icon: Type, title: 'Custom Fonts', description: 'Choose from 6 beautiful font families' },
    { icon: Keyboard, title: 'Keyboard Shortcuts', description: 'Power user shortcuts for everything' },
    { icon: Download, title: 'Export Anywhere', description: 'MD, HTML, JSON, or plain text' },
    { icon: Bookmark, title: 'Smart Bookmarks', description: 'Jump to important sections instantly' },
    { icon: StickyNote, title: 'Quick Notes', description: 'Side scratchpad for quick ideas' },
    { icon: Highlighter, title: 'Color Highlighter', description: '8 beautiful highlight colors' },
    { icon: BookOpen, title: 'Reading Mode', description: 'Distraction-free reading experience' },
    { icon: Sparkles, title: 'AI Suggestions', description: 'Smart writing assistance' },
    { icon: Layout, title: 'Document Templates', description: '6 pre-made templates to start fast' },
    { icon: Palette, title: 'Theme Gallery', description: 'Customize your workspace colors' },
  ];

  const notionFeatures = [
    { icon: Hash, title: 'Slash Commands', description: 'Type / to access all blocks' },
    { icon: List, title: 'Smart Outline', description: 'Auto-generated table of contents' },
    { icon: Star, title: 'Favorites', description: 'Quick access to starred documents' },
    { icon: Copy, title: 'Duplicate', description: 'Clone documents in one click' },
    { icon: Focus, title: 'Focus Mode', description: 'Distraction-free writing' },
  ];

  const benefits = [
    'Focus Mode for distraction-free writing',
    'Version history and auto-save',
    'Command palette (⌘K) for power users',
    'Dark mode and custom themes',
    'Word count and reading time stats',
  ];

  const roadmapItems = [
    { done: true, text: 'Real-time collaboration engine' },
    { done: true, text: 'Version history & snapshots' },
    { done: false, text: 'AI writing assistant', active: true },
    { done: false, text: 'Mobile app launch' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 gradient-mesh pointer-events-none" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div 
            className={`text-center max-w-4xl mx-auto transition-all duration-700 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transform: 'translateZ(0)' }}
          >
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 transition-all duration-500 delay-100 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium">Built for modern teams</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
              Write, collaborate,
              <span 
                className={`block text-gradient mt-2 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              >
                ship faster
              </span>
            </h1>
            
            <p 
              className={`text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            >
              The notes app that gets out of your way. Real-time collaboration, 
              beautiful design, powerful features. Everything you need, nothing you don't.
            </p>

            <div 
              className={`flex flex-wrap gap-4 justify-center items-center transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            >
              <Link to="/register">
                <Button 
                  size="lg" 
                  className="text-lg px-10 h-14 shadow-medium hover:shadow-large font-semibold hover:scale-105 active:scale-95"
                  style={{ transition: 'all 0.2s ease-out' }}
                >
                  Start Writing Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-10 h-14 font-semibold hover:bg-primary/5"
                  style={{ transition: 'all 0.2s ease-out' }}
                >
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Hero Visual - Live Demo Preview */}
          <div
            className={`mt-24 relative transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transform: 'translateZ(0)' }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-large border border-border bg-card">
              {/* Window Chrome */}
              <div className="h-12 bg-muted/50 border-b border-border flex items-center px-4 gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60"></div>
                  <div className="w-3 h-3 rounded-full bg-primary/60"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                </div>
                <div className="flex-1 text-center">
                  <span className="text-sm text-muted-foreground font-medium">Project Roadmap.md</span>
                </div>
              </div>
              
              {/* Editor Content */}
              <div className="p-8 md:p-12 bg-card min-h-[400px]">
                <div className="max-w-2xl">
                  <h2 className="text-3xl font-bold mb-4 text-foreground">Project Roadmap 2024</h2>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    Our mission is to build the most intuitive collaborative writing tool. 
                    Here's what we're shipping next quarter.
                  </p>
                  <div className="space-y-3">
                    {roadmapItems.map((item, i) => (
                      <div
                        key={i}
                        className={`flex items-center gap-3 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}
                        style={{ transitionDelay: `${800 + i * 100}ms` }}
                      >
                        {item.done ? (
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                        ) : (
                          <div className={`h-5 w-5 rounded-full border-2 ${item.active ? 'border-primary' : 'border-muted-foreground/30'}`} />
                        )}
                        <span className={item.done ? 'text-foreground' : item.active ? 'text-foreground' : 'text-muted-foreground'}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Presence indicators */}
                <div 
                  className={`absolute bottom-4 right-4 flex -space-x-2 transition-all duration-500 delay-[1200ms] ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-card flex items-center justify-center text-white text-xs font-medium">M</div>
                  <div className="w-8 h-8 rounded-full bg-green-500 border-2 border-card flex items-center justify-center text-white text-xs font-medium">S</div>
                  <div className="w-8 h-8 rounded-full gradient-hero border-2 border-card flex items-center justify-center text-white text-xs font-medium">A</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Built for the way you work
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every feature designed with intention. No bloat. Just powerful tools for writing.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-card border border-border shadow-soft hover:shadow-medium hover:-translate-y-1"
                style={{ transition: 'all 0.3s ease-out' }}
              >
                <div 
                  className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20"
                  style={{ transition: 'background 0.2s ease-out' }}
                >
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notion-inspired Features */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Notion-Inspired
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful blocks, flexible writing
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              All the modern writing features you love, built right in.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {notionFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-5 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-medium"
                style={{ transition: 'all 0.3s ease-out' }}
              >
                <div 
                  className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center mb-3 group-hover:scale-110"
                  style={{ transition: 'transform 0.2s ease-out' }}
                >
                  <feature.icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 Creative Features Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              10 Powerful Features
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Everything you need to write beautifully
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              From font customization to AI assistance, we've packed CollaboNotes with features that make writing a joy.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {creativeFeatures.map((feature, index) => (
              <div
                key={index}
                className="group p-4 rounded-xl bg-card border border-border hover:border-primary/30"
                style={{ transition: 'all 0.3s ease-out' }}
              >
                <div 
                  className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-3 group-hover:bg-primary/10"
                  style={{ transition: 'background 0.2s ease-out' }}
                >
                  <feature.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary" style={{ transition: 'color 0.2s ease-out' }} />
                </div>
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Everything you need.
                <span className="block text-gradient">Nothing you don't.</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We've obsessed over every detail so you can focus on what matters: your writing.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="relative">
              <div className="rounded-2xl border border-border bg-card shadow-card p-8">
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-primary fill-primary" />
                  ))}
                </div>
                <blockquote className="text-lg mb-6 leading-relaxed">
                  "CollaboNotes has transformed how our team writes documentation. 
                  The real-time collaboration is seamless, and the interface is beautiful."
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full gradient-hero flex items-center justify-center text-white font-semibold">
                    S
                  </div>
                  <div>
                    <p className="font-semibold">Sarah Chen</p>
                    <p className="text-sm text-muted-foreground">Engineering Lead at TechCorp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to write better?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of teams who've made CollaboNotes their home for writing and collaboration.
          </p>
          <Link to="/register">
            <Button 
              size="lg" 
              className="text-lg px-12 h-14 shadow-glow hover:shadow-xl font-semibold hover:scale-105 active:scale-95"
              style={{ transition: 'all 0.2s ease-out' }}
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-6">
            No credit card required • Free forever for personal use
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg gradient-hero flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">CollaboNotes</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ by Mehdi • © {new Date().getFullYear()} All rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
