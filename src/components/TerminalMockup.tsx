'use client';

import { useState, useEffect } from 'react';

interface TerminalCommand {
  command: string;
  output?: string[];
  delay: number;
}

const commands: TerminalCommand[] = [
  {
    command: "npx create-next-app@latest project",
    output: [
      "✔ Would you like to use TypeScript? … Yes",
      "✔ Would you like to use ESLint? … Yes", 
      "✔ Would you like to use Tailwind CSS? … Yes",
      "✔ Would you like to use App Router? … Yes",
      "Creating a new Next.js app...",
      "",
      "Installing dependencies...",
      "✓ Dependencies installed successfully"
    ],
    delay: 0
  },
  {
    command: "cd project",
    delay: 3000
  },
  {
    command: "npm install framer-motion",
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
      "- Local: http://localhost:3000",
      "- Network: http://192.168.1.10:3000",
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
      className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden shadow-2xl font-mono w-full max-w-lg mx-auto"
      style={{ 
        height: '350px',
        maxHeight: '350px',
        minHeight: '300px'
      }}
    >
      {/* Terminal Header */}
      <div 
        className="bg-gray-800 px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 border-b border-gray-700"
        style={{ height: '40px', minHeight: '40px', maxHeight: '40px' }}
      >
        <div className="flex gap-1 sm:gap-2">
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-gray-300 text-xs sm:text-sm font-mono">codexa@terminal</span>
        </div>
      </div>

      {/* Terminal Content - RESPONSIVE */}
      <div 
        className="p-2 sm:p-3 lg:p-4 text-xs sm:text-sm overflow-y-auto overflow-x-hidden bg-gray-900 leading-relaxed"
        style={{ 
          height: '310px', 
          minHeight: '260px', 
          maxHeight: '310px',
          width: '100%',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          wordBreak: 'break-all'
        }}
      >
        {/* Previously executed commands */}
        {displayedCommands.map((cmd, index) => (
          <div key={index} className="mb-2 sm:mb-3">
            <div className="text-green-400 mb-1" style={{ wordBreak: 'break-all', overflowWrap: 'break-word' }}>
              <span className="text-blue-400">➜</span>
              <span className="ml-1 text-white">dev</span>
              <span className="ml-1 text-gray-400 hidden sm:inline">~/projects</span>
              <span className="ml-1 text-green-400">$</span>
              <span className="ml-1" style={{ wordBreak: 'break-all' }}>{cmd.command}</span>
            </div>
            {cmd.output && (
              <div className="ml-2 sm:ml-4 text-gray-300 space-y-1">
                {cmd.output.map((line, lineIndex) => (
                  <div key={lineIndex} 
                       className={`text-xs sm:text-sm ${line.includes('✓') || line.includes('✔') ? 'text-green-400' : ''} ${line.includes('▲') ? 'text-blue-400' : ''} ${line.includes('Local:') || line.includes('Network:') ? 'text-cyan-400' : ''}`}
                       style={{ 
                         wordBreak: 'break-all', 
                         overflowWrap: 'break-word',
                         maxWidth: '100%',
                         whiteSpace: 'pre-wrap'
                       }}>
                    {line}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Current typing command */}
        {currentCommandIndex < commands.length && (
          <div className="text-green-400" style={{ wordBreak: 'break-all', overflowWrap: 'break-word' }}>
            <span className="text-blue-400">➜</span>
            <span className="ml-1 text-white">dev</span>
            <span className="ml-1 text-gray-400 hidden sm:inline">~/projects</span>
            <span className="ml-1 text-green-400">$</span>
            <span className="ml-1" style={{ wordBreak: 'break-all' }}>
              {commands[currentCommandIndex].command.slice(0, currentCharIndex)}
              <span className="animate-pulse">|</span>
            </span>
          </div>
        )}

        {/* Current command output */}
        {showOutput && commands[currentCommandIndex].output && (
          <div className="ml-2 sm:ml-4 text-gray-300 space-y-1 mt-2">
            {commands[currentCommandIndex].output!.map((line, lineIndex) => (
              <div key={lineIndex} 
                   className={`text-xs sm:text-sm animate-fadeIn ${line.includes('✓') || line.includes('✔') ? 'text-green-400' : ''} ${line.includes('▲') ? 'text-blue-400' : ''} ${line.includes('Local:') || line.includes('Network:') ? 'text-cyan-400' : ''}`}
                   style={{ 
                     wordBreak: 'break-all', 
                     overflowWrap: 'break-word',
                     maxWidth: '100%',
                     whiteSpace: 'pre-wrap'
                   }}>
                {line}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}