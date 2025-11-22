import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const defaultHTML = `
<div class="container">
  <h1>Hello, World!</h1>
  <p>Welcome to the playground. Start coding!</p>
  <button id="clickBtn">Click Me</button>
  <div id="output"></div>
</div>
`;

export const defaultCSS = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  background: white;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 500px;
  width: 100%;
}

h1 {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 10px;
}

p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 30px;
}

button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
}

button:active {
  transform: translateY(0);
}

#output {
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 10px;
  min-height: 50px;
  color: #333;
  font-weight: 500;
}
`;

export const defaultJS = `
const button = document.getElementById('clickBtn');
const output = document.getElementById('output');
let clickCount = 0;

button.addEventListener('click', () => {
  clickCount++;
  output.textContent = \`Button clicked \${clickCount} time\${clickCount !== 1 ? 's' : ''}!\`;
  
  // Add a fun animation
  output.style.transform = 'scale(1.1)';
  setTimeout(() => {
    output.style.transform = 'scale(1)';
  }, 200);
  
  console.log(\`Click count: \${clickCount}\`);
});

// Add transition for smooth animation
output.style.transition = 'transform 0.2s ease';

console.log('Playground loaded successfully!');
`;