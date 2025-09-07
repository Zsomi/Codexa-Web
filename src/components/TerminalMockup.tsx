'use client';

import { useState, useEffect } from 'react';

interface TerminalCommand {
  command: string;
  output?: string[];
  delay: number;
}

const commands: TerminalCommand[] = [
  {
    command: "npx create-next-app@latest codexa-project",
    output: [
      "✔ Would you like to use TypeScript? … Yes",
      "✔ Would you like to use ESLint? … Yes", 
      "✔ Would you like to use Tailwind CSS? … Yes",
      "✔ Would you like to use App Router? … Yes",
      "Creating a new Next.js app in /codexa-project",
      "",
      "Installing dependencies...",
      "✓ Dependencies installed successfully"
    ],
    delay: 0
  },
  {
    command: "cd codexa-project",
    delay: 3000
  },
  {
    command: "npm install @headlessui/react framer-motion",
    output: [
      "added 15 packages in 2.1s",
      "✓ UI libraries installed"
    ],
    delay: 4000
  },
  {
    command: "npm run dev",
    output: [
      "▲ Next.js 15.5.2",
      "- Local:        http://localhost:3000",
      "- Network:      http://192.168.1.10:3000",
      "",
      "✓ Ready in 1.2s"
    ],
    delay: 6000
  }
];

export default function TerminalMockup() {
  const [currentCommandIndex, setCurrentCommandIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [displayedCommands, setDisplayedCommands] = useState<Array<{command: string, output?: string[]}>>([]);

  useEffect(() => {
    if (currentCommandIndex >= commands.length) {
      // Reset after all commands
      setTimeout(() => {
        setCurrentCommandIndex(0);
        setCurrentCharIndex(0);
        setShowOutput(false);
        setDisplayedCommands([]);
      }, 3000);
      return;
    }

    const currentCommand = commands[currentCommandIndex];
    
    // Wait for delay before starting this command
    const delayTimeout = setTimeout(() => {
      if (currentCharIndex < currentCommand.command.length) {
        // Type character by character
        const typingTimeout = setTimeout(() => {
          setCurrentCharIndex(prev => prev + 1);
        }, 50 + Math.random() * 50); // Variable typing speed
        
        return () => clearTimeout(typingTimeout);
      } else {
        // Command finished typing, show output
        if (!showOutput) {
          setShowOutput(true);
          setDisplayedCommands(prev => [...prev, {
            command: currentCommand.command,
            output: currentCommand.output
          }]);
          
          // Move to next command after showing output
          setTimeout(() => {
            setCurrentCommandIndex(prev => prev + 1);
            setCurrentCharIndex(0);
            setShowOutput(false);
          }, currentCommand.output ? 2000 : 500);
        }
      }
    }, currentCharIndex === 0 ? currentCommand.delay : 0);

    return () => clearTimeout(delayTimeout);
  }, [currentCommandIndex, currentCharIndex, showOutput]);

  return (
    <div 
      className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-2xl font-mono"
      style={{ 
        width: '600px', 
        height: '400px',
        maxWidth: '600px',
        maxHeight: '400px',
        minWidth: '600px',
        minHeight: '400px'
      }}
    >
      {/* Terminal Header */}
      <div 
        className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700"
        style={{ height: '48px', minHeight: '48px', maxHeight: '48px' }}
      >
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-gray-300 text-sm font-mono">codexa@terminal</span>
        </div>
      </div>

      {/* Terminal Content - ABSOLUTELY FIXED */}
      <div 
        className="p-4 text-sm overflow-y-auto bg-gray-900"
        style={{ 
          height: '352px', 
          minHeight: '352px', 
          maxHeight: '352px',
          width: '100%'
        }}
      >
        {/* Previously executed commands */}
        {displayedCommands.map((cmd, index) => (
          <div key={index} className="mb-4">
            <div className="text-green-400 mb-1">
              <span className="text-blue-400">➜</span>
              <span className="ml-1 text-white">codexa-dev</span>
              <span className="ml-1 text-gray-400">~/projects</span>
              <span className="ml-1 text-green-400">$</span>
              <span className="ml-1">{cmd.command}</span>
            </div>
            {cmd.output && (
              <div className="ml-4 text-gray-300 space-y-1">
                {cmd.output.map((line, lineIndex) => (
                  <div key={lineIndex} className={`
                    ${line.includes('✓') || line.includes('✔') ? 'text-green-400' : ''}
                    ${line.includes('▲') ? 'text-blue-400' : ''}
                    ${line.includes('Local:') || line.includes('Network:') ? 'text-cyan-400' : ''}
                  `}>
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Current typing command */}
        {currentCommandIndex < commands.length && (
          <div className="text-green-400">
            <span className="text-blue-400">➜</span>
            <span className="ml-1 text-white">codexa-dev</span>
            <span className="ml-1 text-gray-400">~/projects</span>
            <span className="ml-1 text-green-400">$</span>
            <span className="ml-1">
              {commands[currentCommandIndex].command.slice(0, currentCharIndex)}
              <span className="animate-pulse">|</span>
            </span>
          </div>
        )}

        {/* Current command output */}
        {showOutput && commands[currentCommandIndex].output && (
          <div className="ml-4 text-gray-300 space-y-1 mt-2">
            {commands[currentCommandIndex].output!.map((line, lineIndex) => (
              <div key={lineIndex} className={`
                ${line.includes('✓') || line.includes('✔') ? 'text-green-400' : ''}
                ${line.includes('▲') ? 'text-blue-400' : ''}
                ${line.includes('Local:') || line.includes('Network:') ? 'text-cyan-400' : ''}
                animate-fadeIn
              `}>
                {line}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}