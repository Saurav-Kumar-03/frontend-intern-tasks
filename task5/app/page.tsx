"use client";

import React, { useState } from "react";
import { Navbar } from "../components/ui/Navbar";
import { Sidebar } from "../components/ui/Sidebar";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/Alert";
import { Modal } from "../components/ui/Modal";
import { Info } from "lucide-react";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto space-y-16">
            
            <header className="space-y-4">
              <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">UI Component System</h1>
              <p className="text-xl text-gray-500 dark:text-gray-400">A scalable reusable UI system built with Next.js, Tailwind CSS, and Context API.</p>
            </header>

            <section id="buttons" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight">Buttons</h2>
                <p className="text-gray-500 dark:text-gray-400">Interactive elements for user actions.</p>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
              </div>
              <div className="flex flex-wrap gap-4 items-center mt-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button disabled>Disabled</Button>
              </div>
            </section>

            <section id="badges" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight">Badges</h2>
                <p className="text-gray-500 dark:text-gray-400">Small status indicators.</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Badge variant="default">Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
              </div>
            </section>

            <section id="inputs" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight">Inputs</h2>
                <p className="text-gray-500 dark:text-gray-400">Form fields for user data collection.</p>
              </div>
              <div className="max-w-sm space-y-4">
                <Input placeholder="Default input..." />
                <Input placeholder="Disabled input..." disabled />
                <Input type="email" placeholder="Email address..." />
              </div>
            </section>

            <section id="cards" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight">Cards</h2>
                <p className="text-gray-500 dark:text-gray-400">Containers for related content.</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Project</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input placeholder="Project name" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button>Deploy</Button>
                  </CardFooter>
                </Card>
              </div>
            </section>

            <section id="alerts" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight">Alerts</h2>
                <p className="text-gray-500 dark:text-gray-400">Contextual feedback messages.</p>
              </div>
              <div className="space-y-4 max-w-2xl">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Heads up!</AlertTitle>
                  <AlertDescription>You can add components to your app using the cli.</AlertDescription>
                </Alert>
                <Alert variant="destructive">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>Your session has expired. Please log in again.</AlertDescription>
                </Alert>
                <Alert variant="success">
                  <Info className="h-4 w-4" />
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Your changes have been saved successfully.</AlertDescription>
                </Alert>
              </div>
            </section>

            <section id="modals" className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-semibold tracking-tight">Modals</h2>
                <p className="text-gray-500 dark:text-gray-400">Dialog windows requiring user interaction.</p>
              </div>
              <div>
                <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Profile">
                  <div className="space-y-4 py-4">
                    <p className="text-sm">Make changes to your profile here. Click save when you're done.</p>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Username</label>
                      <Input defaultValue="@johndoe" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 mt-4">
                    <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    <Button onClick={() => setIsModalOpen(false)}>Save changes</Button>
                  </div>
                </Modal>
              </div>
            </section>
            
          </div>
        </main>
      </div>
    </div>
  );
}
