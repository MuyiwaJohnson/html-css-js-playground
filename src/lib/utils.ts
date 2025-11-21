import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const defaultHTML = `
 <div class="container">
  <h1 class="animated-title">
    <span class="letter">W</span>
    <span class="letter">E</span>
    <span class="letter">B</span>
    <span class="letter space"></span>
    <span class="letter">P</span>
    <span class="letter">L</span>
    <span class="letter">A</span>
    <span class="letter">Y</span>
    <span class="letter">G</span>
    <span class="letter">R</span>
    <span class="letter">O</span>
    <span class="letter">U</span>
    <span class="letter">N</span>
    <span class="letter">D</span>
  </h1>
</div>
`;

export const defaultCSS = `
 * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial Black', 'Arial Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  background: #000000;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.container {
  text-align: center;
}

.animated-title {
  font-family: 'Impact', 'Arial Black', 'Franklin Gothic Bold', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 3.5rem;
  font-weight: 900;
  color: #00ffff;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.1em;
  text-shadow: 
    0 0 10px #00ffff,
    0 0 20px #00ffff,
    0 0 30px #00ffff,
    0 0 40px #00ffff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.letter {
  display: inline-block;
  opacity: 0;
  transform: translateY(50px) rotateX(90deg);
  animation: letterAnimation 0.6s ease forwards;
}

.letter.space {
  width: 0.3em;
}

.letter:nth-child(1) { animation-delay: 0.1s; }
.letter:nth-child(2) { animation-delay: 0.2s; }
.letter:nth-child(3) { animation-delay: 0.3s; }
.letter:nth-child(4) { animation-delay: 0.4s; }
.letter:nth-child(5) { animation-delay: 0.5s; }
.letter:nth-child(6) { animation-delay: 0.6s; }
.letter:nth-child(7) { animation-delay: 0.7s; }
.letter:nth-child(8) { animation-delay: 0.8s; }
.letter:nth-child(9) { animation-delay: 0.9s; }
.letter:nth-child(10) { animation-delay: 1.0s; }
.letter:nth-child(11) { animation-delay: 1.1s; }
.letter:nth-child(12) { animation-delay: 1.2s; }
.letter:nth-child(13) { animation-delay: 1.3s; }
.letter:nth-child(14) { animation-delay: 1.4s; }
.letter:nth-child(15) { animation-delay: 1.5s; }

@keyframes letterAnimation {
  0% {
    opacity: 0;
    transform: translateY(50px) rotateX(90deg);
  }
  50% {
    transform: translateY(-10px) rotateX(0deg);
  }
  100% {
    opacity: 1;
    transform: translateY(0) rotateX(0deg);
  }
}

.letter {
  transition: transform 0.3s ease, color 0.3s ease, text-shadow 0.3s ease;
}

.letter:hover {
  transform: translateY(-10px) scale(1.2);
  color: #ff00ff;
  text-shadow: 
    0 0 10px #ff00ff,
    0 0 20px #ff00ff,
    0 0 30px #ff00ff,
    0 0 40px #ff00ff;
}
`;

export const defaultJS = `
console.log('Hello, World!');
`;