import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Destinations from './components/Destinations';
import Quiz from './components/Quiz';
import Booking from './components/Booking';
import FAQ from './components/FAQ';
import Chatbot from './components/Chatbot';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen bg-midnight-950">
      <Header />
      <main>
        <Hero />
        <About />
        <Destinations />
        <Quiz />
        <Booking />
        <FAQ />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
