export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          Project Buddie
        </h1>
        <p className="text-center text-xl mb-4">
          AI-Powered Contact Center Intelligence Platform
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="border p-4 rounded-lg">
            <h2 className="font-bold mb-2">AI Call Summarization</h2>
            <p className="text-sm">Automatic call summaries using Amazon Bedrock</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h2 className="font-bold mb-2">Agent Productivity</h2>
            <p className="text-sm">Real-time agent monitoring and alerts</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h2 className="font-bold mb-2">IVR Journey Intelligence</h2>
            <p className="text-sm">Visualize customer IVR paths</p>
          </div>
          <div className="border p-4 rounded-lg">
            <h2 className="font-bold mb-2">Escalation Automation</h2>
            <p className="text-sm">Auto-create Salesforce tasks</p>
          </div>
        </div>
      </div>
    </main>
  )
}
