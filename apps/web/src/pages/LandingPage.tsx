import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useUIStore } from '@/store/uiStore';
import { 
  Code, 
  Terminal, 
  LayoutDashboard, 
  Database, 
  Cloud, 
  Shield, 
  Send,
  CheckCircle,
  Loader2
} from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: React.ElementType;
}

interface PortfolioItem {
  title: string;
  category: string;
  imageUrl: string;
}

const SERVICES: Service[] = [
  {
    title: 'Custom Software Development',
    description: 'Tailored applications designed to meet your specific business requirements and scale seamlessly.',
    icon: Code
  },
  {
    title: 'Cloud Infrastructure',
    description: 'Robust, secure, and highly available cloud architectures built on modern platforms.',
    icon: Cloud
  },
  {
    title: 'Data Analytics & AI',
    description: 'Transform raw data into actionable insights with our advanced analytics and machine learning solutions.',
    icon: Database
  },
  {
    title: 'UI/UX Design',
    description: 'Intuitive, engaging, and accessible user experiences that delight your customers.',
    icon: LayoutDashboard
  },
  {
    title: 'Cybersecurity',
    description: 'Comprehensive security audits and implementations to protect your digital assets.',
    icon: Shield
  },
  {
    title: 'API Integration',
    description: 'Seamlessly connect disparate systems to streamline your operational workflows.',
    icon: Terminal
  }
];

const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    title: 'FinTech Dashboard',
    category: 'Web Application',
    imageUrl: 'https://placehold.co/600x400/1e293b/ffffff?text=FinTech+Dashboard'
  },
  {
    title: 'E-commerce Platform',
    category: 'E-commerce',
    imageUrl: 'https://placehold.co/600x400/0f172a/ffffff?text=E-commerce+Platform'
  },
  {
    title: 'Healthcare CRM',
    category: 'Enterprise Solution',
    imageUrl: 'https://placehold.co/600x400/334155/ffffff?text=Healthcare+CRM'
  },
  {
    title: 'Logistics Tracker',
    category: 'Mobile Application',
    imageUrl: 'https://placehold.co/600x400/475569/ffffff?text=Logistics+Tracker'
  }
];

function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-muted/50">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            We offer a comprehensive suite of digital services to help your business thrive in the modern era.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(SERVICES ?? []).map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="border-muted bg-background transition-all hover:shadow-md hover:border-primary/50">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PortfolioSection() {
  return (
    <section id="portfolio" className="py-20 bg-background">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Featured Work</h2>
            <p className="text-muted-foreground text-lg">
              Explore some of our recent projects that have driven real business results.
            </p>
          </div>
          <Button variant="outline" className="mt-6 md:mt-0 w-fit">
            View All Projects
          </Button>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {(PORTFOLIO_ITEMS ?? []).map((item, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl border bg-card">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <span className="text-sm font-medium text-primary mb-2 block">
                  {item.category}
                </span>
                <h3 className="text-2xl font-semibold">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const { contactSuccess, setContactSuccess } = useUIStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    details: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.details) return;
    
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setContactSuccess(true);
      setFormData({ name: '', email: '', details: '' });
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setContactSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6 mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Ready to Decode Your Future?</h2>
          <p className="text-muted-foreground text-lg">
            Let's discuss how we can help transform your ideas into reality.
          </p>
        </div>

        <Card className="border-muted shadow-lg">
          <CardContent className="p-6 md:p-8">
            {contactSuccess ? (
              <div className="flex flex-col items-center justify-center py-12 text-center animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-semibold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">
                  Thank you for reaching out. Our team will get back to you within 24 hours.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-8"
                  onClick={() => setContactSuccess(false)}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-300">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Full Name
                    </label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="John Doe" 
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email Address
                    </label>
                    <Input 
                      id="email" 
                      name="email" 
                      type="email" 
                      placeholder="john@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="details" className="text-sm font-medium">
                    Project Details
                  </label>
                  <Textarea 
                    id="details" 
                    name="details" 
                    placeholder="Tell us about your project goals, timeline, and budget..."
                    className="min-h-[150px]"
                    value={formData.details}
                    onChange={handleChange}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <footer className="py-8 border-t bg-muted/20">
        <div className="container px-4 md:px-6 mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg tracking-tight">Decoded Digital</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Decoded Digital. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}