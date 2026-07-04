"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Sidebar } from "@/components/ui/Sidebar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/Alert";
import { Modal } from "@/components/ui/Modal";
import { Info, Search, CheckCircle2, AlertTriangle, XCircle, ArrowRight, UploadCloud } from "lucide-react";

export default function UIKitShowcase() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('buttons');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState<"sm" | "md" | "lg">("md");

  const openModal = (size: "sm" | "md" | "lg") => {
    setModalSize(size);
    setIsModalOpen(true);
  };

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ['buttons', 'inputs', 'cards', 'badges', 'alerts', 'modals'];
      const scrollContainer = document.getElementById('main-scroll-area');
      if(!scrollContainer) return;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top >= 0 && rect.top <= 300) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    const scrollContainer = document.getElementById('main-scroll-area');
    scrollContainer?.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-colors">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-4rem)]">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
          activeItem={activeSection}
        />
        
        <main className="flex-1 overflow-y-auto p-6 lg:p-12 scroll-smooth" id="main-scroll-area">
          <div className="mx-auto max-w-5xl space-y-24 pb-24">
            
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-slate-900 dark:text-white">
                SaaS UI Component Kit
              </h1>
              <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl">
                A production-ready design system built with Next.js, Tailwind CSS, and Class Variance Authority. Designed for scale and accessibility.
              </p>
            </div>

            {/* Buttons Section */}
            <section id="buttons" className="scroll-mt-24 space-y-8">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Buttons</h2>
                <p className="text-slate-500 mt-2">Interactive components for primary and secondary actions.</p>
              </div>
              
              <div className="grid gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Variants</h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="destructive">Destructive</Button>
                    <Button variant="link">Link</Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">Sizes</h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="icon"><Search className="h-4 w-4" /></Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">States</h3>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button isLoading>Processing...</Button>
                    <Button disabled>Disabled</Button>
                    <Button variant="outline">
                      Next Step <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Inputs Section */}
            <section id="inputs" className="scroll-mt-24 space-y-8">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Inputs & Forms</h2>
                <p className="text-slate-500 mt-2">Form controls with robust validation states and icon support.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <Input 
                    label="Email Address" 
                    placeholder="you@example.com" 
                    helperText="We'll never share your email."
                  />
                  <Input 
                    label="Search Directory" 
                    placeholder="Search users..." 
                    leftIcon={<Search className="h-4 w-4" />}
                  />
                  <Input 
                    label="Password" 
                    type="password"
                    placeholder="••••••••" 
                    required
                  />
                </div>
                <div className="space-y-6">
                  <Input 
                    label="Username" 
                    defaultValue="saurav" 
                    variant="success"
                    helperText="Username is available!"
                    rightIcon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
                  />
                  <Input 
                    label="Project URL" 
                    defaultValue="my-project" 
                    variant="error"
                    helperText="This URL is already taken."
                    rightIcon={<XCircle className="h-4 w-4 text-red-500" />}
                  />
                  <Input 
                    label="Disabled Input" 
                    placeholder="Cannot type here..." 
                    disabled
                  />
                </div>
              </div>
            </section>

            {/* Cards Section */}
            <section id="cards" className="scroll-mt-24 space-y-8">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Cards</h2>
                <p className="text-slate-500 mt-2">Versatile container components for various data types.</p>
              </div>
              
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Project</CardTitle>
                    <CardDescription>Deploy your new project in one click.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input label="Name" placeholder="Next.js App" />
                    <Input label="Framework" placeholder="Next.js" />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="ghost">Cancel</Button>
                    <Button>Deploy</Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <UploadCloud className="h-4 w-4 text-slate-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-slate-500 mt-1">+20.1% from last month</p>
                  </CardContent>
                </Card>

                <Card className="overflow-hidden p-0">
                  <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 relative">
                    <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Abstract" className="object-cover w-full h-full" />
                  </div>
                  <CardHeader>
                    <CardTitle>Abstract Art</CardTitle>
                    <CardDescription>Generated by AI</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="outline" className="w-full">View Details</Button>
                  </CardFooter>
                </Card>
              </div>
            </section>

            {/* Badges Section */}
            <section id="badges" className="scroll-mt-24 space-y-8">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Badges</h2>
                <p className="text-slate-500 mt-2">Small status descriptors for elements.</p>
              </div>
              
              <div className="flex flex-wrap gap-4 p-6 border border-slate-100 rounded-xl dark:border-slate-800 bg-white dark:bg-slate-950">
                <Badge variant="default">Default</Badge>
                <Badge variant="neutral">Neutral</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </section>

            {/* Alerts Section */}
            <section id="alerts" className="scroll-mt-24 space-y-8">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Alerts</h2>
                <p className="text-slate-500 mt-2">Callout messages to draw user attention.</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Alert variant="default" onClose={() => {}}>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Did you know?</AlertTitle>
                  <AlertDescription>You can close this alert using the X icon.</AlertDescription>
                </Alert>
                <Alert variant="success">
                  <CheckCircle2 className="h-4 w-4" />
                  <AlertTitle>Payment Successful</AlertTitle>
                  <AlertDescription>Your account has been upgraded to Pro.</AlertDescription>
                </Alert>
                <Alert variant="warning">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Storage Almost Full</AlertTitle>
                  <AlertDescription>You have used 95% of your available storage capacity.</AlertDescription>
                </Alert>
                <Alert variant="error">
                  <XCircle className="h-4 w-4" />
                  <AlertTitle>Connection Failed</AlertTitle>
                  <AlertDescription>Could not connect to the database server. Please try again.</AlertDescription>
                </Alert>
              </div>
            </section>

            {/* Modals Section */}
            <section id="modals" className="scroll-mt-24 space-y-8">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Modals</h2>
                <p className="text-slate-500 mt-2">Accessible dialog overlays that prevent background interaction.</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" onClick={() => openModal('sm')}>Open Small Modal</Button>
                <Button variant="outline" onClick={() => openModal('md')}>Open Medium Modal</Button>
                <Button variant="outline" onClick={() => openModal('lg')}>Open Large Modal</Button>
              </div>
            </section>
            
          </div>
        </main>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Edit Profile Settings"
        description="Make changes to your profile here. Click save when you're done."
        size={modalSize}
      >
        <div className="space-y-6 py-4">
          <Input label="Name" defaultValue="Jane Doe" />
          <Input label="Username" defaultValue="@janedoe" />
          <Input label="Email" type="email" defaultValue="jane@example.com" />
        </div>
        <div className="flex justify-end gap-3 mt-6 border-t border-slate-100 dark:border-slate-800 pt-4">
          <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
          <Button onClick={() => setIsModalOpen(false)}>Save Changes</Button>
        </div>
      </Modal>

    </div>
  );
}
